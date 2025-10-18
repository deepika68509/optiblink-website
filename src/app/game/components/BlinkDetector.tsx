'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface BlinkDetectorProps {
  onBlink: (isLong: boolean) => void
  isEnabled: boolean
}

export default function BlinkDetector({ onBlink, isEnabled }: BlinkDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [blinkCount, setBlinkCount] = useState(0)
  const [lastBlinkDetected, setLastBlinkDetected] = useState(false)
  const [faceMesh, setFaceMesh] = useState<any>(null)
  const [camera, setCamera] = useState<any>(null)
  const [currentEAR, setCurrentEAR] = useState(0)
  
  // Blink duration tracking
  const blinkStartTimeRef = useRef<number | null>(null)
  const isBlinkingRef = useRef(false)
  
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isEnabled && !stream) {
      initializeCamera()
    }
    return () => {
      // Cleanup when component unmounts or isEnabled changes
      cleanupCamera()
    }
  }, [isEnabled])

  // Cleanup function
  const cleanupCamera = useCallback(() => {
    console.log('BlinkDetector: Cleaning up camera resources')
    
    // Stop current stream tracks
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track.label)
        track.stop()
      })
      setStream(null)
    }
    
    // Also try to stop any other video tracks that might be active
    try {
      const allVideoTracks = document.querySelectorAll('video')
      allVideoTracks.forEach(video => {
        if (video.srcObject) {
          const tracks = (video.srcObject as MediaStream).getTracks()
          tracks.forEach(track => {
            if (track.kind === 'video' && track.readyState === 'live') {
              console.log('Stopping additional video track:', track.label)
              track.stop()
            }
          })
          video.srcObject = null
        }
      })
    } catch (error) {
      // Ignore cleanup errors
    }
    
    // Stop MediaPipe camera
    if (camera) {
      camera.stop()
      setCamera(null)
    }
    
    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    // Clear timeouts
    if (blinkTimeoutRef.current) {
      clearTimeout(blinkTimeoutRef.current)
      blinkTimeoutRef.current = null
    }
    
    // Reset state
    setIsDetecting(false)
    setCurrentEAR(0)
    setBlinkCount(0)
    setLastBlinkDetected(false)
    isBlinkingRef.current = false
    blinkStartTimeRef.current = null
  }, [stream, camera])

  // Stop camera immediately when disabled
  useEffect(() => {
    if (!isEnabled) {
      console.log('BlinkDetector: Camera disabled, immediate cleanup')
      cleanupCamera()
    }
  }, [isEnabled, cleanupCamera])

  // Cleanup on page unload and visibility changes - simplified
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('BlinkDetector: Page unloading, cleaning up camera')
      cleanupCamera()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Don't cleanup on component unmount if we're just re-rendering
      // The cleanup will happen when isEnabled becomes false
    }
  }, []) // Remove cleanupCamera dependency to prevent re-running

  const initializeCamera = async () => {
    try {
      console.log('BlinkDetector: Requesting camera access...')
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 320,
          height: 240,
          facingMode: 'user',
          frameRate: { ideal: 15, max: 30 }
        },
        audio: false
      })
      console.log('BlinkDetector: Camera access granted, stream obtained')
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = async () => {
          try {
            console.log('BlinkDetector: Video metadata loaded, attempting to play')
            await videoRef.current?.play()
            console.log('BlinkDetector: Video playing successfully')
            initializeFaceMesh()
          } catch (error) {
            console.error('BlinkDetector: Error playing video:', error)
          }
        }
        
        // Fallback: try to initialize after a short delay if metadata doesn't load
        setTimeout(() => {
          if (videoRef.current && !faceMesh) {
            console.log('BlinkDetector: Fallback initialization after delay')
            initializeFaceMesh()
          }
        }, 1000)
      }
    } catch (error) {
      console.error('BlinkDetector: Error accessing camera:', error)
    }
  }

  const initializeFaceMesh = async () => {
    try {
      console.log('BlinkDetector: Initializing MediaPipe FaceMesh...')
      const [{ FaceMesh }, { Camera }] = await Promise.all([
        import('@mediapipe/face_mesh'),
        import('@mediapipe/camera_utils')
      ])
      console.log('BlinkDetector: MediaPipe modules loaded successfully')
      
      const mesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        }
      })

      mesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true, // Better eye landmarks
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      })

      mesh.onResults(onResults)
      setFaceMesh(mesh)
      console.log('BlinkDetector: FaceMesh configured and set up')

      if (videoRef.current) {
        console.log('BlinkDetector: Creating MediaPipe camera...')
        const cam = new Camera(videoRef.current, {
          onFrame: async () => {
            try {
              if (videoRef.current && mesh) {
                await mesh.send({ image: videoRef.current })
              }
            } catch (error) {
              console.error('Frame processing error:', error)
            }
          },
          width: 320,
          height: 240
        })
        
        cam.start()
        setCamera(cam)
        setIsDetecting(true)
        console.log('BlinkDetector: MediaPipe camera started, detection active')
      }
    } catch (error) {
      console.error('BlinkDetector: Failed to initialize MediaPipe:', error)
      const err = error as Error
      console.error('Error details:', err.message, err.stack)
    }
  }

  const onResults = useCallback((results: any) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0]
      const ear = calculateEAR(landmarks)
      
      setCurrentEAR(ear)
      
      // Detect blinks using simple threshold
      detectBlink(ear)
    } else {
      // No face detected
      console.log('BlinkDetector: No face detected in frame')
    }
  }, [])

  const calculateEAR = (landmarks: any[]) => {
    if (!landmarks || landmarks.length < 468) return 0

    try {
      // Left eye landmarks (6 points for EAR calculation)
      const LEFT_EYE = [33, 160, 158, 133, 153, 144]
      // Right eye landmarks (6 points for EAR calculation)  
      const RIGHT_EYE = [362, 385, 387, 263, 373, 380]

      const leftEyePoints = LEFT_EYE.map(i => landmarks[i])
      const rightEyePoints = RIGHT_EYE.map(i => landmarks[i])

      const leftEAR = calculateEyeEAR(leftEyePoints)
      const rightEAR = calculateEyeEAR(rightEyePoints)
      
      return (leftEAR + rightEAR) / 2
    } catch (error) {
      return 0
    }
  }

  const calculateEyeEAR = (eyeLandmarks: any[]) => {
    if (!eyeLandmarks || eyeLandmarks.length < 6) return 0

    try {
      // Convert normalized coordinates to pixel coordinates
      const points = eyeLandmarks.map(landmark => ({
        x: landmark.x * 320,
        y: landmark.y * 240
      }))

      // Calculate vertical distances (eye height)
      const v1 = Math.sqrt(Math.pow(points[1].x - points[5].x, 2) + Math.pow(points[1].y - points[5].y, 2))
      const v2 = Math.sqrt(Math.pow(points[2].x - points[4].x, 2) + Math.pow(points[2].y - points[4].y, 2))
      
      // Calculate horizontal distance (eye width)
      const h = Math.sqrt(Math.pow(points[0].x - points[3].x, 2) + Math.pow(points[0].y - points[3].y, 2))
      
      if (h === 0) return 0
      
      // Eye Aspect Ratio = (vertical1 + vertical2) / (2 * horizontal)
      const ear = (v1 + v2) / (2.0 * h)
      return ear
    } catch (error) {
      return 0
    }
  }

  const detectBlink = (currentEar: number) => {
    const BLINK_THRESHOLD = 0.25 // Simple threshold for blink detection

    const isBlinkFrame = currentEar < BLINK_THRESHOLD
    const currentTime = Date.now()

    if (isBlinkFrame) {
      // Start or continue a blink
      if (!isBlinkingRef.current) {
        // Start of a new blink
        isBlinkingRef.current = true
        blinkStartTimeRef.current = Date.now()
        setLastBlinkDetected(true) // Visual indicator
        console.log(`👁️ BLINK START: EAR=${currentEar.toFixed(3)}`)
      }
      // Continue existing blink - no action needed, just track duration
    } else {
      // Not blinking in this frame
      if (isBlinkingRef.current && blinkStartTimeRef.current) {
        // End of blink - calculate duration
        const blinkDuration = currentTime - blinkStartTimeRef.current
        const isLong = blinkDuration >= 400 // 400ms = long blink (dash)

        // Reset blink state
        isBlinkingRef.current = false
        blinkStartTimeRef.current = null

        // Count the blink
        setBlinkCount(prev => prev + 1)

        console.log(`🔥 BLINK END! Duration: ${blinkDuration}ms, Long: ${isLong} (${isLong ? 'DASH' : 'DOT'})`)
        onBlink(isLong)

        // Reset visual indicator after a delay
        if (blinkTimeoutRef.current) {
          clearTimeout(blinkTimeoutRef.current)
        }
        blinkTimeoutRef.current = setTimeout(() => {
          setLastBlinkDetected(false)
        }, 300)
      }
    }

    // Debug logging
    if (Math.random() < 0.05) { // Log 5% of frames
      console.log(`EAR: ${currentEar.toFixed(3)}, Blinking: ${isBlinkingRef.current}`)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Camera Feed */}
      <div className="relative w-32 h-24 border border-neon-purple/50 rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full h-full object-cover transform scale-x-[-1] ${lastBlinkDetected ? 'ring-2 ring-green-400' : ''}`}
          style={{ backgroundColor: 'black', minWidth: '128px', minHeight: '96px' }}
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
        {lastBlinkDetected && (
          <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
            <div className="text-green-400 font-bold text-sm">BLINK!</div>
          </div>
        )}
        {/* Debug info overlay */}
        <div className="absolute top-0 left-0 text-xs text-white bg-black/50 px-1">
          {videoRef.current?.srcObject ? 'ON' : 'OFF'} | {isDetecting ? 'DETECT' : 'INIT'}
        </div>
        <div className="absolute bottom-0 left-0 text-xs text-white bg-black/50 px-1">
          EAR: {currentEAR.toFixed(2)}
        </div>
      </div>
      
      {/* Status Info Below Camera */}
      <div className="w-32 space-y-1">
        <div className="text-xs text-white bg-black/50 px-2 py-1 rounded text-center">
          {videoRef.current?.srcObject ? 'Detecting' : 'Camera Off'} | Blinks: {blinkCount}
        </div>
        
        <div className="text-xs text-white bg-black/50 px-2 py-1 rounded text-center">
          EAR: {currentEAR.toFixed(2)}
        </div>
      </div>
    </div>
  )
}