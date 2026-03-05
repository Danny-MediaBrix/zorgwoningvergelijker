import { Metadata } from "next";
import Image from "next/image";
import { Shield, Eye, UserCheck, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Over Ons | Wie Zit Er Achter Dit Platform?",
  description:
    "Maak kennis met Zorgwoningvergelijker.nl: onafhankelijk, transparant & altijd in jouw belang ➜ Lees ons verhaal!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/over-ons",
  },
};

const kernwaarden = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    titel: "Onafhankelijk",
    beschrijving:
      "Wij zijn niet verbonden aan een specifieke aanbieder of fabrikant. Onze vergelijkingen en aanbevelingen zijn altijd objectief en in het belang van jou als consument. Je kunt erop vertrouwen dat onze informatie eerlijk en onbevooroordeeld is.",
  },
  {
    icon: <Eye className="w-8 h-8 text-primary" />,
    titel: "Transparant",
    beschrijving:
      "Wij geloven in volledige openheid over prijzen, processen en aanbieders. Geen verborgen kosten, geen kleine lettertjes. Je weet altijd precies waar je aan toe bent en hoe onze aanbevelingen tot stand komen.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    titel: "Persoonlijk",
    beschrijving:
      "Elke woonsituatie is uniek. Daarom bieden wij persoonlijk advies dat is afgestemd op je specifieke wensen, budget en omstandigheden. Ons team staat klaar om je te helpen bij elke stap van het proces.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-primary" />,
    titel: "Betrouwbaar",
    beschrijving:
      "Alle aanbieders op ons platform zijn zorgvuldig geselecteerd en doorgelicht op kwaliteit en klanttevredenheid. Wij monitoren doorlopend en verwijderen aanbieders die niet aan onze normen voldoen.",
  },
];

const bedrijfsgegevens = [
  { label: "KvK-nummer", waarde: "81313179" },
  { label: "BTW-nummer", waarde: "NL003555851B42" },
  { label: "Vestiging", waarde: "Amersfoort" },
];

export default function OverOnsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Over ons" },
            ]}
          />
        </Container>
      </section>

      {/* Hero */}
      <section className="section-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-6">
              Over Zorgwoningvergelijker.nl
            </h1>
            <p className="text-body-lg text-gray-600 leading-relaxed">
              Zorgwoningvergelijker.nl is het onafhankelijke platform dat je helpt bij het vinden
              van de perfecte modulaire woning. Wij geloven dat iedereen recht heeft op een
              betaalbare, kwalitatieve woning die past bij hun situatie en wensen.
            </p>
          </div>
        </Container>
      </section>

      {/* Missie */}
      <section className="section-gray section-padding wave-from-white wave-to-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
              Onze missie
            </h2>
            <p className="text-body-lg text-gray-600 leading-relaxed mb-6">
              De woningmarkt in Nederland staat onder enorme druk. Lange wachtlijsten,
              stijgende prijzen en een tekort aan betaalbare woningen maken het voor veel
              mensen moeilijk om een geschikte woning te vinden. Modulaire en prefab woningen
              bieden een waardevol alternatief: ze zijn sneller te realiseren, vaak
              betaalbaarder en steeds duurzamer. Toch is het voor consumenten lastig om door
              het grote aanbod aan typen, aanbieders en prijzen het overzicht te behouden.
            </p>
            <p className="text-body-lg text-gray-600 leading-relaxed mb-6">
              Daar komt Zorgwoningvergelijker.nl in beeld. Wij maken het eenvoudig om modulaire
              woningen te vergelijken door transparante informatie te bieden over prijzen,
              specificaties en aanbieders. Met onze configurator kun je in een paar minuten
              je ideale woning samenstellen en een realistische prijsindicatie ontvangen.
              Vervolgens kun je direct offertes aanvragen bij gekwalificeerde aanbieders.
            </p>
            <p className="text-body-lg text-gray-600 leading-relaxed">
              Onze missie is helder: iedereen verdient toegang tot eerlijke, onafhankelijke
              informatie over modulaire woningen. Of je nu een tiny house zoekt voor jezelf,
              een mantelzorgwoning voor je ouders of een flexwoning voor je gemeente, wij
              helpen je graag op weg naar de juiste keuze.
            </p>
          </div>
        </Container>
      </section>

      {/* Kernwaarden */}
      <section className="section-white section-padding">
        <Container>
          <div className="section-header">
            <h2 className="section-title">
              Onze kernwaarden
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kernwaarden.map((waarde) => (
              <div
                key={waarde.titel}
                className="bg-white rounded-2xl border border-gray-200/80 ring-1 ring-gray-100 p-6 hover:shadow-card-hover transition-all duration-300 ease-premium"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                  {waarde.icon}
                </div>
                <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-2">
                  {waarde.titel}
                </h3>
                <p className="text-body-sm text-gray-600 leading-relaxed">
                  {waarde.beschrijving}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Wim, mascotte */}
      <section className="section-warm section-padding wave-from-white wave-to-dark">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <Image
                src="/images/wim-zwv.png"
                alt="Wim, de Woning Inspecteur Meester en mascotte van Zorgwoningvergelijker.nl, met vergrootglas en miniatuurwoning"
                width={320}
                height={400}
                className="w-64 md:w-80 h-auto drop-shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-2">
                Maak kennis met Wim
              </h2>
              <p className="text-body-sm text-primary font-semibold mb-4">
                Woning Inspecteur Meester
              </p>
              <p className="text-body-lg text-gray-600 leading-relaxed mb-4">
                Wim is het gezicht van Zorgwoningvergelijker.nl. Gewapend met zijn
                vergrootglas en een miniatuurwoning in de hand, helpt hij je bij elke
                stap op weg naar je ideale modulaire woning.
              </p>
              <p className="text-body text-gray-600 leading-relaxed">
                Of je nu woningtypen vergelijkt, je droomwoning configureert of offertes
                aanvraagt: Wim staat altijd voor je klaar met helder en onafhankelijk
                advies. Geen ingewikkeld jargon, maar duidelijke taal en een frisse blik
                op de wereld van modulaire woningen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Bedrijfsgegevens */}
      <section className="section-brand py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            {bedrijfsgegevens.map((item) => (
              <div key={item.label}>
                <p className="font-semibold text-heading-2 tracking-tight text-white mb-2">
                  {item.waarde}
                </p>
                <p className="text-body-lg text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
