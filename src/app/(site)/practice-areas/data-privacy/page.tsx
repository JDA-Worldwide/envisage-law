import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AnchorAttorneyCard from "@/components/envisage/AnchorAttorneyCard";
import { attorneys, STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Data Privacy & Security",
  description:
    "Guiding companies that handle regulated data through cross-border and multi-party matters: incident response, regulatory exposure, and the litigation that can follow a security event.",
};

export default function DataPrivacyPage() {
  const joelle = attorneys.find((a) => a.slug === "joelle-harvill")!;

  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        title="Data Privacy & Security"
        subtitle="Guiding companies that handle regulated data through cross-border and multi-party matters."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: "Data Privacy & Security" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
          <p className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary">
            We guide companies that handle regulated data through cross-border and multi-party matters: incident response,
            regulatory exposure, and the litigation that can follow a security event.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-brand-muted">
            When a breach occurs, the first 72 hours define the trajectory. We help organizations respond to security
            incidents, manage regulatory obligations, and defend against the claims that follow, drawing on the firm&apos;s
            broader litigation and regulatory experience.
          </p>
        </Container>
      </section>

      <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
          <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Led by Joelle Harvill</h2>
          <AnchorAttorneyCard
            attorney={joelle}
            description="Joelle guides companies handling regulated data through cross-border and multi-party matters, from incident response and regulatory exposure to the litigation that can follow a security event."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px] text-center">
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Discuss a data privacy matter</h2>
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
