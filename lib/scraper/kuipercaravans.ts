import * as cheerio from "cheerio";
import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, sanitizeText } from "./utils";
import { classifyWoningtype } from "./classifier";

const BASE_URL = "https://kuipercaravans.nl";
const PAGE_URL = `${BASE_URL}/stacaravan-kopen/occasions`;

export const kuipercaravansScraper: ScraperModule = {
  config: {
    name: "kuipercaravans",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const listings: RawListing[] = [];

    try {
      const response = await fetchWithRetry(PAGE_URL);
      if (!response.ok) {
        return { source: "kuipercaravans", listings: [], error: `HTTP ${response.status}` };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      $("a.block-aanbod").each((_, el) => {
        const $card = $(el);

        // Skip verkochte items
        if ($card.find(".sold-status").length > 0) return;

        const title = sanitizeText($card.find(".title").text());
        if (!title) return;

        // Extra vangnet: skip verkochte items op basis van titel
        if (title.toLowerCase().includes("verkocht")) return;

        const href = $card.attr("href") || "";
        const sourceUrl = `${BASE_URL}${href}`;
        const sourceId = $card.attr("id") || href;

        // Afbeelding
        const imgSrc = $card.find("> img").attr("src");
        const images = imgSrc ? [`${BASE_URL}${imgSrc}`] : undefined;

        // Prijs
        let price: number | undefined;
        let priceLabel: string | undefined;

        if ($card.find(".op-aanvraag").length > 0) {
          priceLabel = "Prijs op aanvraag";
        } else {
          const priceText = $card.find(".price .cuf strong").text().trim();
          if (priceText) {
            const parsed = parsePrice(`€ ${priceText}`);
            price = parsed.price;
            priceLabel = parsed.label;
          }
        }

        // Afmetingen → oppervlakte
        let surfaceM2: number | undefined;
        const infoSpans = $card.find(".info > span");
        infoSpans.each((_, span) => {
          const text = $(span).text().trim();
          if (text.startsWith("Afmetingen:")) {
            const dims = text.replace("Afmetingen:", "").trim();
            const dimMatch = dims.match(/(\d+)\s*x\s*(\d+)/);
            if (dimMatch) {
              const width = parseInt(dimMatch[1]) / 100;
              const depth = parseInt(dimMatch[2]) / 100;
              surfaceM2 = Math.round(width * depth);
            }
          }
        });

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
        source: "kuipercaravans",
        listings: [],
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    return { source: "kuipercaravans", listings };
  },
};
