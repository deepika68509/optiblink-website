import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OptiBlink - Eye Blink Morse Code Communication System',
  description: 'Revolutionary eye blink detection system that converts blinks to Morse code for seamless communication.',
  keywords: 'eye blink, morse code, communication, accessibility, technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
