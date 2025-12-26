import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure Static Web Apps configuration
  // Note: Removed standalone mode for faster Azure deployments
  experimental: {
    // Optimize for Azure deployment
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
