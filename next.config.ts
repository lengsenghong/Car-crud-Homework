// next.config.js or next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.pinimg.com','imgs.search.brave.com','encrypted-tbn0.gstatic.com'],
  },
};

export default nextConfig;
