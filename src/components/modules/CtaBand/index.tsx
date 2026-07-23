import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { CtaBandProps } from "./types";

export default function CtaBand({
  eyebrow,
  heading,
  body,
  backgroundImage,
  actions,
}: CtaBandProps) {
  const bgUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).width(2400).quality(80).auto("format").url()
    : "";

  return (
    <section className="relative overflow-hidden bg-brand-primary py-section">
      {bgUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      )}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,31,70,0.95)] via-[rgba(0,31,70,0.85)] to-[rgba(0,31,70,0.7)]" />
      <Container className="relative z-[2] text-center">
        <div className="mx-auto max-w-[850px]">
          {eyebrow && (
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.12] text-white">
            {heading}
          </h2>
          {body && (
            <p className="mt-5 text-[19px] font-light leading-[1.65] text-white/90">
              {body}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {actions.map((action) => (
                <Link
                  key={action._key}
                  href={action.href}
                  className={
                    stegaClean(action.variant) === "ghost"
                      ? "inline-flex items-center rounded-sm border-2 border-white/[0.55] bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:border-white hover:bg-white/[0.12]"
                      : "inline-flex items-center rounded-sm border-2 border-transparent bg-brand-secondary-dark px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-secondary-darker"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
