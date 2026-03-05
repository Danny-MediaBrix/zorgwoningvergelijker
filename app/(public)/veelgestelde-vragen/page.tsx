import { Metadata } from "next";
import Image from "next/image";
import { faqCategorieen } from "@/lib/faq";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/sections/CTABanner";
import StickyArticleCTA from "@/components/kennisbank/StickyArticleCTA";

export const metadata: Metadata = {
  title: "Veelgestelde Vragen Over Modulaire Woningen",
  description:
    "Antwoorden op alle vragen over kosten, vergunningen, aanbieders & de configurator ✓ Duidelijk & compleet ➜ Vind je antwoord!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/veelgestelde-vragen",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategorieen.flatMap((categorie) =>
    categorie.items.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.antwoord,
      },
    }))
  ),
};

export default function VeelgesteldeVragenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Veelgestelde vragen" },
            ]}
          />
        </Container>
      </section>

      {/* Header */}
      <section className="section-white section-padding wave-to-dark relative overflow-hidden">
        {/* Wim — decoratief op de achtergrond linksonder */}
        <div className="hidden lg:block absolute left-4 xl:left-12 bottom-0 w-[240px] xl:w-[280px] pointer-events-none select-none">
          <Image
            src="/images/veelgestelde-vragen-wim.png"
            alt="Wim beantwoordt veelgestelde vragen over modulaire woningen en zorgwoningen"
            width={440}
            height={528}
            className="w-full object-contain"
            sizes="220px"
          />
        </div>
        <Container className="relative z-10">
          <div className="text-center mb-14">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
              Veelgestelde vragen
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hier vind je antwoorden op de meest gestelde vragen over modulaire woningen,
              onze configurator, aanbieders en meer.
            </p>
          </div>

          {/* FAQ per categorie */}
          <div className="max-w-3xl xl:max-w-[40rem] mx-auto space-y-14">
            {faqCategorieen.map((categorie) => {
              const accordionItems = categorie.items.map((item, index) => ({
                id: `${categorie.slug}-${index}`,
                title: item.vraag,
                content: item.antwoord,
              }));

              return (
                <div key={categorie.slug}>
                  <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                    {categorie.naam}
                  </h2>
                  <Accordion items={accordionItems} allowMultiple />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <div id="cta-banner">
        <CTABanner />
      </div>

      <StickyArticleCTA />
    </>
  );
}
