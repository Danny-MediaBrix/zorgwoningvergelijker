import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Users, TrendingUp, Shield, BarChart3, Headphones, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import CTAArrow from "@/components/ui/CTAArrow";

export const metadata: Metadata = {
  title: "Aanbieder Worden? Ontvang Gekwalificeerde Leads",
  description:
    "Sluit je aan bij het nr. 1 vergelijkingsplatform & ontvang leads van consumenten die actief zoeken ✓ Eigen dashboard ➜ Meld je aan!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/aanbieder-worden",
  },
};

const voordelen = [
  {
    icon: <Users className="w-6 h-6" />,
    titel: "Gekwalificeerde leads",
    beschrijving:
      "Ontvang aanvragen van consumenten die actief zoeken naar een modulaire woning. Elke lead bevat een volledige configuratie met wensen, budget en contactgegevens.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    titel: "Meer zichtbaarheid",
    beschrijving:
      "Vergroot je online bereik via ons platform. Wij investeren in SEO en content zodat je bedrijf gevonden wordt door de juiste doelgroep.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    titel: "Betrouwbaar platform",
    beschrijving:
      "Wij selecteren aanbieders zorgvuldig op kwaliteit en betrouwbaarheid. Door deel te nemen aan ons platform vergroot je het vertrouwen bij potentiele klanten.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    titel: "Eigen dashboard",
    beschrijving:
      "Beheer je profiel, certificaten, portfolio en occasions via een overzichtelijk aanbiederportaal. Je hebt altijd inzicht in je leads en betalingen.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    titel: "Persoonlijke ondersteuning",
    beschrijving:
      "Ons team helpt je bij het opzetten van je profiel en staat klaar voor vragen. Je krijgt een vast aanspreekpunt.",
  },
];

const stappen = [
  {
    nummer: 1,
    titel: "Aanmelden",
    beschrijving:
      "Maak een account aan en vul je bedrijfsgegevens in. Dit duurt slechts enkele minuten.",
  },
  {
    nummer: 2,
    titel: "Profiel inrichten",
    beschrijving:
      "Voeg je certificaten, portfolio en specialisaties toe. Selecteer de woningtypen die je aanbiedt.",
  },
  {
    nummer: 3,
    titel: "Goedkeuring",
    beschrijving:
      "Wij beoordelen je aanmelding en nemen binnen 2 werkdagen contact met je op voor een kennismaking.",
  },
  {
    nummer: 4,
    titel: "Leads ontvangen",
    beschrijving:
      "Na goedkeuring ontvang je direct gekwalificeerde leads van consumenten die passen bij je aanbod.",
  },
];

const veelgesteldeVragen = [
  {
    vraag: "Wat kost het om aanbieder te worden?",
    antwoord:
      "Wij hanteren een maandelijks abonnement waarmee je onbeperkt leads kunt ontvangen. De exacte kosten bespreken wij graag persoonlijk, zodat we een pakket kunnen aanbieden dat past bij je bedrijf.",
  },
  {
    vraag: "Welke eisen stellen jullie aan aanbieders?",
    antwoord:
      "Wij verwachten dat je ingeschreven staat bij de Kamer van Koophandel, over relevante certificeringen beschikt en aantoonbare ervaring hebt in de modulaire woningbouw. Klanttevredenheid en kwaliteit staan bij ons voorop.",
  },
  {
    vraag: "Hoeveel leads kan ik verwachten?",
    antwoord:
      "Het aantal leads hangt af van de woningtypen die je aanbiedt en de regio waarin je actief bent. Wij investeren doorlopend in het vergroten van ons bereik om het aantal aanvragen te laten groeien.",
  },
  {
    vraag: "Kan ik mijn abonnement opzeggen?",
    antwoord:
      "Ja, je kunt je abonnement maandelijks opzeggen. Er geldt geen langlopende verplichting. Wij geloven dat je blijft omdat je tevreden bent, niet omdat je vast zit aan een contract.",
  },
  {
    vraag: "Hoe worden leads verdeeld?",
    antwoord:
      "Leads worden verdeeld op basis van je specialisaties, woningtypen en beschikbaarheid. Elke lead wordt aan een beperkt aantal aanbieders aangeboden, zodat je een eerlijke kans hebt.",
  },
];

export default function AanbiederWordenPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Aanbieder worden" },
            ]}
          />
        </Container>
      </section>

      {/* Hero */}
      <section className="section-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.7rem] text-primary font-bold uppercase tracking-[0.15em] mb-4">
              Voor aanbieders van modulaire woningen
            </p>
            <h1 className="font-semibold text-display tracking-tight text-dark mb-6">
              Groei je bedrijf met gekwalificeerde leads
            </h1>
            <p className="text-body-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Sluit je aan bij Zorgwoningvergelijker.nl en ontvang aanvragen van consumenten
              die actief zoeken naar een modulaire woning. Wij brengen vraag en aanbod samen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button as="link" href="/registreren" variant="primary" size="lg" iconRight={<CTAArrow />}>
                Aanmelden als aanbieder
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-primary font-semibold px-6 py-4 rounded-2xl border border-primary/20 hover:border-primary/40 hover:bg-primary-50 transition-all duration-200"
              >
                Eerst meer informatie
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Voordelen */}
      <section className="section-gray section-padding wave-from-white wave-to-white">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Waarom aanbieder worden?</h2>
            <p className="section-subtitle">
              Bereik de juiste klanten via het grootste vergelijkingsplatform voor modulaire woningen
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

      {/* Hoe werkt het */}
      <section className="section-white section-padding">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Hoe werkt het?</h2>
            <p className="section-subtitle">In 4 stappen aan de slag</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-0">
              {stappen.map((stap, i) => (
                <div key={stap.nummer} className="flex gap-5">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg shadow-primary/25 flex-shrink-0">
                      {stap.nummer}
                    </div>
                    {i < stappen.length - 1 && (
                      <div className="w-px flex-1 bg-primary/15 my-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={i < stappen.length - 1 ? "pb-8" : "pb-0"}>
                    <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-1 mt-1.5">
                      {stap.titel}
                    </h3>
                    <p className="text-body-sm text-gray-600 leading-relaxed">
                      {stap.beschrijving}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#2D1B4E] py-20 md:py-28">
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display text-white font-heading font-bold mb-6 tracking-tight">
              Klaar om te starten?
            </h2>
            <p className="text-body-lg text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Meld je aan als aanbieder en ontvang binnen enkele dagen je eerste leads.
              Heb je eerst nog vragen? Neem dan gerust contact met ons op.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button as="link" href="/registreren" variant="accent" size="lg" iconRight={<CTAArrow />}>
                Aanmelden als aanbieder
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-medium px-6 py-4 rounded-2xl border border-white/15 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200"
              >
                Contact opnemen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
