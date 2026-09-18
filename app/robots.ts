import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { absoluteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/components_Admin", "/Components_Admin", "/Components_Login"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
