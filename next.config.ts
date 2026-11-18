import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [85],
    formats: ["image/webp"],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
