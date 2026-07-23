import Navigation from "@/components/envisage/Navigation";
import Footer from "@/components/envisage/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import {
  settingsQuery,
  allPracticeAreasQuery,
  navigationQuery,
  footerQuery,
} from "@/sanity/lib/queries";

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
  ] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: allPracticeAreasQuery }),
    sanityFetch({ query: navigationQuery }),
    sanityFetch({ query: footerQuery }),
  ]);

  return (
    <>
      <Navigation nav={nav} practiceAreas={practiceAreas ?? []} />
      <main id="main-content">{children}</main>
      <Footer footer={footer} settings={settings} practiceAreas={practiceAreas ?? []} />
    </>
  );
}
