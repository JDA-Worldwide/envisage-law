import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AnchorAttorneyCard from "@/components/envisage/AnchorAttorneyCard";
import { attorneys, STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "HOA & Community Association",
  description:
    "Representing HOA boards, homeowners, and community associations across North Carolina on covenant enforcement, board authority, and related disputes.",
};

export default function HoaPage() {
  const banks = attorneys.find((a) => a.slug === "adam-banks")!;

  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.courthouse}
        title="HOA & Community Association"
        subtitle="Representing HOA boards, homeowners, and community associations across North Carolina."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: "HOA & Community Association" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
          <p className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary">
            We represent HOA boards, homeowners, and community associations, mostly across North Carolina, on covenant
            enforcement, board authority, and the disputes that arise within community associations.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-brand-muted">
            Our work covers the full range of community association disputes, from covenant enforcement and assessment
            collection to board governance challenges and construction defect claims affecting common areas.
          </p>
        </Container>
      </section>

      <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
          <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Led by Adam P. Banks</h2>
          <AnchorAttorneyCard
            attorney={banks}
            description="Adam represents HOA boards, homeowners, and community associations across North Carolina, handling covenant enforcement, board authority disputes, and the litigation that follows."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px] text-center">
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Discuss an HOA matter</h2>
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
