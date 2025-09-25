'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Game() {
  return (
    <main className="min-h-screen bg-primary-dark">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">OptiBlink Game</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Learn Morse code through interactive gameplay
          </p>
          <div className="bg-neutral-dark border border-neon-purple/30 rounded-xl p-8">
            <p className="text-white/80 text-lg">
              Game content will be added here. This page will include:
            </p>
            <ul className="text-white/70 text-left mt-4 space-y-2 max-w-md mx-auto">
              <li>• Interactive Morse code lessons</li>
              <li>• Blink detection training</li>
              <li>• Progress tracking</li>
              <li>• Leaderboards</li>
              <li>• Achievement system</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
