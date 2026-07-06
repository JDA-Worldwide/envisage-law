import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import PracticeCard from "@/components/envisage/PracticeCard";
import CtaBand from "@/components/envisage/CtaBand";
import { ShieldCheckIcon } from "@/components/envisage/Icons";
import { practices, STOCK_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "A civil and commercial litigation firm at its core, with deepest expertise in six niches: IP & Technology, Regulatory & Healthcare, Construction, Nonprofit & Ministry, HOA, and Data Privacy.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        title="Practice Areas"
        subtitle="Six clearly delineated niches, the sweet spots where a litigation-first boutique goes deep."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
      />

      {/* Hub Positioning */}
      <section className="py-24">
        <Container className="max-w-[880px]">
          <p className="mb-[18px] inline-block text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
            Litigation-First by Design
          </p>
          <p className="text-[clamp(20px,2.4vw,27px)] font-light leading-[1.55] text-brand-primary">
            Envisage handles civil disputes and complex matters. From complex patent infringement to routine breach of contract, we are comfortable helping our clients solve problems. We have six niches in which we particularly enjoy serving our clients.
          </p>
        </Container>
      </section>

      {/* Six Niche Cards */}
      <section style={{ paddingTop: 0, paddingBottom: "96px", background: "linear-gradient(#fff 80px, #F5F7FA 80px)" }}>
        <Container>
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">The Six Niches</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <PracticeCard key={p.slug} practice={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-Niche Referral Note */}
      <section className="bg-brand-surface py-24">
        <Container className="max-w-[880px]">
          <div className="flex gap-6 rounded-r-md border-l-4 border-brand-secondary bg-white p-8 pl-9">
            <ShieldCheckIcon className="mt-0.5 h-9 w-9 flex-none text-brand-secondary" />
            <div>
              <h4 className="mb-2 text-lg font-bold text-brand-primary">We&apos;re on your side</h4>
              <p className="text-[15px] leading-[1.65] text-brand-muted">
                We strive to help clients avoid disputes; when they arise, we work to resolve them and keep clients out
                of court. When clients must litigate, we know how to fight and win across state, federal trial, administrative,
                appellate and arbitral proceedings throughout North Carolina and the United States. Envisage
                litigators are admitted across federal and state courts in NC and federal jurisdictions nationwide,
                including the Trademark Trial and Appeal Board, federal Courts of Appeal, and the U.S. Supreme Court.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <CtaBand
        backgroundImage={STOCK_IMAGES.consultation}
        eyebrow="Have a Matter in One of These Niches?"
        title="Let's talk about your case."
        subtitle="Direct pathways only. Reach an attorney by phone or email."
        actions={[
          { label: "Contact Us", href: "/contact", variant: "teal" },
          { label: "Meet the Legal Team", href: "/legal-team", variant: "ghost" },
        ]}
      />
    </>
  );
}
