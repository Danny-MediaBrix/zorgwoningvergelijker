import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { listings, scrapeLogs } from "@/lib/db/schema";
import { eq, and, lt } from "drizzle-orm";
import type { ScraperModule, RawListing } from "./types";
import { marktplaatsScraper } from "./marktplaats";
import { tinyhousenederlandScraper } from "./tinyhousenederland";
import { modulairwonenScraper } from "./modulairwonen";
import { tinyfindyScraper } from "./tinyfindy";
import { stekelblosScraper } from "./stekelbos";
import { kuipercaravansScraper } from "./kuipercaravans";
import { unitdirektScraper } from "./unitdirekt";
import { classifyWoningtype } from "./classifier";
import { invalidateAggregatesCache } from "@/lib/occasions/queries";

const SCRAPERS: ScraperModule[] = [
  marktplaatsScraper,
  tinyhousenederlandScraper,
  modulairwonenScraper,
  tinyfindyScraper,
  stekelblosScraper,
  kuipercaravansScraper,
  unitdirektScraper,
];

// Listings ouder dan 7 dagen zonder update worden gedeactiveerd
const STALE_DAYS = 7;
const TIME_BUDGET_MS = 50000; // 50s (Vercel Hobby limit = 60s)

// Globale exclusie — titels met deze woorden worden nooit opgeslagen
const GLOBAL_TITLE_EXCLUDE = ["lego", "playmobil", "schaalmodel", "miniatuur", "modelbouw"];

function isExcludedListing(raw: RawListing): boolean {
  const titleLower = raw.title.toLowerCase();
  return GLOBAL_TITLE_EXCLUDE.some((word) => titleLower.includes(word));
}

export async function runScrapers(): Promise<{
  totalFound: number;
  totalNew: number;
  errors: string[];
}> {
  const startTime = Date.now();
  let totalFound = 0;
  let totalNew = 0;
  const errors: string[] = [];

  for (const scraper of SCRAPERS) {
    if (!scraper.config.enabled) continue;

    // Check time budget
    if (Date.now() - startTime > TIME_BUDGET_MS) {
      console.log(`[scraper] Time budget exceeded, skipping ${scraper.config.name}`);
      break;
    }

    const logId = uuidv4();
    const now = new Date().toISOString();

    // Log scrape start
    await db.insert(scrapeLogs).values({
      id: logId,
      source: scraper.config.name,
      startedAt: now,
      status: "running",
    });

    try {
      const result = await scraper.scrape();

      if (result.error) {
        errors.push(`${scraper.config.name}: ${result.error}`);
        await db
          .update(scrapeLogs)
          .set({
            finishedAt: new Date().toISOString(),
            listingsFound: 0,
            listingsNew: 0,
            error: result.error,
            status: "error",
          })
          .where(eq(scrapeLogs.id, logId));
        continue;
      }

      let newCount = 0;
      const foundCount = result.listings.length;
      totalFound += foundCount;

      // Upsert listings (skip excluded)
      for (const raw of result.listings) {
        if (isExcludedListing(raw)) continue;
        const woningtype = classifyWoningtype(raw.title, raw.description);
        const listingNow = new Date().toISOString();

        try {
          // Try insert, on conflict update
          await db
            .insert(listings)
            .values({
              id: uuidv4(),
              source: result.source,
              sourceId: raw.sourceId,
              sourceUrl: raw.sourceUrl,
              woningtype: (raw as RawListing & { woningtype?: string }).woningtype || woningtype,
              title: raw.title,
              description: raw.description,
              price: raw.price,
              priceLabel: raw.priceLabel,
              location: raw.location,
              province: raw.province,
              surfaceM2: raw.surfaceM2,
              buildYear: raw.buildYear,
              condition: raw.condition,
              sellerType: raw.sellerType,
              transport: raw.transport,
              images: raw.images ? JSON.stringify(raw.images) : null,
              scrapedAt: listingNow,
              updatedAt: listingNow,
              isActive: 1,
            })
            .onConflictDoUpdate({
              target: [listings.source, listings.sourceId],
              set: {
                title: raw.title,
                description: raw.description,
                price: raw.price,
                priceLabel: raw.priceLabel,
                location: raw.location,
                province: raw.province,
                surfaceM2: raw.surfaceM2,
                buildYear: raw.buildYear,
                condition: raw.condition,
                sellerType: raw.sellerType,
                transport: raw.transport,
                images: raw.images ? JSON.stringify(raw.images) : null,
                updatedAt: listingNow,
                isActive: 1,
              },
            });

          newCount++;
        } catch {
          // Duplicate or constraint error, skip
        }
      }

      totalNew += newCount;

      await db
        .update(scrapeLogs)
        .set({
          finishedAt: new Date().toISOString(),
          listingsFound: foundCount,
          listingsNew: newCount,
          status: "success",
        })
        .where(eq(scrapeLogs.id, logId));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      errors.push(`${scraper.config.name}: ${errorMsg}`);

      await db
        .update(scrapeLogs)
        .set({
          finishedAt: new Date().toISOString(),
          error: errorMsg,
          status: "error",
        })
        .where(eq(scrapeLogs.id, logId));
    }
  }

  // Deactiveer verlopen listings (niet gezien in >7 dagen)
  const staleDate = new Date();
  staleDate.setDate(staleDate.getDate() - STALE_DAYS);

  await db
    .update(listings)
    .set({ isActive: 0 })
    .where(
      and(
        eq(listings.isActive, 1),
        lt(listings.updatedAt, staleDate.toISOString())
      )
    );

  // Invalideer filter cache na scraping
  invalidateAggregatesCache();

  return { totalFound, totalNew, errors };
}
