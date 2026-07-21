import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import { getSiteImages } from "@/lib/siteImages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Envisage Law privacy policy.",
};

export default async function PrivacyPolicyPage() {
  const images = await getSiteImages();

  return (
    <>
      <Hero
        backgroundImage={images.heroParticles}
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px]">
          <p className="text-[16px] leading-[1.7] text-brand-muted">
            This page is reserved for the Envisage Law privacy policy. Content will be published when the policy is finalized.
          </p>
        </Container>
      </section>
    </>
  );
}
