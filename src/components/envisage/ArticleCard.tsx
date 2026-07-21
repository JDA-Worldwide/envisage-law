import Link from "next/link";

interface ArticleCardData {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-brand-border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="h-1.5 bg-brand-primary" />
      <div className="flex flex-1 flex-col px-[26px] py-[26px] pb-7">
        <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-secondary-dark">{article.tag}</div>
        <h3 className="mb-3 text-[19px] font-bold leading-[1.3] text-brand-primary">{article.title}</h3>
        <p className="flex-1 text-[14.5px] leading-[1.6] text-brand-muted">{article.excerpt}</p>
        <div className="mt-5 text-[13px] font-semibold text-brand-muted">{article.date}</div>
      </div>
    </Link>
  );
}
