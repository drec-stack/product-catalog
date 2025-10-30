/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/product-catalog' : '',
}

module.exports = nextConfig
