import type { NextConfig } from "next";
import { createClient } from "next-sanity";

const nextConfig: NextConfig = {
  async redirects() {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      useCdn: true,
    });

    const slugs: string[] = await client.fetch(
      '*[_type == "insight" && defined(slug.current)].slug.current'
    );

    const insightRedirects = slugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/insights/${slug}`,
      permanent: true,
    }));

    return [
      { source: "/attorneys", destination: "/legal-team", permanent: true },
      { source: "/attorneys/:slug", destination: "/legal-team/:slug", permanent: true },
      ...insightRedirects,
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "envisage.law",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
