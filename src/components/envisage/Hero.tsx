import Link from "next/link";
import Container from "@/components/ui/Container";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeroProps {
  backgroundImage: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: { label: string; href: string; variant: "teal" | "ghost" }[];
  isHome?: boolean;
}

export default function Hero({ backgroundImage, eyebrow, title, subtitle, breadcrumbs, actions, isHome }: HeroProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden bg-brand-primary text-white ${isHome ? "min-h-[520px] py-24" : "py-24 pb-20"}`}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,18,42,0.96)] via-[rgba(0,31,70,0.92)] to-[rgba(3,42,92,0.84)]" />
      <Container className="relative z-[2]">
        {breadcrumbs && (
          <nav className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.04em] text-white/75" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2.5">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  {i > 0 && <span className="opacity-50" aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-[#8cc8d8] hover:text-white">{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="mb-[22px] text-[13px] font-bold uppercase tracking-[0.22em] text-[#6fb0c2]">{eyebrow}</p>
        )}
        <h1
          className={`max-w-[17ch] font-extrabold leading-[1.04] text-white ${isHome ? "text-[clamp(38px,6vw,72px)]" : "text-[clamp(36px,5vw,60px)]"}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[26px] max-w-[620px] text-[clamp(17px,1.6vw,21px)] font-light leading-[1.6] text-white/90">
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="mt-[38px] flex flex-wrap gap-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "teal"
                    ? "inline-flex items-center gap-2.5 rounded-sm border-2 border-transparent bg-brand-secondary-dark px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-secondary-darker"
                    : "inline-flex items-center gap-2.5 rounded-sm border-2 border-white/[0.55] bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:border-white hover:bg-white/[0.12]"
                }
              >
                {action.label}
                {action.variant === "teal" && (
                  <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
