"use client";

import { useState } from "react";
import ArticleCard from "@/components/envisage/ArticleCard";

export interface Insight {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  publishedAt: string;
  featured?: boolean;
  authorName?: string;
  authorSlug?: string;
}

const PER_PAGE = 6;

export default function InsightsIndex({ insights }: { insights: Insight[] }) {
  const tags = ["All", ...Array.from(new Set(insights.map((a) => a.category)))];
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = active === "All" ? insights : insights.filter((a) => a.category === active);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (tag: string) => {
    setActive(tag);
    setPage(1);
  };

  return (
    <>
      <div className="mb-11 flex flex-wrap gap-3" role="group" aria-label="Filter insights by practice area">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleFilter(tag)}
            aria-pressed={tag === active}
            className={`rounded-full border-[1.5px] px-[18px] py-[9px] text-[13px] font-semibold tracking-[0.03em] transition-all focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${
              tag === active
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-brand-border bg-white text-brand-muted hover:border-brand-secondary hover:text-brand-secondary-dark"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {paged.map((a) => (
          <ArticleCard
            key={a._id}
            article={{
              slug: a.slug,
              tag: a.category,
              title: a.title,
              excerpt: a.excerpt ?? "",
              date: new Date(a.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded-sm border border-brand-border px-4 py-2 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-primary"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-10 w-10 rounded-sm text-sm font-semibold transition-all ${
                p === page
                  ? "bg-brand-primary text-white"
                  : "border border-brand-border text-brand-primary hover:bg-brand-primary hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-sm border border-brand-border px-4 py-2 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-primary"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
