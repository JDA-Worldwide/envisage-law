import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import CtaBand from "@/components/envisage/CtaBand";
import { getSiteImages } from "@/lib/siteImages";

export const metadata: Metadata = {
  title: "About",
  description:
    "Envisage Law: Relentless. Fierce. Undaunted. A litigation-first boutique of board-certified specialists and nationally recognized litigators who take on cases that define legal precedent.",
};

export default async function AboutPage() {
  const images = await getSiteImages();

  return (
    <>
      <Hero
        backgroundImage={images.heroParticles}
        title={<>Relentless. Fierce. <span className="text-brand-accent">Undaunted.</span></>}
        subtitle="Excellence is a choice. Service is our calling."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Intro */}
      <section className="py-section">
        <Container className="max-w-[880px]">
          <p className="text-[clamp(20px,2.4vw,28px)] font-light leading-[1.55] text-brand-primary">
            At Envisage Law, daunting challenges, long odds, and entrenched interests do not deter us. We are passionate
            about what we do, around the clock and every day of the week. It is who we are.
          </p>
        </Container>
      </section>

      {/* Built to Fight */}
      <section className="bg-brand-surface py-section">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Our Team</p>
              <h2 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Built to Fight</h2>
              <p className="text-[19px] font-light leading-[1.65] text-brand-muted">
                Our ranks include board-certified specialists, former judicial law clerks and interns, and nationally
                recognized litigators who made their mark taking on power.
              </p>
              <p className="mt-[18px] text-[19px] font-light leading-[1.65] text-brand-muted">
                Our lawyers include a former Division 1 linebacker, an Airborne Ranger, a former presidentially appointed
                lawyer, and working mothers who have raised and taught many children. We take on cases that define legal
                precedent, defending fundamental rights in groundbreaking social media and constitutional litigation and
                enforcing trademark rights for global brands.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: "4/3" }}>
              <Image
                src={`${images.consultation}&w=1400`}
                alt="Two professionals shaking hands across a table"
                width={700}
                height={525}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Innovation Meets Tenacity */}
      <section className="py-section">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="overflow-hidden rounded-lg shadow-md lg:order-first" style={{ aspectRatio: "4/3" }}>
              <Image
                src={`${images.heroParticles}&w=1400`}
                alt="Abstract blue digital particle texture representing technology"
                width={700}
                height={525}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Our Edge</p>
              <h2 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Innovation Meets Tenacity</h2>
              <p className="text-[19px] font-light leading-[1.65] text-brand-muted">
                Change is constant. While others play by the old rules, we rewrite them. In a profession known for its
                rigidity, we take pride in disrupting the status quo.
              </p>
              <p className="mt-[18px] text-[19px] font-light leading-[1.65] text-brand-muted">
                We leverage artificial intelligence, advanced legal research platforms, and proprietary case management
                systems to deliver more value to our clients.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Outsized Results */}
      <section className="bg-brand-primary py-section text-white">
        <Container>
          <div className="max-w-[760px]">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">Our Track Record</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-white">Outsized Results</h2>
            <p className="mt-5 text-[19px] font-light leading-[1.65] text-white/90">
              Our attorneys have litigated at every level and in over thirty states, and coordinated litigation and
              anti-counterfeiting efforts in multiple countries. We have secured multi-million-dollar judgments, landmark
              appellate victories, and precedent-setting settlements across various practice areas. We want to win every
              time, and we make no apology for it.
            </p>
          </div>
          <div className="mt-14 flex flex-wrap gap-14">
            {[
              { num: "30+", label: "States litigated in" },
              { num: "$3M+", label: "Single-matter judgments secured" },
              { num: "$20M", label: "Credit facility closed" },
              { num: "U.S.", label: "Supreme Court admitted" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[clamp(38px,4.5vw,56px)] font-extrabold leading-none text-white">
                  {stat.num}
                </div>
                <div className="mt-2.5 text-sm font-semibold text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Areas of Focus */}
      <section className="bg-brand-surface py-section-sm">
        <Container>
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">Where We Concentrate</p>
          <h2 className="mb-10 text-center text-[clamp(24px,3vw,34px)] font-extrabold text-brand-primary">Areas of Focus</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "IP Litigation",
              "Complex Commercial Litigation",
              "Technology Law",
              "Regulatory Disputes & Analysis",
              "Constitutional & First Amendment",
              "Appellate Practice",
              "Contracts & Licensing",
              "Trademark & Copyright",
            ].map((chip) => (
              <div key={chip} className="flex items-center gap-3 rounded-md border border-brand-border bg-white px-5 py-5">
                <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
                <span className="text-[18px] font-bold text-brand-primary">{chip}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Envisage Standard (light variant) */}
      <section className="py-section">
        <Container>
          <div className="mb-14 text-center">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">The Envisage Standard</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
              Proven Excellence · Board-Certified Expertise · Technology-Driven
            </h2>
          </div>
          <div className="grid gap-11 lg:grid-cols-3">
            {[
              { title: "Proven Excellence", text: "Multi-million dollar judgments, landmark appellate victories, and precedent-setting settlements across our practice. We defend First Amendment rights in groundbreaking social media litigation and enforce trademark rights for global brands." },
              { title: "Board-Certified Expertise", text: "Anthony Biller is one of a select few Board Certified Specialists in Trademark Law. Our attorneys are recognized as The Best Lawyers in America and have achieved Super Lawyers status." },
              { title: "Technology-Driven Advantage", text: "We are not afraid of technology, whether tech centered disputes or transactions or using it for our clients. We leverage cutting-edge technologies, advanced legal research platforms, and proprietary case management systems to deliver strategic advantages while also striving to deliver greater value to our clients." },
            ].map((item) => (
              <div key={item.title} className="border-t-2 border-brand-border pt-[22px]">
                <h3 className="mb-3.5 flex items-start gap-3 text-[21px] font-extrabold text-brand-primary">
                  <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-brand-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBand
        backgroundImage={images.consultation}
        eyebrow="Work With Us"
        title="Service is our calling."
        actions={[
          { label: "Contact Us", href: "/contact", variant: "teal" },
          { label: "Meet the Team", href: "/legal-team", variant: "ghost" },
        ]}
      />
    </>
  );
}
