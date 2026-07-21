import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { allAttorneysQuery, allStaffQuery } from "@/sanity/lib/queries";
import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";
import type { AttorneyGridProps } from "./types";

interface AttorneyData {
  _id: string;
  name: string;
  slug: string;
  role: string;
  niche?: string;
  photo?: SanityImageSource;
}

interface StaffData {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImageSource;
  initials?: string;
}

export default async function AttorneyGrid({
  heading,
  showStaff = true,
}: AttorneyGridProps) {
  const { data: attorneys } = await sanityFetch({ query: allAttorneysQuery });
  const { data: staff } = showStaff
    ? await sanityFetch({ query: allStaffQuery })
    : { data: [] };

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
      <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-4">
        {(attorneys ?? []).map((a: AttorneyData) => {
          const hasBio = true; // all attorneys get a profile page via [slug]
          const card = (
            <>
              <div className="aspect-[530/548] overflow-hidden bg-brand-primary">
                {a.photo ? (
                  <SanityImage
                    image={a.photo}
                    width={530}
                    height={548}
                    className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[48px] font-bold text-white">
                    {a.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col border-t-[3px] border-t-brand-secondary px-[22px] py-[22px] pb-[26px]">
                <div className="text-[19px] font-bold text-brand-primary">
                  {a.name}
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-muted">
                  {a.role}
                </div>
                {a.niche && (
                  <div className="mt-2.5 text-[13.5px] font-semibold text-brand-secondary-dark">
                    {a.niche}
                  </div>
                )}
                <span className="mt-auto inline-flex items-center gap-[7px] pt-4 text-xs font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
                  View profile
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </>
          );

          if (hasBio) {
            return (
              <Link
                key={a._id}
                href={`/legal-team/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-md"
              >
                {card}
              </Link>
            );
          }

          return (
            <div
              key={a._id}
              className="flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white"
            >
              {card}
            </div>
          );
        })}
        {showStaff &&
          (staff ?? []).map((s: StaffData) => (
            <div
              key={s._id}
              className="flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white"
            >
              <div className="aspect-[530/548] overflow-hidden bg-brand-primary">
                {s.photo ? (
                  <SanityImage
                    image={s.photo}
                    width={530}
                    height={548}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-[48px] font-bold text-white"
                    role="img"
                    aria-label={s.name}
                  >
                    {s.initials || s.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="border-t-[3px] border-t-brand-secondary px-[22px] py-[22px] pb-[26px]">
                <div className="text-[19px] font-bold text-brand-primary">
                  {s.name}
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-muted">
                  {s.role}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
