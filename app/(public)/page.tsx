import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofBar from "@/components/sections/SocialProofBar";
import StepsSection from "@/components/sections/StepsSection";
import WoningtypenGrid from "@/components/sections/WoningtypenGrid";
import PrijsIndicatieSection from "@/components/sections/PrijsIndicatieSection";

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection")
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection")
);
const KennisbankPreview = dynamic(
  () => import("@/components/sections/KennisbankPreview")
);
const CTABanner = dynamic(
  () => import("@/components/sections/CTABanner")
);
const StickyMobileCTA = dynamic(
  () => import("@/components/sections/StickyMobileCTA")
);

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "Modulaire Woning Nodig? Vergelijk & Bespaar",
  description:
    "Ontdek 14 woningtypen, configureer je droomwoning & ontvang gratis offertes ✓ Vrijblijvend ✓ Binnen 48 uur reactie ➜ Start nu!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zorgwoningvergelijker.nl",
  url: "https://zorgwoningvergelijker.nl",
  description:
    "Het nr. 1 vergelijkingsplatform voor modulaire woningen in Nederland. Vergelijk 14 woningtypen, configureer online en ontvang gratis offertes.",
  publisher: {
    "@type": "Organization",
    name: "Zorgwoningvergelijker.nl",
    url: "https://zorgwoningvergelijker.nl",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <SocialProofBar />
      <StepsSection />
      <div id="woningtypen">
        <WoningtypenGrid />
      </div>
      <PrijsIndicatieSection />
      <TestimonialsSection />
      <FAQSection />
      <KennisbankPreview />
      <CTABanner />
      <StickyMobileCTA />
    </>
  );
}
