import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'OptiBlink - Eye Blink Morse Code Communication',
  description: 'Revolutionary eye blink detection technology for seamless, accessible communication through Morse code.',
  icons: {
    icon: '/assets/icons/optiblink-logo.svg',
    shortcut: '/assets/icons/optiblink-logo.svg',
    apple: '/assets/icons/optiblink-logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/optiblink-logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/assets/icons/optiblink-logo.svg" />
        <link rel="apple-touch-icon" href="/assets/icons/optiblink-logo.svg" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
