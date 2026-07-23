import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: homepageQuery,
    stega: false,
  });
  return {
    title:
      data?.seo?.metaTitle ||
      "Envisage Law \u00B7 Complex Litigation \u00B7 Strategic Counsel \u00B7 TechLaw",
    description:
      data?.seo?.metaDescription ||
      "Envisage Law is a litigation-first boutique firm in Raleigh, NC, representing clients in high-stakes business and intellectual property litigation nationwide.",
  };
}

export default async function HomePage() {
  const { data } = await sanityFetch({ query: homepageQuery });

  return <PageBuilder modules={data?.modules} />;
}
