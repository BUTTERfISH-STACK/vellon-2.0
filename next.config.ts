import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['jsonresume-theme-stackoverflow'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
