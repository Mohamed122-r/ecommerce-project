/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mohamedalamin.wuaze.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://mohamedalamin.wuaze.com/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://mohamedalamin.wuaze.com/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
