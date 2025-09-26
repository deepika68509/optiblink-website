'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Typewriter Animation Component
const TypewriterSequence = () => {
  const phrases = [
    ". - . . - - . - .",
    "Blink your eyes",
    "- - . - - . - - .",
    "Dots and dashes detected",
    "..-.-..--.",
    "Morse code converted to text",
    ".-.---.....",
    "Smart suggestions appear",
    ".----..-...-.",
    "Select words with blinks",
    "..-----....-",
    "Hear it with text-to-speech",
    "-..-.-...--.--",
    "Send messages hands-free",
    "--.---......",
    "Trigger SOS in emergencies"
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
      <p className="text-2xl font-semibold italic text-neon-purple/90 min-h-[1.2em] flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {currentText}
      </p>
    </div>
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
      title: "Real-time Decoding",
      description: "Instant translation of Morse code to text with sub-second response times."
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
      title: "Cross-platform",
      description: "Available on Android, iOS, and web browsers for universal accessibility."
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "All processing happens locally on your device, ensuring complete privacy."
    },
    {
      icon: "🎯",
      title: "Customizable",
      description: "Adjustable sensitivity and personalization options for optimal user experience."
    }
  ]

  const faqs = [
    {
      question: "How accurate is the eye blink detection?",
      answer: "Our advanced computer vision algorithms achieve over 95% accuracy in eye blink detection, with minimal false positives and negatives. The system continuously learns and adapts to individual users for improved performance."
    },
    {
      question: "Can I use OptiBlink without internet connection?",
      answer: "Yes! OptiBlink processes all data locally on your device, ensuring complete privacy and offline functionality. No internet connection is required for the core features to work."
    },
    {
      question: "What platforms are supported?",
      answer: "OptiBlink is available on Android, iOS, Windows, macOS, and as a web browser extension. We're committed to cross-platform compatibility for maximum accessibility."
    },
    {
      question: "How long does it take to learn the system?",
      answer: "Most users become comfortable with OptiBlink within 1-2 hours of practice. We provide interactive tutorials and training modes to help you get started quickly."
    },
    {
      question: "Is my privacy protected?",
      answer: "Absolutely. All eye tracking and processing happens locally on your device. We never collect, store, or transmit any personal data or images."
    },
    {
      question: "Can I customize the Morse code patterns?",
      answer: "Yes! OptiBlink offers extensive customization options, including custom Morse code patterns, adjustable sensitivity, and personalized shortcuts for common phrases."
    },
    {
      question: "What languages are supported?",
      answer: "OptiBlink supports multiple languages including English, Spanish, French, German, and more. The system can be easily extended to support additional languages."
    },
    {
      question: "How do I get technical support?",
      answer: "We provide comprehensive documentation, video tutorials, and a dedicated support team. You can reach us through our contact form or join our community forum for help."
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
              About <span className="text-gradient">OptiBlink</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Revolutionizing communication through innovative eye blink technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Transforming Communication
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                OptiBlink is a groundbreaking eye blink detection system that converts natural eye movements 
                into Morse code, enabling seamless communication for individuals with speech impairments, 
                those in silent environments, or anyone seeking an alternative communication method.
              </p>
              
              <p className="text-lg text-white/80 leading-relaxed">
                Our advanced computer vision algorithms detect eye blinks with high accuracy, 
                translating them into real-time Morse code that can be converted to text, 
                speech, or other communication formats.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                  <span className="text-white/90">High Accuracy Detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                  <span className="text-white/90">Real-time Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                  <span className="text-white/90">Accessible Design</span>
                </div>
              </div>
            </div>

            {/* Mockup/Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-dark to-neutral-darker rounded-2xl p-8 border border-neon-purple/30 shadow-2xl">
                {/* Mockup Content */}
                <div className="bg-white/10 rounded-lg p-6 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>
                
                {/* Eye Detection Visualization */}
                <div className="text-center">
                  <div className="w-24 h-16 mx-auto bg-gradient-to-b from-neon-purple/20 to-accent-purple/20 rounded-full border border-neon-purple/50 flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-neon-purple/60 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-neon-purple font-semibold">Eye Blink Detected</p>
                  <p className="text-white/60 text-sm">Morse: .-..</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border border-neon-purple/40 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border border-accent-purple/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
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
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card group cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    {feature.icon}
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

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-white/70 mb-6 text-lg">
              Ready to experience the future of communication?
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-neutral-dark relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute -top-10 right-1/3 w-[30vw] h-[30vw] opacity-20" />
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
              See <span className="text-gradient">OptiBlink</span> in Action
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our intuitive interfaces across all platforms
            </p>
          </div>

          {/* Demo Video banner (full-width) */}
          <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
              <div
                className="relative w-full"
                style={{ height: 'min(60vh, 760px)' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  src="https://www.youtube.com/embed/Y7_f-pR8SBY?rel=0&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=Y7_f-pR8SBY"
                  title="OptiBlink Demo"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-darker relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="halo absolute top-[-15%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] opacity-20" />
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
              Everything you need to know about OptiBlink
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-neutral-dark border border-neon-purple/30 rounded-xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`transform transition-transform duration-300 ${
                    openFAQIndex === index ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFAQIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-4">
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <p className="text-white/70 mb-6 text-lg">
              Still have questions? We're here to help!
            </p>
            <Link href="/contact">
              <button className="btn-primary">
                Contact Support
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer - This is properly rendered */}
      <Footer />
    </main>
  )
}
