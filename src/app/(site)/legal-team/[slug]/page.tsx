import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SanityImage from "@/components/ui/SanityImage";
import PortableText from "@/components/ui/PortableText";
import { EmailIcon, PhoneIcon } from "@/components/envisage/Icons";
import { stegaClean } from "@sanity/client/stega";
import { getSiteImages } from "@/lib/siteImages";
import { sanityFetch } from "@/sanity/lib/live";
import {
  attorneyBySlugQuery,
  allAttorneysQuery,
} from "@/sanity/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allAttorneysQuery,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: attorneyBySlugQuery,
    params: { slug },
    stega: false,
  });
  if (!data) return { title: "Attorney" };
  return {
    title: data.seo?.metaTitle || `${data.name} · ${data.role}`,
    description:
      data.seo?.metaDescription ||
      `${data.name} is a ${data.role} at Envisage Law.`,
  };
}

export default async function AttorneyPage({ params }: Props) {
  const { slug } = await params;
  const { data: attorney } = await sanityFetch({
    query: attorneyBySlugQuery,
    params: { slug },
  });
  const images = await getSiteImages();

  if (!attorney) notFound();

  return (
    <>
      {/* Mini Hero */}
      <section className="relative overflow-hidden bg-brand-primary py-14 pb-10 text-white">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${images.heroParticles}')` }} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,18,42,0.94)] via-[rgba(0,31,70,0.86)] to-[rgba(3,42,92,0.72)]" />
        <Container className="relative z-[2]">
          <nav className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6fb0c2] hover:text-white">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/legal-team" className="text-[#6fb0c2] hover:text-white">Legal Team</Link>
            <span className="opacity-50">/</span>
            <span>{attorney.name}</span>
          </nav>
        </Container>
      </section>

      {/* Profile */}
      <section className="py-14">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-[340px_1fr]">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-[calc(var(--header-height)+32px)]">
              {attorney.photo && (
                <div className="aspect-[530/548] overflow-hidden rounded-lg bg-brand-primary shadow-md">
                  <SanityImage
                    image={attorney.photo}
                    width={530}
                    height={548}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              )}

              {attorney.credentialTitle && (
                <div className="mt-[22px] flex items-center gap-3 rounded-md bg-brand-primary p-4 text-white">
                  <div>
                    <strong className="block text-sm font-bold">{attorney.credentialTitle}</strong>
                    {attorney.credentialSubtitle && (
                      <span className="text-[12.5px] text-white/70">{attorney.credentialSubtitle}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-[22px] flex flex-col gap-3">
                {attorney.email && (
                  <a href={`mailto:${stegaClean(attorney.email)}`} className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                    <EmailIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                    {attorney.email}
                  </a>
                )}
                {attorney.phone && (
                  <a href={`tel:${stegaClean(attorney.phone).replace(/[^\d]/g, "")}`} className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                    <PhoneIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                    {attorney.phone}
                  </a>
                )}
              </div>

              {attorney.practiceAreaTags?.length > 0 && (
                <>
                  <div className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">Practice Areas</div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {attorney.practiceAreaTags.map((tag: { _key: string; label: string; practiceAreaSlug?: string }) =>
                      tag.practiceAreaSlug ? (
                        <Link
                          key={tag._key}
                          href={`/practice-areas/${tag.practiceAreaSlug}`}
                          className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"
                        >
                          {tag.label}
                        </Link>
                      ) : (
                        <span
                          key={tag._key}
                          className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary"
                        >
                          {tag.label}
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            </aside>

            {/* Main Content */}
            <div>
              <h1 className="text-[clamp(32px,4vw,44px)] font-bold text-brand-primary">{attorney.name}</h1>
              <div className="mb-6 mt-2 text-base font-semibold uppercase tracking-[0.06em] text-brand-secondary-dark">{attorney.role}</div>

              {attorney.bio?.length > 0 && (
                <div className="text-[17px] leading-[1.75] text-[#2a3346]">
                  <PortableText value={attorney.bio} />
                </div>
              )}

              {attorney.profileSections?.map((section: { _key: string; _type: string; title: string; items?: string[]; entries?: { _key: string; label: string; value: string }[] }) => (
                <div key={section._key} className="border-t border-brand-border py-8">
                  <h2 className="mb-[18px] text-[22px] font-extrabold text-brand-primary">{section.title}</h2>
                  {section._type === "keyValueList" && section.entries && (
                    <dl>
                      {section.entries.map((entry) => (
                        <div key={entry._key} className="flex flex-col gap-1.5 border-b border-brand-border py-3.5 last:border-b-0">
                          <dt className="text-[13px] font-bold tracking-[0.02em] text-brand-primary">{entry.label}</dt>
                          <dd className="text-[15px] leading-[1.55] text-brand-muted">{entry.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {section._type === "bulletList" && section.items && (
                    <ul className="flex flex-col gap-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-[15.5px] leading-[1.55] text-[#2a3346]">
                          <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-brand-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="mt-10">
                <Link href="/legal-team" className="inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
                  Legal Team
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
