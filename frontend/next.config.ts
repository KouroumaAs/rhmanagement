import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // Permettre les requêtes cross-origin depuis l'adresse IP locale
  allowedDevOrigins: ['http://192.168.100.171:3000'],
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
        protocol: 'http',
        hostname: '192.168.100.171',
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
