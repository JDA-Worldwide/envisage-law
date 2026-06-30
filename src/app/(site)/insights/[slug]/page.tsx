import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ArticleCard from "@/components/envisage/ArticleCard";
import { PracticeIcon } from "@/components/envisage/Icons";
import { articles, attorneys, practices } from "@/lib/data";
import articleContent from "@/lib/articleContent";

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
  const author = article?.authorSlug
    ? attorneys.find((a) => a.slug === article.authorSlug)
    : null;
  const authorName = author?.name ?? article?.authorName ?? "Envisage Law";
  const authorRole = author?.role ?? "";
  const authorPhoto = author?.photo ?? null;
  const authorHref = author?.href ?? "/attorneys";
  const body = article ? articleContent[article.slug] : null;

  if (!article) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-brand-muted">Article not found.</p>
      </section>
    );
  }

  const relatedPractice = practices.find((p) => p.title === article.tag);
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
          <h1 className="text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12] text-white">
            {article.title}
          </h1>
          <div className="mt-7 flex items-center gap-3.5">
            {authorPhoto ? (
              <Image
                src={authorPhoto}
                alt={authorName}
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
          {body ? (
            <article
              className="article-body text-lg leading-[1.8] text-[#2a3346]"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            <article className="text-lg leading-[1.8] text-[#2a3346]">
              <p>{article.excerpt}</p>
            </article>
          )}
        </Container>
      </section>

      {/* Related */}
      {(relatedPractice || authorPhoto) && (
      <section className="bg-brand-surface py-section">
        <Container className="max-w-[880px]">
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Related</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className={`grid gap-6 ${relatedPractice && authorPhoto ? "sm:grid-cols-2" : ""}`}>
            {relatedPractice && (
              <Link href={relatedPractice.href} className="flex min-h-0 flex-col rounded-md border border-brand-border bg-white px-[30px] py-9 pb-8 transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-md">
                <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-md bg-brand-surface text-brand-secondary">
                  <PracticeIcon icon={relatedPractice.icon} className="h-[26px] w-[26px]" />
                </div>
                <h3 className="mb-2.5 text-xl font-bold text-brand-primary">{relatedPractice.title}</h3>
                <p className="flex-1 text-[14.5px] leading-[1.55] text-brand-muted">
                  {relatedPractice.standfirst}
                </p>
                <span className="mt-[18px] inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
                  View practice
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            )}
            {authorPhoto && (
              <Link href={authorHref} className="grid items-center gap-8 rounded-lg border border-brand-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md sm:grid-cols-[120px_1fr]">
                <div className="aspect-[530/548] overflow-hidden rounded-md bg-brand-primary">
                  <Image src={authorPhoto} alt={authorName} width={120} height={124} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-secondary-dark">About the Author</div>
                  <div className="text-[19px] font-bold text-brand-primary">{authorName}</div>
                  {authorRole && <div className="mt-1 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">{authorRole}</div>}
                </div>
              </Link>
            )}
          </div>
        </Container>
      </section>
      )}

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
