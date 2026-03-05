"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, LayoutGrid, Maximize2, AlertTriangle, X, ArrowDown } from "lucide-react";
import {
  Sofa, Bed, CookingPot, Droplets, Package, Monitor,
  WashingMachine, Sun, DoorOpen,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { KamerType, KAMER_LABELS, KAMER_KLEUREN, KAMER_BORDER_KLEUREN } from "@/lib/types";
import { formatM2 } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import FloorplanMobile from "./FloorplanMobile";
import ModuleTabBar from "./ModuleTabBar";

const FloorplanCanvas = dynamic(() => import("./FloorplanCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-body-sm text-gray-600">Plattegrond laden...</p>
      </div>
    </div>
  ),
});

const KAMER_TYPE_OPTIONS: { type: KamerType; icon: React.ElementType; defaultM2: number }[] = [
  { type: "woonkamer", icon: Sofa, defaultM2: 18 },
  { type: "slaapkamer", icon: Bed, defaultM2: 12 },
  { type: "keuken", icon: CookingPot, defaultM2: 8 },
  { type: "badkamer", icon: Droplets, defaultM2: 5 },
  { type: "berging", icon: Package, defaultM2: 4 },
  { type: "werkruimte", icon: Monitor, defaultM2: 10 },
  { type: "wasruimte", icon: WashingMachine, defaultM2: 4 },
  { type: "terras", icon: Sun, defaultM2: 8 },
  { type: "hal", icon: DoorOpen, defaultM2: 4 },
];

export default function StepPlattegrond() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [justAdded, setJustAdded] = useState<KamerType | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);

  const {
    woningType,
    kamers,
    totaalM2,
    modules,
    activeModuleId,
    addKamer,
    loadPreset,
    getTotaalKamerM2,
    setActiveModule,
    addModule,
    removeModule,
    setBuitenAfmetingen,
  } = useConfiguratorStore();

  const wt = woningType ? getWoningType(woningType) : null;
  const isMultiModule = wt?.supportsModules && modules.length > 1;

  const totaalKamerM2 = getTotaalKamerM2();
  const beschikbaarM2 = totaalM2 - totaalKamerM2;
  const percentage = Math.min(100, (totaalKamerM2 / totaalM2) * 100);

  if (!wt) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-gray-600">
          Ga terug en selecteer eerst een woningtype.
        </p>
      </div>
    );
  }

  const handleAddKamer = useCallback((type: KamerType) => {
    addKamer(type);
    setJustAdded(type);
    setTimeout(() => setJustAdded(null), 800);
  }, [addKamer]);

  const handleResetPreset = () => {
    if (woningType) {
      loadPreset(woningType, true);
      setShowResetModal(false);
    }
  };

  // Status message for m² bar
  const getStatusMessage = () => {
    if (beschikbaarM2 < 0) {
      return {
        text: `${Math.abs(beschikbaarM2).toFixed(0)} m² over budget`,
        className: "text-accent font-semibold",
      };
    }
    if (beschikbaarM2 === 0) {
      return {
        text: "Precies passend!",
        className: "text-green-600 font-semibold",
      };
    }
    return null;
  };

  const statusMessage = getStatusMessage();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-heading text-heading-1 text-dark tracking-tight">
            Je plattegrond samenstellen
          </h1>
        </div>
        <p className="text-body-lg text-gray-600 max-w-xl">
          Sleep kamers naar de gewenste plek en pas de afmetingen aan.
          Net als het inrichten van je eigen huis.
        </p>
      </div>

      {/* Module Tab Bar (multi-module only) */}
      {wt.supportsModules && (
        <ModuleTabBar
          modules={modules}
          activeModuleId={activeModuleId || modules[0]?.id || ""}
          moduleLabel={wt.moduleLabel || "Module"}
          maxModules={wt.maxModules || 4}
          onSelectModule={setActiveModule}
          onAddModule={addModule}
          onRemoveModule={removeModule}
          onResizeModule={setBuitenAfmetingen}
        />
      )}

      {/* Two-zone layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="w-full md:w-[280px] md:flex-shrink-0 md:sticky md:top-28 md:self-start space-y-5">
          {/* M² Progress Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-body-sm font-medium text-gray-600">
                  Ruimtegebruik
                  {isMultiModule && (
                    <span className="text-gray-400 ml-1 text-caption">(totaal)</span>
                  )}
                </span>
              </div>
              <span className="font-heading font-bold text-dark tabular-nums">
                {formatM2(Math.round(totaalKamerM2 * 10) / 10)} / {formatM2(totaalM2)}
              </span>
            </div>

            {/* Segmented bar */}
            <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex">
              {kamers.map((kamer) => {
                const widthPct = (kamer.m2 / totaalM2) * 100;
                return (
                  <div
                    key={kamer.id}
                    className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                    style={{
                      width: `${Math.max(widthPct, 0.5)}%`,
                      backgroundColor: KAMER_BORDER_KLEUREN[kamer.type],
                    }}
                    title={`${kamer.naam}: ${formatM2(kamer.m2)}`}
                  />
                );
              })}
              {beschikbaarM2 > 0 && (
                <div
                  className="h-full border border-dashed border-gray-300 rounded-r-full flex items-center justify-center"
                  style={{ width: `${(beschikbaarM2 / totaalM2) * 100}%` }}
                >
                  {beschikbaarM2 / totaalM2 > 0.15 && (
                    <span className="text-[9px] text-gray-400 font-medium">vrij</span>
                  )}
                </div>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-caption text-gray-600">
                {kamers.length} {kamers.length === 1 ? "kamer" : "kamers"}
                {isMultiModule && ` in ${modules.length} ${(wt.moduleLabel || "module").toLowerCase()}s`}
              </span>
              {statusMessage ? (
                <span className={`text-caption ${statusMessage.className}`}>
                  {statusMessage.text}
                </span>
              ) : (
                <span className={`text-caption font-medium ${beschikbaarM2 < 0 ? "text-accent" : "text-gray-600"}`}>
                  {beschikbaarM2 >= 0
                    ? `${beschikbaarM2.toFixed(0)} m² beschikbaar`
                    : `${Math.abs(beschikbaarM2).toFixed(0)} m² te veel`}
                </span>
              )}
            </div>

            {/* Color legend chips */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
              {kamers.map((kamer) => (
                <div
                  key={kamer.id}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-50"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: KAMER_BORDER_KLEUREN[kamer.type] }}
                  />
                  <span className="text-[10px] text-gray-600 leading-tight">{kamer.naam}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip: voeg kamers toe */}
          <AnimatePresence>
            {showTooltip && kamers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative bg-primary text-white rounded-2xl px-4 py-3 shadow-card"
              >
                <div className="flex items-start gap-3">
                  <ArrowDown className="w-5 h-5 flex-shrink-0 mt-0.5 animate-bounce" />
                  <p className="text-body-sm font-medium leading-snug">
                    Voeg hieronder kamers toe aan je plattegrond
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowTooltip(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
                    aria-label="Sluiten"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-primary rotate-45 rounded-sm" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kamer Picker */}
          <div>
            <p className="text-body-sm font-semibold text-gray-700 mb-2.5">Kamer toevoegen</p>
            <div className="grid grid-cols-2 gap-2.5">
              {KAMER_TYPE_OPTIONS.map(({ type, icon: Icon, defaultM2 }) => (
                <motion.button
                  key={type}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAddKamer(type)}
                  className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border-2 bg-white text-center transition-all group ${
                    justAdded === type
                      ? "border-primary/30 ring-2 ring-primary/20"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-card"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: KAMER_KLEUREN[type] }}
                  >
                    <Icon className="w-5 h-5" style={{ color: KAMER_BORDER_KLEUREN[type] }} />
                  </div>
                  <span className="text-body-sm font-semibold text-gray-700">{KAMER_LABELS[type]}</span>
                  <span className="text-caption text-gray-600">{defaultM2} m²</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => setShowResetModal(true)}
            className="w-full"
          >
            Reset naar preset
          </Button>
        </div>

        {/* Right — canvas / mobile */}
        <div className="flex-1 min-w-0">
          {/* Desktop: Canvas floor plan */}
          <div className="hidden md:block">
            <FloorplanCanvas />

            {/* Module thumbnails (if multi-module, show other modules) */}
            {isMultiModule && modules.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {modules
                  .filter((m) => m.id !== activeModuleId)
                  .map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveModule(mod.id)}
                      className="flex-shrink-0 rounded-2xl border border-gray-200/80 hover:border-primary/30 hover:shadow-card transition-all overflow-hidden bg-white"
                    >
                      <div className="p-2 bg-[#FAF9F6]">
                        <FloorplanCanvas moduleId={mod.id} readOnly compact />
                      </div>
                      <div className="px-3 py-2 text-center">
                        <p className="text-body-sm font-medium text-gray-700">{mod.naam}</p>
                        <p className="text-caption text-gray-600">
                          {formatM2(Math.round(mod.kamers.reduce((s, k) => s + k.m2, 0) * 10) / 10)}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Mobile: Room list */}
          <div className="md:hidden">
            <FloorplanMobile />
          </div>
        </div>
      </div>

      {/* Reset confirmation modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Indeling resetten?"
        size="sm"
      >
        <div className="py-2">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <p className="text-body-sm text-gray-600">
              Hiermee worden alle kamers en afmetingen teruggezet naar de standaardindeling
              van de {wt.naam.toLowerCase()}. Je aanpassingen gaan verloren.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setShowResetModal(false)}>
              Annuleren
            </Button>
            <Button variant="primary" size="sm" onClick={handleResetPreset}>
              Reset indeling
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
