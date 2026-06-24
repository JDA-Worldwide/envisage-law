import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AnchorAttorneyCard from "@/components/envisage/AnchorAttorneyCard";
import { CheckIcon } from "@/components/envisage/Icons";
import { attorneys, STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Regulatory & Healthcare",
  description:
    "We position clients for success under complex federal and state regulatory regimes, including those issued under the Food, Drug, and Cosmetic Act, HIPAA, and FIFRA.",
};

const capabilities = [
  "FDA regulatory strategy and Food, Drug & Cosmetic Act matters",
  "HIPAA compliance, privacy and enforcement",
  "FIFRA and EPA regulatory regimes",
  "Administrative Procedure Act challenges and agency rulemaking",
  "State regulatory navigation and compliance",
  "First Amendment intersections with regulatory action",
];

export default function RegulatoryHealthcarePage() {
  const lawrence = attorneys.find((a) => a.slug === "james-lawrence")!;

  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.courthouse}
        title="Regulatory & Healthcare"
        subtitle="Positioning clients for success under the regulatory regimes that govern modern commercial activity."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: "Regulatory & Healthcare" },
        ]}
      />

      {/* Positioning */}
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
          <p className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary">
            The past century saw an increasing shift of lawmaking from the legislative to executive branches. What happens
            in administrative agencies matters.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-brand-muted">
            Federal agencies annually publish tens of thousands of pages of orders, notices, and rulemakings; the Code of
            Federal Regulations spans 50 titles governing commercial activity. We position our clients for success under a
            variety of regulatory regimes, including those issued under the Food, Drug, and Cosmetic Act, HIPAA, and FIFRA.
            In addition to federal agencies such as the FDA and EPA, we help clients navigate complex state regulatory
            regimes.
          </p>
        </Container>
      </section>

      {/* What We Handle */}
      <section className="bg-brand-surface py-section">
        <Container>
          <div className="mb-11">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Capabilities</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">What we handle</h2>
            <p className="mt-5 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
              Content for this niche is expanding. Below is a representative view of our regulatory and healthcare work.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-0.5 md:grid-cols-2">
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3.5 border-b border-brand-border py-4 text-base text-brand-text">
                <CheckIcon className="mt-[3px] h-5 w-5 flex-none text-brand-secondary" />
                {cap}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Anchor Attorney */}
      <section className="py-section">
        <Container>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
          <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">Led by a Former FDA Chief Counsel</h2>
          <AnchorAttorneyCard
            attorney={lawrence}
            roleLabel="Partner · Health Care & Life Sciences"
            description="A biomedical engineer and former Deputy General Counsel at HHS and Chief Counsel of the FDA, James leads Envisage's Health Care and Life Sciences practice, bringing a rare perspective on the Administrative Procedure Act, the Food, Drug, and Cosmetic Act, and HIPAA."
          />
        </Container>
      </section>

      {/* Direct Contact */}
      <section className="bg-brand-surface py-section">
        <Container className="max-w-[880px] text-center">
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Discuss a regulatory matter</h2>
          <p className="mx-auto mb-8 mt-5 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
            No intake forms. Reach an attorney directly by phone or email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE.replace(/\./g, "")}`} className="inline-flex items-center rounded-sm bg-brand-primary px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
              Call {PHONE}
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
              Contact Options
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
