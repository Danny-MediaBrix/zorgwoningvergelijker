import { Aanbieder } from "./types";

export const aanbieders: Aanbieder[] = [
  {
    slug: "modubouw-nederland",
    naam: "ModuBouw Nederland",
    beschrijving:
      "ModuBouw Nederland is een toonaangevende producent van prefab en modulaire woningen met meer dan 15 jaar ervaring. Wij leveren hoogwaardige systeemwoningen en flexwoningen die volledig in onze fabriek worden geproduceerd voor een snelle en effici\u00ebnte plaatsing. Onze woningen voldoen aan de strengste duurzaamheidseisen en worden op maat gemaakt naar je wensen.",
    logo: "/images/aanbieders/modubouw-nederland.png",
    vestigingsplaats: "Almere",
    provincie: "Flevoland",
    werkgebied: ["Flevoland", "Noord-Holland", "Zuid-Holland", "Utrecht", "Gelderland", "Overijssel"],
    specialisaties: ["prefab-woning", "systeemwoning", "flexwoning"],
    beoordeling: 4.7,
    aantalReviews: 89,
    contactEmail: "info@modubouw-nederland.nl",
    website: "https://www.modubouw-nederland.nl",
    telefoon: "036-5234567",
    portfolio: [
      {
        titel: "Prefab gezinswoning Almere Poort",
        afbeelding: "/images/portfolio/modubouw-prefab-almere.jpg",
        woningType: "prefab-woning",
        locatie: "Almere",
      },
      {
        titel: "Flexwoningen Lelystad",
        afbeelding: "/images/portfolio/modubouw-flex-lelystad.jpg",
        woningType: "flexwoning",
        locatie: "Lelystad",
      },
      {
        titel: "Systeemwoning Huizen",
        afbeelding: "/images/portfolio/modubouw-systeem-huizen.jpg",
        woningType: "systeemwoning",
        locatie: "Huizen",
      },
      {
        titel: "Modulaire starterswoning Amersfoort",
        afbeelding: "/images/portfolio/modubouw-starter-amersfoort.jpg",
        woningType: "prefab-woning",
        locatie: "Amersfoort",
      },
    ],
  },
  {
    slug: "tinyliving-holland",
    naam: "TinyLiving Holland",
    beschrijving:
      "TinyLiving Holland ontwerpt en bouwt unieke tiny houses die functionaliteit en design combineren op een klein oppervlak. Elk tiny house wordt met de hand afgewerkt in onze werkplaats in Utrecht en is volledig zelfredzaam met zonnepanelen en waterrecycling. Wij geloven dat kleiner wonen bijdraagt aan een duurzamere en bewustere levensstijl.",
    logo: "/images/aanbieders/tinyliving-holland.png",
    vestigingsplaats: "Utrecht",
    provincie: "Utrecht",
    werkgebied: ["Utrecht", "Noord-Holland", "Zuid-Holland", "Gelderland"],
    specialisaties: ["tiny-house", "micro-woning"],
    beoordeling: 4.9,
    aantalReviews: 124,
    contactEmail: "info@tinyliving-holland.nl",
    website: "https://www.tinyliving-holland.nl",
    telefoon: "030-2345678",
    portfolio: [
      {
        titel: "Tiny House 'De Vrijheid' Utrecht",
        afbeelding: "/images/portfolio/tinyliving-vrijheid.jpg",
        woningType: "tiny-house",
        locatie: "Utrecht",
      },
      {
        titel: "Micro-woning 'Het Nestje' Hilversum",
        afbeelding: "/images/portfolio/tinyliving-nestje.jpg",
        woningType: "micro-woning",
        locatie: "Hilversum",
      },
      {
        titel: "Off-grid Tiny House Veluwe",
        afbeelding: "/images/portfolio/tinyliving-offgrid-veluwe.jpg",
        woningType: "tiny-house",
        locatie: "Veluwe",
      },
    ],
  },
  {
    slug: "zorgwoningbouw",
    naam: "ZorgWoningBouw",
    beschrijving:
      "ZorgWoningBouw is gespecialiseerd in het bouwen van mantelzorgwoningen en kangoeroewoningen die het mogelijk maken om dicht bij je dierbaren te wonen. Onze woningen zijn volledig levensloopbestendig en worden ontworpen met oog voor comfort, veiligheid en toegankelijkheid. Wij begeleiden je van vergunningsaanvraag tot en met oplevering.",
    logo: "/images/aanbieders/zorgwoningbouw.png",
    vestigingsplaats: "Eindhoven",
    provincie: "Noord-Brabant",
    werkgebied: ["Noord-Brabant", "Limburg", "Gelderland", "Zuid-Holland", "Utrecht"],
    specialisaties: ["mantelzorgwoning", "kangoeroewoning"],
    beoordeling: 4.6,
    aantalReviews: 67,
    contactEmail: "info@zorgwoningbouw.nl",
    website: "https://www.zorgwoningbouw.nl",
    telefoon: "040-2567890",
    portfolio: [
      {
        titel: "Mantelzorgwoning Eindhoven-Woensel",
        afbeelding: "/images/portfolio/zorgwoning-eindhoven.jpg",
        woningType: "mantelzorgwoning",
        locatie: "Eindhoven",
      },
      {
        titel: "Kangoeroewoning Tilburg",
        afbeelding: "/images/portfolio/zorgwoning-tilburg.jpg",
        woningType: "kangoeroewoning",
        locatie: "Tilburg",
      },
      {
        titel: "Mantelzorgunit Breda",
        afbeelding: "/images/portfolio/zorgwoning-breda.jpg",
        woningType: "mantelzorgwoning",
        locatie: "Breda",
      },
    ],
  },
  {
    slug: "ecohuizen",
    naam: "EcoHuizen",
    beschrijving:
      "EcoHuizen bouwt volledig duurzame en circulaire woningen met natuurlijke materialen zoals hout, hennep en schapenwol. Wij combineren moderne bouwtechnieken met ecologische principes om woningen te cre\u00ebren die goed zijn voor mens en milieu. Al onze woningen zijn minimaal energielabel A en veel modellen zijn volledig energieneutraal.",
    logo: "/images/aanbieders/ecohuizen.png",
    vestigingsplaats: "Groningen",
    provincie: "Groningen",
    werkgebied: ["Groningen", "Friesland", "Drenthe", "Overijssel", "Flevoland"],
    specialisaties: ["tiny-house", "prefab-woning", "containerwoning"],
    beoordeling: 4.5,
    aantalReviews: 53,
    contactEmail: "info@ecohuizen.nl",
    website: "https://www.ecohuizen.nl",
    telefoon: "050-3456789",
    portfolio: [
      {
        titel: "Eco Tiny House Groningen",
        afbeelding: "/images/portfolio/eco-tiny-groningen.jpg",
        woningType: "tiny-house",
        locatie: "Groningen",
      },
      {
        titel: "Duurzame prefab woning Assen",
        afbeelding: "/images/portfolio/eco-prefab-assen.jpg",
        woningType: "prefab-woning",
        locatie: "Assen",
      },
      {
        titel: "Container Studio Leeuwarden",
        afbeelding: "/images/portfolio/eco-container-leeuwarden.jpg",
        woningType: "containerwoning",
        locatie: "Leeuwarden",
      },
    ],
  },
  {
    slug: "vakantiebouwers",
    naam: "VakantieBouwers",
    beschrijving:
      "VakantieBouwers is de specialist in hoogwaardige recreatiewoningen, chalets en lodges voor particulieren en vakantieparken. Met meer dan 20 jaar ervaring leveren wij woningen die het hele jaar door comfortabel bewoonbaar zijn. Van luxe lodge tot gezellig chalet, wij bouwen je droomverblijf op elke gewenste locatie.",
    logo: "/images/aanbieders/vakantiebouwers.png",
    vestigingsplaats: "Harderwijk",
    provincie: "Gelderland",
    werkgebied: ["Gelderland", "Overijssel", "Utrecht", "Noord-Holland", "Flevoland", "Drenthe"],
    specialisaties: ["chalet", "lodge", "vakantiebungalow"],
    beoordeling: 4.8,
    aantalReviews: 96,
    contactEmail: "info@vakantiebouwers.nl",
    website: "https://www.vakantiebouwers.nl",
    telefoon: "0341-456789",
    portfolio: [
      {
        titel: "Luxe Lodge Veluwe",
        afbeelding: "/images/portfolio/vakantie-lodge-veluwe.jpg",
        woningType: "lodge",
        locatie: "Veluwe",
      },
      {
        titel: "Famillechalet Harderwijk",
        afbeelding: "/images/portfolio/vakantie-chalet-harderwijk.jpg",
        woningType: "chalet",
        locatie: "Harderwijk",
      },
      {
        titel: "Vakantiebungalow Ede",
        afbeelding: "/images/portfolio/vakantie-bungalow-ede.jpg",
        woningType: "vakantiebungalow",
        locatie: "Ede",
      },
      {
        titel: "Tiny Lodge Ermelo",
        afbeelding: "/images/portfolio/vakantie-tiny-ermelo.jpg",
        woningType: "lodge",
        locatie: "Ermelo",
      },
    ],
  },
  {
    slug: "flexwonen-bv",
    naam: "FlexWonen BV",
    beschrijving:
      "FlexWonen BV levert modulaire woonoplossingen voor gemeenten, woningcorporaties en projectontwikkelaars die snel betaalbare woningen nodig hebben. Onze flexwoningen en woonunits worden in de fabriek geproduceerd en kunnen binnen enkele dagen op locatie worden geplaatst. Wij bieden oplossingen voor tijdelijke \u00e9n permanente huisvesting.",
    logo: "/images/aanbieders/flexwonen-bv.png",
    vestigingsplaats: "Rotterdam",
    provincie: "Zuid-Holland",
    werkgebied: ["Zuid-Holland", "Noord-Holland", "Noord-Brabant", "Utrecht", "Zeeland"],
    specialisaties: ["flexwoning", "woonunit", "containerwoning"],
    beoordeling: 4.4,
    aantalReviews: 41,
    contactEmail: "info@flexwonen-bv.nl",
    website: "https://www.flexwonen-bv.nl",
    telefoon: "010-7654321",
    portfolio: [
      {
        titel: "Flexwoningen Rotterdam-Zuid",
        afbeelding: "/images/portfolio/flex-rotterdam-zuid.jpg",
        woningType: "flexwoning",
        locatie: "Rotterdam",
      },
      {
        titel: "Woonunits Delft",
        afbeelding: "/images/portfolio/flex-units-delft.jpg",
        woningType: "woonunit",
        locatie: "Delft",
      },
      {
        titel: "Containerwoningen Den Haag",
        afbeelding: "/images/portfolio/flex-container-denhaag.jpg",
        woningType: "containerwoning",
        locatie: "Den Haag",
      },
    ],
  },
  {
    slug: "tuinkamerexperts",
    naam: "TuinKamerExperts",
    beschrijving:
      "TuinKamerExperts ontwerpt en realiseert hoogwaardige tuinkamers en modulaire aanbouwen die naadloos aansluiten bij je bestaande woning. Of het nu gaat om een thuiswerkplek, extra woonruimte of een wellness-ruimte, wij maken het mogelijk. Al onze tuinkamers zijn vergunningsvrij te plaatsen en worden binnen twee weken opgeleverd.",
    logo: "/images/aanbieders/tuinkamerexperts.png",
    vestigingsplaats: "Amersfoort",
    provincie: "Utrecht",
    werkgebied: ["Utrecht", "Noord-Holland", "Gelderland", "Flevoland"],
    specialisaties: ["tuinkamer", "modulaire-aanbouw"],
    beoordeling: 4.7,
    aantalReviews: 78,
    contactEmail: "info@tuinkamerexperts.nl",
    website: "https://www.tuinkamerexperts.nl",
    telefoon: "033-4567890",
    portfolio: [
      {
        titel: "Tuinkamer Home Office Amersfoort",
        afbeelding: "/images/portfolio/tuinkamer-office-amersfoort.jpg",
        woningType: "tuinkamer",
        locatie: "Amersfoort",
      },
      {
        titel: "Modulaire aanbouw Hilversum",
        afbeelding: "/images/portfolio/tuinkamer-aanbouw-hilversum.jpg",
        woningType: "modulaire-aanbouw",
        locatie: "Hilversum",
      },
      {
        titel: "Wellness Tuinkamer Zeist",
        afbeelding: "/images/portfolio/tuinkamer-wellness-zeist.jpg",
        woningType: "tuinkamer",
        locatie: "Zeist",
      },
    ],
  },
  {
    slug: "containerhomes-nl",
    naam: "ContainerHomes NL",
    beschrijving:
      "ContainerHomes NL transformeert gebruikte zeecontainers tot moderne en betaalbare woonruimtes. Wij geven containers een tweede leven als stijlvolle woningen, studio's en werkruimtes met alle moderne gemakken. Door slim hergebruik van materialen bieden wij een van de meest duurzame en betaalbare bouwmethoden op de markt.",
    logo: "/images/aanbieders/containerhomes-nl.png",
    vestigingsplaats: "Amsterdam",
    provincie: "Noord-Holland",
    werkgebied: ["Noord-Holland", "Zuid-Holland", "Utrecht"],
    specialisaties: ["containerwoning", "woonunit", "micro-woning"],
    beoordeling: 4.3,
    aantalReviews: 35,
    contactEmail: "info@containerhomes-nl.nl",
    website: "https://www.containerhomes-nl.nl",
    telefoon: "020-6543210",
    portfolio: [
      {
        titel: "Container Loft Amsterdam-Noord",
        afbeelding: "/images/portfolio/container-loft-amsterdam.jpg",
        woningType: "containerwoning",
        locatie: "Amsterdam",
      },
      {
        titel: "Micro-woning Haarlem",
        afbeelding: "/images/portfolio/container-micro-haarlem.jpg",
        woningType: "micro-woning",
        locatie: "Haarlem",
      },
      {
        titel: "Container Werkunit Zaandam",
        afbeelding: "/images/portfolio/container-werk-zaandam.jpg",
        woningType: "woonunit",
        locatie: "Zaandam",
      },
    ],
  },
];

export function getAanbieder(slug: string): Aanbieder | undefined {
  return aanbieders.find((a) => a.slug === slug);
}

export function getAanbiedersVoorType(woningTypeSlug: string): Aanbieder[] {
  return aanbieders.filter((a) => a.specialisaties.includes(woningTypeSlug));
}
