/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization config
  images: {
    // Add any external image domains you might use
    // domains: ['example.com'],
    unoptimized: false,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Improve production performance
  swcMinify: true,
  // Handle trailing slashes consistently
  trailingSlash: false,
}

module.exports = nextConfig
