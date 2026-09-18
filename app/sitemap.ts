import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { absoluteUrl } from "./seo";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/photos/campus-quad.jpg")],
    },
    {
      url: absoluteUrl("/proposal"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [absoluteUrl("/tiles/resource-proposal.svg")],
    },
    {
      url: absoluteUrl("/join"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/constitution"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/Components_Resources"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [absoluteUrl("/tiles/resource-apply.svg")],
    },
    {
      url: absoluteUrl("/Components_Fellowships"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/officers"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [absoluteUrl("/photos/mission-hall.jpg")],
    },
    {
      url: absoluteUrl("/sponsorship"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl("/photos/campus-quad.jpg")],
    },
  ];
}
