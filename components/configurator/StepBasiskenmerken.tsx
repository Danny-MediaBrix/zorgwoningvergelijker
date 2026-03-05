"use client";

import { useMemo } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import Slider from "@/components/ui/Slider";
import RadioCardGroup from "@/components/ui/RadioCardGroup";
import Card from "@/components/ui/Card";
import { Ruler, Layers, Move, Info } from "lucide-react";

export default function StepBasiskenmerken() {
  const {
    woningType,
    totaalM2,
    setTotaalM2,
    aantalVerdiepingen,
    setAantalVerdiepingen,
    buitenBreedte,
    buitenDiepte,
    setBuitenAfmetingen,
    modules,
  } = useConfiguratorStore();

  const wt = woningType ? getWoningType(woningType) : null;

  // Parse verdiepingen options from the woningType string (e.g., "1", "1-2", "1-3")
  const verdiepingOptions = useMemo(() => {
    if (!wt) return [];
    const parts = wt.verdiepingen.split("-").map(Number);
    const min = parts[0] || 1;
    const max = parts[parts.length - 1] || 1;
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push({
        value: String(i),
        label: `${i} ${i === 1 ? "verdieping" : "verdiepingen"}`,
        description:
          i === 1
            ? "Gelijkvloers, ideaal voor toegankelijkheid"
            : i === 2
            ? "Extra verdieping voor meer leefruimte"
            : "Maximale benutting van het grondoppervlak",
      });
    }
    return options;
  }, [wt]);

  if (!wt) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-gray-600">
          Ga terug en selecteer eerst een woningtype.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-heading-1 text-dark mb-2 tracking-tight">
          Basiskenmerken van je {wt.naam}
        </h1>
        <p className="text-body-lg text-gray-600">
          Bepaal de grootte en basisindeling van je woning
        </p>
      </div>

      <div className="space-y-6">
        {/* Total m2 slider */}
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-heading-3 text-dark">
                Totaal oppervlak
              </h2>
              <p className="text-body-sm text-gray-600">
                Hoeveel vierkante meter wil je?
              </p>
            </div>
          </div>
          <Slider
            label="Woonoppervlak"
            value={totaalM2}
            onChange={setTotaalM2}
            min={wt.minM2}
            max={wt.maxM2}
            step={1}
            unit="m²"
          />
        </Card>

        {/* Verdiepingen */}
        {verdiepingOptions.length > 1 && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Aantal verdiepingen
                </h2>
                <p className="text-body-sm text-gray-600">
                  Kies het aantal bouwlagen
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={verdiepingOptions}
              value={String(aantalVerdiepingen)}
              onChange={(val) => setAantalVerdiepingen(Number(val))}
              columns={verdiepingOptions.length as 2 | 3 | 4}
            />
          </Card>
        )}

        {/* Buitenafmetingen */}
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Move className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-heading-3 text-dark">
                Buitenafmetingen
              </h2>
              <p className="text-body-sm text-gray-600">
                Breedte en diepte van de woning (in meters)
              </p>
              {wt?.supportsModules && modules.length > 1 && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Info className="w-3.5 h-3.5 text-primary/60" />
                  <p className="text-caption text-gray-400">
                    Per {(wt.moduleLabel || "module").toLowerCase()} instellen in stap 3
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="buitenBreedte"
                className="block text-body-sm font-medium text-gray-600"
              >
                Breedte (m)
              </label>
              <input
                type="number"
                id="buitenBreedte"
                value={buitenBreedte}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setBuitenAfmetingen(val, buitenDiepte);
                }}
                min={3}
                max={20}
                step={0.5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 text-body transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="buitenDiepte"
                className="block text-body-sm font-medium text-gray-600"
              >
                Diepte (m)
              </label>
              <input
                type="number"
                id="buitenDiepte"
                value={buitenDiepte}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setBuitenAfmetingen(buitenBreedte, val);
                }}
                min={3}
                max={20}
                step={0.5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/80 text-body transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:border-primary"
              />
            </div>
          </div>
          <p className="text-caption text-gray-600 mt-3">
            Totaal grondoppervlak: {(buitenBreedte * buitenDiepte).toFixed(1)} m²
            {aantalVerdiepingen > 1 && (
              <span>
                {" "}
                ({(buitenBreedte * buitenDiepte * aantalVerdiepingen).toFixed(1)} m² over{" "}
                {aantalVerdiepingen} verdiepingen)
              </span>
            )}
          </p>
        </Card>
      </div>
    </div>
  );
}
