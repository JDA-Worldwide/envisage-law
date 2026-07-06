import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { LOGO_URL, PHONE, PHONE_TEL, practices } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2D3748] text-white/80">
      <Container>
        <div className="grid gap-12 border-b border-white/[0.12] py-[72px] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image src={LOGO_URL} alt="Envisage Law" width={180} height={24} className="mb-[22px] h-[24px] w-auto" />
            <p className="max-w-[320px] text-sm leading-[1.7] text-white/75">
              A litigation-first boutique firm in Raleigh, North Carolina. We represent clients in high-stakes business
              and intellectual property litigation, constitutional and regulatory matters nationwide.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/company/envisage-law"
                aria-label="LinkedIn (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34v-7.6H5.82v7.6h2.52zM7.08 9.6a1.46 1.46 0 100-2.92 1.46 1.46 0 000 2.92zm11.26 8.74v-4.16c0-2.22-1.18-3.25-2.76-3.25a2.38 2.38 0 00-2.16 1.19v-1.02h-2.52c.03.71 0 7.6 0 7.6h2.52v-4.24c0-.23.02-.45.08-.61.18-.45.59-.92 1.28-.92.9 0 1.26.69 1.26 1.69v4.08h2.56z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/envisagelaw"
                aria-label="X (Twitter) (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">Practice Areas</h4>
            <ul className="flex flex-col gap-[11px]">
              {practices.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <h4 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">Firm</h4>
            <ul className="flex flex-col gap-[11px]">
              <li>
                <Link href="/about" className="text-sm text-white/80 transition-colors hover:text-white">About</Link>
              </li>
              <li>
                <Link href="/legal-team" className="text-sm text-white/80 transition-colors hover:text-white">Legal Team</Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-white/80 transition-colors hover:text-white">Insights</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 transition-colors hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">Get in touch</h4>
            <p className="text-sm leading-[1.7] text-white/80">
              Envisage Law<br />
              PO Box 30099<br />
              Raleigh, North Carolina 27622<br /><br />
              <a href={PHONE_TEL} className="font-semibold text-[#8cc8d8] transition-colors hover:text-white">{PHONE}</a>
            </p>
            <p className="mt-4 text-[13px] leading-[1.6] text-white/75">
              Attorneys conveniently located in Raleigh, NC · Asheville, NC · Columbia, TN.
            </p>
          </div>
        </div>

        {/* Translation notice */}
        <p className="border-b border-white/[0.12] py-5 text-[12.5px] leading-[1.6] text-white/55">
          <strong className="text-white/70">Translation notice.</strong> Spanish and Mandarin translation
          (coming soon) is provided for first-touch comprehension only and is not certified for legal precision.
        </p>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-5 py-7 text-[13px] text-white/75">
          <span>
            © {year} Envisage Law · All Rights Reserved ·{" "}
            <Link href="/privacy-policy" className="underline hover:text-white/80">Privacy Policy</Link> ·{" "}
            <Link href="/terms-of-use" className="underline hover:text-white/80">Terms of Use</Link>
          </span>
          <span className="max-w-[720px] leading-[1.6]">
            Attorney advertising. This website is for general information only and does not constitute legal advice or
            create an attorney–client relationship.
          </span>
        </div>
      </Container>
    </footer>
  );
}
