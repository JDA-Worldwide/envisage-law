import Navigation from "@/components/envisage/Navigation";
import Footer from "@/components/envisage/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
