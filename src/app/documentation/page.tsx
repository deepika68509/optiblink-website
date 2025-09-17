'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

type Tab = {
  id: string
  title: string
  content: JSX.Element
}

export default function Documentation() {
  const [activeTab, setActiveTab] = useState<string>('overview')

  // Key features as cards (used by the Overview tab)
  const keyFeatures = [
    { icon: '👁️', title: 'Eye Blink Detection', description: 'Utilizes MediaPipe Face Mesh to accurately track eye movements and detect blinks.' },
    { icon: '📡', title: 'Morse Code Input', description: 'Differentiates between short blinks (dots) and long blinks (dashes) to form Morse code characters.' },
    { icon: '⚡', title: 'Real-time Decoding', description: 'Converts Morse code inputs into letters, numbers, and special characters instantly.' },
    { icon: '🤖', title: 'Intelligent Auto-Completion', description: 'Autocomplete suggests words based on typed prefixes from a CSV word list and the NLTK corpus.' },
    { icon: '📈', title: 'Personalized Suggestions', description: 'Learns from user word usage and prioritizes frequently used words in suggestions.' },
    { icon: '🔧', title: 'Special Commands', description: 'Supports Enter, Space, Backspace, Caps, SOS, TTS toggle and other control sequences.' },
    { icon: '🔢', title: 'Word Selection via Blinks', description: 'Select suggested words using dedicated blink patterns (SELECT1, SELECT2, SELECT3).' },
    { icon: '🔊', title: 'TTS Integration', description: 'Speaks typed messages for auditory feedback; can be toggled on/off.' },
    { icon: '🚨', title: 'Emergency SOS', description: 'Trigger SOS to call and send WhatsApp message to a saved contact.' },
    { icon: '😴', title: 'Sleep Mode', description: 'Pauses inputs when eyes are closed for 5s; same action wakes the system.' },
    { icon: '🖥️', title: 'Interactive UI', description: 'Shows morse buffer, suggestions, CAPS/TTS state, blink visuals and a morse keyboard image.' },
    { icon: '⚙️', title: 'Self-Calibration', description: 'Automatically calibrates blink thresholds at startup for different users and lighting.' }
  ]

  const tabs: Tab[] = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-semibold">Overview</h2>

          <p className="text-white/80">
            The "Eye Blink Morse Code Communication System" is an innovative application designed to enable hands-free text input using only eye blinks. By leveraging computer vision and Morse code, it provides an alternative communication method, particularly beneficial for individuals who may have difficulty with traditional input devices. The system translates eye blinks into Morse code signals, decodes them into characters, and intelligently assists the user with features like <strong>auto-completion, text-to-speech feedback, emergency SOS (calling and WhatsApp messaging), and sleep mode for inactive states.</strong>
          </p>

          <h4 className="text-lg font-semibold">Key Features</h4>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {keyFeatures.map((f) => (
              <div
                key={f.title}
                className="group cursor-pointer rounded-xl p-4 transition-transform duration-300 transform hover:scale-[1.02] bg-white/6 border border-white/10 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{f.icon}</div>
                  <div>
                    <h5 className="text-white font-semibold">{f.title}</h5>
                    <p className="text-white/80 text-sm mt-1">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'installation',
      title: 'Installation',
      content: (
        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold">Installation</h2>

          <p className="text-white/80">Installation varies by platform. Typical deliverables:</p>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>APK for Android</li>
            <li>Desktop installers for Windows/macOS</li>
            <li>Browser extension for web integration</li>
            <li>Python package for prototype / research builds</li>
          </ul>

          <p className="text-sm text-white/60">Dummy note: replace with platform-specific steps, checksum links and download buttons.</p>
        </div>
      )
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">How It Works</h2>

          <p className="text-white/80">
            The application translates eye blinks into Morse code: short blinks become dots, long blinks become dashes, sequences form characters and special commands.
          </p>

          <ol className="list-decimal ml-5 text-white/70 space-y-1">
            <li><strong>Setup & Calibration:</strong> load libraries, initialize camera and calibrate open-eye baseline.</li>
            <li><strong>Eye Tracking:</strong> continuous detection with MediaPipe Face Mesh for eye landmarks.</li>
            <li><strong>Blink Detection:</strong> measure blink duration; short &lt; 0.3s = dot, long ≥ 0.3s = dash.</li>
            <li><strong>Character Formation:</strong> pause (eyes open ≥ 1.0s) marks character completion → decode from morse map.</li>
            <li><strong>Actions:</strong> decoded letters appended to word buffer or special commands triggered (ENTER, SPACE, SELECTi, SOS, etc.).</li>
          </ol>

          <p className="text-sm text-white/60">Tip: embed demo video and interactive examples here for clarity.</p>
        </div>
      )
    },
    {
      id: 'eye-blinks',
      title: 'Eye Blinks',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Eye Blink Detection</h2>

          <p className="text-white/80">
            Uses MediaPipe Face Mesh to track eye landmarks (EAR and eye area). The system self-calibrates over initial frames to measure typical open-eye values.
          </p>

          <h5 className="font-semibold">Calibration & Detection</h5>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>Calibration: sample ~30 frames to compute baseline EAR/area.</li>
            <li>Blink if smoothed EAR/area &lt; 70% of baseline.</li>
            <li>Smoothing uses short history buffers (deque) to avoid noise.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'morse-mapping',
      title: 'Morse Mapping',
      content: (
        <div className="text-left space-y-3">
          <h2 className="text-2xl font-semibold">Morse Mapping</h2>
          <p className="text-white/80">Complete Morse-to-character map (letters, numbers, and commands) used by the system:</p>

          <pre className="bg-neutral-dark border border-neon-purple/20 rounded-md p-4 text-sm text-white/70 overflow-x-auto">
{`.-     -> A
-...   -> B
-.-.   -> C
-..    -> D
.      -> E
..-.   -> F
--.    -> G
....   -> H
..     -> I
.---   -> J
-.-    -> K
.-..   -> L
--     -> M
-.     -> N
---    -> O
.--.   -> P
--.-   -> Q
.-.    -> R
...    -> S
-      -> T
..-    -> U
...-   -> V
.--    -> W
-..-   -> X
-.--   -> Y
--..   -> Z
-----  -> 0
.----  -> 1
..---  -> 2
...--  -> 3
....-  -> 4
.....  -> 5
-....  -> 6
--...  -> 7
---..  -> 8
----.  -> 9

Special commands:
.-.-   -> ENTER
..--   -> SPACE
--     -> BACKSPACE
.--.-  -> CAPS
.._..  -> CLEAR
...... -> SOS
-.-.-  -> TTS_TOGGLE
.---.  -> SELECT1
..--.  -> SELECT2
.--..  -> SELECT3`}
          </pre>
        </div>
      )
    },
    {
      id: 'autocomplete',
      title: 'Auto-Completion',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Intelligent Text Input & Auto-Completion</h2>

          <p className="text-white/80">The system integrates an advanced AutoCompleteSystem using Tries and multiple word sources.</p>

          <h5 className="font-semibold">Word Sources</h5>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li><strong>CSV word list:</strong> primary curated vocabulary.</li>
            <li><strong>NLTK corpus:</strong> fallback comprehensive word list.</li>
          </ul>

          <h5 className="font-semibold">Behavior & Personalization</h5>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>Up to 3 suggestions shown; CSV prioritized, then NLTK.</li>
            <li>Usage frequencies stored in usage_data.txt promote frequent words.</li>
            <li>Select suggestions via SELECT1/2/3 sequences to replace partial word and send.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'special-commands',
      title: 'Special Commands',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Special Commands & Controls</h2>

          <p className="text-white/80">
            Special Morse sequences map to control actions: Enter, Space, Backspace, Caps toggle, Clear, SOS, TTS toggle, and suggestion selects.
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li><strong>ENTER (.-.-):</strong> send buffer and simulate Enter.</li>
            <li><strong>SPACE (..--):</strong> insert space and continue typing.</li>
            <li><strong>BACKSPACE (--):</strong> remove last character.</li>
            <li><strong>CAPS (.--.-):</strong> toggle caps lock for subsequent letters.</li>
            <li><strong>CLEAR (.._..):</strong> clear all text and word buffer.</li>
            <li><strong>SOS (......):</strong> send SOS and optionally trigger emergency call + WhatsApp.</li>
            <li><strong>TTS_TOGGLE (-.-.-):</strong> toggle Text-to-Speech on/off.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tts-audio',
      title: 'TTS & Audio',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Auditory Feedback (TTS)</h2>

          <p className="text-white/80">
            TTS uses gTTS to generate speech and pygame.mixer to play audio on a separate thread. Temporary MP3 files are used and removed after playback.
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>Generate audio with gTTS, play with pygame in a worker thread.</li>
            <li>Show "Speaking: [message]" indicator while playing.</li>
            <li>TTS can be toggled by Morse command; speaking runs asynchronously.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'interface',
      title: 'Interface & Visuals',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">System Interface & Visual Feedback</h2>

          <p className="text-white/80">
            The application runs in an OpenCV window and provides live visual feedback: morse buffer, suggestions, blink-state indicator, CAPS/TTS badges, and a virtual morse keyboard.
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>Live video feed with facial landmarks.</li>
            <li>Suggestion boxes with selection codes shown prominently.</li>
            <li>Sleep Mode indicator when eyes closed ≥ 5s.</li>
            <li>Window positioned top-right and set to always-on-top on Windows.</li>
          </ul>
        </div>
      )
    },
    // extra tabs (beyond the main 9)
    {
      id: 'calibration',
      title: 'Calibration',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Calibration</h2>
          <p className="text-white/80">Auto-calibration samples open-eye statistics and adapts thresholds for EAR and eye area. Show calibration progress and allow manual recalibrate.</p>
        </div>
      )
    },
    {
      id: 'tech-details',
      title: 'Technical Details',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Technical Implementation Details</h2>
          <p className="text-white/80">
            Libraries: OpenCV (cv2), mediapipe, numpy, keyboard, csv, nltk, gTTS, pygame, threading, tempfile, os, time. Windows helpers may use ctypes / win32api for window placement and always-on-top behavior.
          </p>
        </div>
      )
    }
  ]

  return (
    <main className="bg-primary-dark">
      <Header />

      <section className="pt-20 pb-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-gradient">Documentation</span>
            </h1>
            <p className="text-base text-white/70 max-w-4xl mx-auto">
              Comprehensive guides, implementation notes and reference for OptiBlink.
            </p>
          </div>

          <div className="rounded-xl p-0">
            <div className="grid grid-cols-[260px_1fr] gap-6">
              {/* Left nav on the left (regular flow, no fixed heights or overflow control) */}
              <nav className="pr-4">
                <div className="flex flex-col gap-2">
                  <div className="px-2 pt-3">
                    {tabs.slice(0, 9).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`w-full text-left px-4 py-3 mb-1 rounded-md transition flex items-center justify-between ${
                          activeTab === t.id
                            ? 'bg-neon-purple text-primary-dark shadow-glow'
                            : 'text-white/80 hover:bg-white/3'
                        }`}
                      >
                        <span className="text-sm font-medium">{t.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 px-2 pt-3">
                    <p className="text-xs text-white/60 px-2 mb-2">More</p>
                    {tabs.slice(9).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                          activeTab === t.id ? 'bg-neon-purple text-primary-dark' : 'text-white/70 hover:bg-white/2'
                        }`}
                      >
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Right content — normal document flow and normal page scrolling */}
              <div className="p-8">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="max-w-none prose prose-invert text-white">
                    {tabs.find((t) => t.id === activeTab)?.content}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
