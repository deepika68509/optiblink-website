/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D0D16',
          dark: '#0D0D16',
        },
        accent: {
          DEFAULT: '#621665', // New purple shade
          purple: '#621665',
        },
        text: {
          DEFAULT: '#FDFCF9',
          offwhite: '#FDFCF9',
        },
        neon: {
          DEFAULT: '#740078', // Lighter purple for neon/glow
          purple: '#a400ab',
        },
        neutral: {
          dark: '#1A1A1A',
          darker: '#2B2B2B',
        }
      },
      fontFamily: {
        'sans': ['Red Hat Display', 'Poppins', 'sans-serif'], // Red Hat Display as default body font
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'red-hat': ['Red Hat Display', 'sans-serif'], // Explicit Red Hat Display class
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #BC13FE, 0 0 10px #BC13FE, 0 0 15px #BC13FE' },
          '100%': { boxShadow: '0 0 10px #BC13FE, 0 0 20px #BC13FE, 0 0 30px #BC13FE' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
