/**
 * Keyword-based classifier: matcht listing titel+beschrijving aan woningtype slugs.
 * Titel weegt 3x zwaarder dan beschrijving.
 */

const WONINGTYPE_KEYWORDS: Record<string, string[]> = {
  "tiny-house": [
    "tiny house", "tinyhouse", "tiny home", "tiny woning",
    "klein huis op wielen", "mobiel huis",
  ],
  "micro-woning": [
    "micro-woning", "microwoning", "micro woning",
    "compact wonen", "studio woning",
  ],
  mantelzorgwoning: [
    "mantelzorgwoning", "mantelzorg woning", "mantelzorg unit",
    "zorgwoning", "zorg woning", "anbouw mantelzorg",
    "inwoning", "granny flat",
  ],
  kangoeroewoning: [
    "kangoeroewoning", "kangoeroe woning",
    "meergeneratiewoning",
  ],
  chalet: [
    "chalet", "stacaravan", "sta-caravan",
    "recreatiewoning", "recreatie woning",
    "vakantie chalet", "mobilhome",
  ],
  lodge: [
    "lodge", "boslodge", "glamping lodge",
    "vakantie lodge",
  ],
  vakantiebungalow: [
    "vakantiebungalow", "vakantie bungalow",
    "recreatiebungalow", "recreatie bungalow",
    "bungalow",
  ],
  "prefab-woning": [
    "prefab woning", "prefabwoning", "prefab huis",
    "geprefabriceerd", "fabrieksmatig",
  ],
  systeemwoning: [
    "systeemwoning", "systeem woning",
    "systeembouw",
  ],
  flexwoning: [
    "flexwoning", "flex woning", "flexhuis",
    "tijdelijke woning", "verplaatsbare woning",
    "demontabele woning",
  ],
  containerwoning: [
    "containerwoning", "container woning",
    "container huis", "containerunit",
    "zeecontainer woning", "wooncontainer",
  ],
  woonunit: [
    "woonunit", "portacabin", "portakabin",
    "unit woning", "woon unit",
  ],
  tuinkamer: [
    "tuinkamer", "tuinhuis", "tuinkantoor",
    "veranda", "serre",
  ],
  "modulaire-aanbouw": [
    "modulaire aanbouw", "modulair aanbouw",
    "aanbouw module", "uitbouw modulair",
    "modulaire woning", "modulair wonen",
    "modulair bouwen", "modulaire bouw",
  ],
};

export function classifyWoningtype(title: string, description?: string): string | null {
  const titleLower = (title || "").toLowerCase();
  const descLower = (description || "").toLowerCase();

  let bestSlug: string | null = null;
  let bestScore = 0;

  for (const [slug, keywords] of Object.entries(WONINGTYPE_KEYWORDS)) {
    let score = 0;

    for (const keyword of keywords) {
      // Titel weegt 3x zwaarder
      if (titleLower.includes(keyword)) {
        score += 3;
      }
      if (descLower.includes(keyword)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestSlug = slug;
    }
  }

  // Minimale drempel: minstens 1 match in titel of 2 in beschrijving
  return bestScore >= 1 ? bestSlug : null;
}
