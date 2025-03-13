/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'peach.blender.org',
      'upload.wikimedia.org',
      'storage.googleapis.com'
    ],
  },
  experimental: {
    serverActions: true,
  },
  serverRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:80/api',
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  }
}

module.exports = nextConfig
