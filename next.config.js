/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/product-catalog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/product-catalog/' : '',
}

module.exports = nextConfig
