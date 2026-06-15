import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import { STOCK_IMAGES } from "@/lib/data";
import InsightsIndex from "./InsightsIndex";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Commentary and analysis from Envisage Law attorneys across IP, regulatory, healthcare, construction, nonprofit, HOA, and data privacy matters.",
};

export default function InsightsPage() {
  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        title="Insights"
        subtitle="Commentary and analysis from our attorneys across the firm's six niches."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="py-section">
        <Container>
          <InsightsIndex />
        </Container>
      </section>

      <section className="bg-brand-surface py-section">
        <Container className="max-w-[880px] text-center">
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Have a Question About a Matter?</p>
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Talk to an attorney directly.</h2>
          <div className="mt-6 flex justify-center">
            <a href="/contact" className="inline-flex items-center rounded-sm bg-brand-primary px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
              Contact Us
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
