/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'carbonbazaar.shop'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
