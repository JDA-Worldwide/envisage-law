import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ArticleCard from "@/components/envisage/ArticleCard";
import { PracticeIcon, GlobeIcon } from "@/components/envisage/Icons";
import { articles, attorneys } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const biller = attorneys.find((a) => a.slug === "anthony-biller")!;

  if (!article) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-brand-muted">Article not found.</p>
      </section>
    );
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Article Hero */}
      <section className="bg-brand-primary py-16 pb-14 text-white">
        <Container className="max-w-[880px]">
          <nav className="mb-5 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6fb0c2] hover:text-white">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights" className="text-[#6fb0c2] hover:text-white">Insights</Link>
            <span className="opacity-50">/</span>
            <span>Article</span>
          </nav>
          <div className="mb-5 flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/65">
            <span className="text-brand-accent">{article.tag}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
          <h1 className="max-w-[18ch] text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12]">
            {article.title}
          </h1>
          <div className="mt-7 flex items-center gap-3.5">
            <Image
              src={biller.photo}
              alt={biller.name}
              width={52}
              height={52}
              className="h-[52px] w-[52px] rounded-full object-cover"
            />
            <div>
              <strong className="block text-[15px]">{biller.name}</strong>
              <span className="text-[13px] text-white/65">Partner · NC Board Certified Specialist, Trademark Law</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="py-16">
        <Container className="max-w-[880px]">
          <article className="text-lg leading-[1.8] text-[#2a3346]">
            <p className="mb-[22px]">
              For most growing companies, a trademark is filed once and forgotten until a problem appears. By then, the
              problem is usually expensive. A mark that was never properly cleared turns out to conflict with a senior
              user; a registration lapses because a renewal deadline slipped; a competitor adopts a confusingly similar
              name and faces no early objection. Each of these is avoidable when the portfolio is managed as a living
              asset rather than a stack of certificates.
            </p>
            <blockquote className="my-8 border-l-4 border-brand-secondary py-1 pl-7 text-[21px] font-light leading-[1.5] text-brand-primary">
              A trademark portfolio is a living asset. It grows in value when it is tended as an ongoing relationship
              between a business and its marks.
            </blockquote>
            <h2 className="mb-4 mt-10 text-[27px] font-extrabold text-brand-primary">Selection and clearance come first</h2>
            <p className="mb-[22px]">
              The strength of a portfolio is set the moment a mark is chosen. Distinctive, defensible marks are easier
              to register, cheaper to enforce, and more valuable on a balance sheet. Before a name is adopted, a proper
              clearance search identifies senior rights and assesses the real risk of moving forward. That work costs far
              less than rebranding after launch.
            </p>
            <h2 className="mb-4 mt-10 text-[27px] font-extrabold text-brand-primary">Registration follows a plan</h2>
            <p className="mb-[22px]">
              Where and how a mark is registered should track where a business actually operates and intends to grow.
              For companies with national or international ambitions, that means thinking about classes, jurisdictions,
              and timing as a coordinated plan. We manage portfolios worldwide, aligning filings with commercial reality
              so that protection lands where the business needs it.
            </p>
            <h2 className="mb-4 mt-10 text-[27px] font-extrabold text-brand-primary">Policing and enforcement protect the investment</h2>
            <p className="mb-[22px]">
              A registration is only as valuable as the willingness to defend it. Watching for conflicting filings and
              uses, then acting early, proportionately, and consistently, preserves the distinctiveness that makes a mark
              worth owning. Enforcement that begins with a measured letter is almost always less costly than litigation
              that begins after years of unchecked encroachment.
            </p>
            <p className="mb-[22px]">
              Tended this way, a trademark portfolio becomes a compounding asset that grows in value alongside the
              business it protects.
            </p>
          </article>

          {/* Translation Notice */}
          <div className="mt-12 flex gap-4 rounded-md bg-brand-surface p-5 text-[13.5px] leading-[1.6] text-brand-muted">
            <GlobeIcon className="mt-0.5 h-[22px] w-[22px] flex-none text-brand-secondary" />
            <div>
              <strong className="text-brand-primary">Translation notice.</strong> Machine translation of this content
              (Spanish / Mandarin) is provided for first-touch comprehension only and is not certified for legal
              precision. For advice you can rely on, please contact an attorney directly.
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-brand-surface py-section">
        <Container className="max-w-[880px]">
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Related</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/practice-areas/ip-technology" className="flex min-h-0 flex-col rounded-md border border-brand-border bg-white px-[30px] py-9 pb-8 transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-md">
              <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-md bg-brand-surface text-brand-secondary">
                <PracticeIcon icon="ip" className="h-[26px] w-[26px]" />
              </div>
              <h3 className="mb-2.5 text-xl font-bold text-brand-primary">IP &amp; Technology</h3>
              <p className="flex-1 text-[14.5px] leading-[1.55] text-brand-muted">
                Trademarks, patents, copyright and trade secrets, managed worldwide as an ongoing relationship.
              </p>
              <span className="mt-[18px] inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
                View practice
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
            <Link href="/attorneys/anthony-biller" className="grid items-center gap-8 rounded-lg border border-brand-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md sm:grid-cols-[120px_1fr]">
              <div className="aspect-[530/548] overflow-hidden rounded-md bg-brand-primary">
                <Image src={biller.photo} alt={biller.name} width={120} height={124} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-secondary-dark">About the Author</div>
                <div className="text-[19px] font-bold text-brand-primary">{biller.name}</div>
                <div className="mt-1 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">Partner · Trademark Specialist</div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* More Insights */}
      <section className="py-section">
        <Container>
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">More Insights</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
