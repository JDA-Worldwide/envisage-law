import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery, allPagesQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pages that have dedicated route files — skip so Next.js doesn't conflict.
const reservedSlugs = new Set([
  "home",
  "insights",
  "privacy-policy",
  "terms-of-use",
]);

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allPagesQuery,
    perspective: "published",
    stega: false,
  });
  return (data ?? [])
    .filter((p: { slug: string }) => !reservedSlugs.has(p.slug))
    .map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) return {};
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
    stega: false,
  });
  if (!data) return { title: "Page" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) notFound();

  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug },
  });

  if (!data) notFound();

  return <PageBuilder modules={data.modules} />;
}
