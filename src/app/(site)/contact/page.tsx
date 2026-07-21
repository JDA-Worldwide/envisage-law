import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Hero from "@/components/envisage/Hero";
import { PhoneIcon, MapPinIcon, CreditCardIcon } from "@/components/envisage/Icons";
import { getSiteImages } from "@/lib/siteImages";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Envisage Law directly by phone. PO Box 30099, Raleigh, North Carolina 27622.",
};

export default async function ContactPage() {
  const { data: settings } = await sanityFetch({ query: settingsQuery });
  const images = await getSiteImages();
  const phone = settings?.phone ?? "919.268.8998";
  const phoneTel = settings?.phoneTel ?? "9192688998";
  const address = settings?.mailingAddress ?? "Envisage Law\nPO Box 30099\nRaleigh, NC 27622";
  const lawpayUrl = settings?.lawpayUrl;
  return (
    <>
      <Hero
        backgroundImage={images.raleighSkyline}
        title="Contact Envisage Law"
        subtitle="Reach an attorney directly. We respond personally, with no intake form to fill out."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Direct Methods */}
      <section className="py-section">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <a href={`tel:${phoneTel}`} aria-label={`Call Envisage Law at ${phone}`} className="group block rounded-lg border border-brand-border bg-white p-10 transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary text-white">
                <PhoneIcon className="h-[26px] w-[26px]" />
              </div>
              <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">Call</div>
              <div className="text-[clamp(22px,2.4vw,30px)] font-extrabold text-brand-primary">{phone}</div>
              <div className="mt-2 text-sm text-brand-muted">Speak with our team directly.</div>
            </a>
            <div className="rounded-lg border border-brand-border bg-white p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary text-white">
                <MapPinIcon className="h-[26px] w-[26px]" />
              </div>
              <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">Mailing Address</div>
              <div className="text-[22px] font-extrabold leading-[1.3] text-brand-primary">
                {address.split("\n").map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </div>
              <div className="mt-2 text-sm text-brand-muted">Correspondence is received by PO Box only.</div>
            </div>
            {lawpayUrl ? (
              <a href={lawpayUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-lg border-2 border-dashed border-brand-border bg-white p-10 transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary text-white">
                  <CreditCardIcon className="h-[26px] w-[26px]" />
                </div>
                <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">Payments</div>
                <div className="text-[22px] font-extrabold leading-[1.3] text-brand-primary">Online via LawPay</div>
                <div className="mt-2 text-sm text-brand-muted">Make a secure payment online.</div>
              </a>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-brand-border bg-white p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary text-white">
                  <CreditCardIcon className="h-[26px] w-[26px]" />
                </div>
                <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">Payments</div>
                <div className="text-[22px] font-extrabold leading-[1.3] text-brand-primary">Online via LawPay</div>
                <div className="mt-2 text-sm text-brand-muted">
                  <span className="rounded-full bg-[rgba(254,179,0,0.12)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-accent">Pending</span>
                  <span className="ml-2">Secure payment link coming soon.</span>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 max-w-[760px] text-sm text-brand-muted">
            Please do not send confidential or time-sensitive information until an attorney–client relationship has been
            established. Contacting Envisage Law does not by itself create such a relationship.
          </p>
        </Container>
      </section>

      {/* Locations */}
      <section className="bg-brand-surface py-section">
        <Container>
          <div className="mb-10 flex items-center gap-5">
            <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">Where We Work</h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="flex flex-wrap gap-14">
            {[
              { city: "Raleigh, NC", label: "Primary office" },
              { city: "Asheville, NC", label: "Attorney location" },
              { city: "Columbia, TN", label: "Attorney location" },
            ].map((loc) => (
              <div key={loc.city}>
                <div className="text-[30px] font-extrabold text-brand-primary">{loc.city}</div>
                <div className="mt-2.5 text-sm font-semibold text-brand-muted">{loc.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
            Attorneys are conveniently located in Raleigh, NC, Asheville, NC, and Columbia, TN, serving clients in
            federal and state courts throughout North Carolina and nationwide.
          </p>
        </Container>
      </section>

      {/* Skyline Band */}
      <section className="relative flex h-[420px] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images.raleighSkyline}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,31,70,0.85)] via-[rgba(0,31,70,0.55)] to-[rgba(0,31,70,0.35)]" />
        <Container className="relative z-[2]">
          <p className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-[1.15] text-white" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
            Proudly based in<br />Raleigh, North Carolina.
          </p>
        </Container>
      </section>
    </>
  );
}
