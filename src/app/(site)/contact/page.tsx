import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "contact" },
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle || "Contact",
    description:
      data?.seo?.metaDescription ||
      "Contact Envisage Law directly by phone. PO Box 30099, Raleigh, North Carolina 27622.",
  };
}

export default async function ContactPage() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "contact" },
  });

  return <PageBuilder modules={data?.modules} />;
}
