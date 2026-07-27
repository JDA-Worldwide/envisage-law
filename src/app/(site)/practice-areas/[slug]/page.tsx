import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import SanityImage from "@/components/ui/SanityImage";
import PortableText from "@/components/ui/PortableText";
import { CheckIcon } from "@/components/envisage/Icons";
import { stegaClean } from "@sanity/client/stega";
import { getSiteImages } from "@/lib/siteImages";
import { sanityFetch } from "@/sanity/lib/live";
import {
  practiceAreaBySlugQuery,
  allPracticeAreasQuery,
  settingsQuery,
} from "@/sanity/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allPracticeAreasQuery,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: practiceAreaBySlugQuery,
    params: { slug },
    stega: false,
  });
  if (!data) return { title: "Practice Area" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.standfirst,
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: pa }, { data: settings }] = await Promise.all([
    sanityFetch({ query: practiceAreaBySlugQuery, params: { slug } }),
    sanityFetch({ query: settingsQuery }),
  ]);
  const images = await getSiteImages();

  if (!pa) notFound();

  const phone = stegaClean(settings?.phone) ?? "919.268.8998";
  const phoneTel = phone.replace(/[^\d]/g, "");

  return (
    <>
      <Hero
        backgroundImage={images.heroParticles}
        title={pa.title}
        subtitle={pa.heroSubtitle || pa.standfirst}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: pa.title },
        ]}
      />

      {/* Positioning */}
      {pa.body?.length > 0 && (
        <section className="py-16 lg:py-20">
          <Container className="max-w-[880px]">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Positioning</p>
            <div className="text-[clamp(19px,2.2vw,25px)] font-light leading-[1.6] text-brand-primary [&_p:first-child]:text-[clamp(19px,2.2vw,25px)] [&_p:first-child]:font-light [&_p:first-child]:leading-[1.6] [&_p:first-child]:text-brand-primary [&_p:not(:first-child)]:mt-5 [&_p:not(:first-child)]:text-[16px] [&_p:not(:first-child)]:font-normal [&_p:not(:first-child)]:leading-[1.7] [&_p:not(:first-child)]:text-brand-muted">
              <PortableText value={pa.body} />
            </div>
          </Container>
        </section>
      )}

      {/* Capabilities */}
      {pa.capabilities?.length > 0 && (
        <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
          <Container>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Capabilities</p>
            <h2 className="mb-10 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">What we handle</h2>
            <ul className="grid gap-x-12 md:grid-cols-2">
              {pa.capabilities.map((cap: string) => (
                <li key={cap} className="flex items-start gap-4 border-b border-brand-border py-[18px] text-[15.5px] leading-[1.5] text-brand-text">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-secondary" />
                  {cap}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Featured Capability */}
      {pa.featuredCapability?.title && (
        <section className="bg-brand-primary py-16 text-center text-white lg:py-20">
          <Container>
            {pa.featuredCapability.eyebrow && (
              <div className="text-base font-bold uppercase tracking-[0.1em] text-brand-accent">
                {pa.featuredCapability.eyebrow}
              </div>
            )}
            <h3 className="mt-1 mb-4 text-[28px] font-extrabold text-white lg:text-[32px]">
              {pa.featuredCapability.title}
            </h3>
            {pa.featuredCapability.description && (
              <p className="mx-auto max-w-[640px] text-[16px] leading-[1.7] text-white/90">
                {pa.featuredCapability.description}
              </p>
            )}
            {pa.featuredCapability.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {pa.featuredCapability.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full border border-white/25 px-5 py-2.5 text-[15px] font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Anchoring Attorney */}
      {pa.anchoringAttorney && (
        <section className="border-t border-brand-border bg-brand-surface py-16 lg:py-20">
          <Container>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Anchoring Attorney</p>
            <h2 className="mb-8 text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">
              {pa.anchoringHeading || `Led by ${pa.anchoringAttorney.name}`}
            </h2>
            <div className="grid items-center gap-10 rounded-lg border border-brand-border bg-white p-8 md:grid-cols-[180px_1fr]">
              {pa.anchoringAttorney.photo && (
                <Link href={`/legal-team/${pa.anchoringAttorney.slug}`} className="aspect-[530/548] overflow-hidden rounded-md bg-brand-primary">
                  <SanityImage
                    image={pa.anchoringAttorney.photo}
                    width={180}
                    height={186}
                    className="h-full w-full object-cover"
                  />
                </Link>
              )}
              <div>
                <Link href={`/legal-team/${pa.anchoringAttorney.slug}`} className="text-xl font-bold text-brand-primary hover:text-brand-secondary">
                  {pa.anchoringAttorney.name}
                </Link>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-muted">
                  {pa.anchoringRoleLabel || pa.anchoringAttorney.role}
                </p>
                {pa.anchoringDescription && (
                  <p className="mt-4 text-[15px] leading-[1.65] text-brand-muted">{pa.anchoringDescription}</p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Direct Contact CTA */}
      <section className="py-16 lg:py-20">
        <Container className="max-w-[880px] text-center">
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Direct Contact</p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-brand-primary">
            {pa.ctaHeading || `Discuss a ${pa.title.toLowerCase()} matter`}
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-[600px] text-[16px] leading-[1.65] text-brand-muted">
            No intake forms. Reach an attorney directly by phone or email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${phoneTel}`} className="inline-flex items-center rounded-sm bg-brand-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
              Call {phone}
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
