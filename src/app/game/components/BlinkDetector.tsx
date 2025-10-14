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
  const [baselineEAR, setBaselineEAR] = useState(0)
  const [isCalibrated, setIsCalibrated] = useState(false)
  const [calibrationReadings, setCalibrationReadings] = useState<number[]>([])
  const calibrationReadingsRef = useRef<number[]>([])
  const calibrationCompletedRef = useRef(false) // Prevent multiple calibration completions
  const baselineEARRef = useRef(0) // Synchronous baseline access
  
  // Blink duration tracking
  const blinkStartTimeRef = useRef<number | null>(null)
  const isBlinkingRef = useRef(false)
  
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const calibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isEnabled && !stream) {
      initializeCamera()
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (camera) {
        camera.stop()
      }
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current)
      }
      if (calibrationTimeoutRef.current) {
        clearTimeout(calibrationTimeoutRef.current)
      }
    }
  }, [isEnabled, stream])

  const initializeCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 320,
          height: 240,
          facingMode: 'user',
          frameRate: { ideal: 15, max: 30 }
        },
        audio: false
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          initializeFaceMesh()
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const initializeFaceMesh = async () => {
    try {
      console.log('Initializing MediaPipe Face Mesh for blink detection...')
      
      const [{ FaceMesh }, { Camera }] = await Promise.all([
        import('@mediapipe/face_mesh'),
        import('@mediapipe/camera_utils')
      ])
      
      const mesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        }
      })

      mesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true, // Better eye landmarks
        minDetectionConfidence: 0.3, // Lower threshold for calibration
        minTrackingConfidence: 0.3   // Lower threshold for calibration
      })

      mesh.onResults(onResults)
      setFaceMesh(mesh)

      if (videoRef.current) {
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
        
        // Start calibration phase
        console.log('Starting EAR calibration...')
        calibrationReadingsRef.current = [] // Reset ref
        calibrationCompletedRef.current = false // Reset completion flag
        setCalibrationReadings([]) // Reset state
        // Reset blink tracking
        isBlinkingRef.current = false
        blinkStartTimeRef.current = null
        calibrationTimeoutRef.current = setTimeout(() => {
          finishCalibration()
        }, 5000) // Increased to 5 seconds calibration
      }
    } catch (error) {
      console.error('Failed to initialize MediaPipe:', error)
    }
  }

  const onResults = useCallback((results: any) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0]
      const ear = calculateEAR(landmarks)
      
      setCurrentEAR(ear)
      
      if (!calibrationCompletedRef.current) {
        // Collect calibration readings - update both state and ref
        const newReadings = [...calibrationReadingsRef.current, ear].slice(-50)
        calibrationReadingsRef.current = newReadings
        setCalibrationReadings(newReadings)
        
        // Only log during calibration
        if (newReadings.length % 10 === 0) { // Log every 10th reading to reduce spam
          console.log(`Calibration reading ${newReadings.length}/50: EAR=${ear.toFixed(3)}`)
        }
        
        // Auto-finish calibration if we have enough readings
        if (newReadings.length >= 50 && calibrationTimeoutRef.current) {
          clearTimeout(calibrationTimeoutRef.current)
          setTimeout(finishCalibration, 100) // Small delay to ensure state updates
        }
      } else {
        // Detect blinks using calibrated baseline
        detectBlink(ear)
      }
    } else if (!isCalibrated) {
      // Only log face detection issues during calibration
      console.log('No face detected during calibration')
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

  const finishCalibration = () => {
    // Prevent multiple calibration completions
    if (calibrationCompletedRef.current) return
    
    // Clear the timeout if it's still running
    if (calibrationTimeoutRef.current) {
      clearTimeout(calibrationTimeoutRef.current)
      calibrationTimeoutRef.current = null
    }
    
    const readings = calibrationReadingsRef.current
    console.log(`Finishing calibration with ${readings.length} readings`)
    
    if (readings.length >= 5) { // Accept as few as 5 readings
      // Calculate baseline EAR from calibration readings
      const sortedReadings = [...readings].sort((a, b) => a - b)
      // Use median of middle 50% to avoid outliers
      const middle50 = sortedReadings.slice(
        Math.floor(sortedReadings.length * 0.25), 
        Math.floor(sortedReadings.length * 0.75)
      )
      const baseline = middle50.length > 0 
        ? middle50.reduce((sum, val) => sum + val, 0) / middle50.length
        : sortedReadings[Math.floor(sortedReadings.length / 2)] // Fallback to median
      
      setBaselineEAR(baseline)
      baselineEARRef.current = baseline // Set ref synchronously
      setIsCalibrated(true)
      calibrationCompletedRef.current = true // Mark as completed
      console.log(`✅ Calibration complete! Baseline EAR: ${baseline.toFixed(3)} from ${readings.length} readings`)
    } else {
      console.log(`❌ Calibration failed - only ${readings.length} readings (need 5+)`)
      // Use default baseline based on any readings we got
      const fallbackBaseline = readings.length > 0 
        ? readings.reduce((sum, val) => sum + val, 0) / readings.length
        : 0.25
      setBaselineEAR(fallbackBaseline)
      baselineEARRef.current = fallbackBaseline // Set ref synchronously
      setIsCalibrated(true)
      calibrationCompletedRef.current = true // Mark as completed even with fallback
      console.log(`⚠️ Using fallback baseline EAR: ${fallbackBaseline.toFixed(3)}`)
    }
  }

  const detectBlink = (currentEar: number) => {
    if (!calibrationCompletedRef.current || baselineEARRef.current === 0) {
      console.log('Blink detection skipped - not calibrated or no baseline')
      return
    }

    // Calculate how much the EAR has dropped from baseline
    const earDrop = baselineEARRef.current - currentEar
    const earRatio = currentEar / baselineEARRef.current

    // Very sensitive blink detection thresholds for testing
    const BLINK_THRESHOLD_RATIO = 0.4  // EAR drops to 40% of baseline (even more sensitive)
    const BLINK_THRESHOLD_DROP = 0.05   // Or drops by 0.05 absolute (even more sensitive)
    
    const isBlinkFrame = earRatio < BLINK_THRESHOLD_RATIO || earDrop > BLINK_THRESHOLD_DROP
    const currentTime = Date.now()

    if (isBlinkFrame) {
      // Start or continue a blink
      if (!isBlinkingRef.current) {
        // Start of a new blink
        isBlinkingRef.current = true
        blinkStartTimeRef.current = currentTime
        setLastBlinkDetected(true) // Visual indicator
        console.log(`👁️ BLINK START: EAR=${currentEar.toFixed(3)}, Baseline=${baselineEARRef.current.toFixed(3)}`)
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

    // More frequent debug logging to see EAR changes
    if (Math.random() < 0.02) { // Log 2% of frames (reduced from 10%)
      console.log(`EAR: ${currentEar.toFixed(3)}, Baseline: ${baselineEARRef.current.toFixed(3)}, Ratio: ${earRatio.toFixed(2)}, Drop: ${earDrop.toFixed(3)}, Blinking: ${isBlinkingRef.current}`)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Camera Feed */}
      <div className="relative w-32 h-24 border border-neon-purple/50 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full h-full object-cover transform scale-x-[-1] ${lastBlinkDetected ? 'ring-2 ring-green-400' : ''}`}
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
      </div>
      
      {/* Status Info Below Camera */}
      <div className="w-32 space-y-1">
        <div className="text-xs text-white bg-black/50 px-2 py-1 rounded text-center">
          {!calibrationCompletedRef.current ? 'Calibrating...' : 
           isDetecting ? 'Detecting (EAR)' : 'Camera Active'} | Blinks: {blinkCount}
        </div>
        
        <div className="text-xs text-white bg-black/50 px-2 py-1 rounded text-center">
          EAR: {currentEAR.toFixed(2)} | Base: {baselineEAR.toFixed(2)}
        </div>
        
        {/* Calibration progress */}
        {!calibrationCompletedRef.current && (
          <div className="bg-black/50 rounded px-2 py-1">
            <div className="text-xs text-white mb-1 text-center">Calibrating eye position...</div>
            <div className="text-xs text-white/70 mb-1 text-center">
              Readings: {calibrationReadings.length}/50
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (calibrationReadings.length / 50) * 100)}%` }}
              ></div>
            </div>
            {calibrationReadings.length >= 5 && (
              <button
                onClick={finishCalibration}
                className="w-full mt-2 px-2 py-1 bg-green-600/80 text-white text-xs rounded hover:bg-green-700/80"
              >
                Force Calibrate ({calibrationReadings.length} readings)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}