'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lottie from 'lottie-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import eyeBlinkingAnimation from '../../public/assets/icons/eye-blinking.json'

// Typewriter Animation Component
const TypewriterSequence = () => {
  const phrases = [
    ".-..--.-.",
    "--.--.--.",
    "..-.-..--.",
    ".-.---.....",
    "---..-...",
    ".----..-...-.",
    "..-----....-",
    "-.-..--.--",
    "..-.....-..",
    ".----....-",
    ".-....----..",
    "-..-.-...--.--",
    "..----...-",
    ".-.---.-.",
    "--.---......"
  ]

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      // Typing animation
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, 150) // Reduced typing speed from 100ms to 150ms
        return () => clearTimeout(timeout)
      } else {
        // Pause after typing complete
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Pause duration
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting animation
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 75) // Slightly reduced deleting speed from 50ms to 75ms
        return () => clearTimeout(timeout)
      } else {
        // Move to next phrase
        const timeout = setTimeout(() => {
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
          setIsTyping(true)
        }, 500) // Pause before next phrase
        return () => clearTimeout(timeout)
      }
    }
  }, [currentText, isTyping, currentPhraseIndex, phrases])

  return (
    <div className="h-20 flex items-center justify-center">
      <p className="text-4xl font-bold text-neon-purple/90 min-h-[1.2em] flex items-center tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {currentText}
      </p>
    </div>
  )
}

// Morse Code Typewriter Component for About Section
const MorseTypewriter = () => {
  const morseCodes = [
    ".- .. -- .-.",
    "-- .- -..",
    ".. -.- .",
    ".-.- ..",
    "-- ..-. .",
    ".- ..-. -.",
    "..-- -.-",
    "-.- .--"
  ]

  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentCode = morseCodes[currentCodeIndex]
    
    if (isTyping) {
      // Typing animation
      if (currentText.length < currentCode.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentCode.slice(0, currentText.length + 1))
        }, 120) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Pause after typing complete
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500) // Pause duration
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting animation
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 60) // Deleting speed
        return () => clearTimeout(timeout)
      } else {
        // Move to next morse code
        const timeout = setTimeout(() => {
          setCurrentCodeIndex((prevIndex) => (prevIndex + 1) % morseCodes.length)
          setIsTyping(true)
        }, 300) // Pause before next code
        return () => clearTimeout(timeout)
      }
    }
  }, [currentText, isTyping, currentCodeIndex, morseCodes])

  return (
    <p className="text-neon-purple font-mono text-lg font-semibold min-h-[1.2em] flex items-center">
      {currentText}
      <span className="ml-1 animate-pulse text-neon-purple">|</span>
    </p>
  )
}

export default function Home() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll()
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -100])

  // FAQ toggle function
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  // Data arrays
  const features = [
    {
      icon: "👁️",
      title: "Eye Blink Detection",
      description: "Advanced computer vision algorithms detect eye blinks with high accuracy and minimal latency."
    },
    {
      icon: "📡",
      title: "Morse Code Input",
      description: "Convert natural eye movements into precise Morse code patterns for reliable communication."
    },
    {
      icon: "⚡",
      title: "Special Commands",
      description: "Supports Enter, Space, Backspace, Caps, SOS, TTS toggle and other control sequences."
    },
    {
      icon: "🤖",
      title: "Auto-completion",
      description: "Smart word prediction and auto-completion to speed up communication."
    },
    {
      icon: "🔊",
      title: "Text-to-Speech",
      description: "Convert decoded text to natural speech for audible communication."
    },
    {
      icon: "📱",
      title: "Self-Calibration",
      description: "Automatically calibrates blink thresholds at startup for different users and lighting."
    },
    {
      icon: "🔒",
      title: "Sleep Mode",
      description: "Pauses inputs when eyes are closed for 5s; same action wakes the system."
    },
    {
      icon: "🎯",
      title: "Emergency SOS",
      description: "Trigger SOS to call and send WhatsApp message to a saved contact."
    }
  ]

  const faqs = [
    {
      question: "How accurate is the eye blink detection?",
      answer: "The system is designed to reliably detect blinks, correctly recognizing over 90% of intentional blinks. It ignores small or accidental eye movements and gradually adapts to your individual blink patterns to maintain high accuracy."
    },
    {
      question: "Can I use OptiBlink without internet connection?",
      answer: "Yes! OptiBlink processes all data locally on your device, ensuring complete privacy and offline functionality. No internet connection is required for the core features to work."
    },
    {
      question: "How do I start using the system?",
      answer: "When you first use OptiBlink, it calibrates by observing your eyes for a few seconds to learn your normal eye state. After calibration, the system can detect intentional blinks accurately."
    },
    {
      question: "How long does it take to learn the system?",
      answer: "Most users become comfortable with OptiBlink within 1-2 hours of practice. We provide interactive games and documentation to help you get started quickly."
    },
    {
      question: "Is my privacy protected?",
      answer: "Absolutely. All eye tracking and processing happens locally on your device. We never collect, store, or transmit any personal data or images."
    },
    {
      question: "How does the system know if I blink?",
      answer: "The system monitors your eyes and tracks how open or closed they are. A blink is registered only when your eyes close deliberately, ignoring small or accidental movements"
    },
    {
      question: "How do I type words faster?",
      answer: "OptiBlink provides word suggestions as you blink. Up to three suggestions appear at a time, prioritizing your custom words. You can select a suggestion using dedicated blink patterns, speeding up typing."
    },
    {
      question: "Can the system speak my messages?",
      answer: "Yes, the Text-to-Speech (TTS) feature reads your messages aloud. Turn TTS on anytime using the TTS toggle command (-.-.-.)."
    }
  ]

  const [morseRows, setMorseRows] = useState<string[]>([])

  useEffect(() => {
    const rows = Array.from({ length: 14 }, () =>
      Array.from({ length: 40 }, () => (Math.random() < 0.6 ? '·' : '—')).join(' ')
    )
    setMorseRows(rows)
  }, [])

  return (
    <main className="min-h-screen bg-primary-dark">
      {/* Use Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Halo glows */}
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute -top-20 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] opacity-40" />
          <div className="halo absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] opacity-30" />
        </div>
        {/* Morse Background */}
        <motion.div style={{ y: yBackground }} className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark to-neutral-dark">
          <div className="absolute inset-0 pointer-events-none select-none">
            {morseRows.map((row, idx) => (
              <motion.div
                key={idx}
                className="w-[200%] text-neon-purple/20 text-sm md:text-base whitespace-nowrap will-change-transform"
                style={{ top: `${(idx / morseRows.length) * 100}%`, left: '-50%', position: 'absolute' }}
                animate={{ x: ['0%', '-10%', '0%'] }}
                transition={{ duration: 20 + idx, repeat: Infinity, ease: 'linear', delay: idx * 0.4 }}
              >
                {row}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: yHero }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Main Title - Changed to white */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            OptiBlink
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            Eye Blink Morse Code Communication System
          </motion.p>

          {/* Typewriter Animation - Now positioned below the subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
            className="mb-8"
          >
            <TypewriterSequence />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          >
            Revolutionize communication with our cutting-edge eye blink detection technology. 
            Convert natural eye movements into Morse code for seamless, accessible communication.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          >
            <button className="btn-primary text-lg px-8 py-4">Download APK</button>
          </motion.div>
        </motion.div>

        {/* Removed floating bubbles */}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-neutral-dark relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute -top-24 -left-24 w-[36vw] h-[36vw] opacity-25" />
          {/* Additional subtle glows */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-accent-purple/10 rounded-full blur-2xl"></div>
        </div>
        
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              About <span className="text-gradient">OptiBlink</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Revolutionizing communication through innovative eye blink technology
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Lottie Animation Demonstration - Enhanced Sticky */}
            <motion.div 
              className="lg:sticky lg:top-20 order-first lg:order-last self-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ zIndex: 10 }}
            >
              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-neutral-darker via-primary-dark to-neutral-dark rounded-3xl p-8 border border-neon-purple/20 shadow-2xl backdrop-blur-sm overflow-hidden">
                
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-neon-purple/20"></div>
                    ))}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium">System Active</span>
                  </div>
                  <div className="text-white/60 text-xs font-mono">
                    v2.1.0 • Real-time
                  </div>
                </div>

                {/* Lottie Animation Section */}
                <div className="text-center relative z-10">
                  {/* Simple Animation Container */}
                  <div className="relative w-full mx-auto mb-8 flex items-center justify-center">
                    <div className="w-48 h-48">
                      <Lottie
                        animationData={eyeBlinkingAnimation}
                        loop={true}
                        autoplay={true}
                        style={{
                          width: '100%',
                          height: '100%',
                          filter: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.3))'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Status Display */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                      <p className="text-neon-purple font-semibold text-lg">Eye Blink Detection Active</p>
                    </div>
                    
                    {/* Enhanced Morse Code Display */}
                    <div className="bg-black/40 rounded-xl p-6 border border-neon-purple/30 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-white/60 text-sm font-medium">Morse Code Output</p>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-white/10">
                        <div className="h-8 flex items-center justify-center">
                          <MorseTypewriter />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-neon-purple/30 rounded-full animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${3 + i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Professional accent elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-neon-purple/40 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 border-2 border-accent-purple/40 rounded-lg animate-pulse"></div>
              
              {/* Data flow lines */}
              <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-neon-purple to-transparent animate-pulse"></div>
              <div className="absolute top-1/3 -left-4 w-6 h-0.5 bg-gradient-to-l from-accent-purple to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              className="space-y-8 order-last lg:order-first"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-neon-purple to-accent-purple rounded-full mr-4"></div>
                  Transforming Communication
                </h3>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  OptiBlink is a groundbreaking eye blink detection system that converts natural eye movements 
                  into Morse code, enabling seamless communication for individuals with speech impairments, 
                  those in silent environments, or anyone seeking an alternative communication method.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Our advanced computer vision algorithms detect eye blinks with high accuracy, 
                  translating them into real-time Morse code that can be converted to text, 
                  speech, or other communication formats.
                </p>
              </div>

              {/* Updated Statistics - Removed 24/7 and 8+ */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-neon-purple mb-1">90%+</div>
                  <div className="text-white/70 text-sm">Detection Accuracy</div>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-neon-purple mb-1">&lt;100ms</div>
                  <div className="text-white/70 text-sm">Response Time</div>
                </div>
              </div>

              {/* Updated Key Features - Row Layout */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  "High Precision Eye Tracking Technology",
                  "Real-time Morse Code Processing", 
                  "Emergency SOS Alert System"
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10 bg-gradient-to-r from-white/5 to-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-neon-purple to-accent-purple rounded-full flex-shrink-0"></div>
                    <span className="text-white/90 font-medium text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-dark relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute top-1/3 left-[-10%] w-[45vw] h-[45vw] opacity-25" />
          <div className="halo absolute bottom-[-15%] right-[-10%] w-[35vw] h-[35vw] opacity-20" />
        </div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need for seamless eye blink communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "/assets/icons/Eye Blink Detection.svg",
                title: "Eye Blink Detection",
                description: "Advanced computer vision algorithms detect eye blinks with high accuracy and minimal latency."
              },
              {
                icon: "/assets/icons/morse-code-input.svg",
                title: "Morse Code Input",
                description: "Convert natural eye movements into precise Morse code patterns for reliable communication."
              },
              {
                icon: "/assets/icons/Special Commands.svg",
                title: "Special Commands",
                description: "Supports Enter, Space, Backspace, Caps, SOS, TTS toggle and other control sequences."
              },
              {
                icon: "/assets/icons/Auto-completion.svg",
                title: "Auto-completion",
                description: "Smart word prediction and auto-completion to speed up communication."
              },
              {
                icon: "/assets/icons/Text-to-Speech.svg",
                title: "Text-to-Speech",
                description: "Convert decoded text to natural speech for audible communication."
              },
              {
                icon: "/assets/icons/Self-Calibration.svg",
                title: "Self-Calibration",
                description: "Automatically calibrates blink thresholds at startup for different users and lighting."
              },
              {
                icon: "/assets/icons/Sleep Mode.svg",
                title: "Sleep Mode",
                description: "Pauses inputs when eyes are closed for 5s; same action wakes the system."
              },
              {
                icon: "/assets/icons/emergency.svg",
                title: "Emergency SOS",
                description: "Trigger SOS to call and send WhatsApp message to a saved contact."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="card group cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center relative">
                    {/* Gradient background for icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-accent-purple rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={feature.icon} 
                        alt={feature.title}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action in Features Section */}
          <div className="text-center mt-16">
            <p className="text-white/70 mb-6 text-lg">
              Ready to experience the future of communication?
            </p>
            <button 
              className="btn-primary text-lg px-8 py-4"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
            >
              Get Started Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Video Demo Section */}
      <section className="py-0 bg-neutral-dark relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute -top-10 right-1/3 w-[30vw] h-[30vw] opacity-20" />
        </div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Demo Video banner (full-width and full-height) */}
          <div className="w-full">
            <div className="relative w-full overflow-hidden">
              <div className="relative w-full bg-black" style={{ height: '100vh' }}>
                <video
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ 
                    outline: 'none',
                    border: 'none'
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src="/assets/videos/Assistive_Video_Blinking_to_Morse_Code.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Clean overlay - no visible elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section - Enhanced with better styling and fixed functionality */}
      <section id="faq" className="py-20 bg-neutral-dark relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] opacity-20" />
          <div className="halo absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] opacity-15" />
        </div>
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Find the answers you need to get started with OptiBlink
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-neutral-darker/80 to-neutral-dark/60 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 hover:bg-white/5 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white text-2xl font-light"
                        animate={{ rotate: openFAQIndex === index ? 0 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {openFAQIndex === index ? '−' : '+'}
                      </motion.div>
                    </div>
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQIndex === index ? 'auto' : 0,
                    opacity: openFAQIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action after FAQ */}
          <motion.div
            className="text-center mt-16 p-8 bg-gradient-to-br from-neon-purple/10 to-accent-purple/10 rounded-2xl border border-neon-purple/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 mb-6">
              Get in touch with our support team for personalized assistance and help.
            </p>
            <Link 
              href="/contact" 
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Contact Support
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
