'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lottie from 'lottie-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import eyeBlinkingAnimation from '../../public/assets/icons/eye-blinking.json'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Typewriter Animation Component
const TypewriterSequence = () => {
  const phrases = [
    ".-",
    "--.",
    "..-.",
    ".-.-",
    "---.",
    ".---",
    "..--",
    "-.-..",
    "..-..",
    ".---",
    ".-.",
    "-..-.",
    "..--",
    ".-.-",
    "--.-"
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
  // Feature Carousel refs
  const featureSectionRef = useRef(null)
  const featureCarouselRef = useRef(null)
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll()
  // layered parallax transforms
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -140])
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -70])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -20])
  const haloX = useTransform(scrollYProgress, [0, 1], [0, 40])
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -30])

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

  // Feature Carousel GSAP horizontal scroll (responsive for all screen sizes)
  useEffect(() => {
    if (typeof window === 'undefined' || !featureSectionRef.current || !featureCarouselRef.current) return;

    const setupScrollTrigger = () => {
      // Clean up previous triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const section = featureSectionRef.current;
      const carousel = featureCarouselRef.current;
      if (!section || !carousel) return;

      const slides = gsap.utils.toArray('.feature-slide') as HTMLElement[];
      
      // Calculate total width based on actual slide widths
      let totalWidth = 0;
      slides.forEach(slide => {
        totalWidth += slide.offsetWidth;
      });
      
      // Fallback if slides haven't rendered yet
      if (totalWidth === 0) {
        totalWidth = slides.length * window.innerWidth;
      }

      // Calculate the scroll distance - total width minus viewport width
      const scrollDistance = totalWidth - window.innerWidth;

      const scrollTween = gsap.to(carousel, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        }
      });

      slides.forEach((slide, i) => {
        const image = slide.querySelector('.feature-image');
        const content = slide.querySelector('.feature-content');
        const title = slide.querySelector('.feature-title');
        const desc = slide.querySelector('.feature-description');
        const details = slide.querySelector('.feature-details');
        const icon = slide.querySelector('.feature-icon');

        if (image) {
          gsap.fromTo(image, 
            { scale: 1.2, x: -50 },
            {
              scale: 1,
              x: 0,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'center center',
                scrub: 1,
              }
            }
          );
        }

        const contentTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            containerAnimation: scrollTween,
            start: 'left center',
            end: 'center center',
            scrub: 1,
          }
        });

        if (icon) contentTimeline.fromTo(icon, { scale: 0, rotation: -180, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5 });
        if (title) contentTimeline.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
        if (desc) contentTimeline.fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
        if (details) contentTimeline.fromTo(details, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
      });
    };

    // Initial setup
    setupScrollTrigger();

    // Recalculate on window resize for responsive behavior
    const handleResize = () => {
      setupScrollTrigger();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Fixed single background color */}
      <div className="fixed inset-0 -z-30" style={{ background: '#0A0F1F' }} />

      {/* Moving halo accents (purple) */}
      <motion.div
        className="pointer-events-none fixed -z-20 top-10 left-8 w-[36vw] h-[36vw]"
        style={{
          x: haloX,
          y: haloY,
          background:
            'radial-gradient(circle at 30% 30%, rgba(164,0,171,0.22), rgba(164,0,171,0.12) 25%, rgba(164,0,171,0.06) 45%, transparent 60%)',
          filter: 'blur(60px)'
        }}
      />
      <motion.div
        className="pointer-events-none fixed -z-20 bottom-6 right-6 w-[28vw] h-[28vw]"
        style={{
          x: haloX,
          y: useTransform(scrollYProgress, [0, 1], [0, 20]),
          background:
            'radial-gradient(circle at 70% 70%, rgba(164,0,171,0.18), rgba(166,0,171,0.08) 30%, transparent 60%)',
          filter: 'blur(48px)'
        }}
      />
      <motion.div
        className="pointer-events-none fixed -z-20 top-1/3 right-1/3 w-[18vw] h-[18vw]"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, -30]),
          y: useTransform(scrollYProgress, [0, 1], [0, -10]),
          background:
            'radial-gradient(circle at 50% 50%, rgba(98,22,101,0.16), rgba(164,0,171,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      <div className="relative z-10">
        <Header />

        {/* Hero Section (foreground - faster) */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20 md:pt-8 lg:pt-0"
          style={{ y: yFast }}
        >
          {/* REMOVED: Morse Background (subtle) - as requested */}
          
          {/* Content */}
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ y: yMedium }}
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
              <Link 
                href="https://github.com/deepika68509/optiblink-website/releases/download/v1/optiblink_standalone.exe"
                className="btn-primary text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download .exe
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* About Section (mid layer) */}
        <motion.section
          id="about"
          className="py-20 relative overflow-hidden"
          style={{ y: yMedium }}
        >
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
        </motion.section>

        {/* Features Section (slow layer) */}
        <motion.section
          className="py-20 relative overflow-hidden"
          style={{ y: ySlow }}
        >
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
              <Link 
                href="https://github.com/deepika68509/optiblink-website/releases/download/v1/optiblink_standalone.exe"
                className="btn-primary text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Feature Carousel Section */}
        <section id="how-it-works" ref={featureSectionRef} className="relative overflow-x-hidden bg-primary-dark">
          <div
            ref={featureCarouselRef}
            className="flex flex-row w-max flex-nowrap"
            style={{ flexDirection: undefined, flexWrap: undefined }}
          >
            {[{
              id: 1,
              title: "System Initialization",
              description: "OptiBlink launches with a quick automatic setup that calibrates to your unique eye patterns in seconds.",
              details: "The initialization process ensures the system is perfectly tuned to your needs.",
              image: "/assets/images/initialization.webp",
              icon: "🚀",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              id: 2,
              title: "Eye Blink Detection",
              description: "Advanced algorithms detect eye blinks with high accuracy, distinguishing intentional blinks from natural movements.",
              details: "Uses MediaPipe to adapt to your unique patterns in different lighting conditions.",
              image: "/assets/images/detection.webp",
              icon: "👁️",
              color: "from-purple-500/20 to-pink-500/20"
            },
            {
              id: 3,
              title: "Self-Calibration",
              description: "Automatically calibrates blink thresholds for different users and lighting conditions.",
              details: "System adapts continuously. Press R anytime to recalibrate.",
              image: "/assets/images/calibration.webp",
              icon: "⚙️",
              color: "from-indigo-500/20 to-purple-500/20"
            },
            {
              id: 4,
              title: "Morse Code Conversion",
              description: "Convert eye movements into Morse code patterns. Short blinks create dots, longer blinks create dashes.",
              details: "System converts blink patterns into Morse code characters in real time.",
              image: "/assets/images/convertion.webp",
              icon: "📡",
              color: "from-yellow-500/20 to-orange-500/20"
            },
            {
              id: 5,
              title: "Smart Auto-completion",
              description: "Intelligent word prediction powered by machine learning accelerates your communication.",
              details: "Learns your vocabulary and writing patterns for accurate suggestions.",
              image: "/assets/images/auto_suggestions.webp",
              icon: "🤖",
              color: "from-green-500/20 to-emerald-500/20"
            },
            {
              id: 6,
              title: "Text-to-Speech",
              description: "Convert decoded text to natural speech for audible communication.",
              details: "Eye blinks are converted into text and read aloud using built-in TTS.",
              image: "/assets/images/TTS.webp",
              icon: "🔊",
              color: "from-red-500/20 to-rose-500/20"
            },
            {
              id: 7,
              title: "Smart Sleep Mode",
              description: "Sleep mode activates when eyes are closed for 5 seconds. Wake with the same gesture.",
              details: "Preserves battery and prevents accidental inputs during rest.",
              image: "/assets/images/sleep_mode.webp",
              icon: "💤",
              color: "from-slate-500/20 to-gray-500/20"
            },
            {
              id: 8,
              title: "Emergency SOS",
              description: "Instantly trigger emergency alerts to contacts via call and WhatsApp message.",
              details: "Designed for critical situations - help is just a blink away.",
              image: "/assets/images/emergency.webp",
              icon: "🚨",
              color: "from-red-600/20 to-orange-600/20"
            }].map((feature, index, features) => (
              <div 
                key={feature.id}
                className="feature-slide w-screen h-screen flex-shrink-0 relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30`}></div>
                <div className="relative h-full flex flex-col md:flex-row">
                  <div className="w-full md:w-[55%] lg:w-[70%] relative overflow-hidden h-[60vh] md:h-full">
                    <div className="feature-image absolute inset-0">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            parent.style.background = `linear-gradient(135deg, rgba(164, 0, 171, 0.3), rgba(114, 0, 118, 0.3))`
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10">
                        <div className="text-5xl md:text-9xl font-bold text-white/10">
                          {feature.id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[45%] lg:w-[30%] relative bg-gradient-to-br from-neutral-darker/95 to-neutral-dark/90 backdrop-blur-md md:border-l border-white/10 flex items-center h-[40vh] md:h-full overflow-y-auto">
                    <div className="feature-content w-full flex flex-col justify-center p-6 md:p-10 space-y-3 md:space-y-6">
                      <div className="feature-icon mb-1 md:mb-0">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-accent-purple flex items-center justify-center text-2xl md:text-4xl shadow-2xl">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="inline-block">
                        <span className="px-3 py-1 md:px-4 md:py-2 bg-neon-purple/20 text-neon-purple rounded-full text-xs md:text-sm font-semibold">
                          Feature {feature.id} of {features.length}
                        </span>
                      </div>
                      <div className="feature-title">
                        <h3 className="text-xl md:text-4xl font-bold text-white mb-1 md:mb-2 leading-tight">
                          {feature.title}
                        </h3>
                        <div className="w-10 md:w-20 h-1 bg-gradient-to-r from-neon-purple to-accent-purple rounded-full"></div>
                      </div>
                      <p className="feature-description text-white/80 text-sm md:text-lg leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="feature-details hidden md:block">
                        <div className="bg-black/30 rounded-xl p-3 md:p-5 border border-white/10">
                          <div className="flex items-start gap-2 md:gap-3 mb-1 md:mb-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-neon-purple">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                              </svg>
                            </div>
                            <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                              {feature.details}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        {features.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              idx === index ? 'w-4 md:w-8 bg-neon-purple' : 'w-1.5 md:w-2 bg-white/20'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 text-xs md:text-sm font-medium flex flex-col items-center animate-bounce">
                    <span className="mb-1 md:mb-2">Scroll to explore →</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section (slow layer) */}
        <motion.section id="faq" className="py-20 relative overflow-hidden" style={{ y: ySlow }}>
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
        </motion.section>

        <Footer />
      </div>
    </main>
  )
}