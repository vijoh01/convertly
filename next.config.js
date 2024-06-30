/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'src/build',
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Match any /api/ requests
          destination: 'http://0.0.0.0:3000/api/:path*', // Replace with your backend API URL
        },
      ];
    },
  };
  
  module.exports = nextConfig;