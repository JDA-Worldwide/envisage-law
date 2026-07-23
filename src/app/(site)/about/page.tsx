import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "about" },
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle || "About",
    description:
      data?.seo?.metaDescription ||
      "Envisage Law: Relentless. Fierce. Undaunted. A litigation-first boutique of board-certified specialists and nationally recognized litigators who take on cases that define legal precedent.",
  };
}

export default async function AboutPage() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "about" },
  });

  return <PageBuilder modules={data?.modules} />;
}
