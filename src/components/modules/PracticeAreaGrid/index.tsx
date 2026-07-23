import { sanityFetch } from "@/sanity/lib/live";
import { allPracticeAreasQuery } from "@/sanity/lib/queries";
import PracticeCard from "@/components/envisage/PracticeCard";
import type { PracticeAreaGridProps } from "./types";

export default async function PracticeAreaGrid({
  heading,
  subheading,
  eyebrow,
}: PracticeAreaGridProps) {
  const { data: practiceAreas } = await sanityFetch({
    query: allPracticeAreasQuery,
  });

  return (
    <div className="px-6">
      {(eyebrow || heading || subheading) && (
        <div className="mb-14 text-center">
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
          {subheading && (
            <p className="mx-auto mt-5 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
              {subheading}
            </p>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(practiceAreas ?? []).map(
          (p: { _id: string; slug: string; title: string; icon?: string; standfirst: string }) => (
            <PracticeCard key={p._id} practice={p} />
          )
        )}
      </div>
    </div>
  );
}
