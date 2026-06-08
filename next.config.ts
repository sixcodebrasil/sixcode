import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [375, 640, 750, 828, 1080, 1280, 1600],
    imageSizes: [240, 320, 420, 540, 640],
  },
};

export default nextConfig;
