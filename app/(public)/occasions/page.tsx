import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/lib/occasions/queries";
import OccasionsOverview from "./OccasionsOverview";
import type { OccasionsSeoContent } from "./OccasionsOverview";

// Re-validate elke uur zodat nieuwe listings zichtbaar worden
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tweedehands Modulaire Woningen (Occasions)",
  description:
    "Bekijk tweedehands tiny houses, chalets & mantelzorgwoningen ✓ Bespaar flink op je modulaire woning ➜ Bekijk het aanbod!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/occasions",
  },
  keywords: ["tweedehands modulaire woning", "occasions tiny house", "tweedehands mantelzorgwoning", "gebruikte chalet", "modulaire woning occasion"],
};

const seoContent: OccasionsSeoContent = {
  title: "Tweedehands modulaire woningen kopen",
  content: (
    <>
      <p>
        Op zoek naar een betaalbare modulaire woning? Bij Zorgwoningvergelijker vind je
        tweedehands <Link href="/tiny-house" className="text-primary font-medium hover:underline">tiny houses</Link>, <Link href="/mantelzorgwoning" className="text-primary font-medium hover:underline">mantelzorgwoningen</Link>, <Link href="/chalet" className="text-primary font-medium hover:underline">chalets</Link>, <Link href="/flexwoning" className="text-primary font-medium hover:underline">flexwoningen</Link> en meer. Alle
        occasions worden aangeboden door geverifieerde verkopers in heel Nederland.
      </p>
      <h2>Waarom een tweedehands modulaire woning?</h2>
      <p>
        Een occasion modulaire woning biedt een aantrekkelijk alternatief voor nieuwbouw.
        Je profiteert van lagere aanschafkosten, snellere beschikbaarheid en bewezen
        kwaliteit. Veel tweedehands woningen zijn slechts enkele jaren oud en verkeren
        in uitstekende staat.
      </p>
      <h2>Waar moet je op letten?</h2>
      <ul>
        <li><strong>Staat van de woning</strong>: controleer of de woning goed onderhouden is en vraag naar eventuele gebreken.</li>
        <li><strong>Vergunningen</strong>: informeer bij je gemeente of je de woning op de gewenste locatie mag plaatsen.</li>
        <li><strong>Transportkosten</strong>: houd rekening met de kosten voor transport en plaatsing op de nieuwe locatie.</li>
        <li><strong>Fundering</strong>: laat vooraf onderzoeken welk type fundering nodig is voor het perceel.</li>
      </ul>
    </>
  ),
  faq: [
    {
      question: "Wat kost een tweedehands modulaire woning?",
      answer: "De prijzen variëren sterk per type. Een occasion tiny house kost tussen de €15.000 en €80.000, een mantelzorgwoning tussen €20.000 en €90.000, en een chalet of lodge tussen €15.000 en €120.000. De prijs hangt af van de staat, grootte, leeftijd en eventuele opties.",
    },
    {
      question: "Heb ik een vergunning nodig voor een modulaire woning?",
      answer: "In de meeste gevallen wel. Een omgevingsvergunning is vereist tenzij de woning valt onder vergunningsvrij bouwen (bijgebouw in achtertuin, max 30m², max 5m hoog). Informeer altijd bij je gemeente naar de lokale regels.",
    },
    {
      question: "Hoe wordt een tweedehands modulaire woning vervoerd?",
      answer: "Transport gebeurt meestal met een dieplader of vrachtwagen met kraan. De kosten variëren van €1.500 tot €5.000, afhankelijk van de afstand en grootte van de woning. Sommige verkopers regelen het transport, bij anderen moet je dit zelf organiseren.",
    },
    {
      question: "Waar kan ik een tweedehands modulaire woning kopen?",
      answer: "Op Zorgwoningvergelijker verzamelen we het actuele aanbod van tweedehands modulaire woningen uit heel Nederland. Je kunt filteren op type, prijs, provincie en meer om snel de juiste woning te vinden.",
    },
  ],
};

export default async function OccasionsPage() {
  const initialData = await getListings({});

  return (
    <Suspense>
      <OccasionsOverview initialData={initialData} seoContent={seoContent} />
    </Suspense>
  );
}
