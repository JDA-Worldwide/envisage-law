import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allPracticeAreasQuery,
  allAttorneysQuery,
  allInsightsQuery,
} from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: practiceAreas }, { data: attorneys }, { data: insights }] =
    await Promise.all([
      sanityFetch({ query: allPracticeAreasQuery, perspective: "published", stega: false }),
      sanityFetch({ query: allAttorneysQuery, perspective: "published", stega: false }),
      sanityFetch({ query: allInsightsQuery, perspective: "published", stega: false }),
    ]);

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/practice-areas", priority: 0.8 },
    { path: "/legal-team", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];

  const practiceAreaEntries: MetadataRoute.Sitemap = (practiceAreas ?? []).map(
    (p: { slug: string }) => ({
      url: `${siteUrl}/practice-areas/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const attorneyEntries: MetadataRoute.Sitemap = (attorneys ?? []).map(
    (a: { slug: string }) => ({
      url: `${siteUrl}/legal-team/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const insightEntries: MetadataRoute.Sitemap = (insights ?? []).map(
    (i: { slug: string }) => ({
      url: `${siteUrl}/insights/${i.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [
    ...staticPages.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...practiceAreaEntries,
    ...attorneyEntries,
    ...insightEntries,
  ];
}
