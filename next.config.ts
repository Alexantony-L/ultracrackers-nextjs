import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
outputFileTracingIncludes: {
    // Global catch-all as a safety net
    "/*": ["node_modules/@sparticuz/chromium/bin/**/*"],
    // Specific route this is actually called from, per your setup
    "/api/orders": ["node_modules/@sparticuz/chromium/bin/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;