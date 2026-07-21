import Link from "next/link";
import { PracticeIcon } from "./Icons";

interface PracticeCardData {
  slug: string;
  title: string;
  icon?: string;
  standfirst: string;
}

export default function PracticeCard({ practice }: { practice: PracticeCardData }) {
  return (
    <Link
      href={`/practice-areas/${practice.slug}`}
      className="group relative flex min-h-[230px] flex-col rounded-md border border-brand-border bg-white px-[30px] py-9 pb-8 transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-md"
    >
      <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-md bg-brand-surface text-brand-secondary transition-all duration-200 group-hover:bg-brand-primary group-hover:text-white">
        <PracticeIcon icon={practice.icon ?? ""} className="h-[26px] w-[26px]" />
      </div>
      <h3 className="mb-2.5 text-xl font-bold text-brand-primary">{practice.title}</h3>
      <p className="flex-1 text-[14.5px] leading-[1.55] text-brand-muted">{practice.standfirst}</p>
      <span className="mt-[18px] inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-secondary-dark">
        Explore
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
