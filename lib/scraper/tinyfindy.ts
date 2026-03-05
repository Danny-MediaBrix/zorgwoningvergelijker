import * as cheerio from "cheerio";
import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, sanitizeText, extractM2 } from "./utils";
import { classifyWoningtype } from "./classifier";

const API_URL = "https://www.tinyfindy.com/wp-json/wp/v2/product";
// Category 325 = "Tiny Houses"
const CATEGORY_ID = 325;

interface WPProduct {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
}

export const tinyfindyScraper: ScraperModule = {
  config: {
    name: "tinyfindy",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const listings: RawListing[] = [];

    try {
      // Fetch all products from WP REST API (paginated)
      let page = 1;
      const allProducts: WPProduct[] = [];

      while (page <= 5) {
        const url = `${API_URL}?per_page=50&page=${page}&_embed&product_cat=${CATEGORY_ID}`;
        const response = await fetchWithRetry(url, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) break;

        const products: WPProduct[] = await response.json();
        if (products.length === 0) break;

        allProducts.push(...products);
        page++;
      }

      for (const product of allProducts) {
        // Skip uitverkochte producten
        const classList: string[] = (product as WPProduct & { class_list?: string[] }).class_list || [];
        if (classList.includes("outofstock")) continue;

        const title = sanitizeText(product.title.rendered);
        if (!title) continue;

        // Skip verkochte items op basis van titel
        if (title.toLowerCase().includes("verkocht") || title.toLowerCase().includes("gereserveerd")) continue;

        // Strip HTML from description
        const $ = cheerio.load(product.content.rendered);
        const plainText = $.text().trim();

        // Extract price from description text
        const priceMatch = plainText.match(
          /(?:Vraagprijs|Vaste prijs|Prijs vanaf|Prijs)\s*:?\s*€\s*([\d.,]+)/i
        );
        const isPOA = /prijs op aanvraag/i.test(plainText);

        let price: number | undefined;
        let priceLabel: string | undefined;

        if (isPOA) {
          priceLabel = "Prijs op aanvraag";
        } else if (priceMatch) {
          const parsed = parsePrice(`€ ${priceMatch[1]}`);
          price = parsed.price;
          priceLabel = parsed.label;
        } else {
          // Fallback: any € amount
          const euroMatch = plainText.match(/€\s*([\d.,]+)/);
          if (euroMatch) {
            const parsed = parsePrice(`€ ${euroMatch[1]}`);
            price = parsed.price;
            priceLabel = parsed.label;
          }
        }

        // Get image
        const imageUrl =
          product._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
          product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        const surfaceM2 = extractM2(plainText) || extractM2(title);

        const woningtype = classifyWoningtype(title, plainText);

        listings.push({
          sourceId: String(product.id),
          sourceUrl: product.link,
          title,
          description: plainText.substring(0, 500) || undefined,
          price,
          priceLabel,
          surfaceM2,
          images: imageUrl ? [imageUrl] : undefined,
          sellerType: "bedrijf",
        } as RawListing & { woningtype?: string });

        if (woningtype) {
          (listings[listings.length - 1] as RawListing & { woningtype?: string }).woningtype = woningtype;
        }
      }
    } catch (err) {
      return {
        source: "tinyfindy",
        listings: [],
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    return { source: "tinyfindy", listings };
  },
};
