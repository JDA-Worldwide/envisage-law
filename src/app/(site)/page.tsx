import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import PracticeCard from "@/components/envisage/PracticeCard";
import AttorneyCarousel from "@/components/envisage/AttorneyCarousel";
import ArticleCard from "@/components/envisage/ArticleCard";
import RecognitionCard from "@/components/envisage/RecognitionCard";
import CtaBand from "@/components/envisage/CtaBand";
import { practices, attorneys, articles, STOCK_IMAGES } from "@/lib/data";
import { ArrowIcon } from "@/components/envisage/Icons";

export const metadata: Metadata = {
  title: "Envisage Law · Complex Litigation · Strategic Counsel · TechLaw",
  description:
    "Envisage Law is a litigation-first boutique firm in Raleigh, NC, representing clients in high-stakes business and intellectual property litigation nationwide.",
};

export default function HomePage() {

  return (
    <>
      {/* Hero */}
      <Hero
        backgroundImage={STOCK_IMAGES.heroParticles}
        eyebrow="Complex Litigation · Strategic Counsel · TechLaw"
        title={
          <>
            Where complex legal disputes meet{" "}
            <span className="text-brand-accent">cutting-edge strategy</span>
          </>
        }
        subtitle="Our attorneys have secured favorable outcomes in North Carolina and federal courts nationwide, including multi-million-dollar judgments and precedent-setting appellate victories."
        actions={[
          { label: "Contact Us", href: "/contact", variant: "teal" },
          { label: "Our Practice Areas", href: "/practice-areas", variant: "ghost" },
        ]}
        isHome
      />

      {/* Firm Intro */}
      <section className="py-section" aria-labelledby="firm-intro-heading">
        <Container>
          <div className="mx-auto max-w-[880px] text-center">
            <h2 id="firm-intro-heading" className="sr-only">About Envisage Law</h2>
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              Raleigh, North Carolina · Nationwide Practice
            </p>
            <p className="text-[clamp(22px,2.6vw,30px)] font-light leading-[1.5] text-brand-primary" style={{ textWrap: "balance" }}>
              Envisage Law represents clients in high-stakes business and intellectual property litigation, constitutional
              and civil rights issues, complex regulatory matters, and commercial and non-profit disputes.
            </p>
            <p className="mx-auto mt-6 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
              Our board-certified specialists and nationally recognized litigators combine decades of courtroom experience
              with innovative legal strategies to secure decisive victories nationwide in federal and state courts.
            </p>
          </div>
        </Container>
      </section>

      {/* Practice Areas Grid */}
      <section className="bg-brand-surface py-section" id="practice">
        <Container>
          <div className="mb-14 text-center">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              Six Sweet Spots Within Business Litigation
            </p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Practice Areas</h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
              A civil and commercial litigation firm at its core, with our deepest expertise concentrated in six clearly
              delineated niches.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <PracticeCard key={p.slug} practice={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Three Pillars */}
      <section className="py-section">
        <Container>
          <div className="mb-14 text-center">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              What Drives Us
            </p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
              Quality · Perseverance · Professionalism
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: "Quality",
                text: "We are good at what we do. We might not be large, but we are experienced, responsive, and committed to providing the highest quality of services. We enjoy exceeding expectations, and we like to win for our clients.",
              },
              {
                num: "02",
                title: "Perseverance",
                text: "We never give up pursuing our clients' objectives and are passionate for their successes. Our attorneys pride themselves in forming enduring relationships and serving their clients for decades.",
              },
              {
                num: "03",
                title: "Professionalism",
                text: "We believe we are answerable for how we use the gifts we have been given, to include the privilege of serving our clients' needs. We are passionate about serving our clients to the best of our abilities.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="border-t-[3px] border-brand-primary pt-7">
                <div className="mb-3.5 text-sm font-extrabold tracking-[0.1em] text-brand-secondary-dark">{pillar.num}</div>
                <h3 className="mb-3.5 text-[26px] font-extrabold text-brand-primary">{pillar.title}</h3>
                <p className="text-[15.5px] leading-[1.65] text-brand-muted">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Credibility Band */}
      <section className="relative overflow-hidden py-section">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${STOCK_IMAGES.courthouse}')` }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(0,31,70,0.93)] to-[rgba(0,31,70,0.9)]" />
        <Container className="relative z-[2]">
          <div className="text-center">
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">
              Why Clients Choose Envisage
            </p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-white">
              A firm that handles the cases that define legal precedent
            </h2>
          </div>
          <div className="mt-14 grid gap-11 lg:grid-cols-3">
            {[
              {
                title: "Proven Excellence",
                text: "Our attorneys have secured multi-million dollar judgments, landmark appellate victories, and precedent-setting settlements across diverse practice areas, including First Amendment defense in groundbreaking social media litigation and trademark enforcement for global brands.",
              },
              {
                title: "Board-Certified Expertise",
                text: "Anthony Biller is one of only a select few Board Certified Specialists in Trademark Law. Our team brings rare specialization to complex IP and technology disputes, and our attorneys are recognized as The Best Lawyers in America and have achieved Super Lawyers status.",
              },
              {
                title: "Technology-Driven Advantage",
                text: "We leverage cutting-edge technologies, advanced legal research platforms, and proprietary case management systems to deliver strategic advantages our competitors cannot match.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="mb-3.5 flex items-start gap-3 text-[21px] font-extrabold text-white">
                  <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-white/90">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Attorneys */}
      <section className="bg-brand-surface py-section">
        <Container>
          <AttorneyCarousel attorneys={attorneys} />
        </Container>
      </section>

      {/* Recognition */}
      <RecognitionCard />

      {/* Insights Teaser */}
      <section className="py-section">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">From the Firm</p>
              <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">Latest insights</h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2.5 rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
            >
              All Insights <ArrowIcon />
            </Link>
          </div>
          <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA Band */}
      <CtaBand
        backgroundImage={STOCK_IMAGES.consultation}
        eyebrow="Litigation-First · Niche by Design"
        title="When clients must litigate, we know how to fight and win."
        subtitle="We are passionate, unrelenting, and experienced in state and federal trial and appellate courts and arbitral proceedings throughout North Carolina and the United States."
        actions={[
          { label: "Contact Us", href: "/contact", variant: "teal" },
          { label: "About the Firm", href: "/about", variant: "ghost" },
        ]}
      />
    </>
  );
}
