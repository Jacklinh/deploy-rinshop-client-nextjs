/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deploy-rinshop-restfulapi-mongoose.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true
  }
}

module.exports = nextConfig 