import type { ScraperModule, ScraperResult, RawListing } from "./types";
import { fetchWithRetry, parsePrice, parseProvince, sanitizeText, extractM2, extractBuildYear } from "./utils";
import { classifyWoningtype } from "./classifier";

const SEARCH_QUERIES = [
  "tiny house",
  "mantelzorgwoning",
  "chalet wonen",
  "containerwoning",
  "prefab woning",
  "modulaire woning",
  "flexwoning",
  "woonunit",
  "stacaravan woning",
  "micro woning",
];

const API_BASE = "https://www.marktplaats.nl/lrp/api/search";

interface MarktplaatsApiItem {
  itemId: string;
  title: string;
  description?: string;
  categorySpecificDescription?: string;
  priceInfo?: {
    priceCents?: number;
    priceType?: string;
  };
  location?: {
    cityName?: string;
    countryAbbreviation?: string;
  };
  imageUrls?: string[];
  vipUrl?: string;
  sellerInformation?: {
    sellerName?: string;
    showSoiUrl?: boolean;
  };
  attributes?: Array<{
    key: string;
    value: string;
    values?: string[];
  }>;
}

function getAttributeValue(item: MarktplaatsApiItem, key: string): string | undefined {
  return item.attributes?.find((a) => a.key === key)?.value;
}

async function searchMarktplaatsApi(query: string): Promise<RawListing[]> {
  const params = new URLSearchParams({
    query,
    limit: "30",
    offset: "0",
  });

  try {
    const response = await fetchWithRetry(
      `${API_BASE}?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    const items: MarktplaatsApiItem[] = data.listings || [];

    return items
      .filter((item) => {
        if (item.location?.countryAbbreviation !== "NL") return false;

        const titleLower = (item.title || "").toLowerCase();

        // Skip "gezocht" advertenties
        if (titleLower.startsWith("gezocht") || titleLower.startsWith("gevraagd") ||
            titleLower.startsWith("zoek ") || titleLower.startsWith("wie heeft")) return false;

        // Skip verkochte/gereserveerde items
        if (item.priceInfo?.priceType === "RESERVED") return false;
        if (titleLower.includes("verkocht") || titleLower.includes("gereserveerd")) return false;

        // Skip duidelijke niet-woningen
        const junkPatterns = [
          "lego", "playmobil", "schaalmodel", "miniatuur", "modelbouw",
          "camera", "router", "linksys", "switch", "monitor",
          "laptop", "telefoon", "iphone", "samsung", "xbox", "playstation",
          "meubel", "bank ", "bankstel", "stoel", "tafel", "kast",
          "auto ", "fiets", "motor ", "scooter", "caravan ",
          "hond", "kat ", "paard", "pup", "kitten",
          "kleding", "jurk", "jas ", "schoenen",
          "boek", "dvd", "cd ", "vinyl",
          "kavel", "bouwgrond", "grondstuk", "perceel",
        ];
        if (junkPatterns.some((p) => titleLower.includes(p))) return false;

        return true;
      })
      .map((item): RawListing => {
        const descriptionText = sanitizeText(
          item.categorySpecificDescription || item.description || ""
        );
        const fullText = `${item.title} ${descriptionText}`;

        // Parse price — priceCents=0 met SEE_DESCRIPTION = prijs op aanvraag
        let price: number | undefined;
        let priceLabel: string | undefined;

        if (item.priceInfo) {
          if (item.priceInfo.priceType === "FIXED" && item.priceInfo.priceCents && item.priceInfo.priceCents > 0) {
            price = item.priceInfo.priceCents;
          } else if (item.priceInfo.priceType === "MIN_BID") {
            price = item.priceInfo.priceCents && item.priceInfo.priceCents > 0
              ? item.priceInfo.priceCents
              : undefined;
            priceLabel = "bieden";
          } else if (item.priceInfo.priceType === "SEE_DESCRIPTION") {
            // Try parsing price from description
            const parsed = parsePrice(descriptionText);
            price = parsed.price;
            priceLabel = parsed.label || "Prijs op aanvraag";
          } else if (item.priceInfo.priceType === "FAST_BID") {
            priceLabel = "bieden";
          } else if (item.priceInfo.priceCents && item.priceInfo.priceCents > 0) {
            price = item.priceInfo.priceCents;
          }
        }

        // Province from attributes or city name
        const regionAttr = getAttributeValue(item, "region");
        const province = regionAttr || parseProvince(item.location?.cityName || "");

        // Build VIP URL
        const sourceUrl = item.vipUrl
          ? (item.vipUrl.startsWith("http") ? item.vipUrl : `https://www.marktplaats.nl${item.vipUrl}`)
          : `https://www.marktplaats.nl/v/detail/${item.itemId}`;

        return {
          sourceId: item.itemId,
          sourceUrl,
          title: sanitizeText(item.title),
          description: descriptionText || undefined,
          price,
          priceLabel,
          location: item.location?.cityName,
          province,
          surfaceM2: extractM2(fullText),
          buildYear: extractBuildYear(fullText),
          sellerType: item.sellerInformation?.showSoiUrl ? "bedrijf" : "particulier",
          images: item.imageUrls?.slice(0, 6).map((url) => {
            // Upgrade thumbnail ($_82 = 82px) naar grote variant ($_86 = 1024px)
            const upgraded = url.replace(/\$_\d+\.jpg/, "$_86.jpg");
            return upgraded.startsWith("//") ? `https:${upgraded}` : upgraded;
          }),
        };
      });
  } catch {
    return [];
  }
}

export const marktplaatsScraper: ScraperModule = {
  config: {
    name: "marktplaats",
    enabled: true,
  },

  async scrape(): Promise<ScraperResult> {
    const allListings: RawListing[] = [];
    const seenIds = new Set<string>();

    for (const query of SEARCH_QUERIES) {
      const listings = await searchMarktplaatsApi(query);

      for (const listing of listings) {
        if (!seenIds.has(listing.sourceId)) {
          seenIds.add(listing.sourceId);
          allListings.push(listing);
        }
      }

      // Rate limiting between queries
      await new Promise((r) => setTimeout(r, 500));
    }

    // Classify woningtypes
    for (const listing of allListings) {
      const woningtype = classifyWoningtype(listing.title, listing.description);
      if (woningtype) {
        (listing as RawListing & { woningtype?: string }).woningtype = woningtype;
      }
    }

    return {
      source: "marktplaats",
      listings: allListings,
    };
  },
};
