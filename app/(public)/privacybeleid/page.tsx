import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Privacybeleid | Veilig & Transparant",
  description:
    "Lees hoe Zorgwoningvergelijker.nl je persoonsgegevens beschermt ✓ Transparant ✓ Veilig ✓ Conform de AVG.",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/privacybeleid",
  },
};

const sections = [
  {
    title: "1. Inleiding",
    content: `Zorgwoningvergelijker.nl ("wij", "ons", "onze") hecht grote waarde aan de bescherming van je persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij dat doen, hoe lang wij ze bewaren en welke rechten je hebt.

Dit beleid is van toepassing op alle bezoekers en gebruikers van onze website www.zorgwoningvergelijker.nl en de daarop aangeboden diensten, waaronder de woningconfigurator en het aanvragen van offertes.`,
  },
  {
    title: "2. Verwerkingsverantwoordelijke",
    content: `De verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens is:

Zorgwoningvergelijker.nl
Vanadiumweg 11A
3812 PX Amersfoort
E-mail: info@zorgwoningvergelijker.nl
KvK-nummer: 91234567`,
  },
  {
    title: "3. Welke gegevens verzamelen wij?",
    content: `Wij verzamelen de volgende categorieën persoonsgegevens:

**a. Gegevens die je zelf verstrekt**
• Naam en achternaam
• E-mailadres
• Telefoonnummer
• Adresgegevens (postcode, huisnummer, plaats)
• Configuratievoorkeuren (woningtype, afmetingen, opties)
• Inhoud van berichten via het contactformulier

**b. Automatisch verzamelde gegevens**
• IP-adres (geanonimiseerd)
• Browsertype en besturingssysteem
• Bezochte pagina's en klikgedrag
• Datum en tijdstip van bezoek
• Verwijzende website

**c. Cookies en vergelijkbare technologieën**
Wij gebruiken functionele, analytische en (met je toestemming) marketing-cookies. Zie ons cookiebeleid hieronder (sectie 9) voor meer details.`,
  },
  {
    title: "4. Doeleinden van verwerking",
    content: `Wij verwerken je persoonsgegevens voor de volgende doeleinden:

• **Dienstverlening**: het verwerken van je configuratie en het doorsturen van offerteaanvragen naar geselecteerde aanbieders.
• **Communicatie**: het beantwoorden van je vragen via het contactformulier of per e-mail.
• **Verbetering van de website**:Het analyseren van websitegebruik om onze diensten en gebruikerservaring te verbeteren.
• **Wettelijke verplichtingen**:Het voldoen aan wettelijke verplichtingen, zoals fiscale bewaarplichten.
• **Marketing**: uitsluitend met je uitdrukkelijke toestemming, het verzenden van nieuwsbrieven of aanbiedingen.`,
  },
  {
    title: "5. Rechtsgronden",
    content: `Wij verwerken je gegevens op basis van de volgende rechtsgronden (artikel 6 AVG):

• **Toestemming**: voor het plaatsen van niet-functionele cookies en het verzenden van marketingberichten.
• **Uitvoering van een overeenkomst**: voor het verwerken van offerteaanvragen en het koppelen aan aanbieders.
• **Gerechtvaardigd belang**: voor het verbeteren van onze website en het voorkomen van fraude.
• **Wettelijke verplichting**: voor het voldoen aan belasting- en boekhoudverplichtingen.`,
  },
  {
    title: "6. Delen met derden",
    content: `Wij delen je persoonsgegevens uitsluitend met derden wanneer dit noodzakelijk is:

• **Woningaanbieders**: wanneer je een offerteaanvraag doet, delen wij je contactgegevens en configuratievoorkeuren met de door jou geselecteerde aanbieder(s). Je wordt hierover altijd vooraf geïnformeerd.
• **Hosting en IT-dienstverleners**:Voor het hosten van onze website en het opslaan van gegevens (binnen de EU/EER).
• **Analytische diensten**:Wij gebruiken geanonimiseerde gegevens voor websiteanalyse.

Wij verkopen je persoonsgegevens nooit aan derden. Met alle verwerkers hebben wij een verwerkersovereenkomst gesloten die voldoet aan de vereisten van de AVG.`,
  },
  {
    title: "7. Bewaartermijnen",
    content: `Wij bewaren je persoonsgegevens niet langer dan noodzakelijk:

• **Offerteaanvragen**: maximaal 12 maanden na de laatste activiteit.
• **Contactformulier**: maximaal 6 maanden na afhandeling van je vraag.
• **Configuratiegegevens**: worden lokaal in je browser opgeslagen en niet door ons bewaard op onze servers.
• **Analytische gegevens**: maximaal 26 maanden (geanonimiseerd).
• **Fiscale gegevens**: 7 jaar conform wettelijke bewaarplicht.`,
  },
  {
    title: "8. Je rechten",
    content: `Op grond van de AVG heb je de volgende rechten:

• **Recht op inzage**: je kunt opvragen welke gegevens wij van je verwerken.
• **Recht op rectificatie**: je kunt onjuiste gegevens laten corrigeren.
• **Recht op verwijdering**: je kunt verzoeken je gegevens te laten verwijderen.
• **Recht op beperking**: je kunt de verwerking van je gegevens laten beperken.
• **Recht op dataportabiliteit**: je kunt je gegevens in een gestructureerd formaat ontvangen.
• **Recht op bezwaar**: je kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang.
• **Recht om toestemming in te trekken**: je kunt eerder gegeven toestemming altijd intrekken.

Je kunt je verzoek indienen via info@zorgwoningvergelijker.nl. Wij reageren binnen 30 dagen. Je hebt altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (www.autoriteitpersoonsgegevens.nl).`,
  },
  {
    title: "9. Cookies",
    content: `Onze website maakt gebruik van cookies:

**Functionele cookies (altijd actief)**
Deze zijn noodzakelijk voor het functioneren van de website, zoals het onthouden van je configuratiekeuzes en voorkeuren.

**Analytische cookies (met toestemming)**
Wij gebruiken analytische cookies om inzicht te krijgen in het gebruik van onze website. Deze gegevens worden geanonimiseerd verwerkt.

**Marketing cookies (met toestemming)**
Deze cookies worden alleen geplaatst als je hier uitdrukkelijk toestemming voor geeft. Zij worden gebruikt om relevante advertenties te tonen.

Je kunt je cookievoorkeuren op elk moment aanpassen via de cookie-instellingen onderaan de pagina. Je kunt cookies ook verwijderen via je browserinstellingen.`,
  },
  {
    title: "10. Beveiliging",
    content: `Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Hieronder vallen onder andere:

• SSL/TLS-versleuteling van alle dataverkeer
• Toegangsbeperking tot persoonsgegevens (need-to-know basis)
• Regelmatige beveiligingsaudits
• Veilige opslag binnen de EU/EER`,
  },
  {
    title: "11. Wijzigingen",
    content: `Wij behouden ons het recht voor dit privacybeleid te wijzigen. De meest recente versie is altijd beschikbaar op deze pagina. Bij substantiële wijzigingen informeren wij je via de website.

Laatste update: februari 2026`,
  },
  {
    title: "12. Contact",
    content: `Heb je vragen over dit privacybeleid of over de verwerking van je persoonsgegevens? Neem dan contact met ons op:

Zorgwoningvergelijker.nl
Vanadiumweg 11A, 3812 PX Amersfoort
E-mail: info@zorgwoningvergelijker.nl
Telefoon: +31 85 004 11 59`,
  },
];

export default function PrivacybeleidPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Privacybeleid" },
            ]}
          />
        </Container>
      </section>

      {/* Content */}
      <section className="section-white section-padding wave-to-dark">
        <Container>
          <div className="text-center mb-14">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
              Privacybeleid
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hoe wij omgaan met je persoonsgegevens: transparant, veilig en
              conform de Algemene Verordening Gegevensbescherming (AVG).
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-semibold text-heading-3 tracking-tight text-dark mb-4">
                  {section.title}
                </h2>
                <div className="text-body text-gray-600 leading-relaxed whitespace-pre-line prose-strong:text-dark prose-strong:font-semibold">
                  {section.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i} className="text-dark font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
