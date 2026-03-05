import { ConfiguratieState, PrijsRange } from "./types";
import { getWoningType } from "./woningtypen";

export function berekenPrijsRange(configuratie: ConfiguratieState): PrijsRange {
  const woningType = configuratie.woningType ? getWoningType(configuratie.woningType) : null;
  if (!woningType) return { laag: 0, hoog: 0 };

  // Base price
  const basisLaag = configuratie.totaalM2 * woningType.basisPrijsPerM2Laag;
  const basisHoog = configuratie.totaalM2 * woningType.basisPrijsPerM2Hoog;

  let toeslagLaag = 0;
  let toeslagHoog = 0;

  // Dak toeslagen
  if (configuratie.dakType === "sedum") { toeslagLaag += 2000; toeslagHoog += 5000; }
  else if (configuratie.dakType === "zadeldak") { toeslagLaag += 1000; toeslagHoog += 3000; }
  else if (configuratie.dakType === "lessenaardak") { toeslagLaag += 800; toeslagHoog += 2500; }

  // Gevel toeslagen
  if (configuratie.gevelType === "hout") { toeslagLaag += 500; toeslagHoog += 2000; }
  else if (configuratie.gevelType === "steen") { toeslagLaag += 1500; toeslagHoog += 4000; }
  else if (configuratie.gevelType === "composiet") { toeslagLaag += 1000; toeslagHoog += 3000; }

  // Kozijn toeslagen
  if (configuratie.kozijnType === "aluminium") { toeslagLaag += 1000; toeslagHoog += 3000; }
  else if (configuratie.kozijnType === "hout") { toeslagLaag += 1500; toeslagHoog += 4000; }

  // Glas
  if (configuratie.glasType === "triple") { toeslagLaag += 1500; toeslagHoog += 3000; }

  // Fundering
  if (configuratie.funderingType === "paalfundering") { toeslagLaag += 2000; toeslagHoog += 6000; }
  else if (configuratie.funderingType === "schroeffundering") { toeslagLaag += 1500; toeslagHoog += 4000; }
  else if (configuratie.funderingType === "wielen-trailer") { toeslagLaag += 3000; toeslagHoog += 6000; }

  // Verwarming
  if (configuratie.verwarmingType === "warmtepomp-lucht") { toeslagLaag += 5000; toeslagHoog += 12000; }
  else if (configuratie.verwarmingType === "warmtepomp-bodem") { toeslagLaag += 10000; toeslagHoog += 20000; }
  else if (configuratie.verwarmingType === "infrarood") { toeslagLaag += 1000; toeslagHoog += 3000; }

  // Isolatie
  if (configuratie.isolatieNiveau === "hr") { toeslagLaag += 2000; toeslagHoog += 5000; }
  else if (configuratie.isolatieNiveau === "passiefhuis") { toeslagLaag += 5000; toeslagHoog += 12000; }

  // Zonnepanelen
  if (configuratie.zonnepanelen === 4) { toeslagLaag += 2000; toeslagHoog += 4000; }
  else if (configuratie.zonnepanelen === 8) { toeslagLaag += 4000; toeslagHoog += 7000; }
  else if (configuratie.zonnepanelen >= 12) { toeslagLaag += 6000; toeslagHoog += 10000; }

  // Vloerverwarming
  if (configuratie.vloerverwarming) { toeslagLaag += 1500; toeslagHoog += 3500; }

  // Keuken
  if (configuratie.keukenNiveau === "midden") { toeslagLaag += 2000; toeslagHoog += 5000; }
  else if (configuratie.keukenNiveau === "luxe") { toeslagLaag += 8000; toeslagHoog += 20000; }

  // Badkamer
  if (configuratie.badkamerNiveau === "midden") { toeslagLaag += 1500; toeslagHoog += 4000; }
  else if (configuratie.badkamerNiveau === "luxe") { toeslagLaag += 4000; toeslagHoog += 10000; }

  return {
    laag: Math.round((basisLaag + toeslagLaag) / 500) * 500,
    hoog: Math.round((basisHoog + toeslagHoog) / 500) * 500,
  };
}

export function berekenSimplePrijsRange(woningTypeSlug: string, m2: number): PrijsRange {
  const woningType = getWoningType(woningTypeSlug);
  if (!woningType) return { laag: 0, hoog: 0 };
  return {
    laag: Math.round((m2 * woningType.basisPrijsPerM2Laag) / 500) * 500,
    hoog: Math.round((m2 * woningType.basisPrijsPerM2Hoog) / 500) * 500,
  };
}
