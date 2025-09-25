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
          DEFAULT: '#0A0F1F',
          dark: '#0A0F1F',
        },
        accent: {
          DEFAULT: '#42106A', // New purple shade
          purple: '#42106A',
        },
        text: {
          DEFAULT: '#FDFCF9',
          offwhite: '#FDFCF9',
        },
        neon: {
          DEFAULT: '#5714f2', // Lighter purple for neon/glow
          purple: '#8A00F0',
        },
        neutral: {
          dark: '#1A1A1A',
          darker: '#2B2B2B',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
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
