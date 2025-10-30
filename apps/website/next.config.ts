/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rakshasetu/database'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
