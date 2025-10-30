/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
  trailingSlash: true,
}

module.exports = nextConfig