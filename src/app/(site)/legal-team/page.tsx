import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import AttorneyCard from "@/components/envisage/AttorneyCard";
import RecognitionCard from "@/components/envisage/RecognitionCard";
import CtaBand from "@/components/envisage/CtaBand";
import { attorneys, staff, STOCK_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Legal Team",
  description:
    "Meet the attorneys of Envisage Law: board-certified specialists, former judicial clerks, and nationally recognized litigators.",
};

export default function AttorneysPage() {
  return (
    <>
      <Hero
        backgroundImage={STOCK_IMAGES.courthouse}
        title="Built to Fight"
        subtitle="Our attorneys have litigated at every level and in over thirty states, and coordinated litigation and anti-counterfeiting efforts in multiple countries. We have secured multi-million-dollar judgments, landmark appellate victories, and precedent-setting settlements across various practice areas."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legal Team" }]}
      />

      {/* Attorneys and Legal Team */}
      <section className="py-section">
        <Container className="max-w-[1200px]">
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Attorneys and Legal Team</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-4">
            {attorneys.map((a) => (
              <AttorneyCard key={a.slug} attorney={a} showNiche />
            ))}
            {staff.map((s) => (
              <div key={s.name} className="flex h-full flex-col overflow-hidden rounded-md border border-brand-border bg-white">
                <div className="aspect-[530/548] overflow-hidden bg-brand-primary">
                  {s.photo ? (
                    <Image src={s.photo} alt={s.name} width={530} height={548} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[48px] font-bold text-white" role="img" aria-label={s.name}>
                      {s.initials}
                    </div>
                  )}
                </div>
                <div className="border-t-[3px] border-t-brand-secondary px-[22px] py-[22px] pb-[26px]">
                  <div className="text-[19px] font-bold text-brand-primary">{s.name}</div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-muted">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RecognitionCard />

      <CtaBand
        backgroundImage={STOCK_IMAGES.consultation}
        eyebrow="Start a conversation"
        title="Call to speak with our team."
        actions={[{ label: "Contact Us", href: "/contact", variant: "teal" }]}
      />
    </>
  );
}
