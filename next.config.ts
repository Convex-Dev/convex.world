/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/convex.world',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: '/convex.world/',
}

module.exports = nextConfig
