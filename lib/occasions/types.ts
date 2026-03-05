export interface OccasionListing {
  id: string;
  source: string;
  sourceUrl: string;
  woningtype: string | null;
  title: string;
  description: string | null;
  price: number | null; // in centen
  priceLabel: string | null;
  location: string | null;
  province: string | null;
  surfaceM2: number | null;
  buildYear: number | null;
  condition: string | null;
  sellerType: string | null;
  transport: string | null;
  images: string[];
  scrapedAt: string;
  isAanbieder?: boolean;
  aanbiederSlug?: string;
  aanbiederNaam?: string;
}

export interface OccasionFilters {
  woningtype?: string;
  priceMin?: number; // in euros
  priceMax?: number; // in euros
  province?: string;
  surfaceMin?: number;
  surfaceMax?: number;
  buildYearMin?: number;
  condition?: string;
  transport?: string;
  sellerType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface OccasionListingsResponse {
  listings: OccasionListing[];
  total: number;
  page: number;
  totalPages: number;
  filters: FilterAggregates;
}

export interface FilterAggregates {
  woningtypes: { slug: string; count: number }[];
  provinces: { name: string; count: number }[];
  conditions: { value: string; count: number }[];
  sellerTypes: { value: string; count: number }[];
  priceRange: { min: number | null; max: number | null };
  surfaceRange: { min: number | null; max: number | null };
}
