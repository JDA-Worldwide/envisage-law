"use client";

import { useState } from "react";
import ArticleCard from "@/components/envisage/ArticleCard";
import { articles } from "@/lib/data";

export default function InsightsIndex() {
  const tags = ["All", ...Array.from(new Set(articles.map((a) => a.tag)))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? articles : articles.filter((a) => a.tag === active);

  return (
    <>
      <div className="mb-11 flex flex-wrap gap-3" role="group" aria-label="Filter insights by practice area">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
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
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </>
  );
}
