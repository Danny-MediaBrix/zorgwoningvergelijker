export interface ExterneLink {
  url: string;
  tekst: string;
  bron: string;
}

export interface SeoContent {
  uitgebreideBeschrijving: string;
  vergunningenTekst: string;
  seniorenTekst: string;
  seniorenChecklist: string[];
  financieringTekst?: string;
  externeLink: ExterneLink;
}

export const seoContent: Record<string, SeoContent> = {
  "tiny-house": {
    uitgebreideBeschrijving:
      "Een tiny house onderscheidt zich van andere compacte woningen door de nadruk op bewust en duurzaam leven. De woning wordt volledig in de fabriek geproduceerd en als geheel naar de locatie getransporteerd. Dat betekent een korte bouwtijd, minimale overlast en een constante bouwkwaliteit. Door het compacte ontwerp zijn de energiekosten laag, veel tiny houses hebben energielabel A of hoger.\n\nVoor 50-plussers biedt een tiny house een aantrekkelijk alternatief voor de reguliere woningmarkt. Je verruilt een grote woning met veel onderhoud voor een overzichtelijk, gelijkvloers huis dat precies bij je levensfase past. Steeds meer gemeenten wijzen speciale kavels aan voor tiny houses, en ook in tuinen van familieleden worden ze, onder voorwaarden, geplaatst als pre-mantelzorgwoning.",
    vergunningenTekst:
      "Voor het plaatsen van een tiny house heb je in de meeste gevallen een omgevingsvergunning nodig. De grond moet een woonbestemming hebben of vallen onder een speciaal tiny-house-project van de gemeente. Sommige gemeenten, zoals Almere en Nijmegen, hebben actief beleid voor tiny houses met vereenvoudigde procedures.\n\nWordt het tiny house geplaatst als mantelzorgwoning in de tuin van een familielid? Dan kan onder de Omgevingswet een vergunningsvrije plaatsing mogelijk zijn, mits de woning niet groter is dan 100 m\u00B2, op het achtererf staat, en er een aantoonbare zorgrelatie is. Informeer altijd vooraf bij je gemeente, want de regels verschillen per gemeente.",
    seniorenTekst:
      "Een tiny house is bij uitstek geschikt voor 50-plussers die willen downsizen zonder in te leveren op comfort. De compacte opzet betekent minder schoonmaak, minder onderhoud en lagere maandlasten. Doordat de woning gelijkvloers is, hoef je je geen zorgen te maken over trappen. Moderne tiny houses worden standaard gebouwd met brede deuren, een inloopdouche en drempelvrije overgangen, precies de kenmerken die je woning toekomstbestendig maken.",
    seniorenChecklist: [
      "Gelijkvloers wonen, geen trappen, alles op \u00e9\u00e9n verdieping",
      "Drempelvrij, brede deuren (min. 85 cm) en vlakke overgangen",
      "Inloopdouche en ruime badkamer, eenvoudig aan te passen voor rollator of rolstoel",
      "Lage energiekosten, goed ge\u00efsoleerd, ideaal voor een vast pensioeninkomen",
      "Weinig onderhoud, compact en overzichtelijk, meer vrije tijd",
      "Plaatsing in de tuin, dichtbij kinderen of mantelzorgers",
      "Verplaatsbaar, als je situatie verandert, verhuist het huis mee",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/omgevingswet/vraag-en-antwoord/wanneer-moet-ik-een-omgevingsvergunning-aanvragen",
      tekst: "Lees op Rijksoverheid.nl wanneer je een omgevingsvergunning moet aanvragen",
      bron: "Rijksoverheid.nl",
    },
    financieringTekst:
      "De financiering van een tiny house vraagt een andere aanpak dan bij een traditioneel huis. Een reguliere hypotheek is bij de meeste banken niet mogelijk, omdat het tiny house vaak als roerend goed wordt beschouwd. Alternatieven zijn een persoonlijke lening, inzet van overwaarde op je huidige woning, of spaargeld. Sommige aanbieders bieden huurkoop aan.\n\nVoor 50-plussers kan de overwaarde van de huidige woning een uitstekende financieringsbron zijn. Verkoop je je huidige woning en plaats je een tiny house op een gehuurde kavel, dan houd je vaak aanzienlijk kapitaal over. Let op: voor een tiny house als mantelzorgwoning kun je mogelijk een Wmo-bijdrage aanvragen bij je gemeente.",
  },

  "micro-woning": {
    uitgebreideBeschrijving:
      "De micro-woning is de meest compacte zelfstandige woningvorm op de markt. Met afmetingen tussen 15 en 30 m\u00B2 bevat een micro-woning alle essenti\u00eble voorzieningen: een slaapgedeelte, keukenblok, badkamer en leefruimte. Het verschil met een tiny house zit vooral in de grootte, een micro-woning is nog compacter en daardoor sneller te plaatsen en goedkoper.\n\nMicro-woningen worden fabrieksmatig gebouwd en als complete unit geleverd. Dat maakt ze bijzonder geschikt als tijdelijke of permanente oplossing wanneer snel woonruimte nodig is. Denk aan situaties na een scheiding, tijdens een verbouwing, of wanneer je als senior kleiner wilt gaan wonen met behoud van privacy en zelfstandigheid.",
    vergunningenTekst:
      "Voor een micro-woning gelden dezelfde vergunningsregels als voor andere prefab woningen. Bij plaatsing als zelfstandige woning is een omgevingsvergunning vereist en moet de grond een woonbestemming hebben. De compacte afmetingen kunnen het vergunningsproces vereenvoudigen.\n\nAls mantelzorgwoning in de tuin kan een micro-woning vergunningsvrij geplaatst worden onder de Omgevingswet, mits aan de voorwaarden wordt voldaan: maximaal 100 m\u00B2, op het achtererf, en een aantoonbare zorgbehoefte. Door het kleine formaat past een micro-woning vaak ook in kleinere tuinen waar een groter woningtype niet mogelijk is.",
    seniorenTekst:
      "Voor senioren die zelfstandig willen blijven wonen maar minder ruimte nodig hebben, is een micro-woning een slimme keuze. Alles is binnen handbereik, er is minimaal onderhoud nodig en de woonlasten zijn zeer laag. Een micro-woning in de tuin van je kinderen combineert zelfstandigheid met de geruststelling dat hulp dichtbij is, zonder dat je elkaars privacy opgeeft.",
    seniorenChecklist: [
      "Alles op \u00e9\u00e9n verdieping, compact en overzichtelijk wonen",
      "Drempelvrij, geschikt voor rollator of rolstoel",
      "Lage woonlasten, ideaal bij een vast pensioeninkomen",
      "Snel leverbaar, binnen 2 tot 6 weken geplaatst",
      "Plaatsing in kleine tuin, compact genoeg voor de meeste achtertuinen",
      "Volledige privacy, eigen voordeur, keuken en badkamer",
      "Mantelzorg dichtbij, zelfstandig wonen naast je kinderen",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/omgevingswet/omgevingsloket",
      tekst: "Bekijk het Omgevingsloket op Rijksoverheid.nl om te checken of je een vergunning nodig hebt",
      bron: "Rijksoverheid.nl",
    },
    financieringTekst:
      "Een micro-woning is \u00e9\u00e9n van de meest betaalbare woningopties. Prijzen beginnen vanaf circa \u20ac30.000, wat financiering eenvoudiger maakt dan bij grotere woningtypen. De meest voorkomende opties zijn een persoonlijke lening, spaargeld, of de overwaarde op je huidige woning.\n\nBij plaatsing als mantelzorgwoning kun je mogelijk aanspraak maken op een Wmo-voorziening via je gemeente. Sommige gemeenten bieden ook een Blijverslening aan voor woningaanpassingen die langer zelfstandig wonen mogelijk maken.",
  },

  mantelzorgwoning: {
    uitgebreideBeschrijving:
      "Een mantelzorgwoning is specifiek ontworpen voor situaties waarin zorg en nabijheid centraal staan. De woning wordt in de tuin of op het erf van een familielid geplaatst, waardoor de zorgontvanger zelfstandig woont maar hulp letterlijk om de hoek is. Dit voorkomt opname in een verzorgingshuis en bespaart aanzienlijke zorgkosten, professionele zorg kost al snel \u20ac2.000 tot \u20ac3.500 per maand.\n\nModerne mantelzorgwoningen zijn volledig uitgeruste, comfortabele woningen met een eigen voordeur, keuken, badkamer en slaapkamer. Ze worden fabrieksmatig geproduceerd en binnen enkele weken op locatie geplaatst. Het grote voordeel ten opzichte van een interne verbouwing: de mantelzorgwoning kan later weer worden verwijderd of verplaatst wanneer de zorgsituatie verandert.",
    vergunningenTekst:
      "De mantelzorgwoning kent een unieke vergunningspositie. Onder de Omgevingswet kan een mantelzorgwoning vergunningsvrij in de tuin worden geplaatst, mits aan strikte voorwaarden wordt voldaan: de woning staat op het achtererf, is maximaal 100 m\u00B2, de bouwhoogte is maximaal 5 meter, en er is een aantoonbare zorgbehoefte. Een indicatie van de huisarts of het CIZ volstaat doorgaans als bewijs.\n\nLet op: zodra de zorgrelatie eindigt, moet de mantelzorgwoning in principe worden verwijderd of de bewoning gestaakt. Sommige gemeenten hanteren een termijn hiervoor. Bij prefab woningen is verwijdering relatief eenvoudig. Informeer bij je gemeente naar de lokale regels, want de interpretatie van 'aantoonbare zorgbehoefte' verschilt per gemeente.",
    seniorenTekst:
      "De mantelzorgwoning is de meest gekozen oplossing voor ouderen die niet meer volledig zelfstandig kunnen wonen, maar ook niet naar een verzorgingshuis willen. Je woont op eigen terrein van je kinderen of familieleden, met volledige privacy en een eigen huishouden, terwijl hulp altijd binnen handbereik is. Dit geeft rust, voor jou \u00e9n voor je mantelzorgers.",
    seniorenChecklist: [
      "Volledig gelijkvloers, geen trappen, drempels of niveauverschillen",
      "Brede deuren (min. 90 cm), geschikt voor rollator en rolstoel",
      "Inloopdouche met zitje, veilig en comfortabel douchen",
      "Alarmsysteem of noodknop, snel hulp inroepen bij je mantelzorger",
      "Eigen voordeur en huishouden, behoud van privacy en zelfstandigheid",
      "Nabijheid van mantelzorger, hulp is letterlijk om de hoek",
      "Aanpasbaar interieur, eenvoudig uit te breiden met steunbeugels, hoog-laag keuken of domotica",
      "Verwijderbaar na gebruik, de tuin wordt weer hersteld wanneer de woning niet meer nodig is",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/bouwregelgeving/vraag-en-antwoord/bouwregels-mantelzorgwoning",
      tekst: "Bekijk de offici\u00eble bouwregels voor mantelzorgwoningen op Rijksoverheid.nl",
      bron: "Rijksoverheid.nl",
    },
    financieringTekst:
      "Er zijn meerdere manieren om een mantelzorgwoning te financieren. De meest gebruikte opties zijn de Wmo-bijdrage van je gemeente, de Blijverslening (een lening met lage rente via het Stimuleringsfonds Volkshuisvesting), en het verhogen van de hypotheek op de hoofdwoning. Sommige gemeenten vergoeden tot 100% van de kosten via de Wmo als de zorgbehoefte aantoonbaar is.\n\nDaarnaast kun je denken aan spaargeld, een persoonlijke lening, of de overwaarde op de woning van de zorgontvanger. Huurkoop via de aanbieder is bij sommige leveranciers ook mogelijk. Belangrijk: vergelijk altijd de kosten van een mantelzorgwoning met de maandelijkse kosten van professionele thuiszorg of een verzorgingshuis, een mantelzorgwoning verdient zichzelf vaak binnen 2 tot 3 jaar terug.",
  },

  kangoeroewoning: {
    uitgebreideBeschrijving:
      "Een kangoeroewoning is een woning met twee zelfstandige wooneenheden onder \u00e9\u00e9n dak of direct aan elkaar gebouwd. De naam verwijst naar de kangoeroemodel: de ene generatie 'draagt' de andere, net als een kangoeroe haar jong. Typisch woont de oudere generatie in een gelijkvloerse eenheid op de begane grond, terwijl het gezin van de kinderen de rest van de woning bewoont.\n\nHet grote voordeel van een kangoeroewoning is dat beide huishoudens volledig zelfstandig zijn, met eigen voordeur, keuken en badkamer, maar tegelijk dichtbij wonen voor onderlinge hulp en gezelschap. Dit model wint snel aan populariteit nu de vergrijzing toeneemt en er een tekort is aan seniorenwoningen. Gemeenten stimuleren meergeneratiewonen steeds vaker via aangepaste bestemmingsplannen.",
    vergunningenTekst:
      "Voor een kangoeroewoning is vrijwel altijd een omgevingsvergunning nodig, omdat je feitelijk twee wooneenheden cre\u00ebert. Het bestemmingsplan moet meergeneratiewonen of woningsplitsing toestaan. Steeds meer gemeenten staan hier welwillend tegenover, maar het is verstandig om vooraf het bestemmingsplan te raadplegen of een vooroverleg aan te vragen bij de gemeente.\n\nBij het gebruik van een prefab unit als tweede eenheid in de tuin kan de mantelzorgvrijstelling van toepassing zijn, mits er een aantoonbare zorgrelatie is. In dat geval is de tweede eenheid vergunningsvrij tot 100 m\u00B2. Zonder zorgrelatie is altijd een vergunning nodig. Het fiscale aspect is ook relevant: twee afzonderlijke adressen kunnen gevolgen hebben voor toeslagen en belastingen.",
    seniorenTekst:
      "De kangoeroewoning is de ideale woonvorm voor senioren die dichtbij hun kinderen willen wonen zonder de eigen zelfstandigheid op te geven. Je hebt je eigen voordeur, keuken en badkamer, maar de kleinkinderen zijn om de hoek en hulp is altijd nabij. Het geeft een unieke combinatie van geborgenheid en privacy die geen andere woonvorm zo goed biedt.",
    seniorenChecklist: [
      "Eigen zelfstandige wooneenheid, eigen voordeur, keuken, badkamer",
      "Gelijkvloerse eenheid op de begane grond, geen trappen nodig",
      "Drempelvrije overgangen, geschikt voor rollator of rolstoel",
      "Directe nabijheid van familie, mantelzorg zonder reistijd",
      "Gedeelde buitenruimte, samen tuinieren of de kleinkinderen zien",
      "Financieel voordeel, gedeelde woonlasten, waardestijging van het geheel",
      "Toekomstbestendig, woning groeit mee met veranderende zorgbehoefte",
    ],
    externeLink: {
      url: "https://www.volkshuisvestingnederland.nl/onderwerpen/aanpak-woningnood/beter-benutten-van-bestaande-bebouwing/woningsplitsen",
      tekst: "Lees meer over woningsplitsen en meergeneratiewonen op Volkshuisvesting Nederland",
      bron: "Volkshuisvesting Nederland",
    },
    financieringTekst:
      "De financiering van een kangoeroewoning verloopt anders dan bij een standaard koophuis. Vaak wordt de hypotheek op de hoofdwoning verhoogd om de verbouwing of aanbouw te bekostigen. Let op het fiscale partnerschap: als beide generaties eigenaar zijn, kan dit gevolgen hebben voor hypotheekrenteaftrek en toeslagen.\n\nAlternatieven zijn een verbouwingshypotheek, inzet van overwaarde of pensioenkapitaal, of een Wmo-bijdrage als er een aantoonbare zorgbehoefte is. De Blijverslening van het Stimuleringsfonds Volkshuisvesting is ook een optie bij levensloopbestendige aanpassingen. Belangrijk voordeel: een kangoeroewoning verhoogt doorgaans de totale woningwaarde, waardoor de investering zich dubbel terugbetaalt.",
  },

  chalet: {
    uitgebreideBeschrijving:
      "Een chalet is een houten woning die oorspronkelijk geassocieerd werd met vakantieparken, maar steeds vaker als permanente woonoplossing wordt gekozen. Moderne chalets zijn volledig ge\u00efsoleerd, voorzien van vloerverwarming en gebouwd volgens de huidige bouwvoorschriften. Ze combineren de warme uitstraling van hout met het comfort van een reguliere woning.\n\nVoor 50-plussers is het chalet aantrekkelijk vanwege de gelijkvloerse indeling, het onderhoudsarme karakter en de betaalbare instapprijs. Een chalet wordt fabrieksmatig gebouwd en binnen enkele weken op locatie geplaatst. Op vakantieparken met woonbestemming kun je permanent wonen in een rustige, groene omgeving, ideaal voor wie het stadslawaai wil ontvluchten.",
    vergunningenTekst:
      "De vergunningsregels voor een chalet hangen sterk af van de locatie. Op een recreatieterrein met de juiste bestemming is plaatsing relatief eenvoudig, het park regelt vaak de benodigde vergunningen. Voor permanente bewoning moet het park wel een woonbestemming hebben; recreatieve bewoning is juridisch iets anders dan permanent wonen.\n\nWil je een chalet op eigen grond plaatsen? Dan is een omgevingsvergunning vereist en moet de grond een woonbestemming hebben. De eisen voor isolatie, fundering en veiligheid zijn gelijk aan die voor reguliere woningen. Bij plaatsing als mantelzorgwoning in de tuin kan de vergunningsvrije regeling van toepassing zijn, mits aan de standaardvoorwaarden wordt voldaan.",
    seniorenTekst:
      "Een chalet biedt senioren een comfortabele, gelijkvloerse woning in een rustige omgeving. De warme houten uitstraling cre\u00ebert direct een huiselijke sfeer, terwijl moderne chalets voldoen aan alle eisen voor levensloopbestendig wonen. Op vakantieparken met woonbestemming woon je in het groen, vaak met voorzieningen als een zwembad, restaurant en sociale activiteiten in de buurt, ideaal om een actief sociaal leven te onderhouden.",
    seniorenChecklist: [
      "Gelijkvloers, alle ruimtes op \u00e9\u00e9n verdieping, geen trappen",
      "Drempelvrij, brede deuren en vlakke overgangen standaard mogelijk",
      "Rustige, groene omgeving, wonen op een park in de natuur",
      "Sociale voorzieningen, activiteiten en buren op loopafstand",
      "Onderhoudsarm, houten constructie met lange levensduur",
      "Energiezuinig, moderne isolatie en vloerverwarming",
      "Snel bewoonbaar, fabrieksmatig gebouwd, korte plaatsingstijd",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/ruimtelijke-ordening-en-gebiedsontwikkeling/vraag-en-antwoord/mag-ik-permanent-in-een-recreatiewoning-wonen",
      tekst: "Lees op Rijksoverheid.nl of je permanent in een recreatiewoning mag wonen",
      bron: "Rijksoverheid.nl",
    },
  },

  lodge: {
    uitgebreideBeschrijving:
      "Een lodge is een ruim opgezette houten woning die het midden houdt tussen een chalet en een bungalow. Lodges onderscheiden zich door hun royale indeling, vaak met een open woonkeuken, ruime slaapkamers en een overdekt terras. Ze worden volledig geprefabriceerd geleverd en zijn geschikt voor zowel recreatief als permanent gebruik.\n\nDe lodge wint aan populariteit als duurzame woonoplossing. Door het gebruik van hout en moderne isolatietechnieken zijn lodges energiezuinig en milieuvriendelijk. Voor 50-plussers die op zoek zijn naar een ruimere woning dan een tiny house of chalet, maar wel de voordelen van prefab bouwen willen, is de lodge een interessant alternatief. De eco-lodge variant legt extra nadruk op duurzame materialen en circulair bouwen.",
    vergunningenTekst:
      "Voor een lodge gelden vergelijkbare regels als voor een chalet. Op een vakantiepark met de juiste bestemming wordt de vergunning vaak door het park geregeld. Voor permanent wonen moet het park of de kavel een woonbestemming hebben.\n\nOp eigen grond is een omgevingsvergunning noodzakelijk. De lodge moet voldoen aan het Besluit bouwwerken leefomgeving (BBL) voor wat betreft isolatie, brandveiligheid en constructieve eisen. Bij gebruik als mantelzorgwoning kan de vergunningsvrije regeling van toepassing zijn. Door het volledig geprefabriceerde karakter is een lodge relatief eenvoudig te verwijderen wanneer de situatie verandert.",
    seniorenTekst:
      "De lodge combineert de ruimte van een reguliere woning met de voordelen van prefab bouwen. Voor senioren die niet willen inleveren op vierkante meters maar wel onderhoudsarm en energiezuinig willen wonen, is een lodge een uitstekende keuze. De gelijkvloerse opzet, brede deuren en mogelijkheid tot een inloopdouche maken de lodge volledig levensloopbestendig.",
    seniorenChecklist: [
      "Gelijkvloers, ruime indeling op \u00e9\u00e9n verdieping",
      "Ruime badkamer, plek voor inloopdouche en eventueel zitje",
      "Brede deuren, geschikt voor rollator of rolstoel",
      "Overdekt terras, beschut buitenleven bij elk weer",
      "Natuurlijke materialen, gezond binnenklimaat door houtbouw",
      "Energiezuinig, lage stookkosten door goede isolatie",
      "Toekomstbestendig, eenvoudig aan te passen aan veranderende behoeften",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/bouwregelgeving/besluit-bouwwerken-leefomgeving",
      tekst: "Bekijk de bouwtechnische eisen in het Besluit bouwwerken leefomgeving op Rijksoverheid.nl",
      bron: "Rijksoverheid.nl",
    },
  },

  vakantiebungalow: {
    uitgebreideBeschrijving:
      "Een vakantiebungalow is een gelijkvloerse woning die van oorsprong voor recreatie is ontworpen, maar steeds vaker als permanente woonoplossing wordt ingezet. Het woord 'bungalow' komt uit het Hindi en betekent letterlijk 'huis in Bengaalse stijl', een laagbouwwoning zonder verdieping. Moderne vakantiebungalows zijn volledig ge\u00efsoleerd en uitgerust voor jaarrond bewoning.\n\nDe vakantiebungalow is bij uitstek een seniorenwoning: alles bevindt zich op de begane grond, er zijn geen trappen en de indeling is overzichtelijk. Met 2 tot 4 slaapkamers en een ruime woonkeuken biedt een bungalow meer ruimte dan een tiny house of chalet, zonder de complexiteit van een reguliere woning. Op vakantieparken met woonbestemming kun je permanent wonen in het groen.",
    vergunningenTekst:
      "Bij een vakantiebungalow is het cruciaal om onderscheid te maken tussen recreatief gebruik en permanente bewoning. Op een vakantiepark met recreatiebestemming mag je de bungalow gebruiken voor vakantie, maar niet als hoofdverblijf. Voor permanente bewoning moet het park of de kavel een woonbestemming hebben.\n\nSteeds meer vakantieparken worden getransformeerd naar woonbestemmingen, waardoor permanent wonen mogelijk wordt. De gemeente bepaalt of dit is toegestaan. Bij nieuwbouw op eigen grond gelden de reguliere vergunningseisen. Let ook op de overdrachtsbelasting: bij aankoop van een recreatiewoning bedraagt deze 10,4% in plaats van 2% voor een hoofdverblijf.",
    seniorenTekst:
      "De vakantiebungalow is van nature een ideale seniorenwoning: alles op \u00e9\u00e9n verdieping, een overzichtelijke indeling en vaak gesitueerd in een rustige, groene omgeving. Op vakantieparken met permanente bewoning vind je bovendien gelijkgestemde buren en georganiseerde activiteiten. Het sociale aspect mag niet worden onderschat, eenzaamheid is een van de grootste uitdagingen voor senioren, en het parkleven biedt een natuurlijk sociaal vangnet.",
    seniorenChecklist: [
      "Per definitie gelijkvloers, een bungalow heeft geen verdieping",
      "Ruime indeling, 2 tot 4 slaapkamers, genoeg ruimte voor logees",
      "Drempelvrij te realiseren, brede deuren en vlakke overgangen",
      "Sociaal wonen, buren en activiteiten op het park",
      "Onderhoudsarm, het park verzorgt vaak groenonderhoud en wegen",
      "Rustige omgeving, wonen in het groen, weg van de drukte",
      "Huisdieren vaak welkom, belangrijk voor het welzijn van senioren",
    ],
    externeLink: {
      url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/tarieven_overdrachtsbelasting/",
      tekst: "Bekijk de actuele tarieven voor overdrachtsbelasting op Belastingdienst.nl",
      bron: "Belastingdienst.nl",
    },
    financieringTekst:
      "De financiering van een vakantiebungalow verschilt van een reguliere woning. Voor recreatief gebruik is een recreatiehypotheek mogelijk, maar de voorwaarden zijn strenger en de rente iets hoger dan bij een woonhypotheek. Bij permanente bewoning op een park met woonbestemming zijn de mogelijkheden ruimer.\n\nLet op de overdrachtsbelasting: bij een recreatiewoning bedraagt deze 10,4%, tegenover 2% voor een hoofdverblijf (mits je aan de voorwaarden voldoet). Voor 50-plussers die hun huidige woning verkopen kan de overwaarde een vakantiebungalow volledig financieren, met geld over voor de staanplaatskosten van de komende jaren.",
  },

  "prefab-woning": {
    uitgebreideBeschrijving:
      "Een prefab woning is een volwaardige woning die grotendeels in de fabriek wordt geproduceerd en op locatie wordt geassembleerd. In tegenstelling tot traditionele bouw, waarbij alles op de bouwplaats gebeurt, worden bij prefab bouwen de wanden, vloeren en het dak als complete elementen aangeleverd. Dit resulteert in een drastisch kortere bouwtijd, vaak 2 tot 4 maanden in plaats van 6 tot 12 maanden, en een hogere en constantere bouwkwaliteit.\n\nPrefab woningen zijn er in alle maten en stijlen, van compacte starterswoningen tot ruime gezinswoningen met meerdere verdiepingen. De moderne prefab woning is niet te onderscheiden van een traditioneel gebouwd huis, maar scoort vaak beter op isolatie en energieprestaties doordat de productie in een gecontroleerde fabrieksomgeving plaatsvindt.",
    vergunningenTekst:
      "Voor een prefab woning gelden dezelfde vergunningseisen als voor traditionele nieuwbouw: een omgevingsvergunning is vereist en de woning moet voldoen aan het Besluit bouwwerken leefomgeving (BBL). Het voordeel van prefab is dat veel fabrikanten werken met typegoedkeuringen, waardoor het vergunningsproces sneller verloopt.\n\nDe woning moet passen binnen het bestemmingsplan van de locatie. Bij afwijking is een buitenplanse omgevingsplanactiviteit (BOPA) nodig, wat meer tijd kost. Voor prefab mantelzorgwoningen tot 100 m\u00B2 geldt de vergunningsvrije regeling, mits geplaatst op het achtererf bij een aantoonbare zorgrelatie. De ISDE-subsidie (Investeringssubsidie Duurzame Energie) kan van toepassing zijn bij installatie van een warmtepomp of zonneboiler.",
    seniorenTekst:
      "Een prefab woning biedt senioren de mogelijkheid om een volledig nieuwe, levensloopbestendige woning te laten bouwen zonder de overlast en onzekerheid van een traditioneel bouwtraject. Binnen enkele maanden staat je woning er, gebouwd volgens de nieuwste normen voor isolatie, veiligheid en toegankelijkheid. Je kunt de indeling volledig aanpassen aan je wensen: gelijkvloers, met brede deuren, inloopdouche en eventueel voorbereid op domotica.",
    seniorenChecklist: [
      "Volledig naar wens in te delen, gelijkvloers, open of gescheiden kamers",
      "Nieuwbouwkwaliteit, beste isolatie, energielabel A++ of hoger",
      "Korte bouwtijd, binnen 2 tot 4 maanden bewoonbaar",
      "Drempelvrij, standaard brede deuren en vlakke overgangen",
      "Domotica-voorbereid, slimme verlichting, verwarming en alarmering",
      "Waardebehoud, prefab woningen hebben dezelfde waardeontwikkeling als traditionele bouw",
      "Toekomstbestendig, eenvoudig aan te passen bij veranderende mobiliteit",
    ],
    externeLink: {
      url: "https://www.rvo.nl/subsidies-financiering/isde",
      tekst: "Bekijk de ISDE-subsidie voor duurzame energie en energiebesparing op RVO.nl",
      bron: "RVO.nl",
    },
    financieringTekst:
      "Een prefab woning op eigen grond kan gefinancierd worden met een reguliere hypotheek of bouwhypotheek, net als traditionele nieuwbouw. Het voordeel is dat de bouwperiode korter is, waardoor de dubbele lasten (oude woning + nieuwbouw) beperkt blijven.\n\nVoor 50-plussers die hun huidige woning verkopen en een nieuwe prefab woning laten bouwen, zijn er aantrekkelijke mogelijkheden. De overwaarde kan als eigen inbreng dienen, waardoor de maandlasten laag blijven. Bij nieuwbouw betaal je geen overdrachtsbelasting (alleen BTW) en kun je profiteren van de ISDE-subsidie bij duurzame installaties. De Nationale Hypotheek Garantie (NHG) is mogelijk tot de NHG-grens.",
  },

  systeemwoning: {
    uitgebreideBeschrijving:
      "Een systeemwoning is een industrieel geproduceerde woning die bestaat uit gestandaardiseerde bouwsystemen. Anders dan bij prefab woningen, waar individuele panelen op locatie worden geassembleerd, wordt bij systeembouw gewerkt met complete bouwsystemen die als geheel zijn ontworpen en goedgekeurd. Dit maakt systeemwoningen bijzonder geschikt voor projectmatige bouw: hele wijken kunnen in korte tijd worden gerealiseerd.\n\nHet voordeel van systeembouw voor de individuele koper is de typegoedkeuring. Doordat het volledige systeem vooraf is getest en goedgekeurd, verloopt het vergunningsproces sneller en is er meer zekerheid over de kwaliteit en prestaties van de woning. Systeemwoningen zijn er van compact (70 m\u00B2) tot ruim (200 m\u00B2) en worden permanent op een fundering gebouwd.",
    vergunningenTekst:
      "Een systeemwoning vereist een omgevingsvergunning, maar het vergunningsproces verloopt sneller dankzij de typegoedkeuring. De fabrikant heeft het volledige bouwsysteem vooraf laten testen en goedkeuren, waardoor de gemeente minder hoeft te toetsen. Dit kan weken tot maanden schelen in het vergunningstraject.\n\nDe woning moet passen binnen het bestemmingsplan van de kavel. Systeemwoningen worden doorgaans permanent op een fundering gebouwd en zijn bedoeld als reguliere woning. Ze voldoen aan alle eisen van het Besluit bouwwerken leefomgeving (BBL), inclusief de nieuwste normen voor isolatie, brandveiligheid en geluidsisolatie.",
    seniorenTekst:
      "Een systeemwoning biedt senioren een volwaardige nieuwbouwwoning met de betrouwbaarheid van een industrieel geproduceerd product. De kwaliteit is gegarandeerd door de typegoedkeuring en de indeling kan worden aangepast aan je wensen. Kies voor een gelijkvloerse variant of een woning met slaapkamer en badkamer op de begane grond, zodat traplopen in de toekomst geen belemmering vormt.",
    seniorenChecklist: [
      "Gelijkvloerse variant beschikbaar, alles op \u00e9\u00e9n verdieping",
      "Gegarandeerde kwaliteit, typegoedgekeurd bouwsysteem",
      "Nieuwbouwnormen, beste isolatie en energieprestaties",
      "Snelle bouwtijd, minder lang wachten op je nieuwe woning",
      "Brede deuren en drempelvrij, standaard onderdeel van het ontwerp",
      "Goede geluidsisolatie, rustig wonen, ook in een rijtjeswoning",
      "Onderhoudsarm, nieuwe materialen, jarenlang geen grote reparaties",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/eigen-huis-bouwen/vraag-en-antwoord/heb-ik-een-bouwvergunning-nodig-als-ik-zelf-een-huis-wil-bouwen",
      tekst: "Lees op Rijksoverheid.nl of je een bouwvergunning nodig hebt voor nieuwbouw",
      bron: "Rijksoverheid.nl",
    },
    financieringTekst:
      "Een systeemwoning wordt gefinancierd als reguliere nieuwbouw: met een bouw- of hypotheek. Doordat systeemwoningen vaak in projectvorm worden gebouwd, zijn er soms aantrekkelijke pakketten beschikbaar via de projectontwikkelaar. De kortere bouwtijd beperkt de periode van dubbele lasten.\n\nVoor senioren die hun huidige woning verkopen geldt: de overwaarde kan als eigen inbreng dienen en de NHG is mogelijk tot de kostengrens. Systeemwoningen in sociale huurprojecten zijn beschikbaar via woningcorporaties, wat een alternatief is voor senioren die niet willen of kunnen kopen.",
  },

  flexwoning: {
    uitgebreideBeschrijving:
      "Een flexwoning is een verplaatsbare, fabrieksmatig geproduceerde woning die ontworpen is voor tijdelijke huisvesting. Flexwoningen zijn een antwoord op het acute woningtekort in Nederland en worden door gemeenten en woningcorporaties ingezet om snel betaalbare woonruimte te realiseren. De woning wordt compleet geleverd, inclusief keuken, badkamer en alle installaties, en kan binnen \u00e9\u00e9n dag op locatie worden geplaatst.\n\nHet bijzondere aan flexwoningen is dat ze na een periode van 10 tot 15 jaar verplaatst kunnen worden naar een nieuwe locatie. Dit maakt ze ideaal voor terreinen die tijdelijk beschikbaar zijn. Ondanks het tijdelijke karakter zijn moderne flexwoningen comfortabel, goed ge\u00efsoleerd en voorzien van energielabel A of hoger. Ze zijn niet te onderscheiden van permanente woningen.",
    vergunningenTekst:
      "Flexwoningen vallen onder een speciaal vergunningsregime. Ze krijgen een tijdelijke omgevingsvergunning voor maximaal 15 jaar, met mogelijkheid tot verlenging. Het voordeel hiervan is dat de vergunningsprocedure eenvoudiger en sneller is dan bij permanente bouw, de reguliere procedure duurt maximaal 8 weken.\n\nGemeenten spelen een actieve rol bij flexwoningen: zij wijzen locaties aan en werken samen met woningcorporaties voor de verhuur. Als particulier kun je ook een flexwoning kopen en op eigen grond plaatsen, maar dan gelden de reguliere vergunningseisen. Let op: de NHG-status voor koop-flexwoningen is gewijzigd. Informeer bij je hypotheekverstrekker naar de actuele mogelijkheden.",
    seniorenTekst:
      "Een flexwoning kan voor senioren een snelle oplossing zijn wanneer er urgente woonbehoefte is, bijvoorbeeld na verkoop van de huidige woning, bij een scheiding, of als tussenwoning tijdens een verbouwing. De woning is gelijkvloers, compleet uitgerust en direct bewoonbaar. Via woningcorporaties zijn flexwoningen beschikbaar als sociale huurwoning, waardoor de maandlasten beheersbaar zijn.",
    seniorenChecklist: [
      "Gelijkvloers, alle ruimtes op de begane grond",
      "Direct bewoonbaar, compleet opgeleverd met keuken en badkamer",
      "Betaalbare huur, via woningcorporatie als sociale huurwoning beschikbaar",
      "Goed ge\u00efsoleerd, energielabel A, lage stookkosten",
      "Drempelvrij, geschikt voor verminderde mobiliteit",
      "Tijdelijk of permanent, flexibel in te zetten naar je situatie",
      "Snel beschikbaar, korte wachttijd vergeleken met reguliere sociale huur",
    ],
    externeLink: {
      url: "https://www.volkshuisvestingnederland.nl/onderwerpen/versnellen-tijdelijke-huisvesting",
      tekst: "Lees het rijksbeleid voor flexwoningen en tijdelijke huisvesting op Volkshuisvesting Nederland",
      bron: "Volkshuisvesting Nederland",
    },
    financieringTekst:
      "Flexwoningen zijn in de meeste gevallen beschikbaar als huurwoning via een woningcorporatie. De huurprijs valt doorgaans in de sociale huursector, waardoor huurtoeslag mogelijk is. Dit maakt flexwoningen financieel zeer toegankelijk voor senioren met een beperkt inkomen.\n\nKoop van een flexwoning is ook mogelijk, maar de financiering is complexer. Niet alle banken verstrekken een hypotheek voor een verplaatsbare woning. Een persoonlijke lening of eigen middelen zijn vaak nodig. Informeer bij je gemeente naar de beschikbare flexwoningprojecten voor senioren, sommige gemeenten reserveren locaties specifiek voor 55-plussers.",
  },

  containerwoning: {
    uitgebreideBeschrijving:
      "Een containerwoning is een woning gebouwd op basis van stalen zeecontainers. De stevige staalconstructie vormt het skelet van de woning, die vervolgens wordt voorzien van isolatie, afwerking en alle voorzieningen. Containerwoningen zijn modulair: meerdere containers kunnen worden gekoppeld om een grotere woning te cre\u00ebren. Een enkele 40-voets container levert circa 28 m\u00B2 woonoppervlak.\n\nDe containerwoning is \u00e9\u00e9n van de meest betaalbare woningopties op de markt. Door het hergebruik van containers is de constructie snel en duurzaam. Moderne containerwoningen zijn van buitenaf niet als zodanig herkenbaar, met de juiste gevelbekleding zien ze eruit als elke andere moderne woning. Ze zijn volledig ge\u00efsoleerd, voorzien van HR++ glas en voldoen aan de huidige energienormen.",
    vergunningenTekst:
      "Voor een containerwoning gelden dezelfde vergunningseisen als voor andere prefab woningen. Bij plaatsing als zelfstandige woning is een omgevingsvergunning nodig en moet de grond een geschikte bestemming hebben. De vergunning wordt doorgaans verleend als tijdelijke bouw (maximaal 15 jaar), waardoor de procedure sneller verloopt.\n\nAls mantelzorgwoning in de tuin kan een containerwoning vergunningsvrij worden geplaatst, mits aan de Omgevingswet-voorwaarden wordt voldaan: maximaal 100 m\u00B2, op het achtererf, en een aantoonbare zorgrelatie. Door de modulaire opzet is een containerwoning eenvoudig te verwijderen wanneer de situatie verandert. Informeer bij je gemeente naar de specifieke regels voor je situatie.",
    seniorenTekst:
      "Een containerwoning biedt senioren een betaalbare en snelle woonoplossing. De gelijkvloerse indeling, compacte opzet en lage onderhoudskosten maken het een praktische keuze voor wie kleiner wil gaan wonen. In de tuin van je kinderen geplaatst als mantelzorgwoning combineer je zelfstandigheid met de nabijheid van hulp. De stalen constructie is robuust en bestand tegen alle weersomstandigheden.",
    seniorenChecklist: [
      "Gelijkvloers, alles op \u00e9\u00e9n niveau, geen trappen",
      "Betaalbaar, \u00e9\u00e9n van de voordeligste woningopties op de markt",
      "Snel geplaatst, binnen enkele weken bewoonbaar",
      "Modulair uitbreidbaar, begin met \u00e9\u00e9n container, breid later uit",
      "Drempelvrij, brede deuren en vlakke vloeren",
      "Onderhoudsarm, stalen constructie gaat tientallen jaren mee",
      "Verplaatsbaar, eenvoudig te herplaatsen met een kraan",
      "Duurzaam, hergebruik van materialen, circulair bouwen",
    ],
    externeLink: {
      url: "https://www.rvo.nl/onderwerpen/expertteam-woningbouw/flexwonen",
      tekst: "Bekijk informatie over flexwonen en verplaatsbare woningen op RVO.nl",
      bron: "RVO.nl",
    },
    financieringTekst:
      "De containerwoning is \u00e9\u00e9n van de meest betaalbare woningtypen, met prijzen vanaf circa \u20ac20.000 voor een basismodel. Dit maakt financiering eenvoudiger: spaargeld of een persoonlijke lening volstaat vaak. Een hypotheek is bij de meeste banken niet mogelijk vanwege het verplaatsbare karakter.\n\nVoor 50-plussers die een containerwoning als mantelzorgwoning laten plaatsen, kan een Wmo-bijdrage uitkomst bieden. De lage aanschafprijs in combinatie met de besparing op professionele zorgkosten maakt de investering snel terugverdiend. Sommige aanbieders bieden ook verhuur aan, waardoor je geen grote investering vooraf hoeft te doen.",
  },

  woonunit: {
    uitgebreideBeschrijving:
      "Een woonunit is een compacte, volledig uitgeruste leefruimte die als geheel wordt geleverd en geplaatst. Woonunits worden veel ingezet als noodhuisvesting, tijdelijke woning tijdens verbouwingen, of als mantelzorgwoning in de tuin. Het onderscheid met een tiny house of micro-woning zit in de functionaliteit: een woonunit is primair ontworpen voor snel en effici\u00ebnt wonen, zonder concessies aan comfort.\n\nModerne woonunits zijn goed ge\u00efsoleerd, voorzien van een complete keuken en badkamer, en beschikbaar in verschillende formaten. De levertijd is opvallend kort: veel aanbieders leveren een woonunit binnen 2 tot 4 weken. Dit maakt de woonunit bij uitstek geschikt voor situaties waarin snel woonruimte nodig is, bijvoorbeeld na een brand, bij plotselinge zorgbehoefte, of als overbrugging naar een definitieve woning.",
    vergunningenTekst:
      "De vergunningseisen voor een woonunit hangen af van het gebruik en de plaatsingsduur. Bij tijdelijke plaatsing (tot 15 jaar) geldt een vereenvoudigde procedure. Als permanente woning is een volledige omgevingsvergunning nodig.\n\nBij plaatsing als mantelzorgwoning in de tuin is de vergunningsvrije regeling van de Omgevingswet van toepassing: maximaal 100 m\u00B2, op het achtererf, en een aantoonbare zorgrelatie. Door de compacte afmetingen van de meeste woonunits wordt aan de oppervlakte-eis vrijwel altijd voldaan. De woonunit kan na gebruik eenvoudig worden verwijderd, waardoor de tuin in oorspronkelijke staat wordt hersteld.",
    seniorenTekst:
      "Een woonunit biedt senioren een snelle en praktische woonoplossing. Binnen enkele weken staat je zelfstandige woning er, compleet met keuken, badkamer en slaapruimte. Vooral als mantelzorgwoning is de woonunit populair: compact genoeg voor de meeste tuinen, snel geplaatst wanneer de zorgbehoefte ontstaat, en eenvoudig te verwijderen wanneer de situatie verandert. Je behoudt je zelfstandigheid terwijl hulp op steenworp afstand is.",
    seniorenChecklist: [
      "Gelijkvloers, compacte indeling op \u00e9\u00e9n niveau",
      "Zeer snel leverbaar, binnen 2 tot 4 weken bewoonbaar",
      "Drempelvrij, geschikt voor rollator of rolstoel",
      "Eigen voordeur, volledige privacy en zelfstandigheid",
      "Complete uitrusting, keuken, badkamer en slaapruimte inbegrepen",
      "Mantelzorg dichtbij, plaatsing in de tuin van familieleden",
      "Tijdelijk of permanent, flexibel in te zetten naar behoefte",
    ],
    externeLink: {
      url: "https://www.rijksoverheid.nl/onderwerpen/bouwregelgeving/checken-of-vergunning-nodig-is-voor-ver-bouwen/vergunningvrij-bouwen-en-verbouwen",
      tekst: "Bekijk wanneer je vergunningsvrij mag bouwen op Rijksoverheid.nl",
      bron: "Rijksoverheid.nl",
    },
    financieringTekst:
      "Woonunits zijn beschikbaar voor zowel koop als huur. Huur is populair als tijdelijke oplossing: je betaalt een maandelijks bedrag zonder grote investering vooraf. De huurprijzen liggen doorgaans tussen \u20ac800 en \u20ac1.200 per maand, afhankelijk van grootte en uitrusting.\n\nBij koop beginnen de prijzen vanaf circa \u20ac25.000. Een persoonlijke lening, spaargeld of overwaarde zijn de meest gebruikte financieringsmiddelen. Voor mantelzorgwoningen kan een Wmo-bijdrage worden aangevraagd bij de gemeente. Tip: vergelijk de huurkosten over een periode van 2 tot 3 jaar met de aanschafprijs, bij langer gebruik is kopen vaak voordeliger.",
  },

  tuinkamer: {
    uitgebreideBeschrijving:
      "Een tuinkamer is een overdekte, geheel of gedeeltelijk beglaasde aanbouw aan de achterzijde van je woning. Anders dan een serre of veranda is een moderne tuinkamer volledig ge\u00efsoleerd en voorzien van verwarming, waardoor je de ruimte het hele jaar door kunt gebruiken. De tuinkamer cre\u00ebert een naadloze overgang tussen binnen en buiten, met maximale lichtinval door het gebruik van grote glaspartijen.\n\nVoor 50-plussers is de tuinkamer een bijzonder interessante optie: je breidt je woonruimte uit zonder te hoeven verhuizen. De extra ruimte kan dienen als dagelijkse leefruimte, hobbykamer, thuiszorgkamer of ontmoetingsruimte voor bezoek. Door de verbinding met de bestaande woning hoef je niet naar buiten om de tuinkamer te bereiken, ideaal bij verminderde mobiliteit.",
    vergunningenTekst:
      "Een tuinkamer kan in veel gevallen vergunningsvrij worden gebouwd, mits aan de voorwaarden wordt voldaan. De belangrijkste regels: de tuinkamer moet aan de achterkant van de woning staan, de totale oppervlakte aan bijgebouwen mag niet meer zijn dan een bepaald percentage van het achtererf, en de nokhoogte mag maximaal 5 meter bedragen. De exacte percentages en afmetingen verschillen per gemeente.\n\nBij grotere tuinkamers of bij afwijking van de regels is een omgevingsvergunning nodig. Let ook op welstandseisen: sommige gemeenten stellen eisen aan het uiterlijk, de materialen en de kleurstelling. Het is verstandig om vooraf de regels te checken via het Omgevingsloket of contact op te nemen met je gemeente.",
    seniorenTekst:
      "Een tuinkamer is de meest laagdrempelige manier om je woonruimte uit te breiden zonder te verhuizen. Je blijft in je vertrouwde huis en buurt, maar krijgt er een volledig bruikbare ruimte bij. Veel senioren gebruiken de tuinkamer als nieuwe dagelijkse leefruimte: licht, ruim en met uitzicht op de tuin. De drempelvrije verbinding met de woning maakt de tuinkamer toegankelijk voor iedereen, ook met een rollator.",
    seniorenChecklist: [
      "Niet verhuizen, je breidt je huidige woning uit, geen verhuisstress",
      "Drempelvrije aansluiting, vlakke overgang naar de bestaande woning",
      "Veel daglicht, grote glaspartijen zijn goed voor het welzijn",
      "Jaarrond bruikbaar, ge\u00efsoleerd en verwarmd, ook in de winter",
      "Multifunctioneel, leefruimte, hobbykamer, thuiszorgkamer of ontvangstruimte",
      "Relatief betaalbaar, prijzen vanaf circa \u20ac5.000 voor een basismodel",
      "Vaak vergunningsvrij, geen lange procedures nodig",
    ],
    externeLink: {
      url: "https://iplo.nl/thema/bouw/bouwen-vergunning-melding/bijbehorende-bouwwerken/",
      tekst: "Bekijk de regels voor vergunningsvrije bijbehorende bouwwerken op IPLO.nl",
      bron: "Informatiepunt Leefomgeving",
    },
  },

  "modulaire-aanbouw": {
    uitgebreideBeschrijving:
      "Een modulaire aanbouw is een fabrieksmatig geproduceerde uitbreiding van je bestaande woning. In tegenstelling tot een traditionele aanbouw, die maanden aan bouwwerkzaamheden vergt, wordt een modulaire aanbouw in de fabriek gebouwd en als compleet element aan je woning gekoppeld. De bouwtijd op locatie bedraagt slechts enkele dagen tot weken, met minimale overlast.\n\nDe modulaire aanbouw biedt dezelfde kwaliteit als traditionele bouw, maar dan sneller, schoner en vaak goedkoper. Je kunt kiezen voor extra woonruimte, een uitbreiding van de keuken, een extra slaapkamer of een complete zorgkamer op de begane grond. De aanbouw wordt naadloos ge\u00efntegreerd met de bestaande woning en verhoogt de waarde van je huis met gemiddeld 60 tot 80% van de investering.",
    vergunningenTekst:
      "Voor een modulaire aanbouw gelden dezelfde regels als voor een traditionele aanbouw. In veel gevallen is een aanbouw aan de achterzijde vergunningsvrij, mits aan de voorwaarden wordt voldaan: maximaal 4 meter diep, de totale oppervlakte aan bijgebouwen past binnen het toegestane percentage, en de nokhoogte is maximaal 5 meter.\n\nBij grotere aanbouwen of aanbouwen aan de zijkant is een omgevingsvergunning nodig. De aanbouw moet voldoen aan het Besluit bouwwerken leefomgeving (BBL) voor isolatie, constructie en brandveiligheid. Het voordeel van modulair bouwen: de fabrikant kan vaak helpen met de vergunningsaanvraag en heeft ervaring met de eisen van de gemeente.",
    seniorenTekst:
      "Een modulaire aanbouw is de slimste manier voor senioren om hun woning levensloopbestendig te maken zonder te verhuizen. Cre\u00eber een slaapkamer en badkamer op de begane grond, zodat je de trap niet meer hoeft te gebruiken. Of maak een speciale zorgkamer voor thuiszorg, zodat je langer zelfstandig in je eigen huis kunt blijven wonen. De aanbouw wordt in enkele dagen geplaatst, met minimale overlast.",
    seniorenChecklist: [
      "Niet verhuizen, je woning wordt aangepast aan je behoeften",
      "Slaapkamer beneden, nooit meer de trap hoeven nemen",
      "Badkamer op de begane grond, met inloopdouche en steunbeugels",
      "Zorgkamer, ruimte voor thuiszorgmedewerkers of mantelzorger",
      "Minimale overlast, modulair bouwen duurt dagen, niet maanden",
      "Waardevermeerdering, 60 tot 80% van de investering komt terug in de woningwaarde",
      "Drempelvrije aansluiting, naadloze verbinding met de bestaande woning",
      "Domotica-voorbereid, slimme bediening van verlichting, verwarming en alarmsysteem",
    ],
    externeLink: {
      url: "https://iplo.nl/thema/bouw/bouwen-vergunning-melding/bijbehorende-bouwwerken/informatie-particulieren/",
      tekst: "Lees wanneer een aanbouw of uitbouw vergunningsvrij is op IPLO.nl",
      bron: "Informatiepunt Leefomgeving",
    },
    financieringTekst:
      "Een modulaire aanbouw kan gefinancierd worden door de hypotheek op je bestaande woning te verhogen. Omdat de aanbouw de woningwaarde verhoogt, is er vaak voldoende ruimte voor hypotheekverhoging. Alternatief is een verbouwingslening of de Blijverslening van het Stimuleringsfonds Volkshuisvesting, een lening met gunstige voorwaarden specifiek voor levensloopbestendige aanpassingen.\n\nVoor 50-plussers met overwaarde is een modulaire aanbouw bijzonder aantrekkelijk: de investering verhoogt de woningwaarde, verlaagt de kans op een kostbare verhuizing, en maakt langer zelfstandig wonen mogelijk. Sommige gemeenten bieden subsidies voor levensloopbestendige woningaanpassingen. Check ook de Wmo-mogelijkheden bij je gemeente als er sprake is van een zorgbehoefte.",
  },
};

export function getSeoContent(slug: string): SeoContent | undefined {
  return seoContent[slug];
}
