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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary-dark/80 backdrop-blur-custom' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/assets/icons/optiblink-logo.svg"
                alt="OptiBlink Logo"
                width={48}
                height={48}
                className="w-full h-full"
              />
            </div>
            <span className="text-xl font-bold text-white">OptiBlink</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-white hover:text-neon-purple transition-colors duration-300">
              About
            </Link>
            <Link href="/#how-it-works" className="text-white hover:text-neon-purple transition-colors duration-300">
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
            <Link href="/#download" className="btn-primary">
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
  )
}

