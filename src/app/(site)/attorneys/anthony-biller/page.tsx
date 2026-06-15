import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { StarIcon, EmailIcon, PhoneIcon } from "@/components/envisage/Icons";
import { STOCK_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: 'Anthony J. "Tony" Biller · Partner',
  description:
    "Anthony J. Biller is a Partner at Envisage Law and an NC State Bar Board Certified Specialist in Trademark Law, with decades of IP and commercial litigation experience nationwide.",
};

export default function BillerProfilePage() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative overflow-hidden bg-brand-primary py-14 pb-10 text-white">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.heroParticles}')` }} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,18,42,0.94)] via-[rgba(0,31,70,0.86)] to-[rgba(3,42,92,0.72)]" />
        <Container className="relative z-[2]">
          <nav className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6fb0c2] hover:text-white">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/attorneys" className="text-[#6fb0c2] hover:text-white">Attorneys</Link>
            <span className="opacity-50">/</span>
            <span>Anthony J. Biller</span>
          </nav>
        </Container>
      </section>

      {/* Profile */}
      <section className="py-14">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-[340px_1fr]">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-[calc(var(--header-height)+32px)]">
              <div className="aspect-[530/548] overflow-hidden rounded-lg bg-brand-primary shadow-md">
                <Image
                  src="https://envisage.law/wp-content/uploads/2022/08/Anthony-Biller-530-x-548.png"
                  alt="Anthony J. Biller, Partner at Envisage Law"
                  width={530}
                  height={548}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-[22px] flex items-center gap-3 rounded-md bg-brand-primary p-4 text-white">
                <StarIcon className="h-[26px] w-[26px] flex-none text-brand-accent" />
                <div>
                  <strong className="block text-sm font-bold">Board Certified Specialist</strong>
                  <span className="text-[12.5px] text-white/70">NC State Bar · Trademark Law</span>
                </div>
              </div>
              <div className="mt-[22px] flex flex-col gap-3">
                <a href="mailto:ajbiller@envisage.law" className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                  <EmailIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                  ajbiller@envisage.law
                </a>
                <a href="tel:9843449191" className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                  <PhoneIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                  (984) 344-9191
                </a>
              </div>
              <div className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">Practice Areas</div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <Link href="/practice-areas/ip-technology" className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white">
                  Trademarks, Copyrights &amp; Trade Secrets
                </Link>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Litigation</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Business Transactions</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Corporate &amp; Business Law</span>
                <Link href="/practice-areas/regulatory-healthcare" className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white">
                  Regulatory
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              <h1 className="text-[clamp(32px,4vw,44px)] font-bold text-brand-primary">Anthony J. &quot;Tony&quot; Biller</h1>
              <div className="mb-6 mt-2 text-base font-semibold uppercase tracking-[0.06em] text-brand-secondary-dark">Partner</div>

              <div className="space-y-[18px] text-[17px] leading-[1.75] text-[#2a3346]">
                <p>Tony is a litigator and business attorney. He helps clients investigate, identify and solve business and legal problems ranging from all forms of lawsuits and legal disputes to setting up, operating or ending a business, and detailed contract and licensing negotiations.</p>
                <p>He has litigated hundreds of commercial disputes in federal and state trial and appellate courts nationwide. He helps clients select, screen, register and manage trademarks and portfolios worldwide, and has extensive experience with patent, copyright, and trade secret needs and policies. The North Carolina State Bar recognizes Tony as a certified trademark specialist.</p>
                <p>Given the recent dramatic expansion of government regulation, he has been heavily engaged in constitutional litigation in trial and appellate courts across the country. Prior to starting Envisage, Tony was an office managing partner for an AmLaw 200 firm, and before that an executive committee partner in a North Carolina boutique patent law firm.</p>
                <p>Before private practice, Tony served as a U.S. District Court judicial clerk to the Honorable William L. Osteen, Sr. He began his legal career after serving four years as an Army Airborne Ranger in the 82nd Airborne Division, where he advanced to Captain.</p>
              </div>

              <ProfileSection title="Court Admissions">
                <dl>
                  <MetaRow label="State" value="North Carolina" />
                  <MetaRow label="Federal Trial Courts" value="U.S. Court of Federal Claims · U.S. District Courts for the M.D.N.C., E.D.N.C., W.D.N.C., W.D. Michigan, and Colorado" />
                  <MetaRow label="Appellate Courts" value="U.S. Courts of Appeals for the Federal, Fourth, Sixth, and Eleventh Circuits · U.S. Supreme Court" />
                </dl>
              </ProfileSection>

              <ProfileSection title="Education">
                <ProfileList items={[
                  "Campbell University, J.D., magna cum laude, Managing Editor of the Campbell Law Review (1997)",
                  "Purdue University, B.A., Distinguished Military Graduate",
                  "Erasmus University Rotterdam (1989)",
                ]} />
              </ProfileSection>

              <ProfileSection title="Honors & Recognition">
                <ProfileList items={[
                  "NC State Bar Board Certified Specialist, Trademark Law (2013–present)",
                  "NC Supreme Court 2023 Pro Bono Honor Society",
                  "Best Lawyers in America®, Litigation – IP / Patent Law (2018–2025)",
                  "Influencers in Law (2019)",
                  "Legal Elite Hall of Fame (2013)",
                  "Lexology Client Choice Award (2013)",
                ]} />
              </ProfileSection>

              <ProfileSection title="Prior Experience">
                <ProfileList items={[
                  "Managing Partner, Raleigh Office, Michael Best & Friedrich LLP (2018–2020)",
                  "Member / Executive Committee, Coats & Bennett PLLC (2000–2018)",
                  "Litigation Associate, Maupin Taylor & Ellis PA (1998–2000)",
                  "Judicial Clerk, Hon. William L. Osteen, Sr., M.D.N.C. (1997–1998)",
                  "Captain, U.S. Army, 82nd Airborne Division (1990–1994)",
                ]} />
              </ProfileSection>

              <ProfileSection title="Representative Matters">
                <ProfileList items={[
                  "Obtained a finding of willful patent infringement, permanent injunction, and $3M summary-judgment award against a Fortune 100 retailer for a textile manufacturer (E.D.N.C.)",
                  "Co-chaired jury trial winning willful trademark infringement and cybersquatting verdict for a luxury retail brand (W.D.N.C.)",
                  "Won summary judgment of non-infringement between restaurant chains (S.D. Fla.) and argued/won the appeal (11th Cir.)",
                  "Obtained preliminary injunction for NC bowlers on state constitutional claims against executive orders and defended emergency appeal to the NC Supreme Court",
                  "Led seizure of counterfeit health-supplement products in the M.D.N.C.",
                ]} />
              </ProfileSection>

              <ProfileSection title="Memberships & Community Involvement">
                <ProfileList items={[
                  "ABA litigation & IP groups · International Trademark Association · Federalist Society",
                  "Alliance Defending Freedom, National Litigation Honor Corps",
                  "Board of Directors, Answers in Genesis and Capitol Commission",
                  "Married 30+ years, 10 children; soccer coach",
                ]} />
              </ProfileSection>

              <div className="mt-10 flex flex-wrap gap-3.5">
                <a href="mailto:ajbiller@envisage.law" className="inline-flex items-center rounded-sm bg-brand-primary px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
                  Email Tony
                </a>
                <Link href="/attorneys" className="inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
                  All Attorneys
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-brand-border py-8">
      <h2 className="mb-[18px] text-[22px] font-extrabold text-brand-primary">{title}</h2>
      {children}
    </div>
  );
}

function ProfileList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15.5px] leading-[1.55] text-[#2a3346]">
          <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-brand-secondary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-brand-border py-3.5 last:border-b-0">
      <dt className="text-[13px] font-bold tracking-[0.02em] text-brand-primary">{label}</dt>
      <dd className="text-[15px] leading-[1.55] text-brand-muted">{value}</dd>
    </div>
  );
}
