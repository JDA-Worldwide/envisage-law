import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "practice-areas" },
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle || "Practice Areas",
    description:
      data?.seo?.metaDescription ||
      "A civil and commercial litigation firm at its core, with deepest expertise in six niches: IP & Technology, Regulatory & Healthcare, Construction, Nonprofit & Ministry, HOA, and Data Privacy.",
  };
}

export default async function PracticeAreasPage() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "practice-areas" },
  });

  return <PageBuilder modules={data?.modules} />;
}
