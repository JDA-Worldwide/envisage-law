import Image from "next/image";
import Link from "next/link";
import type { Attorney } from "@/lib/data";

interface AnchorAttorneyCardProps {
  attorney: Attorney;
  roleLabel?: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function AnchorAttorneyCard({
  attorney,
  roleLabel,
  description,
  linkHref,
  linkLabel = "View full profile",
}: AnchorAttorneyCardProps) {
  const href = linkHref || (attorney.hasProfile ? attorney.href : "/attorneys");
  const label = linkHref ? linkLabel : attorney.hasProfile ? linkLabel : "View attorneys";

  return (
    <div className="mx-auto max-w-[960px] rounded-lg border border-brand-border bg-white p-7 shadow-sm">
      <div className="flex gap-8">
        <div className="hidden w-[180px] flex-none overflow-hidden rounded-md bg-brand-primary sm:block" style={{ aspectRatio: "530/548" }}>
          <Image
            src={attorney.photo}
            alt={attorney.name}
            width={180}
            height={186}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <div className="text-[21px] font-bold text-brand-primary">{attorney.name}</div>
          <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.05em] text-brand-muted">
            {roleLabel || attorney.role}
          </div>
          {description && (
            <p className="mt-4 line-clamp-3 text-[14.5px] leading-[1.65] text-brand-muted">{description}</p>
          )}
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 rounded-sm border-2 border-brand-primary bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
          >
            {label}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
