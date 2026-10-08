/** @type {import('next').NextConfig} */

// The marketplace is served under /marketplace on the main website.
// Set MARKETPLACE_BASE_PATH="" to host it at the root of its own domain instead.
const basePath = process.env.MARKETPLACE_BASE_PATH ?? '/marketplace';

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
