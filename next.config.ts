import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// Automatically detect GitHub Pages environment and configure base path
const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || '';
  if (repo) {
    nextConfig.basePath = `/${repo}`;
  }
}

export default nextConfig
