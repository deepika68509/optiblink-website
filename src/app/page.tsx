'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0)

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero particles effect
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  const { scrollYProgress } = useScroll()
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yFloatSlow = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yFloatFast = useTransform(scrollYProgress, [0, 1], [0, -120])

  // FAQ toggle function
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  // Screenshot navigation functions
  const nextScreenshot = () => {
    setActiveScreenshotIndex((prev) => (prev + 1) % 3)
  }

  const prevScreenshot = () => {
    setActiveScreenshotIndex((prev) => (prev - 1 + 3) % 3)
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

  const screenshots = [
    {
      id: 1,
      title: "Desktop Interface",
      description: "Full-featured desktop application with advanced settings and customization options",
      platform: "Desktop"
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Optimized mobile experience with touch-friendly controls and gesture support",
      platform: "Mobile"
    },
    {
      id: 3,
      title: "Web Extension",
      description: "Browser extension for seamless integration with web applications",
      platform: "Browser"
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
      {/* Header Component */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-dark/80 backdrop-blur-custom border-b border-neon-purple/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OB</span>
              </div>
              <span className="text-xl font-bold text-white">OptiBlink</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-white hover:text-neon-purple transition-colors duration-300">
                About
              </Link>
              <Link href="#how-it-works" className="text-white hover:text-neon-purple transition-colors duration-300">
                How It Works
              </Link>
              <Link href="/documentation" className="text-white hover:text-neon-purple transition-colors duration-300">
                Documentation
              </Link>
              <Link href="/game" className="text-white hover:text-neon-purple transition-colors duration-300">
                Game
              </Link>
              <Link href="/contact" className="text-white hover:text-neon-purple transition-colors duration-300">
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link href="#download" className="btn-primary">
                Download APK
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white hover:text-neon-purple transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

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
          {/* Main Title without glow */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <span className="text-gradient">OptiBlink</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          >
            Eye Blink Morse Code Communication System
          </motion.p>

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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          >
            <button className="btn-primary text-lg px-8 py-4">Download APK</button>
            <button className="btn-secondary text-lg px-8 py-4">Add Extension</button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
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
            <button className="btn-primary">
              Contact Support
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-darker border-t border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-accent-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OB</span>
                </div>
                <span className="text-xl font-bold text-white">OptiBlink</span>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                Revolutionizing communication through innovative eye blink technology. 
                Making the world more accessible, one blink at a time.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-neon-purple/20 rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-neon-purple/20 rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-neon-purple/20 rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/game" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Game
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/license" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    License
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    System Status
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/70 hover:text-neon-purple transition-colors duration-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm mb-4 md:mb-0">
                © 2025 OptiBlink. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/terms" className="text-white/60 hover:text-neon-purple transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/60 hover:text-neon-purple transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
