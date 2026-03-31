import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Ga naar inhoud
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
