import Link from "next/link";
import Container from "@/components/ui/Container";

interface CtaBandProps {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions: { label: string; href: string; variant: "teal" | "ghost" }[];
}

export default function CtaBand({ backgroundImage, eyebrow, title, subtitle, actions }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-brand-primary py-section">
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,31,70,0.95)] via-[rgba(0,31,70,0.85)] to-[rgba(0,31,70,0.7)]" />
      <Container className="relative z-[2] text-center">
        <div className="mx-auto max-w-[640px]">
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">{eyebrow}</p>
          <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.12] text-white">{title}</h2>
          {subtitle && (
            <p className="mt-5 text-[19px] font-light leading-[1.65] text-white/90">{subtitle}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "teal"
                    ? "inline-flex items-center rounded-sm border-2 border-transparent bg-brand-secondary-dark px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-secondary-darker"
                    : "inline-flex items-center rounded-sm border-2 border-white/[0.55] bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:border-white hover:bg-white/[0.12]"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
