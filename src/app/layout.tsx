import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import { groq } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/live";
import VisualEditingClient from "@/components/global/VisualEditingClient";
import CookieConsent from "@/components/global/CookieConsent";
import "./globals.css";

const cookieConsentQuery = groq`*[_type == "globalSettings"][0].cookieConsentMessage`;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Envisage Law",
    default: "Envisage Law · Complex Litigation · Strategic Counsel · TechLaw",
  },
  description:
    "Envisage Law is a litigation-first boutique firm in Raleigh, NC, representing clients in high-stakes business and intellectual property litigation nationwide.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  const { data: cookieMessage } = await sanityFetch({ query: cookieConsentQuery, stega: false });

  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        {isDraftMode ? <VisualEditingClient /> : <SanityLive />}
        <CookieConsent message={cookieMessage} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
