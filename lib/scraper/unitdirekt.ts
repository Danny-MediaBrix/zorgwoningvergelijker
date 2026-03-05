import * as cheerio from "cheerio";
import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, sanitizeText, extractM2 } from "./utils";

const BASE_URL = "https://www.unitdirekt.nl";
const PAGE_URL = `${BASE_URL}/tweedehands-mantelzorgwoningen/`;

export const unitdirektScraper: ScraperModule = {
  config: {
    name: "unitdirekt",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const listings: RawListing[] = [];

    try {
      const response = await fetchWithRetry(PAGE_URL);
      if (!response.ok) {
        return { source: "unitdirekt", listings: [], error: `HTTP ${response.status}` };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Verzamel alle kaarten met hun detail links
      const cards: Array<{
        title: string;
        detailUrl: string;
        image?: string;
        description?: string;
        surfaceM2?: number;
      }> = [];

      $("article.display-aanbod__card").each((_, el) => {
        const $card = $(el);

        const title = sanitizeText($card.find("h3.brxe-heading").text());
        if (!title) return;

        const detailUrl = $card.find("a.display-aanbod__card__btn").attr("href");
        if (!detailUrl) return;

        const imgSrc = $card.find("img.display-aanbod__card__img").attr("src");
        const imgAlt = $card.find("img.display-aanbod__card__img").attr("alt") || "";

        // Skip verkochte items (verkocht in afbeelding bestandsnaam of alt-tekst)
        if (
          (imgSrc && imgSrc.toLowerCase().includes("verkocht")) ||
          imgAlt.toLowerCase().includes("verkocht") ||
          title.toLowerCase().includes("verkocht")
        ) return;

        const description = sanitizeText($card.find(".brxe-text p").text());

        // Oppervlakte uit label of titel
        const sizeLabel = $card.find(".label__txt").text().trim();
        const surfaceM2 = extractM2(sizeLabel) || extractM2(title);

        cards.push({
          title,
          detailUrl: detailUrl.startsWith("http") ? detailUrl : `${BASE_URL}${detailUrl}`,
          image: imgSrc || undefined,
          description: description || undefined,
          surfaceM2,
        });
      });

      // Haal prijs op van elke detail pagina (maar 6 listings, dus acceptabel)
      for (const card of cards) {
        let price: number | undefined;
        let priceLabel: string | undefined;

        try {
          const detailRes = await fetchWithRetry(card.detailUrl);
          if (detailRes.ok) {
            const detailHtml = await detailRes.text();
            const $d = cheerio.load(detailHtml);

            // Vraagprijs staat in #brxe-pllgos of .sp-hero__txt-wrapper__subheading
            const vraagprijsText =
              $d("#brxe-pllgos").text().trim() ||
              $d(".sp-hero__txt-wrapper__subheading").text().trim();

            if (vraagprijsText) {
              const parsed = parsePrice(vraagprijsText);
              price = parsed.price;
              priceLabel = parsed.label;
              if (vraagprijsText.toLowerCase().includes("vraagprijs")) {
                priceLabel = "vraagprijs";
              }
            }
          }
        } catch {
          // Detail page niet beschikbaar, ga door zonder prijs
        }

        const slugMatch = card.detailUrl.match(/\/([^/]+)\/?$/);
        const sourceId = slugMatch ? slugMatch[1] : card.detailUrl;

        listings.push({
          sourceId,
          sourceUrl: card.detailUrl,
          title: card.title,
          description: card.description,
          price,
          priceLabel,
          surfaceM2: card.surfaceM2,
          images: card.image ? [card.image] : undefined,
          sellerType: "bedrijf",
          condition: "gebruikt",
        } as RawListing & { woningtype?: string });

        // UnitDirekt verkoopt alleen mantelzorgwoningen
        (listings[listings.length - 1] as RawListing & { woningtype?: string }).woningtype = "mantelzorgwoning";

        // Rate limiting tussen detail pagina requests
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch (err) {
      return {
        source: "unitdirekt",
        listings: [],
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    return { source: "unitdirekt", listings };
  },
};
