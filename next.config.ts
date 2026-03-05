import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.marktplaats.nl",
      },
      {
        protocol: "https",
        hostname: "**.marktplaats.com",
      },
      {
        protocol: "https",
        hostname: "**.marktplaatscdn.nl",
      },
      {
        protocol: "https",
        hostname: "www.tinyhousenederland.nl",
      },
      {
        protocol: "https",
        hostname: "www.modulairwonen.nl",
      },
      {
        protocol: "https",
        hostname: "www.tinyfindy.com",
      },
      {
        protocol: "https",
        hostname: "**.tinyfindy.com",
      },
      {
        protocol: "https",
        hostname: "www.stekelbos.nl",
      },
      {
        protocol: "https",
        hostname: "kuipercaravans.nl",
      },
      {
        protocol: "https",
        hostname: "www.unitdirekt.nl",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
