/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['mohamedalamin.wuaze.com'],
  },
  trailingSlash: true,
  output: 'export',
  env: {
    NEXT_PUBLIC_API_URL: 'https://mohamedalamin.wuaze.com/api',
  }
}

module.exports = nextConfig
