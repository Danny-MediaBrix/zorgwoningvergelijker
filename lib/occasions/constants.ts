export const DUTCH_PROVINCES = [
  "Noord-Holland",
  "Zuid-Holland",
  "Noord-Brabant",
  "Utrecht",
  "Gelderland",
  "Overijssel",
  "Limburg",
  "Friesland",
  "Groningen",
  "Drenthe",
  "Flevoland",
  "Zeeland",
] as const;

export const CONDITION_LABELS: Record<string, string> = {
  nieuw: "Nieuw",
  gebruikt: "Gebruikt",
  goed: "In goede staat",
  redelijk: "Redelijk",
};

export const SELLER_TYPE_LABELS: Record<string, string> = {
  particulier: "Particulier",
  bedrijf: "Bedrijf",
};

export const TRANSPORT_LABELS: Record<string, string> = {
  inclusief: "Met transport",
  exclusief: "Zonder transport",
  onbekend: "Onbekend",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Nieuwste eerst" },
  { value: "price-asc", label: "Prijs oplopend" },
  { value: "price-desc", label: "Prijs aflopend" },
  { value: "surface-desc", label: "Grootste eerst" },
  { value: "surface-asc", label: "Kleinste eerst" },
] as const;

export const ITEMS_PER_PAGE = 12;
