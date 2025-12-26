import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure Static Web Apps configuration
  output: "standalone", // Creates optimized, self-contained build
  experimental: {
    // Optimize for Azure deployment
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
