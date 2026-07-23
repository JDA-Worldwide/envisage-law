import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "legal-team" },
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle || "Legal Team",
    description:
      data?.seo?.metaDescription ||
      "Meet the attorneys of Envisage Law: board-certified specialists, former judicial clerks, and nationally recognized litigators.",
  };
}

export default async function LegalTeamPage() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "legal-team" },
  });

  return <PageBuilder modules={data?.modules} />;
}
