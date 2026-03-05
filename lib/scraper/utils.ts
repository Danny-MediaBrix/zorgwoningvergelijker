const PROVINCE_MAP: Record<string, string> = {
  "noord-holland": "Noord-Holland",
  "zuid-holland": "Zuid-Holland",
  "noord-brabant": "Noord-Brabant",
  utrecht: "Utrecht",
  gelderland: "Gelderland",
  overijssel: "Overijssel",
  limburg: "Limburg",
  friesland: "Friesland",
  groningen: "Groningen",
  drenthe: "Drenthe",
  flevoland: "Flevoland",
  zeeland: "Zeeland",
};

const CITY_PROVINCE: Record<string, string> = {
  amsterdam: "Noord-Holland",
  rotterdam: "Zuid-Holland",
  "den haag": "Zuid-Holland",
  "'s-gravenhage": "Zuid-Holland",
  utrecht: "Utrecht",
  eindhoven: "Noord-Brabant",
  groningen: "Groningen",
  tilburg: "Noord-Brabant",
  almere: "Flevoland",
  breda: "Noord-Brabant",
  nijmegen: "Gelderland",
  arnhem: "Gelderland",
  haarlem: "Noord-Holland",
  enschede: "Overijssel",
  apeldoorn: "Gelderland",
  amersfoort: "Utrecht",
  "den bosch": "Noord-Brabant",
  "'s-hertogenbosch": "Noord-Brabant",
  zaandam: "Noord-Holland",
  zwolle: "Overijssel",
  leiden: "Zuid-Holland",
  dordrecht: "Zuid-Holland",
  maastricht: "Limburg",
  leeuwarden: "Friesland",
  assen: "Drenthe",
  lelystad: "Flevoland",
  middelburg: "Zeeland",
  deventer: "Overijssel",
  hilversum: "Noord-Holland",
  alkmaar: "Noord-Holland",
  delft: "Zuid-Holland",
  gouda: "Zuid-Holland",
  roermond: "Limburg",
  venlo: "Limburg",
  helmond: "Noord-Brabant",
  oss: "Noord-Brabant",
  hoogeveen: "Drenthe",
  emmen: "Drenthe",
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 2
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          ...options.headers,
        },
        signal: AbortSignal.timeout(15000),
      });
      if (response.ok) return response;
      if (response.status === 429 && i < retries) {
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      return response;
    } catch (err) {
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
}

export function parsePrice(text: string): { price?: number; label?: string } {
  if (!text) return {};

  const cleaned = text.replace(/[^\d.,€\s]/gi, "").trim();
  if (!cleaned) return { label: "Prijs op aanvraag" };

  // Detect labels
  const lowerText = text.toLowerCase();
  let label: string | undefined;
  if (lowerText.includes("v.a.") || lowerText.includes("vanaf")) label = "v.a.";
  else if (lowerText.includes("vraagprijs")) label = "vraagprijs";
  else if (lowerText.includes("bieden")) label = "bieden";

  // Extract numeric price
  const priceMatch = text.match(/[\d.,]+/);
  if (!priceMatch) return { label: label || "Prijs op aanvraag" };

  let priceStr = priceMatch[0];
  // Handle Dutch notation: 45.000 (thousands dot) vs 45,50 (decimal comma)
  if (priceStr.includes(".") && priceStr.includes(",")) {
    priceStr = priceStr.replace(/\./g, "").replace(",", ".");
  } else if (priceStr.includes(".") && priceStr.split(".").pop()!.length === 3) {
    priceStr = priceStr.replace(/\./g, "");
  } else if (priceStr.includes(",")) {
    priceStr = priceStr.replace(",", ".");
  }

  const price = Math.round(parseFloat(priceStr) * 100);
  if (isNaN(price) || price <= 0) return { label: label || "Prijs op aanvraag" };

  // If price seems to be in euros (not cents) — i.e., > 100 euros
  // Prices under 100 euros are likely invalid for housing
  if (price < 10000) return { label: label || "Prijs op aanvraag" };

  return { price, label };
}

export function parseProvince(locationText: string): string | undefined {
  if (!locationText) return undefined;

  const lower = locationText.toLowerCase().trim();

  // Direct province match
  for (const [key, value] of Object.entries(PROVINCE_MAP)) {
    if (lower.includes(key)) return value;
  }

  // City match
  for (const [city, province] of Object.entries(CITY_PROVINCE)) {
    if (lower.includes(city)) return province;
  }

  return undefined;
}

export function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractM2(text: string): number | undefined {
  const patterns = [
    /(\d+)\s*m²/i,
    /(\d+)\s*m2/i,
    /(\d+)\s*vierkante\s*meter/i,
    /oppervlakte[:\s]*(\d+)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const m2 = parseInt(match[1]);
      if (m2 > 5 && m2 < 500) return m2;
    }
  }
  return undefined;
}

export function extractBuildYear(text: string): number | undefined {
  const match = text.match(/\b(19[5-9]\d|20[0-2]\d)\b/);
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 1950 && year <= new Date().getFullYear()) return year;
  }
  return undefined;
}
