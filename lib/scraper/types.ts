export interface RawListing {
  sourceId: string;
  sourceUrl: string;
  title: string;
  description?: string;
  price?: number; // in centen
  priceLabel?: string;
  location?: string;
  province?: string;
  surfaceM2?: number;
  buildYear?: number;
  condition?: string;
  sellerType?: string;
  transport?: string;
  images?: string[];
}

export interface ScraperConfig {
  name: string;
  enabled: boolean;
}

export interface ScraperResult {
  source: string;
  listings: RawListing[];
  error?: string;
}

export interface ScraperModule {
  config: ScraperConfig;
  scrape: () => Promise<ScraperResult>;
}
