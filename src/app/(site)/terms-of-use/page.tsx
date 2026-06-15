import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import { STOCK_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Envisage Law terms of use.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        title="Terms of Use"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="text-[16px] leading-[1.7] text-brand-muted">
            This page is reserved for the Envisage Law terms of use. Content will be published when the terms are finalized.
          </p>
        </Container>
      </section>
    </>
  );
}
