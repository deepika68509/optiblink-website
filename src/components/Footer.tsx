import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-darker border-t border-neon-purple/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center">
          {/* Company Info - Centered */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/assets/icons/optiblink-logo.svg"
                  alt="OptiBlink Logo"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <span className="text-2xl font-bold text-white">OptiBlink</span>
            </div>
            
            <p className="text-white/80 mb-6 max-w-lg mx-auto text-lg leading-relaxed">
              Revolutionizing communication through innovative eye blink technology. Making the world more accessible, one blink at a time.

            </p>
            
            {/* Social Icons - Enhanced */}
            <div className="flex justify-center space-x-6 mb-6">
              {/* GitHub Icon */}
              <a
                href="https://github.com/ameen90913/OptiBlink"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 hover:from-neon-purple/20 hover:to-neon-purple/10 rounded-xl flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50 hover:shadow-lg hover:shadow-neon-purple/25 hover:-translate-y-1"
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              
              {/* YouTube Icon */}
              <a
                href="https://www.youtube.com/@Optiblink-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 hover:from-red-500/20 hover:to-red-600/10 rounded-xl flex items-center justify-center text-white hover:text-red-400 transition-all duration-300 border border-white/20 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-400/25 hover:-translate-y-1"
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright with decorative line */}
        <div className="pt-6 border-t border-gradient-to-r from-transparent via-white/20 to-transparent relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"></div>
          <div className="text-center pt-2">
            <p className="text-white/70 text-sm font-medium">
              © 2025 OptiBlink. All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-1">
              Built with ❤️ for accessibility
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;