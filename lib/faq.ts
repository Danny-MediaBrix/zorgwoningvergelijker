import { FAQItem } from "./types";

export interface FAQCategorie {
  naam: string;
  slug: string;
  items: FAQItem[];
}

export const faqCategorieen: FAQCategorie[] = [
  {
    naam: "Algemeen",
    slug: "algemeen",
    items: [
      {
        vraag: "Wat is Zorgwoningvergelijker?",
        antwoord:
          "Zorgwoningvergelijker is een onafhankelijk platform dat je helpt bij het vinden van de juiste modulaire woning. Of je nu op zoek bent naar een tiny house, mantelzorgwoning, prefab woning of flexwoning, wij vergelijken aanbieders op prijs, kwaliteit en levertijd. Via onze configurator kun je je droomwoning samenstellen en direct offertes aanvragen bij gekwalificeerde bouwers.",
      },
      {
        vraag: "Hoe werkt Zorgwoningvergelijker?",
        antwoord:
          "Het proces is eenvoudig: je kiest eerst het type woning dat je zoekt en configureert deze naar je wensen via onze stapsgewijze configurator. Op basis van je specificaties berekenen wij een indicatieve prijsrange en tonen wij aanbieders die gespecialiseerd zijn in je type woning. Je kunt vervolgens gratis en vrijblijvend offertes aanvragen bij \u00e9\u00e9n of meerdere aanbieders.",
      },
      {
        vraag: "Is Zorgwoningvergelijker gratis?",
        antwoord:
          "Ja, het gebruik van Zorgwoningvergelijker is volledig gratis voor consumenten en organisaties. Je betaalt niets voor het configureren van je woning, het vergelijken van aanbieders of het aanvragen van offertes. Wij worden gefinancierd door een kleine vergoeding van aanbieders wanneer zij via ons platform een opdracht krijgen.",
      },
      {
        vraag: "Hoe snel ontvang ik een offerte?",
        antwoord:
          "Na het indienen van je configuratie streven wij ernaar dat aanbieders binnen 48 uur reageren. De snelheid hangt af van de complexiteit van je wensen en de beschikbaarheid van de aanbieder. Je ontvangt doorgaans binnen enkele werkdagen een of meerdere offertes van geselecteerde aanbieders.",
      },
      {
        vraag: "Is Zorgwoningvergelijker onafhankelijk?",
        antwoord:
          "Ja, Zorgwoningvergelijker is volledig onafhankelijk en niet verbonden aan een specifieke aanbieder of fabrikant. Wij selecteren aanbieders op basis van kwaliteit, betrouwbaarheid en klanttevredenheid. Onze prijsindicaties en vergelijkingen zijn objectief en transparant, zodat je altijd een eerlijk beeld krijgt van je mogelijkheden.",
      },
    ],
  },
  {
    naam: "Configurator",
    slug: "configurator",
    items: [
      {
        vraag: "Hoe werkt de configurator?",
        antwoord:
          "De configurator leidt je stap voor stap door het samenstellen van je woning. Je begint met het kiezen van een woningtype en afmetingen, waarna je opties selecteert voor het dak, de gevel, isolatie, verwarming en afwerking. Bij elke keuze zie je direct de impact op de geschatte prijs. Aan het einde ontvang je een compleet overzicht van je configuratie.",
      },
      {
        vraag: "Hoe nauwkeurig is de prijsindicatie?",
        antwoord:
          "De prijsindicatie in de configurator is gebaseerd op marktgemiddelden 2025/2026 en geeft een bandbreedte weer van de laagste tot de hoogste verwachte prijs. Werkelijke kosten zijn afhankelijk van aanbieder, locatie, grondwerk, fundering, transport en aansluitingen. Beschouw de indicatie als een goede richtprijs om aanbieders te vergelijken. Vraag altijd een offerte op maat aan.",
      },
      {
        vraag: "Kan ik mijn keuzes later nog wijzigen?",
        antwoord:
          "Absoluut, je kunt op elk moment tijdens het configuratieproces teruggaan naar eerdere stappen en je keuzes aanpassen. Ook na het opslaan van een configuratie kun je deze opnieuw openen en wijzigen. Pas nadat je een offerte hebt aangevraagd en geaccepteerd, worden eventuele wijzigingen in overleg met de aanbieder besproken.",
      },
      {
        vraag: "Wat gebeurt er na het indienen van mijn configuratie?",
        antwoord:
          "Nadat je je configuratie hebt ingediend, wordt deze doorgestuurd naar de aanbieders die je hebt geselecteerd. Zij bekijken je wensen en nemen binnen enkele werkdagen contact met je op met een persoonlijke offerte. Je bent nergens aan gebonden en kunt de offertes rustig vergelijken voordat je een beslissing neemt.",
      },
    ],
  },
  {
    naam: "Aanbieders",
    slug: "aanbieders",
    items: [
      {
        vraag: "Hoe worden aanbieders geselecteerd?",
        antwoord:
          "Alle aanbieders op ons platform doorlopen een selectieproces. Wij controleren onder andere de KvK-registratie, referenties van eerdere klanten en de kwaliteit van geleverde woningen. Daarnaast monitoren wij doorlopend de klanttevredenheid en verwijderen wij aanbieders die niet aan onze kwaliteitsnormen voldoen.",
      },
      {
        vraag: "Zijn de aanbieders gecertificeerd?",
        antwoord:
          "Wij streven ernaar dat alle aanbieders op ons platform beschikken over relevante certificeringen zoals SKG-IKOB, KOMO of een vergelijkbaar kwaliteitskeurmerk. Bij elk aanbiedersprofiel kun je zien welke certificeringen zij bezitten. Niet alle certificeringen zijn verplicht, maar wij geven duidelijk aan welke keurmerken een aanbieder heeft.",
      },
      {
        vraag: "Kan ik zelf een aanbieder kiezen?",
        antwoord:
          "Ja, je hebt altijd de vrijheid om zelf te bepalen bij welke aanbieders je een offerte aanvraagt. Wij tonen je een selectie van aanbieders die passen bij je configuratie en werkgebied, maar de uiteindelijke keuze is geheel aan jou. Je kunt ook meerdere offertes aanvragen om de beste prijs-kwaliteitverhouding te vinden.",
      },
    ],
  },
  {
    naam: "Kosten",
    slug: "kosten",
    items: [
      {
        vraag: "Wat zijn de gemiddelde kosten van een modulaire woning?",
        antwoord:
          "De kosten vari\u00ebren sterk afhankelijk van het type woning, de grootte en het afwerkingsniveau. Een tiny house kost gemiddeld tussen de \u20ac35.000 en \u20ac85.000, een mantelzorgwoning tussen \u20ac40.000 en \u20ac120.000, en een prefab woning tussen \u20ac80.000 en \u20ac250.000. Gebruik onze configurator voor een nauwkeurigere prijsindicatie op basis van je specifieke wensen.",
      },
      {
        vraag: "Zijn er verborgen kosten?",
        antwoord:
          "Wij adviseren je altijd om bij de aanbieder te vragen naar een compleet kostenoverzicht. Naast de bouwkosten kunnen er bijkomende kosten zijn voor de fundering, aansluiting op nutsvoorzieningen, transport, kraanwerk en eventuele vergunningsleges. Een goede aanbieder is transparant over alle kosten en neemt deze op in de offerte.",
      },
      {
        vraag: "Welke financieringsmogelijkheden zijn er?",
        antwoord:
          "Voor modulaire woningen zijn er verschillende financieringsmogelijkheden. Bij een permanent geplaatste woning kun je in veel gevallen een hypotheek afsluiten. Voor een mantelzorgwoning zijn er speciale leenvormen beschikbaar. Sommige aanbieders bieden ook huur- of leaseopties aan. Wij adviseren je om met een financi\u00ebl adviseur te spreken over de mogelijkheden voor je situatie.",
      },
      {
        vraag: "Is de BTW inbegrepen in de prijsindicatie?",
        antwoord:
          "De prijsindicaties op onze website zijn inclusief 21% BTW, tenzij anders vermeld. Bij een offerte van de aanbieder wordt altijd duidelijk aangegeven of de prijzen inclusief of exclusief BTW zijn. Let op: bij nieuwbouw kan onder bepaalde voorwaarden het verlaagde BTW-tarief van toepassing zijn. Raadpleeg hiervoor je belastingadviseur.",
      },
    ],
  },
  {
    naam: "Vergunningen",
    slug: "vergunningen",
    items: [
      {
        vraag: "Heb ik een vergunning nodig?",
        antwoord:
          "Of je een vergunning nodig hebt, hangt af van het type woning, de grootte en de locatie. Veel kleinere bouwwerken zoals tuinkamers en mantelzorgwoningen tot 50m2 kunnen vergunningsvrij worden geplaatst onder bepaalde voorwaarden. Voor grotere woningen is doorgaans een omgevingsvergunning vereist. Wij helpen je graag om dit uit te zoeken.",
      },
      {
        vraag: "Wat is vergunningsvrij bouwen?",
        antwoord:
          "Vergunningsvrij bouwen betekent dat je geen omgevingsvergunning hoeft aan te vragen bij de gemeente. Dit is mogelijk voor bijgebouwen en aanbouwen die voldoen aan specifieke eisen qua afmetingen, hoogte en afstand tot de erfgrens. Sinds 2024 gelden er ruimere regels voor mantelzorgwoningen. Let op: vergunningsvrij betekent niet regelvrij, je moet nog steeds voldoen aan het Bouwbesluit.",
      },
      {
        vraag: "Hoe lang duurt een vergunningsprocedure?",
        antwoord:
          "Een reguliere omgevingsvergunning heeft een wettelijke beslistermijn van 8 weken, die eenmalig met 6 weken kan worden verlengd. In de praktijk duurt het traject van aanvraag tot verlening gemiddeld 10 tot 14 weken. Bij een uitgebreide vergunningsprocedure, bijvoorbeeld bij afwijking van het bestemmingsplan, kan dit oplopen tot 6 maanden. Sommige aanbieders bieden begeleiding bij de vergunningsaanvraag aan.",
      },
    ],
  },
];

export const alleFAQItems: FAQItem[] = faqCategorieen.flatMap(
  (categorie) => categorie.items
);
