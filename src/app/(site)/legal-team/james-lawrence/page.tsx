import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { ShieldCheckIcon, EmailIcon, PhoneIcon } from "@/components/envisage/Icons";
import { STOCK_IMAGES, PHONE } from "@/lib/data";

export const metadata: Metadata = {
  title: "James R. Lawrence III · Partner",
  description:
    "James R. Lawrence III is a Partner at Envisage Law, a former FDA Chief Counsel and HHS Deputy General Counsel who leads the firm's Health Care and Life Sciences practice.",
};

export default function LawrenceProfilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-primary py-14 pb-10 text-white">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.courthouse}')` }} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(0,18,42,0.94)] via-[rgba(0,31,70,0.86)] to-[rgba(3,42,92,0.72)]" />
        <Container className="relative z-[2]">
          <nav className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6fb0c2] hover:text-white">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/legal-team" className="text-[#6fb0c2] hover:text-white">Legal Team</Link>
            <span className="opacity-50">/</span>
            <span>James R. Lawrence III</span>
          </nav>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-[340px_1fr]">
            <aside className="lg:sticky lg:top-[calc(var(--header-height)+32px)]">
              <div className="aspect-[530/548] overflow-hidden rounded-lg bg-brand-primary shadow-md">
                <Image
                  src="https://envisage.law/wp-content/uploads/2021/04/james-lawrence-210408-530-548.jpg"
                  alt="James R. Lawrence III, Partner at Envisage Law"
                  width={530}
                  height={548}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-[22px] flex items-center gap-3 rounded-md bg-brand-primary p-4 text-white">
                <ShieldCheckIcon className="h-[26px] w-[26px] flex-none text-brand-accent" />
                <div>
                  <strong className="block text-sm font-bold">Former FDA Chief Counsel</strong>
                  <span className="text-[12.5px] text-white/70">Leads Health Care &amp; Life Sciences</span>
                </div>
              </div>
              <div className="mt-[22px] flex flex-col gap-3">
                <a href="mailto:jlawrence@envisage.law" className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                  <EmailIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                  jlawrence@envisage.law
                </a>
                <a href={`tel:${PHONE.replace(/\./g, "")}`} className="flex items-center gap-3 rounded-md border border-brand-border px-3.5 py-3 text-[15px] font-semibold text-brand-primary transition-all hover:border-brand-secondary hover:bg-brand-surface">
                  <PhoneIcon className="h-[18px] w-[18px] flex-none text-brand-secondary" />
                  {PHONE}
                </a>
              </div>
              <div className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">Practice Areas</div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <Link href="/practice-areas/regulatory-healthcare" className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white">Regulatory</Link>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Litigation</span>
                <Link href="/practice-areas/ip-technology" className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white">Intellectual Property</Link>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Complex Commercial Transactions</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Corporate Governance</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">M&amp;A</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Labor &amp; Employment</span>
                <span className="rounded-full border border-brand-border bg-brand-surface px-[15px] py-[7px] text-[13px] font-semibold text-brand-primary">Corporate Investigations</span>
              </div>
            </aside>

            <div>
              <h1 className="text-[clamp(32px,4vw,44px)] font-bold text-brand-primary">James R. Lawrence III</h1>
              <div className="mb-6 mt-2 text-base font-semibold uppercase tracking-[0.06em] text-brand-secondary-dark">Partner</div>

              <div className="space-y-[18px] text-[17px] leading-[1.75] text-[#2a3346]">
                <p>James helps clients solve business, legal, and regulatory problems across the full lifecycle of businesses and nonprofits, in the courtroom and the board room alike. As a former general counsel, his practice spans litigation, IP, complex commercial transactions, corporate governance, M&amp;A, and labor &amp; employment.</p>
                <p>He litigates patent, trademark, copyright, trade secret, unfair competition, and complex commercial disputes, serving as lead counsel in trials and appeals. A biomedical engineer, James leads Envisage&apos;s Health Care and Life Sciences practice and understands medical technology from a developer&apos;s perspective.</p>
                <p>He served as Deputy General Counsel at the U.S. Department of Health and Human Services and as Chief Counsel of the FDA, working during the COVID-19 pandemic on regulatory reform and drug pricing. That work gave him a rare perspective on the Administrative Procedure Act, the Food, Drug, and Cosmetic Act, and HIPAA.</p>
                <p>Among his litigation victories, James served as lead counsel for independent journalist and former New York Times reporter Alex Berenson in his lawsuit against Twitter, a path-breaking case that led to Berenson&apos;s reinstatement, the first known reinstatement of its kind, covered by national outlets and discussed on national podcasts.</p>
                <p>A native of Raleigh, he earned a B.S. in Biomedical Engineering, magna cum laude, from NC State and a J.D. with honors from UNC–Chapel Hill, where he was an Articles Editor on the North Carolina Law Review and a Judicial Extern to the Hon. Paul M. Newby on the NC Supreme Court.</p>
              </div>

              <ProfileSection title="Court Admissions">
                <dl>
                  <MetaRow label="State" value="All NC State Courts · NC Business Court" />
                  <MetaRow label="Federal Trial Courts" value="U.S. District Courts E.D.N.C., M.D.N.C., W.D.N.C., E.D. Tenn." />
                  <MetaRow label="Appellate Courts" value="U.S. Courts of Appeals for the Fourth and Federal Circuits" />
                </dl>
              </ProfileSection>

              <ProfileSection title="Education">
                <ProfileList items={[
                  "UNC–Chapel Hill School of Law, J.D., with honors. Articles Editor, NC Law Review; Joyner Award",
                  "NC State University, B.S. Biomedical Engineering, magna cum laude. Benjamin Franklin Scholar",
                ]} />
              </ProfileSection>

              <ProfileSection title="Honors">
                <ProfileList items={["Tau Beta Pi", "Phi Beta Kappa", "Phi Kappa Phi"]} />
              </ProfileSection>

              <ProfileSection title="Prior Employment">
                <ProfileList items={[
                  "U.S. Department of Health & Human Services",
                  "Michael Best & Friedrich LLP",
                  "Crown Laboratories",
                  "Coats & Bennett",
                  "Accenture",
                  "AVOS Life Sciences (acquired by Syneos Health)",
                ]} />
              </ProfileSection>

              <ProfileSection title="Representative Matters">
                <ProfileList items={[
                  "Lead trial counsel for a plaintiff life-sciences company in a false designation of origin / false advertising / UDTPA action (confidential settlement)",
                  "Represented a life-sciences company in its acquisition by a private equity firm, covering all aspects of diligence, negotiation, and closing",
                  "Lead trademark trial counsel to an apparel company in a bankruptcy adversary proceeding",
                  "Closed a $20M senior secured credit facility as counsel to borrower",
                  "Won partial summary judgment on a dispositive contract issue for a plaintiff academic association in a contract/copyright dispute",
                ]} />
              </ProfileSection>

              <div className="mt-10 flex flex-wrap gap-3.5">
                <a href="mailto:jlawrence@envisage.law" className="inline-flex items-center rounded-sm bg-brand-primary px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#032a5c]">
                  Email James
                </a>
                <Link href="/legal-team" className="inline-flex items-center rounded-sm border-2 border-brand-primary bg-transparent px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white">
                  Legal Team
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
