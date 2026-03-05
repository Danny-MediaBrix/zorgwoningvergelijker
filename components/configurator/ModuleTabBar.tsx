"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, Minus, Home } from "lucide-react";
import { Module } from "@/lib/types";
import { formatM2 } from "@/lib/utils";

const STEP = 0.5;
const MIN_DIM = 3;
const MAX_DIM = 20;

interface ModuleTabBarProps {
  modules: Module[];
  activeModuleId: string;
  moduleLabel: string;
  maxModules: number;
  onSelectModule: (id: string) => void;
  onAddModule: () => void;
  onRemoveModule: (id: string) => void;
  onResizeModule: (breedte: number, diepte: number) => void;
}

export default function ModuleTabBar({
  modules,
  activeModuleId,
  moduleLabel,
  maxModules,
  onSelectModule,
  onAddModule,
  onRemoveModule,
  onResizeModule,
}: ModuleTabBarProps) {
  const canAdd = modules.length < maxModules;
  const canRemove = modules.length > 1;

  const activeModule = modules.find((m) => m.id === activeModuleId);

  const handleBreedteChange = (delta: number) => {
    if (!activeModule) return;
    const newB = Math.round((activeModule.buitenBreedte + delta) * 2) / 2;
    if (newB < MIN_DIM || newB > MAX_DIM) return;
    onResizeModule(newB, activeModule.buitenDiepte);
  };

  const handleDiepteChange = (delta: number) => {
    if (!activeModule) return;
    const newD = Math.round((activeModule.buitenDiepte + delta) * 2) / 2;
    if (newD < MIN_DIM || newD > MAX_DIM) return;
    onResizeModule(activeModule.buitenBreedte, newD);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Module selector — segmented control style */}
      <div className="flex gap-2 p-1.5 bg-[#F5F3EF] rounded-2xl overflow-x-auto">
        {modules.map((mod, idx) => {
          const isActive = mod.id === activeModuleId;
          const totalM2 = mod.kamers.reduce((sum, k) => sum + k.m2, 0);
          return (
            <motion.button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              layout
              className={`relative flex items-center gap-3 flex-1 min-w-0 rounded-xl px-4 py-3 text-left transition-all ${
                isActive
                  ? "bg-white shadow-card"
                  : "hover:bg-white/60"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white/80 text-gray-400"
                }`}
              >
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-body-sm font-semibold truncate ${isActive ? "text-dark" : "text-gray-600"}`}>
                    {mod.naam}
                  </span>
                  {canRemove && isActive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveModule(mod.id);
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                      aria-label={`Verwijder ${mod.naam}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-caption tabular-nums ${isActive ? "text-primary font-semibold" : "text-gray-400"}`}>
                    {formatM2(Math.round(totalM2 * 10) / 10)}
                  </span>
                  <span className={`text-caption tabular-nums ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                    {mod.buitenBreedte} × {mod.buitenDiepte} m
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Add module button */}
        {canAdd && (
          <button
            type="button"
            onClick={onAddModule}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-400 hover:text-primary hover:bg-white/60 transition-all flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-lg border-2 border-dashed border-current flex items-center justify-center flex-shrink-0 opacity-60">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-caption font-medium whitespace-nowrap">{moduleLabel} toevoegen</span>
          </button>
        )}
      </div>

      {/* Per-module dimension controls */}
      {activeModule && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
          <p className="text-body-sm font-semibold text-gray-700 mb-4">
            Afmetingen {activeModule.naam.toLowerCase()}
          </p>
          <div className="grid grid-cols-2 gap-5">
            {/* Breedte */}
            <div>
              <span className="text-body-sm text-gray-600 block mb-2">Breedte</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleBreedteChange(-STEP)}
                  disabled={activeModule.buitenBreedte <= MIN_DIM}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Breedte verminderen"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-body font-semibold text-dark min-w-[3.5rem] text-center tabular-nums">
                  {activeModule.buitenBreedte} m
                </span>
                <button
                  type="button"
                  onClick={() => handleBreedteChange(STEP)}
                  disabled={activeModule.buitenBreedte >= MAX_DIM}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Breedte vergroten"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Diepte */}
            <div>
              <span className="text-body-sm text-gray-600 block mb-2">Diepte</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDiepteChange(-STEP)}
                  disabled={activeModule.buitenDiepte <= MIN_DIM}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Diepte verminderen"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-body font-semibold text-dark min-w-[3.5rem] text-center tabular-nums">
                  {activeModule.buitenDiepte} m
                </span>
                <button
                  type="button"
                  onClick={() => handleDiepteChange(STEP)}
                  disabled={activeModule.buitenDiepte >= MAX_DIM}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Diepte vergroten"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-body-sm text-gray-600">Totaal oppervlak</span>
            <span className="text-body-sm font-bold text-primary tabular-nums">
              {formatM2(Math.round(activeModule.buitenBreedte * activeModule.buitenDiepte * 10) / 10)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
