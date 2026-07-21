import Link from "next/link";
import type { CtaBandProps } from "./types";

function BandButton({
  btn,
  variant,
}: {
  btn: { label: string; url: string; isExternal?: boolean };
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center rounded-sm bg-brand-primary px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]"
      : "inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white";

  if (btn.isExternal) {
    return (
      <a href={btn.url} className={className} target="_blank" rel="noopener noreferrer">
        {btn.label}
      </a>
    );
  }

  return (
    <Link href={btn.url} className={className}>
      {btn.label}
    </Link>
  );
}

export default function CtaBand({
  eyebrow,
  heading,
  body,
  primaryButton,
  secondaryButton,
}: CtaBandProps) {
  return (
    <div className="px-6 text-center">
      {eyebrow && (
        <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
        {heading}
      </h2>
      {body && (
        <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-brand-muted">
          {body}
        </p>
      )}
      {(primaryButton || secondaryButton) && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {primaryButton?.label && primaryButton?.url && (
            <BandButton btn={primaryButton} variant="primary" />
          )}
          {secondaryButton?.label && secondaryButton?.url && (
            <BandButton btn={secondaryButton} variant="secondary" />
          )}
        </div>
      )}
    </div>
  );
}
