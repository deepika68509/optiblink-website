'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlinkDetector from './components/BlinkDetector'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

// Morse code mapping
const MORSE_CODE: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '---.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '----', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..'
}

const REVERSE_MORSE: { [key: string]: string } = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([letter, code]) => [code, letter])
)

// Bubble color combinations
const BUBBLE_COLORS = [
  { from: 'from-blue-500/40', to: 'to-blue-600/60', border: 'border-blue-500/70' },
  { from: 'from-green-500/40', to: 'to-green-600/60', border: 'border-green-500/70' },
  { from: 'from-red-500/40', to: 'to-red-600/60', border: 'border-red-500/70' },
  { from: 'from-yellow-500/40', to: 'to-yellow-600/60', border: 'border-yellow-500/70' },
  { from: 'from-purple-500/40', to: 'to-purple-600/60', border: 'border-purple-500/70' },
  { from: 'from-pink-500/40', to: 'to-pink-600/60', border: 'border-pink-500/70' },
  { from: 'from-indigo-500/40', to: 'to-indigo-600/60', border: 'border-indigo-500/70' },
  { from: 'from-teal-500/40', to: 'to-teal-600/60', border: 'border-teal-500/70' },
  { from: 'from-orange-500/40', to: 'to-orange-600/60', border: 'border-orange-500/70' },
  { from: 'from-cyan-500/40', to: 'to-cyan-600/60', border: 'border-cyan-500/70' }
]

interface Bubble {
  id: number
  letter: string
  morse: string
  x: number
  y: number
  speed: number
  size: number
  color: {
    from: string
    to: string
    border: string
  }
}

interface GameStats {
  score: number
  accuracy: number
  level: number
  bubblesPopped: number
  totalBubbles: number
}

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [currentMorse, setCurrentMorse] = useState('')
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    accuracy: 100,
    level: 1,
    bubblesPopped: 0,
    totalBubbles: 0
  })
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [blinkDetected, setBlinkDetected] = useState(false)
  const [lives, setLives] = useState(3)
  const [waitingForNextLevel, setWaitingForNextLevel] = useState(false)
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set())
  const [usedColors, setUsedColors] = useState<Set<number>>(new Set())

  const videoRef = useRef<HTMLVideoElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const bubbleIdRef = useRef(0)
  const streamRef = useRef<MediaStream | null>(null)
  
  // Fix for React state closure issue - use refs for current values
  const gameStateRef = useRef({
    gameStarted: false,
    cameraEnabled: false,
    gameOver: false,
    lives: 3,
    waitingForNextLevel: false
  })
  
  // Ref for current Morse code to avoid stale closures
  const currentMorseRef = useRef('')
  
  // Ref for current bubbles to avoid stale closures
  const bubblesRef = useRef<Bubble[]>([])
  
  // Add debouncing for blink handling
  const lastBlinkTimeRef = useRef(0)
  
  // Auto-submit timeout
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Prevent duplicate lives reduction in same frame
  const livesReductionProcessedRef = useRef(false)
  
  // Start/reset auto-submit timer
  const startAutoSubmitTimer = useCallback(() => {
    // Clear existing timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
    }
    
    // Start new timer (2 seconds)
    autoSubmitTimeoutRef.current = setTimeout(() => {
      // Use refs to get current values (avoid stale closures)
      const currentState = gameStateRef.current
      const morseToSubmit = currentMorseRef.current
      if (morseToSubmit && currentState.gameStarted && !currentState.gameOver) {
        console.log('⏰ Auto-submitting Morse code after 2 seconds of inactivity:', morseToSubmit)
        // Clear the timer before submitting
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
          autoSubmitTimeoutRef.current = undefined
        }
        checkMorseCodeWithValue(morseToSubmit)
      }
    }, 2000)
  }, []) // Remove dependencies to avoid stale closures
  
  // Update refs whenever state changes
  useEffect(() => {
    gameStateRef.current = { gameStarted, cameraEnabled, gameOver, lives, waitingForNextLevel }
    currentMorseRef.current = currentMorse
    bubblesRef.current = bubbles
  }, [gameStarted, cameraEnabled, gameOver, lives, currentMorse, bubbles, waitingForNextLevel])

  // Start auto-submit timer whenever Morse code is added
  useEffect(() => {
    if (currentMorse && gameStarted && !gameOver) {
      startAutoSubmitTimer()
    }
  }, [currentMorse, gameStarted, gameOver, startAutoSubmitTimer])

  // Handle blink from BlinkDetector component
  const handleBlink = useCallback((isLong: boolean) => {
    // Add debouncing - prevent rapid blink processing
    const currentTime = Date.now()
    if (currentTime - lastBlinkTimeRef.current < 300) {
      console.log('🚫 Blink ignored - too soon after last blink (debounced)')
      return
    }
    lastBlinkTimeRef.current = currentTime
    
    // Use refs to get current state values (avoids React closure issues)
    const currentState = gameStateRef.current
    
    console.log('🎯 Game received blink callback:', { 
      isLong, 
      gameStarted: currentState.gameStarted, 
      cameraEnabled: currentState.cameraEnabled, 
      gameOver: currentState.gameOver,
      lives: currentState.lives,
      currentTime: new Date().toLocaleTimeString()
    })
    
    if (!currentState.gameStarted) {
      console.log('🚫 Blink ignored - GAME NOT STARTED. gameStarted =', currentState.gameStarted)
      return
    }
    
    if (!currentState.cameraEnabled) {
      console.log('🚫 Blink ignored - CAMERA DISABLED. cameraEnabled =', currentState.cameraEnabled)
      return
    }
    
    if (currentState.gameOver) {
      console.log('🚫 Blink ignored - GAME OVER. gameOver =', currentState.gameOver)
      return
    }

    if (currentState.waitingForNextLevel) {
      console.log('🚫 Blink ignored - WAITING FOR NEXT LEVEL. waitingForNextLevel =', currentState.waitingForNextLevel)
      return
    }
    
    console.log('✅ Blink ACCEPTED! Processing:', isLong ? 'LONG (-)' : 'SHORT (.)')
    
    setBlinkDetected(true)
    const symbol = isLong ? '-' : '.'
    
    setCurrentMorse(prev => {
      const newMorse = prev + symbol
      console.log('📝 Updated morse code:', newMorse)
      return newMorse
    })

    // Start/reset auto-submit timer
    startAutoSubmitTimer()

    setTimeout(() => {
      setBlinkDetected(false)
    }, 200)
  }, []) // Remove dependencies since we're using refs

  // Simplified blink detection using space bar for backup (when camera fails)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameStarted && !gameOver && !waitingForNextLevel) { // Always allow keyboard controls as backup
        if (event.code === 'Space') {
          event.preventDefault()
          console.log('🔵 Keyboard blink:', event.shiftKey ? 'LONG (-)' : 'SHORT (.)')
          simulateBlink(event.shiftKey) // Shift+Space for long blink, Space for short blink
        } else if (event.code === 'Enter') {
          event.preventDefault()
          console.log('🔵 Manual submit, current morse:', currentMorse)
          checkMorseCode()
        } else if (event.code === 'Backspace') {
          event.preventDefault()
          setCurrentMorse(prev => {
            const newMorse = prev.slice(0, -1)
            // Clear auto-submit timer when modifying Morse code
            if (autoSubmitTimeoutRef.current) {
              clearTimeout(autoSubmitTimeoutRef.current)
              autoSubmitTimeoutRef.current = undefined
            }
            return newMorse
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, currentMorse, gameOver, waitingForNextLevel])

  // Initialize camera
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
      
      setCameraEnabled(true)
      console.log('Camera initialized successfully')
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Camera access denied. You can still play using keyboard controls!')
      setCameraEnabled(false) // Disable camera but allow keyboard controls
    }
  }

  // Simulate blink detection (placeholder for actual MediaPipe implementation)
  const simulateBlink = (isLong: boolean) => {
    console.log('🔵 Simulating blink:', isLong ? 'LONG (-)' : 'SHORT (.)')
    setBlinkDetected(true)
    const symbol = isLong ? '-' : '.'
    setCurrentMorse(prev => {
      const newMorse = prev + symbol
      console.log('📝 Updated morse code:', newMorse)
      return newMorse
    })

    // Start/reset auto-submit timer
    startAutoSubmitTimer()

    setTimeout(() => {
      setBlinkDetected(false)
    }, 200)
  }

  // Check if morse code matches any bubble
  const checkMorseCode = () => {
    // Clear auto-submit timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
      autoSubmitTimeoutRef.current = undefined
    }
    
    checkMorseCodeWithValue(currentMorse)
  }

  const checkMorseCodeWithValue = (morseValue: string) => {
    if (!morseValue) return

    // Don't process input if waiting for next level
    if (waitingForNextLevel) {
      console.log('🚫 Input ignored - waiting for next level')
      return
    }

    console.log('🔍 Checking Morse code:', morseValue)
    console.log('📊 Current bubbles:', bubblesRef.current.map(b => `${b.letter}(${b.morse})`))

    const matchingLetter = REVERSE_MORSE[morseValue]
    console.log('🔤 Matching letter for', morseValue, 'is', matchingLetter)
    
    if (matchingLetter) {
      const matchingBubble = bubblesRef.current.find(bubble => bubble.letter === matchingLetter)
      console.log('🎈 Found matching bubble:', matchingBubble ? `${matchingBubble.letter}(${matchingBubble.morse})` : 'none')
      
      if (matchingBubble) {
        popBubble(matchingBubble.id)
        setGameStats(prev => ({
          ...prev,
          score: prev.score + 10, // Fixed 10 points per bubble regardless of level
          bubblesPopped: prev.bubblesPopped + 1,
          accuracy: Math.round(((prev.bubblesPopped + 1) / Math.max(prev.totalBubbles, 1)) * 100)
        }))
        console.log(`✅ Bubble popped! ${matchingLetter} = ${morseValue}`)
      } else {
        // Wrong morse code - no matching bubble
        console.log(`❌ Wrong target! ${matchingLetter} = ${morseValue} (no bubble)`)
        setLives(prev => {
          const newLives = Math.max(0, prev - 1)
          if (newLives <= 0) {
            // Clear auto-submit timer on game over
            if (autoSubmitTimeoutRef.current) {
              clearTimeout(autoSubmitTimeoutRef.current)
              autoSubmitTimeoutRef.current = undefined
            }
            setGameOver(true)
            setGameStarted(false)
          }
          return newLives
        })
      }
    } else {
      // Invalid morse code
      console.log(`❌ Invalid morse code: ${morseValue}`)
      setLives(prev => {
        const newLives = Math.max(0, prev - 1)
        if (newLives <= 0) {
          // Clear auto-submit timer on game over
          if (autoSubmitTimeoutRef.current) {
            clearTimeout(autoSubmitTimeoutRef.current)
            autoSubmitTimeoutRef.current = undefined
          }
          setGameOver(true)
          setGameStarted(false)
        }
        return newLives
      })
    }
    setCurrentMorse('')
  }

  // Pop bubble animation and spawn new one
  const popBubble = (id: number) => {
    console.log(`💥 Popping bubble with id: ${id}`)
    setBubbles(prev => {
      const filtered = prev.filter(bubble => bubble.id !== id)
      console.log(`📊 Bubbles after pop: ${filtered.length}`)
      return filtered
    })
    // Only spawn a new bubble if not waiting for next level
    if (!waitingForNextLevel) {
      console.log('⏰ Scheduling next bubble generation in 500ms...')
      setTimeout(() => {
        generateBubble()
      }, 500) // 500ms delay before next bubble appears
    } else {
      console.log('🚫 Not generating new bubble - waiting for next level')
    }
  }

  // Generate random bubble
  const generateBubble = () => {
    console.log('🎈 Generating new bubble...')
    const letters = Object.keys(MORSE_CODE)
    const availableLetters = letters.filter(letter => !usedLetters.has(letter))

    // If all letters have been used, reset the tracking
    let selectedLetter: string
    if (availableLetters.length === 0) {
      console.log('🔄 All letters used, resetting tracking')
      setUsedLetters(new Set())
      setUsedColors(new Set())
      selectedLetter = letters[Math.floor(Math.random() * letters.length)]
    } else {
      selectedLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)]
    }

    // Get available colors
    const availableColorIndices = BUBBLE_COLORS.map((_, index) => index)
      .filter(index => !usedColors.has(index))

    let selectedColorIndex: number
    if (availableColorIndices.length === 0) {
      console.log('🔄 All colors used, resetting color tracking')
      setUsedColors(new Set())
      selectedColorIndex = Math.floor(Math.random() * BUBBLE_COLORS.length)
    } else {
      selectedColorIndex = availableColorIndices[Math.floor(Math.random() * availableColorIndices.length)]
    }

    const selectedColor = BUBBLE_COLORS[selectedColorIndex]

    // Update tracking
    setUsedLetters(prev => new Set([...Array.from(prev), selectedLetter]))
    setUsedColors(prev => new Set([...Array.from(prev), selectedColorIndex]))

    const bubble: Bubble = {
      id: bubbleIdRef.current++,
      letter: selectedLetter,
      morse: MORSE_CODE[selectedLetter],
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: -15, // Start higher above screen to give more time
      speed: Math.random() * 0.5 + 0.3 + gameStats.level * 0.4, // Increasing speed per level
      size: Math.random() * 30 + 40,
      color: selectedColor
    }
    console.log(`🎈 Created bubble: ${bubble.letter} (${bubble.morse}) at level ${gameStats.level}, speed: ${bubble.speed.toFixed(2)}, color: ${selectedColor.from}`)
    setBubbles(prev => {
      const newBubbles = [...prev, bubble]
      console.log(`📊 Total bubbles on screen: ${newBubbles.length}`)
      return newBubbles
    })
    setGameStats(prev => ({
      ...prev,
      totalBubbles: prev.totalBubbles + 1
    }))
  }

  // Game loop
  useEffect(() => {
    if (gameStarted && !gameOver && !waitingForNextLevel) {
      gameLoopRef.current = setInterval(() => {
        // Reset lives reduction flag at start of each frame
        livesReductionProcessedRef.current = false
        
        // Move bubbles
        setBubbles(prev => {
          const updatedBubbles = prev.map(bubble => ({
            ...bubble,
            y: bubble.y + bubble.speed
          }))

          // Count bubbles that reached bottom
          const bubblesReachedBottom = updatedBubbles.filter(bubble => bubble.y > 100).length
          
          // Remove bubbles that reached bottom
          const survivingBubbles = updatedBubbles.filter(bubble => bubble.y <= 100)

          // Reduce lives for bubbles that reached bottom (only once per frame)
          if (bubblesReachedBottom > 0 && !livesReductionProcessedRef.current) {
            livesReductionProcessedRef.current = true
            console.log(`💥 ${bubblesReachedBottom} bubble(s) reached bottom! Reducing lives...`)
            setLives(prevLives => {
              const newLives = Math.max(0, prevLives - bubblesReachedBottom)
              console.log(`❤️ Lives: ${prevLives} -> ${newLives}`)
              if (newLives <= 0) {
                console.log('💀 Game Over! No lives left.')
                // Clear auto-submit timer on game over
                if (autoSubmitTimeoutRef.current) {
                  clearTimeout(autoSubmitTimeoutRef.current)
                  autoSubmitTimeoutRef.current = undefined
                }
                setGameOver(true)
                setGameStarted(false)
              } else {
                console.log(`📊 ${newLives} lives remaining. Game continues.`)
              }
              return newLives
            })
          }

          // Generate new bubble if no bubbles remain (only when not waiting for level)
          let finalBubbles = survivingBubbles
          if (survivingBubbles.length === 0 && !waitingForNextLevel) {
            console.log('🎈 No bubbles remaining, generating new bubble...')
            const letters = Object.keys(MORSE_CODE)
            const availableLetters = letters.filter(letter => !usedLetters.has(letter))

            // If all letters have been used, reset the tracking
            let selectedLetter: string
            if (availableLetters.length === 0) {
              console.log('🔄 All letters used, resetting tracking')
              setUsedLetters(new Set())
              setUsedColors(new Set())
              selectedLetter = letters[Math.floor(Math.random() * letters.length)]
            } else {
              selectedLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)]
            }

            // Get available colors
            const availableColorIndices = BUBBLE_COLORS.map((_, index) => index)
              .filter(index => !usedColors.has(index))

            let selectedColorIndex: number
            if (availableColorIndices.length === 0) {
              console.log('🔄 All colors used, resetting color tracking')
              setUsedColors(new Set())
              selectedColorIndex = Math.floor(Math.random() * BUBBLE_COLORS.length)
            } else {
              selectedColorIndex = availableColorIndices[Math.floor(Math.random() * availableColorIndices.length)]
            }

            const selectedColor = BUBBLE_COLORS[selectedColorIndex]

            // Update tracking
            setUsedLetters(prev => new Set([...Array.from(prev), selectedLetter]))
            setUsedColors(prev => new Set([...Array.from(prev), selectedColorIndex]))

            const newBubble: Bubble = {
              id: bubbleIdRef.current++,
              letter: selectedLetter,
              morse: MORSE_CODE[selectedLetter],
              x: Math.random() * 80 + 10,
              y: -15, // Start higher above screen
              speed: Math.random() * 0.5 + 0.3 + gameStats.level * 0.4, // Increasing speed per level
              size: Math.random() * 30 + 40,
              color: selectedColor
            }
            finalBubbles = [newBubble]
            console.log(`🎈 Generated bubble: ${newBubble.letter} (${newBubble.morse})`)

            // Update game stats
            setGameStats(prev => ({
              ...prev,
              totalBubbles: prev.totalBubbles + 1
            }))
          }

          return finalBubbles
        })
      }, 150)

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current)
        }
      }
    }
  }, [gameStarted, gameOver, gameStats.level, lives, waitingForNextLevel])

  // Level up logic
  useEffect(() => {
    // Level thresholds: level 1 at 50, level 2 at 100 (score resets for level 2)
    const levelThreshold = gameStats.level * 50
    if (gameStats.score >= levelThreshold && gameStats.score > 0 && !waitingForNextLevel) {
      console.log(`🎉 Level ${gameStats.level} complete! Score: ${gameStats.score}/${levelThreshold}`)

      // If level 2 is completed, end the game with victory
      if (gameStats.level === 2) {
        console.log('🏆 Game completed! Player won!')
        setGameOver(true)
        setGameStarted(false)
        // Clear any pending auto-submit timer
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
          autoSubmitTimeoutRef.current = undefined
        }
      } else {
        setWaitingForNextLevel(true)
        // Clear any pending auto-submit timer when level completes
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
          autoSubmitTimeoutRef.current = undefined
        }
      }
    }
  }, [gameStats.score, gameStats.level, waitingForNextLevel])

  const startGame = () => {
    console.log('🎮 Starting game! Setting gameStarted to true...')
    setGameStarted(true)
    setGameOver(false)
    setBubbles([])
    setCurrentMorse('')
    setLives(3)
    setWaitingForNextLevel(false)
    setUsedLetters(new Set()) // Reset used letters
    setUsedColors(new Set()) // Reset used colors
    setGameStats({
      score: 0,
      accuracy: 100,
      level: 1,
      bubblesPopped: 0,
      totalBubbles: 0
    })
    bubbleIdRef.current = 0
    
    console.log('🎮 Game state updated! gameStarted should now be true')
    
    // Generate first bubble immediately
    setTimeout(() => {
      generateBubble()
    }, 1000)
  }

  const resetGame = () => {
    // Clear auto-submit timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
      autoSubmitTimeoutRef.current = undefined
    }
    
    setGameStarted(false)
    setGameOver(false)
    setBubbles([])
    setCurrentMorse('')
    setLives(3)
    setWaitingForNextLevel(false)
    setUsedLetters(new Set()) // Reset used letters
    setUsedColors(new Set()) // Reset used colors
    setGameStats({
      score: 0,
      accuracy: 100,
      level: 1,
      bubblesPopped: 0,
      totalBubbles: 0
    })
  }

  const startNextLevel = () => {
    console.log(`🚀 Starting level ${gameStats.level + 1}!`)
    setGameStats(prev => ({
      ...prev,
      level: prev.level + 1,
      score: 0 // Reset score for level 2 (final level challenge)
    }))
    setLives(3) // Reset lives for new level
    setWaitingForNextLevel(false)
    setCurrentMorse('')
    setUsedLetters(new Set()) // Reset used letters for new level
    setUsedColors(new Set()) // Reset used colors for new level
    
    // Clear auto-submit timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
      autoSubmitTimeoutRef.current = undefined
    }
    
    // Clear any remaining bubbles
    setBubbles([])
    console.log('🧹 Cleared all bubbles for new level')
    
    // Generate first bubble for new level
    setTimeout(() => {
      generateBubble()
    }, 1000)
  }

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      // Clear auto-submit timer
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-primary-dark">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">OptiBlink Bubble Pop</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Blink in Morse code patterns to pop bubbles!
            </p>
          </div>

          {/* Game Area */}
          <div className="bg-neutral-dark border border-neon-purple/30 rounded-xl overflow-hidden">
            {/* Game Stats */}
            {gameStarted && (
              <div className="bg-neutral-darker p-4 border-b border-neon-purple/20">
                <div className="flex justify-between items-center text-white">
                  <div className="flex space-x-6">
                    <span>Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></span>
                    <span>Level: <span className="text-neon-purple font-bold">{gameStats.level}</span></span>
                    <span>Lives: <span className="text-red-400 font-bold">{'❤️'.repeat(Math.max(0, lives))}</span></span>
                    <span>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span></span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Current: <span className="text-yellow-400 font-mono text-lg">{currentMorse || '___'}</span></span>
                    <button 
                      onClick={checkMorseCode}
                      className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/50 rounded text-white text-xs hover:bg-neon-purple/30"
                    >
                      Submit
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentMorse('')
                        // Clear auto-submit timer
                        if (autoSubmitTimeoutRef.current) {
                          clearTimeout(autoSubmitTimeoutRef.current)
                          autoSubmitTimeoutRef.current = undefined
                        }
                      }}
                      className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-white text-xs hover:bg-red-500/30"
                    >
                      Clear
                    </button>
                    {blinkDetected && (
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Game Canvas */}
            <div className="relative h-96 bg-gradient-to-b from-blue-900/20 to-purple-900/20 overflow-hidden">
              {/* Camera Feed (small corner overlay) */}
              {cameraEnabled && (
                <div className="absolute top-4 right-4 z-10">
                  <BlinkDetector
                    onBlink={handleBlink}
                    isEnabled={cameraEnabled}
                  />
                  {/* Manual blink trigger for testing - positioned below the detector */}
                  <div className="flex space-x-1 mt-1">
                    <button
                      onClick={() => handleBlink(false)}
                      className="px-2 py-1 bg-blue-500/80 text-white text-xs rounded hover:bg-blue-600/80"
                      title="Manual Short Blink (.)"
                    >
                      .
                    </button>
                    <button
                      onClick={() => handleBlink(true)}
                      className="px-2 py-1 bg-orange-500/80 text-white text-xs rounded hover:bg-orange-600/80"
                      title="Manual Long Blink (-)"
                    >
                      -
                    </button>
                  </div>
                </div>
              )}

              {/* Bubbles */}
              <AnimatePresence>
                {bubbles.map(bubble => (
                  <motion.div
                    key={bubble.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute"
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: bubble.size,
                      height: bubble.size,
                      transition: 'top 0.1s linear, left 0.1s linear',
                    }}
                  >
                    <div className="relative w-full h-full">
                      {/* Bubble */}
                      <div className={`w-full h-full bg-gradient-to-br ${bubble.color.from} ${bubble.color.to} rounded-full border-2 ${bubble.color.border} flex items-center justify-center backdrop-blur-sm shadow-lg`}>
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{bubble.letter}</div>
                          <div className="text-white/70 text-xs font-mono">{bubble.morse}</div>
                        </div>
                      </div>
                      {/* Bubble highlight */}
                      <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Game Start Screen */}
              {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <h3 className="text-3xl font-bold text-white">Ready to Play?</h3>
                    <p className="text-white/70 max-w-md">
                      Enable your camera to use eye blink detection for Morse code input.
                      Short blinks = dots (.), Long blinks = dashes (-)
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={initializeCamera}
                        className="btn-secondary"
                      >
                        Try Enable Camera
                      </button>
                      <button
                        onClick={startGame}
                        className="btn-primary"
                      >
                        Start Game (Keyboard)
                      </button>
                      <button
                        onClick={() => setShowInstructions(true)}
                        className="btn-secondary ml-4"
                      >
                        Instructions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <h3 className="text-4xl font-bold text-red-400">
                      {gameStats.level >= 2 ? '🎉 Congratulations! 🎉' : 'Game Over!'}
                    </h3>
                    <div className="text-white space-y-2">
                      <p>Final Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></p>
                      <p>Bubbles Popped: <span className="text-neon-purple font-bold">{gameStats.bubblesPopped}</span></p>
                      <p>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span></p>
                      <p>Level Reached: <span className="text-neon-purple font-bold">{gameStats.level}</span></p>
                      {gameStats.level >= 2 && (
                        <p className="text-green-400 font-bold text-lg">You completed all levels!</p>
                      )}
                    </div>
                    <div className="space-x-4">
                      <button
                        onClick={startGame}
                        className="btn-primary"
                      >
                        Play Again
                      </button>
                      <button
                        onClick={resetGame}
                        className="btn-secondary"
                      >
                        Main Menu
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Level Complete Screen */}
              {waitingForNextLevel && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <h3 className="text-4xl font-bold text-green-400">Level {gameStats.level} Complete!</h3>
                    <div className="text-white space-y-2">
                      <p>Level Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></p>
                      <p>Total Bubbles Popped: <span className="text-neon-purple font-bold">{gameStats.bubblesPopped}</span></p>
                      <p>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span></p>
                    </div>
                    <p className="text-white/70">
                      {gameStats.level === 1
                        ? 'Ready for Level 2? Bubbles will be faster and you get fresh lives!'
                        : 'Ready for the final level? Bubbles will be even faster!'
                      }
                    </p>
                    <div className="space-x-4">
                      <button
                        onClick={startNextLevel}
                        className="btn-primary"
                      >
                        Start Level {gameStats.level + 1}
                      </button>
                      <button
                        onClick={resetGame}
                        className="btn-secondary"
                      >
                        Main Menu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Help */}
            {gameStarted && (
              <div className="p-4 bg-neutral-darker/50 border-t border-neon-purple/20">
                <div className="text-white/70 text-sm text-center">
                  <span><strong>Controls:</strong> Space = Dot (.) • Shift+Space = Dash (-) • Enter = Submit • Backspace = Delete</span>
                  {cameraEnabled && <span> • <strong>OR</strong> Short Blink = Dot • Long Blink = Dash</span>}
                </div>
              </div>
            )}

            {/* Morse Code Reference */}
            {gameStarted && (
              <div className="p-4 bg-neutral-darker/50">
                <details className="text-white">
                  <summary className="cursor-pointer text-neon-purple">Morse Code Reference</summary>
                  <div className="mt-2 grid grid-cols-6 md:grid-cols-13 gap-2 text-sm">
                    {Object.entries(MORSE_CODE).map(([letter, code]) => (
                      <div key={letter} className="text-center">
                        <div className="font-bold">{letter}</div>
                        <div className="text-white/70 font-mono text-xs">{code}</div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>

          {/* Instructions Modal */}
          {showInstructions && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-neutral-dark border border-neon-purple/30 rounded-xl p-8 max-w-2xl mx-4">
                <h3 className="text-2xl font-bold text-white mb-4">How to Play</h3>
                <div className="space-y-4 text-white/80">
                  <p><strong>🎯 Objective:</strong> Pop bubbles by entering the correct Morse code for each letter</p>
                  <p><strong>👁️ Eye Blink Controls (Camera Enabled):</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• <strong>Short Blink</strong> (quick) = Dot (.)</li>
                    <li>• <strong>Long Blink</strong> (hold for 400ms+) = Dash (-)</li>
                    <li>• <strong>Auto-submit</strong> after 2 seconds of no blinking</li>
                  </ul>
                  <p><strong>⌨️ Keyboard Backup (Camera Disabled):</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• <kbd className="bg-gray-700 px-2 py-1 rounded">Space</kbd> = Dot (.)</li>
                    <li>• <kbd className="bg-gray-700 px-2 py-1 rounded">Shift + Space</kbd> = Dash (-)</li>
                    <li>• <kbd className="bg-gray-700 px-2 py-1 rounded">Enter</kbd> = Submit Morse code</li>
                  </ul>
                  <p><strong>🎮 Gameplay:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Bubbles fall from the top with letters and their Morse codes</li>
                    <li>• Enter the correct Morse pattern to pop the bubble</li>
                    <li>• You lose a life if a bubble reaches the bottom or you enter wrong code</li>
                    <li>• Game ends when you run out of lives</li>
                  </ul>
                  <p><strong>📈 Scoring:</strong> Earn 10 points for each bubble popped. Complete level 1 at 50 points (5 bubbles), then level 2 (final level) resets score to 0 and gives you 3 fresh lives to reach 100 points (10 bubbles) and win!</p>
                </div>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="btn-primary mt-6"
                >
                  Got it!
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}