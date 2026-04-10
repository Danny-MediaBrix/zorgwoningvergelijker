import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import CTABanner from "@/components/sections/CTABanner";
import ArticleAuthorCard from "@/components/kennisbank/ArticleAuthorCard";
import RelatedArticles from "@/components/kennisbank/RelatedArticles";
import StickyArticleCTA from "@/components/kennisbank/StickyArticleCTA";
import { auteurWim } from "@/lib/auteur";
import { artikelenMeta } from "@/lib/artikelen";
import { formatDatum } from "@/lib/utils";

const artikelContent: Record<string, string> = {
  "hoeveel-kost-een-tiny-house": `
      <h2>Wat kost een tiny house gemiddeld?</h2>
      <p>
        Een kant-en-klare tiny house kost in Nederland gemiddeld tussen de <strong>30.000 en 100.000 euro</strong>. De exacte prijs hangt af van de grootte, het type (op wielen of vast), de afwerking en of je kiest voor zelfbouw of een instapklaar model. Reken daarbovenop nog <strong>5.000 tot 15.000 euro</strong> aan bijkomende kosten voor fundering, transport en nutsaansluitingen.
      </p>
      <p>
        Hieronder vind je een compleet overzicht van alle kostenposten, zodat je vooraf precies weet wat je kunt verwachten.
      </p>

      <h2>Prijzen per type tiny house</h2>
      <p>
        De prijs van een tiny house verschilt sterk per type. Grofweg zijn er drie categorieen:
      </p>
      <ul>
        <li><strong>Tiny house op wielen (15-25 m&sup2;):</strong> &euro;20.000 - &euro;60.000. Dit is de meest betaalbare optie. Je hebt geen fundering nodig, maar wel een stevige trailer (circa &euro;3.000 - &euro;7.000). De maximale breedte is 3,50 meter vanwege transportregels.</li>
        <li><strong>Vast geplaatste tiny house (25-50 m&sup2;):</strong> &euro;50.000 - &euro;100.000. Je krijgt meer ruimte en comfort, maar hebt een fundering en omgevingsvergunning nodig. De prijs per vierkante meter ligt tussen &euro;1.500 en &euro;2.500.</li>
        <li><strong>Prefab tiny house (20-40 m&sup2;):</strong> &euro;45.000 - &euro;85.000. Een fabrieksmatig geproduceerde woning is vaak voordeliger dan volledig maatwerk, doordat de bouwer efficienter werkt en materialen in bulk inkoopt.</li>
      </ul>

      <h2>Zelf bouwen vs. laten bouwen</h2>
      <p>
        Bouw je je tiny house (deels) zelf, dan bespaar je flink op arbeidskosten. De verschillen zijn aanzienlijk:
      </p>
      <ul>
        <li><strong>Volledig zelf bouwen:</strong> &euro;20.000 - &euro;45.000. Je betaalt alleen voor materialen, een trailer en gereedschap. Met tweedehands materialen kun je al vanaf &euro;20.000 een tiny house realiseren.</li>
        <li><strong>Casco kopen + zelf afwerken:</strong> &euro;25.000 - &euro;55.000. De constructie, het dak en de ramen worden professioneel aangeleverd. Je doet de binnenafwerking zelf.</li>
        <li><strong>Kant-en-klaar laten bouwen:</strong> &euro;55.000 - &euro;100.000. Alles wordt voor je gedaan, van ontwerp tot oplevering. Ideaal als je geen bouwervaring hebt.</li>
      </ul>

      <h2>Alle bijkomende kosten op een rij</h2>
      <p>
        De aanschafprijs is slechts een deel van de totale investering. Hieronder vind je de belangrijkste bijkomende kostenposten:
      </p>
      <ul>
        <li><strong>Fundering:</strong> &euro;3.000 - &euro;8.000. Kies je voor een betonplaat, schroeffundering of heipalen? De grondgesteldheid bepaalt welk type het beste past. Een tiny house op wielen heeft geen fundering nodig.</li>
        <li><strong>Nutsaansluitingen:</strong> &euro;3.000 - &euro;8.000. Aansluiting op water, elektriciteit en riolering. Off-grid oplossingen met zonnepanelen en regenwater zijn op termijn goedkoper, maar vergen een hogere aanvangsinvestering.</li>
        <li><strong>Transport en plaatsing:</strong> &euro;1.500 - &euro;4.000. Een dieplader of kraanwagen brengt je tiny house naar de locatie. De afstand en het gewicht bepalen de prijs. Gemiddeld kost transport binnen Nederland circa &euro;1.500.</li>
        <li><strong>Vergunningskosten:</strong> &euro;500 - &euro;3.000. Voor een vast geplaatste tiny house heb je vrijwel altijd een omgevingsvergunning nodig. De legeskosten verschillen per gemeente.</li>
        <li><strong>Grondkosten:</strong> &euro;200 - &euro;500 per m&sup2; voor een kavel, of &euro;250 - &euro;400 per maand huur voor een standplaats. Sommige gemeenten wijzen speciale tiny house-kavels toe.</li>
      </ul>

      <h2>Maandelijkse woonlasten</h2>
      <p>
        Een van de grote voordelen van een tiny house zijn de lage maandelijkse kosten. Gemiddeld kom je uit op <strong>&euro;200 tot &euro;500 per maand</strong>, afhankelijk van je situatie:
      </p>
      <ul>
        <li><strong>Energie:</strong> &euro;50 - &euro;100 per maand. Door het kleine oppervlak en goede isolatie is het energieverbruik veel lager dan bij een reguliere woning. Met zonnepanelen kun je dit verder verlagen.</li>
        <li><strong>Standplaatshuur:</strong> &euro;250 - &euro;400 per maand (als je een kavel huurt). Bij eigen grond vervalt deze kostenpost.</li>
        <li><strong>Verzekering:</strong> &euro;30 - &euro;80 per maand. Een opstalverzekering en inboedelverzekering zijn aan te raden.</li>
        <li><strong>Onderhoud:</strong> &euro;50 - &euro;100 per maand (reservering). Houd jaarlijks circa 1% van de bouwsom apart voor onderhoud.</li>
      </ul>

      <h2>Zo bespaar je op de kosten</h2>
      <p>
        Er zijn meerdere manieren om de totale kosten van je tiny house te drukken:
      </p>
      <ul>
        <li><strong>Kies standaardafmetingen:</strong> maatwerk is duurder dan een standaardmodel. Een model van 6 x 3 meter (op wielen) is meestal het voordeligst.</li>
        <li><strong>Doe de afwerking zelf:</strong> koop een casco en werk de binnenkant zelf af. Dit bespaart al snel &euro;10.000 tot &euro;20.000.</li>
        <li><strong>Vergelijk meerdere aanbieders:</strong> prijzen kunnen sterk verschillen voor vergelijkbare kwaliteit. Via Zorgwoningvergelijker vraag je eenvoudig offertes aan bij meerdere gespecialiseerde bouwers.</li>
        <li><strong>Overweeg een tweedehands tiny house:</strong> een <a href="/occasions/tiny-house" class="text-primary font-medium hover:underline">occasion tiny house</a> kost gemiddeld 15 tot 30% minder dan nieuwbouw en is direct beschikbaar.</li>
        <li><strong>Informeer naar <a href="/kennisbank/subsidie-mantelzorgwoning" class="text-primary font-medium hover:underline">subsidies</a>:</strong> sommige gemeenten bieden subsidies of startersleningen aan voor duurzame woningbouw. De ISDE-regeling vergoedt &euro;1.000 tot &euro;3.000 voor een warmtepomp.</li>
      </ul>

      <h2>Financiering van een tiny house</h2>
      <p>
        Een <a href="/tiny-house" class="text-primary font-medium hover:underline">tiny house</a> financieren is anders dan een reguliere woning. Niet elke bank verstrekt een hypotheek voor een tiny house, maar er zijn steeds meer mogelijkheden:
      </p>
      <ul>
        <li><strong>Hypotheek:</strong> voor een vast geplaatste tiny house op eigen grond kun je bij sommige banken een hypotheek afsluiten. Voorwaarde is vaak een kwaliteitskeurmerk en een minimale levensduur van 25 jaar.</li>
        <li><strong>Persoonlijke lening:</strong> een flexibele optie met hogere rente, maar zonder de strenge eisen van een hypotheek. Geschikt voor bedragen tot &euro;75.000.</li>
        <li><strong>Eigen spaargeld:</strong> veel tiny house-bewoners financieren hun woning (deels) uit eigen middelen. Door de lagere aanschafprijs is dit haalbaarder dan bij een traditioneel huis.</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Wat kost de goedkoopste tiny house?</h3>
      <p>
        De goedkoopste optie is een zelfgebouwde tiny house op wielen van circa 15 m&sup2;. Met tweedehands materialen kun je vanaf ongeveer &euro;20.000 een bewoonbare tiny house realiseren. Een kant-en-klaar instapmodel begint rond de &euro;30.000.
      </p>
      <h3>Hoeveel kost een tiny house per vierkante meter?</h3>
      <p>
        De prijs per vierkante meter ligt gemiddeld tussen &euro;1.200 en &euro;2.500, afhankelijk van het afwerkingsniveau. Dat is hoger dan bij een reguliere woning, omdat vaste kosten voor keuken, badkamer en installaties over een kleiner oppervlak worden verdeeld.
      </p>
      <h3>Heb ik een vergunning nodig voor een tiny house?</h3>
      <p>
        Voor een vast geplaatste tiny house heb je vrijwel altijd een omgevingsvergunning nodig. Een tiny house op wielen valt in een grijs gebied: voor permanente bewoning gelden er regels. Informeer altijd bij je gemeente. Lees meer in ons artikel over <a href="/kennisbank/tiny-house-regels">tiny house regels</a>.
      </p>
      <h3>Kan ik een hypotheek krijgen voor een tiny house?</h3>
      <p>
        Ja, steeds meer banken bieden hypotheken aan voor vast geplaatste tiny houses op eigen grond. Voorwaarden zijn meestal een kwaliteitscertificaat en een minimale levensduur. Voor een tiny house op wielen is een hypotheek doorgaans niet mogelijk, maar een persoonlijke lening wel.
      </p>
    `,
  "subsidie-mantelzorgwoning": `
      <h2>Bestaat er subsidie voor een mantelzorgwoning?</h2>
      <p>
        Er bestaat in Nederland <strong>geen landelijke subsidie</strong> specifiek voor <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoningen</a>. De rijksoverheid heeft geen regeling die de aanschaf of plaatsing van een mantelzorgwoning rechtstreeks subsidieert. Toch zijn er wel degelijk financiele mogelijkheden die de kosten aanzienlijk kunnen drukken. Via de Wmo, gemeentelijke regelingen en fiscale voordelen kun je in de praktijk duizenden euro's besparen.
      </p>
      <p>
        In dit artikel lees je welke regelingen er wel bestaan, hoe je ze aanvraagt en waar je als eerste moet aankloppen. We behandelen de Wmo-vergoeding, gemeentelijke subsidies, het persoonsgebonden budget en fiscale voordelen.
      </p>

      <h2>Wmo-vergoeding voor een mantelzorgwoning</h2>
      <p>
        De Wet maatschappelijke ondersteuning (Wmo) is de belangrijkste financieringsbron voor mantelzorgwoningen. Via de Wmo kun je bij je gemeente een voorziening aanvragen die het mogelijk maakt om langer zelfstandig thuis te wonen. Een mantelzorgwoning kan onder deze voorziening vallen als het een noodzakelijke woningaanpassing betreft.
      </p>
      <p>
        De gemeente beoordeelt elke aanvraag individueel. Daarbij kijkt men naar de <strong>zorgbehoefte</strong> van de zorgvrager, of de aanpassing de goedkoopst adequate oplossing is, en of er geen alternatieven beschikbaar zijn. De vergoeding kan varieren van enkele duizenden euro's voor woningaanpassingen tot een substantieel bedrag voor de plaatsing van een complete mantelzorgunit.
      </p>
      <p>
        Belangrijk: de Wmo-vergoeding is geen vast bedrag. Elke gemeente bepaalt zelf de hoogte en voorwaarden. In de ene gemeente krijg je een volledige vergoeding, in de andere slechts een tegemoetkoming. Vraag daarom altijd een indicatiegesprek aan bij het Wmo-loket van je gemeente.
      </p>

      <h2>Persoonsgebonden budget (pgb)</h2>
      <p>
        Als je in aanmerking komt voor een Wmo-voorziening, kun je in sommige gevallen kiezen voor een <strong>persoonsgebonden budget (pgb)</strong> in plaats van een voorziening in natura. Met een pgb ontvang je een geldbedrag waarmee je zelf de mantelzorgwoning (of aanpassingen daaraan) kunt inkopen. Dit geeft je meer vrijheid in de keuze van aanbieder en type woning.
      </p>
      <p>
        Het pgb wordt niet in alle gemeenten voor mantelzorgwoningen toegekend. Sommige gemeenten bieden liever een voorziening in natura aan of werken samen met specifieke leveranciers. Vraag bij je gemeente na of een pgb tot de mogelijkheden behoort en welk bedrag je kunt verwachten.
      </p>

      <h2>Gemeentelijke subsidies en regelingen</h2>
      <p>
        Naast de Wmo bieden steeds meer gemeenten <strong>eigen subsidieregelingen</strong> aan voor mantelzorgwoningen. Deze regelingen verschillen sterk per gemeente en kunnen bestaan uit:
      </p>
      <ul>
        <li><strong>Directe subsidie:</strong> een eenmalige bijdrage voor plaatsing van een mantelzorgwoning, variërend van 2.500 tot 10.000 euro</li>
        <li><strong>Vergoeding verwijderingskosten:</strong> een bijdrage voor het verwijderen van de mantelzorgwoning wanneer de zorgrelatie eindigt</li>
        <li><strong>Korting op legeskosten:</strong> sommige gemeenten rekenen geen of lagere leges voor vergunningsaanvragen rondom mantelzorgwoningen</li>
        <li><strong>Bemiddelingskosten:</strong> enkele gemeenten vergoeden de kosten voor het inschakelen van een onafhankelijk adviseur</li>
      </ul>
      <p>
        Neem altijd contact op met je gemeente voordat je een mantelzorgwoning bestelt. Veel regelingen moeten <strong>vooraf</strong> worden aangevraagd. Achteraf aanvragen is bij de meeste gemeenten niet mogelijk.
      </p>

      <blockquote>
        <p><strong>Wil je weten welke mantelzorgwoning bij jouw situatie past?</strong> Vergelijk aanbieders en ontvang een offerte op maat via onze <a href="/configurator">configurator</a>.</p>
      </blockquote>

      <h2>Fiscale voordelen en belastingregels</h2>
      <p>
        Naast subsidies zijn er ook fiscale voordelen die de kosten van een mantelzorgwoning verlagen:
      </p>
      <ul>
        <li><strong>Verlaagd btw-tarief:</strong> voor woningaanpassingen aan bestaande woningen (ouder dan 2 jaar) geldt het verlaagde btw-tarief van <strong>9%</strong> in plaats van 21%. Dit kan bij een mantelzorgwoning van 50.000 euro een besparing van 6.000 euro opleveren.</li>
        <li><strong>Aftrek specifieke zorgkosten:</strong> als de mantelzorgwoning wordt geplaatst vanwege een ziekte of handicap, kunnen bepaalde kosten als specifieke zorgkosten aftrekbaar zijn in de inkomstenbelasting.</li>
        <li><strong>Geen extra ozb:</strong> een vergunningsvrije mantelzorgwoning krijgt doorgaans geen apart WOZ-nummer en dus geen aparte ozb-aanslag.</li>
      </ul>
      <p>
        Raadpleeg een belastingadviseur voor je persoonlijke situatie. De aftrekbaarheid hangt af van je inkomen, de specifieke kosten en de indicatie van de zorgvrager.
      </p>

      <h2>Andere financieringsmogelijkheden</h2>
      <p>
        Naast subsidies en fiscale voordelen zijn er meer manieren om een mantelzorgwoning te financieren:
      </p>
      <ul>
        <li><strong>Hypotheek verhogen:</strong> sommige banken bieden de mogelijkheid om je bestaande hypotheek te verhogen voor de plaatsing van een mantelzorgwoning op eigen grond</li>
        <li><strong>Persoonlijke lening:</strong> een flexibele optie met een snelle procedure, al is de rente hoger dan bij een hypotheek</li>
        <li><strong>Huur van mantelzorgwoning:</strong> diverse aanbieders verhuren mantelzorgwoningen vanaf circa 500 tot 900 euro per maand, inclusief plaatsing en verwijdering</li>
        <li><strong>ISDE-subsidie:</strong> als je de mantelzorgwoning uitrust met een warmtepomp, kun je via de ISDE-regeling 1.000 tot 3.000 euro subsidie ontvangen</li>
      </ul>

      <blockquote>
        <p><strong>Zoek je een betaalbare mantelzorgwoning?</strong> Vergelijk prijzen van meerdere aanbieders en ontvang binnen 48 uur een vrijblijvende offerte. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Stap voor stap subsidie aanvragen</h2>
      <p>
        Het aanvragen van financiele ondersteuning voor een mantelzorgwoning verloopt in de meeste gemeenten via deze stappen:
      </p>
      <ul>
        <li><strong>Stap 1:</strong> Laat de zorgbehoefte vaststellen door een huisarts, wijkverpleegkundige of het CIZ.</li>
        <li><strong>Stap 2:</strong> Neem contact op met het Wmo-loket van je gemeente en vraag een indicatiegesprek aan.</li>
        <li><strong>Stap 3:</strong> Vraag gelijktijdig naar gemeentelijke subsidieregelingen voor mantelzorgwoningen.</li>
        <li><strong>Stap 4:</strong> Verzamel offertes van minimaal drie aanbieders om de goedkoopst adequate oplossing aan te tonen.</li>
        <li><strong>Stap 5:</strong> Dien de Wmo-aanvraag en eventuele subsidieaanvraag in, inclusief offertes en medische onderbouwing.</li>
        <li><strong>Stap 6:</strong> Wacht de beschikking af (wettelijke termijn: 8 weken) voordat je verplichtingen aangaat.</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Krijg je subsidie voor een mantelzorgwoning?</h3>
      <p>
        Er is geen landelijke subsidie specifiek voor mantelzorgwoningen. Wel kun je via de Wmo een vergoeding aanvragen bij je gemeente. Daarnaast bieden sommige gemeenten eigen subsidies aan, variërend van 2.500 tot 10.000 euro.
      </p>

      <h3>Wat vergoedt de Wmo voor een mantelzorgwoning?</h3>
      <p>
        De Wmo kan een deel of het geheel van de kosten vergoeden als de mantelzorgwoning wordt gezien als noodzakelijke woningaanpassing. De hoogte verschilt per gemeente en hangt af van de zorgbehoefte en de gekozen oplossing.
      </p>

      <h3>Hoe financier je een mantelzorgwoning?</h3>
      <p>
        De meest gebruikte opties zijn een Wmo-vergoeding, hypotheekverhoging, persoonlijke lening of huur. Combineren van meerdere regelingen is vaak mogelijk en levert de laagste kosten op. Lees meer in ons artikel over <a href="/kennisbank/mantelzorgwoning-financieren" class="text-primary font-medium hover:underline">mantelzorgwoning financieren</a>.
      </p>

      <h3>Wat kost een mantelzorgwoning per maand?</h3>
      <p>
        Bij huur betaal je circa 500 tot 900 euro per maand. Bij aanschaf zijn de maandelijkse lasten afhankelijk van de financieringsvorm: bij een hypotheekverhoging van 50.000 euro betaal je circa 200 tot 350 euro per maand. Bekijk ons <a href="/kennisbank/mantelzorgwoning-prijzen" class="text-primary font-medium hover:underline">volledig prijzenoverzicht</a> voor meer informatie.
      </p>

      <h3>Welke gemeente geeft subsidie voor een mantelzorgwoning?</h3>
      <p>
        Steeds meer gemeenten bieden subsidies aan, maar er is geen landelijk overzicht. Neem contact op met het Wmo-loket van je eigen gemeente om te vragen naar lokale regelingen. De hoogte en voorwaarden verschillen per gemeente.
      </p>
    `,
  "hoe-groot-mag-mantelzorgwoning-zijn": `
      <h2>Maximale grootte: 100 m²</h2>
      <p>
        Een <a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrije</a> mantelzorgwoning mag maximaal <strong>100 m²</strong> groot zijn. Dit is de oppervlakte van het woongedeelte inclusief badkamer, keuken en slaapkamer. Deze grens is vastgelegd in het Besluit bouwwerken leefomgeving (Bbl), de opvolger van het Besluit omgevingsrecht.
      </p>
      <p>
        Let op: deze 100 m² geldt niet als losstaande regel. De mantelzorgwoning telt mee in het totaal aan bijgebouwen op je achtererfgebied. Het totale oppervlak aan bijgebouwen mag maximaal <strong>150 m²</strong> bedragen en niet meer dan <strong>50% van het achtererfgebied</strong> beslaan. Heb je al een schuur van 60 m², dan mag de mantelzorgwoning maximaal 90 m² zijn.
      </p>

      <h2>Hoogte van een mantelzorgwoning</h2>
      <p>
        Naast de oppervlakte gelden er ook regels voor de hoogte. De maximale hoogte hangt af van de afstand tot de hoofdwoning:
      </p>
      <ul>
        <li><strong>Binnen 4 meter van de hoofdwoning:</strong> de mantelzorgwoning mag niet hoger zijn dan de hoofdwoning, met een maximum van 5 meter</li>
        <li><strong>Meer dan 4 meter van de hoofdwoning:</strong> de goothoogte mag maximaal 3 meter zijn. Bij een schuin dak mag de nokhoogte maximaal 5 meter bedragen</li>
        <li><strong>Plat dak:</strong> maximaal 3 meter hoog als de woning meer dan 4 meter van de hoofdwoning staat</li>
      </ul>
      <p>
        De meeste prefab mantelzorgwoningen zijn ontworpen met een hoogte van 3 tot 3,5 meter. Dit past binnen de regels en biedt voldoende leefcomfort.
      </p>

      <h2>Regels binnen de bebouwde kom</h2>
      <p>
        Binnen de bebouwde kom gelden de standaard regels voor vergunningsvrij bouwen. De mantelzorgwoning moet op het <strong>achtererfgebied</strong> worden geplaatst, minimaal 1 meter achter de voorgevelrooilijn. Het achtererfgebied is het deel van je perceel dat achter de achtergevel van de woning ligt, plus de grond aan de zijkant achter de voorgevelrooilijn.
      </p>
      <p>
        De berekening werkt als volgt: heb je een achtererfgebied van 200 m², dan mag maximaal 100 m² (50%) bebouwd worden met bijgebouwen. Is er al 30 m² aan bijgebouwen aanwezig, dan resteert 70 m² voor de mantelzorgwoning, tot het maximum van 100 m².
      </p>

      <h2>Regels buiten de bebouwde kom</h2>
      <p>
        In het buitengebied gelden vaak <strong>strengere regels</strong>. Veel gemeenten hanteren in hun bestemmingsplan een maximale oppervlakte voor bijgebouwen die lager ligt dan 150 m². In agrarisch gebied kan het bestemmingsplan extra beperkingen opleggen. Bovendien gelden in sommige gebieden landschappelijke eisen die invloed hebben op de plaatsing en het uiterlijk van de mantelzorgwoning. Lees meer in ons artikel over <a href="/kennisbank/regels-mantelzorgwoning-buitengebied" class="text-primary font-medium hover:underline">regels in het buitengebied</a>.
      </p>
      <p>
        Check altijd het bestemmingsplan van je perceel via <strong>ruimtelijkeplannen.nl</strong> of neem contact op met je gemeente. In het buitengebied is een vooroverleg met de gemeente vrijwel altijd aan te raden.
      </p>

      <blockquote>
        <p><strong>Wil je weten welke mantelzorgwoning op jouw perceel past?</strong> Vergelijk aanbieders en ontvang een offerte op maat via onze <a href="/configurator">configurator</a>.</p>
      </blockquote>

      <h2>Hoeveel ruimte heb je in de praktijk nodig?</h2>
      <p>
        De maximale 100 m² is voor de meeste situaties ruim voldoende. In de praktijk zijn mantelzorgwoningen vaak kleiner:
      </p>
      <ul>
        <li><strong>1 persoon:</strong> 35 tot 55 m² is comfortabel. Je hebt ruimte voor een slaapkamer, badkamer, keukenblok en woongedeelte.</li>
        <li><strong>2 personen:</strong> 55 tot 75 m² biedt voldoende ruimte voor een extra slaapkamer of een ruimere woonkamer.</li>
        <li><strong>Rolstoeltoegankelijk:</strong> reken op minimaal 50 m² voor 1 persoon. Bredere deuren, draaicirkels en een aangepaste badkamer vragen meer ruimte.</li>
      </ul>
      <p>
        Het is verstandig om niet het maximale oppervlak te benutten als dat niet nodig is. Een kleinere mantelzorgwoning is goedkoper in aanschaf, sneller te plaatsen en eenvoudiger te verwijderen wanneer de zorgrelatie eindigt. Bekijk onze <a href="/kennisbank/mantelzorgwoning-prijzen" class="text-primary font-medium hover:underline">prijzen per m²</a> voor een compleet overzicht.
      </p>

      <h2>Kan een mantelzorgwoning groter dan 100 m²?</h2>
      <p>
        Ja, maar dan is een <strong>omgevingsvergunning</strong> vereist. In sommige gevallen is de gemeente bereid om een vergunning te verlenen voor een grotere mantelzorgwoning, bijvoorbeeld als de zorgbehoefte daar aanleiding toe geeft. De procedure duurt doorgaans 8 weken en kost 500 tot 3.000 euro aan leges.
      </p>
      <p>
        Niet elke gemeente verleent een vergunning voor een grotere mantelzorgwoning. Het bestemmingsplan kan beperkingen opleggen. Vraag vooraf een principeverzoek aan bij je gemeente om de haalbaarheid te toetsen voordat je kosten maakt.
      </p>

      <blockquote>
        <p><strong>Op zoek naar een compacte mantelzorgwoning die binnen de regels past?</strong> Vergelijk direct aanbieders in jouw regio. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Hoe groot mag een mantelzorgwoning zijn zonder vergunning?</h3>
      <p>
        Maximaal 100 m², mits het totaal aan bijgebouwen niet meer dan 150 m² en 50% van het achtererfgebied bedraagt. De hoogte mag maximaal 5 meter zijn.
      </p>

      <h3>Telt een mantelzorgwoning mee als bijgebouw?</h3>
      <p>
        Ja. Een vergunningsvrije mantelzorgwoning is juridisch een bijbehorend bouwwerk. Het oppervlak telt mee in het totaal van 150 m² aan bijgebouwen op het achtererfgebied.
      </p>

      <h3>Mag een mantelzorgwoning twee verdiepingen hebben?</h3>
      <p>
        In principe niet vergunningsvrij. De maximale goothoogte is 3 meter (bij meer dan 4 meter afstand van de hoofdwoning), wat een tweede volwaardige verdieping praktisch onmogelijk maakt. Met een vergunning kan het in sommige gevallen wel.
      </p>

      <h3>Hoeveel m² heb je nodig voor een mantelzorgwoning?</h3>
      <p>
        Voor 1 persoon is 35 tot 55 m² comfortabel. Voor 2 personen reken je op 55 tot 75 m². Bij rolstoelgebruik is minimaal 50 m² voor 1 persoon aan te raden vanwege de benodigde draaicirkels.
      </p>

      <h3>Mag je een mantelzorgwoning in de voortuin plaatsen?</h3>
      <p>
        Nee, een vergunningsvrije mantelzorgwoning moet op het achtererfgebied staan, minimaal 1 meter achter de voorgevelrooilijn. In de voortuin is alleen bouwen mogelijk met een omgevingsvergunning.
      </p>
    `,
  "mantelzorgwoning-prijzen": `
      <h2>Wat kost een mantelzorgwoning?</h2>
      <p>
        Een mantelzorgwoning kost in 2026 gemiddeld tussen de <strong>50.000 en 150.000 euro</strong>. De uiteindelijke prijs hangt af van de grootte, het afwerkingsniveau, de materialen en of je kiest voor een standaardmodel of maatwerk. De prijs per vierkante meter ligt tussen de 1.500 en 2.750 euro, inclusief btw.
      </p>
      <p>
        Hieronder vind je een overzicht per prijsklasse, de bijkomende kosten waar je rekening mee moet houden, en tips om te besparen.
      </p>

      <h2>Prijzen per grootte</h2>
      <p>
        De grootte van de mantelzorgwoning is de belangrijkste prijsbepalende factor. Hieronder een indicatie per oppervlakte:
      </p>
      <ul>
        <li><strong>30 tot 40 m²:</strong> 45.000 tot 70.000 euro. Geschikt voor 1 persoon met een compacte woonkamer, slaapkamer, badkamer en kitchenette.</li>
        <li><strong>40 tot 55 m²:</strong> 65.000 tot 95.000 euro. Ruimte voor een volwaardige keuken en meer bewegingsvrijheid. Populairste formaat.</li>
        <li><strong>55 tot 75 m²:</strong> 85.000 tot 120.000 euro. Geschikt voor 2 personen met een aparte slaapkamer en ruime woonkamer.</li>
        <li><strong>75 tot 100 m²:</strong> 110.000 tot 150.000 euro. Luxe uitvoering met 2 slaapkamers, volledige keuken en bergruimte.</li>
      </ul>

      <h2>Wat bepaalt de prijs?</h2>
      <p>
        Naast de grootte zijn er meer factoren die de prijs beinvloeden:
      </p>
      <ul>
        <li><strong>Afwerking:</strong> een basisafwerking (casco-plus) is het goedkoopst. Een volledig instapklare woning met luxe keuken en badkamer kost 15.000 tot 30.000 euro meer.</li>
        <li><strong>Materialen:</strong> houtskeletbouw is doorgaans goedkoper dan staalframebouw of prefab beton. Duurzame materialen zoals CLT (kruislaaghout) zijn kwalitatief hoogwaardig maar duurder.</li>
        <li><strong>Isolatie:</strong> standaard isolatie voldoet aan het Bouwbesluit, maar extra isolatie (RC 5+) verhoogt het comfort en verlaagt de energiekosten op termijn.</li>
        <li><strong>Toegankelijkheid:</strong> rolstoeltoegankelijke aanpassingen zoals bredere deuren, drempelloos, en een inloopdouche verhogen de prijs met 3.000 tot 8.000 euro.</li>
        <li><strong>Prefab vs. maatwerk:</strong> een standaard prefab model is 15 tot 25% goedkoper dan een volledig op maat ontworpen woning.</li>
      </ul>

      <h2>Bijkomende kosten</h2>
      <p>
        De aanschafprijs is niet het volledige plaatje. Houd rekening met deze extra kostenposten:
      </p>
      <ul>
        <li><strong>Fundering:</strong> 3.000 tot 8.000 euro, afhankelijk van het type (betonplaat, schroeffundering of poeren) en de grondgesteldheid</li>
        <li><strong>Transport en plaatsing:</strong> 2.500 tot 5.500 euro. De kosten hangen af van de afstand, bereikbaarheid en of er een kraan nodig is</li>
        <li><strong>Nutsaansluitingen:</strong> 3.000 tot 7.000 euro voor water, elektriciteit en riolering. Aansluiting op het gasnet is meestal niet nodig bij een warmtepomp</li>
        <li><strong>Vergunning en leges:</strong> 0 euro als de woning vergunningsvrij is, anders 500 tot 3.000 euro</li>
        <li><strong>Grondwerk:</strong> 1.000 tot 3.000 euro voor het egaliseren en bouwrijp maken van de locatie</li>
        <li><strong>Tuinaanpassing:</strong> 500 tot 2.500 euro voor bestrating, pad naar de woning en eventuele erfafscheiding</li>
      </ul>
      <p>
        In totaal moet je boven op de aanschafprijs rekenen op <strong>10.000 tot 25.000 euro</strong> aan bijkomende kosten.
      </p>

      <blockquote>
        <p><strong>Benieuwd naar de exacte prijs voor jouw situatie?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Huren of kopen</h2>
      <p>
        Niet iedereen kiest voor aanschaf. Huren is een alternatief dat vooral interessant is wanneer de zorgbehoefte tijdelijk is of wanneer het budget voor aanschaf ontbreekt. Je kunt ook een <a href="/occasions/mantelzorgwoning" class="text-primary font-medium hover:underline">tweedehands mantelzorgwoning</a> kopen voor een lagere prijs.
      </p>
      <ul>
        <li><strong>Huur:</strong> 500 tot 900 euro per maand, vaak inclusief plaatsing en verwijdering na afloop. Bij een huurperiode van 5 jaar betaal je 30.000 tot 54.000 euro.</li>
        <li><strong>Koop:</strong> hogere eenmalige investering, maar op langere termijn goedkoper. Bij een looptijd van 7 jaar of langer is kopen vrijwel altijd voordeliger.</li>
      </ul>
      <p>
        Sommige aanbieders bieden een huurkoop-constructie aan: je huurt de woning met de optie om deze later over te nemen, waarbij een deel van de huur wordt verrekend met de koopprijs.
      </p>

      <h2>Besparen op de kosten</h2>
      <p>
        Er zijn verschillende manieren om de kosten van een mantelzorgwoning te drukken:
      </p>
      <ul>
        <li><strong>Kies een standaardmodel:</strong> prefab woningen in standaardafmetingen zijn 15 tot 25% goedkoper dan maatwerk</li>
        <li><strong>Vergelijk meerdere aanbieders:</strong> prijzen kunnen tot 30% verschillen voor vergelijkbare kwaliteit</li>
        <li><strong><a href="/kennisbank/subsidie-mantelzorgwoning" class="text-primary font-medium hover:underline">Wmo</a>-vergoeding aanvragen:</strong> via de gemeente kun je een (gedeeltelijke) vergoeding krijgen</li>
        <li><strong>Verlaagd btw-tarief:</strong> voor woningaanpassingen aan bestaande woningen (ouder dan 2 jaar) geldt 9% in plaats van 21% btw</li>
        <li><strong>ISDE-subsidie:</strong> voor een warmtepomp ontvang je 1.000 tot 3.000 euro subsidie</li>
        <li><strong>Casco-plus bestellen:</strong> doe de binnenafwerking (deels) zelf en bespaar 5.000 tot 15.000 euro</li>
      </ul>

      <blockquote>
        <p><strong>Wil je prijzen vergelijken van meerdere aanbieders?</strong> Via onze configurator ontvang je binnen 48 uur vrijblijvende offertes. <a href="/configurator">Vergelijk nu</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Wat kost een mantelzorgwoning van 50 m²?</h3>
      <p>
        Een mantelzorgwoning van 50 m² kost gemiddeld 65.000 tot 95.000 euro, exclusief fundering, transport en nutsaansluitingen. Inclusief alle bijkomende kosten reken je op 80.000 tot 115.000 euro.
      </p>

      <h3>Wat kost een mantelzorgwoning per maand?</h3>
      <p>
        Bij huur betaal je 500 tot 900 euro per maand. Bij aanschaf via een lening van 75.000 euro (10 jaar, 5% rente) betaal je circa 800 euro per maand. De maandelijkse woonlasten (energie, verzekering, onderhoud) bedragen 150 tot 300 euro.
      </p>

      <h3>Is een mantelzorgwoning goedkoper dan een verzorgingshuis?</h3>
      <p>
        Ja, aanzienlijk. Een plek in een verzorgingshuis kost gemiddeld 2.000 tot 3.500 euro per maand (eigen bijdrage via het CAK). Bij een eigen <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> zijn de totale maandlasten doorgaans lager, zeker bij aanschaf.
      </p>

      <h3>Wat is de prijs per m² van een mantelzorgwoning?</h3>
      <p>
        De prijs per vierkante meter ligt tussen de 1.500 en 2.750 euro, inclusief btw. Kleinere woningen hebben een hogere prijs per m² omdat de vaste kosten (keuken, badkamer, installaties) over minder oppervlakte worden verdeeld.
      </p>
    `,
  "wat-is-een-mantelzorgwoning": `
      <h2>Definitie: wat is een mantelzorgwoning?</h2>
      <p>
        Een mantelzorgwoning is een <strong>zelfstandige woonruimte</strong> bij of aan een bestaand huis, bedoeld voor het verlenen of ontvangen van intensieve mantelzorg. De woning staat doorgaans in de achtertuin van de hoofdwoning en biedt de zorgvrager een eigen slaapkamer, badkamer, keuken en woonruimte.
      </p>
      <p>
        Het bijzondere aan een mantelzorgwoning is dat deze onder bepaalde voorwaarden <strong><a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrij</a></strong> geplaatst mag worden. De woning is gekoppeld aan een mantelzorgrelatie: zodra de zorg stopt, vervalt de woonfunctie. Juridisch gezien is het een bijbehorend bouwwerk bij de hoofdwoning, geen zelfstandige woning.
      </p>

      <h2>Voor wie is een mantelzorgwoning bedoeld?</h2>
      <p>
        Een mantelzorgwoning is bedoeld voor situaties waarin iemand intensieve zorg nodig heeft en die zorg dichtbij wil ontvangen. De meest voorkomende situaties:
      </p>
      <ul>
        <li><strong>Ouders bij kinderen:</strong> een ouder met een zorgbehoefte woont in de mantelzorgwoning in de tuin van het kind. Dit is de meest voorkomende situatie.</li>
        <li><strong>Kinderen bij ouders:</strong> het kind trekt in de mantelzorgwoning om voor de ouder in de hoofdwoning te zorgen.</li>
        <li><strong>Partner of familielid:</strong> ook voor een partner, broer, zus of ander familielid met een zorgbehoefte is een mantelzorgwoning mogelijk.</li>
      </ul>
      <p>
        De zorgbehoefte moet <strong>aantoonbaar</strong> zijn. Denk aan een indicatie van de huisarts, wijkverpleegkundige of het CIZ. De meeste gemeenten vragen om bewijs dat er sprake is van intensieve mantelzorg (8 uur of meer per week).
      </p>

      <h2>Welke vormen zijn er?</h2>
      <p>
        Een mantelzorgwoning kan verschillende vormen aannemen:
      </p>
      <ul>
        <li><strong>Prefab mantelzorgwoning:</strong> een kant-en-klare woning die in een fabriek wordt geproduceerd en op locatie wordt geplaatst. Levertijd: 6 tot 16 weken. Dit is de meest gekozen optie.</li>
        <li><strong>Modulaire unit:</strong> een containerachtige woning die snel geplaatst en weer verwijderd kan worden. Vaak ook te huur.</li>
        <li><strong>Aanbouw aan de woning:</strong> een fysieke uitbreiding van de bestaande woning met een eigen ingang en voorzieningen.</li>
        <li><strong>Verbouwing bijgebouw:</strong> een bestaande schuur, garage of bijgebouw dat wordt omgebouwd tot woonruimte.</li>
        <li><strong><a href="/chalet" class="text-primary font-medium hover:underline">Chalet</a> of <a href="/tiny-house" class="text-primary font-medium hover:underline">tiny house</a>:</strong> een compacte, losstaande woning die als mantelzorgwoning wordt ingezet.</li>
      </ul>

      <h2>Regels en voorwaarden</h2>
      <p>
        Sinds de invoering van de Omgevingswet in 2024 mogen gemeenten zelf regels vaststellen voor mantelzorgwoningen. De landelijke richtlijnen voor vergunningsvrij bouwen zijn:
      </p>
      <ul>
        <li>De woning staat op het <strong>achtererfgebied</strong> van de hoofdwoning</li>
        <li>Maximale oppervlakte: <strong>100 m²</strong></li>
        <li>Het totaal aan bijgebouwen is maximaal 150 m² en maximaal 50% van het achtererfgebied</li>
        <li>Maximale hoogte: <strong>5 meter</strong> (3 meter goothoogte bij meer dan 4 meter afstand van de hoofdwoning)</li>
        <li>Er is een <strong>aantoonbare zorgrelatie</strong></li>
      </ul>
      <p>
        Omdat gemeenten eigen regels mogen hanteren, is het altijd noodzakelijk om contact op te nemen met je gemeente voordat je een mantelzorgwoning plaatst. Sommige gemeenten hanteren een meldingsplicht.
      </p>

      <blockquote>
        <p><strong>Wil je weten welke mantelzorgwoning bij jouw situatie past?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Wat kost een mantelzorgwoning?</h2>
      <p>
        De kosten voor een mantelzorgwoning liggen gemiddeld tussen de <strong>50.000 en 150.000 euro</strong>. Een compact model van 35 m² begint rond de 45.000 euro, terwijl een luxe uitvoering van 80 m² kan oplopen tot 140.000 euro. Daarbovenop komen kosten voor fundering (3.000 tot 8.000 euro), transport (2.500 tot 5.500 euro) en nutsaansluitingen (3.000 tot 7.000 euro). Lees meer over het <a href="/kennisbank/mantelzorgwoning-financieren" class="text-primary font-medium hover:underline">financieren van een mantelzorgwoning</a>.
      </p>
      <p>
        Huren is ook een optie, met prijzen vanaf 500 tot 900 euro per maand. Via de Wmo kun je bij de gemeente een (gedeeltelijke) vergoeding aanvragen. Lees meer in ons artikel over <a href="/kennisbank/mantelzorgwoning-prijzen">mantelzorgwoning prijzen</a>.
      </p>

      <h2>Wat gebeurt er als de mantelzorg stopt?</h2>
      <p>
        Wanneer de mantelzorgrelatie eindigt, door overlijden, verhuizing of herstel, vervalt de woonfunctie van de mantelzorgwoning. De woning mag niet meer als woonruimte worden gebruikt. Je bent niet verplicht om de woning te slopen, maar deze mag alleen nog als regulier bijgebouw (opslag, hobby) worden gebruikt.
      </p>
      <p>
        Het is daarom verstandig om te kiezen voor een <strong>verplaatsbare</strong> mantelzorgwoning. Een prefab of modulaire woning kun je na gebruik verkopen of verplaatsen, waardoor je investering niet verloren gaat.
      </p>

      <h2>Voordelen van een mantelzorgwoning</h2>
      <ul>
        <li><strong>Nabijheid:</strong> de zorgvrager woont dichtbij, maar behoudt eigen privacy en zelfstandigheid</li>
        <li><strong>Betaalbaar:</strong> vaak goedkoper dan een verzorgingshuis of intramuraal verblijf</li>
        <li><strong>Vergunningsvrij:</strong> onder voorwaarden geen vergunning nodig, wat tijd en kosten bespaart</li>
        <li><strong>Flexibel:</strong> een modulaire woning is verplaatsbaar en herbruikbaar</li>
        <li><strong>Comfort:</strong> een eigen woning met alle voorzieningen, op maat gemaakt voor de zorgvrager</li>
      </ul>

      <blockquote>
        <p><strong>Op zoek naar een mantelzorgwoning?</strong> Vergelijk direct aanbieders in jouw regio en ontvang vrijblijvend offertes. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een mantelzorgwoning een zelfstandige woning?</h3>
      <p>
        Juridisch niet. Een vergunningsvrije mantelzorgwoning is een bijbehorend bouwwerk bij de hoofdwoning. De woning krijgt doorgaans geen eigen huisnummer of WOZ-waarde en is gekoppeld aan de mantelzorgrelatie.
      </p>

      <h3>Wie mag in een mantelzorgwoning wonen?</h3>
      <p>
        De zorgvrager of de mantelzorger. Er moet een aantoonbare mantelzorgrelatie bestaan. De zorgvrager heeft zorg nodig die meer is dan gebruikelijke hulp tussen huisgenoten.
      </p>

      <h3>Hoe lang mag een mantelzorgwoning blijven staan?</h3>
      <p>
        Zolang de mantelzorgrelatie voortduurt. Wanneer de zorg stopt, vervalt de woonfunctie. De meeste gemeenten hanteren een redelijke overgangstermijn.
      </p>

      <h3>Heeft een mantelzorgwoning een eigen adres?</h3>
      <p>
        Meestal niet. Een vergunningsvrije mantelzorgwoning wordt beschouwd als bijgebouw en deelt het adres met de hoofdwoning. In sommige gevallen kan de gemeente een eigen huisnummer toekennen, maar dit is niet standaard.
      </p>
    `,
  "mantelzorgwoning-vergunningsvrij": `
      <h2>Wanneer is een mantelzorgwoning vergunningsvrij?</h2>
      <p>
        Je mag een mantelzorgwoning vergunningsvrij plaatsen als je voldoet aan de eisen uit het Besluit bouwwerken leefomgeving (Bbl). De belangrijkste voorwaarde is dat er een <strong>aantoonbare mantelzorgrelatie</strong> bestaat. Daarnaast moet de woning aan specifieke eisen voor oppervlakte, hoogte en locatie voldoen.
      </p>
      <p>
        Sinds de invoering van de Omgevingswet in 2024 mogen gemeenten eigen regels vaststellen. De landelijke regels vormen het uitgangspunt, maar je gemeente kan strengere eisen hanteren. Check daarom altijd vooraf bij je gemeente.
      </p>

      <h2>Voorwaarden voor vergunningsvrij bouwen</h2>
      <p>
        Om een mantelzorgwoning zonder vergunning te plaatsen, moet je aan al deze eisen voldoen:
      </p>
      <ul>
        <li><strong>Aantoonbare zorgrelatie:</strong> de bewoner heeft intensieve mantelzorg nodig (8+ uur per week). Een verklaring van de huisarts, wijkverpleegkundige of het CIZ dient als bewijs.</li>
        <li><strong>Achtererfgebied:</strong> de woning staat op het achtererf, minimaal 1 meter achter de voorgevelrooilijn.</li>
        <li><strong>Maximaal 100 m²:</strong> de oppervlakte van de mantelzorgwoning mag niet groter zijn dan 100 vierkante meter.</li>
        <li><strong>Totaal bijgebouwen max 150 m²:</strong> alle bijgebouwen samen mogen niet meer dan 150 m² beslaan en niet meer dan 50% van het achtererfgebied.</li>
        <li><strong>Hoogte max 5 meter:</strong> bij meer dan 4 meter afstand van de hoofdwoning geldt een goothoogte van maximaal 3 meter.</li>
        <li><strong>Veiligheid:</strong> de woning moet voldoen aan het Bouwbesluit qua brandveiligheid, isolatie en constructie.</li>
      </ul>

      <h2>Meldingsplicht bij de gemeente</h2>
      <p>
        Vergunningsvrij betekent niet dat je de gemeente nergens van op de hoogte hoeft te stellen. Veel gemeenten hanteren een <strong>meldingsplicht</strong> voor mantelzorgwoningen. Bij deze melding toon je aan dat er een zorgrelatie is en dat de woning aan de eisen voldoet. De gemeente registreert de mantelzorgwoning en kan achteraf controleren. Meer informatie vind je in ons artikel over <a href="/kennisbank/mantelzorgwoning-regels" class="text-primary font-medium hover:underline">alle regels voor mantelzorgwoningen</a>.
      </p>
      <p>
        Neem altijd contact op met het Wmo-loket of de afdeling Vergunningen van je gemeente voordat je een mantelzorgwoning bestelt.
      </p>

      <h2>Wanneer is wel een vergunning nodig?</h2>
      <p>
        In deze situaties is een omgevingsvergunning vereist:
      </p>
      <ul>
        <li>De mantelzorgwoning is <strong>groter dan 100 m²</strong></li>
        <li>Het totaal aan bijgebouwen overschrijdt <strong>150 m² of 50% van het achtererfgebied</strong></li>
        <li>Je woning staat in een <strong>beschermd stadsgezicht of is een monument</strong></li>
        <li>Het bestemmingsplan van je gemeente stelt <strong>extra beperkingen</strong></li>
        <li>De woning wordt geplaatst in het <strong><a href="/kennisbank/regels-mantelzorgwoning-buitengebied" class="text-primary font-medium hover:underline">buitengebied</a> of op agrarische grond</strong></li>
      </ul>
      <p>
        Een omgevingsvergunning aanvragen kan via het Omgevingsloket. De doorlooptijd is 8 weken, met een mogelijke verlenging van 6 weken. De legeskosten liggen tussen 500 en 3.000 euro.
      </p>

      <blockquote>
        <p><strong>Wil je een vergunningsvrije mantelzorgwoning vergelijken?</strong> Bekijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Ontwikkelingen 2026: verruiming regels</h2>
      <p>
        Minister Keijzer heeft een wetsvoorstel ingediend om het vergunningsvrij bouwen van <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoningen</a> te verruimen. De verwachte wijzigingen:
      </p>
      <ul>
        <li>Vergunningsvrij bouwen wordt een <strong>landelijk recht</strong> dat gemeenten niet meer mogen inperken</li>
        <li>De doelgroep wordt mogelijk verbreed naar <strong>familieleden in bredere zin</strong>, niet alleen mantelzorgrelaties</li>
        <li>Gemeenten behouden de bevoegdheid om locatie-eisen te stellen</li>
      </ul>
      <p>
        Dit wetsvoorstel is nog in behandeling. Houd de website van de rijksoverheid in de gaten voor de definitieve regels.
      </p>

      <h2>Veelgestelde vragen</h2>
      <h3>Mag je overal een mantelzorgwoning plaatsen zonder vergunning?</h3>
      <p>
        Nee. Vergunningsvrij bouwen geldt alleen op het achtererfgebied van een bestaande woning binnen de bebouwde kom. In het buitengebied, op agrarische grond of bij monumenten is vrijwel altijd een vergunning nodig.
      </p>

      <h3>Heb je een doktersverklaring nodig voor een mantelzorgwoning?</h3>
      <p>
        In de meeste gevallen wel. De gemeente vraagt om bewijs van de zorgrelatie, bijvoorbeeld een verklaring van de huisarts of een CIZ-indicatie. Zonder bewijs van zorgbehoefte is vergunningsvrij bouwen niet mogelijk.
      </p>

      <h3>Wat is het verschil tussen vergunningsvrij en meldingsvrij?</h3>
      <p>
        Vergunningsvrij betekent dat je geen omgevingsvergunning nodig hebt. Het betekent niet dat je niets hoeft te melden. Veel gemeenten hebben een meldingsplicht voor mantelzorgwoningen waarbij je de zorgrelatie moet aantonen.
      </p>

      <h3>Hoe lang duurt een vergunningaanvraag voor een mantelzorgwoning?</h3>
      <p>
        De reguliere procedure duurt 8 weken. De gemeente kan dit eenmalig verlengen met 6 weken. Een vooroverleg met de gemeente vooraf kan het traject versnellen en voorkomt afwijzing.
      </p>
    `,
  "mantelzorgwoning-in-tuin": `
      <h2>Mag je een mantelzorgwoning in de tuin plaatsen?</h2>
      <p>
        Ja, in veel gevallen mag je een mantelzorgwoning in je achtertuin plaatsen <strong>zonder omgevingsvergunning</strong>. De voorwaarde is dat er een aantoonbare mantelzorgrelatie bestaat en dat de woning voldoet aan de eisen voor <a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrij</a> bouwen. De woning moet op het achtererfgebied staan, mag maximaal 100 m² zijn en niet hoger dan 5 meter.
      </p>
      <p>
        Een mantelzorgwoning in de tuin biedt het beste van twee werelden: de zorgvrager woont zelfstandig, met eigen voorzieningen en privacy, maar hulp is altijd dichtbij.
      </p>

      <h2>Voorwaarden voor plaatsing in de tuin</h2>
      <ul>
        <li><strong>Achtererfgebied:</strong> de woning mag alleen op het achtererf, niet in de voortuin of aan de zijkant voor de voorgevelrooilijn</li>
        <li><strong>Afstand tot erfgrens:</strong> geen wettelijk minimum, maar check het bestemmingsplan. Veel gemeenten hanteren 1 meter afstand</li>
        <li><strong>Toegankelijkheid:</strong> de woning moet bereikbaar zijn voor hulpdiensten. Een pad van minimaal 90 cm breed is aan te raden</li>
        <li><strong>Nutsaansluitingen:</strong> de woning heeft aansluitingen nodig voor water, elektriciteit en riolering. Deze worden doorgaans vanuit de hoofdwoning aangelegd</li>
        <li><strong>Bereikbaarheid voor plaatsing:</strong> een prefab woning moet met een vrachtwagen of kraan op locatie gebracht worden. De doorrijhoogte en breedte van de toegangsweg zijn bepalend</li>
      </ul>

      <h2>Welke tuin is geschikt?</h2>
      <p>
        Niet elke tuin is geschikt voor een mantelzorgwoning. Waar moet je op letten:
      </p>
      <ul>
        <li><strong>Oppervlakte:</strong> je hebt minimaal 50 tot 80 m² vrije ruimte nodig, inclusief ruimte rondom de woning voor onderhoud en toegang</li>
        <li><strong>Ondergrond:</strong> de grond moet draagkrachtig genoeg zijn voor een fundering. Op klei- of veengrond kan extra fundering nodig zijn</li>
        <li><strong>Bestaande bijgebouwen:</strong> het totaal aan bijgebouwen mag niet meer dan 150 m² bedragen. Heb je al een grote schuur, dan beperkt dit de mogelijkheden</li>
        <li><strong>Bomen en beplanting:</strong> controleer of er beschermde bomen op de beoogde locatie staan. Het kappen hiervan vereist een kapvergunning</li>
      </ul>

      <h2>Kosten van een mantelzorgwoning in de tuin</h2>
      <p>
        De totale <a href="/kennisbank/mantelzorgwoning-prijzen" class="text-primary font-medium hover:underline">kosten voor een mantelzorgwoning</a> in de tuin bestaan uit meerdere componenten:
      </p>
      <ul>
        <li><strong>Aanschaf woning:</strong> 50.000 tot 120.000 euro, afhankelijk van grootte en afwerking</li>
        <li><strong>Fundering:</strong> 3.000 tot 8.000 euro</li>
        <li><strong>Transport en plaatsing:</strong> 2.500 tot 5.500 euro</li>
        <li><strong>Nutsaansluitingen:</strong> 3.000 tot 7.000 euro</li>
        <li><strong>Tuinaanpassing:</strong> 1.000 tot 3.000 euro voor pad, bestrating en eventuele erfafscheiding</li>
      </ul>
      <p>
        In totaal kost een mantelzorgwoning in de tuin <strong>60.000 tot 145.000 euro</strong>. Huren is een alternatief vanaf 500 tot 900 euro per maand.
      </p>

      <blockquote>
        <p><strong>Wil je een mantelzorgwoning in je tuin plaatsen?</strong> Vergelijk aanbieders en ontvang een vrijblijvende offerte. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Stappenplan: mantelzorgwoning in de tuin</h2>
      <ul>
        <li><strong>Stap 1:</strong> Laat de zorgbehoefte vaststellen (huisarts of CIZ)</li>
        <li><strong>Stap 2:</strong> Neem contact op met je gemeente over de regels en meldingsplicht</li>
        <li><strong>Stap 3:</strong> Check of je tuin voldoet aan de eisen (oppervlakte, bijgebouwen, toegang)</li>
        <li><strong>Stap 4:</strong> Vraag offertes aan bij minimaal 3 aanbieders</li>
        <li><strong>Stap 5:</strong> Regel de fundering en nutsaansluitingen</li>
        <li><strong>Stap 6:</strong> Laat de woning plaatsen en meld dit bij de gemeente</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Hoe groot moet je tuin zijn voor een mantelzorgwoning?</h3>
      <p>
        Je hebt minimaal 50 tot 80 m² vrije ruimte nodig in je achtertuin. De woning zelf is doorgaans 35 tot 75 m², maar je hebt ook ruimte nodig voor een pad, onderhoud en afstand tot de erfgrens.
      </p>

      <h3>Mag een mantelzorgwoning in de voortuin?</h3>
      <p>
        Nee, vergunningsvrij bouwen geldt alleen voor het achtererfgebied. In de voortuin is alleen bouwen mogelijk met een omgevingsvergunning, en die wordt in de praktijk zelden verleend.
      </p>

      <h3>Moet de mantelzorgwoning los staan van het huis?</h3>
      <p>
        Niet per se. Een mantelzorgwoning mag ook als aanbouw aan de bestaande woning worden gerealiseerd, mits deze over een eigen ingang en eigen voorzieningen beschikt. Losstaand in de tuin is de meest voorkomende variant.
      </p>

      <h3>Kun je een mantelzorgwoning in de tuin huren?</h3>
      <p>
        Ja, diverse aanbieders verhuren mantelzorgwoningen vanaf 500 tot 900 euro per maand. Plaatsing en verwijdering zijn vaak inbegrepen. Dit is een goede optie als de zorgbehoefte tijdelijk is. Bekijk het aanbod van <a href="/aanbieders" class="text-primary font-medium hover:underline">aanbieders in jouw regio</a>.
      </p>
    `,
  "regels-mantelzorgwoning-buitengebied": `
      <h2>Mag je een mantelzorgwoning in het buitengebied plaatsen?</h2>
      <p>
        Ja, maar in het buitengebied gelden <strong>strengere regels</strong> dan binnen de bebouwde kom. Het bestemmingsplan speelt een cruciale rol: op grond met een <a href="/kennisbank/mantelzorgwoning-op-agrarische-grond" class="text-primary font-medium hover:underline">agrarische</a> of natuurbestemming is vergunningsvrij bouwen vaak niet mogelijk. In de meeste gevallen heb je een omgevingsvergunning of een ontheffing van het bestemmingsplan nodig.
      </p>
      <p>
        De exacte regels verschillen per gemeente. Sommige gemeenten in landelijke gebieden hebben specifiek beleid ontwikkeld voor <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoningen</a> in het buitengebied. Neem altijd als eerste stap contact op met je gemeente.
      </p>

      <h2>Wanneer geldt vergunningsvrij bouwen niet?</h2>
      <p>
        Vergunningsvrij bouwen in het buitengebied is niet mogelijk wanneer:
      </p>
      <ul>
        <li>Het perceel een <strong>agrarische bestemming</strong> heeft en de woning buiten het bouwvlak valt</li>
        <li>Het bestemmingsplan <strong>bijgebouwen beperkt</strong> in oppervlakte (veel buitengebied-plannen hanteren lagere maxima dan 150 m²)</li>
        <li>Het perceel in een <strong>Natura 2000-gebied</strong> of beschermd landschap ligt</li>
        <li>De gemeente een <strong>specifiek mantelzorgbeleid</strong> hanteert met extra voorwaarden</li>
      </ul>

      <h2>Vergunning aanvragen in het buitengebied</h2>
      <p>
        Als vergunningsvrij bouwen niet mogelijk is, kun je een <strong>omgevingsvergunning</strong> aanvragen. De procedure:
      </p>
      <ul>
        <li><strong>Vooroverleg:</strong> vraag een principeverzoek aan bij de gemeente om de haalbaarheid te toetsen. Kosten: 250 tot 500 euro</li>
        <li><strong>Aanvraag:</strong> dien de vergunningaanvraag in via het Omgevingsloket met bouwtekeningen en onderbouwing van de zorgrelatie</li>
        <li><strong>Doorlooptijd:</strong> de reguliere procedure duurt 8 weken, maar bij een afwijking van het bestemmingsplan kan een uitgebreide procedure nodig zijn (26 weken)</li>
        <li><strong>Legeskosten:</strong> 500 tot 3.000 euro, afhankelijk van de gemeente</li>
      </ul>
      <p>
        Sommige gemeenten stellen als eis dat de mantelzorgwoning in het buitengebied <strong>verplaatsbaar</strong> is, zodat deze na het einde van de zorgrelatie weer verwijderd kan worden.
      </p>

      <h2>Bestemmingsplan en bouwvlak</h2>
      <p>
        In het buitengebied is het bestemmingsplan bepalend. Elk perceel heeft een <strong>bouwvlak</strong>: het deel van het perceel waar gebouwd mag worden. Een mantelzorgwoning moet doorgaans binnen dit bouwvlak vallen. Buiten het bouwvlak bouwen vereist een bestemmingsplanwijziging of een buitenplanse omgevingsplanactiviteit (BOPA), wat een langere en duurdere procedure is.
      </p>
      <p>
        Je kunt het bestemmingsplan van je perceel opzoeken via <strong>ruimtelijkeplannen.nl</strong> of het Omgevingsloket. Zoek op je adres en bekijk welke bestemming en welk bouwvlak van toepassing zijn.
      </p>

      <blockquote>
        <p><strong>Wil je weten welke mantelzorgwoning geschikt is voor het buitengebied?</strong> Vergelijk verplaatsbare modellen bij meerdere aanbieders. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een mantelzorgwoning in het buitengebied vergunningsvrij?</h3>
      <p>
        Meestal niet. In het buitengebied gelden vaak strengere bestemmingsplanregels. Op agrarische grond of buiten het bouwvlak is vrijwel altijd een omgevingsvergunning nodig.
      </p>

      <h3>Hoe lang duurt een vergunningprocedure in het buitengebied?</h3>
      <p>
        De reguliere procedure duurt 8 weken. Als het bestemmingsplan gewijzigd moet worden, kan de procedure oplopen tot 26 weken of langer.
      </p>

      <h3>Moet een mantelzorgwoning in het buitengebied verplaatsbaar zijn?</h3>
      <p>
        Veel gemeenten eisen dat de mantelzorgwoning verplaatsbaar is, zodat deze na het einde van de zorgrelatie verwijderd kan worden. Een <a href="/prefab-woning" class="text-primary font-medium hover:underline">prefab</a> of modulaire woning voldoet hier doorgaans aan.
      </p>
    `,
  "mantelzorgwoning-na-overlijden": `
      <h2>Wat gebeurt er met een mantelzorgwoning na overlijden?</h2>
      <p>
        Wanneer de bewoner van een mantelzorgwoning overlijdt, <strong>vervalt de mantelzorgrelatie</strong> en daarmee het recht om de woning als woonruimte te gebruiken. De woning mag niet meer bewoond worden. Je bent echter niet verplicht om de woning direct te slopen. De meeste gemeenten hanteren een redelijke overgangstermijn.
      </p>
      <p>
        Welke opties je hebt, hangt af van hoe de mantelzorgwoning is geplaatst: vergunningsvrij of met een vergunning.
      </p>

      <h2>Opties bij een vergunningsvrije mantelzorgwoning</h2>
      <p>
        Bij een vergunningsvrij geplaatste mantelzorgwoning heb je de volgende mogelijkheden:
      </p>
      <ul>
        <li><strong>Onklaar maken:</strong> verwijder de keuken, badkamer en toilet. De ruimte mag dan als bijgebouw (berging, hobbykamer, kantoor) worden gebruikt, mits het oppervlak binnen de vergunningsvrije normen valt.</li>
        <li><strong>Verkopen:</strong> een modulaire of prefab mantelzorgwoning is doorgaans goed te verkopen. Op ons <a href="/occasions">occasions-overzicht</a> vind je tweedehands mantelzorgwoningen.</li>
        <li><strong>Verplaatsen:</strong> laat de woning verplaatsen naar een ander perceel waar wel een mantelzorgrelatie bestaat.</li>
        <li><strong>Volledig verwijderen:</strong> laat de woning slopen en het perceel herstellen. Sommige gemeenten vergoeden de verwijderingskosten via de Wmo.</li>
      </ul>

      <h2>Opties bij een vergunningsplichtige mantelzorgwoning</h2>
      <p>
        Als de mantelzorgwoning met een vergunning is geplaatst, staan de voorwaarden in de vergunning. In veel gevallen is als voorwaarde opgenomen dat de woning verwijderd moet worden wanneer de zorgrelatie eindigt. Raadpleeg de vergunningsvoorwaarden en neem contact op met je gemeente.
      </p>

      <h2>Overgangstermijn</h2>
      <p>
        De meeste gemeenten bieden een <strong>redelijke overgangstermijn</strong> na het einde van de mantelzorgrelatie. Er is geen wettelijk vastgelegde termijn, maar in de praktijk hanteren gemeenten vaak 3 tot 12 maanden. Gedurende deze termijn mag de woning niet meer bewoond worden, maar hoef je nog geen actie te ondernemen voor verwijdering of onklaarmaking.
      </p>
      <p>
        Neem na het overlijden contact op met je gemeente om de termijn en verplichtingen te bespreken. Veel gemeenten zijn bereid om in overleg een redelijke termijn af te spreken.
      </p>

      <blockquote>
        <p><strong>Wil je een mantelzorgwoning verkopen of verplaatsen?</strong> Plaats een gratis advertentie op ons <a href="/occasions">occasions-overzicht</a> of vergelijk nieuwe woningen via de <a href="/configurator">configurator</a>.</p>
      </blockquote>

      <h2>Financiele gevolgen</h2>
      <p>
        Het einde van de mantelzorgrelatie heeft ook financiele gevolgen. Lees meer over de <a href="/kennisbank/mantelzorgwoning-belasting" class="text-primary font-medium hover:underline">fiscale gevolgen van een mantelzorgwoning</a>.
      </p>
      <ul>
        <li><strong>WOZ-waarde:</strong> als de mantelzorgwoning wordt verwijderd, kan de WOZ-waarde van het perceel dalen. Dit verlaagt de ozb-aanslag.</li>
        <li><strong>Verwijderingskosten:</strong> het verwijderen van een mantelzorgwoning kost 3.000 tot 8.000 euro, afhankelijk van het type en de locatie. Sommige gemeenten vergoeden deze kosten via de Wmo.</li>
        <li><strong>Restwaarde:</strong> een goed onderhouden <a href="/prefab-woning" class="text-primary font-medium hover:underline">prefab mantelzorgwoning</a> behoudt 40 tot 70% van de oorspronkelijke waarde bij verkoop.</li>
        <li><strong>Erfbelasting:</strong> als de mantelzorgwoning eigendom was van de overledene, valt deze in de nalatenschap en kan erfbelasting verschuldigd zijn over de waarde.</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Moet je een mantelzorgwoning verwijderen na overlijden?</h3>
      <p>
        De woonfunctie vervalt, maar je bent niet verplicht om de woning te slopen. Je kunt de woning onklaar maken (keuken en badkamer verwijderen) en als bijgebouw behouden, of verkopen en verplaatsen.
      </p>

      <h3>Hoe lang mag een mantelzorgwoning na overlijden blijven staan?</h3>
      <p>
        Er is geen wettelijke termijn. Gemeenten hanteren doorgaans een overgangstermijn van 3 tot 12 maanden. Neem contact op met je gemeente voor de specifieke termijn.
      </p>

      <h3>Kun je een mantelzorgwoning doorverkopen?</h3>
      <p>
        Ja. Modulaire en prefab mantelzorgwoningen zijn goed verkoopbaar. Een goed onderhouden woning behoudt 40 tot 70% van de oorspronkelijke waarde. Via ons occasions-overzicht kun je tweedehands woningen aanbieden.
      </p>
    `,
  "mantelzorgwoning-op-agrarische-grond": `
      <h2>Mag je een mantelzorgwoning op agrarische grond plaatsen?</h2>
      <p>
        Op agrarische grond is het plaatsen van een mantelzorgwoning <strong>niet <a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrij</a></strong> mogelijk. Het bestemmingsplan staat op agrarische grond in principe geen woonfunctie toe, behalve voor de bedrijfswoning van de agrariër. Voor een mantelzorgwoning heb je een omgevingsvergunning of ontheffing van het bestemmingsplan nodig.
      </p>
      <p>
        Toch zijn er wel degelijk mogelijkheden. Veel gemeenten in landelijke gebieden hebben beleid ontwikkeld om mantelzorgwoningen op agrarische percelen toe te staan, mits aan specifieke voorwaarden wordt voldaan. Lees ook over de <a href="/kennisbank/regels-mantelzorgwoning-buitengebied" class="text-primary font-medium hover:underline">algemene regels in het buitengebied</a>.
      </p>

      <h2>Waarom geldt vergunningsvrij bouwen niet op agrarische grond?</h2>
      <p>
        Vergunningsvrij bouwen geldt voor het <strong>achtererfgebied</strong> van een woning. Op agrarische grond is de hoofdwoning een bedrijfswoning met een agrarische bestemming. Het toevoegen van een extra woning, ook al is het een mantelzorgwoning, past niet binnen de agrarische bestemming. Bovendien hanteren veel bestemmingsplannen voor het buitengebied strengere regels voor bijgebouwen.
      </p>
      <p>
        De gemeente moet beoordelen of de mantelzorgwoning past binnen het bestemmingsplan of dat een afwijking gerechtvaardigd is.
      </p>

      <h2>Vergunning aanvragen: het stappenplan</h2>
      <ul>
        <li><strong>Stap 1:</strong> Check het bestemmingsplan van je perceel via ruimtelijkeplannen.nl. Kijk naar de bestemming en het bouwvlak.</li>
        <li><strong>Stap 2:</strong> Neem contact op met je gemeente voor een vooroverleg. Bespreek de mogelijkheden en voorwaarden.</li>
        <li><strong>Stap 3:</strong> Laat de zorgbehoefte vaststellen door een huisarts of het CIZ.</li>
        <li><strong>Stap 4:</strong> Vraag offertes aan bij aanbieders van verplaatsbare mantelzorgwoningen.</li>
        <li><strong>Stap 5:</strong> Dien de omgevingsvergunning in via het Omgevingsloket met bouwtekeningen, situatietekening en onderbouwing zorgrelatie.</li>
        <li><strong>Stap 6:</strong> Wacht de beschikking af. Bij een reguliere procedure duurt dit 8 weken, bij een bestemmingsplanwijziging tot 26 weken.</li>
      </ul>

      <h2>Voorwaarden die gemeenten vaak stellen</h2>
      <p>
        Gemeenten stellen doorgaans de volgende extra voorwaarden voor mantelzorgwoningen op agrarische grond:
      </p>
      <ul>
        <li><strong>Verplaatsbaarheid:</strong> de woning moet demontabel of verplaatsbaar zijn, zodat deze verwijderd kan worden wanneer de zorgrelatie eindigt</li>
        <li><strong>Binnen het bouwvlak:</strong> de woning moet binnen het bestaande bouwvlak van het agrarische perceel vallen</li>
        <li><strong>Landschappelijke inpassing:</strong> de woning moet passen in het landschap qua materiaalgebruik, kleur en positionering</li>
        <li><strong>Maximale oppervlakte:</strong> vaak lager dan 100 m², sommige gemeenten hanteren 75 m² als maximum</li>
        <li><strong>Tijdelijke vergunning:</strong> de vergunning wordt soms voor een beperkte periode (5 of 10 jaar) verleend</li>
      </ul>

      <blockquote>
        <p><strong>Op zoek naar een verplaatsbare mantelzorgwoning?</strong> Vergelijk aanbieders die gespecialiseerd zijn in het buitengebied. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een mantelzorgwoning op agrarische grond vergunningsvrij?</h3>
      <p>
        Nee. Op agrarische grond is vergunningsvrij bouwen van een mantelzorgwoning niet mogelijk. Je hebt een omgevingsvergunning nodig.
      </p>

      <h3>Hoelang duurt de vergunningprocedure op agrarische grond?</h3>
      <p>
        De reguliere procedure duurt 8 weken. Als het bestemmingsplan gewijzigd moet worden, kan dit oplopen tot 26 weken of langer. Een vooroverleg met de gemeente verkort het traject.
      </p>

      <h3>Mag een mantelzorgwoning op agrarische grond permanent blijven staan?</h3>
      <p>
        Meestal niet. De meeste gemeenten verlenen een tijdelijke vergunning die gekoppeld is aan de mantelzorgrelatie. Na het einde van de zorg moet de woning verwijderd worden. Lees wat je kunt doen in ons artikel over <a href="/kennisbank/mantelzorgwoning-na-overlijden" class="text-primary font-medium hover:underline">mantelzorgwoning na overlijden</a>.
      </p>
    `,
  "voor-en-nadelen-mantelzorgwoning": `
      <h2>Voordelen van een mantelzorgwoning</h2>
      <p>
        Een mantelzorgwoning biedt concrete voordelen voor zowel de zorgvrager als de mantelzorger. Hieronder de belangrijkste:
      </p>

      <h3>Nabijheid zonder verlies van privacy</h3>
      <p>
        De zorgvrager woont op loopafstand, maar in een <strong>eigen zelfstandige woning</strong> met eigen voordeur, keuken en badkamer. Beide partijen behouden hun dagritme en leefruimte. Er zijn geen vaste bezoekuren zoals in een zorginstelling.
      </p>

      <h3>Lagere kosten dan een zorginstelling</h3>
      <p>
        Een plek in een verzorgingshuis kost gemiddeld <strong>2.000 tot 3.500 euro per maand</strong> aan eigen bijdrage (via het CAK). Een mantelzorgwoning is bij aanschaf een eenmalige investering van <a href="/kennisbank/mantelzorgwoning-prijzen" class="text-primary font-medium hover:underline">50.000 tot 150.000 euro</a>. Op een termijn van 3 tot 5 jaar is een eigen mantelzorgwoning vrijwel altijd goedkoper.
      </p>

      <h3>Snelle beschikbaarheid</h3>
      <p>
        Wachtlijsten voor verpleeghuizen lopen op tot maanden of zelfs jaren. Een prefab mantelzorgwoning is binnen <strong>8 tot 16 weken</strong> geplaatst. Bij verhuur zelfs binnen enkele weken.
      </p>

      <h3>Vergunningsvrij mogelijk</h3>
      <p>
        Onder voorwaarden mag een mantelzorgwoning <a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrij</a> in de achtertuin worden geplaatst. Dit bespaart tijd, kosten en administratieve rompslomp.
      </p>

      <h3>Waardebehoud</h3>
      <p>
        Een modulaire mantelzorgwoning behoudt 40 tot 70% van de waarde en is verkoopbaar of verplaatsbaar na gebruik. De investering is niet verloren wanneer de zorgrelatie eindigt.
      </p>

      <h2>Nadelen van een mantelzorgwoning</h2>
      <p>
        Er zijn ook aandachtspunten en nadelen waar je rekening mee moet houden:
      </p>

      <h3>Privacy kan onder druk komen</h3>
      <p>
        Hoewel beide partijen een eigen woning hebben, woon je <strong>wel op hetzelfde perceel</strong>. De nabijheid kan ertoe leiden dat grenzen vervagen. Het is belangrijk om vooraf afspraken te maken over wanneer je wel en niet beschikbaar bent.
      </p>

      <h3>Hoge eenmalige investering</h3>
      <p>
        De aanschafkosten van 50.000 tot 150.000 euro plus bijkomende kosten voor fundering, transport en nutsaansluitingen vormen een forse investering. Niet iedereen heeft dit budget beschikbaar. Huren (500 tot 900 euro per maand) is een alternatief.
      </p>

      <h3>Tuinruimte gaat verloren</h3>
      <p>
        Een mantelzorgwoning neemt een substantieel deel van je tuin in beslag. Bij een kleinere tuin kan dit betekenen dat er weinig buitenruimte overblijft. Bedenk vooraf of je bereid bent om die ruimte op te geven.
      </p>

      <h3>Regelgeving en administratie</h3>
      <p>
        Hoewel vergunningsvrij bouwen de procedure vereenvoudigt, is er nog steeds administratie nodig: zorgverklaring regelen, melding bij de gemeente, offertes vergelijken, fundering en aansluitingen organiseren. In het buitengebied of bij monumenten is een vergunning vereist, wat het traject verlengt.
      </p>

      <h3>Woonfunctie vervalt bij einde zorg</h3>
      <p>
        Wanneer de mantelzorgrelatie eindigt, mag de woning niet meer bewoond worden. Je moet de woning onklaar maken, verkopen, verplaatsen of verwijderen. Dit kan een emotioneel en praktisch belastend moment zijn.
      </p>

      <blockquote>
        <p><strong>Wil je de mogelijkheden voor jouw situatie verkennen?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Mantelzorgwoning vs. alternatieven</h2>
      <p>
        Een mantelzorgwoning is niet de enige optie. Hoe verhoudt het zich tot alternatieven:
      </p>
      <ul>
        <li><strong>Inwonen:</strong> goedkoper, maar minder privacy. Vereist vaak een verbouwing van het bestaande huis.</li>
        <li><strong>Verzorgingshuis:</strong> professionele zorg beschikbaar, maar minder zelfstandigheid en hogere maandkosten.</li>
        <li><strong>Thuiszorg:</strong> flexibel, maar beperkt in uren. Niet geschikt bij intensieve zorgbehoefte.</li>
        <li><strong>Aanleunwoning:</strong> vergelijkbaar concept, maar dan bij een zorginstelling in plaats van bij een familielid.</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een mantelzorgwoning de moeite waard?</h3>
      <p>
        Voor de meeste gezinnen met een langdurige zorgbehoefte is een mantelzorgwoning financieel en emotioneel een goede keuze. De combinatie van nabijheid, zelfstandigheid en lagere kosten dan een zorginstelling weegt voor veel families op tegen de nadelen.
      </p>

      <h3>Wat is het grootste nadeel van een mantelzorgwoning?</h3>
      <p>
        Het meest genoemde nadeel is de mogelijke druk op de privacy. Dit is op te lossen met goede afspraken en een doordachte positionering van de woning op het perceel.
      </p>

      <h3>Kun je een mantelzorgwoning verkopen als je hem niet meer nodig hebt?</h3>
      <p>
        Ja. Een modulaire of prefab mantelzorgwoning is goed verkoopbaar. De restwaarde ligt doorgaans tussen de 40 en 70% van de oorspronkelijke aanschafprijs. Op ons <a href="/occasions/mantelzorgwoning" class="text-primary font-medium hover:underline">occasions-overzicht</a> worden regelmatig tweedehands mantelzorgwoningen aangeboden.
      </p>
    `,
  "mantelzorgwoning-regels": `
      <h2>De belangrijkste regels op een rij</h2>
      <p>
        De regels voor <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoningen</a> zijn vastgelegd in het Besluit bouwwerken leefomgeving (Bbl) en de Omgevingswet. Sinds 2024 mogen gemeenten eigen regels vaststellen, maar de landelijke richtlijnen vormen het uitgangspunt. In 2026 werkt het kabinet aan een wetsvoorstel om vergunningsvrij bouwen weer <strong>landelijk uniform</strong> te regelen.
      </p>
      <p>
        Hieronder vind je alle regels die nu gelden, van afmetingen tot zorgrelatie.
      </p>

      <h2>Regel 1: Aantoonbare zorgrelatie</h2>
      <p>
        De belangrijkste voorwaarde is dat er een <strong>aantoonbare mantelzorgrelatie</strong> bestaat. De bewoner van de mantelzorgwoning moet intensieve zorg nodig hebben (8 uur of meer per week), of de bewoner is de mantelzorger die zorg verleent aan iemand in de hoofdwoning.
      </p>
      <p>
        Als bewijs geldt een verklaring van de huisarts, wijkverpleegkundige of een CIZ-indicatie. Zonder bewijs van zorgbehoefte is vergunningsvrij bouwen niet mogelijk.
      </p>

      <h2>Regel 2: Locatie op het achtererfgebied</h2>
      <p>
        De mantelzorgwoning moet op het <strong>achtererfgebied</strong> staan, minimaal 1 meter achter de voorgevelrooilijn. Het achtererfgebied is het deel van je perceel achter de achtergevel, plus de grond aan de zijkanten achter de voorgevelrooilijn. Plaatsing in de voortuin is niet toegestaan bij vergunningsvrij bouwen.
      </p>

      <h2>Regel 3: Maximaal 100 m²</h2>
      <p>
        De mantelzorgwoning mag maximaal <strong>100 vierkante meter</strong> groot zijn. Dit oppervlak telt mee in het totaal aan bijgebouwen, dat maximaal 150 m² mag bedragen en niet meer dan 50% van het achtererfgebied mag beslaan.
      </p>

      <h2>Regel 4: Hoogte maximaal 5 meter</h2>
      <p>
        De maximale hoogte hangt af van de afstand tot de hoofdwoning:
      </p>
      <ul>
        <li>Binnen 4 meter: niet hoger dan de hoofdwoning, max 5 meter</li>
        <li>Meer dan 4 meter: goothoogte max 3 meter, nokhoogte max 5 meter</li>
        <li>Plat dak op meer dan 4 meter afstand: max 3 meter</li>
      </ul>

      <h2>Regel 5: Veiligheid en bouwkwaliteit</h2>
      <p>
        De mantelzorgwoning moet voldoen aan het <strong>Bouwbesluit</strong> (nu Besluit bouwwerken leefomgeving) op het gebied van:
      </p>
      <ul>
        <li>Brandveiligheid (rookmelders, vluchtwegen)</li>
        <li>Constructieve veiligheid</li>
        <li>Isolatie (minimale RC-waarden)</li>
        <li>Ventilatie</li>
        <li>Veilige elektra- en wateraansluitingen</li>
      </ul>

      <h2>Regel 6: Meldingsplicht</h2>
      <p>
        Vergunningsvrij betekent niet dat je niets hoeft te melden. Veel gemeenten hanteren een <strong>meldingsplicht</strong>. Je meldt de plaatsing bij de gemeente en toont aan dat er een zorgrelatie is. De gemeente registreert de mantelzorgwoning en kan controleren.
      </p>

      <h2>Regel 7: Einde zorgrelatie</h2>
      <p>
        Wanneer de mantelzorgrelatie eindigt (door <a href="/kennisbank/mantelzorgwoning-na-overlijden" class="text-primary font-medium hover:underline">overlijden</a>, verhuizing of herstel), <strong>vervalt de woonfunctie</strong>. De woning mag niet meer bewoond worden. Je kunt de woning onklaar maken (keuken en badkamer verwijderen) en als bijgebouw behouden, of verkopen en verplaatsen.
      </p>

      <blockquote>
        <p><strong>Wil je een mantelzorgwoning die aan alle regels voldoet?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Wanneer is een vergunning nodig?</h2>
      <p>
        Een omgevingsvergunning is vereist wanneer:
      </p>
      <ul>
        <li>De woning groter is dan 100 m²</li>
        <li>Het totaal aan bijgebouwen meer dan 150 m² of 50% van het achtererfgebied bedraagt</li>
        <li>De woning in een beschermd stadsgezicht of bij een monument staat</li>
        <li>Het perceel in het <a href="/kennisbank/regels-mantelzorgwoning-buitengebied" class="text-primary font-medium hover:underline">buitengebied</a> of op agrarische grond ligt</li>
        <li>De gemeente strengere regels hanteert in het omgevingsplan</li>
      </ul>

      <h2>Veranderingen in 2026</h2>
      <p>
        Minister Keijzer werkt aan een wetsvoorstel met de volgende verwachte wijzigingen:
      </p>
      <ul>
        <li>Vergunningsvrij bouwen wordt weer een <strong>landelijk recht</strong></li>
        <li>De doelgroep wordt mogelijk verbreed naar familieleden in bredere zin</li>
        <li>Gemeenten behouden de bevoegdheid om locatie-eisen te stellen</li>
      </ul>

      <h2>Veelgestelde vragen</h2>
      <h3>Heb je altijd een doktersverklaring nodig?</h3>
      <p>
        In de meeste gemeenten wel. De gemeente wil bewijs dat er sprake is van intensieve mantelzorg. Een verklaring van de huisarts of een CIZ-indicatie volstaat meestal.
      </p>

      <h3>Mag je een mantelzorgwoning verhuren?</h3>
      <p>
        Nee. Een vergunningsvrije mantelzorgwoning mag alleen bewoond worden in het kader van mantelzorg. Verhuur aan derden is niet toegestaan.
      </p>

      <h3>Hoeveel mantelzorgwoningen mag je op je perceel plaatsen?</h3>
      <p>
        In principe een, mits het totaal aan bijgebouwen binnen de 150 m² en 50% van het achtererfgebied blijft. Het plaatsen van meerdere mantelzorgwoningen is in de praktijk zelden mogelijk.
      </p>

      <h3>Gelden dezelfde regels in elke gemeente?</h3>
      <p>
        Nee. Sinds 2024 mogen gemeenten eigen regels vaststellen. De landelijke richtlijnen vormen het uitgangspunt, maar er kunnen per gemeente strengere eisen gelden. Check altijd bij je eigen gemeente.
      </p>
    `,
  "schenkbelasting-mantelzorgwoning": `
      <h2>Wanneer betaal je schenkbelasting over een mantelzorgwoning?</h2>
      <p>
        Als je ouders een <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> betalen die op <strong>jouw grond</strong> wordt geplaatst, kan de Belastingdienst dit beschouwen als een schenking. De redenering: je ouders betalen de woning, maar omdat deze op jouw perceel staat, word jij door natrekking eigenaar. De waarde van de woning is dan een schenking van je ouders aan jou.
      </p>
      <p>
        Dit kan een forse belastingclaim opleveren. Bij een mantelzorgwoning van 80.000 euro en een jaarlijkse vrijstelling van circa 6.600 euro (ouder-kind, 2026) betaal je over het meerdere <strong>10 tot 20% schenkbelasting</strong>, afhankelijk van de relatie en het bedrag.
      </p>

      <h2>Hoe voorkom je schenkbelasting?</h2>
      <p>
        De meest gebruikte oplossing is het vestigen van een <strong>opstalrecht</strong> bij de notaris. Met een opstalrecht wordt vastgelegd dat je ouders eigenaar blijven van de mantelzorgwoning, ook al staat deze op jouw grond. Omdat je ouders eigenaar zijn van wat ze betalen, is er geen sprake van een schenking.
      </p>
      <p>
        Het vestigen van een opstalrecht kost circa <strong>500 tot 1.000 euro</strong> aan notariskosten. Dit is een fractie van de schenkbelasting die je anders verschuldigd zou zijn.
      </p>

      <h2>Wat is natrekking?</h2>
      <p>
        Natrekking is een juridisch principe dat bepaalt dat alles wat <strong>duurzaam verbonden</strong> is met de grond, eigendom wordt van de grondeigenaar. Een mantelzorgwoning op een fundering wordt daardoor automatisch eigendom van de perceeleigenaar, ook als iemand anders de woning heeft betaald.
      </p>
      <p>
        Een opstalrecht doorbreekt dit principe. Het geeft de eigenaar van de woning het recht om een bouwwerk op andermans grond te bezitten.
      </p>

      <h2>Rekenvoorbeeld</h2>
      <p>
        Stel: je ouders betalen een mantelzorgwoning van 80.000 euro die op jouw grond wordt geplaatst.
      </p>
      <ul>
        <li><strong>Zonder opstalrecht:</strong> de volledige 80.000 euro geldt als schenking. Na aftrek van de vrijstelling (6.600 euro) betaal je over 73.400 euro circa <strong>7.340 tot 14.680 euro</strong> schenkbelasting.</li>
        <li><strong>Met opstalrecht:</strong> je ouders blijven eigenaar, er is geen schenking, dus <strong>0 euro</strong> schenkbelasting. Kosten notaris: circa 750 euro.</li>
      </ul>

      <blockquote>
        <p><strong>Wil je mantelzorgwoningen vergelijken en een offerte ontvangen?</strong> Vergelijk aanbieders via onze <a href="/configurator">configurator</a> en ontvang vrijblijvend offertes.</p>
      </blockquote>

      <h2>Andere aandachtspunten bij de notaris</h2>
      <ul>
        <li><strong>Gebruikersvergoeding:</strong> overweeg om een symbolische gebruikersvergoeding vast te leggen voor het gebruik van de grond door je ouders</li>
        <li><strong>Einde opstalrecht:</strong> leg vast wat er gebeurt met het opstalrecht wanneer de zorgrelatie eindigt (verwijdering, verkoop, overdracht). Lees meer over <a href="/kennisbank/mantelzorgwoning-na-overlijden" class="text-primary font-medium hover:underline">wat er na overlijden met een mantelzorgwoning</a> gebeurt.</li>
        <li><strong>Erfrecht:</strong> het opstalrecht valt bij overlijden in de nalatenschap van je ouders. Maak hierover afspraken in een testament</li>
      </ul>
      <p>
        Lees meer over de bredere <a href="/kennisbank/mantelzorgwoning-belasting" class="text-primary font-medium hover:underline">fiscale gevolgen van een mantelzorgwoning</a> in ons overzichtsartikel.
      </p>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een opstalrecht verplicht bij een mantelzorgwoning?</h3>
      <p>
        Niet verplicht, maar sterk aan te raden als iemand anders dan de grondeigenaar de woning betaalt. Zonder opstalrecht loop je het risico op een forse schenkbelasting-aanslag.
      </p>

      <h3>Wat kost een opstalrecht bij de notaris?</h3>
      <p>
        De notariskosten voor het vestigen van een opstalrecht liggen tussen de 500 en 1.000 euro. De inschrijving bij het Kadaster kost circa 80 tot 130 euro extra.
      </p>

      <h3>Moet je schenkbelasting betalen als je de mantelzorgwoning zelf betaalt?</h3>
      <p>
        Nee. Als je zelf betaalt voor een mantelzorgwoning op je eigen grond, is er geen sprake van een schenking. Schenkbelasting speelt alleen wanneer een ander de woning betaalt.
      </p>
    `,
  "mantelzorgwoning-eigen-huisnummer": `
      <h2>Heeft een mantelzorgwoning een eigen huisnummer?</h2>
      <p>
        Een <a href="/kennisbank/mantelzorgwoning-vergunningsvrij" class="text-primary font-medium hover:underline">vergunningsvrije</a> mantelzorgwoning heeft <strong>niet standaard een eigen huisnummer</strong>. De woning wordt beschouwd als bijgebouw bij de hoofdwoning en deelt het adres. Maar je kunt bij de gemeente een apart huisnummer aanvragen als de woning over eigen voorzieningen beschikt.
      </p>
      <p>
        De Wet basisregistratie adressen en gebouwen (BAG) bepaalt dat een verblijfsobject met een <strong>eigen toegang, keuken, badkamer en toilet</strong> recht heeft op een eigen adres. Veel mantelzorgwoningen voldoen hieraan.
      </p>

      <h2>Wanneer is een eigen huisnummer verstandig?</h2>
      <p>
        Een apart huisnummer kan voordelig zijn in deze situaties:
      </p>
      <ul>
        <li><strong>AOW en toeslagen:</strong> met een eigen adres wordt de bewoner als zelfstandig huishouden beschouwd. Dit kan voordelig zijn voor de AOW (alleenstaanden-norm in plaats van samenwonend) en zorgtoeslag.</li>
        <li><strong>Post en bereikbaarheid:</strong> een eigen adres maakt het ontvangen van post en bezoek eenvoudiger.</li>
        <li><strong>Hulpdiensten:</strong> bij een noodgeval kunnen ambulance en brandweer het juiste adres sneller vinden.</li>
      </ul>

      <h2>Nadelen van een eigen huisnummer</h2>
      <p>
        Een eigen huisnummer heeft ook keerzijden:
      </p>
      <ul>
        <li><strong>Gemeentelijke belastingen:</strong> een apart adres betekent een eigen WOZ-beschikking en eigen ozb-aanslag. Dit zijn extra kosten van 200 tot 800 euro per jaar.</li>
        <li><strong>Waterschapsbelasting:</strong> een apart huishouden betaalt eigen waterschapsbelasting.</li>
        <li><strong>Toeslagpartner:</strong> het risico dat je als toeslagpartner wordt aangemerkt vervalt weliswaar, maar je bent ook niet meer elkaars fiscaal partner. Dit kan nadelig zijn voor de inkomstenbelasting.</li>
        <li><strong>Nutscontracten:</strong> aparte contracten voor energie en water, met eigen vastrecht.</li>
      </ul>

      <h2>Hoe vraag je een eigen huisnummer aan?</h2>
      <p>
        Het aanvragen van een eigen huisnummer verloopt via de gemeente:
      </p>
      <ul>
        <li><strong>Stap 1:</strong> Dien een verzoek in bij de afdeling Burgerzaken of BAG-beheer van je gemeente.</li>
        <li><strong>Stap 2:</strong> De gemeente beoordeelt of de mantelzorgwoning als zelfstandig verblijfsobject kwalificeert (eigen toegang en voorzieningen).</li>
        <li><strong>Stap 3:</strong> Bij goedkeuring wordt een huisnummer toegekend en ingeschreven in de BAG.</li>
        <li><strong>Stap 4:</strong> De bewoner schrijft zich in op het nieuwe adres bij de gemeente (GBA).</li>
      </ul>
      <p>
        De doorlooptijd is doorgaans 4 tot 8 weken. De kosten voor de aanvraag varieren per gemeente van gratis tot circa 100 euro.
      </p>

      <blockquote>
        <p><strong>Op zoek naar een mantelzorgwoning met alle voorzieningen?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een eigen huisnummer verplicht voor een mantelzorgwoning?</h3>
      <p>
        Nee, het is niet verplicht. Je kunt een eigen huisnummer aanvragen als de woning over eigen voorzieningen beschikt, maar het is geen vereiste voor vergunningsvrij bouwen.
      </p>

      <h3>Heeft een eigen huisnummer gevolgen voor mijn AOW?</h3>
      <p>
        Ja. Met een eigen adres wordt de bewoner als alleenstaand huishouden beschouwd. Dit kan leiden tot een hogere AOW-uitkering (alleenstaanden-norm) en hogere zorgtoeslag. Lees meer over alle <a href="/kennisbank/mantelzorgwoning-belasting" class="text-primary font-medium hover:underline">fiscale gevolgen van een mantelzorgwoning</a>.
      </p>

      <h3>Kan de gemeente een eigen huisnummer weigeren?</h3>
      <p>
        De gemeente kan weigeren als de mantelzorgwoning niet als zelfstandig verblijfsobject kwalificeert, bijvoorbeeld als er geen eigen keuken of badkamer aanwezig is. In dat geval deelt de woning het adres van de <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">hoofdwoning</a>.
      </p>
    `,
  "mantelzorgwoning-belasting": `
      <h2>Welke belastingen spelen bij een mantelzorgwoning?</h2>
      <p>
        Een <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> heeft gevolgen voor meerdere belastingen: <strong>inkomstenbelasting, onroerendezaakbelasting, schenkbelasting en toeslagen</strong>. De exacte gevolgen hangen af van wie de woning betaalt, op wiens grond deze staat en of er een eigen huisnummer is.
      </p>
      <p>
        Hieronder behandelen we alle fiscale aandachtspunten zodat je niet voor verrassingen komt te staan.
      </p>

      <h2>Inkomstenbelasting: box 1 of box 3?</h2>
      <p>
        Een mantelzorgwoning valt <strong>niet</strong> onder de eigenwoningregeling (box 1). Dit betekent dat je geen hypotheekrenteaftrek krijgt voor de financiering van een mantelzorgwoning. De Belastingdienst beschouwt een mantelzorgwoning als tijdelijk en ondergeschikt aan de hoofdwoning.
      </p>
      <p>
        Als de woning eigendom is van de perceeleigenaar (het kind), valt de waarde in <strong>box 3</strong> (vermogen). De waarde wordt jaarlijks belast tegen het forfaitaire rendement. Bij een waarde van 80.000 euro is dit circa 800 tot 1.500 euro per jaar aan extra belasting, afhankelijk van het totale vermogen.
      </p>
      <p>
        Als er een <strong>opstalrecht</strong> is gevestigd en je ouders eigenaar zijn, valt de woning in box 3 van je ouders.
      </p>

      <h2>WOZ en onroerendezaakbelasting</h2>
      <p>
        Een vergunningsvrije mantelzorgwoning <strong>zonder <a href="/kennisbank/mantelzorgwoning-eigen-huisnummer" class="text-primary font-medium hover:underline">eigen huisnummer</a></strong> telt doorgaans niet mee voor de WOZ-waarde van de hoofdwoning. Dit is fiscaal gunstig: je betaalt geen hogere ozb.
      </p>
      <p>
        Heeft de mantelzorgwoning <strong>wel een eigen huisnummer</strong>, dan krijgt deze een eigen WOZ-beschikking en een eigen ozb-aanslag. Reken op 200 tot 800 euro per jaar extra aan gemeentelijke belastingen.
      </p>

      <h2>Schenkbelasting</h2>
      <p>
        Als je ouders de mantelzorgwoning betalen maar de woning op jouw grond staat, kan de Belastingdienst dit zien als een <strong>schenking door natrekking</strong>. De oplossing: vestig een opstalrecht bij de notaris. Hiermee blijven je ouders eigenaar en is er geen schenking. Lees meer in ons artikel over <a href="/kennisbank/schenkbelasting-mantelzorgwoning">schenkbelasting bij mantelzorgwoningen</a>.
      </p>

      <h2>Toeslagen en uitkeringen</h2>
      <p>
        De inschrijving op hetzelfde adres of een apart adres heeft gevolgen voor toeslagen:
      </p>
      <ul>
        <li><strong>Zonder eigen huisnummer:</strong> de bewoner staat op hetzelfde adres en kan als medebewoner of toeslagpartner worden aangemerkt. Dit kan leiden tot lagere toeslagen (zorgtoeslag, huurtoeslag) en een lagere AOW (samenwonend-norm).</li>
        <li><strong>Met eigen huisnummer:</strong> de bewoner is een zelfstandig huishouden. Dit kan leiden tot hogere toeslagen en een hogere AOW (alleenstaanden-norm).</li>
      </ul>
      <p>
        Overleg vooraf met de Belastingdienst of een fiscaal adviseur over de gevolgen voor jouw situatie.
      </p>

      <blockquote>
        <p><strong>Wil je een mantelzorgwoning vergelijken?</strong> Vergelijk aanbieders en ontvang een offerte op maat via onze <a href="/configurator">configurator</a>.</p>
      </blockquote>

      <h2>Btw-tarief</h2>
      <p>
        Voor de plaatsing van een mantelzorgwoning bij een bestaande woning (ouder dan 2 jaar) geldt het <strong>verlaagde btw-tarief van 9%</strong> in plaats van 21%. Dit is geregeld als woningverbetering en kan bij een woning van 80.000 euro een besparing van circa 9.600 euro opleveren.
      </p>
      <p>
        Let op: het verlaagde tarief geldt voor het arbeids- en materiaalgedeelte van de plaatsing, niet voor de aanschaf van een kant-en-klare woning. Bespreek dit met je aanbieder.
      </p>

      <h2>Veelgestelde vragen</h2>
      <h3>Is hypotheekrente voor een mantelzorgwoning aftrekbaar?</h3>
      <p>
        Nee. Een mantelzorgwoning valt niet onder de eigenwoningregeling. De hypotheekrente is niet aftrekbaar in box 1.
      </p>

      <h3>Betaal je meer belasting als je een mantelzorgwoning hebt?</h3>
      <p>
        Mogelijk wel. De waarde van de mantelzorgwoning wordt in box 3 belast. Daarnaast kan een eigen huisnummer leiden tot extra gemeentelijke belastingen. Maar dit wordt vaak gecompenseerd door lagere zorgkosten.
      </p>

      <h3>Zijn de kosten van een mantelzorgwoning aftrekbaar als zorgkosten?</h3>
      <p>
        In de meeste gevallen niet. De aanschaf- en plaatsingskosten gelden niet als specifieke zorgkosten. Wel kunnen bepaalde aanpassingen voor een ziekte of handicap (drempels, steunen, douchezit) als zorgkosten aftrekbaar zijn.
      </p>
    `,
  "mantelzorgwoning-financieren": `
      <h2>Hoe financier je een mantelzorgwoning?</h2>
      <p>
        Er zijn meerdere manieren om een <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> te financieren. De beste optie hangt af van je persoonlijke situatie: heb je overwaarde op je huis, spaargeld beschikbaar, of geef je de voorkeur aan huur? Hieronder behandelen we alle mogelijkheden.
      </p>

      <h2>Hypotheek verhogen</h2>
      <p>
        De meest gebruikte financieringsvorm is een <strong>verhoging van de bestaande hypotheek</strong>. Als je voldoende overwaarde hebt op je woning, kun je bij je hypotheekverstrekker een verhoging aanvragen voor de plaatsing van een mantelzorgwoning.
      </p>
      <p>
        Voordelen: lage rente (3 tot 5%), lange looptijd mogelijk (tot 30 jaar), lage maandlasten. Nadeel: niet alle banken accepteren een hypotheekverhoging voor een mantelzorgwoning. ABN AMRO en enkele andere banken bieden dit inmiddels wel aan.
      </p>
      <p>
        Let op: de hypotheekrente voor een mantelzorgwoning is <strong>niet aftrekbaar</strong> in box 1. De mantelzorgwoning valt niet onder de eigenwoningregeling.
      </p>

      <h2>Persoonlijke lening</h2>
      <p>
        Een persoonlijke lening is een flexibele optie met een snelle procedure. Je kunt binnen enkele dagen een lening afsluiten zonder notaris. De rente is hoger dan bij een hypotheek (5 tot 9%), maar de doorlooptijd is korter (5 tot 15 jaar).
      </p>
      <p>
        Een persoonlijke lening van 75.000 euro met een rente van 6% en een looptijd van 10 jaar kost circa <strong>830 euro per maand</strong>. Vergelijk altijd meerdere aanbieders voor de beste rente.
      </p>

      <h2>Wmo-vergoeding</h2>
      <p>
        Via de <strong>Wet maatschappelijke ondersteuning (Wmo)</strong> kun je bij je gemeente een vergoeding aanvragen. De Wmo-vergoeding dekt een deel of het geheel van de kosten als de mantelzorgwoning als noodzakelijke woningaanpassing wordt gezien. De hoogte verschilt per gemeente.
      </p>
      <p>
        Tip: vraag de Wmo-vergoeding aan <strong>voordat</strong> je een mantelzorgwoning bestelt. Achteraf aanvragen is bij de meeste gemeenten niet mogelijk. Lees meer in ons artikel over <a href="/kennisbank/subsidie-mantelzorgwoning">subsidie voor mantelzorgwoningen</a>.
      </p>

      <h2>Huren in plaats van kopen</h2>
      <p>
        Huren is een goede optie als de zorgbehoefte tijdelijk is of als het budget voor aanschaf ontbreekt. Huurprijzen liggen tussen <strong>500 en 900 euro per maand</strong>, vaak inclusief plaatsing en verwijdering.
      </p>
      <p>
        Bij een huurperiode van 3 jaar betaal je 18.000 tot 32.400 euro. Bij 5 jaar is dat 30.000 tot 54.000 euro. Kopen is bij een looptijd van 7 jaar of langer vrijwel altijd voordeliger. Sommige aanbieders bieden huurkoop aan: een deel van de huur wordt verrekend met de koopprijs.
      </p>

      <h2>Spaargeld en eigen middelen</h2>
      <p>
        Als je voldoende spaargeld hebt, is eigen financiering de goedkoopste optie: je betaalt geen rente. Houd er wel rekening mee dat de mantelzorgwoning in <strong>box 3</strong> wordt belast. Het spaargeld dat je investeert verschuift van banktegoeden naar een onroerend goed-bezitting.
      </p>

      <blockquote>
        <p><strong>Wil je weten wat een mantelzorgwoning kost?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Combinatie van financieringsvormen</h2>
      <p>
        In de praktijk combineren veel families meerdere financieringsvormen:
      </p>
      <ul>
        <li>Wmo-vergoeding voor een deel van de kosten</li>
        <li>Hypotheekverhoging of lening voor het restant</li>
        <li>ISDE-subsidie voor de warmtepomp (1.000 tot 3.000 euro)</li>
        <li>Eventueel een bijdrage van de zorgvrager uit spaargeld</li>
      </ul>
      <p>
        Bij een combinatiefinanciering is het verstandig om een <strong><a href="/kennisbank/schenkbelasting-mantelzorgwoning" class="text-primary font-medium hover:underline">opstalrecht</a></strong> te vestigen als de zorgvrager meebetaalt maar de woning op jouw grond staat. Dit voorkomt schenkbelasting.
      </p>

      <h2>Veelgestelde vragen</h2>
      <h3>Kan ik een hypotheek krijgen voor een mantelzorgwoning?</h3>
      <p>
        Ja, steeds meer banken bieden deze mogelijkheid. Een verhoging van je bestaande hypotheek is het meest gebruikelijk. Niet alle banken accepteren dit, dus vergelijk meerdere aanbieders.
      </p>

      <h3>Wat is de goedkoopste manier om een mantelzorgwoning te financieren?</h3>
      <p>
        Een combinatie van Wmo-vergoeding en hypotheekverhoging is doorgaans het voordeligst. De Wmo-vergoeding vermindert het benodigde leenbedrag en de hypotheek biedt de laagste rente.
      </p>

      <h3>Kun je een mantelzorgwoning financieren via de zorgverzekering?</h3>
      <p>
        Nee. De zorgverzekering vergoedt geen mantelzorgwoningen. Wel kun je via de Wmo of het pgb een vergoeding aanvragen bij de gemeente.
      </p>
    `,
  "wat-is-een-tiny-house": `
      <h2>Wat is een tiny house precies?</h2>
      <p>
        Een tiny house is een <strong>volwaardige woning op kleine schaal</strong>, doorgaans tussen de 15 en 50 vierkante meter. Het huis bevat alles wat je nodig hebt om zelfstandig te wonen: een keuken, badkamer, slaapgedeelte en woonruimte. Het verschil met een gewone woning is de bewuste keuze voor compact en eenvoudig wonen.
      </p>
      <p>
        De tiny house beweging is ontstaan in de Verenigde Staten en richt zich op het principe van "less is more": minder ruimte, minder spullen, minder kosten, maar meer vrijheid en duurzaamheid. In Nederland groeit de belangstelling sterk, vooral onder starters, alleenstaanden en 50-plussers die willen downsizen.
      </p>

      <h2>Soorten tiny houses</h2>
      <p>
        Er zijn twee hoofdtypen tiny houses:
      </p>
      <ul>
        <li><strong>Tiny house op wielen:</strong> gebouwd op een aanhangerchassis, waardoor het verplaatsbaar is. Maximale afmetingen: 13,60 m lang, 2,60 m breed, 4 m hoog. Oppervlakte: doorgaans 15 tot 30 m². Voordeel: flexibel in locatie. Nadeel: beperkt in breedte en gewicht (max 3.500 kg voor wegtransport).</li>
        <li><strong>Tiny house op een vaste fundering:</strong> geplaatst op een betonplaat of schroeffundering. Geen beperkingen in breedte. Oppervlakte: tot 50 m² of meer. Voordeel: meer ruimte en comfort. Nadeel: minder flexibel, vergunningsplichtig als bouwwerk.</li>
      </ul>
      <p>
        Daarnaast zijn er varianten zoals <strong>prefab tiny houses</strong> (in een fabriek gebouwd), <strong>zelfbouw tiny houses</strong> (op basis van een bouwpakket) en <strong>off-grid tiny houses</strong> (onafhankelijk van het elektriciteitsnet en waterleiding).
      </p>

      <h2>Voor wie is een tiny house geschikt?</h2>
      <ul>
        <li><strong>Starters:</strong> een betaalbaar alternatief voor de overspannen woningmarkt. Geen hypotheek nodig bij modellen vanaf 35.000 euro.</li>
        <li><strong>50-plussers en senioren:</strong> downsizen naar een onderhoudsvriendelijke, gelijkvloerse woning. Veel tiny houses zijn rolstoeltoegankelijk te maken.</li>
        <li><strong>Alleenstaanden en stellen:</strong> bewust kiezen voor minder ruimte en lagere woonlasten.</li>
        <li><strong>Mantelzorg:</strong> een tiny house in de tuin als <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> voor een ouder of familielid.</li>
      </ul>

      <h2>Voordelen van een tiny house</h2>
      <ul>
        <li><strong>Betaalbaar:</strong> aanschafprijzen van 35.000 tot 85.000 euro, een fractie van een reguliere woning</li>
        <li><strong>Duurzaam:</strong> lager energieverbruik, minder materiaalgebruik, vaak uitgerust met zonnepanelen en warmtepomp</li>
        <li><strong>Snel beschikbaar:</strong> een prefab tiny house is binnen 8 tot 16 weken geplaatst</li>
        <li><strong>Lage woonlasten:</strong> maandelijkse kosten van 200 tot 500 euro (energie, verzekering, onderhoud)</li>
        <li><strong>Flexibel:</strong> een tiny house op wielen is verplaatsbaar naar een andere locatie</li>
      </ul>

      <h2>Nadelen en aandachtspunten</h2>
      <ul>
        <li><strong>Beperkte ruimte:</strong> compact wonen vraagt om een minimalistische levensstijl. Niet geschikt voor grote gezinnen.</li>
        <li><strong>Locatie vinden:</strong> niet overal mag een tiny house geplaatst worden. Je hebt een locatie nodig waar het bestemmingsplan dit toelaat.</li>
        <li><strong>Vergunningen:</strong> voor permanente bewoning is vrijwel altijd een omgevingsvergunning nodig. Lees meer in ons artikel over <a href="/kennisbank/tiny-house-regels" class="text-primary font-medium hover:underline">tiny house regels</a>.</li>
        <li><strong>Financiering:</strong> niet alle banken verstrekken een hypotheek voor een tiny house. Een persoonlijke lening of eigen spaargeld is vaak nodig.</li>
      </ul>

      <blockquote>
        <p><strong>Wil je een tiny house vergelijken?</strong> Bekijk aanbieders en ontvang een offerte op maat via onze <a href="/configurator">configurator</a>.</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Is een tiny house een echte woning?</h3>
      <p>
        Ja. Een tiny house is een volwaardige woning met alle basisvoorzieningen: keuken, badkamer, slaapgedeelte en woonruimte. Het voldoet aan het Bouwbesluit en is geschikt voor permanente bewoning.
      </p>

      <h3>Wat kost een tiny house?</h3>
      <p>
        De prijzen lopen uiteen van 35.000 euro voor een compact model op wielen tot 85.000 euro of meer voor een luxe uitvoering op een vaste fundering. Lees meer in ons artikel over <a href="/kennisbank/hoeveel-kost-een-tiny-house">tiny house kosten</a>.
      </p>

      <h3>Mag je permanent in een tiny house wonen?</h3>
      <p>
        Ja, mits het bestemmingsplan dit toelaat en je een omgevingsvergunning hebt. Steeds meer gemeenten wijzen locaties aan voor tiny house bewoning.
      </p>

      <h3>Hoe lang gaat een tiny house mee?</h3>
      <p>
        Een goed gebouwd tiny house gaat 25 tot 50 jaar mee, afhankelijk van de constructie en het onderhoud. Houtskeletbouw met een goede afwerking heeft een vergelijkbare levensduur als een traditionele woning.
      </p>
    `,
  "tiny-house-regels": `
      <h2>Welke regels gelden voor een tiny house?</h2>
      <p>
        Voor het plaatsen van een tiny house in Nederland heb je vrijwel altijd een <strong>omgevingsvergunning</strong> nodig. In tegenstelling tot een <a href="/mantelzorgwoning" class="text-primary font-medium hover:underline">mantelzorgwoning</a> bestaat er geen vergunningsvrijstelling specifiek voor tiny houses. De regels hangen af van het bestemmingsplan, het type tiny house (op wielen of vast) en de gemeente.
      </p>
      <p>
        Hieronder behandelen we alle relevante regels: van vergunningen tot bouwbesluit-eisen.
      </p>

      <h2>Omgevingsvergunning</h2>
      <p>
        Een tiny house dat bedoeld is voor permanente bewoning wordt beschouwd als een <strong>bouwwerk</strong>. Hiervoor is een omgevingsvergunning vereist. Dit geldt voor zowel tiny houses op wielen als op een vaste fundering, zodra er sprake is van permanente bewoning op een vaste locatie.
      </p>
      <p>
        De vergunning wordt getoetst aan het bestemmingsplan (of omgevingsplan) van de gemeente. De locatie moet een <strong>woonbestemming</strong> hebben. Op grond met een agrarische, natuur- of recreatiebestemming mag in principe geen permanente bewoning plaatsvinden.
      </p>

      <h2>Bestemmingsplan en locatie</h2>
      <p>
        Het vinden van een geschikte locatie is vaak de grootste uitdaging bij een tiny house. De mogelijkheden:
      </p>
      <ul>
        <li><strong>Tiny house dorpen:</strong> steeds meer gemeenten wijzen speciale kavels aan voor tiny houses. Hier is het bestemmingsplan al aangepast.</li>
        <li><strong>Eigen grond:</strong> als je eigen grond hebt met een woonbestemming, kun je een vergunning aanvragen voor een <a href="/tiny-house" class="text-primary font-medium hover:underline">tiny house</a>.</li>
        <li><strong>Huurkavels:</strong> diverse aanbieders en gemeenten bieden kavels te huur aan voor tiny houses, met huurprijzen van 250 tot 500 euro per maand.</li>
        <li><strong>Achtertuin:</strong> een tiny house in de achtertuin is mogelijk als mantelzorgwoning (vergunningsvrij onder voorwaarden) of met een vergunning.</li>
      </ul>

      <h2>Bouwbesluit-eisen</h2>
      <p>
        Elke tiny house voor permanente bewoning moet voldoen aan het <strong>Besluit bouwwerken leefomgeving (Bbl)</strong>. De belangrijkste eisen:
      </p>
      <ul>
        <li><strong>Minimale vloeroppervlakte:</strong> 18 m² aan verblijfsruimte (exclusief badkamer en toilet)</li>
        <li><strong>Badkamer:</strong> minimaal 1,6 m², toilet minimaal 1,08 m², of gecombineerd minimaal 2,2 m²</li>
        <li><strong>Plafondhoogte:</strong> minimaal 2,1 m in verblijfsruimten (op 50% van het vloeroppervlak)</li>
        <li><strong>Isolatie:</strong> minimale RC-waarden voor vloer, wanden en dak conform het Bbl</li>
        <li><strong>Ventilatie:</strong> mechanische of natuurlijke ventilatie volgens de normen</li>
        <li><strong>Brandveiligheid:</strong> rookmelders, vluchtwegen en brandwerende materialen</li>
        <li><strong>Geluid:</strong> installaties mogen maximaal 30 dB binnenshuis en 40 dB op de erfgrens produceren</li>
      </ul>

      <h2>Tiny house op wielen: extra regels</h2>
      <p>
        Een tiny house op wielen valt in een juridisch grijs gebied. Op het moment dat het verplaatsbaar is en niet permanent is aangesloten op nutsvoorzieningen, kan het worden beschouwd als een <strong>kampeermiddel</strong> in plaats van een bouwwerk. Maar voor permanente bewoning gelden dezelfde regels als voor een vast bouwwerk.
      </p>
      <p>
        Transportregels voor een tiny house op wielen:
      </p>
      <ul>
        <li>Maximaal <strong>13,60 m lang, 2,60 m breed, 4 m hoog</strong></li>
        <li>Maximaal <strong>3.500 kg</strong> totaalgewicht voor transport met een regulier rijbewijs (BE)</li>
        <li>Breder dan 2,60 m vereist een speciaal transport met ontheffing</li>
      </ul>

      <blockquote>
        <p><strong>Op zoek naar een tiny house dat aan alle regels voldoet?</strong> Vergelijk aanbieders en ontvang een offerte op maat. <a href="/configurator">Start de configurator</a> →</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Heb je altijd een vergunning nodig voor een tiny house?</h3>
      <p>
        Voor permanente bewoning vrijwel altijd, ja. Alleen als het tiny house als mantelzorgwoning dient en aan de vergunningsvrije voorwaarden voldoet, is geen vergunning nodig. Voor recreatief gebruik kunnen andere regels gelden.
      </p>

      <h3>Mag je een tiny house in je achtertuin zetten?</h3>
      <p>
        Als mantelzorgwoning kan dit vergunningsvrij onder voorwaarden. Voor bewoning als reguliere woning is een omgevingsvergunning nodig en moet het bestemmingsplan dit toelaten.
      </p>

      <h3>Hoe vind je een locatie voor een tiny house?</h3>
      <p>
        Via tiny house dorpen (gemeentelijke initiatieven), huurkavels, eigen grond met woonbestemming, of als mantelzorgwoning in de achtertuin. Steeds meer gemeenten bieden mogelijkheden voor tiny house bewoning. Bekijk het aanbod via <a href="/occasions/tiny-house" class="text-primary font-medium hover:underline">tweedehands tiny houses</a>.
      </p>

      <h3>Moet een tiny house op wielen ook aan het bouwbesluit voldoen?</h3>
      <p>
        Ja, zodra het tiny house bestemd is voor permanente bewoning op een vaste locatie. Het feit dat het op wielen staat, maakt het niet vrijgesteld van de bouwbesluit-eisen.
      </p>
    `,
  "hoe-groot-is-een-tiny-house": `
      <h2>Standaard afmetingen van een tiny house</h2>
      <p>
        Een <a href="/tiny-house" class="text-primary font-medium hover:underline">tiny house</a> heeft doorgaans een woonoppervlakte van <strong>15 tot 50 vierkante meter</strong>. Er is geen wettelijke definitie van "tiny", maar in de praktijk wordt alles onder 50 m² als tiny house beschouwd. De meest populaire maten liggen tussen de 20 en 35 m².
      </p>
      <p>
        De afmetingen hangen sterk af van het type: een tiny house op wielen is beperkt in breedte door transportregels, terwijl een vast tiny house dezelfde breedte kan hebben als een reguliere woning.
      </p>

      <h2>Afmetingen tiny house op wielen</h2>
      <p>
        Voor een tiny house op wielen gelden strenge transportregels die de afmetingen bepalen:
      </p>
      <ul>
        <li><strong>Maximale lengte:</strong> 13,60 meter (inclusief chassis)</li>
        <li><strong>Maximale breedte:</strong> 2,60 meter (transport zonder ontheffing)</li>
        <li><strong>Maximale hoogte:</strong> 4 meter</li>
        <li><strong>Maximaal gewicht:</strong> 3.500 kg (rijbewijs BE)</li>
      </ul>
      <p>
        Dit geeft een maximaal vloeroppervlak van circa <strong>28 tot 30 m²</strong>. In de praktijk zijn de meeste tiny houses op wielen 7 tot 10 meter lang en 2,55 m breed, goed voor 18 tot 25 m² woonoppervlak. Met een vide (slaaploft) boven de woonruimte kun je het bruikbare oppervlak vergroten tot 30 tot 40 m².
      </p>

      <h2>Afmetingen vast tiny house</h2>
      <p>
        Een tiny house op een vaste fundering heeft geen transportbeperkingen en kan breder worden gebouwd:
      </p>
      <ul>
        <li><strong>Breedte:</strong> meestal 3 tot 6 meter</li>
        <li><strong>Lengte:</strong> 6 tot 12 meter</li>
        <li><strong>Hoogte:</strong> 3 tot 5 meter</li>
        <li><strong>Oppervlakte:</strong> 25 tot 50 m²</li>
      </ul>
      <p>
        De extra breedte maakt een groot verschil in leefcomfort. Bij 4 meter breed kun je een ruimere indeling realiseren met een volwaardige keuken, aparte slaapkamer en een comfortabele badkamer zonder vide.
      </p>

      <h2>Minimale afmetingen volgens het bouwbesluit</h2>
      <p>
        Het Besluit bouwwerken leefomgeving (Bbl) stelt minimale eisen aan de grootte van een woning. Meer over de bijbehorende regels lees je in ons artikel over <a href="/kennisbank/tiny-house-regels" class="text-primary font-medium hover:underline">tiny house regels</a>:
      </p>
      <ul>
        <li><strong>Verblijfsruimte:</strong> minimaal 18 m² (exclusief badkamer en toilet)</li>
        <li><strong>Badkamer:</strong> minimaal 1,6 m²</li>
        <li><strong>Toilet:</strong> minimaal 1,08 m²</li>
        <li><strong>Badkamer + toilet gecombineerd:</strong> minimaal 2,2 m²</li>
        <li><strong>Plafondhoogte:</strong> minimaal 2,1 m op 50% van het vloeroppervlak</li>
      </ul>
      <p>
        In de praktijk betekent dit dat een tiny house minimaal circa <strong>22 m²</strong> moet zijn om aan het bouwbesluit te voldoen voor permanente bewoning.
      </p>

      <h2>Welke maat past bij jou?</h2>
      <ul>
        <li><strong>15 tot 20 m²:</strong> compact voor 1 persoon. Vide noodzakelijk voor slaapplek. Geschikt als starterwoning of tijdelijke huisvesting.</li>
        <li><strong>20 tot 30 m²:</strong> comfortabel voor 1 persoon of een stel zonder kinderen. Ruimte voor een aparte slaaploft en volwaardige keuken.</li>
        <li><strong>30 tot 40 m²:</strong> ruim voor 1 persoon, comfortabel voor een stel. Aparte slaapkamer mogelijk zonder vide. Populairste formaat.</li>
        <li><strong>40 tot 50 m²:</strong> geschikt voor een stel of klein gezin. Ruimte voor 2 slaapkamers, volledige keuken en een ruime woonkamer.</li>
      </ul>

      <blockquote>
        <p><strong>Wil je een tiny house op maat samenstellen?</strong> Kies je afmetingen en indeling via onze <a href="/configurator">configurator</a> en ontvang een offerte op maat.</p>
      </blockquote>

      <h2>Veelgestelde vragen</h2>
      <h3>Hoe groot mag een tiny house zijn?</h3>
      <p>
        Er is geen wettelijk maximum voor een tiny house op een vaste fundering. Op wielen geldt een maximum van 13,60 x 2,60 meter. In de praktijk worden woningen tot 50 m² als tiny house beschouwd.
      </p>

      <h3>Wat is het minimale formaat voor permanente bewoning?</h3>
      <p>
        Volgens het bouwbesluit is minimaal 18 m² aan verblijfsruimte vereist, plus een badkamer en toilet. In de praktijk is circa 22 m² het absolute minimum voor een volwaardige woning.
      </p>

      <h3>Is een tiny house van 20 m² groot genoeg voor twee personen?</h3>
      <p>
        Het kan, maar het is krap. Voor twee personen wordt minimaal 25 tot 30 m² aanbevolen, bij voorkeur met een aparte slaaploft of slaapkamer. Bij 20 m² is het belangrijk dat je allebei comfortabel bent met compact wonen.
      </p>

      <h3>Hoeveel weegt een tiny house op wielen?</h3>
      <p>
        Een tiny house op wielen weegt doorgaans 2.500 tot 3.500 kg. Voor wegtransport met een BE-rijbewijs geldt een maximum van 3.500 kg. Zwaardere modellen vereisen een speciaal transport. Bekijk ook <a href="/kennisbank/hoeveel-kost-een-tiny-house" class="text-primary font-medium hover:underline">wat een tiny house kost</a> voor een compleet overzicht.
      </p>
    `,
};

interface ArtikelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artikelenMeta.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArtikelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artikel = artikelenMeta.find((a) => a.slug === slug);
  if (!artikel) return { title: "Niet gevonden" };

  return {
    title: artikel.seoTitle,
    description: artikel.seoBeschrijving,
    alternates: {
      canonical: `https://zorgwoningvergelijker.nl/kennisbank/${slug}`,
    },
    openGraph: {
      title: artikel.seoTitle,
      description: artikel.seoBeschrijving,
      type: "article",
      ...(artikel.featuredImage && {
        images: [{ url: artikel.featuredImage, width: 1200, height: 675, alt: artikel.featuredImageAlt || artikel.titel }],
      }),
    },
    keywords: [artikel.categorie.toLowerCase(), artikel.titel.toLowerCase(), "modulaire woning", "zorgwoning"],
  };
}

function getWordCount(html: string): number {
  return html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
}

export default async function ArtikelPage({ params }: ArtikelPageProps) {
  const { slug } = await params;
  const artikel = artikelenMeta.find((a) => a.slug === slug);
  const content = artikelContent[slug];

  if (!artikel || !content) {
    notFound();
  }

  const wordCount = getWordCount(content);
  const artikelUrl = `https://zorgwoningvergelijker.nl/kennisbank/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: artikel.titel,
    description: artikel.beschrijving,
    ...(artikel.featuredImage && {
      image: {
        "@type": "ImageObject",
        url: `https://zorgwoningvergelijker.nl${artikel.featuredImage}`,
        width: 1200,
        height: 675,
        caption: artikel.featuredImageAlt || artikel.titel,
      },
    }),
    datePublished: artikel.gepubliceerd,
    dateModified: artikel.bijgewerkt,
    author: {
      "@type": "Person",
      name: auteurWim.volleNaam,
      jobTitle: auteurWim.rol,
      url: auteurWim.url,
      image: `https://zorgwoningvergelijker.nl${auteurWim.afbeelding}`,
      worksFor: {
        "@type": "Organization",
        name: "Zorgwoningvergelijker.nl",
        url: "https://zorgwoningvergelijker.nl",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Zorgwoningvergelijker.nl",
      url: "https://zorgwoningvergelijker.nl",
      logo: {
        "@type": "ImageObject",
        url: "https://zorgwoningvergelijker.nl/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": artikelUrl,
    },
    articleSection: artikel.categorie,
    wordCount,
    timeRequired: `PT${artikel.leestijd}M`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zorgwoningvergelijker.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kennisbank",
        item: "https://zorgwoningvergelijker.nl/kennisbank",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artikel.titel,
        item: artikelUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-100">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Kennisbank", href: "/kennisbank" },
              { label: artikel.titel },
            ]}
          />
        </Container>
      </section>

      {/* Article Header */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <div className="max-w-[42rem] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={artikel.categorieVariant}>
                {artikel.categorie}
              </Badge>
              <span className="flex items-center gap-1.5 text-body-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {artikel.leestijd} min leestijd
              </span>
            </div>
            <h1 className="font-heading text-display text-gray-900 mb-4">
              {artikel.titel}
            </h1>
            <p className="text-body-lg text-gray-600 leading-relaxed mb-6">
              {artikel.beschrijving}
            </p>

            {/* Author + dates */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-gray-600">
              <Link href={auteurWim.slug} className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
                <Image
                  src={auteurWim.afbeelding}
                  alt={auteurWim.volleNaam}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-lg object-cover"
                />
                <span>
                  Door <strong className="text-dark font-medium">{auteurWim.naam}</strong>
                </span>
              </Link>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={artikel.gepubliceerd}>
                {formatDatum(artikel.gepubliceerd)}
              </time>
              {artikel.bijgewerkt && artikel.bijgewerkt !== artikel.gepubliceerd && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>
                    Bijgewerkt: <time dateTime={artikel.bijgewerkt}>{formatDatum(artikel.bijgewerkt)}</time>
                  </span>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {artikel.featuredImage && (
        <section className="pb-8 md:pb-10 bg-white">
          <Container>
            <div className="max-w-[42rem] mx-auto">
              <div className="rounded-2xl overflow-hidden ring-1 ring-black/[0.04]">
                <Image
                  src={artikel.featuredImage}
                  alt={artikel.featuredImageAlt || artikel.titel}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover aspect-[16/9]"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Article Body */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div
            className="max-w-[42rem] mx-auto
              [&_h2]:font-heading [&_h2]:text-heading-2 [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-heading [&_h3]:text-heading-3 [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-body [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
              [&_li]:text-body [&_li]:text-gray-600 [&_li]:leading-relaxed
              [&_strong]:text-gray-900 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </section>

      {/* Author Card */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="max-w-[42rem] mx-auto">
            <ArticleAuthorCard />
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <RelatedArticles currentSlug={slug} currentCategorie={artikel.categorie} />

      {/* CTA Banner */}
      <div id="cta-banner">
        <CTABanner />
      </div>

      {/* Sticky Desktop CTA */}
      <StickyArticleCTA />
    </>
  );
}
