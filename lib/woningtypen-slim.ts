/**
 * Lichtgewicht woningtypen data voor client components.
 * Bevat alleen slug + naam (geen prijzen, kamers, FAQ, etc.)
 * zodat de volledige 1640+ regels woningtypen.ts niet in de client bundle komt.
 */

export interface WoningtypeSlim {
  slug: string;
  naam: string;
}

export const woningtypenSlim: WoningtypeSlim[] = [
  { slug: "tiny-house", naam: "Tiny House" },
  { slug: "micro-woning", naam: "Micro-woning" },
  { slug: "mantelzorgwoning", naam: "Mantelzorgwoning" },
  { slug: "kangoeroewoning", naam: "Kangoeroewoning" },
  { slug: "chalet", naam: "Chalet" },
  { slug: "lodge", naam: "Lodge" },
  { slug: "vakantiebungalow", naam: "Vakantiebungalow" },
  { slug: "prefab-woning", naam: "Prefab Woning" },
  { slug: "systeemwoning", naam: "Systeemwoning" },
  { slug: "flexwoning", naam: "Flexwoning" },
  { slug: "containerwoning", naam: "Containerwoning" },
  { slug: "woonunit", naam: "Woonunit" },
  { slug: "tuinkamer", naam: "Tuinkamer / Bijgebouw" },
  { slug: "modulaire-aanbouw", naam: "Modulaire Aanbouw" },
];

/** Snelle slug→naam lookup */
export const woningtypeNaamMap = new Map(
  woningtypenSlim.map((w) => [w.slug, w.naam])
);
