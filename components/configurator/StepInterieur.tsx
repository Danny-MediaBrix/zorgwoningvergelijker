"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { AfwerkingNiveau } from "@/lib/types";
import { isOptieDisabled } from "@/lib/woningtypen";
import RadioCardGroup from "@/components/ui/RadioCardGroup";
import Card from "@/components/ui/Card";
import { CookingPot, Bath, Info } from "lucide-react";

const keukenNiveauOpties = [
  {
    value: "basis" as AfwerkingNiveau,
    label: "Basis",
    description:
      "Functionele rechte keuken met standaard apparatuur. Inclusief koelkast, kookplaat, oven en afzuigkap",
    price: "Inbegrepen",
  },
  {
    value: "midden" as AfwerkingNiveau,
    label: "Midden",
    description:
      "Hoekkeuken met composieten werkblad en vaatwasser. Keuze uit meerdere frontkleuren en greepstijlen",
    price: "+€5.000",
  },
  {
    value: "luxe" as AfwerkingNiveau,
    label: "Luxe",
    description:
      "Eilandkeuken of maatwerk met natuurstenen werkblad, inductiekookplaat en inbouwapparatuur van A-merk",
    price: "+€12.000",
  },
];

const badkamerNiveauOpties = [
  {
    value: "basis" as AfwerkingNiveau,
    label: "Basis",
    description:
      "Complete badkamer met douche, wastafel en toilet. Standaard tegels en kranen",
    price: "Inbegrepen",
  },
  {
    value: "midden" as AfwerkingNiveau,
    label: "Midden",
    description:
      "Ruimere badkamer met inloopdouche, badmeubel en designkranen. Keuze uit diverse tegelstijlen",
    price: "+€4.000",
  },
  {
    value: "luxe" as AfwerkingNiveau,
    label: "Luxe",
    description:
      "Luxe badkamer met vrijstaand bad, regendouche, dubbele wastafel en vloerverwarming. Hoogwaardige materialen",
    price: "+€10.000",
  },
];

export default function StepInterieur() {
  const {
    woningType,
    keukenNiveau,
    setKeukenNiveau,
    badkamerNiveau,
    setBadkamerNiveau,
  } = useConfiguratorStore();

  const slug = woningType || "";
  const keukenDisabled = isOptieDisabled(slug, "keuken");
  const badkamerDisabled = isOptieDisabled(slug, "badkamer");
  const alleDisabled = keukenDisabled && badkamerDisabled;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-2">
          <h1 className="font-heading text-heading-1 text-dark tracking-tight">
            Interieur & afwerking
          </h1>
          <span className="text-caption text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-lg">Optioneel</span>
        </div>
        <p className="text-body-lg text-gray-600">
          Kies het afwerkingsniveau voor keuken en badkamer. U kunt deze stap ook overslaan.
        </p>
      </div>

      <div className="space-y-6">
        {alleDisabled && (
          <Card padding="lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Niet van toepassing
                </h2>
                <p className="text-body-sm text-gray-600">
                  Dit woningtype heeft geen keuken of badkamer. U kunt deze stap overslaan.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Keuken afwerkingsniveau */}
        {!keukenDisabled && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <CookingPot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Keuken afwerkingsniveau
                </h2>
                <p className="text-body-sm text-gray-600">
                  Van functionele standaardkeuken tot volledig maatwerk
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={keukenNiveauOpties}
              value={keukenNiveau}
              onChange={(val) => setKeukenNiveau(val as AfwerkingNiveau)}
              columns={3}
            />
          </Card>
        )}

        {/* Badkamer afwerkingsniveau */}
        {!badkamerDisabled && (
          <Card padding="lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Bath className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-heading-3 text-dark">
                  Badkamer afwerkingsniveau
                </h2>
                <p className="text-body-sm text-gray-600">
                  Van basisbadkamer tot luxe wellness-ervaring
                </p>
              </div>
            </div>
            <RadioCardGroup
              options={badkamerNiveauOpties}
              value={badkamerNiveau}
              onChange={(val) => setBadkamerNiveau(val as AfwerkingNiveau)}
              columns={3}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
