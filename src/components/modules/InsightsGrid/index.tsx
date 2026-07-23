import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { allInsightsQuery } from "@/sanity/lib/queries";
import ArticleCard from "@/components/envisage/ArticleCard";
import { ArrowIcon } from "@/components/envisage/Icons";
import type { InsightsGridProps } from "./types";

export default async function InsightsGrid({
  heading,
  eyebrow,
  linkLabel,
  linkUrl,
  count = 3,
}: InsightsGridProps) {
  const { data: insights } = await sanityFetch({ query: allInsightsQuery });

  const mapped = (insights ?? [])
    .slice(0, count)
    .map(
      (a: {
        _id: string;
        slug: string;
        category: string;
        title: string;
        excerpt?: string;
        publishedAt: string;
      }) => ({
        slug: a.slug,
        tag: a.category,
        title: a.title,
        excerpt: a.excerpt ?? "",
        date: new Date(a.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })
    );

  return (
    <div className="px-6">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          {eyebrow && (
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
              {heading}
            </h2>
          )}
        </div>
        {linkLabel && linkUrl && (
          <Link
            href={linkUrl}
            className="inline-flex items-center gap-2.5 rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
          >
            {linkLabel} <ArrowIcon />
          </Link>
        )}
      </div>
      <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
        {mapped.map(
          (a: {
            slug: string;
            tag: string;
            title: string;
            excerpt: string;
            date: string;
          }) => (
            <ArticleCard key={a.slug} article={a} />
          )
        )}
      </div>
    </div>
  );
}
