/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
