'use client'

import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false) // popup state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formcarry.com/s/P_TZ2-9fnIa', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      const result = await response.json()

      if (result.status === 'success') {
        setIsOpen(true) // show popup
        form.reset() // clear form
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Error submitting form. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-primary-dark">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Contact OptiBlink</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We're here to help. Send a message, report a bug, or request a feature. Typical response time is 24–48 hours.
            </p>
          </motion.div>

          {/* Support info */}
          <div className="bg-neutral-dark rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Support</h2>
            <p className="text-white/70 mb-4">
              For account and technical support reach out to our team. We also maintain a community forum for conversations and troubleshooting.
            </p>
            <ul className="text-white/70 space-y-2">
              <li>
                • Support email:&nbsp;
                <a
                  href="mailto:optiblink.help@gmail.com"
                  className="text-neon-purple underline"
                >
                  optiblink.help@gmail.com
                </a>
              </li>
              <li>• Community forum:&nbsp; coming soon</li>
              <li>
                • Bug reports:&nbsp;
                <a
                  href="https://github.com/ameen90913/OptiBlink/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 underline"
                >
                  github.com/ameen90913/OptiBlink/issues
                </a>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="mt-8">
            <div className="bg-neutral-dark rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-primary-dark/50 border border-white/6 rounded-md px-3 py-2 text-white/90"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-primary-dark/50 border border-white/6 rounded-md px-3 py-2 text-white/90"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full bg-primary-dark/50 border border-white/6 rounded-md px-3 py-2 text-white/90"
                    placeholder="Tell us about your question or feedback..."
                  />
                </div>

                <div className="flex items-center justify-start gap-4">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-neutral-dark p-6 rounded-xl shadow-lg text-center max-w-sm mx-auto">
            <h4 className="text-xl font-semibold mb-2 text-white">✅ Message Sent</h4>
            <p className="text-white/70 mb-4">
              Thank you for reaching out. Our team will get back to you soon.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary px-6 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
