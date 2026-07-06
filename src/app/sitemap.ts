import type { MetadataRoute } from "next";
import { articles } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/practice-areas", priority: 0.8 },
    { path: "/practice-areas/ip-technology", priority: 0.8 },
    { path: "/practice-areas/regulatory-healthcare", priority: 0.8 },
    { path: "/practice-areas/construction-commercial", priority: 0.8 },
    { path: "/practice-areas/nonprofit-ministry", priority: 0.8 },
    { path: "/practice-areas/hoa-community", priority: 0.8 },
    { path: "/practice-areas/data-privacy", priority: 0.8 },
    { path: "/legal-team", priority: 0.8 },
    { path: "/legal-team/anthony-biller", priority: 0.7 },
    { path: "/legal-team/james-lawrence", priority: 0.7 },
    { path: "/insights", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/insights/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...articleEntries,
  ];
}
