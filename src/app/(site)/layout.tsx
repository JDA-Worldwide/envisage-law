import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import Navigation from "@/components/envisage/Navigation";
import Footer from "@/components/envisage/Footer";
import CookieConsent from "@/components/global/CookieConsent";
import { PreviewProvider } from "@/components/global/PreviewContext";
import VisualEditingClient from "@/components/global/VisualEditingClient";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {
  settingsQuery,
  allPracticeAreasQuery,
  navigationQuery,
  footerQuery,
} from "@/sanity/lib/queries";

const cookieConsentQuery = groq`*[_type == "globalSettings"][0].cookieConsentMessage`;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { data: settings },
    { data: practiceAreas },
    { data: nav },
    { data: footer },
    { data: cookieMessage },
    { isEnabled: isDraftMode },
  ] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: allPracticeAreasQuery }),
    sanityFetch({ query: navigationQuery }),
    sanityFetch({ query: footerQuery }),
    sanityFetch({ query: cookieConsentQuery, stega: false }),
    draftMode(),
  ]);

  return (
    <PreviewProvider isPreview={isDraftMode}>
      <Navigation nav={nav} practiceAreas={practiceAreas ?? []} />
      <main id="main-content">{children}</main>
      <Footer
        footer={footer}
        settings={settings}
        practiceAreas={practiceAreas ?? []}
        isPreview={isDraftMode}
      />
      <CookieConsent message={cookieMessage} />
      {isDraftMode && (
        <>
          <SanityLive />
          <VisualEditingClient />
        </>
      )}
    </PreviewProvider>
  );
}
