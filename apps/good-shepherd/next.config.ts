import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Azure Static Web Apps configuration
  experimental: {
    // Optimize for Azure deployment
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
