import path from "node:path";
import type { NextConfig } from "next";

// Static export: every page ships as prerendered HTML (SEO, Netlify, no server).
// The parent folder holds the v1 site and its own package-lock, so pin the root.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
