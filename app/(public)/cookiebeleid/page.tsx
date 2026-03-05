import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Cookiebeleid | Welke Cookies Gebruiken Wij?",
  description:
    "Lees welke cookies Zorgwoningvergelijker.nl gebruikt & hoe je ze beheert ✓ Transparant & duidelijk ➜ Bekijk ons cookiebeleid.",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/cookiebeleid",
  },
};

const sections = [
  {
    title: "1. Wat zijn cookies?",
    content: `Cookies zijn kleine tekstbestanden die door een website op je computer, tablet of telefoon worden opgeslagen wanneer je de website bezoekt. Ze helpen de website om je apparaat te herkennen en bepaalde informatie te onthouden, zoals je voorkeuren of instellingen.

Naast cookies bestaan er vergelijkbare technologieen, zoals localStorage. Dit is een opslagmethode in je browser die websites gebruiken om gegevens lokaal op te slaan. In dit beleid bespreken we zowel cookies als deze vergelijkbare technieken.`,
  },
  {
    title: "2. Welke cookies gebruiken wij?",
    content: `Zorgwoningvergelijker.nl streeft ernaar zo min mogelijk cookies te gebruiken. Hieronder vind je een overzicht van de cookies en vergelijkbare technieken die wij inzetten:

**Functionele cookies**
Noodzakelijk voor het goed functioneren van de website. Deze cookies worden altijd geplaatst en vereisen geen toestemming.

**Analytische cookies**
Momenteel maken wij geen gebruik van analytische cookies. Mocht dit in de toekomst veranderen, dan informeren wij je hierover en vragen wij vooraf je toestemming.

**Marketing- en trackingcookies**
Wij plaatsen geen marketing- of trackingcookies.`,
  },
  {
    title: "3. Functionele cookies",
    content: `Wij gebruiken de volgende functionele cookies en vergelijkbare technieken:

**Sessiecookies (authenticatie)**
Wanneer je inlogt op het aanbiedersportaal of het adminpaneel, wordt een sessiecookie geplaatst. Dit cookie onthoudt dat je bent ingelogd, zodat je niet bij elke pagina opnieuw hoeft in te loggen. Het sessiecookie wordt verwijderd wanneer je uitlogt of wanneer de sessie verloopt (na 30 dagen inactiviteit).

- Naam: session
- Doel: authenticatie en sessiebeheer
- Bewaartermijn: maximaal 30 dagen
- Type: HTTP-cookie

**Configurator opslag (localStorage)**
Wanneer je de woningconfigurator gebruikt, worden je configuratiekeuzes opgeslagen in de localStorage van je browser. Dit is technisch gezien geen cookie, maar een vergelijkbare techniek. Hierdoor blijven je instellingen bewaard als je de pagina verlaat en later terugkeert, zodat je niet opnieuw hoeft te beginnen.

- Naam: configurator-storage
- Doel: opslaan van configuratiekeuzes (woningtype, afmetingen, indeling, opties)
- Bewaartermijn: blijft bewaard totdat je je browsergegevens wist
- Type: localStorage (browser)

Deze gegevens worden niet naar onze servers verstuurd en zijn alleen zichtbaar voor jou.`,
  },
  {
    title: "4. Analytische cookies",
    content: `Op dit moment maakt Zorgwoningvergelijker.nl geen gebruik van analytische cookies of trackingtools zoals Google Analytics.

Mocht dit in de toekomst veranderen, dan zullen wij:

- Dit cookiebeleid bijwerken met een volledig overzicht van de gebruikte analytische cookies
- Je vooraf om toestemming vragen via een cookiebanner voordat deze cookies worden geplaatst
- Ervoor zorgen dat de gegevens waar mogelijk geanonimiseerd worden verwerkt
- Kiezen voor een privacy-vriendelijke oplossing

Wij plaatsen pas analytische cookies nadat je hiervoor uitdrukkelijk toestemming hebt gegeven.`,
  },
  {
    title: "5. Cookies van derden",
    content: `Wij proberen het gebruik van cookies van derden tot een minimum te beperken. Op dit moment worden er geen cookies van derden geplaatst op onze website.

Als wij in de toekomst diensten van derden integreren die cookies plaatsen (bijvoorbeeld voor video's, kaarten of sociale media), dan zullen wij:

- Dit duidelijk vermelden in dit cookiebeleid
- Waar nodig vooraf je toestemming vragen
- Uitleggen welke gegevens met deze derden worden gedeeld

Voor meer informatie over hoe wij omgaan met je persoonsgegevens verwijzen wij je naar ons privacybeleid.`,
  },
  {
    title: "6. Cookies beheren",
    content: `Je hebt altijd de mogelijkheid om cookies te beheren of te verwijderen. Dit kan op de volgende manieren:

**Via je browserinstellingen**
In de instellingen van je browser kun je cookies bekijken, verwijderen en blokkeren. De exacte stappen verschillen per browser:

- **Google Chrome**: Instellingen > Privacy en beveiliging > Cookies en andere sitegegevens
- **Firefox**: Instellingen > Privacy en beveiliging > Cookies en sitegegevens
- **Safari**: Voorkeuren > Privacy > Websitegegevens beheren
- **Microsoft Edge**: Instellingen > Cookies en sitemachtigingen

**localStorage wissen**
Om de configuratorgegevens te verwijderen, kun je de sitegegevens van zorgwoningvergelijker.nl wissen in je browserinstellingen. Let op: hierdoor gaan je opgeslagen configuratiekeuzes verloren.

**Gevolgen van het blokkeren van cookies**
Als je alle cookies blokkeert, kan het zijn dat bepaalde functies van de website niet goed werken. Zo kun je mogelijk niet inloggen op het aanbiedersportaal.`,
  },
  {
    title: "7. Wijzigingen in dit cookiebeleid",
    content: `Wij behouden ons het recht voor dit cookiebeleid aan te passen. Bijvoorbeeld wanneer wij nieuwe cookies gaan gebruiken of wanneer de wetgeving verandert. De meest recente versie is altijd beschikbaar op deze pagina.

Bij substantiele wijzigingen zullen wij je hierover informeren via een melding op de website.

Laatste update: maart 2026`,
  },
  {
    title: "8. Contact",
    content: `Heb je vragen over dit cookiebeleid of over het gebruik van cookies op onze website? Neem dan contact met ons op:

Zorgwoningvergelijker.nl
Vanadiumweg 11A, 3812 PX Amersfoort
E-mail: info@zorgwoningvergelijker.nl
Telefoon: +31 85 004 11 59`,
  },
];

export default function CookiebeleidPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cookiebeleid" },
            ]}
          />
        </Container>
      </section>

      {/* Content */}
      <section className="section-white section-padding wave-to-dark">
        <Container>
          <div className="text-center mb-14">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
              Cookiebeleid
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Welke cookies en vergelijkbare technieken gebruikt
              Zorgwoningvergelijker.nl en hoe kun je ze beheren?
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
