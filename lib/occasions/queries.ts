import { db } from "@/lib/db";
import { listings, aanbiedersOccasions, aanbieders } from "@/lib/db/schema";
import { eq, and, isNotNull } from "drizzle-orm";
import type { OccasionListing, OccasionFilters, OccasionListingsResponse, FilterAggregates } from "./types";
import { ITEMS_PER_PAGE } from "./constants";

// ──────────────────────────────────────────────
// In-memory cache op globalThis zodat Turbopack
// hercompilaties de cache niet wissen
// ──────────────────────────────────────────────
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minuten

interface OccasionsCache {
  listings: OccasionListing[] | null;
  timestamp: number;
  promise: Promise<void> | null;
}

const g = globalThis as typeof globalThis & { __occasionsCache?: OccasionsCache };
if (!g.__occasionsCache) {
  g.__occasionsCache = { listings: null, timestamp: 0, promise: null };
}

async function ensureCache(): Promise<OccasionListing[]> {
  const cache = g.__occasionsCache!;

  if (cache.listings && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return cache.listings;
  }

  // Voorkom dat meerdere requests tegelijk de cache laden
  if (cache.promise) {
    await cache.promise;
    return cache.listings!;
  }

  cache.promise = (async () => {
    // ── Scraped listings ──
    const rows = await db
      .select({
        id: listings.id,
        source: listings.source,
        sourceUrl: listings.sourceUrl,
        woningtype: listings.woningtype,
        title: listings.title,
        description: listings.description,
        price: listings.price,
        priceLabel: listings.priceLabel,
        location: listings.location,
        province: listings.province,
        surfaceM2: listings.surfaceM2,
        buildYear: listings.buildYear,
        condition: listings.condition,
        sellerType: listings.sellerType,
        transport: listings.transport,
        images: listings.images,
        scrapedAt: listings.scrapedAt,
      })
      .from(listings)
      .where(and(eq(listings.isActive, 1), isNotNull(listings.woningtype)));

    const scrapedListings: OccasionListing[] = rows.map((row) => ({
      ...row,
      images: row.images ? (() => { try { return JSON.parse(row.images!); } catch { return []; } })() : [],
    }));

    // ── Aanbieder occasions ──
    const aanbiederRows = await db
      .select({
        id: aanbiedersOccasions.id,
        titel: aanbiedersOccasions.titel,
        beschrijving: aanbiedersOccasions.beschrijving,
        prijs: aanbiedersOccasions.prijs,
        prijsLabel: aanbiedersOccasions.prijsLabel,
        woningtype: aanbiedersOccasions.woningtype,
        locatie: aanbiedersOccasions.locatie,
        provincie: aanbiedersOccasions.provincie,
        oppervlakteM2: aanbiedersOccasions.oppervlakteM2,
        bouwjaar: aanbiedersOccasions.bouwjaar,
        conditie: aanbiedersOccasions.conditie,
        images: aanbiedersOccasions.images,
        createdAt: aanbiedersOccasions.createdAt,
        status: aanbiedersOccasions.status,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        aanbiederSlug: aanbieders.slug,
      })
      .from(aanbiedersOccasions)
      .innerJoin(aanbieders, eq(aanbiedersOccasions.aanbiederId, aanbieders.id))
      .where(eq(aanbiedersOccasions.status, "active"));

    const aanbiederListings: OccasionListing[] = aanbiederRows.map((row) => ({
      id: row.id,
      source: "aanbieder",
      sourceUrl: "",
      woningtype: row.woningtype,
      title: row.titel,
      description: row.beschrijving,
      price: row.prijs,
      priceLabel: row.prijsLabel,
      location: row.locatie,
      province: row.provincie,
      surfaceM2: row.oppervlakteM2,
      buildYear: row.bouwjaar,
      condition: row.conditie,
      sellerType: "aanbieder",
      transport: null,
      images: (() => { try { return JSON.parse(row.images || "[]"); } catch { return []; } })(),
      scrapedAt: row.createdAt,
      isAanbieder: true,
      aanbiederSlug: row.aanbiederSlug,
      aanbiederNaam: row.bedrijfsnaam,
    }));

    // Combineer: aanbieder occasions eerst
    cache.listings = [...aanbiederListings, ...scrapedListings];
    cache.timestamp = Date.now();
  })();

  await cache.promise;
  cache.promise = null;
  return cache.listings!;
}

function mapRowToListing(row: typeof listings.$inferSelect): OccasionListing {
  let images: string[] = [];
  if (row.images) {
    try {
      images = JSON.parse(row.images);
    } catch {
      images = [];
    }
  }

  return {
    id: row.id,
    source: row.source,
    sourceUrl: row.sourceUrl,
    woningtype: row.woningtype,
    title: row.title,
    description: row.description,
    price: row.price,
    priceLabel: row.priceLabel,
    location: row.location,
    province: row.province,
    surfaceM2: row.surfaceM2,
    buildYear: row.buildYear,
    condition: row.condition,
    sellerType: row.sellerType,
    transport: row.transport,
    images,
    scrapedAt: row.scrapedAt,
  };
}

// ──────────────────────────────────────────────
// Filtering & sortering in-memory
// ──────────────────────────────────────────────
function applyFilters(all: OccasionListing[], filters: OccasionFilters): OccasionListing[] {
  return all.filter((l) => {
    if (filters.woningtype && l.woningtype !== filters.woningtype) return false;
    if (filters.priceMin !== undefined && (l.price == null || l.price < filters.priceMin * 100)) return false;
    if (filters.priceMax !== undefined && (l.price == null || l.price > filters.priceMax * 100)) return false;
    if (filters.province && l.province !== filters.province) return false;
    if (filters.surfaceMin !== undefined && (l.surfaceM2 == null || l.surfaceM2 < filters.surfaceMin)) return false;
    if (filters.surfaceMax !== undefined && (l.surfaceM2 == null || l.surfaceM2 > filters.surfaceMax)) return false;
    if (filters.buildYearMin !== undefined && (l.buildYear == null || l.buildYear < filters.buildYearMin)) return false;
    if (filters.condition && l.condition !== filters.condition) return false;
    if (filters.transport && l.transport !== filters.transport) return false;
    if (filters.sellerType && l.sellerType !== filters.sellerType) return false;
    return true;
  });
}

function applySort(items: OccasionListing[], sort?: string): OccasionListing[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case "price-desc":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "surface-desc":
      return sorted.sort((a, b) => (b.surfaceM2 ?? 0) - (a.surfaceM2 ?? 0));
    case "surface-asc":
      return sorted.sort((a, b) => (a.surfaceM2 ?? Infinity) - (b.surfaceM2 ?? Infinity));
    case "newest":
    default:
      return sorted.sort((a, b) => {
        // Aanbieder occasions always first
        if (a.isAanbieder && !b.isAanbieder) return -1;
        if (!a.isAanbieder && b.isAanbieder) return 1;
        return (b.scrapedAt ?? "").localeCompare(a.scrapedAt ?? "");
      });
  }
}

function buildAggregates(all: OccasionListing[]): FilterAggregates {
  const woningtypeCounts = new Map<string, number>();
  const provinceCounts = new Map<string, number>();
  const conditionCounts = new Map<string, number>();
  const sellerTypeCounts = new Map<string, number>();
  let minPrice: number | null = null;
  let maxPrice: number | null = null;
  let minSurface: number | null = null;
  let maxSurface: number | null = null;

  for (const l of all) {
    if (l.woningtype) woningtypeCounts.set(l.woningtype, (woningtypeCounts.get(l.woningtype) || 0) + 1);
    if (l.province) provinceCounts.set(l.province, (provinceCounts.get(l.province) || 0) + 1);
    if (l.condition) conditionCounts.set(l.condition, (conditionCounts.get(l.condition) || 0) + 1);
    if (l.sellerType) sellerTypeCounts.set(l.sellerType, (sellerTypeCounts.get(l.sellerType) || 0) + 1);
    if (l.price != null) {
      if (minPrice === null || l.price < minPrice) minPrice = l.price;
      if (maxPrice === null || l.price > maxPrice) maxPrice = l.price;
    }
    if (l.surfaceM2 != null) {
      if (minSurface === null || l.surfaceM2 < minSurface) minSurface = l.surfaceM2;
      if (maxSurface === null || l.surfaceM2 > maxSurface) maxSurface = l.surfaceM2;
    }
  }

  return {
    woningtypes: Array.from(woningtypeCounts, ([slug, count]) => ({ slug, count })),
    provinces: Array.from(provinceCounts, ([name, count]) => ({ name, count })),
    conditions: Array.from(conditionCounts, ([value, count]) => ({ value, count })),
    sellerTypes: Array.from(sellerTypeCounts, ([value, count]) => ({ value, count })),
    priceRange: { min: minPrice, max: maxPrice },
    surfaceRange: { min: minSurface, max: maxSurface },
  };
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────
export async function getListings(
  filters: OccasionFilters
): Promise<OccasionListingsResponse> {
  const all = await ensureCache();

  const filtered = applyFilters(all, filters);
  const sorted = applySort(filtered, filters.sort);

  const page = filters.page || 1;
  const limit = filters.limit || ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const paged = sorted.slice(offset, offset + limit);

  return {
    listings: paged,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
    filters: buildAggregates(all),
  };
}

export async function getFilterAggregates(): Promise<FilterAggregates> {
  const all = await ensureCache();
  return buildAggregates(all);
}

/** Invalideer de cache (aanroepen na scraping) */
export function invalidateAggregatesCache() {
  const cache = g.__occasionsCache!;
  cache.listings = null;
  cache.timestamp = 0;
}

export async function getListingCount(): Promise<number> {
  const all = await ensureCache();
  return all.length;
}
