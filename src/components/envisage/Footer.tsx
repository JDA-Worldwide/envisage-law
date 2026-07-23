import Link from "next/link";
import Image from "next/image";
import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";

interface Settings {
  phone?: string;
  mailingAddress?: string;
}

interface FooterLink {
  _key: string;
  label: string;
  href: string;
}

interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

interface FooterData {
  description?: string;
  firmLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  locationsText?: string;
  translationNotice?: string;
  copyrightText?: string;
  disclaimerText?: string;
}

interface PracticeAreaItem {
  _id: string;
  title: string;
  slug: string;
}

interface FooterProps {
  footer?: FooterData;
  settings?: Settings;
  practiceAreas: PracticeAreaItem[];
}

const LOGO_URL = "/envisage-law-logo.svg";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34v-7.6H5.82v7.6h2.52zM7.08 9.6a1.46 1.46 0 100-2.92 1.46 1.46 0 000 2.92zm11.26 8.74v-4.16c0-2.22-1.18-3.25-2.76-3.25a2.38 2.38 0 00-2.16 1.19v-1.02h-2.52c.03.71 0 7.6 0 7.6h2.52v-4.24c0-.23.02-.45.08-.61.18-.45.59-.92 1.28-.92.9 0 1.26.69 1.26 1.69v4.08h2.56z" />
    </svg>
  ),
  twitter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z" />
    </svg>
  ),
  facebook: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

export default function Footer({ footer, settings, practiceAreas }: FooterProps) {
  const year = new Date().getFullYear();
  const phone = settings?.phone ?? "919.268.8998";
  const phoneTel = phone.replace(/[^\d]/g, "");
  const address = settings?.mailingAddress ?? "Envisage Law\nPO Box 30099\nRaleigh, North Carolina 27622";

  const description =
    footer?.description ??
    "A litigation-first boutique firm in Raleigh, North Carolina. We represent clients in high-stakes business and intellectual property litigation, constitutional and regulatory matters nationwide.";

  const firmLinks = footer?.firmLinks ?? [
    { _key: "about", label: "About", href: "/about" },
    { _key: "team", label: "Legal Team", href: "/legal-team" },
    { _key: "insights", label: "Insights", href: "/insights" },
    { _key: "contact", label: "Contact", href: "/contact" },
  ];

  const socialLinks = footer?.socialLinks ?? [
    { _key: "li", platform: "linkedin", url: "https://www.linkedin.com/company/envisage-law" },
    { _key: "tw", platform: "twitter", url: "https://twitter.com/envisagelaw" },
  ];

  const locationsText =
    footer?.locationsText ??
    "Attorneys conveniently located in Raleigh, NC \u00B7 Asheville, NC \u00B7 Columbia, TN.";

  const translationNotice = footer?.translationNotice;

  const copyrightText =
    footer?.copyrightText ?? "Envisage Law \u00B7 All Rights Reserved";

  const disclaimerText =
    footer?.disclaimerText ??
    "Attorney advertising. This website is for general information only and does not constitute legal advice or create an attorney\u2013client relationship.";

  return (
    <footer className="bg-[#2D3748] text-white/80">
      <Container>
        <div className="grid gap-12 border-b border-white/[0.12] py-[72px] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image src={LOGO_URL} alt="Envisage Law" width={180} height={24} className="mb-[22px] h-[24px] w-auto" />
            <p className="max-w-[320px] text-sm leading-[1.7] text-white/75">
              {description}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((link) => {
                  const platform = stegaClean(link.platform);
                  return (
                    <a
                      key={link._key}
                      href={stegaClean(link.url)}
                      aria-label={`${PLATFORM_LABELS[platform] ?? platform} (opens in new tab)`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white"
                    >
                      {SOCIAL_ICONS[platform] ?? null}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">Practice Areas</h4>
            <ul className="flex flex-col gap-[11px]">
              {practiceAreas.map((p) => (
                <li key={p._id}>
                  <Link href={`/practice-areas/${p.slug}`} className="text-sm text-white/80 transition-colors hover:text-white">
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
              {firmLinks.map((link) => (
                <li key={link._key}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">Get in touch</h4>
            <p className="text-sm leading-[1.7] text-white/80">
              {address.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              <br />
              <a href={`tel:${phoneTel}`} className="font-semibold text-[#8cc8d8] transition-colors hover:text-white">{phone}</a>
            </p>
            {locationsText && (
              <p className="mt-4 text-[13px] leading-[1.6] text-white/75">
                {locationsText}
              </p>
            )}
          </div>
        </div>

        {/* Translation notice */}
        {translationNotice && (
          <p className="border-b border-white/[0.12] py-5 text-[12.5px] leading-[1.6] text-white/55">
            <strong className="text-white/70">Translation notice.</strong> {translationNotice}
          </p>
        )}

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-5 py-7 text-[13px] text-white/75">
          <span>
            © {year} {copyrightText} ·{" "}
            <Link href="/privacy-policy" className="underline hover:text-white/80">Privacy Policy</Link> ·{" "}
            <Link href="/terms-of-use" className="underline hover:text-white/80">Terms of Use</Link>
          </span>
          {disclaimerText && (
            <span className="max-w-[720px] leading-[1.6]">
              {disclaimerText}
            </span>
          )}
        </div>
      </Container>
    </footer>
  );
}
