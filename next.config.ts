import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/casino-test",
  assetPrefix: "/casino-test/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
