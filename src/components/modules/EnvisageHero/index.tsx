import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import Container from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { EnvisageHeroProps } from "./types";

const heroHeadingComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-extrabold text-brand-accent">{children}</strong>
    ),
  },
};

export default function EnvisageHero({
  eyebrow,
  heading,
  subtitle,
  actions,
  breadcrumbs,
  backgroundImage,
  isHome,
}: EnvisageHeroProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden bg-brand-primary text-white ${isHome ? "min-h-[520px] py-24" : "py-24 pb-20"}`}
    >
      {backgroundImage?.asset && (
        <Image
          src={urlFor(backgroundImage).width(2400).quality(80).auto("format").url()}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center"
        />
      )}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,18,42,0.96)] via-[rgba(0,31,70,0.92)] to-[rgba(3,42,92,0.84)]" />
      <Container className="relative z-[2]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="mb-8 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((bc, i) => (
              <span key={bc._key} className="flex items-center gap-2.5">
                {i > 0 && <span className="opacity-50">/</span>}
                {bc.href ? (
                  <Link href={bc.href} className="text-[#6fb0c2] hover:text-white">
                    {bc.label}
                  </Link>
                ) : (
                  <span>{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-[900px] text-[clamp(34px,5vw,62px)] font-extrabold leading-[1.08] text-white">
          {Array.isArray(heading) ? (
            <PortableText value={heading as PortableTextBlock[]} components={heroHeadingComponents} />
          ) : (
            heading
          )}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-[740px] text-[clamp(17px,1.8vw,21px)] font-light leading-[1.55] text-white/90">
            {subtitle}
          </p>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-9 flex flex-wrap gap-4">
            {actions.map((action) => (
              <Link
                key={action._key}
                href={action.href}
                className={
                  stegaClean(action.variant) === "ghost"
                    ? "inline-flex items-center rounded-sm border-2 border-white/[0.55] bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:border-white hover:bg-white/[0.12]"
                    : "inline-flex items-center gap-2.5 rounded-sm border-2 border-transparent bg-brand-secondary-dark px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-secondary-darker"
                }
              >
                {action.label}
                {action.variant !== "ghost" && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
