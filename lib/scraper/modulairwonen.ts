import * as cheerio from "cheerio";
import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, parseProvince, sanitizeText, extractM2, extractBuildYear } from "./utils";
import { classifyWoningtype } from "./classifier";

const BASE_URL = "https://www.modulairwonen.nl";

export const modulairwonenScraper: ScraperModule = {
  config: {
    name: "modulairwonen",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const listings: RawListing[] = [];

    try {
      const response = await fetchWithRetry(`${BASE_URL}/occasions`);

      if (!response.ok) {
        return {
          source: "modulairwonen",
          listings: [],
          error: `HTTP ${response.status}`,
        };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      $("article, .listing-card, .property-card, [class*='listing'], [class*='product']").each(
        (_, el) => {
          const $el = $(el);

          const linkEl = $el.find("a[href]").first();
          const href = linkEl.attr("href");
          if (!href) return;

          const sourceUrl = href.startsWith("http") ? href : `${BASE_URL}${href}`;
          const sourceIdMatch = href.match(/\/([^/]+)\/?$/);
          const sourceId = sourceIdMatch ? sourceIdMatch[1] : href;

          const title = sanitizeText(
            $el.find("h2, h3, h4, .title, [class*='title']").first().text()
          );
          if (!title) return;

          const description = sanitizeText(
            $el.find("p, .description, [class*='description'], [class*='excerpt']").first().text()
          );

          const priceText =
            $el.find(".price, [class*='price'], [class*='prijs']").first().text();
          const { price, label } = parsePrice(priceText);

          const locationText =
            $el.find(".location, [class*='location'], [class*='locatie']").first().text();

          const imgEl = $el.find("img").first();
          const imgSrc = imgEl.attr("src") || imgEl.attr("data-src");
          const images = imgSrc
            ? [imgSrc.startsWith("http") ? imgSrc : `${BASE_URL}${imgSrc}`]
            : [];

          const fullText = `${title} ${description}`;

          listings.push({
            sourceId,
            sourceUrl,
            title,
            description: description || undefined,
            price,
            priceLabel: label,
            location: sanitizeText(locationText),
            province: parseProvince(locationText),
            surfaceM2: extractM2(fullText),
            buildYear: extractBuildYear(fullText),
            images: images.length > 0 ? images : undefined,
          });
        }
      );

      for (const listing of listings) {
        const woningtype = classifyWoningtype(listing.title, listing.description);
        if (woningtype) {
          (listing as RawListing & { woningtype?: string }).woningtype = woningtype;
        }
      }
    } catch (err) {
      return {
        source: "modulairwonen",
        listings: [],
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    return {
      source: "modulairwonen",
      listings,
    };
  },
};
