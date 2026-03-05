"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";
import {
  Sofa, Bed, CookingPot, Droplets, Package, Monitor,
  WashingMachine, Sun, DoorOpen,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { KAMER_LABELS, KAMER_BORDER_KLEUREN, KAMER_KLEUREN, KamerType } from "@/lib/types";
import { formatM2 } from "@/lib/utils";

const STEP = 0.5;
const MIN_DIM = 1;
const MAX_DIM = 20;

const KAMER_ICONS: Record<KamerType, React.ElementType> = {
  woonkamer: Sofa,
  slaapkamer: Bed,
  keuken: CookingPot,
  badkamer: Droplets,
  berging: Package,
  werkruimte: Monitor,
  wasruimte: WashingMachine,
  terras: Sun,
  hal: DoorOpen,
};

export default function FloorplanMobile() {
  const {
    kamers,
    modules,
    activeModuleId,
    woningType,
    removeKamer,
    updateKamer,
    getTotaalKamerM2,
  } = useConfiguratorStore();

  const wt = woningType ? getWoningType(woningType) : null;
  const isMultiModule = wt?.supportsModules && modules.length > 1;
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((m) => { initial[m.id] = m.id === activeModuleId; });
    return initial;
  });

  const totaalKamerM2 = getTotaalKamerM2();

  const handleBreedteChange = (id: string, currentBreedte: number, currentDiepte: number, delta: number) => {
    const newBreedte = Math.round((currentBreedte + delta) * 2) / 2;
    if (newBreedte < MIN_DIM || newBreedte > MAX_DIM) return;
    const newM2 = Math.round(newBreedte * currentDiepte * 10) / 10;
    updateKamer(id, { breedte: newBreedte, m2: newM2 });
  };

  const handleDiepteChange = (id: string, currentBreedte: number, currentDiepte: number, delta: number) => {
    const newDiepte = Math.round((currentDiepte + delta) * 2) / 2;
    if (newDiepte < MIN_DIM || newDiepte > MAX_DIM) return;
    const newM2 = Math.round(currentBreedte * newDiepte * 10) / 10;
    updateKamer(id, { diepte: newDiepte, m2: newM2 });
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Empty state
  if (kamers.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <LayoutGrid className="w-7 h-7 text-primary" />
        </div>
        <p className="text-body font-semibold text-dark mb-1">Nog geen kamers</p>
        <p className="text-body-sm text-gray-600 max-w-[260px] mx-auto">
          Voeg kamers toe via de knoppen hierboven om je plattegrond samen te stellen.
        </p>
      </div>
    );
  }

  const renderKamerCard = (kamer: typeof kamers[0]) => {
    const Icon = KAMER_ICONS[kamer.type];
    const borderColor = KAMER_BORDER_KLEUREN[kamer.type];
    const fillColor = KAMER_KLEUREN[kamer.type];

    return (
      <motion.div
        key={kamer.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-gray-200/80 overflow-hidden"
      >
        {/* Colored header bar */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: fillColor }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              <Icon className="w-5 h-5" style={{ color: borderColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-body-sm font-semibold text-dark truncate">
                {kamer.naam}
              </p>
              <p className="text-caption text-gray-600">
                {KAMER_LABELS[kamer.type]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-body-sm font-bold text-primary tabular-nums">
              {formatM2(kamer.m2)}
            </span>
            {/* Delete button */}
            <button
              type="button"
              onClick={() => removeKamer(kamer.id)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label={`Verwijder ${kamer.naam}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-3">
          {/* Width control */}
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-gray-600 w-16">Breedte</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBreedteChange(kamer.id, kamer.breedte, kamer.diepte, -STEP)}
                disabled={kamer.breedte <= MIN_DIM}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200/80 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Breedte verminderen"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-body-sm font-semibold text-gray-700 w-14 text-center tabular-nums">
                {kamer.breedte} m
              </span>
              <button
                type="button"
                onClick={() => handleBreedteChange(kamer.id, kamer.breedte, kamer.diepte, STEP)}
                disabled={kamer.breedte >= MAX_DIM}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200/80 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Breedte vergroten"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Depth control */}
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-gray-600 w-16">Diepte</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDiepteChange(kamer.id, kamer.breedte, kamer.diepte, -STEP)}
                disabled={kamer.diepte <= MIN_DIM}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200/80 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Diepte verminderen"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-body-sm font-semibold text-gray-700 w-14 text-center tabular-nums">
                {kamer.diepte} m
              </span>
              <button
                type="button"
                onClick={() => handleDiepteChange(kamer.id, kamer.breedte, kamer.diepte, STEP)}
                disabled={kamer.diepte >= MAX_DIM}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200/80 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Diepte vergroten"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Multi-module: accordion per module
  if (isMultiModule) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100">
          <span className="text-body-sm text-gray-600">Totaal kameroppervlak</span>
          <span className="text-body-sm font-semibold text-dark tabular-nums">{formatM2(Math.round(totaalKamerM2 * 10) / 10)}</span>
        </div>

        {modules.map((mod, idx) => {
          const isExpanded = expandedModules[mod.id] !== false;
          const modM2 = mod.kamers.reduce((sum, k) => sum + k.m2, 0);
          return (
            <div key={mod.id}>
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <span className="text-body-sm font-bold text-primary">{idx + 1}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-body-sm font-semibold text-dark block">{mod.naam}</span>
                    <span className="text-caption text-gray-600">
                      {mod.kamers.length} {mod.kamers.length === 1 ? "kamer" : "kamers"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-body-sm font-medium text-primary tabular-nums">{formatM2(Math.round(modM2 * 10) / 10)}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              {isExpanded && (
                <div className="space-y-2 mt-2">
                  <AnimatePresence mode="popLayout">
                    {mod.kamers.map((kamer) => renderKamerCard(kamer))}
                  </AnimatePresence>
                  {mod.kamers.length === 0 && (
                    <p className="text-body-sm text-gray-400 text-center py-6">
                      Geen kamers in deze {(wt?.moduleLabel || "module").toLowerCase()}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Single-module: flat list
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100">
        <span className="text-body-sm text-gray-600">Totaal kameroppervlak</span>
        <span className="text-body-sm font-semibold text-dark tabular-nums">{formatM2(Math.round(totaalKamerM2 * 10) / 10)}</span>
      </div>
      <AnimatePresence mode="popLayout">
        {kamers.map((kamer) => renderKamerCard(kamer))}
      </AnimatePresence>
    </div>
  );
}
