import Link from "next/link";
import type { AnchoringAttorneyBandProps } from "./types";

export default function AnchoringAttorneyBand({
  eyebrow,
  heading,
  attorney,
  roleLabel,
  description,
}: AnchoringAttorneyBandProps) {
  if (!attorney) return null;

  return (
    <div className="px-6">
      {eyebrow && (
        <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">
        {heading}
      </h2>
      <div className="rounded-lg border border-brand-border bg-white p-8">
        <Link
          href={`/legal-team/${attorney.slug}`}
          className="text-xl font-bold text-brand-primary hover:text-brand-secondary"
        >
          {attorney.name}
        </Link>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-muted">
          {roleLabel || attorney.role}
        </p>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
