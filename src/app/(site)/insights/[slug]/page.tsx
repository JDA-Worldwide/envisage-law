import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import SanityImage from "@/components/ui/SanityImage";
import ArticleCard from "@/components/envisage/ArticleCard";
import { PracticeIcon } from "@/components/envisage/Icons";
import { sanityFetch } from "@/sanity/lib/live";
import {
  insightBySlugQuery,
  allInsightsQuery,
  allPracticeAreasQuery,
} from "@/sanity/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: allInsightsQuery,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: insightBySlugQuery,
    params: { slug },
    stega: false,
  });
  if (!data) return { title: "Insight" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const { data: insight } = await sanityFetch({
    query: insightBySlugQuery,
    params: { slug },
  });

  if (!insight) notFound();

  const authorName = insight.authorName ?? "Envisage Law";
  const authorSlug = insight.authorSlug;
  const authorRole = insight.authorRole ?? "";
  const authorPhoto = insight.authorPhoto;
  const authorHref = authorSlug ? `/legal-team/${authorSlug}` : "/legal-team";

  // Fetch related data
  const [{ data: allInsights }, { data: practiceAreas }] = await Promise.all([
    sanityFetch({ query: allInsightsQuery }),
    sanityFetch({ query: allPracticeAreasQuery }),
  ]);

  const relatedPractice = (practiceAreas ?? []).find(
    (p: { title: string }) => p.title === insight.category
  );
  const relatedInsights = (allInsights ?? [])
    .filter((a: { slug: string }) => a.slug !== slug)
    .slice(0, 3);

  const hasPortableText = insight.body && insight.body.length > 0;

  return (
    <>
      {/* Article Hero */}
      <section className="bg-brand-primary py-16 pb-14 text-white">
        <Container className="max-w-[880px]">
          <nav
            className="mb-5 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-[#6fb0c2] hover:text-white">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link href="/insights" className="text-[#6fb0c2] hover:text-white">
              Insights
            </Link>
            <span className="opacity-50">/</span>
            <span>Article</span>
          </nav>
          <div className="mb-5 flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/65">
            <span className="text-brand-accent">{insight.category}</span>
            <span>·</span>
            <span>{formatDate(insight.publishedAt)}</span>
          </div>
          <h1 className="text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12] text-white">
            {insight.title}
          </h1>
          <div className="mt-7 flex items-center gap-3.5">
            {authorPhoto ? (
              <SanityImage
                image={authorPhoto}
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-full object-cover"
              />
            ) : (
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                {authorName.charAt(0)}
              </div>
            )}
            <div>
              <strong className="block text-[15px]">{authorName}</strong>
              {authorRole && <span className="text-[13px] text-white/65">{authorRole}</span>}
            </div>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="py-16">
        <Container className="max-w-[880px]">
          {hasPortableText ? (
            <article className="text-lg leading-[1.8] text-[#2a3346]">
              <PortableText value={insight.body} />
            </article>
          ) : (
            <article className="text-lg leading-[1.8] text-[#2a3346]">
              <p>{insight.excerpt}</p>
            </article>
          )}
        </Container>
      </section>

      {/* Related */}
      {relatedPractice && (
        <section className="bg-brand-surface py-section">
          <Container className="max-w-[880px]">
            <div className="mb-10 flex items-center gap-5">
              <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">
                Related
              </h2>
              <div className="h-px flex-1 bg-brand-border" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href={`/practice-areas/${relatedPractice.slug}`}
                className="flex min-h-0 flex-col rounded-md border border-brand-border bg-white px-[30px] py-9 pb-8 transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-md"
              >
                <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-md bg-brand-surface text-brand-secondary">
                  <PracticeIcon
                    icon={relatedPractice.icon}
                    className="h-[26px] w-[26px]"
                  />
                </div>
                <h3 className="mb-2.5 text-xl font-bold text-brand-primary">
                  {relatedPractice.title}
                </h3>
                <p className="flex-1 text-[14.5px] leading-[1.55] text-brand-muted">
                  {relatedPractice.standfirst}
                </p>
                <span className="mt-[18px] inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
                  View practice
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              {authorSlug && (
                <Link
                  href={authorHref}
                  className="grid items-center gap-8 rounded-lg border border-brand-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md sm:grid-cols-[120px_1fr]"
                >
                  <div className="aspect-[530/548] overflow-hidden rounded-md bg-brand-primary">
                    {authorPhoto ? (
                      <SanityImage
                        image={authorPhoto}
                        width={120}
                        height={124}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[32px] font-bold text-white">
                        {authorName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-secondary-dark">
                      About the Author
                    </div>
                    <div className="text-[19px] font-bold text-brand-primary">
                      {authorName}
                    </div>
                    {authorRole && <div className="mt-1 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">{authorRole}</div>}
                  </div>
                </Link>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* More Insights */}
      {relatedInsights.length > 0 && (
        <section className="py-section">
          <Container>
            <div className="mb-10 flex items-center gap-5">
              <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">
                More Insights
              </h2>
              <div className="h-px flex-1 bg-brand-border" />
            </div>
            <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
              {relatedInsights.map(
                (a: {
                  _id: string;
                  slug: string;
                  category: string;
                  title: string;
                  excerpt?: string;
                  publishedAt: string;
                }) => (
                  <ArticleCard
                    key={a._id}
                    article={{
                      slug: a.slug,
                      tag: a.category,
                      title: a.title,
                      excerpt: a.excerpt ?? "",
                      date: formatDate(a.publishedAt),
                    }}
                  />
                )
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
