/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'carbonbazaar.shop' },
    ],
  },
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
