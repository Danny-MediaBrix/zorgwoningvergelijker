"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPlattegrond from "./StepPlattegrond";
import {
  ChevronDown,
  Hammer,
  Flame,
  Paintbrush,
  CookingPot,
  Bath,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import {
  DakType,
  GevelType,
  KozijnType,
  GlasType,
  FunderingType,
  VerwarmingType,
  IsolatieNiveau,
  AfwerkingNiveau,
} from "@/lib/types";
import { isOptieDisabled, getFilteredOpties, getWoningType } from "@/lib/woningtypen";
import RadioCardGroup from "@/components/ui/RadioCardGroup";
import Slider from "@/components/ui/Slider";
import Toggle from "@/components/ui/Toggle";
import { cn, formatM2 } from "@/lib/utils";

// ── Exterieur options ──────────────────────────────────────────────

const dakTypeOpties = [
  { value: "plat" as DakType, label: "Plat dak", description: "Modern, geschikt voor zonnepanelen", price: "Standaard" },
  { value: "zadeldak" as DakType, label: "Zadeldak", description: "Klassieke dakconstructie", price: "+€2.500" },
  { value: "lessenaardak" as DakType, label: "Lessenaardak", description: "Één hellend vlak, modern", price: "+€1.800" },
  { value: "sedum" as DakType, label: "Sedum / groen dak", description: "Ecologisch, goede isolatie", price: "+€3.500" },
];

const gevelTypeOpties = [
  { value: "hout" as GevelType, label: "Houtafwerking", description: "Natuurlijk en warm", price: "+€1.200" },
  { value: "steen" as GevelType, label: "Steenstrips", description: "Traditioneel, onderhoudsarm", price: "+€2.500" },
  { value: "stucwerk" as GevelType, label: "Stucwerk", description: "Strak en modern", price: "Standaard" },
  { value: "composiet" as GevelType, label: "Composiet", description: "Onderhoudsvrij", price: "+€2.000" },
  { value: "combinatie" as GevelType, label: "Combinatie", description: "Mix van materialen", price: "+€1.500" },
];

const kozijnTypeOpties = [
  { value: "kunststof-wit" as KozijnType, label: "Kunststof wit", description: "Onderhoudsvrij, scherp geprijsd", price: "Standaard" },
  { value: "kunststof-antraciet" as KozijnType, label: "Kunststof antraciet", description: "Moderne donkere uitstraling", price: "+€500" },
  { value: "aluminium" as KozijnType, label: "Aluminium", description: "Slank profiel, sterk", price: "+€2.500" },
  { value: "hout" as KozijnType, label: "Hout", description: "Warm en authentiek", price: "+€3.000" },
];

const glasTypeOpties = [
  { value: "dubbel" as GlasType, label: "Dubbel glas (HR++)", description: "Goede isolatie", price: "Inbegrepen" },
  { value: "triple" as GlasType, label: "Triple glas", description: "Maximale isolatie", price: "+€2.500" },
];

const funderingTypeOpties = [
  { value: "betonplaat" as FunderingType, label: "Betonplaat", description: "Meest gangbare optie", price: "Standaard" },
  { value: "paalfundering" as FunderingType, label: "Paalfundering", description: "Bij slappe grond", price: "+€5.000" },
  { value: "wielen-trailer" as FunderingType, label: "Wielen / trailer", description: "Verplaatsbaar", price: "+€4.500" },
  { value: "schroeffundering" as FunderingType, label: "Schroeffundering", description: "Snelle plaatsing", price: "+€3.000" },
];

// ── Installaties options ─────────────────────────────────────────

const verwarmingTypeOpties = [
  { value: "cv-gas" as VerwarmingType, label: "CV-ketel (gas)", description: "Traditioneel, betrouwbaar", price: "Standaard" },
  { value: "warmtepomp-lucht" as VerwarmingType, label: "Warmtepomp (lucht)", description: "Energiezuinig", price: "+€5.000" },
  { value: "warmtepomp-bodem" as VerwarmingType, label: "Warmtepomp (bodem)", description: "Zeer efficiënt", price: "+€12.000" },
  { value: "infrarood" as VerwarmingType, label: "Infrarood", description: "Lage installatiekosten", price: "+€2.000" },
];

const isolatieNiveauOpties = [
  { value: "standaard" as IsolatieNiveau, label: "Standaard", description: "Conform bouwbesluit", price: "Inbegrepen" },
  { value: "hr" as IsolatieNiveau, label: "HR (hoog rendement)", description: "Lager energieverbruik", price: "+€3.500" },
  { value: "passiefhuis" as IsolatieNiveau, label: "Passiefhuis", description: "Maximale isolatie", price: "+€8.000" },
];

// ── Interieur options ────────────────────────────────────────────

const keukenNiveauOpties = [
  { value: "basis" as AfwerkingNiveau, label: "Basis", description: "Functionele rechte keuken", price: "Inbegrepen" },
  { value: "midden" as AfwerkingNiveau, label: "Midden", description: "Hoekkeuken met vaatwasser", price: "+€5.000" },
  { value: "luxe" as AfwerkingNiveau, label: "Luxe", description: "Eilandkeuken of maatwerk", price: "+€12.000" },
];

const badkamerNiveauOpties = [
  { value: "basis" as AfwerkingNiveau, label: "Basis", description: "Douche, wastafel en toilet", price: "Inbegrepen" },
  { value: "midden" as AfwerkingNiveau, label: "Midden", description: "Inloopdouche, designkranen", price: "+€4.000" },
  { value: "luxe" as AfwerkingNiveau, label: "Luxe", description: "Vrijstaand bad, regendouche", price: "+€10.000" },
];

// ── Accordion section ────────────────────────────────────────────

function AccordionSection({
  icon: Icon,
  title,
  preview,
  isOpen,
  onToggle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  preview: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-card border border-gray-200/80 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-body-sm font-semibold text-dark">{title}</p>
          <p className="text-caption text-gray-600 truncate">{preview}</p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────

export default function StepDetails() {
  const store = useConfiguratorStore();
  const slug = store.woningType || "";
  const wt = slug ? getWoningType(slug) : null;

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const filteredFunderingOpties = getFilteredOpties(slug, funderingTypeOpties, "funderingTypes");
  const filteredVerwarmingOpties = getFilteredOpties(slug, verwarmingTypeOpties, "verwarmingTypes");
  const filteredIsolatieOpties = getFilteredOpties(slug, isolatieNiveauOpties, "isolatieNiveaus");

  // Exterieur preview
  const extLabels = [
    store.dakType && { plat: "Plat dak", zadeldak: "Zadeldak", lessenaardak: "Lessenaardak", sedum: "Sedum" }[store.dakType],
    store.gevelType && { hout: "Hout", steen: "Steen", stucwerk: "Stucwerk", composiet: "Composiet", combinatie: "Combinatie" }[store.gevelType],
  ].filter(Boolean);
  const extPreview = extLabels.length > 0 ? extLabels.join(" · ") : "Standaard";

  // Installaties preview
  const instLabels = [
    store.verwarmingType && { "cv-gas": "CV gas", "warmtepomp-lucht": "Warmtepomp", "warmtepomp-bodem": "Bodemwarmte", infrarood: "Infrarood" }[store.verwarmingType],
    store.zonnepanelen > 0 && `${store.zonnepanelen} panelen`,
    store.vloerverwarming && "Vloerverwarming",
  ].filter(Boolean);
  const instPreview = instLabels.length > 0 ? instLabels.join(" · ") : "Standaard";

  // Interieur preview
  const intLabels = [
    !isOptieDisabled(slug, "keuken") && `Keuken: ${store.keukenNiveau}`,
    !isOptieDisabled(slug, "badkamer") && `Badkamer: ${store.badkamerNiveau}`,
  ].filter(Boolean);
  const intPreview = intLabels.length > 0 ? intLabels.join(" · ") : "Standaard";

  // Check which sections are relevant
  const hasExterieur = !isOptieDisabled(slug, "dak") || !isOptieDisabled(slug, "gevel") || !isOptieDisabled(slug, "kozijnen") || !isOptieDisabled(slug, "glas") || !isOptieDisabled(slug, "fundering");
  const hasInstallaties = !isOptieDisabled(slug, "verwarming") || !isOptieDisabled(slug, "isolatie") || !isOptieDisabled(slug, "zonnepanelen") || !isOptieDisabled(slug, "vloerverwarming");
  const hasInterieur = !isOptieDisabled(slug, "keuken") || !isOptieDisabled(slug, "badkamer");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-heading-1 text-dark mb-2 tracking-tight">
          Verfijn je woning
        </h1>
        <p className="text-body-lg text-gray-600">
          Open een sectie om details aan te passen. Alle keuzes zijn optioneel.
        </p>
      </div>

      {/* ── Plattegrond (full editor, always visible) ── */}
      <div className="mb-8">
        <StepPlattegrond embedded />
      </div>

      {/* ── Afwerking accordions ── */}
      <div className="mb-6">
        <h2 className="font-heading text-heading-3 text-dark mb-1">
          Afwerking & installaties
        </h2>
        <p className="text-body-sm text-gray-600">
          Optioneel: open een sectie om details aan te passen
        </p>
      </div>

      <div className="space-y-3">
        {/* ── Exterieur ── */}
        {hasExterieur && (
          <AccordionSection
            icon={Hammer}
            title="Exterieur & materialen"
            preview={extPreview}
            isOpen={openSection === "exterieur"}
            onToggle={() => toggleSection("exterieur")}
          >
            <div className="space-y-5">
              {!isOptieDisabled(slug, "dak") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Daktype</p>
                  <RadioCardGroup
                    options={dakTypeOpties}
                    value={store.dakType}
                    onChange={(val) => store.setDakType(val as DakType)}
                    columns={2}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "gevel") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Gevelafwerking</p>
                  <RadioCardGroup
                    options={gevelTypeOpties}
                    value={store.gevelType}
                    onChange={(val) => store.setGevelType(val as GevelType)}
                    columns={3}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "kozijnen") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Kozijnen</p>
                  <RadioCardGroup
                    options={kozijnTypeOpties}
                    value={store.kozijnType}
                    onChange={(val) => store.setKozijnType(val as KozijnType)}
                    columns={2}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "glas") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Beglazing</p>
                  <RadioCardGroup
                    options={glasTypeOpties}
                    value={store.glasType}
                    onChange={(val) => store.setGlasType(val as GlasType)}
                    columns={2}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "fundering") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Fundering</p>
                  <RadioCardGroup
                    options={filteredFunderingOpties}
                    value={store.funderingType}
                    onChange={(val) => store.setFunderingType(val as FunderingType)}
                    columns={2}
                  />
                </div>
              )}
            </div>
          </AccordionSection>
        )}

        {/* ── Installaties ── */}
        {hasInstallaties && (
          <AccordionSection
            icon={Flame}
            title="Installaties & energie"
            preview={instPreview}
            isOpen={openSection === "installaties"}
            onToggle={() => toggleSection("installaties")}
          >
            <div className="space-y-5">
              {!isOptieDisabled(slug, "verwarming") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Verwarmingstype</p>
                  <RadioCardGroup
                    options={filteredVerwarmingOpties}
                    value={store.verwarmingType}
                    onChange={(val) => store.setVerwarmingType(val as VerwarmingType)}
                    columns={2}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "isolatie") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Isolatieniveau</p>
                  <RadioCardGroup
                    options={filteredIsolatieOpties}
                    value={store.isolatieNiveau}
                    onChange={(val) => store.setIsolatieNiveau(val as IsolatieNiveau)}
                    columns={3}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "zonnepanelen") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Zonnepanelen</p>
                  <Slider
                    label="Aantal"
                    value={store.zonnepanelen}
                    onChange={store.setZonnepanelen}
                    min={0}
                    max={20}
                    step={2}
                    unit="panelen"
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "vloerverwarming") && (
                <div>
                  <Toggle
                    label="Vloerverwarming"
                    description="Gelijkmatige warmte (+€3.000 – €5.000)"
                    checked={store.vloerverwarming}
                    onChange={store.setVloerverwarming}
                  />
                </div>
              )}
            </div>
          </AccordionSection>
        )}

        {/* ── Interieur ── */}
        {hasInterieur && (
          <AccordionSection
            icon={Paintbrush}
            title="Interieur & afwerking"
            preview={intPreview}
            isOpen={openSection === "interieur"}
            onToggle={() => toggleSection("interieur")}
          >
            <div className="space-y-5">
              {!isOptieDisabled(slug, "keuken") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Keuken</p>
                  <RadioCardGroup
                    options={keukenNiveauOpties}
                    value={store.keukenNiveau}
                    onChange={(val) => store.setKeukenNiveau(val as AfwerkingNiveau)}
                    columns={3}
                  />
                </div>
              )}
              {!isOptieDisabled(slug, "badkamer") && (
                <div>
                  <p className="text-body-sm font-semibold text-dark mb-2.5">Badkamer</p>
                  <RadioCardGroup
                    options={badkamerNiveauOpties}
                    value={store.badkamerNiveau}
                    onChange={(val) => store.setBadkamerNiveau(val as AfwerkingNiveau)}
                    columns={3}
                  />
                </div>
              )}
            </div>
          </AccordionSection>
        )}
      </div>
    </div>
  );
}
