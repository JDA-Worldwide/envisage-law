import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { allPracticeAreasQuery } from "@/sanity/lib/queries";
import type { PracticeAreaGridProps } from "./types";

export default async function PracticeAreaGrid({
  heading,
  subheading,
}: PracticeAreaGridProps) {
  const { data: practiceAreas } = await sanityFetch({
    query: allPracticeAreasQuery,
  });

  return (
    <div className="px-6">
      {heading && (
        <div className="mb-10 flex items-center gap-5">
          <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">
            {heading}
          </h2>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
      )}
      {subheading && (
        <p className="mb-10 text-lg text-brand-muted">{subheading}</p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(practiceAreas ?? []).map(
          (p: {
            _id: string;
            title: string;
            slug: string;
            standfirst: string;
          }) => (
            <Link
              key={p._id}
              href={`/practice-areas/${p.slug}`}
              className="flex flex-col rounded-md border border-brand-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-2.5 text-xl font-bold text-brand-primary">
                {p.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-brand-muted">
                {p.standfirst}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
