/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "mosaic.scdn.co",
      "i.scdn.co",
      "daily-mix.scdn.co",
      "lineup-images.scdn.co",
    ],
  },
}

module.exports = nextConfig
