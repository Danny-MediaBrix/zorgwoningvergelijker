import { Suspense } from "react";
import type { Metadata } from "next";
import { woningtypen } from "@/lib/woningtypen";
import { getListings } from "@/lib/occasions/queries";
import OccasionsOverview from "../OccasionsOverview";
import type { OccasionsSeoContent } from "../OccasionsOverview";
import { woningtypeSeoContent } from "../seo-content";

// Re-validate elke uur zodat nieuwe listings zichtbaar worden
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ woningtype: string }>;
}

export function generateStaticParams() {
  return woningtypen.map((wt) => ({
    woningtype: wt.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { woningtype: slug } = await params;
  const wt = woningtypen.find((w) => w.slug === slug);
  const naam = wt?.naam || slug;

  return {
    title: `Tweedehands ${naam} | Occasions | Zorgwoningvergelijker`,
    description: `Bekijk tweedehands ${naam.toLowerCase()} woningen. Vergelijk occasions van particulieren en bedrijven in heel Nederland.`,
    alternates: {
      canonical: `https://zorgwoningvergelijker.nl/occasions/${slug}`,
    },
    keywords: [`tweedehands ${naam.toLowerCase()}`, `${naam.toLowerCase()} occasion`, `gebruikte ${naam.toLowerCase()}`, "tweedehands modulaire woning"],
  };
}

function getSeoContent(slug: string, naam: string): OccasionsSeoContent {
  if (woningtypeSeoContent[slug]) return woningtypeSeoContent[slug];

  // Generieke fallback
  return {
    title: `Tweedehands ${naam} kopen`,
    content: (
      <>
        <p>
          Bekijk het aanbod tweedehands {naam.toLowerCase()} woningen op
          Zorgwoningvergelijker. Alle occasions worden aangeboden door geverifieerde
          verkopers in heel Nederland.
        </p>
        <h3>Voordelen van een tweedehands {naam.toLowerCase()}</h3>
        <p>
          Een occasion {naam.toLowerCase()} biedt een aantrekkelijk alternatief voor
          nieuwbouw. Je profiteert van lagere aanschafkosten, snellere beschikbaarheid
          en bewezen kwaliteit.
        </p>
      </>
    ),
  };
}

export default async function OccasionWoningtypePage({ params }: PageProps) {
  const { woningtype } = await params;
  const initialData = await getListings({ woningtype });
  const wt = woningtypen.find((w) => w.slug === woningtype);
  const naam = wt?.naam || woningtype;

  return (
    <Suspense>
      <OccasionsOverview
        initialWoningtype={woningtype}
        initialData={initialData}
        seoContent={getSeoContent(woningtype, naam)}
      />
    </Suspense>
  );
}
