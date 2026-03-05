// ==================== WONINGTYPEN ====================

export type WoningCategorie =
  | "kleinschalig-wonen"
  | "zorg-mantelzorg"
  | "recreatie-vakantie"
  | "reguliere-woningbouw"
  | "overig";

export interface PresetModule {
  naam: string;
  kamers: PresetKamer[];
  defaultBreedte?: number;
  defaultDiepte?: number;
}

export interface WoningType {
  slug: string;
  naam: string;
  categorie: WoningCategorie;
  categorieLabel: string;
  tagline: string;
  beschrijving: string;
  prijsVanaf: number;
  defaultM2: number;
  minM2: number;
  maxM2: number;
  verdiepingen: string;
  defaultVerdiepingen: number;
  presetKamers: PresetKamer[];
  basisPrijsPerM2Laag: number;
  basisPrijsPerM2Hoog: number;
  supportsModules?: boolean;
  defaultModuleCount?: number;
  maxModules?: number;
  moduleLabel?: string;
  presetModules?: PresetModule[];
  /** Opties die niet beschikbaar zijn voor dit woningtype */
  disabledOpties?: {
    verwarming?: boolean;
    vloerverwarming?: boolean;
    zonnepanelen?: boolean;
    isolatie?: boolean;
    keuken?: boolean;
    badkamer?: boolean;
    fundering?: boolean;
    dak?: boolean;
    gevel?: boolean;
    kozijnen?: boolean;
    glas?: boolean;
  };

  /** Specifieke waarden die niet beschikbaar zijn */
  disabledWaarden?: {
    verwarmingTypes?: VerwarmingType[];
    isolatieNiveaus?: IsolatieNiveau[];
    funderingTypes?: FunderingType[];
  };

  seo: {
    title: string;
    description: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  specificaties: {
    typischeAfmetingen: string;
    gemiddeldeBouwtijd: string;
    levensduur: string;
    energielabel: string;
    fundering: string;
    vergunning: string;
    verplaatsbaar: string;
    geschiktVoor: string;
    aantalKamers: string;
  };
  voordelen: string[];
  nadelen: string[];
  faq: FAQItem[];
}

export interface PresetKamer {
  type: KamerType;
  naam: string;
  defaultM2: number;
  minM2: number;
  maxM2: number;
}

// ==================== CONFIGURATOR ====================

export type KamerType =
  | "woonkamer"
  | "slaapkamer"
  | "keuken"
  | "badkamer"
  | "berging"
  | "werkruimte"
  | "wasruimte"
  | "terras"
  | "hal";

export interface Kamer {
  id: string;
  type: KamerType;
  naam: string;
  m2: number;
  breedte: number;
  diepte: number;
  x: number;
  y: number;
  kleur: string;
}

export interface Module {
  id: string;
  naam: string;
  kamers: Kamer[];
  buitenBreedte: number;
  buitenDiepte: number;
}

export type DakType = "plat" | "zadeldak" | "lessenaardak" | "sedum";
export type GevelType = "hout" | "steen" | "stucwerk" | "composiet" | "combinatie";
export type KozijnType = "kunststof-wit" | "kunststof-antraciet" | "aluminium" | "hout";
export type GlasType = "dubbel" | "triple";
export type FunderingType = "betonplaat" | "paalfundering" | "wielen-trailer" | "schroeffundering";
export type VerwarmingType = "cv-gas" | "warmtepomp-lucht" | "warmtepomp-bodem" | "infrarood";
export type IsolatieNiveau = "standaard" | "hr" | "passiefhuis";
export type AfwerkingNiveau = "basis" | "midden" | "luxe";

export interface ConfiguratieState {
  woningType: string | null;
  totaalM2: number;
  aantalVerdiepingen: number;
  kamers: Kamer[];
  buitenBreedte: number;
  buitenDiepte: number;
  dakType: DakType | null;
  gevelType: GevelType | null;
  kozijnType: KozijnType | null;
  glasType: GlasType;
  funderingType: FunderingType | null;
  verwarmingType: VerwarmingType | null;
  isolatieNiveau: IsolatieNiveau;
  zonnepanelen: number;
  vloerverwarming: boolean;
  keukenNiveau: AfwerkingNiveau;
  badkamerNiveau: AfwerkingNiveau;
}

export interface ContactGegevens {
  naam: string;
  email: string;
  telefoon: string;
  postcode: string;
  oplevertermijn: string;
  budget: string;
  woonsituatie?: string;
  doel?: string;
  heeftKavel: "ja" | "nee" | "onbekend";
  kavelGrootte?: number;
  opmerkingen?: string;
}

export interface PrijsRange {
  laag: number;
  hoog: number;
}

// ==================== LEAD ====================

export interface Lead {
  id: string;
  createdAt: string;
  configuratie: ConfiguratieState;
  contact: ContactGegevens;
  prijsIndicatie: PrijsRange;
}

// ==================== AANBIEDER ====================

export interface Aanbieder {
  slug: string;
  naam: string;
  logo: string;
  beschrijving: string;
  vestigingsplaats: string;
  provincie: string;
  werkgebied: string[];
  specialisaties: string[];
  beoordeling: number;
  aantalReviews: number;
  portfolio: PortfolioItem[];
  contactEmail: string;
  website: string;
  telefoon: string;
}

export interface PortfolioItem {
  titel: string;
  afbeelding: string;
  woningType: string;
  locatie: string;
}

// ==================== CONTENT ====================

export interface KennisbankArtikel {
  slug: string;
  titel: string;
  beschrijving: string;
  categorie: "kosten" | "vergunning" | "bouwtijd" | "vergelijking" | "algemeen";
  woningType?: string;
  publicatieDatum: string;
  laatstBijgewerkt: string;
  leestijd: number;
  seoTitle: string;
  seoDescription: string;
}

export interface FAQItem {
  vraag: string;
  antwoord: string;
}

export interface Testimonial {
  naam: string;
  locatie: string;
  woningType: string;
  tekst: string;
  beoordeling: number;
  datum: string;
}

// ==================== CONSTANTEN ====================

export const KAMER_KLEUREN: Record<KamerType, string> = {
  woonkamer: "#FFF8E1",
  slaapkamer: "#E3F2FD",
  keuken: "#FFF3E0",
  badkamer: "#E0F7FA",
  berging: "#ECEFF1",
  werkruimte: "#F3E5F5",
  wasruimte: "#ECEFF1",
  terras: "#E8F5E9",
  hal: "#FAFAFA",
};

export const KAMER_BORDER_KLEUREN: Record<KamerType, string> = {
  woonkamer: "#F9A825",
  slaapkamer: "#42A5F5",
  keuken: "#FF8A65",
  badkamer: "#26C6DA",
  berging: "#90A4AE",
  werkruimte: "#AB47BC",
  wasruimte: "#78909C",
  terras: "#66BB6A",
  hal: "#BDBDBD",
};

export const KAMER_LABELS: Record<KamerType, string> = {
  woonkamer: "Woonkamer",
  slaapkamer: "Slaapkamer",
  keuken: "Keuken",
  badkamer: "Badkamer",
  berging: "Berging",
  werkruimte: "Werkruimte",
  wasruimte: "Wasruimte",
  terras: "Terras",
  hal: "Hal",
};
