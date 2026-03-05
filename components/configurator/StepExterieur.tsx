"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import {
  DakType,
  GevelType,
  KozijnType,
  GlasType,
  FunderingType,
} from "@/lib/types";
import { isOptieDisabled, getFilteredOpties } from "@/lib/woningtypen";
import RadioCardGroup from "@/components/ui/RadioCardGroup";
import Card from "@/components/ui/Card";
import {
  Home,
  Layers,
  RectangleHorizontal,
  GlassWater,
  Anchor,
} from "lucide-react";

const dakTypeOpties = [
  {
    value: "plat" as DakType,
    label: "Plat dak",
    description:
      "Modern en strak ontwerp, geschikt voor zonnepanelen en sedum",
    price: "Standaard",
  },
  {
    value: "zadeldak" as DakType,
    label: "Zadeldak",
    description:
      "Klassieke dakconstructie met twee hellende vlakken",
    price: "+€2.500",
  },
  {
    value: "lessenaardak" as DakType,
    label: "Lessenaardak",
    description:
      "Eén hellend vlak, modern uiterlijk met extra lichtinval",
    price: "+€1.800",
  },
  {
    value: "sedum" as DakType,
    label: "Sedum / groen dak",
    description:
      "Ecologisch dak met beplanting, uitstekende isolatie en waterberging",
    price: "+€3.500",
  },
];

const gevelTypeOpties = [
  {
    value: "hout" as GevelType,
    label: "Houtafwerking",
    description:
      "Natuurlijke uitstraling, duurzaam en warm. Vereist periodiek onderhoud",
    price: "+€1.200",
  },
  {
    value: "steen" as GevelType,
    label: "Steenstrips",
    description:
      "Traditioneel en onderhoudsarm. Robuust en lang meegaand",
    price: "+€2.500",
  },
  {
    value: "stucwerk" as GevelType,
    label: "Stucwerk",
    description:
      "Strakke, moderne afwerking in diverse kleuren mogelijk",
    price: "Standaard",
  },
  {
    value: "composiet" as GevelType,
    label: "Composiet",
    description:
      "Onderhoudsvrij en weerbestendig. Moderne uitstraling",
    price: "+€2.000",
  },
  {
    value: "combinatie" as GevelType,
    label: "Combinatie",
    description:
      "Mix van materialen voor een unieke, persoonlijke uitstraling",
    price: "+€1.500",
  },
];

const kozijnTypeOpties = [
  {
    value: "kunststof-wit" as KozijnType,
    label: "Kunststof wit",
    description:
      "Onderhoudsvrij, goede isolatie en scherp geprijsd",
    price: "Standaard",
  },
  {
    value: "kunststof-antraciet" as KozijnType,
    label: "Kunststof antraciet",
    description:
      "Moderne donkere uitstraling, zelfde voordelen als wit kunststof",
    price: "+€500",
  },
  {
    value: "aluminium" as KozijnType,
    label: "Aluminium",
    description:
      "Slank profiel, sterk en duurzaam. Veel kleuropties beschikbaar",
    price: "+€2.500",
  },
  {
    value: "hout" as KozijnType,
    label: "Hout",
    description:
      "Warme, authentieke uitstraling. Vereist periodiek onderhoud",
    price: "+€3.000",
  },
];

const glasTypeOpties = [
  {
    value: "dubbel" as GlasType,
    label: "Dubbel glas (HR++)",
    description:
      "Goede isolatie tegen warmteverlies en geluid. Standaard in nieuwbouw",
    price: "Inbegrepen",
  },
  {
    value: "triple" as GlasType,
    label: "Triple glas",
    description:
      "Maximale isolatie, ideaal voor passiefhuis-niveau. Lagere energiekosten",
    price: "+€2.500",
  },
];

const funderingTypeOpties = [
  {
    value: "betonplaat" as FunderingType,
    label: "Betonplaat",
    description:
      "Stabiele fundering op draagkrachtige grond. Meest gangbare optie",
    price: "Standaard",
  },
  {
    value: "paalfundering" as FunderingType,
    label: "Paalfundering",
    description:
      "Noodzakelijk bij slappe grond. Biedt maximale stabiliteit",
    price: "+€5.000",
  },
  {
    value: "wielen-trailer" as FunderingType,
    label: "Wielen / trailer",
    description:
      "Verplaatsbaar, geen vergunning voor fundering nodig. Alleen voor kleine woningen",
    price: "+€4.500",
  },
  {
    value: "schroeffundering" as FunderingType,
    label: "Schroeffundering",
    description:
      "Snelle plaatsing, minimale bodemverstoring. Geschikt voor tijdelijke en permanente opstelling",
    price: "+€3.000",
  },
];

export default function StepExterieur() {
  const {
    woningType,
    dakType,
    setDakType,
    gevelType,
    setGevelType,
    kozijnType,
    setKozijnType,
    glasType,
    setGlasType,
    funderingType,
    setFunderingType,
  } = useConfiguratorStore();

  const slug = woningType || "";
  const filteredFunderingOpties = getFilteredOpties(slug, funderingTypeOpties, "funderingTypes");

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-2">
          <h1 className="font-heading text-heading-1 text-dark tracking-tight">
            Exterieur & materialen
          </h1>
          <span className="text-caption text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-lg">Optioneel</span>
        </div>
        <p className="text-body-lg text-gray-600">
          Kies de afwerking en materialen voor de buitenkant. Je kunt deze stap ook overslaan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Daktype */}
        {!isOptieDisabled(slug, "dak") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Daktype
                </h2>
                <p className="text-body-sm text-gray-600">
                  Het dak bepaalt de uitstraling en energieprestatie van je woning
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={dakTypeOpties}
              value={dakType}
              onChange={(val) => setDakType(val as DakType)}
              columns={2}
            />
          </Card>
        )}

        {/* Geveltype */}
        {!isOptieDisabled(slug, "gevel") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Gevelafwerking
                </h2>
                <p className="text-body-sm text-gray-600">
                  Kies het materiaal voor de buitenwanden
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={gevelTypeOpties}
              value={gevelType}
              onChange={(val) => setGevelType(val as GevelType)}
              columns={3}
            />
          </Card>
        )}

        {/* Kozijntype */}
        {!isOptieDisabled(slug, "kozijnen") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <RectangleHorizontal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Kozijnen
                </h2>
                <p className="text-body-sm text-gray-600">
                  Materiaal en kleur van de raamkozijnen
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={kozijnTypeOpties}
              value={kozijnType}
              onChange={(val) => setKozijnType(val as KozijnType)}
              columns={2}
            />
          </Card>
        )}

        {/* Glastype */}
        {!isOptieDisabled(slug, "glas") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <GlassWater className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Beglazing
                </h2>
                <p className="text-body-sm text-gray-600">
                  Kies het type glas voor ramen en deuren
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={glasTypeOpties}
              value={glasType}
              onChange={(val) => setGlasType(val as GlasType)}
              columns={2}
            />
          </Card>
        )}

        {/* Funderingtype */}
        {!isOptieDisabled(slug, "fundering") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Fundering
                </h2>
                <p className="text-body-sm text-gray-600">
                  De fundering is afhankelijk van je grond en het type woning
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={filteredFunderingOpties}
              value={funderingType}
              onChange={(val) => setFunderingType(val as FunderingType)}
              columns={2}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
