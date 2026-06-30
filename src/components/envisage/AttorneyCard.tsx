import Link from "next/link";
import Image from "next/image";
import type { Attorney } from "@/lib/data";

interface AttorneyCardProps {
  attorney: Attorney;
  showNiche?: boolean;
}

export default function AttorneyCard({ attorney, showNiche }: AttorneyCardProps) {
  const body = (
    <>
      <div className="aspect-[530/548] overflow-hidden bg-brand-primary">
        <Image
          src={attorney.photo}
          alt={`${attorney.name}, ${attorney.role} at Envisage Law`}
          width={530}
          height={548}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col border-t-[3px] border-t-brand-secondary px-[22px] py-[22px] pb-[26px]">
        <div className="text-[19px] font-bold text-brand-primary">{attorney.name}</div>
        <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-muted">{attorney.role}</div>
        {showNiche && attorney.niche && (
          <div className="mt-2.5 text-[13.5px] font-semibold text-brand-secondary-dark">{attorney.niche}</div>
        )}
        {attorney.hasProfile ? (
          <span className="mt-auto pt-4 inline-flex items-center gap-[7px] text-xs font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
            View profile
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className="mt-auto pt-4 inline-block text-[11.5px] font-semibold italic tracking-[0.04em] text-brand-muted">
            Full profile coming soon
          </span>
        )}
      </div>
    </>
  );

  if (attorney.hasProfile) {
    return (
      <Link href={attorney.href} className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white transition-all duration-200 hover:-translate-y-[5px] hover:shadow-md hover:border-transparent">
        {body}
      </Link>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white">
      {body}
    </div>
  );
}
