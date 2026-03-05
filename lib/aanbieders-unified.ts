import { db } from "@/lib/db";
import { aanbieders, certificaten, portfolio, woningtypeSelecties } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { aanbieders as hardcodedAanbieders } from "./aanbieders";
import type { Aanbieder, PortfolioItem } from "./types";

export type UnifiedAanbieder = Aanbieder & {
  source: "db" | "hardcoded";
  id?: string;
  status?: string;
  reviewLink?: string;
  certificaten?: { naam: string; bewijsUrl: string }[];
};

/**
 * Converteer DB aanbieder rij naar UnifiedAanbieder formaat
 */
function dbToUnified(
  row: typeof aanbieders.$inferSelect,
  certs: { naam: string; bewijsUrl: string }[],
  portfolioItems: PortfolioItem[],
  activeWoningtypen: string[]
): UnifiedAanbieder {
  return {
    source: "db",
    id: row.id,
    slug: row.slug,
    naam: row.bedrijfsnaam,
    beschrijving: row.beschrijving || "",
    logo: row.logoUrl || "/images/aanbieders/placeholder.png",
    vestigingsplaats: row.vestigingsplaats || "",
    provincie: row.provincie || "",
    werkgebied: row.werkgebied ? JSON.parse(row.werkgebied) : [],
    specialisaties: activeWoningtypen,
    beoordeling: row.reviewScore ? row.reviewScore / 10 : 0,
    aantalReviews: row.reviewCount || 0,
    contactEmail: row.contactEmail || "",
    website: row.website || "",
    telefoon: row.telefoon || "",
    portfolio: portfolioItems,
    status: row.status,
    reviewLink: row.reviewLink || undefined,
    certificaten: certs,
  };
}

/**
 * Alle aanbieders: DB aanbieders (goedgekeurd) + hardcoded showcase
 */
export async function getAllAanbieders(): Promise<UnifiedAanbieder[]> {
  try {
    const dbRows = await db
      .select()
      .from(aanbieders)
      .where(eq(aanbieders.status, "approved"));

    const dbSlugs = new Set(dbRows.map((r) => r.slug));
    const dbResults: UnifiedAanbieder[] = [];

    for (const row of dbRows) {
      const [certs, portfolioRows, selecties] = await Promise.all([
        db.select({ naam: certificaten.naam, bewijsUrl: certificaten.bewijsUrl })
          .from(certificaten)
          .where(eq(certificaten.aanbiederId, row.id)),
        db.select()
          .from(portfolio)
          .where(eq(portfolio.aanbiederId, row.id)),
        db.select({ woningtypeSlug: woningtypeSelecties.woningtypeSlug })
          .from(woningtypeSelecties)
          .where(eq(woningtypeSelecties.aanbiederId, row.id)),
      ]);

      const portfolioItems: PortfolioItem[] = portfolioRows.map((p) => ({
        titel: p.titel,
        afbeelding: p.afbeeldingUrl,
        woningType: p.woningType || "",
        locatie: p.locatie || "",
      }));

      dbResults.push(
        dbToUnified(
          row,
          certs,
          portfolioItems,
          selecties.map((s) => s.woningtypeSlug)
        )
      );
    }

    // Hardcoded aanbieders als showcase (tenzij slug al in DB)
    const showcaseAanbieders: UnifiedAanbieder[] = hardcodedAanbieders
      .filter((a) => !dbSlugs.has(a.slug))
      .map((a) => ({ ...a, source: "hardcoded" as const }));

    return [...dbResults, ...showcaseAanbieders];
  } catch (error) {
    console.error("getAllAanbieders error:", error);
    // Fallback naar hardcoded
    return hardcodedAanbieders.map((a) => ({ ...a, source: "hardcoded" as const }));
  }
}

/**
 * Enkele aanbieder ophalen: DB eerst, daarna hardcoded fallback
 */
export async function getAanbiederBySlug(
  slug: string
): Promise<UnifiedAanbieder | null> {
  try {
    const dbRows = await db
      .select()
      .from(aanbieders)
      .where(
        and(eq(aanbieders.slug, slug), eq(aanbieders.status, "approved"))
      )
      .limit(1);

    if (dbRows.length > 0) {
      const row = dbRows[0];
      const [certs, portfolioRows, selecties] = await Promise.all([
        db.select({ naam: certificaten.naam, bewijsUrl: certificaten.bewijsUrl })
          .from(certificaten)
          .where(eq(certificaten.aanbiederId, row.id)),
        db.select()
          .from(portfolio)
          .where(eq(portfolio.aanbiederId, row.id)),
        db.select({ woningtypeSlug: woningtypeSelecties.woningtypeSlug })
          .from(woningtypeSelecties)
          .where(eq(woningtypeSelecties.aanbiederId, row.id)),
      ]);

      const portfolioItems: PortfolioItem[] = portfolioRows.map((p) => ({
        titel: p.titel,
        afbeelding: p.afbeeldingUrl,
        woningType: p.woningType || "",
        locatie: p.locatie || "",
      }));

      return dbToUnified(
        row,
        certs,
        portfolioItems,
        selecties.map((s) => s.woningtypeSlug)
      );
    }
  } catch (error) {
    console.error("getAanbiederBySlug DB error:", error);
  }

  // Hardcoded fallback
  const hardcoded = hardcodedAanbieders.find((a) => a.slug === slug);
  return hardcoded ? { ...hardcoded, source: "hardcoded" as const } : null;
}

/**
 * Aanbieders voor specifiek woningtype: DB eerst, dan hardcoded
 */
export async function getAanbiedersForWoningtype(
  woningtypeSlug: string
): Promise<UnifiedAanbieder[]> {
  const all = await getAllAanbieders();
  return all.filter((a) => a.specialisaties.includes(woningtypeSlug));
}
