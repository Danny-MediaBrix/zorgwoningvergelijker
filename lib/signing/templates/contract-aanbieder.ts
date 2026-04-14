export type ContractVariables = {
  bedrijfsnaam: string;
  contactpersoon: string;
  kvkNummer?: string;
  vestigingsplaats?: string;
  platformKvk?: string;
  datum: string; // geformatteerde datum, bijv. "14 april 2026"
};

export type DocumentSection = {
  heading?: string;
  paragraphs: string[];
};

export function getContractAanbiederContent(vars: ContractVariables): DocumentSection[] {
  return [
    {
      heading: "SAMENWERKINGSOVEREENKOMST",
      paragraphs: [
        `Overeenkomst tussen Zorgwoningvergelijker.nl en ${vars.bedrijfsnaam}`,
        `Datum: ${vars.datum}`,
      ],
    },
    {
      heading: "Artikel 1 — Partijen",
      paragraphs: [
        `1.1 Zorgwoningvergelijker.nl, eenmanszaak${vars.platformKvk ? `, KvK-nummer ${vars.platformKvk}` : ""}, hierna te noemen 'het Platform', vertegenwoordigd door haar eigenaar.`,
        `1.2 ${vars.bedrijfsnaam}${vars.kvkNummer ? `, KvK-nummer ${vars.kvkNummer}` : ""}${vars.vestigingsplaats ? `, gevestigd te ${vars.vestigingsplaats}` : ""}, vertegenwoordigd door ${vars.contactpersoon}, hierna te noemen 'de Aanbieder'.`,
      ],
    },
    {
      heading: "Artikel 2 — Doel van de overeenkomst",
      paragraphs: [
        "2.1 Het Platform biedt een online vergelijkingsservice voor modulaire woningen, tiny houses en mantelzorgwoningen in Nederland.",
        "2.2 De Aanbieder wordt als deelnemende partij opgenomen op het Platform, waarbij bezoekers de mogelijkheid krijgen om offertes aan te vragen bij de Aanbieder.",
        "2.3 Het doel van deze samenwerking is het genereren van kwalitatieve leads voor de Aanbieder via het Platform.",
      ],
    },
    {
      heading: "Artikel 3 — Verplichtingen van het Platform",
      paragraphs: [
        "3.1 Het Platform levert leads (offerteaanvragen) door aan de Aanbieder per e-mail.",
        "3.2 Het Platform behandelt alle bedrijfsinformatie van de Aanbieder vertrouwelijk.",
        "3.3 Het Platform spant zich in om kwalitatief verkeer naar de website te genereren, maar garandeert geen minimum aantal leads.",
      ],
    },
    {
      heading: "Artikel 4 — Verplichtingen van de Aanbieder",
      paragraphs: [
        "4.1 De Aanbieder zorgt ervoor dat de verstrekte bedrijfsinformatie actueel en correct is.",
        "4.2 De Aanbieder reageert binnen twee (2) werkdagen op ontvangen leads.",
        "4.3 Indien de Aanbieder structureel niet binnen de in artikel 4.2 genoemde termijn reageert, stuurt het Platform een schriftelijke waarschuwing. Bij herhaling na deze waarschuwing is het Platform gerechtigd de levering van leads tijdelijk op te schorten totdat de Aanbieder aantoont weer aan de reactietermijn te kunnen voldoen.",
        "4.4 De Aanbieder houdt zich aan alle toepasselijke wet- en regelgeving.",
        "4.5 De Aanbieder meldt wijzigingen in bedrijfsgegevens, prijzen of beschikbaarheid tijdig aan het Platform.",
      ],
    },
    {
      heading: "Artikel 5 — Kosten en betaling",
      paragraphs: [
        "5.1 De Aanbieder is aan het Platform een vergoeding verschuldigd van € 30,- (dertig euro) exclusief btw per doorgestuurde lead.",
        "5.2 Het Platform factureert maandelijks achteraf op basis van het aantal doorgestuurde leads in de betreffende kalendermaand.",
        "5.3 Betaling dient te geschieden binnen veertien (14) dagen na factuurdatum.",
        "5.4 Bij niet-tijdige betaling stuurt het Platform een betalingsherinnering. Indien betaling ook na de herinnering uitblijft, is de Aanbieder de wettelijke handelsrente (art. 6:119a BW) verschuldigd over het openstaande bedrag. Het Platform is in dat geval tevens gerechtigd de dienstverlening, waaronder de levering van leads en de zichtbaarheid van de Aanbieder op het Platform, op te schorten tot het openstaande bedrag volledig is voldaan.",
      ],
    },
    {
      heading: "Artikel 6 — Intellectueel eigendom",
      paragraphs: [
        "6.1 De Aanbieder verleent het Platform het recht om aangeleverde afbeeldingen, logo's en teksten te gebruiken ten behoeve van de presentatie op het Platform.",
        "6.2 Het Platform behoudt alle rechten op de website, het ontwerp en de onderliggende technologie.",
      ],
    },
    {
      heading: "Artikel 7 — Privacy en gegevensverwerking",
      paragraphs: [
        "7.1 Beide partijen verwerken persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG).",
        "7.2 Het Platform verwerkt persoonsgegevens van leads op grond van gerechtvaardigd belang (art. 6 lid 1 sub f AVG) en deelt deze uitsluitend met de Aanbieder waarvoor de lead is bestemd.",
        "7.3 De Aanbieder verwerkt ontvangen leads uitsluitend ten behoeve van het beantwoorden van de offerteaanvraag en neemt deze op in de eigen AVG-administratie.",
      ],
    },
    {
      heading: "Artikel 8 — Duur en beëindiging",
      paragraphs: [
        "8.1 Deze overeenkomst wordt aangegaan voor onbepaalde tijd, ingaande op de datum van ondertekening.",
        "8.2 Beide partijen kunnen de overeenkomst schriftelijk opzeggen met inachtneming van een opzegtermijn van één (1) maand.",
        "8.3 Bij ernstige schending van deze overeenkomst kan de andere partij de overeenkomst per direct ontbinden.",
      ],
    },
    {
      heading: "Artikel 9 — Aansprakelijkheid",
      paragraphs: [
        "9.1 Het Platform is niet aansprakelijk voor de kwaliteit van de dienstverlening van de Aanbieder aan eindklanten.",
        "9.2 De Aanbieder vrijwaart het Platform van eventuele claims van derden die voortvloeien uit de dienstverlening van de Aanbieder.",
        "9.3 De aansprakelijkheid van het Platform is te allen tijde beperkt tot het bedrag dat de Aanbieder in de afgelopen 12 maanden aan het Platform heeft betaald.",
      ],
    },
    {
      heading: "Artikel 10 — Toepasselijk recht",
      paragraphs: [
        "10.1 Op deze overeenkomst is Nederlands recht van toepassing.",
        "10.2 Geschillen worden in eerste instantie in onderling overleg opgelost. Indien dit niet leidt tot een oplossing, is de rechtbank Amsterdam bevoegd.",
      ],
    },
  ];
}
