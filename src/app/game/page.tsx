'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlinkDetector from './components/BlinkDetector'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
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
  const [gameOver, setGameOver] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [blinkDetected, setBlinkDetected] = useState(false)
  const [lives, setLives] = useState(3)
  const [waitingForNextLevel, setWaitingForNextLevel] = useState(false)
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set())
  const [usedColors, setUsedColors] = useState<Set<number>>(new Set())
  const [isExpandedView, setIsExpandedView] = useState(false)

  const gameLoopRef = useRef<number>()
  const bubbleIdRef = useRef(0)
  
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
  
  // Prevent multiple bubble generations
  const bubbleGenerationInProgressRef = useRef(false)
  
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

  // Handle blink from BlinkDetector component
  const handleBlink = useCallback((isLong: boolean) => {
    // Add debouncing - prevent rapid blink processing
    const currentTime = Date.now()
    if (currentTime - lastBlinkTimeRef.current < 300) {
      return
    }
    lastBlinkTimeRef.current = currentTime
    
    // Use refs to get current state values (avoids React closure issues)
    const currentState = gameStateRef.current
    
    if (!currentState.gameStarted) {
      return
    }
    
    if (!currentState.cameraEnabled) {
      return
    }
    
    if (currentState.gameOver) {
      return
    }

    if (currentState.waitingForNextLevel) {
      return
    }
    
    setBlinkDetected(true)
    const symbol = isLong ? '-' : '.'
    
    setCurrentMorse(prev => {
      const newMorse = prev + symbol
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
      // Handle Escape key to exit fullscreen
      if (event.code === 'Escape' && isExpandedView) {
        event.preventDefault()
        resetGame()
        return
      }
      
      if (gameStarted && !gameOver && !waitingForNextLevel) { // Always allow keyboard controls as backup
        if (event.code === 'Space') {
          event.preventDefault()
          simulateBlink(event.shiftKey) // Shift+Space for long blink, Space for short blink
        } else if (event.code === 'Enter') {
          event.preventDefault()
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
  }, [gameStarted, currentMorse, gameOver, waitingForNextLevel, isExpandedView])

  // Initialize camera and start game
  const initializeCameraAndStart = async () => {
    // Camera initialization is handled by BlinkDetector component
    setCameraEnabled(true)
    
    // Start the game regardless of camera success/failure
    startGame()
  }

  // Simulate blink detection (placeholder for actual MediaPipe implementation)
  const simulateBlink = (isLong: boolean) => {
    setBlinkDetected(true)
    const symbol = isLong ? '-' : '.'
    setCurrentMorse(prev => {
      const newMorse = prev + symbol
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
      return
    }

    const matchingLetter = REVERSE_MORSE[morseValue]
    
    if (matchingLetter) {
      const matchingBubble = bubblesRef.current.find(bubble => bubble.letter === matchingLetter)
      
      if (matchingBubble) {
        popBubble(matchingBubble.id)
        setGameStats(prev => ({
          ...prev,
          score: prev.score + 10, // Fixed 10 points per bubble regardless of level
          bubblesPopped: prev.bubblesPopped + 1,
          accuracy: Math.round(((prev.bubblesPopped + 1) / Math.max(prev.totalBubbles, 1)) * 100)
        }))
      } else {
        // Wrong morse code - no matching bubble
        setGameStats(prev => ({
          ...prev,
          accuracy: Math.round((prev.bubblesPopped / Math.max(prev.totalBubbles, 1)) * 100)
        }))
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
      setGameStats(prev => ({
        ...prev,
        accuracy: Math.round((prev.bubblesPopped / Math.max(prev.totalBubbles, 1)) * 100)
      }))
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
    setBubbles(prev => {
      const filtered = prev.filter(bubble => bubble.id !== id)
      return filtered
    })
    // Note: Bubble generation is now handled by the game loop to prevent conflicts
  }



  // Game loop with requestAnimationFrame for ultra-smooth animation
  useEffect(() => {
    if (gameStarted && !gameOver && !waitingForNextLevel) {
      let lastTime = 0
      const targetFPS = 60 // Target 60 FPS
      const frameInterval = 1000 / targetFPS // ~16.67ms per frame
      
      const gameLoop = (currentTime: number) => {
        if (currentTime - lastTime >= frameInterval) {
          lastTime = currentTime
          
          // Reset lives reduction flag at start of each frame
          livesReductionProcessedRef.current = false
          
          // Move bubbles (optimize by batching updates)
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
              setLives(prevLives => {
                const newLives = Math.max(0, prevLives - bubblesReachedBottom)
                if (newLives <= 0) {
                  // Check if level 2 and player has popped enough bubbles for victory
                  if (gameStats.level >= 2 && gameStats.bubblesPopped >= 7) {
                    setGameOver(true)
                    setGameStarted(false)
                    // Clear any pending auto-submit timer
                    if (autoSubmitTimeoutRef.current) {
                      clearTimeout(autoSubmitTimeoutRef.current)
                      autoSubmitTimeoutRef.current = undefined
                    }
                  } else {
                    // Clear auto-submit timer on game over
                    if (autoSubmitTimeoutRef.current) {
                      clearTimeout(autoSubmitTimeoutRef.current)
                      autoSubmitTimeoutRef.current = undefined
                    }
                    setGameOver(true)
                    setGameStarted(false)
                  }
                }
                return newLives
              })
            }

            // Generate new bubble if needed (level-based logic)
            let finalBubbles = survivingBubbles
            if (survivingBubbles.length === 0 && !waitingForNextLevel) {
              // Prevent multiple simultaneous bubble generations
              if (bubbleGenerationInProgressRef.current) {
                finalBubbles = survivingBubbles
              } else {
                bubbleGenerationInProgressRef.current = true
                
                // Level 1: Only 1 bubble at a time
                // Level 2: Allow multiple bubbles
                const letters = Object.keys(MORSE_CODE)
                const availableLetters = letters.filter(letter => !usedLetters.has(letter))

                // If all letters have been used, reset the tracking
                let selectedLetter: string
                if (availableLetters.length === 0) {
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
                  speed: Math.random() * 0.05 + 0.03 + gameStats.level * 0.02, // Slightly faster but still gentle
                  size: Math.random() * 30 + 40,
                  color: selectedColor
                }
                finalBubbles = [newBubble]

                // Update game stats
                setGameStats(prev => ({
                  ...prev,
                  totalBubbles: prev.totalBubbles + 1
                }))
                
                // Reset the generation flag after a short delay
                setTimeout(() => {
                  bubbleGenerationInProgressRef.current = false
                }, 100)
              }
            } else if (survivingBubbles.length > 0 && gameStats.level >= 2 && !waitingForNextLevel) {
              // Level 2+: Allow spawning additional bubbles when there are already some on screen
              // But limit to maximum 2 bubbles total for balanced gameplay
              const maxBubbles = 2
              if (survivingBubbles.length < maxBubbles && Math.random() < 0.08 && !bubbleGenerationInProgressRef.current) {
                bubbleGenerationInProgressRef.current = true
                
                const letters = Object.keys(MORSE_CODE)
                const availableLetters = letters.filter(letter => !usedLetters.has(letter))

                let selectedLetter: string
                if (availableLetters.length === 0) {
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
                  speed: Math.random() * 0.05 + 0.03 + gameStats.level * 0.02, // Slightly faster but still gentle
                  size: Math.random() * 30 + 40,
                  color: selectedColor
                }
                finalBubbles = [...survivingBubbles, newBubble]

                // Update game stats
                setGameStats(prev => ({
                  ...prev,
                  totalBubbles: prev.totalBubbles + 1
                }))
                
                // Reset the generation flag after a short delay
                setTimeout(() => {
                  bubbleGenerationInProgressRef.current = false
                }, 100)
              } else {
                finalBubbles = survivingBubbles
              }
            } else {
              finalBubbles = survivingBubbles
            }

            return finalBubbles
          })
        }
        
        // Continue the animation loop
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
      
      // Start the animation loop
      gameLoopRef.current = requestAnimationFrame(gameLoop)

      return () => {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current)
        }
      }
    }
  }, [gameStarted, gameOver, gameStats.level, lives, waitingForNextLevel])

  // Level up logic
  useEffect(() => {
    // Level thresholds: level 1 at 50, level 2 at 100 (score resets for level 2)
    const levelThreshold = gameStats.level * 50
    if (gameStats.score >= levelThreshold && gameStats.score > 0 && !waitingForNextLevel) {
      // If level 2 is completed, end the game with victory
      if (gameStats.level === 2) {
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
    setGameStarted(true)
    setIsExpandedView(true)
    setGameOver(false)
    setBubbles([])
    setCurrentMorse('')
    setLives(3)
    setWaitingForNextLevel(false)
    setUsedLetters(new Set()) // Reset used letters
    setUsedColors(new Set()) // Reset used colors
    bubbleGenerationInProgressRef.current = false // Reset bubble generation flag
    setGameStats({
      score: 0,
      accuracy: 100,
      level: 1,
      bubblesPopped: 0,
      totalBubbles: 0
    })
    bubbleIdRef.current = 0
    
    // Game loop will handle initial bubble generation automatically
  }

  const resetGame = () => {
    // Clear auto-submit timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
      autoSubmitTimeoutRef.current = undefined
    }
    
    // Camera cleanup is handled by BlinkDetector component
    setGameStarted(false)
    setIsExpandedView(false)
    setGameOver(false)
    setBubbles([])
    setCurrentMorse('')
    setLives(3)
    setWaitingForNextLevel(false)
    setUsedLetters(new Set()) // Reset used letters
    setUsedColors(new Set()) // Reset used colors
    bubbleGenerationInProgressRef.current = false // Reset bubble generation flag
    setGameStats({
      score: 0,
      accuracy: 100,
      level: 1,
      bubblesPopped: 0,
      totalBubbles: 0
    })
  }

  const startNextLevel = () => {
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
    bubbleGenerationInProgressRef.current = false // Reset bubble generation flag
    
    // Clear auto-submit timer
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current)
      autoSubmitTimeoutRef.current = undefined
    }
    
    // Clear any remaining bubbles
    setBubbles([])
  }

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      // Camera cleanup is handled by BlinkDetector component
      // Clear auto-submit timer
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
      }
      
      // Force camera cleanup when leaving game page
      if (cameraEnabled) {
        console.log('Game page unmounting, ensuring camera cleanup')
        // The BlinkDetector component should handle this, but let's make sure
      }
    }
  }, [cameraEnabled])

  // Cleanup when navigating away from game page
  useEffect(() => {
    const handleRouteChange = () => {
      // Only disable camera if we're actually leaving the game page
      if (window.location.pathname !== '/game') {
        console.log('Leaving game page, disabling camera')
        setCameraEnabled(false)
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
          autoSubmitTimeoutRef.current = undefined
        }
      }
    }

    // Listen for route changes - less aggressive checking
    const currentPath = window.location.pathname
    let lastCheck = Date.now()
    let routeCheckTimeout: NodeJS.Timeout | null = null

    const checkRouteChange = () => {
      const now = Date.now()
      // Check every 200ms instead of 100ms to be even less aggressive
      if (now - lastCheck >= 200) {
        lastCheck = now
        if (window.location.pathname !== currentPath) {
          // Debounce route changes to avoid rapid toggling
          if (routeCheckTimeout) clearTimeout(routeCheckTimeout)
          routeCheckTimeout = setTimeout(() => {
            handleRouteChange()
          }, 500) // Wait 500ms to confirm the route change
        }
      }
    }

    const interval = setInterval(checkRouteChange, 200)

    // Remove the visibility change handler that was causing issues
    // The BlinkDetector handles its own cleanup appropriately

    return () => {
      clearInterval(interval)
      if (routeCheckTimeout) clearTimeout(routeCheckTimeout)
      // Only cleanup if actually leaving the page
      if (window.location.pathname !== '/game') {
        handleRouteChange()
      }
    }
  }, []) // Remove cameraEnabled dependency to prevent re-running

  return (
    <main className={`min-h-screen bg-primary-dark ${isExpandedView ? 'fixed inset-0 z-50' : ''}`}>
      {!isExpandedView && <Header />}
      
      <section className={`transition-all duration-500 ${isExpandedView ? 'h-full p-0' : 'pt-32 pb-20 px-2 sm:px-4'}`}>
        <div className={`transition-all duration-500 ${isExpandedView ? 'h-full p-0' : 'mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'}`}>
          {!isExpandedView && (
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">OptiBlink Bubble Pop</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Blink in Morse code patterns to pop bubbles!
              </p>
            </div>
          )}

          {/* Game Area */}
          <div className={`bg-neutral-dark border border-neon-purple/30 rounded-xl ${isExpandedView ? 'h-full rounded-none overflow-y-auto' : 'overflow-hidden'}`}>
            {/* Game Stats */}
            {gameStarted && (
              <div className="bg-neutral-darker p-3 md:p-4 border-b border-neon-purple/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-3 md:gap-0">
                  <div className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-base">
                    <span>Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></span>
                    <span>Level: <span className="text-neon-purple font-bold">{gameStats.level}</span></span>
                    <span>Lives: <span className="text-red-400 font-bold">{'❤️'.repeat(Math.max(0, lives))}</span></span>
                    <span>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span> <span className="text-white/50 text-xs">({gameStats.bubblesPopped}/{gameStats.totalBubbles})</span></span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
                    <span className="text-sm md:text-base">Current: <span className="text-yellow-400 font-mono text-base md:text-lg">{currentMorse || '___'}</span></span>
                    <button 
                      onClick={checkMorseCode}
                      className="px-3 py-2 md:px-3 md:py-1 bg-neon-purple/20 border border-neon-purple/50 rounded text-white text-sm md:text-xs hover:bg-neon-purple/30 touch-manipulation min-h-[44px]"
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
                      className="px-3 py-2 md:px-3 md:py-1 bg-red-500/20 border border-red-500/50 rounded text-white text-sm md:text-xs hover:bg-red-500/30 touch-manipulation min-h-[44px]"
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
            <div className={`relative bg-gradient-to-b from-blue-900/20 to-purple-900/20 overflow-hidden transition-all duration-500 ${isExpandedView ? 'h-full' : 'h-96'}`}>
              {/* Camera Feed (responsive positioning) */}
              {cameraEnabled && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                  <BlinkDetector
                    onBlink={handleBlink}
                    isEnabled={cameraEnabled}
                  />
                  {/* Manual blink trigger for testing - positioned below the detector */}
                  <div className="flex space-x-1 mt-1">
                    <button
                      onClick={() => handleBlink(false)}
                      className="px-2 py-1 bg-blue-500/80 text-white text-xs rounded hover:bg-blue-600/80 touch-manipulation"
                      title="Manual Short Blink (.)"
                    >
                      .
                    </button>
                    <button
                      onClick={() => handleBlink(true)}
                      className="px-2 py-1 bg-orange-500/80 text-white text-xs rounded hover:bg-orange-600/80 touch-manipulation"
                      title="Manual Long Blink (-)"
                    >
                      -
                    </button>
                  </div>
                </div>
              )}

              {/* Bubbles */}
              {bubbles.map(bubble => (
                <div
                  key={bubble.id}
                  className="absolute"
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    width: bubble.size,
                    height: bubble.size,
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Bubble */}
                    <div className={`w-full h-full bg-gradient-to-br ${bubble.color.from} ${bubble.color.to} rounded-full border-2 ${bubble.color.border} flex items-center justify-center shadow-md`}>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">{bubble.letter}</div>
                        <div className="text-white/70 text-xs font-mono">{bubble.morse}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Current Morse Code Display - fixed position for always visible */}
              {gameStarted && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-black/95 rounded-lg p-2 border border-neon-purple/50 shadow-xl">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-white text-sm font-medium">Current:</span>
                      <span className="text-yellow-400 font-mono text-xl md:text-2xl font-bold tracking-wide bg-neutral-dark/80 px-3 py-1 rounded border border-neon-purple/30">
                        {currentMorse || '___'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Start Screen */}
              {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4">
                  <div className="text-center space-y-4 md:space-y-6 max-w-md mx-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to Play?</h3>
                    <p className="text-white/70 text-sm md:text-base">
                      Enable your camera for eye blink detection, or use keyboard controls.
                      Short blinks = dots (.), Long blinks = dashes (-)
                    </p>
                    <div className="space-y-3 md:space-y-4">
                      <button
                        onClick={initializeCameraAndStart}
                        className="btn-primary w-full md:w-auto min-h-[44px] touch-manipulation"
                      >
                        Start Game
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4 z-30">
                  <div className="text-center space-y-4 md:space-y-6 max-w-md mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-red-400">
                      {gameStats.level >= 2 ? '🎉 Congratulations! 🎉' : 'Game Over!'}
                    </h3>
                    <div className="text-white space-y-2 text-sm md:text-base">
                      <p>Final Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></p>
                      <p>Bubbles Popped: <span className="text-neon-purple font-bold">{gameStats.bubblesPopped}</span></p>
                      <p>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span> <span className="text-white/50 text-sm">({gameStats.bubblesPopped}/{gameStats.totalBubbles} correct)</span></p>
                      <p>Level Reached: <span className="text-neon-purple font-bold">{gameStats.level}</span></p>
                      {gameStats.level >= 2 && (
                        <p className="text-green-400 font-bold text-base md:text-lg">You completed all levels!</p>
                      )}
                    </div>
                    <div className="space-y-3 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                      <button
                        onClick={startGame}
                        className="btn-primary w-full md:w-auto min-h-[44px] touch-manipulation"
                      >
                        Play Again
                      </button>
                      <button
                        onClick={resetGame}
                        className="btn-secondary w-full md:w-auto min-h-[44px] touch-manipulation"
                      >
                        Main Menu
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Level Complete Screen */}
              {waitingForNextLevel && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4 z-30">
                  <div className="text-center space-y-4 md:space-y-6 max-w-md mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-green-400">Level {gameStats.level} Complete!</h3>
                    <div className="text-white space-y-2 text-sm md:text-base">
                      <p>Level Score: <span className="text-neon-purple font-bold">{gameStats.score}</span></p>
                      <p>Total Bubbles Popped: <span className="text-neon-purple font-bold">{gameStats.bubblesPopped}</span></p>
                      <p>Accuracy: <span className="text-neon-purple font-bold">{gameStats.accuracy}%</span> <span className="text-white/50 text-sm">({gameStats.bubblesPopped}/{gameStats.totalBubbles} correct)</span></p>
                    </div>
                    <p className="text-white/70 text-sm md:text-base">
                      {gameStats.level === 1
                        ? 'Ready for Level 2? Bubbles will be faster and you get fresh lives!'
                        : 'Ready for the final level? Bubbles will be even faster!'
                      }
                    </p>
                    <div className="space-y-3 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                      <button
                        onClick={startNextLevel}
                        className="btn-primary w-full md:w-auto min-h-[44px] touch-manipulation"
                      >
                        Start Level {gameStats.level + 1}
                      </button>
                      <button
                        onClick={resetGame}
                        className="btn-secondary w-full md:w-auto min-h-[44px] touch-manipulation"
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
              <div className="p-3 md:p-4 bg-neutral-darker/50 border-t border-neon-purple/20">
                <div className="text-white/70 text-xs md:text-sm text-center">
                  <span><strong>Controls:</strong> Space = Dot (.) • Shift+Space = Dash (-) • Enter = Submit • Backspace = Delete • Escape = Exit Fullscreen</span>
                  {cameraEnabled && <span className="block md:inline mt-1 md:mt-0 md:ml-2"> • <strong>OR</strong> Short Blink = Dot • Long Blink = Dash</span>}
                </div>
              </div>
            )}

            {/* Morse Code Reference - Always visible */}
            <div className="p-3 md:p-4 bg-neutral-darker/50 flex items-center justify-between border-t border-neon-purple/20">
              <details className="text-white flex-1">
                <summary className="cursor-pointer text-neon-purple text-sm md:text-base touch-manipulation">Morse Code Reference</summary>
                <div className="mt-2 grid grid-cols-6 md:grid-cols-13 gap-2 text-sm">
                  {Object.entries(MORSE_CODE).map(([letter, code]) => (
                    <div key={letter} className="text-center p-1 md:p-2">
                      <div className="font-bold text-base md:text-lg">{letter}</div>
                      <div className="text-white/70 font-mono text-xs md:text-sm">{code}</div>
                    </div>
                  ))}
                </div>
              </details>
              
              {/* Info Button with Hover Instructions */}
              <div className="relative ml-4 group">
                <button
                  className="w-8 h-8 bg-neon-purple/20 border border-neon-purple/50 rounded-full flex items-center justify-center text-neon-purple hover:bg-neon-purple/30 transition-colors touch-manipulation"
                  title="How to Play"
                >
                  <span className="text-sm font-bold">i</span>
                </button>
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 w-80 p-4 bg-neutral-dark border border-neon-purple/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                  <div className="text-white text-sm space-y-2">
                    <p><strong>🎯 Objective:</strong> Pop bubbles by entering correct Morse code</p>
                    <p><strong>👁️ Camera:</strong> Short blink = dot (.), Long blink = dash (-)</p>
                    <p><strong>⌨️ Keyboard:</strong> Space = dot, Shift+Space = dash, Enter = submit</p>
                    <p><strong>📈 Scoring:</strong> 10 points per bubble, level up at 50 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {!isExpandedView && <Footer />}
    </main>
  )
}