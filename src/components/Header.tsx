'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change or ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-black/40 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile-centered layout */}
            <div className="flex justify-between items-center w-full md:w-auto">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo - Centered on mobile and tablet with reduced spacing */}
              <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:left-auto lg:transform-none">
                <Link href="/" className="flex items-center space-x-1 sm:space-x-3 group">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <Image
                      src="/assets/icons/optiblink-logo.svg"
                      alt="OptiBlink Logo"
                      width={44}
                      height={44}
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-semibold text-white tracking-wide">OptiBlink</span>
                </Link>
              </div>

              {/* Spacer */}
              <div className="w-6 lg:hidden"></div>
            </div>

            {/* Desktop Navigation - show only on large screens */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/#about" className="text-white/85 hover:text-white transition-colors duration-200">
                About
              </Link>
              <Link href="/#how-it-works" className="text-white/85 hover:text-white transition-colors duration-200">
                How It Works
              </Link>
              <Link href="/documentation" className="text-white/85 hover:text-white transition-colors duration-200">
                Documentation
              </Link>
              <Link href="/game" className="text-white/85 hover:text-white transition-colors duration-200">
                Game
              </Link>
              <Link href="/contact" className="text-white/85 hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </nav>

            {/* CTA Button - Hidden on mobile and tablet */}
            <div className="hidden lg:block">
              <Link href="https://github.com/deepika68509/optiblink-website/releases/download/v1/optiblink_standalone.exe" className="btn-primary">
                Download Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Enhanced Glassmorphism Effect - now show on tablet too */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-[#0A0F1F]/80 backdrop-blur-xl z-50 lg:hidden border-t border-white/10" style={{ top: '80px' }}>
          {/* Purple glow accent - enhanced */}
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-neon-purple/30 rounded-full filter blur-[100px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-600/30 rounded-full filter blur-[80px] opacity-30"></div>
          
          {/* Glass panel container */}
          <div className="flex flex-col p-6 h-full relative">
            {/* Glass panel */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-purple-900/10 p-6 mt-4">
              {/* Nav Links - Enhanced Glass Items */}
              <div className="space-y-3 py-4">
                <Link 
                  href="/#about" 
                  className="flex text-white text-xl py-3.5 border-b border-white/5 items-center justify-between hover:bg-white/5 hover:text-neon-purple rounded-lg px-4 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>About</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/#how-it-works" 
                  className="flex text-white text-xl py-3.5 border-b border-white/5 items-center justify-between hover:bg-white/5 hover:text-neon-purple rounded-lg px-4 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>How It Works</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/documentation" 
                  className="flex text-white text-xl py-3.5 border-b border-white/5 items-center justify-between hover:bg-white/5 hover:text-neon-purple rounded-lg px-4 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Documentation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/game" 
                  className="flex text-white text-xl py-3.5 border-b border-white/5 items-center justify-between hover:bg-white/5 hover:text-neon-purple rounded-lg px-4 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Game</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/contact" 
                  className="flex text-white text-xl py-3.5 border-b border-white/5 items-center justify-between hover:bg-white/5 hover:text-neon-purple rounded-lg px-4 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Contact</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                {/* Download button - glass effect */}
                <div className="pt-8">
                  <Link 
                    href="/#download" 
                    className="bg-gradient-to-br from-neon-purple/90 to-accent-purple/90 backdrop-blur-sm hover:from-neon-purple hover:to-accent-purple text-white font-medium rounded-xl w-full block py-4 text-center text-lg shadow-lg shadow-purple-900/30 border border-white/10 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Download APK
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-neon-purple/20 rounded-full"></div>
            <div className="absolute -top-2 -left-2 w-10 h-10 border border-accent-purple/20 rounded-lg"></div>
            
            {/* Morse code decoration */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-neon-purple/40 font-mono text-sm tracking-widest">
                .-.. --- --- -.- / ..- .--.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

