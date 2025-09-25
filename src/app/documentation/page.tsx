'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer' // Add this line


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
                  <div className="text-3xl mb-3">
                    {f.icon}
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

          <p className="text-sm text-white/60">Dummy note: replace with platform-specific steps, checksum links and download buttons.</p>
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

          <p className="text-sm text-white/60">Tip: embed demo video and interactive examples here for clarity.</p>
        </div>
      )
    },
    // Eye Blinks subsections
    {
      id: 'eye-blink-detection',
      title: '4.1 Eye Blink Detection',
      parent: 'eye-blinks',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Eye Blink Detection</h2>

          <p className="text-white/80">
            The system uses advanced facial tracking technology to carefully monitor your eyes and understand when you blink. It maps many points on your face—over 400 landmarks—with special attention to the eyes, so it can accurately follow their movements. For each eye, the system measures two important aspects: how open or closed the eye is, and the overall area of the eye. These measurements help the system determine the exact state of your eyes at any moment.
          </p>

          <p className="text-white/80">
            When you start using the system, it performs a quick calibration process. Over about 30 frames (a few seconds), it observes your eyes to learn what your normal open-eye measurements look like. This establishes a personal baseline, allowing the system to adapt to your unique features, as well as different lighting conditions or environments.
          </p>

          <p className="text-white/80">
            Once calibrated, the system can detect a blink whenever your eyes close noticeably below this baseline. By averaging measurements from both eyes and smoothing out small variations, the system ensures it only responds to intentional blinks and not to natural or accidental eye movements. This makes the blink recognition highly accurate and reliable, forming the foundation for hands-free communication.
          </p>
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

          <div className="overflow-x-auto">
            <table className="w-auto border border-white/20 rounded-lg text-sm">
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
      title: '5.1 Word Auto-Completion and Data Sources',
      parent: 'autocomplete',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Word Auto-Completion and Data Sources</h2>
          
          <p className="text-white/80">
            The system includes a smart text input feature that makes typing with eye blinks faster, easier, and more accurate. It can predict and suggest words as you blink, helping users communicate efficiently without having to blink every single letter.
          </p>

          <p className="text-white/80">
            At the heart of this feature is an advanced auto-completion system. It uses a highly efficient "tree-like" structure that stores words in a way that makes it quick to find all words starting with the letters you've already blinked. To cover a wide range of words, the system maintains two separate word libraries: one for custom words and another for a general English vocabulary. This ensures that you always have relevant suggestions while keeping the system fast and responsive.
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-2">
            <li><strong>Custom Word List:</strong> The system can load words from a CSV file, allowing users or developers to include specific words relevant to their needs—like medical terms, technical jargon, or personal expressions. This makes communication highly personalized.</li>
            <li><strong>Fallback English Words:</strong> To make sure suggestions are always available, the system also uses a comprehensive list of English words from a standard language library. All words are treated in lowercase to match inputs accurately, regardless of how they're typed.</li>
          </ul>

          <p className="text-white/80">
            Together, these features allow the system to predict words intelligently, reduce the number of blinks needed to type, and make hands-free communication smoother and more natural.
          </p>
        </div>
      )
    },
    {
      id: 'dynamic-suggestions',
      title: '5.2 Dynamic Suggestion Generation',
      parent: 'autocomplete',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Dynamic Suggestion Generation</h2>
          
          <p className="text-white/80">
            As you type letters using eye blinks, the system actively monitors the current word you're forming to provide real-time word suggestions. When you start a new word, the system quickly checks its word libraries to offer the most relevant completions.
          </p>

          <p className="text-white/80">
            It first looks for matches in the custom CSV word list, giving priority to your personalized vocabulary. If fewer than three suggestions are found, it then adds words from the broader English word library to make sure you always have helpful options. This ensures that your own preferred words appear first, while still keeping the suggestions comprehensive.
          </p>

          <p className="text-white/80">
            All suggested words are displayed clearly on the screen along with their corresponding Morse codes, making it easy to see and select them. The suggestions are designed to stand out from other interface elements, ensuring that they are easy to identify and use—even for users with visual challenges or difficulty focusing on complex layouts.
          </p>
        </div>
      )
    },
    {
      id: 'personalized-suggestions',
      title: '5.3 Personalized Suggestions via Usage Data',
      parent: 'autocomplete',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Personalized Suggestions via Usage Data</h2>
          
          <p className="text-white/80">
            The system gets smarter the more you use it by learning which words you use most often, creating a highly personalized typing experience.
          </p>

          <p className="text-white/80">
            Every time you complete a word—whether by selecting it from the suggestions or sending it—the system records it. It keeps track of how frequently each word is used, building a profile of your personal communication habits. This data is saved and loaded whenever you start the system, so it remembers your preferences over time.
          </p>

          <p className="text-white/80">
            Words that you use most often are given higher priority in the suggestion list, appearing first even if other words share the same letters. This means the system gradually learns your most common words and phrases, reducing the number of blinks needed to type them and making hands-free communication faster and more efficient.
          </p>
        </div>
      )
    },
    {
      id: 'selecting-suggestions',
      title: '5.4 Selecting Suggestions',
      parent: 'autocomplete',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Selecting Suggestions</h2>
          
          <p className="text-white/80">
            To make typing faster, users can choose one of the top three suggested words using simple, dedicated Morse code sequences. This allows words to be completed quickly with minimal blinks:
          </p>

          <ul className="list-disc ml-5 text-white/70 space-y-2">
            <li><strong>SELECT1 (.---.)</strong> – Picks the first suggestion. This pattern is easy to distinguish from regular blinks and designed for users with limited blink control.</li>
            <li><strong>SELECT2 (..--.)</strong> – Picks the second suggestion. The sequence is chosen to avoid accidental selections during normal blinking.</li>
            <li><strong>SELECT3 (.--..)</strong> – Picks the third suggestion.</li>
          </ul>

          <p className="text-white/80">
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

          <ul className="list-disc ml-5 text-white/70 space-y-2">
            <li><strong>ENTER (.-.-):</strong> Sends the current message to the active application, just like pressing the Enter key. The message is cleared from the input buffer, and if Text-to-Speech is enabled, it's spoken aloud.</li>
            <li><strong>SPACE (..--):</strong> Adds a space to your message, clearing the Morse character buffer so you can start a new word.</li>
            <li><strong>BACKSPACE (-):</strong> Deletes the last character, both from the message and the active application, helping you correct mistakes.</li>
            <li><strong>CAPS (.--.-):</strong> Toggles uppercase letters on or off. When active, all letters typed via blinks will appear in uppercase.</li>
            <li><strong>CLEAR (.._..):</strong> Clears your entire message and erases text in the active application so you can start fresh.</li>
            <li><strong>SOS (......):</strong> Sends an emergency "SOS" message and, if Text-to-Speech is enabled, announces it aloud.</li>
            <li><strong>SLEEP:</strong> Pauses blink detection to prevent accidental inputs. This mode can activate automatically after a few seconds of eye closure or manually via a blink pattern. You can wake the system using the same pattern or Morse code.</li>
            <li><strong>TTS_TOGGLE (-.-.-):</strong> Turns the Text-to-Speech feature on or off. If turned on, any existing message in the buffer is spoken aloud immediately.</li>
          </ul>

          <p className="text-white/80">
            These commands let users interact smoothly and efficiently, controlling both text input and system behavior without needing a keyboard or mouse.
          </p>
        </div>
      )
    },
    {
      id: 'tts-audio',
      title: '7. Auditory Feedback (Text-to-Speech - TTS)',
      content: (
        <div className="space-y-3 text-left">
          <h2 className="text-2xl font-semibold">Auditory Feedback (Text-to-Speech - TTS)</h2>

          <p className="text-white/80">
            To make communication more accessible, especially for users who may not always be looking at the screen or those with visual impairments, the system includes a powerful Text-to-Speech (TTS) feature. This converts your typed messages into natural-sounding speech, helping users receive immediate auditory feedback and creating a more inclusive experience.
          </p>

          <p className="text-white/80">
            The system uses Google Text-to-Speech (gTTS) technology to produce clear, natural-sounding audio across multiple languages and accents. The audio is played through pygame, and the entire process runs in a separate background thread. This ensures the system continues to respond to your blinks without any interruptions while the message is being spoken.
          </p>

          <p className="text-white/80">
            Audio is temporarily saved as an MP3 file and automatically deleted after playback to manage system resources efficiently. While speaking, a visual indicator shows "Speaking: [message]" on the screen, so you can see exactly what is being read aloud.
          </p>

          <p className="text-white/80">
            The TTS feature can be turned on or off at any time using the dedicated TTS_TOGGLE Morse code command (-.-.-.),  letting you control when auditory feedback is active. Users can also customize settings such as speech rate, volume, and voice type, and these preferences are remembered for future sessions, making the experience both personal and convenient.
          </p>
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
          <ul className="list-disc ml-5 text-white/70 space-y-1">
            <li><strong>GPS / Location Services:</strong> Enabled for location sharing.</li>
            <li><strong>WhatsApp:</strong> Installed and linked (or WhatsApp Web connected via QR scan).</li>
            <li><strong>Phone Link:</strong> Installed, set up, and connected to your phone via Bluetooth.</li>
            <li><strong>TTS (Text-to-Speech):</strong> Enabled to announce the emergency message during the call.</li>
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
              {/* Left nav */}
              <nav className="pr-4">
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
                        <span className={`transform transition-transform ${expandedSections.includes('eye-blinks') ? 'rotate-90' : ''}`}>
                          ›
                        </span>
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
                        <span className={`transform transition-transform ${expandedSections.includes('autocomplete') ? 'rotate-90' : ''}`}>
                          ›
                        </span>
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
              </nav>

              {/* Right content */}
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

      <Footer /> {/* Add this line */}
    </main>
  )
}
