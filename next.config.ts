import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  images: {
    domains: ['img.youtube.com'],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
