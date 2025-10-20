/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization config
  images: {
    // Add any external image domains you might use
    // domains: ['example.com'],
    unoptimized: false,
  },
  // Disable React strict mode to prevent double rendering and improve performance
  reactStrictMode: false,
  // Improve production performance
  swcMinify: true,
  // Handle trailing slashes consistently
  trailingSlash: false,
}

module.exports = nextConfig
