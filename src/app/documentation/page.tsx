'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


type Tab = {
  id: string
  title: string
  parent?: string
  content: JSX.Element
}

export default function Documentation() {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  // Key features as cards (used by the Overview tab)
  const keyFeatures = [
    { 
      icon: '/assets/icons/Eye Blink Detection.svg', 
      title: 'Eye Blink Detection', 
      description: 'Utilizes MediaPipe Face Mesh to accurately track eye movements and detect blinks.' 
    },
    { 
      icon: '/assets/icons/morse-code-input.svg', 
      title: 'Morse Code Input', 
      description: 'Differentiates between short blinks (dots) and long blinks (dashes) to form Morse code characters.' 
    },
    { 
      icon: '/assets/icons/real-time.svg', 
      title: 'Real-time Decoding', 
      description: 'Converts Morse code inputs into letters, numbers, and special characters instantly.' 
    },
    { 
      icon: '/assets/icons/Auto-completion.svg', 
      title: 'Intelligent Auto-Completion', 
      description: 'Autocomplete suggests words based on typed prefixes from a CSV word list and the NLTK corpus.' 
    },
    { 
      icon: '/assets/icons/personalized-suggestions.svg', 
      title: 'Personalized Suggestions', 
      description: 'Learns from user word usage and prioritizes frequently used words in suggestions.' 
    },
    { 
      icon: '/assets/icons/Special Commands.svg', 
      title: 'Special Commands', 
      description: 'Supports Enter, Space, Backspace, Caps, SOS, TTS toggle and other control sequences.' 
    },
    { 
      icon: '/assets/icons/word-selection.svg', 
      title: 'Word Selection via Blinks', 
      description: 'Select suggested words using dedicated blink patterns (SELECT1, SELECT2, SELECT3).' 
    },
    { 
      icon: '/assets/icons/Text-to-Speech.svg', 
      title: 'TTS Integration', 
      description: 'Speaks typed messages for auditory feedback; can be toggled on/off.' 
    },
    { 
      icon: '/assets/icons/emergency.svg', 
      title: 'Emergency SOS', 
      description: 'Trigger SOS to call and send WhatsApp message to a saved contact.' 
    },
    { 
      icon: '/assets/icons/Sleep Mode.svg', 
      title: 'Sleep Mode', 
      description: 'Pauses inputs when eyes are closed for 5s; same action wakes the system.' 
    },
    { 
      icon: '/assets/icons/ui.svg', 
      title: 'Interactive UI', 
      description: 'Shows morse buffer, suggestions, CAPS/TTS state, blink visuals and a morse keyboard image.' 
    },
    { 
      icon: '/assets/icons/Self-Calibration.svg', 
      title: 'Self-Calibration', 
      description: 'Automatically calibrates blink thresholds at startup for different users and lighting.' 
    }
  ]

  const tabs: Tab[] = [
    {
      id: 'overview',
      title: '1. Overview',
      content: (
        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-semibold">Overview</h2>

          <p className="text-white/80">
          The Eye Blink Morse Code Communication System is an easy and powerful way to type and communicate without using your hands. By simply blinking, users can turn quick blinks (dots) and longer blinks (dashes) into letters and words through Morse code, making it possible to write messages, control devices, and interact digitally even if traditional input methods are difficult or impossible. 
          </p>
          <p className="text-white/80">
          Using a regular camera, the system recognizes intentional blinks and ignores natural eye movements, ensuring accurate communication. It also includes helpful features like smart word suggestions that learn your habits, text-to-speech feedback so your words can be spoken aloud, emergency SOS alerts via calls or WhatsApp, and an energy-saving sleep mode to prevent accidental inputs. Designed for accessibility, convenience, and reliability, this system offers a seamless and user-friendly way for anyone to communicate hands-free.
          </p>
          

          <h4 className="text-lg font-semibold">Key Features</h4>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {keyFeatures.map((f) => (
              <div
                key={f.title}
                className="card group cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center relative">
                    {/* Gradient background for icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-accent-purple rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={f.icon} 
                        alt={f.title}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  <h5 className="text-lg font-semibold text-white mb-2">
                    {f.title}
                  </h5>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'installation',
      title: '2. Installation',
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
        </div>
      )
    },
    {
      id: 'how-it-works',
      title: '3. How It Works',
      content: (
        <div className="space-y-6 text-left">
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

          {/* YouTube Demo Video */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
            <div className="relative overflow-hidden rounded-xl">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Y7_f-pR8SBY"
                  title="OptiBlink Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Eye Blinks subsections
    {
      id: 'eye-blink-detection',
      title: '4.1 Eye Blink Detection',
      parent: 'eye-blinks',
      content: (
        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold">Eye Blink Detection</h2>

          <p className="text-white/80">
            The Eye Blink Detection feature allows the system to understand your blinks, enabling hands-free communication.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How It Works</h3>
          
          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li>The system carefully monitors your eyes to detect when you blink.</li>
            <li>It tracks your eye movements and measures how open or closed your eyes are.</li>
            <li>This helps the system know your eye state at any moment.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Getting Started</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-purple">Calibration:</h4>
              <ul className="list-disc ml-5 text-white/80 space-y-1">
                <li>When you first use the system, it performs a quick calibration (a few seconds).</li>
                <li>During this, it observes your normal eye state to create a personal baseline.</li>
                <li>This allows the system to adapt to your unique eyes and different lighting conditions.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-purple">Blink Detection:</h4>
              <ul className="list-disc ml-5 text-white/80 space-y-1">
                <li>After calibration, the system detects blinks when your eyes close noticeably below your baseline.</li>
                <li>It averages both eyes and filters out accidental movements, ensuring only intentional blinks are recognized.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'morse-translation',
      title: '4.2 Morse Code Translation',
      parent: 'eye-blinks',
      content: (
        <div className="text-left space-y-4">
          <h2 className="text-2xl font-semibold">Morse Code Translation</h2>
          
          <p className="text-white/80">
            Once a blink is detected, its duration is measured to differentiate between a "dot" and a "dash":
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-2">
            <li><strong>Dot ('.'):</strong> A <strong>short blink</strong>, defined as a blink duration <strong>less than 0.3 seconds</strong>, is registered as a "dot".</li>
            <li><strong>Dash ('-'):</strong> A <strong>long blink</strong>, defined as a blink duration <strong>0.3 seconds or more</strong>, is registered as a "dash".</li>
            <li><strong>Character Completion:</strong> A <strong>pause in blinking</strong> (eyes open for at least 1.0 second, indicated by `open_threshold`) signals the end of a Morse code character sequence. At this point, the accumulated "dots" and "dashes" in the `morse_char_buffer` are then decoded.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-4">Comprehensive Morse Code Mapping</h3>
          
          <p className="text-white/80 mb-4">
            The system includes an extensive `morse_to_letter` dictionary to translate eye blink patterns into characters and commands. This allows users to form a wide range of text and control actions.
          </p>

          <p className="text-white/80 mb-4">Here is the complete Morse code mapping recognized by the system:</p>

          <div className="overflow-x-auto max-w-[75%]">
            <table className="w-full border border-white/20 rounded-lg text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Morse Code</th>
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Character/Command</th>
                  <th className="text-left p-3 text-neon-purple font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {/* Letters A-Z */}
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-</td><td className="p-3 font-bold border-r border-white/10">A</td><td className="p-3">Letter 'A'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-...</td><td className="p-3 font-bold border-r border-white/10">B</td><td className="p-3">Letter 'B'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-.-.</td><td className="p-3 font-bold border-r border-white/10">C</td><td className="p-3">Letter 'C'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-..</td><td className="p-3 font-bold border-r border-white/10">D</td><td className="p-3">Letter 'D'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.</td><td className="p-3 font-bold border-r border-white/10">E</td><td className="p-3">Letter 'E'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">..-.</td><td className="p-3 font-bold border-r border-white/10">F</td><td className="p-3">Letter 'F'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">--.</td><td className="p-3 font-bold border-r border-white/10">G</td><td className="p-3">Letter 'G'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">....</td><td className="p-3 font-bold border-r border-white/10">H</td><td className="p-3">Letter 'H'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">..</td><td className="p-3 font-bold border-r border-white/10">I</td><td className="p-3">Letter 'I'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.---</td><td className="p-3 font-bold border-r border-white/10">J</td><td className="p-3">Letter 'J'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-.-</td><td className="p-3 font-bold border-r border-white/10">K</td><td className="p-3">Letter 'K'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-..</td><td className="p-3 font-bold border-r border-white/10">L</td><td className="p-3">Letter 'L'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">--</td><td className="p-3 font-bold border-r border-white/10">M</td><td className="p-3">Letter 'M'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-.</td><td className="p-3 font-bold border-r border-white/10">N</td><td className="p-3">Letter 'N'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">---</td><td className="p-3 font-bold border-r border-white/10">O</td><td className="p-3">Letter 'O'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.--.</td><td className="p-3 font-bold border-r border-white/10">P</td><td className="p-3">Letter 'P'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">--.-</td><td className="p-3 font-bold border-r border-white/10">Q</td><td className="p-3">Letter 'Q'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-.</td><td className="p-3 font-bold border-r border-white/10">R</td><td className="p-3">Letter 'R'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">...</td><td className="p-3 font-bold border-r border-white/10">S</td><td className="p-3">Letter 'S'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-</td><td className="p-3 font-bold border-r border-white/10">T</td><td className="p-3">Letter 'T'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">..-</td><td className="p-3 font-bold border-r border-white/10">U</td><td className="p-3">Letter 'U'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">...-</td><td className="p-3 font-bold border-r border-white/10">V</td><td className="p-3">Letter 'V'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.--</td><td className="p-3 font-bold border-r border-white/10">W</td><td className="p-3">Letter 'W'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-..-</td><td className="p-3 font-bold border-r border-white/10">X</td><td className="p-3">Letter 'X'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-.--</td><td className="p-3 font-bold border-r border-white/10">Y</td><td className="p-3">Letter 'Y'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-..</td><td className="p-3 font-bold border-r border-white/10">Z</td><td className="p-3">Letter 'Z'</td></tr>
                
                {/* Numbers 0-9 */}
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-----</td><td className="p-3 font-bold border-r border-white/10">0</td><td className="p-3">Number '0'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.----</td><td className="p-3 font-bold border-r border-white/10">1</td><td className="p-3">Number '1'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">..---</td><td className="p-3 font-bold border-r border-white/10">2</td><td className="p-3">Number '2'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">...--</td><td className="p-3 font-bold border-r border-white/10">3</td><td className="p-3">Number '3'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">....-</td><td className="p-3 font-bold border-r border-white/10">4</td><td className="p-3">Number '4'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.....</td><td className="p-3 font-bold border-r border-white/10">5</td><td className="p-3">Number '5'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-....</td><td className="p-3 font-bold border-r border-white/10">6</td><td className="p-3">Number '6'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">--...</td><td className="p-3 font-bold border-r border-white/10">7</td><td className="p-3">Number '7'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">---..</td><td className="p-3 font-bold border-r border-white/10">8</td><td className="p-3">Number '8'</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">----.</td><td className="p-3 font-bold border-r border-white/10">9</td><td className="p-3">Number '9'</td></tr>
                
                {/* Special Commands */}
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-.-</td><td className="p-3 font-bold border-r border-white/10">ENTER</td><td className="p-3">Sends the current message and presses Enter</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">..-</td><td className="p-3 font-bold border-r border-white/10">SPACE</td><td className="p-3">Inserts a space and presses Space key</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">--</td><td className="p-3 font-bold border-r border-white/10">BACKSPACE</td><td className="p-3">Deletes the last character typed</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.--.-</td><td className="p-3 font-bold border-r border-white/10">CAPS</td><td className="p-3">Toggles Caps Lock for subsequent letters</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.._.</td><td className="p-3 font-bold border-r border-white/10">CLEAR</td><td className="p-3">Clears all text and resets the word buffer</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">......</td><td className="p-3 font-bold border-r border-white/10">SOS</td><td className="p-3">Sends "SOS" and can speak it</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">-.-.-</td><td className="p-3 font-bold border-r border-white/10">TTS_TOGGLE</td><td className="p-3">Toggles Text-to-Speech (TTS) on/off</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.---.</td><td className="p-3 font-bold border-r border-white/10">SELECT1</td><td className="p-3">Selects the first auto-completion suggestion</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.--.</td><td className="p-3 font-bold border-r border-white/10">SELECT2</td><td className="p-3">Selects the second auto-completion suggestion</td></tr>
                <tr className="border-b border-white/5"><td className="p-3 font-mono border-r border-white/10">.-..</td><td className="p-3 font-bold border-r border-white/10">SELECT3</td><td className="p-3">Selects the third auto-completion suggestion</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    // Auto-completion subsections
    {
      id: 'auto-completion-sources',
      title: '5.1 Intelligent Text Input and Auto-Completion',
      parent: 'autocomplete',
      content: (
        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold">Word Auto-Completion and Data Sources</h2>
          
          <p className="text-white/80">
            OptiBlink helps you type faster by suggesting words as you blink.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How Word Suggestions Work:</h3>
          
          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li>The system shows word suggestions as you type, helping you complete words without typing every letter.</li>
            <li>Suggestions come from your personal word list and a general list of common words.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Real-Time Assistance:</h3>

          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li>Up to three suggestions appear at a time.</li>
            <li>Your custom words are prioritized.</li>
            <li>If fewer than three custom words match, general words fill the list.</li>
            <li>Suggestions are displayed clearly with selection codes for easy choosing.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Personalized Suggestions:</h3>

          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li>The system learns the words you use most and shows them first.</li>
            <li>Frequent words require fewer blinks, speeding up your communication over time.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'selecting-suggestions',
      title: '5.2 Selecting Suggestions',
      parent: 'autocomplete',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Selecting Suggestions</h2>
          
          <p className="text-white/80">
            To make typing faster, users can choose one of the top three suggested words using simple, dedicated Morse code sequences. This allows words to be completed quickly with minimal blinks:
          </p>

          <div className="overflow-x-auto">
            <table className="w-3/4 border border-white/20 rounded-lg text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Command</th>
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Morse Code</th>
                  <th className="text-left p-3 text-neon-purple font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SELECT1</td>
                  <td className="p-3 font-mono border-r border-white/10">.---.</td>
                  <td className="p-3">Picks the first suggestion.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SELECT2</td>
                  <td className="p-3 font-mono border-r border-white/10">..--.</td>
                  <td className="p-3">Picks the second suggestion.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SELECT3</td>
                  <td className="p-3 font-mono border-r border-white/10">.--.</td>
                  <td className="p-3">Picks the third suggestion.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/80 mt-4">
            When a suggestion is selected, the partial word you've been forming is automatically replaced with the full word, a space is added, and the word is sent to the active application—just as if it had been typed manually. This ensures the system works seamlessly with any text field or application without extra setup, making hands-free communication smooth and effortless.
          </p>
        </div>
      )
    },
    // Other main sections
    {
      id: 'special-commands',
      title: '6. Special Commands and System Control',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Special Commands and System Control</h2>

          <p className="text-white/80">
            Beyond basic text input, the system offers a variety of special commands that let you control messages and the system itself—all using simple Morse code sequences. These commands make hands-free communication more flexible and efficient:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-white/20 rounded-lg text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Command</th>
                  <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Morse Code</th>
                  <th className="text-left p-3 text-neon-purple font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">ENTER</td>
                  <td className="p-3 font-mono border-r border-white/10">.-.-</td>
                  <td className="p-3">Sends the current message to the active application, just like pressing the Enter key. The message is cleared from the input buffer, and if Text-to-Speech is enabled, it's spoken aloud.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SPACE</td>
                  <td className="p-3 font-mono border-r border-white/10">..-</td>
                  <td className="p-3">Adds a space to your message, clearing the Morse character buffer so you can start a new word.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">BACKSPACE</td>
                  <td className="p-3 font-mono border-r border-white/10">--</td>
                  <td className="p-3">Deletes the last character, both from the message and the active application, helping you correct mistakes.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">CAPS</td>
                  <td className="p-3 font-mono border-r border-white/10">.--.-</td>
                  <td className="p-3">Toggles uppercase letters on or off. When active, all letters typed via blinks will appear in uppercase.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">CLEAR</td>
                  <td className="p-3 font-mono border-r border-white/10">.._..</td>
                  <td className="p-3">Clears your entire message and erases text in the active application so you can start fresh.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SOS</td>
                  <td className="p-3 font-mono border-r border-white/10">......</td>
                  <td className="p-3">Sends an emergency "SOS" message and, if Text-to-Speech is enabled, announces it aloud.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">SLEEP</td>
                  <td className="p-3 font-mono border-r border-white/10">-</td>
                  <td className="p-3">Pauses blink detection to prevent accidental inputs. This mode can activate automatically after a few seconds of eye closure or manually via a blink pattern. You can wake the system using the same pattern or Morse code.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-bold border-r border-white/10">TTS_TOGGLE</td>
                  <td className="p-3 font-mono border-r border-white/10">-.-.-</td>
                  <td className="p-3">Turns the Text-to-Speech feature on or off. If turned on, any existing message in the buffer is spoken aloud immediately.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/80 mt-4">
            These commands let users interact smoothly and efficiently, controlling both text input and system behavior without needing a keyboard or mouse.
          </p>
        </div>
      )
    },
    {
      id: 'tts-audio',
      title: '7. Auditory Feedback (Text-to-Speech - TTS)',
      content: (
        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold">Auditory Feedback (Text-to-Speech - TTS)</h2>

          <p className="text-white/80">
            The Text-to-Speech (TTS) feature reads your typed messages out loud, making communication easier and more inclusive.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of TTS</h3>
          
          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li><strong>Instant Audio Feedback:</strong> Hear your messages immediately as they are typed.</li>
            <li><strong>Accessibility:</strong> Perfect for users with visual impairments or those who cannot always look at the screen.</li>
            <li><strong>Inclusive Communication:</strong> Helps ensure everyone can follow along, even without looking.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">How to Use TTS</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-purple">Enable or Disable TTS:</h4>
              
              <div className="overflow-x-auto ml-5">
                <table className="w-3/4 border border-white/20 rounded-lg text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Command</th>
                      <th className="text-left p-3 text-neon-purple font-semibold border-r border-white/10">Morse Code</th>
                      <th className="text-left p-3 text-neon-purple font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="p-3 font-bold border-r border-white/10">TTS_TOGGLE</td>
                      <td className="p-3 font-mono border-r border-white/10">-.-.-</td>
                      <td className="p-3">Turn TTS on or off anytime during use</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-neon-purple">See What's Being Read:</h4>
              <p className="text-white/80 ml-5 mb-2">
                While a message is being spoken, the system displays:
              </p>
              <div className="bg-neutral-dark/50 border border-white/10 rounded-lg p-3 ml-5 text-white/80 font-mono text-sm">
                "Speaking: [your message]"
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">How It Works for You</h3>

          <ul className="list-disc ml-5 text-white/80 space-y-2">
            <li>Once TTS is enabled, messages are automatically read aloud—no extra steps needed.</li>
            <li>You can continue using the system normally while listening, with no interruptions.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'interface',
      title: '8. Emergency SOS',
      content: (
        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold">Emergency SOS</h2>

          <p className="text-white/80">
            The Emergency SOS feature is designed to help users quickly and reliably alert a trusted emergency contact when immediate assistance is needed. It combines automated messaging, location sharing, phone calling, and auditory alerts into one seamless, hands-free process, triggered entirely by eye blinks. This feature is especially useful for users with limited mobility or in situations where immediate physical interaction with a phone is not possible.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Activating Emergency SOS</h3>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>To trigger the Emergency SOS, enter the Morse code sequence six consecutive dots (......)  using your eye blinks.</li>
            <li>The system recognizes this as an urgent signal and immediately initiates the emergency alert sequence.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Sending an Emergency Message via WhatsApp</h3>
          <p className="text-white/80">Once triggered, the system will automatically send a pre-written message to your designated emergency contact.</p>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">Message Content:</h4>
          <div className="bg-neutral-dark/50 border border-white/10 rounded-lg p-4 text-white/80 font-mono text-sm">
            <p>🚨 EMERGENCY! I need immediate help. This is an automated SOS from OptiBlink. Please call me urgently!</p>
            <br />
            <p>📡 Accurate device location: Device location (accuracy: 15.0m)</p>
            <p>🗺️ Google Maps: https://maps.google.com/?q=40.7128,-74.0060</p>
            <p>📱 Coordinates: 40.7128, -74.0060</p>
            <br />
            <p>📝 Additional info: Hello. I am in an emergency situation. I need your help. My location is shared via WhatsApp.</p>
          </div>

          <h4 className="text-lg font-semibold mt-4 mb-2">Location Sharing:</h4>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>The system includes your current GPS location in the message, enabling your contact to locate you quickly.</li>
            <li><strong>Requirement:</strong> Ensure GPS/location services are enabled on your device.</li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-2">WhatsApp Requirements:</h4>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>You must have WhatsApp installed on your device or linked via WhatsApp Web.</li>
            <li>If using WhatsApp Web, scan the QR code to link your account beforehand.</li>
            <li>The system opens WhatsApp automatically and sends the message to the pre-saved emergency contact.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Placing an Emergency Phone Call</h3>
          <p className="text-white/80">After sending the WhatsApp message, the system switches to the Phone Link application to place a call to the same emergency contact. This ensures that even if the text message is missed, the contact will receive a live call.</p>

          <h4 className="text-lg font-semibold mt-4 mb-2">Call Process:</h4>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>The system automatically initiates a phone call via Phone Link.</li>
            <li>During the call, the system uses Text-to-Speech (TTS) to announce: <em>"I am in an emergency. My location has been sent via WhatsApp. Please check. I need immediate help."</em></li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-2">Requirements for Phone Call:</h4>
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li>Phone Link app must be installed and set up on your system.</li>
            <li>Bluetooth must be enabled and connected to your phone for Phone Link to function.</li>
            <li>TTS must be enabled in the system settings.</li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-2">Phone Link Setup Guide:</h4>
          <p className="text-white/70">
            For step-by-step instructions to install and set up Phone Link, visit the official Microsoft guide: 
            <a href="https://support.microsoft.com/en-gb/topic/phone-link-requirements-and-setup-cd2a1ee7-75a7-66a6-9d4e-bf22e735f9e3" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-neon-purple hover:text-accent-purple ml-1">
              Set up Phone Link on Windows
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. System Requirements</h3>
          <p className="text-white/80">To ensure Emergency SOS works smoothly, your system must meet the following requirements:</p>
          
          <ul className="list-disc ml-5 text-white/70 space-y-2">
            <li><strong>GPS / Location Services:</strong> Enabled for location sharing.</li>
            <li><strong>WhatsApp:</strong> Installed and linked (or WhatsApp Web connected via QR scan).</li>
            <li>
              <strong>Phone Link & Bluetooth:</strong>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Phone Link must be installed, set up, and connected to your phone.</li>
                <li>Bluetooth must be turned on on both your mobile and laptop, and the devices must be connected.</li>
              </ul>
            </li>
            <li><strong>Internet Connection:</strong> Required for WhatsApp messaging and TTS services.</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <main className="bg-primary-dark">
      <Header />

      <section className="pt-24 pb-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-0">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
              {/* Left nav - Now sticky with hidden scrollbar */}
              <nav className="pr-4">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                  <div className="flex flex-col gap-1">
                    <div className="px-2 pt-3">
                      {/* Sections 1-3 */}
                      {tabs.filter(t => !t.parent && ['overview', 'installation', 'how-it-works'].includes(t.id)).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTab(t.id)}
                          className={`w-full text-left px-4 py-3 mb-1 rounded-md transition flex items-center justify-between ${
                            activeTab === t.id
                              ? 'border-l-4 border-neon-purple pl-3 text-neon-purple font-semibold'
                              : 'text-white/80 hover:bg-white/3'
                          }`}
                        >
                          <span className="text-sm font-medium">{t.title}</span>
                        </button>
                      ))}

                      {/* Section 4: Eye Blinks to Morse Code Conversion */}
                      <div>
                        <button
                          onClick={() => toggleSection('eye-blinks')}
                          className="w-full text-left px-4 py-3 mb-1 text-white/80 hover:bg-white/3 rounded-md transition flex items-center justify-between"
                        >
                          <span className="text-sm font-medium">4. Eye Blinks to Morse Code Conversion</span>
                        </button>
                        {expandedSections.includes('eye-blinks') && (
                          <div className="ml-4 space-y-1">
                            {tabs.filter(sub => sub.parent === 'eye-blinks').map(subTab => (
                              <button
                                key={subTab.id}
                                onClick={() => setActiveTab(subTab.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                                  activeTab === subTab.id
                                    ? 'border-l-4 border-neon-purple pl-2 text-neon-purple font-semibold'
                                    : 'text-white/70 hover:bg-white/2'
                                }`}
                              >
                                {subTab.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Section 5: Intelligent Text Input and Auto-Completion */}
                      <div>
                        <button
                          onClick={() => toggleSection('autocomplete')}
                          className="w-full text-left px-4 py-3 mb-1 text-white/80 hover:bg-white/3 rounded-md transition flex items-center justify-between"
                        >
                          <span className="text-sm font-medium">5. Intelligent Text Input and Auto-Completion</span>
                        </button>
                        {expandedSections.includes('autocomplete') && (
                          <div className="ml-4 space-y-1">
                            {tabs.filter(sub => sub.parent === 'autocomplete').map(subTab => (
                              <button
                                key={subTab.id}
                                onClick={() => setActiveTab(subTab.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                                  activeTab === subTab.id
                                    ? 'border-l-4 border-neon-purple pl-2 text-neon-purple font-semibold'
                                    : 'text-white/70 hover:bg-white/2'
                                }`}
                              >
                                {subTab.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Sections 6-8 */}
                      {tabs.filter(t => !t.parent && ['special-commands', 'tts-audio', 'interface'].includes(t.id)).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTab(t.id)}
                          className={`w-full text-left px-4 py-3 mb-1 rounded-md transition flex items-center justify-between ${
                            activeTab === t.id
                              ? 'border-l-4 border-neon-purple pl-3 text-neon-purple font-semibold'
                              : 'text-white/80 hover:bg-white/3'
                          }`}
                        >
                          <span className="text-sm font-medium">{t.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Right content - Scrollable */}
              <div className="p-8 overflow-y-auto">
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

      <Footer />
    </main>
  )
}
