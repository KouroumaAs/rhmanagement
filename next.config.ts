import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4003',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'rhmanagement.dsdguinee.com',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
