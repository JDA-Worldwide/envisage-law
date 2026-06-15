import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AnchorAttorneyCard from "@/components/envisage/AnchorAttorneyCard";
import { attorneys, STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nonprofit & Ministry",
  description:
    "Counsel for nonprofits, religious organizations, and ministry boards on disputes and the governance structures that prevent them.",
};

export default function NonprofitPage() {
  const banks = attorneys.find((a) => a.slug === "adam-banks")!;

  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.courthouse}
        title="Nonprofit & Ministry"
        subtitle="Counsel for nonprofits, religious organizations, and ministry boards on disputes and governance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: "Nonprofit & Ministry" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
          <p className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary">
            We counsel nonprofits, religious organizations, and ministry boards on disputes and the governance structures
            that prevent them.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-brand-muted">
            Fiduciary duties, conflict policies, and the practical questions mission-driven organizations face are at the
            center of our work. We help boards navigate internal disputes, regulatory compliance, and the litigation that
            can follow governance failures.
          </p>
        </Container>
      </section>

      <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
          <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Led by Adam P. Banks</h2>
          <AnchorAttorneyCard
            attorney={banks}
            description="Adam counsels nonprofits, religious organizations, and ministry boards, combining litigation experience with practical governance advice for mission-driven organizations."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px] text-center">
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Discuss a nonprofit matter</h2>
          <p className="mx-auto mb-8 mt-4 max-w-[600px] text-[16px] leading-[1.65] text-brand-muted">
            No intake forms. Reach an attorney directly by phone or email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE.replace(/\./g, "")}`} className="inline-flex items-center rounded-sm bg-brand-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
              Call {PHONE}
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
              Contact Options
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
