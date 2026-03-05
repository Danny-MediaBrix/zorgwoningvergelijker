export interface ArtikelMeta {
  slug: string;
  titel: string;
  beschrijving: string;
  seoTitle: string;
  seoBeschrijving: string;
  categorie: string;
  categorieVariant: "primary" | "secondary" | "accent" | "gray";
  leestijd: number;
  gepubliceerd: string;
  bijgewerkt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export const artikelenMeta: ArtikelMeta[] = [
  {
    slug: "hoeveel-kost-een-tiny-house",
    titel: "Wat kost een tiny house?",
    beschrijving:
      "Een kant-en-klare tiny house kost in Nederland gemiddeld tussen de €35.000 en €85.000. Ontdek alle kosten, van bouw en fundering tot transport en nutsaansluitingen.",
    seoTitle: "Wat Kost een Tiny House? Alle Prijzen (2026)",
    seoBeschrijving:
      "Een tiny house kost €35.000 tot €85.000. Ontdek alle kosten: bouw, fundering & transport ✓ Compleet overzicht ➜ Bekijk de prijzen!",
    categorie: "Kosten",
    categorieVariant: "accent",
    leestijd: 5,
    gepubliceerd: "2025-09-12",
    bijgewerkt: "2026-03-04",
    featuredImage: "/images/hoeveel-kost-een-tiny-house.jpg",
    featuredImageAlt: "Modern tiny house op een groene locatie met zonnepanelen, prijsindicatie voor een tiny house in Nederland",
  },
  {
    slug: "subsidie-mantelzorgwoning",
    titel: "Subsidie voor een mantelzorgwoning",
    beschrijving:
      "Er bestaat geen landelijke subsidie voor mantelzorgwoningen, maar er zijn wel andere financiële regelingen. Denk aan Wmo-voorzieningen, gemeentelijke subsidies en fiscale voordelen.",
    seoTitle: "Subsidie Mantelzorgwoning: Dit Kun Je Krijgen",
    seoBeschrijving:
      "Geen landelijke subsidie, maar wél Wmo, gemeentelijke regelingen & fiscale voordelen ✓ Bespaar duizenden euro's ➜ Ontdek alle opties!",
    categorie: "Financiering",
    categorieVariant: "accent",
    leestijd: 5,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/subsidie-mantelzorgwoning.jpg",
    featuredImageAlt: "Documenten en rekenmachine op tafel voor het berekenen van subsidies voor een mantelzorgwoning",
  },
  {
    slug: "hoe-groot-mag-mantelzorgwoning-zijn",
    titel: "Hoe groot mag een mantelzorgwoning zijn?",
    beschrijving:
      "Een vergunningsvrije mantelzorgwoning mag maximaal 100 m² zijn, maar er gelden meer regels. Lees alles over de maximale oppervlakte, hoogte en het achtererfgebied.",
    seoTitle: "Hoe Groot Mag een Mantelzorgwoning Zijn?",
    seoBeschrijving:
      "Vergunningsvrij mag maximaal 100 m², maar er gelden meer regels ✓ Oppervlakte, hoogte & achtererfgebied ➜ Lees alle voorwaarden!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 4,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/hoe-groot-mag-mantelzorgwoning-zijn.jpg",
    featuredImageAlt: "Mantelzorgwoning in een achtertuin met afmetingen en maatvoering, regels voor maximale oppervlakte",
  },
  {
    slug: "mantelzorgwoning-prijzen",
    titel: "Wat kost een mantelzorgwoning?",
    beschrijving:
      "Een mantelzorgwoning kost gemiddeld tussen de €50.000 en €150.000. In dit artikel vind je een compleet overzicht van prijzen per vierkante meter en handige bespaartips.",
    seoTitle: "Mantelzorgwoning Prijzen: Wat Kost Het? (2026)",
    seoBeschrijving:
      "Een mantelzorgwoning kost €50.000 tot €150.000. Ontdek prijzen per m² & bespaartips ✓ Compleet overzicht ➜ Vergelijk nu!",
    categorie: "Kosten",
    categorieVariant: "accent",
    leestijd: 4,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-prijzen.jpg",
    featuredImageAlt: "Moderne mantelzorgwoning naast een woonhuis, overzicht van kosten en prijzen per m²",
  },
  {
    slug: "wat-is-een-mantelzorgwoning",
    titel: "Wat is een mantelzorgwoning?",
    beschrijving:
      "Een mantelzorgwoning is een zelfstandige woonruimte bij of aan je huis, bedoeld voor mantelzorg. Ontdek alle vormen, regels en kosten in dit overzichtelijke artikel.",
    seoTitle: "Wat Is een Mantelzorgwoning? (Uitleg)",
    seoBeschrijving:
      "Een zelfstandige woning bij je huis voor mantelzorg. Ontdek alle vormen, regels & kosten ✓ Duidelijk uitgelegd ➜ Lees verder!",
    categorie: "Algemeen",
    categorieVariant: "gray",
    leestijd: 4,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/wat-is-een-mantelzorgwoning.jpg",
    featuredImageAlt: "Zelfstandige mantelzorgwoning naast een gezinshuis, uitleg over wat een mantelzorgwoning is",
  },
  {
    slug: "mantelzorgwoning-vergunningsvrij",
    titel: "Mantelzorgwoning vergunningsvrij plaatsen",
    beschrijving:
      "Onder bepaalde voorwaarden mag je een mantelzorgwoning vergunningsvrij plaatsen. Lees welke eisen er gelden voor oppervlakte, hoogte en de zorgrelatie.",
    seoTitle: "Mantelzorgwoning Vergunningsvrij Plaatsen",
    seoBeschrijving:
      "Onder welke voorwaarden mag je vergunningsvrij bouwen? Oppervlakte, hoogte & zorgrelatie ✓ Alle eisen op een rij ➜ Check de regels!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-vergunningsvrij.jpg",
    featuredImageAlt: "Vergunningsvrije mantelzorgwoning wordt geplaatst in een tuin, bouwregels en voorwaarden",
  },
  {
    slug: "mantelzorgwoning-in-tuin",
    titel: "Mantelzorgwoning in de tuin plaatsen",
    beschrijving:
      "In veel gevallen mag je vergunningsvrij een mantelzorgwoning in je tuin plaatsen. Lees meer over de regels, kosten en een handig stappenplan.",
    seoTitle: "Mantelzorgwoning in de Tuin: Mag Dat?",
    seoBeschrijving:
      "In veel gevallen mag je vergunningsvrij een mantelzorgwoning in je tuin plaatsen ✓ Regels, kosten & stappenplan ➜ Lees meer!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-in-tuin.jpg",
    featuredImageAlt: "Mantelzorgwoning geplaatst in een groene achtertuin naast het hoofdhuis, tuinregels en mogelijkheden",
  },
  {
    slug: "regels-mantelzorgwoning-buitengebied",
    titel: "Regels voor een mantelzorgwoning in het buitengebied",
    beschrijving:
      "In het buitengebied gelden strengere regels voor het plaatsen van een mantelzorgwoning. Lees alles over bestemmingsplannen, agrarische grond en benodigde vergunningen.",
    seoTitle: "Mantelzorgwoning Buitengebied: De Regels",
    seoBeschrijving:
      "In het buitengebied gelden strengere regels. Bestemmingsplannen, agrarische grond & vergunningen ✓ Wat mag wel? ➜ Ontdek het!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/regels-mantelzorgwoning-buitengebied.jpg",
    featuredImageAlt: "Mantelzorgwoning op een landelijk perceel in het buitengebied, regels voor bestemmingsplannen",
  },
  {
    slug: "mantelzorgwoning-na-overlijden",
    titel: "Mantelzorgwoning na overlijden: wat zijn je opties?",
    beschrijving:
      "Als de bewoner van een mantelzorgwoning overlijdt, vervalt de woonfunctie. Ontdek welke opties je hebt: verkopen, verplaatsen of een andere bestemming geven.",
    seoTitle: "Mantelzorgwoning na Overlijden: Wat Nu?",
    seoBeschrijving:
      "Bewoner overleden? De woonfunctie vervalt. Ontdek je opties: verkopen, verplaatsen of slopen ✓ Duidelijk overzicht ➜ Lees meer!",
    categorie: "Algemeen",
    categorieVariant: "gray",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-na-overlijden.jpg",
    featuredImageAlt: "Lege mantelzorgwoning in een tuin, opties na overlijden van de bewoner",
  },
  {
    slug: "mantelzorgwoning-op-agrarische-grond",
    titel: "Mantelzorgwoning op agrarische grond",
    beschrijving:
      "Een mantelzorgwoning vergunningsvrij bouwen op agrarische grond is lastig. Ontdek welke stappen je moet nemen en welke regels er gelden.",
    seoTitle: "Mantelzorgwoning op Agrarische Grond",
    seoBeschrijving:
      "Vergunningsvrij bouwen op agrarische grond is lastig. Ontdek welke stappen je moet nemen ✓ Alle regels ➜ Bekijk de mogelijkheden!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-op-agrarische-grond.jpg",
    featuredImageAlt: "Mantelzorgwoning op agrarische grond op het platteland, regels voor bouwen op landbouwgrond",
  },
  {
    slug: "voor-en-nadelen-mantelzorgwoning",
    titel: "De voor- en nadelen van een mantelzorgwoning",
    beschrijving:
      "Overweeg je een mantelzorgwoning? In dit artikel bespreken we eerlijk de voordelen en nadelen, van nabijheid en kosten tot privacy.",
    seoTitle: "Mantelzorgwoning: Voor- en Nadelen (Eerlijk)",
    seoBeschrijving:
      "Overweeg je een mantelzorgwoning? Ontdek eerlijk de voordelen & nadelen: nabijheid, kosten & privacy ➜ Maak een weloverwogen keuze!",
    categorie: "Vergelijking",
    categorieVariant: "secondary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/voor-en-nadelen-mantelzorgwoning.jpg",
    featuredImageAlt: "Senioren bij een mantelzorgwoning, vergelijking van voor- en nadelen van mantelzorgwoningen",
  },
  {
    slug: "mantelzorgwoning-regels",
    titel: "Alle regels voor een mantelzorgwoning op een rij",
    beschrijving:
      "Een compleet overzicht van alle actuele regels voor mantelzorgwoningen: vergunningseisen, maximale afmetingen, de zorgrelatie en meldingsplicht.",
    seoTitle: "Mantelzorgwoning Regels: Compleet Overzicht",
    seoBeschrijving:
      "Alle regels voor 2026 op een rij: vergunning, afmetingen, zorgrelatie & meldingsplicht ✓ Actueel overzicht ➜ Check de regels!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 4,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-regels.jpg",
    featuredImageAlt: "Bouwtekening en regelgeving voor een mantelzorgwoning, overzicht van vergunningseisen in 2026",
  },
  {
    slug: "schenkbelasting-mantelzorgwoning",
    titel: "Schenkbelasting bij een mantelzorgwoning voorkomen",
    beschrijving:
      "Als je ouders een mantelzorgwoning betalen op jouw grond, kan de fiscus dit als schenking beschouwen. Lees hoe je verrassingen voorkomt met een opstalrecht.",
    seoTitle: "Schenkbelasting Mantelzorgwoning: Voorkom Dit",
    seoBeschrijving:
      "Ouders betalen de woning op jouw grond? De fiscus ziet dit als schenking ✓ Voorkom verrassingen met een opstalrecht ➜ Lees hoe!",
    categorie: "Financiering",
    categorieVariant: "accent",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/schenkbelasting-mantelzorgwoning.jpg",
    featuredImageAlt: "Belastingformulieren en een mantelzorgwoning, fiscale gevolgen van schenking bij mantelzorg",
  },
  {
    slug: "mantelzorgwoning-eigen-huisnummer",
    titel: "Heeft een mantelzorgwoning een eigen huisnummer nodig?",
    beschrijving:
      "Een eigen huisnummer voor een mantelzorgwoning heeft gevolgen voor toeslagen en belastingen. Lees wanneer het verplicht of verstandig is.",
    seoTitle: "Mantelzorgwoning Eigen Huisnummer: Nodig?",
    seoBeschrijving:
      "Een eigen huisnummer heeft gevolgen voor toeslagen & belastingen ✓ Wanneer verplicht of verstandig? ➜ Ontdek de gevolgen!",
    categorie: "Algemeen",
    categorieVariant: "gray",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-eigen-huisnummer.jpg",
    featuredImageAlt: "Huisnummerbord bij een mantelzorgwoning, wanneer een eigen adres nodig is",
  },
  {
    slug: "mantelzorgwoning-belasting",
    titel: "Mantelzorgwoning en belasting: alle fiscale gevolgen",
    beschrijving:
      "Van inkomstenbelasting en WOZ tot schenkbelasting en toeslagen: een mantelzorgwoning heeft diverse fiscale gevolgen. Ontdek alle tips in dit artikel.",
    seoTitle: "Mantelzorgwoning & Belasting: Alle Gevolgen",
    seoBeschrijving:
      "Inkomstenbelasting, WOZ, schenkbelasting & toeslagen: een mantelzorgwoning raakt je portemonnee ✓ Alle fiscale tips ➜ Lees meer!",
    categorie: "Financiering",
    categorieVariant: "accent",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-belasting.jpg",
    featuredImageAlt: "Belastingaangifte en WOZ-beschikking naast een mantelzorgwoning, fiscale gevolgen op een rij",
  },
  {
    slug: "mantelzorgwoning-financieren",
    titel: "Een mantelzorgwoning financieren",
    beschrijving:
      "Er zijn meerdere manieren om een mantelzorgwoning te financieren: hypotheek verhogen, een persoonlijke lening of een Wmo-vergoeding. Ontdek alle opties.",
    seoTitle: "Mantelzorgwoning Financieren: Slim Aanpakken",
    seoBeschrijving:
      "Hypotheek verhogen, persoonlijke lening of Wmo-vergoeding? Ontdek alle financieringsopties ✓ Vergelijk & bespaar ➜ Bekijk de opties!",
    categorie: "Financiering",
    categorieVariant: "accent",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/mantelzorgwoning-financieren.jpg",
    featuredImageAlt: "Financieringsopties voor een mantelzorgwoning uitgewerkt, hypotheek en lening mogelijkheden",
  },
  {
    slug: "wat-is-een-tiny-house",
    titel: "Wat is een tiny house?",
    beschrijving:
      "Een tiny house is een volwaardige, compacte woning van maximaal 50 m². Ontdek alle vormen, voordelen en regels van klein wonen.",
    seoTitle: "Wat Is een Tiny House? Alles Over Klein Wonen",
    seoBeschrijving:
      "Een volwaardige woning van max 50 m² voor eenvoudig & duurzaam leven ✓ Vormen, voordelen & regels ➜ Ontdek of het bij je past!",
    categorie: "Algemeen",
    categorieVariant: "gray",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/wat-is-een-tiny-house.jpg",
    featuredImageAlt: "Houten tiny house in een natuurlijke omgeving, introductie tot compact en duurzaam wonen",
  },
  {
    slug: "tiny-house-regels",
    titel: "Regels voor een tiny house",
    beschrijving:
      "Voor een tiny house heb je vrijwel altijd een vergunning nodig. Lees alles over het bestemmingsplan, bouwbesluit en de juiste locatiekeuze.",
    seoTitle: "Tiny House Regels: Vergunning & Bestemmingsplan",
    seoBeschrijving:
      "Je hebt vrijwel altijd een vergunning nodig. Bestemmingsplan, bouwbesluit & locatiekeuze ✓ Alle regels op een rij ➜ Lees meer!",
    categorie: "Vergunning",
    categorieVariant: "primary",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/tiny-house-regels.jpg",
    featuredImageAlt: "Tiny house op een bouwlocatie met vergunningsdocumenten, regels voor tiny houses in Nederland",
  },
  {
    slug: "hoe-groot-is-een-tiny-house",
    titel: "Hoe groot is een tiny house?",
    beschrijving:
      "Een tiny house is doorgaans 15 tot 50 m² groot. Op wielen is de maximale breedte 2,60 meter en de lengte 13,60 meter. Bekijk alle afmetingen en indelingen.",
    seoTitle: "Hoe Groot Is een Tiny House? (Afmetingen)",
    seoBeschrijving:
      "Doorgaans 15 tot 50 m². Op wielen max 2,60 m breed & 13,60 m lang ✓ Alle afmetingen & indelingen ➜ Bekijk de opties!",
    categorie: "Algemeen",
    categorieVariant: "gray",
    leestijd: 3,
    gepubliceerd: "2026-03-04",
    featuredImage: "/images/hoe-groot-is-een-tiny-house.jpg",
    featuredImageAlt: "Compact tiny house interieur met slimme indeling, afmetingen en oppervlakte van een tiny house",
  },
];
