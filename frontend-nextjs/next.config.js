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
  distDir: 'out',
  env: {
    NEXT_PUBLIC_API_URL: 'https://mohamedalamin.wuaze.com/api',
  },
  // إعدادات مهمة لـ Vercel
  poweredByHeader: false,
  compress: true,
  generateBuildId: async () => {
    return 'ecommerce-build-' + Date.now()
  }
}

module.exports = nextConfig
