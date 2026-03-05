"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { VerwarmingType, IsolatieNiveau } from "@/lib/types";
import { isOptieDisabled, getFilteredOpties } from "@/lib/woningtypen";
import RadioCardGroup from "@/components/ui/RadioCardGroup";
import Slider from "@/components/ui/Slider";
import Toggle from "@/components/ui/Toggle";
import Card from "@/components/ui/Card";
import {
  Flame,
  Shield,
  Sun,
  Thermometer,
} from "lucide-react";

const verwarmingTypeOpties = [
  {
    value: "cv-gas" as VerwarmingType,
    label: "CV-ketel (gas)",
    description:
      "Traditionele gasverwarming met hoog rendement. Betrouwbaar en snel warm",
    price: "Standaard",
  },
  {
    value: "warmtepomp-lucht" as VerwarmingType,
    label: "Warmtepomp (lucht)",
    description:
      "Haalt warmte uit buitenlucht. Energiezuinig en subsidie mogelijk",
    price: "+€5.000",
  },
  {
    value: "warmtepomp-bodem" as VerwarmingType,
    label: "Warmtepomp (bodem)",
    description:
      "Haalt warmte uit de grond. Zeer efficiënt, ook bij lage temperaturen",
    price: "+€12.000",
  },
  {
    value: "infrarood" as VerwarmingType,
    label: "Infraroodverwarming",
    description:
      "Elektrische stralingswarmte, lage installatiekosten. Ideaal in combinatie met zonnepanelen",
    price: "+€2.000",
  },
];

const isolatieNiveauOpties = [
  {
    value: "standaard" as IsolatieNiveau,
    label: "Standaard",
    description:
      "Voldoet aan bouwbesluit. Rc-waarde conform huidige nieuwbouwnorm",
    price: "Inbegrepen",
  },
  {
    value: "hr" as IsolatieNiveau,
    label: "HR (hoog rendement)",
    description:
      "Verbeterde isolatie voor lager energieverbruik en hoger comfort",
    price: "+€3.500",
  },
  {
    value: "passiefhuis" as IsolatieNiveau,
    label: "Passiefhuis-niveau",
    description:
      "Maximale isolatie, nagenoeg geen verwarming nodig. Laagste energiekosten",
    price: "+€8.000",
  },
];

export default function StepInstallaties() {
  const {
    woningType,
    verwarmingType,
    setVerwarmingType,
    isolatieNiveau,
    setIsolatieNiveau,
    zonnepanelen,
    setZonnepanelen,
    vloerverwarming,
    setVloerverwarming,
  } = useConfiguratorStore();

  const slug = woningType || "";
  const filteredVerwarmingOpties = getFilteredOpties(slug, verwarmingTypeOpties, "verwarmingTypes");
  const filteredIsolatieOpties = getFilteredOpties(slug, isolatieNiveauOpties, "isolatieNiveaus");

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-2">
          <h1 className="font-heading text-heading-1 text-dark tracking-tight">
            Installaties & energie
          </h1>
          <span className="text-caption text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-lg">Optioneel</span>
        </div>
        <p className="text-body-lg text-gray-600">
          Kies de technische installaties voor je woning. Je kunt deze stap ook overslaan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Verwarmingstype */}
        {!isOptieDisabled(slug, "verwarming") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Verwarmingstype
                </h2>
                <p className="text-body-sm text-gray-600">
                  Bepaal hoe je woning wordt verwarmd
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={filteredVerwarmingOpties}
              value={verwarmingType}
              onChange={(val) => setVerwarmingType(val as VerwarmingType)}
              columns={2}
            />
          </Card>
        )}

        {/* Isolatieniveau */}
        {!isOptieDisabled(slug, "isolatie") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Isolatieniveau
                </h2>
                <p className="text-body-sm text-gray-600">
                  Betere isolatie betekent lagere energiekosten en meer comfort
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={filteredIsolatieOpties}
              value={isolatieNiveau}
              onChange={(val) => setIsolatieNiveau(val as IsolatieNiveau)}
              columns={3}
            />
          </Card>
        )}

        {/* Zonnepanelen */}
        {!isOptieDisabled(slug, "zonnepanelen") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Sun className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Zonnepanelen
                </h2>
                <p className="text-body-sm text-gray-600">
                  Wek je eigen energie op en verlaag de maandlasten
                </p>
              </div>
            </div>
            <Slider
              label="Aantal zonnepanelen"
              value={zonnepanelen}
              onChange={setZonnepanelen}
              min={0}
              max={20}
              step={2}
              unit="panelen"
            />
          </Card>
        )}

        {/* Vloerverwarming */}
        {!isOptieDisabled(slug, "vloerverwarming") && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Vloerverwarming
                </h2>
                <p className="text-body-sm text-gray-600">
                  Comfortabele en gelijkmatige warmteverdeling over de vloer
                </p>
              </div>
            </div>
            <Toggle
              label="Vloerverwarming toevoegen"
              description="Gelijkmatige warmte, ideaal in combinatie met een warmtepomp. Indicatie: +€3.000 - €5.000"
              checked={vloerverwarming}
              onChange={setVloerverwarming}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
