import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thelifeyoucansave.org',
      },
      {
        protocol: 'https',
        hostname: 'www.unicef.org',
      },
      {
        protocol: 'https',
        hostname: 'www.stjude.org',
      },
    ],
  },
};

export default nextConfig;
