import Navigation from "@/components/envisage/Navigation";
import Footer from "@/components/envisage/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery, allPracticeAreasQuery } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: settings }, { data: practiceAreas }] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: allPracticeAreasQuery }),
  ]);

  return (
    <>
      <Navigation practiceAreas={practiceAreas ?? []} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} practiceAreas={practiceAreas ?? []} />
    </>
  );
}
