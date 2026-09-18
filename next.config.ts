import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH (e.g. "/colorstack-msu") when hosting under a sub-path
// such as a GitHub Pages project site. Leave it unset for a root domain or Vercel.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export: deployable to GitHub Pages or any static host.
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // The default image optimizer needs a server. This loader serves files as-is
    // and prefixes local paths with the base path (see lib/imageLoader.ts).
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
