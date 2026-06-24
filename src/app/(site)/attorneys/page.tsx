import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AttorneyCard from "@/components/envisage/AttorneyCard";
import RecognitionCard from "@/components/envisage/RecognitionCard";
import CtaBand from "@/components/envisage/CtaBand";
import { attorneys, staff, STOCK_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Attorneys",
  description:
    "Meet the attorneys of Envisage Law: board-certified specialists, former judicial clerks, and nationally recognized litigators.",
};

export default function AttorneysPage() {
  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.courthouse}
        title="Built to Fight"
        subtitle="Board-certified specialists, former judicial clerks and interns, and nationally recognized litigators who made their mark taking on power."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Attorneys" }]}
      />

      {/* Attorney Grid */}
      <section className="py-section">
        <Container className="max-w-[1200px]">
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Attorneys</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-4">
            {attorneys.map((a) => (
              <AttorneyCard key={a.slug} attorney={a} showNiche />
            ))}
          </div>
        </Container>
      </section>

      {/* Team & Staff */}
      <section className="bg-brand-surface py-section">
        <Container>
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Team &amp; Staff</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="flex items-center gap-5">
                <div className="h-[108px] w-[108px] flex-none overflow-hidden rounded-full bg-brand-primary">
                  {s.photo ? (
                    <Image src={s.photo} alt={s.name} width={184} height={184} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[28px] font-bold text-white" role="img" aria-label={s.name}>
                      {s.initials}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-lg font-bold text-brand-primary">{s.name}</div>
                  <div className="text-sm text-brand-muted">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RecognitionCard />

      <CtaBand
        backgroundImage={STOCK_IMAGES.consultation}
        eyebrow="Direct Pathways Only"
        title="Reach an attorney directly."
        actions={[{ label: "Contact Us", href: "/contact", variant: "teal" }]}
      />
    </>
  );
}
