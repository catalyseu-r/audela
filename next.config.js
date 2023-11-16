/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    domains: [
      'apod.nasa.gov',
      'www.youtube.com',
      'images.pexels.com',
      'player.vimeo.com',
      'images-assets.nasa.gov',
      'mars.nasa.gov',
      'mars.jpl.nasa.gov',
    ],
    // formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
