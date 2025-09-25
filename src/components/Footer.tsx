import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-darker border-t border-neon-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OB</span>
              </div>
              <span className="text-xl font-bold text-white">OptiBlink</span>
            </div>
            <p className="text-white/70 mb-4 max-w-md">
              Revolutionizing communication through innovative eye blink technology.
              Making the world more accessible, one blink at a time.
            </p>
            <div className="flex space-x-4">
              {/* GitHub Icon */}
              <a
                href="https://github.com/ameen90913/OptiBlink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-neon-purple/20 rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50"
              >
                <svg
                  className="w-5 h-5"
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
                className="w-10 h-10 bg-white/10 hover:bg-neon-purple/20 rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 border border-white/20 hover:border-neon-purple/50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-white/70 hover:text-neon-purple transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-white/70 hover:text-neon-purple transition-colors duration-300"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-white/70 hover:text-neon-purple transition-colors duration-300"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/game"
                  className="text-white/70 hover:text-neon-purple transition-colors duration-300"
                >
                  Game
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-neon-purple transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Simplified */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              © 2025 OptiBlink. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;