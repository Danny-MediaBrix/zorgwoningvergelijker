import { WoningType, WoningCategorie } from "./types";

export const categorieLabels: Record<WoningCategorie, string> = {
  "kleinschalig-wonen": "Kleinschalig Wonen",
  "zorg-mantelzorg": "Zorg & Mantelzorg",
  "recreatie-vakantie": "Recreatie & Vakantie",
  "reguliere-woningbouw": "Reguliere Woningbouw",
  overig: "Overig",
};

export const woningtypen: WoningType[] = [
  // ==================== 1. TINY HOUSE ====================
  {
    slug: "tiny-house",
    naam: "Tiny House",
    categorie: "kleinschalig-wonen",
    categorieLabel: "Kleinschalig Wonen",
    tagline: "Compact en duurzaam wonen op klein formaat",
    beschrijving:
      "Een tiny house is een compacte, volledig uitgeruste woning tussen 15 en 50 m². Ideaal voor wie bewust kleiner wil wonen met een minimale ecologische voetafdruk. Tiny houses worden in de fabriek gebouwd en op locatie geplaatst, meestal op schroefpalen. Ze zijn vaak verplaatsbaar en voldoen aan moderne energienormen.",
    prijsVanaf: 39000,
    defaultM2: 30,
    minM2: 15,
    maxM2: 50,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1500,
    basisPrijsPerM2Hoog: 3500,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 12,
        minM2: 8,
        maxM2: 20,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 5,
        minM2: 3,
        maxM2: 10,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 4,
        minM2: 3,
        maxM2: 6,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 9,
        minM2: 6,
        maxM2: 15,
      },
    ],
    seo: {
      title: "Tiny House Kopen? Prijzen Vanaf €25.000 (2026)",
      description:
        "Ontdek alles over tiny houses: prijzen, bouwtijd & vergunningen ✓ Vergelijk aanbieders & ontvang gratis offertes ➜ Configureer nu!",
      primaryKeyword: "tiny house kopen",
      secondaryKeywords: [
        "tiny house prijzen",
        "tiny house nederland",
        "tiny house bouwen",
        "klein wonen",
      ],
    },
    specificaties: {
      typischeAfmetingen: "3×10m tot 4×12m",
      gemiddeldeBouwtijd: "8-16 weken",
      levensduur: "30-50 jaar",
      energielabel: "A tot A+++",
      fundering: "Schroefpalen, betonpoeren of stelconplaten",
      vergunning: "Vergunningsplichtig (omgevingsvergunning)",
      verplaatsbaar: "Ja, mits op schroefpalen",
      geschiktVoor: "Permanent wonen, starters, senioren",
      aantalKamers: "1 slaapkamer, open woonkeuken, badkamer",
    },
    voordelen: [
      "Lage bouw- en onderhoudskosten",
      "Minimale ecologische voetafdruk",
      "Vaak verplaatsbaar",
      "Snel te realiseren",
      "Geschikt voor diverse locaties",
    ],
    nadelen: [
      "Beperkte leefruimte",
      "Vergunningsvereisten variëren per gemeente",
      "Beperkte opslagruimte",
      "Niet geschikt voor grote gezinnen",
    ],
    faq: [
      {
        vraag: "Wat kost een tiny house gemiddeld?",
        antwoord:
          "Een tiny house kost gemiddeld tussen de €39.000 en €175.000, afhankelijk van de grootte, materialen en afwerking. Een basismodel van 20 m² begint rond €39.000, terwijl een volledig uitgerust model van 50 m² tot €175.000 kan kosten. De prijs per vierkante meter ligt doorgaans tussen €1.500 en €3.500. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Heb ik een vergunning nodig voor een tiny house?",
        antwoord:
          "In de meeste gevallen heb je een omgevingsvergunning nodig voor het plaatsen van een tiny house. De regelgeving verschilt per gemeente en is afhankelijk van de locatie en het bestemmingsplan. Sommige gemeenten hebben speciale tiny house-kavels beschikbaar waar het plaatsen eenvoudiger is.",
      },
      {
        vraag: "Hoe groot is een tiny house?",
        antwoord:
          "Een tiny house heeft doorgaans een oppervlakte tussen de 15 en 50 vierkante meter. De meest voorkomende maat is rond de 30 m², wat voldoende ruimte biedt voor een woonkamer, keuken, badkamer en slaapgedeelte. Op wielen mag een tiny house maximaal 3,5 meter breed zijn vanwege transportregels.",
      },
      {
        vraag: "Hoe lang gaat een tiny house mee?",
        antwoord:
          "Een goed gebouwd tiny house gaat 30 tot 50 jaar mee, afhankelijk van de gebruikte materialen en het onderhoud. Houtskeletbouw met kwalitatieve isolatie en een goede dampscherm kan decennia lang probleemloos functioneren. Regelmatig onderhoud aan de buitenzijde verlengt de levensduur aanzienlijk.",
      },
      {
        vraag: "Kan een tiny house volledig off-grid functioneren?",
        antwoord:
          "Ja, veel tiny houses kunnen volledig off-grid functioneren met zonnepanelen, regenwatersystemen en compostettoiletten. De compacte omvang maakt het energieverbruik laag, waardoor een bescheiden zonne-installatie vaak volstaat. Houd er rekening mee dat off-grid oplossingen extra investeringskosten met zich meebrengen.",
      },
    ],
  },

  // ==================== 2. MICRO-WONING ====================
  {
    slug: "micro-woning",
    naam: "Micro-woning",
    categorie: "kleinschalig-wonen",
    categorieLabel: "Kleinschalig Wonen",
    tagline: "De slimme keuze tussen tiny house en reguliere woning",
    beschrijving:
      "Een micro-woning is de meest compacte woningvorm, typisch 15 tot 30 m². Alles is slim geïntegreerd: de woonkamer, keuken en slaapgedeelte vormen één slimme leefruimte. Perfect als tijdelijke huisvesting, starterswoning of mantelzorgoplossing.",
    prijsVanaf: 35000,
    defaultM2: 45,
    minM2: 15,
    maxM2: 30,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 950,
    basisPrijsPerM2Hoog: 2500,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 16,
        minM2: 10,
        maxM2: 25,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 7,
        minM2: 4,
        maxM2: 12,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 5,
        minM2: 2,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Micro-woning Kopen? Prijzen & Modellen (2026)",
      description:
        "Alles over micro-woningen: compact wonen vanaf €35.000 ✓ Vergelijk aanbieders & ontvang gratis offertes ➜ Configureer op maat!",
      primaryKeyword: "micro-woning kopen",
      secondaryKeywords: [
        "micro woning prijzen",
        "kleine woning bouwen",
        "compact wonen",
        "micro-woning nederland",
      ],
    },
    specificaties: {
      typischeAfmetingen: "5×9m tot 6×10m",
      gemiddeldeBouwtijd: "10-16 weken",
      levensduur: "30-50 jaar",
      energielabel: "A tot A++",
      fundering: "Schroefpalen, betonpoeren of stelconplaten",
      vergunning: "Vergunningsplichtig voor bewoning",
      verplaatsbaar: "Ja, in geheel verplaatsbaar",
      geschiktVoor: "1-persoonshuishouden, starters, tijdelijk",
      aantalKamers: "Studio met slaaploft, badkamer",
    },
    voordelen: [
      "Meer ruimte dan tiny house, nog steeds betaalbaar",
      "Geschikt voor 1-2 personen",
      "Volwaardige voorzieningen",
      "Energiezuinig",
    ],
    nadelen: [
      "Beperkt voor gezinnen",
      "Minder verplaatsbaar dan tiny house",
      "Vereist vaak bouwvergunning",
    ],
    faq: [
      {
        vraag: "Wat is het verschil tussen een micro-woning en een tiny house?",
        antwoord:
          "Een micro-woning is doorgaans groter dan een <a href=\"/tiny-house\" class=\"text-primary font-medium hover:underline\">tiny house</a>, met een oppervlakte tussen 30 en 60 m² tegenover 15-50 m² voor een tiny house. Micro-woningen hebben vaker een vaste fundering en zijn minder vaak verplaatsbaar. Ze bieden meer comfort en leefruimte, waaronder een aparte hal en ruimere kamers.",
      },
      {
        vraag: "Voor wie is een micro-woning geschikt?",
        antwoord:
          "Micro-woningen zijn ideaal voor starters, alleenstaanden, senioren en stellen zonder kinderen. Ze bieden voldoende ruimte voor 1-2 personen met alle moderne voorzieningen. Ook als tijdelijke woning tijdens een scheiding of als starterswoning zijn ze zeer geschikt.",
      },
      {
        vraag: "Wat zijn de kosten van een micro-woning?",
        antwoord:
          "De kosten van een micro-woning beginnen vanaf circa €45.000 voor een basismodel en kunnen oplopen tot €180.000 voor een luxe uitvoering. De prijs per vierkante meter ligt tussen €1.400 en €3.000, afhankelijk van de afwerking en materialen. Bijkomende kosten voor fundering en aansluiting op nutsvoorzieningen bedragen gemiddeld €5.000 tot €15.000. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Kan ik een hypotheek krijgen voor een micro-woning?",
        antwoord:
          "Bij een micro-woning op een vaste locatie met eigen grond is een hypotheek vaak mogelijk. De woning moet dan wel voldoen aan de eisen van het Bouwbesluit en een bouwvergunning hebben. Sommige banken bieden speciale financieringsopties voor kleine woningen aan.",
      },
      {
        vraag: "Welke eisen stelt de gemeente aan een micro-woning?",
        antwoord:
          "De eisen variëren per gemeente, maar over het algemeen moet een micro-woning voldoen aan het Bouwbesluit en het bestemmingsplan. Je hebt doorgaans een omgevingsvergunning nodig voor de bouw. Steeds meer gemeenten creëren speciale locaties voor kleinschalige woonvormen.",
      },
    ],
  },

  // ==================== 3. MANTELZORGWONING ====================
  {
    slug: "mantelzorgwoning",
    naam: "Mantelzorgwoning",
    categorie: "zorg-mantelzorg",
    categorieLabel: "Zorg & Mantelzorg",
    tagline: "Zelfstandig wonen dichtbij je naasten",
    beschrijving:
      "Een mantelzorgwoning is een zelfstandige woning die je in de tuin of op het erf plaatst voor een familielid dat zorg nodig heeft. Onder voorwaarden tot 100 m² vergunningsvrij te plaatsen. Prefab modellen worden in enkele dagen opgebouwd en zijn volledig zelfredzaam met eigen keuken, badkamer en slaapkamer.",
    prijsVanaf: 50000,
    defaultM2: 60,
    minM2: 25,
    maxM2: 100,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1400,
    basisPrijsPerM2Hoog: 3000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 18,
        minM2: 12,
        maxM2: 30,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 8,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 6,
        minM2: 4,
        maxM2: 10,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 14,
        minM2: 8,
        maxM2: 20,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 4,
        minM2: 2,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Mantelzorgwoning Kopen? Prijzen & Vergunning",
      description:
        "Ontdek alles over mantelzorgwoningen: vergunningsvrij plaatsen, Wmo & kosten ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "mantelzorgwoning kopen",
      secondaryKeywords: [
        "mantelzorgwoning prijzen",
        "mantelzorgwoning vergunning",
        "mantelzorgwoning plaatsen",
        "zorgwoning in tuin",
      ],
    },
    specificaties: {
      typischeAfmetingen: "5×10m tot 8×10m",
      gemiddeldeBouwtijd: "8-14 weken",
      levensduur: "30-50 jaar",
      energielabel: "A tot A++",
      fundering: "Betonplaat, schroefpalen of strookfundering",
      vergunning: "Vergunningsvrij tot 100 m² (voorwaarden)",
      verplaatsbaar: "Ja (prefab modellen)",
      geschiktVoor: "Mantelzorg, ouderen, zorgbehoevenden",
      aantalKamers: "1-2 slaapkamers, woonkeuken, badkamer",
    },
    voordelen: [
      "Zelfstandig wonen dicht bij mantelzorger",
      "Vaak vergunningsvrij te plaatsen",
      "Kan WMO-vergoeding mogelijk zijn",
      "Privacy voor beide partijen",
      "Snelle realisatie",
    ],
    nadelen: [
      "Vereist voldoende ruimte op het erf",
      "Moet worden verwijderd als mantelzorgsituatie stopt",
      "Waardevermindering bij doorverkoop hoofdwoning",
    ],
    faq: [
      {
        vraag: "Wanneer mag ik een mantelzorgwoning vergunningsvrij plaatsen?",
        antwoord:
          "Een mantelzorgwoning mag vergunningsvrij worden geplaatst als er sprake is van een mantelzorgrelatie en de woning in het achtererfgebied staat. De woning mag maximaal 50% van het achtererf beslaan tot een maximum van 100 m². Je moet de noodzaak van mantelzorg kunnen aantonen, bijvoorbeeld met een medische verklaring.",
      },
      {
        vraag: "Kan ik een WMO-vergoeding krijgen voor een mantelzorgwoning?",
        antwoord:
          "Via de Wet Maatschappelijke Ondersteuning (WMO) kun je bij je gemeente een vergoeding aanvragen voor woningaanpassingen ten behoeve van mantelzorg. De vergoeding varieert per gemeente en is afhankelijk van je persoonlijke situatie. Het is raadzaam om vooraf contact op te nemen met het WMO-loket van je gemeente.",
      },
      {
        vraag: "Wat kost een mantelzorgwoning?",
        antwoord:
          "Een mantelzorgwoning kost gemiddeld tussen de €40.000 en €256.000, afhankelijk van grootte en uitvoering. De prijs per vierkante meter varieert van €1.200 tot €3.200. Daarnaast komen er kosten bij voor transport, plaatsing, fundering en aansluiting op nutsvoorzieningen. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Welke eisen gelden er voor de plaatsing van een mantelzorgwoning?",
        antwoord:
          "De mantelzorgwoning moet op het erf van de hoofdwoning worden geplaatst en mag niet groter zijn dan 100 m² bij vergunningsvrij bouwen. Er moet sprake zijn van een aantoonbare mantelzorgsituatie. De woning moet voldoen aan het Bouwbesluit voor wat betreft veiligheid, gezondheid en bruikbaarheid.",
      },
      {
        vraag: "Wat gebeurt er met de mantelzorgwoning als de zorg stopt?",
        antwoord:
          "Als de mantelzorgsituatie eindigt, vervalt de vergunningsvrije status van de woning. De gemeente kan dan eisen dat de woning wordt verwijderd of dat je alsnog een omgevingsvergunning aanvraagt. Veel prefab mantelzorgwoningen zijn ontworpen om eenvoudig verplaatst of verwijderd te worden.",
      },
    ],
  },

  // ==================== 4. KANGOEROEWONING ====================
  {
    slug: "kangoeroewoning",
    naam: "Kangoeroewoning",
    categorie: "zorg-mantelzorg",
    categorieLabel: "Zorg & Mantelzorg",
    tagline: "Twee huishoudens onder één dak",
    beschrijving:
      "Een kangoeroewoning combineert twee zelfstandige wooneenheden onder één dak of op één kavel. Ideaal voor meergeneratiewonen: ouders en kinderen wonen zelfstandig maar dichtbij. De extra eenheid kan als prefab unit in de tuin worden geplaatst of als aanbouw worden gerealiseerd.",
    prijsVanaf: 50000,
    defaultM2: 80,
    minM2: 40,
    maxM2: 120,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1500,
    basisPrijsPerM2Hoog: 3200,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer (eenheid 1)",
        defaultM2: 18,
        minM2: 12,
        maxM2: 30,
      },
      {
        type: "keuken",
        naam: "Keuken (eenheid 1)",
        defaultM2: 8,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer (eenheid 1)",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer (eenheid 1)",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "woonkamer",
        naam: "Woonkamer (eenheid 2)",
        defaultM2: 18,
        minM2: 12,
        maxM2: 30,
      },
      {
        type: "keuken",
        naam: "Keuken (eenheid 2)",
        defaultM2: 8,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer (eenheid 2)",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer (eenheid 2)",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
    ],
    supportsModules: true,
    defaultModuleCount: 2,
    maxModules: 2,
    moduleLabel: "Eenheid",
    presetModules: [
      {
        naam: "Eenheid 1",
        kamers: [
          { type: "woonkamer", naam: "Woonkamer", defaultM2: 18, minM2: 12, maxM2: 30 },
          { type: "keuken", naam: "Keuken", defaultM2: 8, minM2: 5, maxM2: 14 },
          { type: "badkamer", naam: "Badkamer", defaultM2: 5, minM2: 3, maxM2: 8 },
          { type: "slaapkamer", naam: "Slaapkamer", defaultM2: 12, minM2: 8, maxM2: 18 },
        ],
      },
      {
        naam: "Eenheid 2",
        kamers: [
          { type: "woonkamer", naam: "Woonkamer", defaultM2: 18, minM2: 12, maxM2: 30 },
          { type: "keuken", naam: "Keuken", defaultM2: 8, minM2: 5, maxM2: 14 },
          { type: "badkamer", naam: "Badkamer", defaultM2: 5, minM2: 3, maxM2: 8 },
          { type: "slaapkamer", naam: "Slaapkamer", defaultM2: 12, minM2: 8, maxM2: 18 },
        ],
      },
    ],
    seo: {
      title: "Kangoeroewoning: Twee Woningen Onder Één Dak",
      description:
        "Alles over kangoeroewoningen: samen wonen met privacy vanaf €70.000 ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "kangoeroewoning kopen",
      secondaryKeywords: [
        "kangoeroewoning prijzen",
        "meergeneratiewoning",
        "kangoeroewoning bouwen",
        "twee woningen onder een dak",
      ],
    },
    specificaties: {
      typischeAfmetingen: "8\u00D710m tot 10\u00D715m",
      gemiddeldeBouwtijd: "12-20 weken",
      levensduur: "40-60 jaar",
      energielabel: "A tot A++",
      fundering: "Betonplaat of schroefpalen (per eenheid)",
      vergunning: "Vergunningsvrij als mantelzorgwoning; anders vergunningsplichtig",
      verplaatsbaar: "Prefab units: ja. Aanbouw: nee",
      geschiktVoor: "Meergeneratiewonen, mantelzorg, senioren",
      aantalKamers: "Per eenheid: 1-2 slaapkamers, woonkamer, keuken, badkamer",
    },
    voordelen: [
      "Twee zelfstandige wooneenheden met eigen voorzieningen",
      "Privacy voor beide huishoudens",
      "Ideaal voor mantelzorg en meergeneratiewonen",
      "Gedeelde bouwkosten en grondkosten",
      "Sociale veiligheid door nabijheid van familie",
    ],
    nadelen: [
      "Hogere initi\u00EBle bouwkosten dan een enkele woning",
      "Complexere vergunningsprocedure",
      "Vereist grotere kavel",
      "Minder flexibel bij wijziging woonsituatie",
    ],
    faq: [
      {
        vraag: "Wat is een kangoeroewoning precies?",
        antwoord:
          "Een kangoeroewoning is een woning met twee zelfstandige wooneenheden onder \u00E9\u00E9n dak, elk met eigen voorzieningen zoals keuken, badkamer en eigen ingang. De naam komt van het kangoeroeprincipe: een kleiner verblijf zit in of aan een groter verblijf. Het is ideaal voor ouders met volwassen kinderen of voor mantelzorgsituaties.",
      },
      {
        vraag: "Heb ik een speciale vergunning nodig voor een kangoeroewoning?",
        antwoord:
          "Ja, voor een kangoeroewoning heb je doorgaans een omgevingsvergunning nodig omdat er sprake is van twee wooneenheden. Het bestemmingsplan moet meerdere wooneenheden op het perceel toestaan. Sommige gemeenten stimuleren kangoeroe\u00ADwoningen en hebben vereenvoudigde procedures hiervoor.",
      },
      {
        vraag: "Wat kost een kangoeroewoning?",
        antwoord:
          "Een kangoeroewoning kost gemiddeld tussen €95.000 en €450.000, afhankelijk van de grootte en afwerking van beide eenheden. De prijs per vierkante meter ligt tussen €1.500 en €3.000. In vergelijking met twee losse woningen bespaar je aanzienlijk op grond- en bouwkosten. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Kan ik mijn bestaande woning ombouwen tot kangoeroewoning?",
        antwoord:
          "Ja, het is mogelijk om een bestaande woning om te bouwen tot kangoeroewoning door een zelfstandige wooneenheid toe te voegen. Dit kan via een interne verbouwing of via een aanbouw. Hiervoor heb je een omgevingsvergunning nodig en moet het bestemmingsplan dit toestaan.",
      },
      {
        vraag: "Wat zijn de belastingvoordelen van een kangoeroewoning?",
        antwoord:
          "Bij een kangoeroewoning kunnen beide huishoudens profiteren van eigen hypotheekrenteaftrek als de eenheden voldoende zelfstandig zijn. De WOZ-waarde wordt per eenheid bepaald, wat voordelig kan uitpakken. Raadpleeg een belastingadviseur voor je specifieke situatie.",
      },
    ],
  },

  // ==================== 5. CHALET ====================
  {
    slug: "chalet",
    naam: "Chalet",
    categorie: "recreatie-vakantie",
    categorieLabel: "Recreatie & Vakantie",
    tagline: "Genieten van natuur met alle comfort",
    beschrijving:
      "Een chalet is een prefab recreatiewoning, populair op vakantieparken en campings. Beschikbaar in diverse formaten van 30 tot 100 m\u00B2. Moderne chalets zijn goed ge\u00EFsoleerd, voorzien van triple glas en voldoen aan de energielabelverplichting sinds 2024.",
    prijsVanaf: 35000,
    defaultM2: 50,
    minM2: 30,
    maxM2: 120,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1200,
    basisPrijsPerM2Hoog: 2200,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 20,
        minM2: 12,
        maxM2: 35,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 8,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 10,
        minM2: 6,
        maxM2: 16,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 5,
        minM2: 2,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Chalet Kopen? Prijzen, Modellen & Tips (2026)",
      description:
        "Ontdek chalets vanaf €25.000: diverse modellen, materialen & stijlen ✓ Vergelijk aanbieders ➜ Configureer je droomchalet!",
      primaryKeyword: "chalet kopen",
      secondaryKeywords: [
        "chalet prijzen",
        "houten chalet",
        "chalet vakantiepark",
        "recreatiechalet",
      ],
    },
    specificaties: {
      typischeAfmetingen: "6\u00D710m tot 8\u00D715m",
      gemiddeldeBouwtijd: "8-14 weken",
      levensduur: "25-40 jaar",
      energielabel: "B tot A+",
      fundering: "Betonpoeren, betonplaat of schroefpalen",
      vergunning: "Vergunningsplichtig (eenvoudiger op recreatieterrein)",
      verplaatsbaar: "Beperkt (speciaal transport)",
      geschiktVoor: "Recreatie, vakantieverhuur, permanent wonen",
      aantalKamers: "1-3 slaapkamers, woonkeuken, badkamer",
    },
    voordelen: [
      "Sfeervolle houten uitstraling",
      "Breed assortiment aan modellen en stijlen",
      "Geschikt voor recreatief en permanent gebruik",
      "Relatief snel te plaatsen",
      "Goede prijs-kwaliteitverhouding",
    ],
    nadelen: [
      "Houten constructie vereist regelmatig onderhoud",
      "Niet altijd geschikt voor permanent wonen",
      "Beperkte isolatie bij goedkopere modellen",
      "Bestemmingsplan beperkingen op veel locaties",
    ],
    faq: [
      {
        vraag: "Wat kost een chalet gemiddeld?",
        antwoord:
          "Een chalet kost gemiddeld tussen de €40.000 en €336.000, afhankelijk van de grootte, het type hout en de afwerking. Een standaard recreatiechalet van 60 m² kost doorgaans tussen €72.000 en €168.000. Luxe uitvoeringen met hoogwaardige isolatie en afwerking liggen aan de bovenkant van dit spectrum. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Mag ik permanent in een chalet wonen?",
        antwoord:
          "Of je permanent in een chalet mag wonen, hangt af van het bestemmingsplan en de locatie. Op de meeste vakantieparken is permanente bewoning niet toegestaan. Op eigen grond met een woonbestemming is permanente bewoning wel mogelijk, mits het chalet voldoet aan het Bouwbesluit.",
      },
      {
        vraag: "Welk houtsoort is het beste voor een chalet?",
        antwoord:
          "De meest gebruikte houtsoorten voor chalets zijn Scandinavisch vuren, Douglas en Siberisch lariks. Siberisch lariks is het meest duurzaam en heeft de langste levensduur zonder behandeling. Douglas biedt een goede balans tussen prijs en kwaliteit en verweert naar een mooie grijze tint.",
      },
      {
        vraag: "Hoe lang duurt het bouwen van een chalet?",
        antwoord:
          "De bouwtijd van een chalet varieert van 8 tot 14 weken, afhankelijk van de grootte en complexiteit. Prefab chalets die in de fabriek worden geproduceerd, kunnen zelfs in enkele dagen op locatie worden geplaatst. Maatwerkprojecten met speciale wensen duren over het algemeen langer.",
      },
      {
        vraag: "Welk onderhoud heeft een chalet nodig?",
        antwoord:
          "Een houten chalet moet elke 3 tot 5 jaar worden behandeld met een goede houtbeits of lak om het hout te beschermen. Controleer jaarlijks op vochtproblemen, schimmel en houtrot, vooral bij de onderzijde en aansluitingen. Goed onderhoud verlengt de levensduur van je chalet aanzienlijk en voorkomt kostbare reparaties.",
      },
    ],
  },

  // ==================== 6. LODGE ====================
  {
    slug: "lodge",
    naam: "Lodge",
    categorie: "recreatie-vakantie",
    categorieLabel: "Recreatie & Vakantie",
    tagline: "Luxe verblijven in een natuurlijke omgeving",
    beschrijving:
      "Een lodge is een stijlvolle, compacte recreatiewoning die vaak volledig geprefabriceerd wordt geleverd. Lodges zijn populair voor vakantieverhuur en als B&B. Met hun moderne uitstraling en goede isolatie bieden ze een comfortabel verblijf het hele jaar door.",
    prijsVanaf: 45000,
    defaultM2: 70,
    minM2: 30,
    maxM2: 70,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1500,
    basisPrijsPerM2Hoog: 2800,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 25,
        minM2: 15,
        maxM2: 40,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 10,
        minM2: 6,
        maxM2: 16,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 6,
        minM2: 4,
        maxM2: 10,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 14,
        minM2: 10,
        maxM2: 22,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "terras",
        naam: "Terras",
        defaultM2: 8,
        minM2: 4,
        maxM2: 20,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 5,
        minM2: 2,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Lodge Kopen? Luxe Modellen Vanaf €55.000",
      description:
        "Ontdek luxe lodges: premium materialen, ruime indelingen & vakantiegevoel ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "lodge kopen",
      secondaryKeywords: [
        "lodge prijzen",
        "luxe lodge",
        "lodge vakantiepark",
        "lodge bouwen",
      ],
    },
    specificaties: {
      typischeAfmetingen: "8\u00D710m tot 10\u00D715m",
      gemiddeldeBouwtijd: "10-18 weken",
      levensduur: "30-50 jaar",
      energielabel: "A tot A++",
      fundering: "Schroefpalen, betonpoeren of betonplaat",
      vergunning: "Vergunningsplichtig",
      verplaatsbaar: "Ja, volledig geprefabriceerd",
      geschiktVoor: "Recreatie, vakantieverhuur, B&B",
      aantalKamers: "1-2 slaapkamers, woonkeuken, badkamer",
    },
    voordelen: [
      "Luxe uitstraling en hoogwaardige afwerking",
      "Uitstekende isolatie en comfort",
      "Geschikt als investering voor verhuur",
      "Duurzame materialen en lange levensduur",
      "Ruime en lichte leefruimtes",
    ],
    nadelen: [
      "Hogere aanschafkosten dan een standaard chalet",
      "Onderhoud van luxe afwerking kan kostbaar zijn",
      "Niet altijd geschikt voor permanente bewoning",
      "Vergunningsplichtig op de meeste locaties",
    ],
    faq: [
      {
        vraag: "Wat is het verschil tussen een lodge en een chalet?",
        antwoord:
          "Een lodge onderscheidt zich van een <a href=\"/chalet\" class=\"text-primary font-medium hover:underline\">chalet</a> door een hogere standaard afwerking en luxere voorzieningen. Lodges hebben doorgaans grotere raampartijen, een moderner design en hoogwaardiger isolatie. De prijs per vierkante meter ligt bij een lodge dan ook hoger dan bij een standaard chalet.",
      },
      {
        vraag: "Wat kost een lodge gemiddeld?",
        antwoord:
          "Een lodge kost gemiddeld tussen de €70.000 en €480.000, afhankelijk van de grootte en het luxeniveau. Een standaard lodge van 80 m² kost doorgaans tussen €112.000 en €256.000. Luxe uitvoeringen met designkeuken, wellness-badkamer en smart home-systemen kunnen aanzienlijk duurder uitvallen. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Is een lodge een goede investering voor verhuur?",
        antwoord:
          "Ja, een lodge kan een uitstekende investering zijn voor vakantieverhuur vanwege de luxe uitstraling en het hogere prijssegment. Op populaire vakantieparken kunnen de verhuurinkomsten een aanzienlijk rendement opleveren. Houd rekening met beheerkosten, belastingen en seizoensgebonden bezettingsgraden.",
      },
      {
        vraag: "Hoe lang duurt de bouw van een lodge?",
        antwoord:
          "De bouwtijd van een lodge varieert van 10 tot 18 weken, afhankelijk van de omvang en de mate van maatwerk. Prefab lodges worden grotendeels in de fabriek geproduceerd, wat de plaatsingstijd op locatie verkort. Complexe ontwerpen met veel maatwerk kunnen langer duren.",
      },
      {
        vraag: "Welke materialen worden gebruikt voor een lodge?",
        antwoord:
          "Lodges worden doorgaans gebouwd met een combinatie van hout, staal en glas voor een luxe uitstraling. Populaire houtsoorten zijn Thermowood, accoya en Western red cedar vanwege hun duurzaamheid. Moderne lodges maken vaak gebruik van grote glaspartijen voor maximaal daglicht en uitzicht op de natuur.",
      },
    ],
  },

  // ==================== 7. VAKANTIEBUNGALOW ====================
  {
    slug: "vakantiebungalow",
    naam: "Vakantiebungalow",
    categorie: "recreatie-vakantie",
    categorieLabel: "Recreatie & Vakantie",
    tagline: "De perfecte vakantiewoning voor het hele gezin",
    beschrijving:
      "Een vakantiebungalow is een ruime, gelijkvloerse recreatiewoning. Met een oppervlakte van 50 tot 140 m\u00B2 biedt een bungalow voldoende ruimte voor het hele gezin. Nieuwbouw bungalows moeten voldoen aan BENG-eisen en hebben standaard een energielabel A of beter.",
    prijsVanaf: 80000,
    defaultM2: 80,
    minM2: 50,
    maxM2: 140,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1400,
    basisPrijsPerM2Hoog: 3000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 22,
        minM2: 14,
        maxM2: 35,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 9,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 10,
        minM2: 6,
        maxM2: 16,
      },
      {
        type: "berging",
        naam: "Berging",
        defaultM2: 4,
        minM2: 2,
        maxM2: 8,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 4,
        minM2: 2,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Vakantiebungalow Kopen? Prijzen & Modellen",
      description:
        "Alles over vakantiebungalows vanaf €40.000: modellen, bouwtijd & locaties ✓ Vergelijk aanbieders ➜ Configureer op maat!",
      primaryKeyword: "vakantiebungalow kopen",
      secondaryKeywords: [
        "vakantiebungalow prijzen",
        "recreatiebungalow",
        "bungalow vakantiepark",
        "bungalow bouwen",
      ],
    },
    specificaties: {
      typischeAfmetingen: "7\u00D710m tot 10\u00D713m",
      gemiddeldeBouwtijd: "10-16 weken",
      levensduur: "30-50 jaar",
      energielabel: "B tot A+",
      fundering: "Betonplaat of strookfundering",
      vergunning: "Vergunningsplichtig (omgevingsvergunning)",
      verplaatsbaar: "Nee (vast op fundering)",
      geschiktVoor: "Recreatie, vakantieverhuur, permanent wonen",
      aantalKamers: "2-4 slaapkamers, 1-2 badkamers, woonkeuken",
    },
    voordelen: [
      "Gelijkvloers wonen, geschikt voor alle leeftijden",
      "Ruim genoeg voor het hele gezin",
      "Breed aanbod aan stijlen en indelingen",
      "Goede verhuurmogelijkheden op vakantieparken",
      "Relatief lage onderhoudskosten",
    ],
    nadelen: [
      "Groter grondoppervlak nodig dan een woning met verdieping",
      "Permanente bewoning vaak niet toegestaan op vakantieparken",
      "Standaardmodellen bieden beperkt maatwerk",
      "Isolatie kan tegenvallen bij budgetmodellen",
    ],
    faq: [
      {
        vraag: "Wat kost een vakantiebungalow?",
        antwoord:
          "Een vakantiebungalow kost gemiddeld tussen de €50.000 en €364.000, afhankelijk van de grootte en afwerking. Een standaard bungalow van 70 m² kost doorgaans tussen €84.000 en €196.000. Bijkomende kosten voor kavel, fundering en nutsaansluitingen komen hier nog bij. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Is een vakantiebungalow geschikt voor permanente bewoning?",
        antwoord:
          "Op vakantieparken is permanente bewoning meestal niet toegestaan volgens het bestemmingsplan. Op eigen grond met woonbestemming kun je wel permanent in een bungalow wonen, mits deze voldoet aan het Bouwbesluit. Controleer altijd vooraf de lokale regelgeving bij je gemeente.",
      },
      {
        vraag: "Welke stijlen vakantiebungalows zijn er?",
        antwoord:
          "Er zijn diverse stijlen beschikbaar, van klassiek houten bungalows tot moderne strakke ontwerpen. Populaire stijlen zijn Scandinavisch, landelijk, modern en cottage. Elke stijl heeft zijn eigen kenmerken qua materiaalgebruik, dakvorm en kleurstelling.",
      },
      {
        vraag: "Hoe lang gaat een vakantiebungalow mee?",
        antwoord:
          "Een kwalitatieve vakantiebungalow gaat 30 tot 50 jaar mee bij goed onderhoud. De levensduur hangt af van de gebruikte materialen, de kwaliteit van de constructie en de mate van onderhoud. Regelmatig schilderwerk en controle op vochtproblemen verlengen de levensduur aanzienlijk.",
      },
      {
        vraag: "Kan ik een vakantiebungalow verhuren?",
        antwoord:
          "Ja, veel vakantiebungalows worden succesvol verhuurd via vakantieparken of platforms als Booking.com en Airbnb. De verhuurinkomsten zijn afhankelijk van de locatie, het seizoen en de kwaliteit van de bungalow. Houd rekening met btw, inkomstenbelasting en eventuele parkbijdragen bij het berekenen van het rendement.",
      },
    ],
  },

  // ==================== 8. PREFAB WONING ====================
  {
    slug: "prefab-woning",
    naam: "Prefab Woning",
    categorie: "reguliere-woningbouw",
    categorieLabel: "Reguliere Woningbouw",
    tagline: "Snel en betaalbaar een volwaardige woning",
    beschrijving:
      "Een prefab woning wordt grotendeels in de fabriek geproduceerd en op locatie gemonteerd. Dit levert een kortere bouwtijd, minder bouwafval en consistentere kwaliteit op. Prefab woningen zijn volledig vergelijkbaar met traditionele bouw qua levensduur (50-100 jaar) en voldoen standaard aan BENG-eisen.",
    prijsVanaf: 120000,
    defaultM2: 120,
    minM2: 50,
    maxM2: 250,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1800,
    basisPrijsPerM2Hoog: 3000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 30,
        minM2: 18,
        maxM2: 50,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 12,
        minM2: 8,
        maxM2: 20,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 7,
        minM2: 4,
        maxM2: 12,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 14,
        minM2: 10,
        maxM2: 22,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 3",
        defaultM2: 10,
        minM2: 6,
        maxM2: 16,
      },
      {
        type: "berging",
        naam: "Berging",
        defaultM2: 6,
        minM2: 3,
        maxM2: 12,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 8,
        minM2: 4,
        maxM2: 14,
      },
      {
        type: "wasruimte",
        naam: "Wasruimte",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
    ],
    seo: {
      title: "Prefab Woning Kopen? Snel & Betaalbaar (2026)",
      description:
        "Ontdek prefab woningen vanaf €75.000: snel gebouwd, energiezuinig & duurzaam ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "prefab woning kopen",
      secondaryKeywords: [
        "prefab woning prijzen",
        "prefab huis bouwen",
        "fabriekswoning",
        "prefab woning nederland",
      ],
    },
    specificaties: {
      typischeAfmetingen: "8\u00D715m tot 10\u00D725m",
      gemiddeldeBouwtijd: "4-8 maanden",
      levensduur: "50-100 jaar",
      energielabel: "A tot A+++",
      fundering: "Betonplaat, strookfundering of heipalen",
      vergunning: "Vergunningsplichtig (omgevingsvergunning)",
      verplaatsbaar: "Nee (permanent op fundering)",
      geschiktVoor: "Permanent wonen, gezinswoningen",
      aantalKamers: "2-5 slaapkamers, 1-2 badkamers, woonkeuken",
    },
    voordelen: [
      "Korte bouwtijd door fabrieksproductie",
      "Constante kwaliteit door gecontroleerd productieproces",
      "Lagere bouwkosten dan traditionele bouw",
      "Energiezuinig en goed ge\u00EFsoleerd",
      "Minder overlast op de bouwplaats",
    ],
    nadelen: [
      "Beperktere architectonische vrijheid dan traditionele bouw",
      "Transport van grote modules vereist goede bereikbaarheid",
      "Aanpassingen na plaatsing zijn kostbaar",
      "Perceptie van lagere kwaliteit (onterecht bij goede fabrikanten)",
    ],
    faq: [
      {
        vraag: "Wat kost een prefab woning?",
        antwoord:
          "Een prefab woning kost gemiddeld tussen de €170.000 en €750.000, afhankelijk van de grootte en het afwerkingsniveau. De prijs per vierkante meter ligt tussen €1.800 en €3.000. Dit is doorgaans 10-20% goedkoper dan vergelijkbare traditionele nieuwbouw. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Hoe snel is een prefab woning gebouwd?",
        antwoord:
          "De totale bouwtijd van een prefab woning bedraagt 12 tot 20 weken, inclusief fundering en afwerking. De fabrieksproductie van de modules duurt 4 tot 8 weken, waarna de plaatsing op locatie slechts 1 tot 3 dagen in beslag neemt. De resterende tijd gaat op aan fundering, installaties en afwerking.",
      },
      {
        vraag: "Is een prefab woning even goed als een traditioneel gebouwde woning?",
        antwoord:
          "Ja, moderne prefab woningen zijn kwalitatief gelijkwaardig of zelfs beter dan traditionele bouw. Door de gecontroleerde fabrieksomgeving is de bouwkwaliteit constanter en zijn er minder weersinvloeden tijdens de bouw. Prefab woningen voldoen aan dezelfde bouwnormen en eisen als traditionele woningen.",
      },
      {
        vraag: "Kan ik een prefab woning naar eigen wens laten ontwerpen?",
        antwoord:
          "De meeste prefab woningbouwers bieden een breed scala aan modellen die je kunt aanpassen aan je wensen. Je kunt doorgaans kiezen uit verschillende indelingen, materialen, kleuren en afwerkingsniveaus. Volledig maatwerk is ook mogelijk, maar dit verhoogt de kosten en levertijd.",
      },
      {
        vraag: "Heb ik een bouwvergunning nodig voor een prefab woning?",
        antwoord:
          "Ja, voor een prefab woning heb je een omgevingsvergunning nodig, net als voor een traditioneel gebouwde woning. De vergunningsaanvraag verloopt via dezelfde procedure en moet voldoen aan het bestemmingsplan en het Bouwbesluit. Veel prefab bouwers bieden ondersteuning bij het vergunningstraject aan.",
      },
    ],
  },

  // ==================== 9. SYSTEEMWONING ====================
  {
    slug: "systeemwoning",
    naam: "Systeemwoning",
    categorie: "reguliere-woningbouw",
    categorieLabel: "Reguliere Woningbouw",
    tagline: "Bewezen bouwsysteem voor betrouwbaar resultaat",
    beschrijving:
      "Een systeemwoning is een gestandaardiseerde, fabrieksmatig geproduceerde woning met typegoedkeuring. Dit versnelt het vergunningproces en garandeert een consistente bouwkwaliteit. Systeemwoningen worden veel ingezet voor sociale huur en projectmatige woningbouw.",
    prijsVanaf: 150000,
    defaultM2: 110,
    minM2: 50,
    maxM2: 200,
    verdiepingen: "1-3",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1800,
    basisPrijsPerM2Hoog: 3000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 28,
        minM2: 16,
        maxM2: 45,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 10,
        minM2: 6,
        maxM2: 18,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 6,
        minM2: 4,
        maxM2: 10,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 14,
        minM2: 10,
        maxM2: 22,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "berging",
        naam: "Berging",
        defaultM2: 5,
        minM2: 3,
        maxM2: 10,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 6,
        minM2: 3,
        maxM2: 10,
      },
    ],
    supportsModules: true,
    defaultModuleCount: 1,
    maxModules: 4,
    moduleLabel: "Module",
    seo: {
      title: "Systeemwoning Kopen? Snel & Betaalbaar Wonen",
      description:
        "Alles over systeemwoningen vanaf €55.000: gestandaardiseerde kwaliteit & snelle bouw ✓ Vergelijk aanbieders ➜ Configureer nu!",
      primaryKeyword: "systeemwoning kopen",
      secondaryKeywords: [
        "systeemwoning prijzen",
        "systeembouw woning",
        "gestandaardiseerde woning",
        "systeemwoning nederland",
      ],
    },
    specificaties: {
      typischeAfmetingen: "7\u00D714m tot 10\u00D730m",
      gemiddeldeBouwtijd: "6-12 maanden",
      levensduur: "50-100 jaar",
      energielabel: "A tot A++",
      fundering: "Betonplaat, strookfundering of heipalen",
      vergunning: "Vergunningsplichtig (typegoedkeuring versnelt)",
      verplaatsbaar: "Nee (permanent gebouwd)",
      geschiktVoor: "Permanent wonen, sociale huur, projectbouw",
      aantalKamers: "3-5 slaapkamers, 1-2 badkamers, woonkeuken",
    },
    voordelen: [
      "Bewezen bouwsysteem met constante kwaliteit",
      "Betaalbaar door standaardisatie en schaalvoordelen",
      "Snellere bouwtijd dan traditionele bouw",
      "Geschikt voor diverse woninggroottes",
      "Flexibel in indeling binnen het systeem",
    ],
    nadelen: [
      "Minder architectonische vrijheid dan maatwerk",
      "Uitbreiding achteraf kan beperkingen kennen",
      "Standaard uiterlijk kan eenvormig ogen",
      "Niet alle systemen zijn even duurzaam",
    ],
    faq: [
      {
        vraag: "Wat is het verschil tussen een systeemwoning en een prefab woning?",
        antwoord:
          "Een systeemwoning maakt gebruik van gestandaardiseerde bouwcomponenten die op locatie worden geassembleerd, terwijl een <a href=\"/prefab-woning\" class=\"text-primary font-medium hover:underline\">prefab woning</a> als complete modules in de fabriek wordt gebouwd. Systeemwoningen bieden over het algemeen meer flexibiliteit in ontwerp binnen het modulaire systeem. Beide methoden zijn sneller en vaak goedkoper dan traditionele bouw.",
      },
      {
        vraag: "Wat kost een systeemwoning?",
        antwoord:
          "Een systeemwoning kost gemiddeld tussen de €85.000 en €840.000, afhankelijk van de grootte en het afwerkingsniveau. De prijs per vierkante meter ligt tussen €1.600 en €2.800. Grotere projecten en herhaalbouwwoningen profiteren van extra schaalvoordelen. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Hoe lang duurt het bouwen van een systeemwoning?",
        antwoord:
          "De bouwtijd van een systeemwoning bedraagt gemiddeld 14 tot 24 weken, afhankelijk van de grootte en complexiteit. De gestandaardiseerde componenten verkorten de bouwtijd aanzienlijk ten opzichte van traditionele bouw. Van ontwerp tot sleuteloverdracht duurt het gehele traject doorgaans 6 tot 12 maanden.",
      },
      {
        vraag: "Kan ik een systeemwoning later uitbreiden?",
        antwoord:
          "Uitbreiding van een systeemwoning is mogelijk, maar afhankelijk van het gebruikte bouwsysteem. Sommige systemen zijn specifiek ontworpen voor modulaire uitbreiding. Het is verstandig om bij de aanschaf al rekening te houden met mogelijke toekomstige uitbreidingen.",
      },
      {
        vraag: "Is een systeemwoning geschikt voor een groot gezin?",
        antwoord:
          "Ja, systeemwoningen zijn beschikbaar in diverse groottes, van 50 m² tot meer dan 300 m², en zijn daarmee zeer geschikt voor grote gezinnen. Met meerdere verdiepingen en ruime indelingen kun je een woning samenstellen die past bij de omvang van je gezin. Veel aanbieders bieden speciale gezinswoningen aan met 4 of meer slaapkamers.",
      },
    ],
  },

  // ==================== 10. FLEXWONING ====================
  {
    slug: "flexwoning",
    naam: "Flexwoning",
    categorie: "reguliere-woningbouw",
    categorieLabel: "Reguliere Woningbouw",
    tagline: "Snel beschikbare woonoplossing",
    beschrijving:
      "Een flexwoning is ontworpen om verplaatst te kunnen worden. Ze worden tijdelijk geplaatst (max 15 jaar op dezelfde locatie) en zijn ideaal voor spoedzoekers, starters of als mantelzorgoplossing. Flexwoningen worden fabrieksmatig geproduceerd en zijn snel te plaatsen.",
    prijsVanaf: 45000,
    defaultM2: 50,
    minM2: 30,
    maxM2: 100,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1200,
    basisPrijsPerM2Hoog: 2000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 22,
        minM2: 14,
        maxM2: 35,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 8,
        minM2: 5,
        maxM2: 14,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 5,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 12,
        minM2: 8,
        maxM2: 18,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer 2",
        defaultM2: 10,
        minM2: 6,
        maxM2: 16,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 4,
        minM2: 2,
        maxM2: 8,
      },
    ],
    supportsModules: true,
    defaultModuleCount: 1,
    maxModules: 3,
    moduleLabel: "Module",
    seo: {
      title: "Flexwoning Kopen? Verplaatsbaar & Betaalbaar",
      description:
        "Ontdek flexwoningen vanaf €40.000: snel plaatsbaar, verplaatsbaar & duurzaam ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "flexwoning kopen",
      secondaryKeywords: [
        "flexwoning prijzen",
        "flexwoning huren",
        "verplaatsbare woning",
        "flexwoning gemeente",
      ],
    },
    specificaties: {
      typischeAfmetingen: "6\u00D712m tot 8\u00D715m",
      gemiddeldeBouwtijd: "8-14 weken",
      levensduur: "30-50 jaar",
      energielabel: "A tot A++",
      fundering: "Schroefpalen of betonplaten (herbruikbaar)",
      vergunning: "Vergunningsplichtig (tijdelijk, max 15 jaar)",
      verplaatsbaar: "Ja, ontworpen voor verplaatsing",
      geschiktVoor: "Tijdelijke huisvesting, starters, spoedzoekers",
      aantalKamers: "1-4 slaapkamers, woonkeuken, badkamer",
    },
    voordelen: [
      "Zeer snelle realisatie en plaatsing",
      "Verplaatsbaar naar andere locaties",
      "Betaalbare woonoplossing",
      "Geschikt voor tijdelijke en permanente bewoning",
      "Draagt bij aan het oplossen van het woningtekort",
    ],
    nadelen: [
      "Beperktere keuze in ontwerp en indeling",
      "Soms geassocieerd met tijdelijke huisvesting",
      "Restwaarde afhankelijk van staat en leeftijd",
      "Locatie kan tijdelijk zijn (huurcontracten grond)",
    ],
    faq: [
      {
        vraag: "Wat is een flexwoning precies?",
        antwoord:
          "Een flexwoning is een verplaatsbare, fabrieksmatig geproduceerde woning die snel op locatie geplaatst kan worden. Ze zijn ontworpen om na een bepaalde periode eventueel verplaatst te worden naar een andere locatie. Flexwoningen voldoen aan dezelfde kwaliteitseisen als reguliere woningen en zijn geschikt voor permanente bewoning.",
      },
      {
        vraag: "Wat kost een flexwoning?",
        antwoord:
          "Een flexwoning kost gemiddeld tussen de €49.500 en €300.000, afhankelijk van de grootte en afwerking. De prijs per vierkante meter ligt tussen €1.300 en €2.500. Bij grotere aantallen voor gemeentelijke projecten zijn de kosten per woning aanzienlijk lager door schaalvoordelen. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Hoe snel kan een flexwoning geplaatst worden?",
        antwoord:
          "Een flexwoning kan binnen 8 tot 14 weken gerealiseerd worden, van bestelling tot bewoning. De productie in de fabriek duurt 4 tot 8 weken, de plaatsing op locatie slechts 1 tot 2 dagen. Dit maakt flexwoningen ideaal voor situaties waar snel woonruimte nodig is.",
      },
      {
        vraag: "Kan een flexwoning echt verplaatst worden?",
        antwoord:
          "Ja, flexwoningen zijn specifiek ontworpen om verplaatsbaar te zijn. Ze worden als geheel of in modules getransporteerd naar een nieuwe locatie. De verplaatsingskosten bedragen doorgaans €10.000 tot €30.000, afhankelijk van de grootte en de afstand.",
      },
      {
        vraag: "Zijn flexwoningen geschikt voor gezinnen?",
        antwoord:
          "Ja, flexwoningen zijn beschikbaar in diverse groottes en zijn zeer geschikt voor gezinnen. Modellen van 70 m² en groter bieden ruimte voor meerdere slaapkamers, een ruime woonkamer en volledige keuken. De woonkwaliteit is vergelijkbaar met een reguliere woning.",
      },
    ],
  },

  // ==================== 11. CONTAINERWONING ====================
  {
    slug: "containerwoning",
    naam: "Containerwoning",
    categorie: "reguliere-woningbouw",
    categorieLabel: "Reguliere Woningbouw",
    tagline: "Industrieel wonen met karakter",
    beschrijving:
      "Een containerwoning is een woning gebouwd van (getransformeerde) zeecontainers of op containermaat geproduceerde modules. Containerwoningen zijn snel te plaatsen, relatief betaalbaar en eenvoudig te verplaatsen. Ze worden steeds vaker ingezet als betaalbare starterswoning of tijdelijke huisvesting.",
    prijsVanaf: 25000,
    defaultM2: 30,
    minM2: 15,
    maxM2: 60,
    verdiepingen: "1-2",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1000,
    basisPrijsPerM2Hoog: 2000,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woonkamer",
        defaultM2: 10,
        minM2: 6,
        maxM2: 40,
      },
      {
        type: "keuken",
        naam: "Keuken",
        defaultM2: 5,
        minM2: 3,
        maxM2: 15,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 4,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "slaapkamer",
        naam: "Slaapkamer",
        defaultM2: 9,
        minM2: 6,
        maxM2: 20,
      },
    ],
    supportsModules: true,
    defaultModuleCount: 2,
    maxModules: 6,
    moduleLabel: "Container",
    presetModules: [
      {
        naam: "Container 1",
        defaultBreedte: 2.5,
        defaultDiepte: 6,
        kamers: [
          { type: "woonkamer", naam: "Woonkamer", defaultM2: 8, minM2: 6, maxM2: 12 },
          { type: "keuken", naam: "Keuken", defaultM2: 5, minM2: 3, maxM2: 8 },
        ],
      },
      {
        naam: "Container 2",
        defaultBreedte: 2.5,
        defaultDiepte: 6,
        kamers: [
          { type: "slaapkamer", naam: "Slaapkamer", defaultM2: 9, minM2: 6, maxM2: 12 },
          { type: "badkamer", naam: "Badkamer", defaultM2: 4, minM2: 3, maxM2: 6 },
        ],
      },
    ],
    disabledWaarden: {
      verwarmingTypes: ["warmtepomp-bodem"],
      isolatieNiveaus: ["passiefhuis"],
      funderingTypes: ["paalfundering"],
    },
    seo: {
      title: "Containerwoning Kopen? Stoer Wonen Vanaf €15.000",
      description:
        "Alles over containerwoningen: industrieel design, snelle bouw & betaalbaar ✓ Vergelijk aanbieders ➜ Configureer je containerwoning!",
      primaryKeyword: "containerwoning kopen",
      secondaryKeywords: [
        "containerwoning prijzen",
        "wonen in container",
        "zeecontainer woning",
        "containerwoning bouwen",
      ],
    },
    specificaties: {
      typischeAfmetingen: "2,4\u00D76m tot 2,4\u00D712m (per container)",
      gemiddeldeBouwtijd: "4-12 weken",
      levensduur: "25-40 jaar",
      energielabel: "B tot A+",
      fundering: "Vaak zonder fundering; bij stapeling: betonpoeren",
      vergunning: "Vergunningsplichtig (tijdelijk max 15 jaar)",
      verplaatsbaar: "Ja, eenvoudig met kraan/vrachtwagen",
      geschiktVoor: "Tijdelijke huisvesting, starters, studenten",
      aantalKamers: "Studio tot 2 slaapkamers, keukenblok, badkamer",
    },
    voordelen: [
      "Zeer betaalbaar in aanschaf",
      "Unieke industri\u00EBle uitstraling",
      "Duurzaam door hergebruik van materialen",
      "Snel te realiseren",
      "Modulair uitbreidbaar met extra containers",
    ],
    nadelen: [
      "Smalle basisvorm van standaard containers",
      "Extra isolatie noodzakelijk voor wooncomfort",
      "Vergunning kan lastig zijn door onconventioneel uiterlijk",
      "Beperkte hoogte in standaard containers",
    ],
    faq: [
      {
        vraag: "Wat kost een containerwoning?",
        antwoord:
          "Een containerwoning kost gemiddeld tussen de €20.000 en €330.000, afhankelijk van het aantal containers en de afwerking. Een enkele omgebouwde container begint rond €20.000, terwijl een volledig uitgeruste meervoudige containerwoning tot €330.000 kan kosten. De prijs per vierkante meter ligt tussen €900 en €2.200. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Hoe wordt een zeecontainer omgebouwd tot woning?",
        antwoord:
          "Een zeecontainer wordt omgebouwd door openingen te maken voor ramen en deuren, isolatie aan te brengen en de binnenruimte in te richten met wanden, vloer en plafond. De stalen constructie wordt behandeld tegen roest en voorzien van alle noodzakelijke installaties. Meerdere containers kunnen worden gecombineerd voor meer ruimte en een gevarieerder ontwerp.",
      },
      {
        vraag: "Is een containerwoning goed ge\u00EFsoleerd?",
        antwoord:
          "Standaard zeecontainers zijn niet ge\u00EFsoleerd en vereisen extra isolatie voor bewoning. Met sprayschuim, PIR-platen of minerale wol kan een uitstekende isolatiewaarde worden bereikt. Een goed ge\u00EFsoleerde containerwoning kan energielabel A+ behalen en is comfortabel bewoonbaar in alle seizoenen.",
      },
      {
        vraag: "Mag ik een containerwoning plaatsen in mijn gemeente?",
        antwoord:
          "Of je een containerwoning mag plaatsen, hangt af van het bestemmingsplan en de welstandseisen in je gemeente. Sommige gemeenten staan containerwoningen toe, terwijl anderen het onconventionele uiterlijk afwijzen. Het is raadzaam om vooraf een vooroverleg te voeren met je gemeente over de mogelijkheden.",
      },
      {
        vraag: "Kan ik meerdere containers combineren?",
        antwoord:
          "Ja, het combineren van meerdere containers is een gangbare methode om meer woonruimte te cre\u00EBren. Containers kunnen naast elkaar, op elkaar of in een L- of T-vorm worden geplaatst. Door wanden tussen containers te verwijderen ontstaan grotere ruimtes, waardoor het smalle karakter van een enkele container wordt opgeheven.",
      },
    ],
  },

  // ==================== 12. WOONUNIT ====================
  {
    slug: "woonunit",
    naam: "Woonunit",
    categorie: "overig",
    categorieLabel: "Overig",
    tagline: "Compacte woonoplossing voor elke situatie",
    beschrijving:
      "Een woonunit is een compacte, prefab woonruimte voor tijdelijk verblijf. Woonunits worden veel gebruikt bij verbouwingen, als noodhuisvesting of als starterswoning. Ze zijn volledig uitgerust met keuken, badkamer en leefruimte en kunnen binnen een dag geplaatst worden.",
    prijsVanaf: 20000,
    defaultM2: 30,
    minM2: 18,
    maxM2: 60,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 900,
    basisPrijsPerM2Hoog: 1800,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Woon/slaapkamer",
        defaultM2: 14,
        minM2: 10,
        maxM2: 25,
      },
      {
        type: "keuken",
        naam: "Keukenblok",
        defaultM2: 4,
        minM2: 3,
        maxM2: 8,
      },
      {
        type: "badkamer",
        naam: "Badkamer",
        defaultM2: 4,
        minM2: 3,
        maxM2: 6,
      },
    ],
    disabledOpties: {
      vloerverwarming: true,
    },
    disabledWaarden: {
      isolatieNiveaus: ["passiefhuis"],
      verwarmingTypes: ["warmtepomp-bodem"],
    },
    seo: {
      title: "Woonunit Kopen? Compact Wonen Vanaf €10.000",
      description:
        "Ontdek woonunits: compact, verplaatsbaar & direct beschikbaar ✓ Vergelijk aanbieders & prijzen ➜ Configureer je woonunit!",
      primaryKeyword: "woonunit kopen",
      secondaryKeywords: [
        "woonunit prijzen",
        "woonunit huren",
        "verplaatsbare woonunit",
        "tijdelijke woonruimte",
      ],
    },
    specificaties: {
      typischeAfmetingen: "3\u00D75m tot 4\u00D712m",
      gemiddeldeBouwtijd: "4-8 weken",
      levensduur: "15-30 jaar",
      energielabel: "C tot A",
      fundering: "Betonpoeren, stelconplaten of schroefpalen",
      vergunning: "Vergunningsplichtig (tijdelijk max 15 jaar)",
      verplaatsbaar: "Ja, volledig verplaatsbaar",
      geschiktVoor: "Tijdelijke huisvesting, verbouwing, noodopvang",
      aantalKamers: "1 woon/slaapkamer, keukenblok, badkamer",
    },
    voordelen: [
      "Laagste instapprijs van alle woningtypen",
      "Zeer snel beschikbaar en plaatsbaar",
      "Eenvoudig verplaatsbaar",
      "Geschikt voor tijdelijke en noodhuisvesting",
      "Minimale voorbereidingen op locatie nodig",
    ],
    nadelen: [
      "Beperkte leefruimte en comfort",
      "Lagere isolatiewaarde dan volwaardige woningen",
      "Beperkte levensduur vergeleken met andere woningtypen",
      "Niet altijd geschikt voor permanente bewoning",
    ],
    faq: [
      {
        vraag: "Wat kost een woonunit?",
        antwoord:
          "Een woonunit kost gemiddeld tussen de €15.000 en €90.000, afhankelijk van de grootte en uitvoering. Tweedehands woonunits zijn al beschikbaar vanaf €8.000, terwijl nieuwe luxere modellen tot €90.000 kosten. De prijs per vierkante meter ligt tussen €800 en €1.800. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Waarvoor wordt een woonunit gebruikt?",
        antwoord:
          "Woonunits worden gebruikt als tijdelijke woonruimte, noodhuisvesting, studentenhuisvesting of als woning voor arbeidsmigranten. Ze zijn ook populair als tijdelijke woning tijdens een verbouwing of als starterswoning. Steeds vaker worden ze ingezet door gemeenten om het woningtekort aan te pakken.",
      },
      {
        vraag: "Hoe snel kan een woonunit geplaatst worden?",
        antwoord:
          "Een woonunit kan binnen 4 tot 8 weken geleverd en geplaatst worden, inclusief aansluitingen op nutsvoorzieningen. De plaatsing zelf duurt slechts enkele uren met een kraan. Voorraadmodellen zijn soms zelfs binnen enkele dagen beschikbaar.",
      },
      {
        vraag: "Is een woonunit geschikt om permanent in te wonen?",
        antwoord:
          "Een woonunit kan geschikt zijn voor permanente bewoning, mits deze voldoet aan het Bouwbesluit en het bestemmingsplan permanente bewoning toestaat. Hogere kwaliteitsmodellen met goede isolatie en duurzame materialen zijn hiervoor het meest geschikt. Controleer altijd de lokale regelgeving bij je gemeente.",
      },
      {
        vraag: "Kan ik een woonunit huren in plaats van kopen?",
        antwoord:
          "Ja, veel leveranciers bieden woonunits aan op huurbasis, wat ideaal is voor tijdelijk gebruik. De huurprijzen vari\u00EBren van €300 tot €800 per maand, afhankelijk van de grootte en het luxeniveau. Huur is vaak voordeliger als je de unit korter dan 3 jaar nodig hebt.",
      },
    ],
  },

  // ==================== 13. TUINKAMER / BIJGEBOUW ====================
  {
    slug: "tuinkamer",
    naam: "Tuinkamer / Bijgebouw",
    categorie: "overig",
    categorieLabel: "Overig",
    tagline: "Extra ruimte in je eigen tuin",
    beschrijving:
      "Een tuinkamer of bijgebouw is een aanbouw aan je bestaande woning die extra leefruimte biedt. Ideaal als werkkamer, hobbykamer, serre of gastenverblijf. Tot 4 meter diep vaak vergunningsvrij te plaatsen. Prefab tuinkamers worden in enkele dagen gemonteerd.",
    prijsVanaf: 10000,
    defaultM2: 20,
    minM2: 10,
    maxM2: 35,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1000,
    basisPrijsPerM2Hoog: 2800,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Open ruimte",
        defaultM2: 18,
        minM2: 8,
        maxM2: 45,
      },
    ],
    disabledOpties: {
      verwarming: true,
      vloerverwarming: true,
      isolatie: true,
      keuken: true,
      badkamer: true,
      fundering: true,
    },
    seo: {
      title: "Tuinkamer Kopen? Geniet Van Extra Leefruimte",
      description:
        "Ontdek tuinkamers & bijgebouwen vanaf €10.000: vaak vergunningsvrij & diverse stijlen ✓ Vergelijk aanbieders ➜ Configureer nu!",
      primaryKeyword: "tuinkamer kopen",
      secondaryKeywords: [
        "bijgebouw tuin",
        "tuinkamer prijzen",
        "thuiskantoor tuin",
        "tuinkamer vergunningsvrij",
      ],
    },
    specificaties: {
      typischeAfmetingen: "3\u00D73m tot 5\u00D710m",
      gemiddeldeBouwtijd: "4-8 weken",
      levensduur: "20-40 jaar",
      energielabel: "N.v.t. (geen zelfstandige woning)",
      fundering: "Schroefpalen, betonpoeren of lichte betonplaat",
      vergunning: "Vergunningsvrij tot 4 m diep (voorwaarden)",
      verplaatsbaar: "Nee (aanbouw aan woning)",
      geschiktVoor: "Extra woonruimte, thuiswerken, hobbykamer",
      aantalKamers: "1 multifunctionele ruimte",
    },
    voordelen: [
      "Extra woon- of werkruimte zonder te verhuizen",
      "Vaak vergunningsvrij te plaatsen",
      "Waardevermeerdering van je woning",
      "Breed scala aan stijlen en materialen",
      "Relatief snelle en eenvoudige plaatsing",
    ],
    nadelen: [
      "Neemt tuinruimte in beslag",
      "Maximale afmetingen bij vergunningsvrij bouwen",
      "Aansluitingen op nutsvoorzieningen kunnen kostbaar zijn",
      "Niet altijd geschikt als volwaardige woonruimte",
    ],
    faq: [
      {
        vraag: "Mag ik een tuinkamer vergunningsvrij plaatsen?",
        antwoord:
          "In veel gevallen mag een tuinkamer vergunningsvrij worden geplaatst als bijgebouw in het achtererfgebied. De voorwaarden zijn dat het bijgebouw maximaal 50% van het achtererf beslaat tot een maximum totaal van 150 m² aan bijgebouwen. De bouwhoogte mag niet meer dan 3 meter bedragen bij een plat dak of 5 meter bij een schuin dak.",
      },
      {
        vraag: "Wat kost een tuinkamer of bijgebouw?",
        antwoord:
          "Een tuinkamer kost gemiddeld tussen de €10.000 en €175.000, afhankelijk van de grootte, materialen en voorzieningen. Een eenvoudig tuinkantoor van 10 m² begint rond €16.000, terwijl een luxe bijgebouw van 50 m² met alle voorzieningen tot €175.000 kan kosten. De prijs per vierkante meter ligt tussen €1.600 en €3.500. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Is een tuinkamer geschikt als thuiskantoor?",
        antwoord:
          "Ja, een tuinkamer is uitstekend geschikt als thuiskantoor. De fysieke scheiding van de hoofdwoning bevordert de concentratie en werk-priv\u00E9balans. Zorg wel voor goede isolatie, verwarming en een stabiele internetverbinding voor een comfortabele werkomgeving.",
      },
      {
        vraag: "Welke materialen zijn populair voor een tuinkamer?",
        antwoord:
          "Populaire materialen voor tuinkamers zijn hout (Douglas, Thermowood, ceder), aluminium en staal in combinatie met glas. Houten tuinkamers bieden een warme, natuurlijke uitstraling, terwijl aluminium modellen een strakker en onderhoudsarmer alternatief zijn. Moderne tuinkamers combineren vaak verschillende materialen voor een uniek ontwerp.",
      },
      {
        vraag: "Verhoogt een tuinkamer de waarde van mijn woning?",
        antwoord:
          "Ja, een kwalitatieve tuinkamer of bijgebouw kan de waarde van je woning verhogen. De waardevermeerdering is afhankelijk van de kwaliteit, de grootte en de functionaliteit van het bijgebouw. Over het algemeen levert een tuinkamer een waardevermeerdering op van 50 tot 80 procent van de investering.",
      },
    ],
  },

  // ==================== 14. MODULAIRE AANBOUW ====================
  {
    slug: "modulaire-aanbouw",
    naam: "Modulaire Aanbouw",
    categorie: "overig",
    categorieLabel: "Overig",
    tagline: "Je woning uitbreiden zonder grootschalig verbouwen",
    beschrijving:
      "Een modulaire aanbouw is een fabrieksmatig geproduceerde uitbreiding van je bestaande woning. Tot 70% sneller dan traditionele bouw, met minimale overlast. De module wordt in de fabriek gebouwd terwijl de fundering op locatie wordt voorbereid, waarna plaatsing in \u00E9\u00E9n dag kan.",
    prijsVanaf: 22000,
    defaultM2: 30,
    minM2: 10,
    maxM2: 60,
    verdiepingen: "1",
    defaultVerdiepingen: 1,
    basisPrijsPerM2Laag: 1260,
    basisPrijsPerM2Hoog: 2665,
    presetKamers: [
      {
        type: "woonkamer",
        naam: "Open ruimte",
        defaultM2: 25,
        minM2: 12,
        maxM2: 70,
      },
      {
        type: "hal",
        naam: "Hal",
        defaultM2: 5,
        minM2: 2,
        maxM2: 10,
      },
    ],
    supportsModules: true,
    defaultModuleCount: 1,
    maxModules: 3,
    moduleLabel: "Module",
    disabledOpties: {
      fundering: true,
    },
    seo: {
      title: "Modulaire Aanbouw? Vergroot Je Woning Snel",
      description:
        "Alles over modulaire aanbouw vanaf €18.000: snel geplaatst & diverse afmetingen ✓ Vergelijk aanbieders ➜ Ontvang gratis offertes!",
      primaryKeyword: "modulaire aanbouw kopen",
      secondaryKeywords: [
        "modulaire aanbouw prijzen",
        "prefab aanbouw",
        "woning uitbreiden modulair",
        "aanbouw laten plaatsen",
      ],
    },
    specificaties: {
      typischeAfmetingen: "3\u00D75m tot 8\u00D710m",
      gemiddeldeBouwtijd: "6-12 weken",
      levensduur: "40-75 jaar",
      energielabel: "A tot A++",
      fundering: "Betonplaat, schroefpalen of aansluiting op bestaande fundering",
      vergunning: "Vergunningsvrij tot 4 m diep (voorwaarden)",
      verplaatsbaar: "Deels (aansluiting op woning maakt het onpraktisch)",
      geschiktVoor: "Extra woonruimte, uitbreiding, thuiswerken",
      aantalKamers: "1-3 kamers (afhankelijk van oppervlakte)",
    },
    voordelen: [
      "Snel extra woonruimte zonder grootschalige verbouwing",
      "Prefab productie garandeert constante kwaliteit",
      "Minimale overlast tijdens plaatsing",
      "Naadloze aansluiting op bestaande woning mogelijk",
      "Breed scala aan afmetingen en afwerkingen",
    ],
    nadelen: [
      "Vereist goede aansluiting op bestaande constructie",
      "Omgevingsvergunning vaak noodzakelijk",
      "Beperkt tot begane grondvloer bij de meeste systemen",
      "Esthetische integratie met bestaande woning kan uitdagend zijn",
    ],
    faq: [
      {
        vraag: "Wat kost een modulaire aanbouw?",
        antwoord:
          "Een modulaire aanbouw kost gemiddeld tussen de €25.000 en €224.000, afhankelijk van de grootte en afwerking. De prijs per vierkante meter ligt tussen €1.400 en €2.800. Bijkomende kosten voor fundering, aansluitingen en bouwkundige aanpassingen aan de bestaande woning komen hier nog bij. Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden 2025/2026.",
      },
      {
        vraag: "Heb ik een vergunning nodig voor een modulaire aanbouw?",
        antwoord:
          "In veel gevallen heb je een omgevingsvergunning nodig voor een aanbouw aan je woning. Onder bepaalde voorwaarden kan een aanbouw vergunningsvrij zijn, bijvoorbeeld als deze aan de achterzijde wordt geplaatst en binnen de maximale afmetingen blijft. Controleer altijd vooraf de regels bij je gemeente of via het Omgevingsloket.",
      },
      {
        vraag: "Hoe lang duurt de plaatsing van een modulaire aanbouw?",
        antwoord:
          "De totale doorlooptijd van een modulaire aanbouw bedraagt 6 tot 12 weken, van bestelling tot oplevering. De prefab productie in de fabriek duurt 3 tot 6 weken, waarna de plaatsing op locatie slechts 1 tot 3 dagen kost. De resterende tijd is nodig voor fundering, aansluitingen en afwerking.",
      },
      {
        vraag: "Past een modulaire aanbouw bij elke woning?",
        antwoord:
          "Een modulaire aanbouw kan bij vrijwel elke woning worden geplaatst, mits er voldoende ruimte beschikbaar is en de constructie van de bestaande woning dit toelaat. Vooraf wordt een bouwkundige inspectie uitgevoerd om de haalbaarheid te beoordelen. De meeste aanbieders bieden maatwerkoplossingen die naadloos aansluiten op je bestaande woning.",
      },
      {
        vraag: "Verhoogt een modulaire aanbouw de waarde van mijn woning?",
        antwoord:
          "Ja, een kwalitatieve aanbouw verhoogt doorgaans de waarde van je woning. Extra woonoppervlakte is een van de belangrijkste waarde-verhogende factoren bij de WOZ-waardering. Over het algemeen levert een aanbouw een waardevermeerdering op van 60 tot 80 procent van de investering.",
      },
    ],
  },
];

export function getWoningType(slug: string): WoningType | undefined {
  return woningtypen.find((w) => w.slug === slug);
}

export function getWoningtypenByCategorie(
  categorie: WoningCategorie
): WoningType[] {
  return woningtypen.filter((w) => w.categorie === categorie);
}

export function isOptieDisabled(slug: string, optie: string): boolean {
  const wt = getWoningType(slug);
  return wt?.disabledOpties?.[optie as keyof NonNullable<WoningType["disabledOpties"]>] === true;
}

export function getFilteredOpties<T extends { value: string }>(
  slug: string,
  opties: T[],
  disabledKey: keyof NonNullable<WoningType["disabledWaarden"]>
): T[] {
  const wt = getWoningType(slug);
  const disabled = wt?.disabledWaarden?.[disabledKey] as string[] | undefined;
  if (!disabled) return opties;
  return opties.filter((o) => !disabled.includes(o.value));
}
