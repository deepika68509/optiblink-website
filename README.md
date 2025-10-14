# OptiBlink – Eye Blink Morse Code Communication System

A revolutionary eye blink detection system that converts natural eye movements into Morse code, enabling seamless communication for individuals with speech impairments, those in silent environments, or anyone seeking an alternative communication method.

## 🌟 Features

- **👁️ Eye Blink Detection** - Advanced computer vision algorithms with high accuracy and minimal latency
- **📡 Morse Code Input** - Convert natural eye movements into precise Morse code patterns for reliable communication
- **⚡ Real-time Processing** - Real-time Morse code processing with sub-100ms response time
- **🤖 Intelligent Auto-completion** - Smart word prediction and auto-completion to speed up communication
- **🎯 Special Commands** - Supports Enter, Space, Backspace, Caps, SOS, TTS toggle and other control sequences
- **🔊 Text-to-Speech** - Convert decoded text to natural speech for audible communication
- **🚨 Emergency SOS** - Trigger SOS to call and send WhatsApp message to a saved contact
- **😴 Sleep Mode** - Pauses inputs when eyes are closed for 5s; same action wakes the system
- **🔧 Self-Calibration** - Automatically calibrates blink thresholds at startup for different users and lighting
- **🎮 Interactive Morse Game** - Learn and practice Morse code through an engaging bubble pop game experience
- **🔒 Privacy First** - All processing happens locally on your device with no external data transmission

## 🎮 Bubble Pop Game

The OptiBlink Bubble Pop Game is an interactive learning experience that combines entertainment with Morse code education.

### Game Features
- **2-Level Progression**: Level 1 (50 points) → Level 2 (100 points) with increasing speed
- **Morse Code Learning**: Visual reference and pattern recognition with unique letters per level
- **Real-time Feedback**: Live Morse code input display with auto-submit after 2 seconds
- **Strategic Lives System**: 3 lives per level with fresh lives for level 2
- **Progressive Difficulty**: Faster bubbles and higher score requirements
- **Camera Integration**: Ready for eye blink detection with manual testing buttons
- **Auto-Submit**: Morse code automatically submits after 2 seconds of inactivity
- **In-Game Reference**: Expandable Morse code reference chart during gameplay

### How to Play
1. **Objective**: Pop falling bubbles by entering the correct Morse code pattern
2. **Controls**: 
   - `Space` = Dot (.)
   - `Shift + Space` = Dash (-)
   - `Enter` = Submit pattern
   - `Backspace` = Delete last character
   - **Auto-submit**: Morse code submits automatically after 2 seconds of inactivity
3. **Game Flow**:
   - Level 1: Reach 50 points (5 bubbles) to unlock level 2
   - Level 2: Fresh 3 lives, reach 100 points (10 bubbles) to win
   - Lives reset between levels, score resets for level 2
4. **Scoring**: 10 points per bubble popped (consistent across levels)
5. **Lives**: 3 lives per level, lose one for missed bubbles or wrong codes
6. **Features**: In-game Morse code reference, manual blink testing buttons, real-time input display

### Future Enhancements
- **Real Blink Detection**: MediaPipe Face Mesh integration for actual eye tracking
- **Multiple Game Modes**: Learning, Speed, Endurance, and Custom modes
- **Achievements System**: Unlock badges and track progress
- **Leaderboards**: Global and local high score tracking
- **Sound Effects**: Audio feedback for successful pops and misses
- **Advanced Statistics**: Detailed performance analytics and improvement tracking

## 🚀 Tech Stack

- **Frontend**: React.js, Next.js 14, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion with advanced transitions
- **Fonts**: Inter (body text), Montserrat (headings)
- **Icons**: Custom SVG icon library
- **Video**: HTML5 video with autoplay capabilities
- **Deployment**: Optimized for Vercel/Netlify

## 🎨 Design Features

- **Dark Futuristic Theme** with professional purple gradient color scheme
- **Fully Responsive Design** for desktop, tablet, and mobile devices
- **Advanced Animations** with parallax effects, hover states, and Framer Motion
- **Glass Morphism UI** elements with backdrop blur effects and subtle borders
- **Dynamic Halo Effects** for enhanced visual appeal and depth
- **Interactive Elements** with smooth transitions and micro-interactions
- **Morse Code Typewriter** effect in hero section
- **Gradient Icons** with hover animations
- **Sticky Navigation** with glass morphism header

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Camera access for game functionality

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/optiblink-website.git
cd optiblink-website

# Install dependencies (includes MediaPipe for eye tracking)
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
# Navigate to /game to play the Bubble Pop game
```

### Game Dependencies
The project includes specialized dependencies for the interactive game:
```bash
# MediaPipe for future eye tracking integration
@mediapipe/face_mesh
@mediapipe/camera_utils  
@mediapipe/drawing_utils

# Camera access
react-webcam

# Animations and interactions
framer-motion
```

### Build for Production
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
optiblink-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main homepage
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── documentation/        # Documentation page
│   │   ├── game/                # Interactive Morse code game
│   │   │   ├── page.tsx         # Game component with bubble mechanics
│   │   │   └── components/      # Game-specific components
│   │   │       └── BlinkDetector.tsx  # Camera and blink detection
│   │   └── contact/             # Contact page
│   └── components/              # Reusable site components
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🎯 Key Sections

1. **Hero Section** - Eye-catching introduction with animated background
2. **About** - Project description and key benefits
3. **Features** - Comprehensive feature showcase
4. **Demo Video** - YouTube embedded demonstration
5. **FAQ** - Interactive accordion with common questions
6. **Footer** - Links, resources, and social media

## 🎨 Color Palette

- **Primary Background**: `#0A0F1F` (Dark tone)
- **Accent Purple**: `#42106A` (Main brand color)
- **Neon Purple**: `#8A00F0` (Highlights and glows)
- **Text**: `#FDFCF9` (Off-white)
- **Neutral**: `#1A1A1A`, `#2B2B2B` (Section separations)

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interactions
- **Optimized** for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'out' folder to Netlify
```

### Project Structure
optiblink-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage with all main sections
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── globals.css           # Global styles and animations
│   │   ├── documentation/
│   │   │   └── page.tsx         # Comprehensive documentation
│   │   ├── game/
│   │   │   └── page.tsx         # Interactive Morse code game
│   │   └── contact/
│   │       └── page.tsx         # Contact and support page
│   └── components/
│       ├── Header.tsx           # Navigation with glass morphism
│       └── Footer.tsx           # Footer with links and info
├── public/
│   └── assets/
│       ├── icons/               # SVG icon library
│       ├── images/              # Static images
│       └── videos/              # Demo videos
├── tailwind.config.js           # Custom Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies and scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: `/documentation`
- **Contact**: `/contact`
- **Demo Game**: `/game`
- **GitHub Issues**: Report bugs and feature requests

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Animated with Framer Motion
- Icons from various open-source libraries

---

**OptiBlink** - Making the world more accessible, one blink at a time. ✨
