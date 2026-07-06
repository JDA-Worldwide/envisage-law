import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import RecognitionCard from "@/components/envisage/RecognitionCard";
import AnchorAttorneyCard from "@/components/envisage/AnchorAttorneyCard";
import { CheckIcon } from "@/components/envisage/Icons";
import { attorneys, STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "IP & Technology",
  description:
    "We help clients identify, clear, protect, manage and exploit their most important intellectual property assets, including trademarks, patents, copyright and trade secrets, managed worldwide.",
};

const capabilities = [
  "Trademark research, clearance, registration and maintenance",
  "Patent, trademark, copyright and trade secret infringement, defense and invalidity studies",
  "Copyright registrations and agreements",
  "Trade secret protection and policies",
  "Licensing",
  "Nationwide IP litigation experience",
];

export default function IpTechnologyPage() {
  const biller = attorneys.find((a) => a.slug === "anthony-biller")!;

  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        title="Intellectual Property & Technology"
        subtitle="Protecting the identities, content, ideas and secrets that give your business its competitive advantage."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: "IP & Technology" },
        ]}
      />

      {/* Positioning */}
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
          <p className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary">
            We help clients protect their identities, content, ideas and secrets. Intellectual property may be what gives
            your business a competitive advantage, recognition, or even an existence in the marketplace.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-brand-muted">
            We work with businesses, inventors, startups, and marketing teams alike to identify, clear, protect, manage
            and exploit these most important assets, helping clients extract maximum value. We manage portfolios worldwide
            and combine technical legal advice with practical, business-oriented solutions.
          </p>
        </Container>
      </section>

      {/* What We Handle */}
      <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Capabilities</p>
          <h2 className="mb-10 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">What we handle</h2>
          <ul className="grid gap-x-12 md:grid-cols-2">
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-4 border-b border-brand-border py-[18px] text-[15.5px] leading-[1.5] text-brand-text">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-secondary" />
                {cap}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Trademark Portfolio Highlight */}
      <section className="bg-brand-primary py-16 text-center text-white lg:py-20">
        <Container>
          <div className="text-base font-bold uppercase tracking-[0.1em] text-brand-accent">
            Featured Capability · Ongoing Relationship
          </div>
          <h3 className="mt-1 mb-4 text-[28px] font-extrabold text-white lg:text-[32px]">Trademark Portfolio Management</h3>
          <p className="mx-auto max-w-[640px] text-[16px] leading-[1.7] text-white/90">
            Portfolio selection, clearance, registration, policing, and enforcement, managed worldwide as an ongoing
            relationship rather than a single filing. We treat your marks as a living asset, watching for conflicts and
            acting before they become disputes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Selection", "Clearance", "Registration", "Policing", "Enforcement"].map((step) => (
              <span key={step} className="rounded-full border border-white/25 px-5 py-2.5 text-[15px] font-semibold">{step}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Anchor Attorney */}
      <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
          <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Led by a Board-Certified Trademark Specialist</h2>
          <AnchorAttorneyCard
            attorney={biller}
            roleLabel="Partner · NC Board Certified Specialist, Trademark Law"
            description="Tony has litigated hundreds of commercial disputes in federal and state trial courts and appellate courts nationwide, and helps clients select, screen, register and manage trademarks and portfolios worldwide. The North Carolina State Bar recognizes him as a certified trademark specialist."
          />
        </Container>
      </section>

      {/* Recognition */}
      <RecognitionCard />

      {/* Direct Contact */}
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px] text-center">
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Discuss an IP or technology matter</h2>
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
