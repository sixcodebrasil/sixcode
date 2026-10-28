import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clones dos modelos (public/prototipos/<segmento>): cada rota vira um .html em _pages
  async rewrites() {
    return [
      { source: "/prototipos/:slug", destination: "/prototipos/:slug/_pages/index.html" },
      { source: "/prototipos/:slug/:path*", destination: "/prototipos/:slug/_pages/:path*.html" },
    ];
  },
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
