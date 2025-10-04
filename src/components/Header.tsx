'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      // attached to top, no border / no border-radius, subtle glass when scrolled
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/6 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/assets/icons/optiblink-logo.svg"
                alt="OptiBlink Logo"
                width={44}
                height={44}
                className="w-10 h-10"
              />
            </div>
            <span className="text-xl font-semibold text-white/95 tracking-wide">OptiBlink</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link href="/#download" className="btn-primary shadow-[0_8px_30px_rgba(164,0,171,0.12)]">
              Download APK
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Open menu"
            className="md:hidden ml-3 p-2 rounded-lg text-white/85 hover:text-white hover:bg-white/6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-purple/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

