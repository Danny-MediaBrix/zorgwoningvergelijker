import * as cheerio from "cheerio";
import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, sanitizeText } from "./utils";
import { classifyWoningtype } from "./classifier";

const BASE_URL = "https://www.stekelbos.nl";
const PAGE_URL = `${BASE_URL}/tweedehands-chalets`;

export const stekelblosScraper: ScraperModule = {
  config: {
    name: "stekelbos",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const listings: RawListing[] = [];

    try {
      const response = await fetchWithRetry(PAGE_URL);
      if (!response.ok) {
        return { source: "stekelbos", listings: [], error: `HTTP ${response.status}` };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      $(".aanbod-card").each((_, el) => {
        const $card = $(el);

        // Skip verkochte items
        if ($card.find(".price-label--sold").length > 0) return;

        const title = sanitizeText($card.find(".aanbod-card__title").text());
        if (!title) return;

        // Extra vangnet: skip verkochte items op basis van titel
        if (title.toLowerCase().includes("verkocht")) return;

        const href = $card.find(".aanbod-card__title").attr("href");
        if (!href) return;

        const sourceUrl = `${BASE_URL}${href}`;

        // Object ID als source ID
        const objectText = $card.find(".aanbod-card__number").text();
        const sourceId = objectText.replace("Object ", "").trim() || href;

        // Afbeelding
        const imgSrc = $card.find(".aanbod-card__image img").attr("src");
        const images = imgSrc ? [`${BASE_URL}${imgSrc}`] : undefined;

        // Prijs — check op aanvraag eerst
        let price: number | undefined;
        let priceLabel: string | undefined;

        if ($card.find(".aanbod-card__request").length > 0) {
          priceLabel = "Prijs op aanvraag";
        } else {
          // Huidige prijs (niet de oude doorgestreepte)
          const priceEl = $card.find(
            ".aanbod-card__price > div > div:not(.aanbod-card__old-price)"
          );
          const priceText = priceEl.last().text();
          if (priceText) {
            const parsed = parsePrice(priceText);
            price = parsed.price;
            priceLabel = parsed.label;
          }
        }

        // Afmetingen → oppervlakte berekenen
        const dimText = $card.find(".icon-specs-size").text().trim();
        let surfaceM2: number | undefined;
        const dimMatch = dimText.match(/(\d+)\s*x\s*(\d+)/);
        if (dimMatch) {
          // Afmetingen in cm, omzetten naar m²
          const width = parseInt(dimMatch[1]) / 100;
          const depth = parseInt(dimMatch[2]) / 100;
          surfaceM2 = Math.round(width * depth);
        }

        const woningtype = classifyWoningtype(title, "") || "chalet";

        listings.push({
          sourceId,
          sourceUrl,
          title,
          price,
          priceLabel,
          surfaceM2,
          images,
          sellerType: "bedrijf",
          condition: "gebruikt",
        } as RawListing & { woningtype?: string });

        (listings[listings.length - 1] as RawListing & { woningtype?: string }).woningtype = woningtype;
      });
    } catch (err) {
      return {
        source: "stekelbos",
        listings: [],
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    return { source: "stekelbos", listings };
  },
};
