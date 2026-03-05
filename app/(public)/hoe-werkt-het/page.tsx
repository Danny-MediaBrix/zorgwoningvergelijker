import type { Metadata } from "next";
import Image from "next/image";
import { Clock, CheckCircle2, FileText, MessageSquare, Shield, ThumbsUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTABanner from "@/components/sections/CTABanner";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hoe Werkt Het? In 3 Stappen Naar Je Woning",
  description:
    "Configureer je modulaire woning, wij zoeken aanbieders & je ontvangt gratis offertes ✓ 100% vrijblijvend ➜ Begin direct!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/hoe-werkt-het",
  },
};

const stappen = [
  {
    nummer: 1,
    titel: "Configureer je woning",
    subtitel: "Duurt circa 5 minuten",
    image: "/images/wim-configureert.jpg",
    alt: "Stap 1: configureer je modulaire woning met de interactieve woningconfigurator",
    beschrijving:
      "Start de configurator en stel je ideale woning samen. Kies je woningtype, bepaal de afmetingen en richt de plattegrond in naar je wensen. Je selecteert de gewenste installaties, het exterieur en de afwerking.",
    details: [
      "Keuze uit 14 woningtypen",
      "Interactieve plattegrond editor",
      "Directe prijsindicatie",
      "Vrijblijvend en zonder account",
    ],
  },
  {
    nummer: 2,
    titel: "Wij zoeken aanbieders",
    subtitel: "Binnen 24 uur",
    image: "/images/wim-vergelijkt.jpg",
    alt: "Stap 2: wij zoeken passende aanbieders voor je modulaire woning",
    beschrijving:
      "Op basis van je configuratie zoeken wij aanbieders die passen bij je wensen en budget. Wij selecteren alleen betrouwbare partijen met bewezen ervaring in modulaire woningbouw.",
    details: [
      "Persoonlijke selectie op basis van je wensen",
      "Alleen gecertificeerde aanbieders",
      "Wij controleren op kwaliteit en betrouwbaarheid",
      "Geen verplichtingen voor jou",
    ],
  },
  {
    nummer: 3,
    titel: "Ontvang offertes",
    subtitel: "Binnen 48 uur",
    image: "/images/wim-ontvangt-offerte.jpg",
    alt: "Stap 3: ontvang gratis en vrijblijvend offertes voor je modulaire woning",
    beschrijving:
      "Je ontvangt vrijblijvend offertes die je op je gemak kunt vergelijken. Elke offerte is afgestemd op je specifieke configuratie, zodat je een eerlijke vergelijking kunt maken.",
    details: [
      "Offertes op maat voor je configuratie",
      "Duidelijke prijsopbouw, geen verrassingen",
      "Vergelijk op prijs, kwaliteit en levertijd",
      "Geen enkele verplichting",
    ],
  },
];

const voordelen = [
  {
    icon: <Shield className="w-6 h-6" />,
    titel: "100% gratis",
    beschrijving: "De configurator en offertes zijn volledig gratis. Je betaalt nooit voor onze dienst.",
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    titel: "Vrijblijvend",
    beschrijving: "Je zit nergens aan vast. Offertes ontvangen betekent niet dat je iets hoeft af te nemen.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    titel: "Snel resultaat",
    beschrijving: "Binnen 48 uur ontvang je offertes van aanbieders die passen bij je wensen.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    titel: "Onafhankelijk",
    beschrijving: "Wij zijn niet verbonden aan een aanbieder. Onze vergelijkingen zijn altijd objectief.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    titel: "Transparant",
    beschrijving: "Duidelijke informatie over prijzen, specificaties en aanbieders. Geen verborgen kosten.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    titel: "Persoonlijk advies",
    beschrijving: "Heb je vragen? Ons team helpt je graag verder via e-mail of telefoon.",
  },
];

const veelgesteldeVragen = [
  {
    vraag: "Moet ik betalen voor de configurator of offertes?",
    antwoord:
      "Nee, onze dienst is volledig gratis voor jou. Zowel het gebruik van de configurator als het ontvangen van offertes is kosteloos.",
  },
  {
    vraag: "Hoelang duurt het voordat ik offertes ontvang?",
    antwoord:
      "Na het afronden van je configuratie ontvang je doorgaans binnen 48 uur een offerte. In drukke periodes kan dit iets langer duren.",
  },
  {
    vraag: "Zit ik ergens aan vast na het aanvragen van offertes?",
    antwoord:
      "Nee, het aanvragen van offertes is volledig vrijblijvend. Je kunt de offertes op je gemak bekijken en vergelijken zonder enige verplichting.",
  },
  {
    vraag: "Hoe selecteren jullie de aanbieders?",
    antwoord:
      "Wij selecteren aanbieders op basis van kwaliteit, betrouwbaarheid en klantbeoordelingen. Elke aanbieder wordt doorgelicht voordat deze op ons platform wordt toegelaten.",
  },
  {
    vraag: "Kan ik de configuratie tussentijds opslaan?",
    antwoord:
      "Ja, je configuratie wordt automatisch opgeslagen in je browser. Je kunt op elk moment terugkeren en verder gaan waar je gebleven was.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Hoe werkt Zorgwoningvergelijker?",
  description:
    "In 3 eenvoudige stappen naar je ideale modulaire woning. Volledig gratis, vrijblijvend en zonder verplichtingen.",
  step: stappen.map((stap) => ({
    "@type": "HowToStep",
    position: stap.nummer,
    name: stap.titel,
    text: stap.beschrijving,
    image: `https://zorgwoningvergelijker.nl${stap.image}`,
  })),
};

export default function HoeWerktHetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Hoe werkt het?" },
            ]}
          />
        </Container>
      </section>

      {/* Hero */}
      <section className="section-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-6">
              Hoe werkt het?
            </h1>
            <p className="text-body-lg text-gray-600 leading-relaxed mb-8">
              In 3 eenvoudige stappen naar je ideale modulaire woning.
              Volledig gratis, vrijblijvend en zonder verplichtingen.
            </p>
            <Button
              as="link"
              href="/configurator"
              variant="primary"
              size="lg"
              iconRight={<CTAArrow />}
            >
              Direct starten
            </Button>
          </div>
        </Container>
      </section>

      {/* Stappen */}
      <section className="section-gray section-padding wave-from-white wave-to-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
            {stappen.map((stap, i) => (
              <div
                key={stap.nummer}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14`}
              >
                {/* Image */}
                <div className="w-full md:w-5/12 flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shadow-lg shadow-primary/25 z-10">
                      {stap.nummer}
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-black/[0.04]">
                      <Image
                        src={stap.image}
                        alt={stap.alt}
                        width={832}
                        height={704}
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[0.7rem] text-primary font-bold uppercase tracking-[0.15em] mb-2">
                    {stap.subtitel}
                  </p>
                  <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-4">
                    {stap.titel}
                  </h2>
                  <p className="text-body-lg text-gray-600 leading-relaxed mb-6">
                    {stap.beschrijving}
                  </p>
                  <ul className="space-y-2.5">
                    {stap.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-body-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              as="link"
              href="/configurator"
              variant="primary"
              size="lg"
              iconRight={<CTAArrow />}
            >
              Start je configuratie
            </Button>
          </div>
        </Container>
      </section>

      {/* Voordelen */}
      <section className="section-white section-padding">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Waarom via Zorgwoningvergelijker?</h2>
            <p className="section-subtitle">
              Bespaar tijd en moeite bij het zoeken naar je modulaire woning
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {voordelen.map((voordeel) => (
              <div
                key={voordeel.titel}
                className="bg-white rounded-2xl border border-gray-200/80 ring-1 ring-gray-100 p-6 hover:shadow-card-hover transition-all duration-300 ease-premium"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary mb-4">
                  {voordeel.icon}
                </div>
                <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-2">
                  {voordeel.titel}
                </h3>
                <p className="text-body-sm text-gray-600 leading-relaxed">
                  {voordeel.beschrijving}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Veelgestelde vragen */}
      <section className="section-warm section-padding wave-from-white wave-to-dark">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Veelgestelde vragen</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {veelgesteldeVragen.map((faq) => (
              <div
                key={faq.vraag}
                className="bg-white rounded-2xl border border-gray-200/80 ring-1 ring-gray-100 p-6"
              >
                <h3 className="font-semibold text-body text-dark mb-2">
                  {faq.vraag}
                </h3>
                <p className="text-body-sm text-gray-600 leading-relaxed">
                  {faq.antwoord}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
