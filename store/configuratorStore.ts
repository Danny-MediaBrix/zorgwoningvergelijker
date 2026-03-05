import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Kamer,
  KamerType,
  Module,
  DakType,
  GevelType,
  KozijnType,
  GlasType,
  FunderingType,
  VerwarmingType,
  IsolatieNiveau,
  AfwerkingNiveau,
  PrijsRange,
  KAMER_KLEUREN,
} from "@/lib/types";
import { getWoningType } from "@/lib/woningtypen";
import { berekenPrijsRange } from "@/lib/pricing";
import { generateId } from "@/lib/utils";

interface ConfiguratorStore {
  // Navigation
  currentStep: number;
  maxVisitedStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Step 1: Woningtype
  woningType: string | null;
  setWoningType: (slug: string) => void;

  // Step 2: Basiskenmerken
  totaalM2: number;
  setTotaalM2: (m2: number) => void;
  aantalVerdiepingen: number;
  setAantalVerdiepingen: (n: number) => void;

  // Step 3: Kamers + Modules
  kamers: Kamer[];
  setKamers: (kamers: Kamer[]) => void;
  addKamer: (type: KamerType) => void;
  removeKamer: (id: string) => void;
  updateKamer: (id: string, updates: Partial<Kamer>) => void;
  buitenBreedte: number;
  buitenDiepte: number;
  setBuitenAfmetingen: (b: number, d: number) => void;

  // Multi-module
  modules: Module[];
  activeModuleId: string | null;
  addModule: (naam?: string) => void;
  removeModule: (id: string) => void;
  setActiveModule: (id: string) => void;
  getActiveModule: () => Module | null;

  // Step 4: Exterieur
  dakType: DakType | null;
  setDakType: (type: DakType) => void;
  gevelType: GevelType | null;
  setGevelType: (type: GevelType) => void;
  kozijnType: KozijnType | null;
  setKozijnType: (type: KozijnType) => void;
  glasType: GlasType;
  setGlasType: (type: GlasType) => void;
  funderingType: FunderingType | null;
  setFunderingType: (type: FunderingType) => void;

  // Step 5: Installaties
  verwarmingType: VerwarmingType | null;
  setVerwarmingType: (type: VerwarmingType) => void;
  isolatieNiveau: IsolatieNiveau;
  setIsolatieNiveau: (niveau: IsolatieNiveau) => void;
  zonnepanelen: number;
  setZonnepanelen: (n: number) => void;
  vloerverwarming: boolean;
  setVloerverwarming: (v: boolean) => void;

  // Step 6: Interieur
  keukenNiveau: AfwerkingNiveau;
  setKeukenNiveau: (niveau: AfwerkingNiveau) => void;
  badkamerNiveau: AfwerkingNiveau;
  setBadkamerNiveau: (niveau: AfwerkingNiveau) => void;

  // Aanbieder doorverwijzing
  voorgeselecteerdeAanbieder: string | null;
  setVoorgeselecteerdeAanbieder: (slug: string | null) => void;

  // Computed
  getPrijsRange: () => PrijsRange;
  getTotaalKamerM2: () => number;
  canProceed: () => boolean;

  // Actions
  reset: () => void;
  loadPreset: (woningTypeSlug: string, withKamers?: boolean) => void;

  // Undo
  undoStack: Array<{ kamers: Kamer[]; modules: Module[] }>;
  pushUndo: () => void;
  undo: () => void;
}

const KAMER_DEFAULTS: Record<KamerType, { naam: string; m2: number }> = {
  woonkamer: { naam: "Woonkamer", m2: 18 },
  slaapkamer: { naam: "Slaapkamer", m2: 12 },
  keuken: { naam: "Keuken", m2: 8 },
  badkamer: { naam: "Badkamer", m2: 5 },
  berging: { naam: "Berging", m2: 4 },
  werkruimte: { naam: "Werkruimte", m2: 10 },
  wasruimte: { naam: "Wasruimte", m2: 4 },
  terras: { naam: "Terras", m2: 8 },
  hal: { naam: "Hal", m2: 4 },
};

function createKamer(type: KamerType, m2?: number, naam?: string): Kamer {
  const defaults = KAMER_DEFAULTS[type];
  const kamerM2 = m2 || defaults.m2;
  const breedte = Math.round(Math.sqrt(kamerM2 * 1.2) * 2) / 2;
  const diepte = Math.round((kamerM2 / breedte) * 2) / 2;
  return {
    id: generateId(),
    type,
    naam: naam || defaults.naam,
    m2: kamerM2,
    breedte,
    diepte,
    x: 0,
    y: 0,
    kleur: KAMER_KLEUREN[type],
  };
}

function berekenbuitenAfmetingen(m2: number): { breedte: number; diepte: number } {
  const breedte = Math.round(Math.sqrt(m2 * 1.5) * 2) / 2;
  const diepte = Math.round((m2 / breedte) * 2) / 2;
  return { breedte, diepte };
}

function layoutKamers(kamers: Kamer[], maxWidthM: number): void {
  const SCALE = 40;
  const maxWidth = maxWidthM * SCALE;
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  kamers.forEach((kamer) => {
    const w = kamer.breedte * SCALE;
    const h = kamer.diepte * SCALE;
    if (x + w > maxWidth && x > 0) {
      x = 0;
      y += rowHeight;
      rowHeight = 0;
    }
    kamer.x = x;
    kamer.y = y;
    x += w;
    rowHeight = Math.max(rowHeight, h);
  });
}

/** After layout, compute the bounding box so we can size the outer walls to fit exactly */
function getLayoutBoundingBox(kamers: Kamer[]): { breedte: number; diepte: number } {
  const SCALE = 40;
  let maxX = 0;
  let maxY = 0;
  kamers.forEach((k) => {
    maxX = Math.max(maxX, k.x + k.breedte * SCALE);
    maxY = Math.max(maxY, k.y + k.diepte * SCALE);
  });
  // Convert back to meters and round up to 0.5m
  return {
    breedte: Math.ceil((maxX / SCALE) * 2) / 2,
    diepte: Math.ceil((maxY / SCALE) * 2) / 2,
  };
}

function syncKamersFromModules(modules: Module[]): Kamer[] {
  return modules.flatMap((m) => m.kamers);
}

/** Try to find a non-overlapping position within the walls. Returns true if found. */
function findOpenPosition(
  newKamer: Kamer,
  existingKamers: Kamer[],
  outerBreedte: number,
  outerDiepte: number,
): boolean {
  const SCALE = 40;
  const roomW = newKamer.breedte * SCALE;
  const roomH = newKamer.diepte * SCALE;
  const maxX = outerBreedte * SCALE;
  const maxY = outerDiepte * SCALE;
  const step = SCALE * 0.5;
  for (let y = 0; y <= maxY - roomH; y += step) {
    for (let x = 0; x <= maxX - roomW; x += step) {
      const overlaps = existingKamers.some((other) => {
        const ow = other.breedte * SCALE;
        const oh = other.diepte * SCALE;
        return x < other.x + ow && x + roomW > other.x && y < other.y + oh && y + roomH > other.y;
      });
      if (!overlaps) {
        newKamer.x = x;
        newKamer.y = y;
        return true;
      }
    }
  }
  return false;
}

function takeUndoSnapshot(s: { kamers: Kamer[]; modules: Module[] }) {
  return {
    kamers: s.kamers.map(k => ({ ...k })),
    modules: s.modules.map(m => ({ ...m, kamers: m.kamers.map(k => ({ ...k })) })),
  };
}

const initialState = {
  currentStep: 1,
  maxVisitedStep: 1,
  woningType: null as string | null,
  totaalM2: 50,
  aantalVerdiepingen: 1,
  kamers: [] as Kamer[],
  buitenBreedte: 8,
  buitenDiepte: 6.5,
  modules: [] as Module[],
  activeModuleId: null as string | null,
  dakType: null as DakType | null,
  gevelType: null as GevelType | null,
  kozijnType: null as KozijnType | null,
  glasType: "dubbel" as GlasType,
  funderingType: null as FunderingType | null,
  verwarmingType: null as VerwarmingType | null,
  isolatieNiveau: "standaard" as IsolatieNiveau,
  zonnepanelen: 0,
  vloerverwarming: false,
  keukenNiveau: "basis" as AfwerkingNiveau,
  badkamerNiveau: "basis" as AfwerkingNiveau,
  voorgeselecteerdeAanbieder: null as string | null,
  undoStack: [] as Array<{ kamers: Kamer[]; modules: Module[] }>,
};

export const useConfiguratorStore = create<ConfiguratorStore>()(
  persist(
    (set, get) => ({
  ...initialState,

  // Navigation
  setStep: (step) =>
    set((s) => ({
      currentStep: step,
      maxVisitedStep: Math.max(s.maxVisitedStep, step),
    })),
  nextStep: () =>
    set((s) => ({
      currentStep: s.currentStep + 1,
      maxVisitedStep: Math.max(s.maxVisitedStep, s.currentStep + 1),
    })),
  prevStep: () =>
    set((s) => ({
      currentStep: Math.max(1, s.currentStep - 1),
    })),

  // Step 1
  setWoningType: (slug) => {
    set({ woningType: slug });
    get().loadPreset(slug);
  },

  // Step 2
  setTotaalM2: (m2) => {
    const afmetingen = berekenbuitenAfmetingen(m2);
    set({
      totaalM2: m2,
      buitenBreedte: afmetingen.breedte,
      buitenDiepte: afmetingen.diepte,
    });
  },
  setAantalVerdiepingen: (n) => set({ aantalVerdiepingen: n }),

  // Step 3 — kamers operate on active module
  setKamers: (kamers) => set({ kamers }),
  addKamer: (type) =>
    set((s) => {
      const snapshot = takeUndoSnapshot(s);
      const undoStack = [...s.undoStack.slice(-49), snapshot];

      const newKamer = createKamer(type);
      const activeModule = s.modules.find((m) => m.id === s.activeModuleId);
      const existingKamers = activeModule ? activeModule.kamers : s.kamers;
      const breedte = activeModule ? activeModule.buitenBreedte : s.buitenBreedte;
      const diepte = activeModule ? activeModule.buitenDiepte : s.buitenDiepte;

      // Try to find open position; if not found, place at (0,0) — overlap is shown visually
      findOpenPosition(newKamer, existingKamers, breedte, diepte);

      if (activeModule) {
        const updatedModules = s.modules.map((m) =>
          m.id === s.activeModuleId
            ? { ...m, kamers: [...m.kamers, newKamer] }
            : m
        );
        return {
          modules: updatedModules,
          kamers: syncKamersFromModules(updatedModules),
          undoStack,
        };
      }
      return { kamers: [...s.kamers, newKamer], undoStack };
    }),
  removeKamer: (id) =>
    set((s) => {
      const snapshot = takeUndoSnapshot(s);
      const undoStack = [...s.undoStack.slice(-49), snapshot];
      const updatedModules = s.modules.map((m) => ({
        ...m,
        kamers: m.kamers.filter((k) => k.id !== id),
      }));
      return {
        modules: updatedModules,
        kamers: syncKamersFromModules(updatedModules),
        undoStack,
      };
    }),
  updateKamer: (id, updates) =>
    set((s) => {
      const updatedModules = s.modules.map((m) => ({
        ...m,
        kamers: m.kamers.map((k) => (k.id === id ? { ...k, ...updates } : k)),
      }));
      return {
        modules: updatedModules,
        kamers: syncKamersFromModules(updatedModules),
      };
    }),
  setBuitenAfmetingen: (b, d) => {
    const s = get();
    if (s.activeModuleId) {
      const updatedModules = s.modules.map((m) =>
        m.id === s.activeModuleId
          ? { ...m, buitenBreedte: b, buitenDiepte: d }
          : m
      );
      // Recalculate totaalM2 from all module areas so price stays in sync
      const totaalM2 = Math.round(
        updatedModules.reduce((sum, m) => sum + m.buitenBreedte * m.buitenDiepte, 0) * 10
      ) / 10;
      set({ modules: updatedModules, buitenBreedte: b, buitenDiepte: d, totaalM2 });
    } else {
      const totaalM2 = Math.round(b * d * 10) / 10;
      set({ buitenBreedte: b, buitenDiepte: d, totaalM2 });
    }
  },

  // Multi-module
  addModule: (naam) => {
    const s = get();
    const wt = s.woningType ? getWoningType(s.woningType) : null;
    const label = wt?.moduleLabel || "Module";
    const moduleNaam = naam || `${label} ${s.modules.length + 1}`;
    const afmetingen = berekenbuitenAfmetingen(s.totaalM2 / (s.modules.length + 1));
    const newModule: Module = {
      id: generateId(),
      naam: moduleNaam,
      kamers: [],
      buitenBreedte: afmetingen.breedte,
      buitenDiepte: afmetingen.diepte,
    };
    const updatedModules = [...s.modules, newModule];
    set({
      modules: updatedModules,
      activeModuleId: newModule.id,
      kamers: syncKamersFromModules(updatedModules),
    });
  },
  removeModule: (id) =>
    set((s) => {
      if (s.modules.length <= 1) return s;
      const updatedModules = s.modules.filter((m) => m.id !== id);
      const newActiveId =
        s.activeModuleId === id
          ? updatedModules[0]?.id || null
          : s.activeModuleId;
      const activeModule = updatedModules.find((m) => m.id === newActiveId);
      return {
        modules: updatedModules,
        activeModuleId: newActiveId,
        kamers: syncKamersFromModules(updatedModules),
        buitenBreedte: activeModule?.buitenBreedte || s.buitenBreedte,
        buitenDiepte: activeModule?.buitenDiepte || s.buitenDiepte,
      };
    }),
  setActiveModule: (id) => {
    const s = get();
    const mod = s.modules.find((m) => m.id === id);
    if (mod) {
      set({
        activeModuleId: id,
        buitenBreedte: mod.buitenBreedte,
        buitenDiepte: mod.buitenDiepte,
      });
    }
  },
  getActiveModule: () => {
    const s = get();
    return s.modules.find((m) => m.id === s.activeModuleId) || null;
  },

  // Step 4
  setDakType: (type) => set({ dakType: type }),
  setGevelType: (type) => set({ gevelType: type }),
  setKozijnType: (type) => set({ kozijnType: type }),
  setGlasType: (type) => set({ glasType: type }),
  setFunderingType: (type) => set({ funderingType: type }),

  // Step 5
  setVerwarmingType: (type) => set({ verwarmingType: type }),
  setIsolatieNiveau: (niveau) => set({ isolatieNiveau: niveau }),
  setZonnepanelen: (n) => set({ zonnepanelen: n }),
  setVloerverwarming: (v) => set({ vloerverwarming: v }),

  // Step 6
  setKeukenNiveau: (niveau) => set({ keukenNiveau: niveau }),
  setBadkamerNiveau: (niveau) => set({ badkamerNiveau: niveau }),

  // Aanbieder doorverwijzing
  setVoorgeselecteerdeAanbieder: (slug) => set({ voorgeselecteerdeAanbieder: slug }),

  // Computed
  getPrijsRange: () => {
    const s = get();
    return berekenPrijsRange({
      woningType: s.woningType,
      totaalM2: s.totaalM2,
      aantalVerdiepingen: s.aantalVerdiepingen,
      kamers: s.kamers,
      buitenBreedte: s.buitenBreedte,
      buitenDiepte: s.buitenDiepte,
      dakType: s.dakType,
      gevelType: s.gevelType,
      kozijnType: s.kozijnType,
      glasType: s.glasType,
      funderingType: s.funderingType,
      verwarmingType: s.verwarmingType,
      isolatieNiveau: s.isolatieNiveau,
      zonnepanelen: s.zonnepanelen,
      vloerverwarming: s.vloerverwarming,
      keukenNiveau: s.keukenNiveau,
      badkamerNiveau: s.badkamerNiveau,
    });
  },

  getTotaalKamerM2: () => {
    return get().kamers.reduce((sum, k) => sum + k.m2, 0);
  },

  canProceed: () => {
    const s = get();
    switch (s.currentStep) {
      case 1:
        return s.woningType !== null;
      case 2:
        return s.totaalM2 > 0;
      case 3:
      case 4:
      case 5:
      case 6:
        return true;
      case 7:
        return true;
      default:
        return false;
    }
  },

  // Undo
  pushUndo: () => {
    const s = get();
    set({
      undoStack: [...s.undoStack.slice(-49), takeUndoSnapshot(s)],
    });
  },

  undo: () => {
    const s = get();
    if (s.undoStack.length === 0) return;
    const prev = s.undoStack[s.undoStack.length - 1];
    const activeModule = prev.modules.find((m) => m.id === s.activeModuleId);
    set({
      kamers: prev.kamers,
      modules: prev.modules,
      undoStack: s.undoStack.slice(0, -1),
      ...(activeModule ? {
        buitenBreedte: activeModule.buitenBreedte,
        buitenDiepte: activeModule.buitenDiepte,
      } : {}),
    });
  },

  // Actions
  reset: () => set(initialState),

  loadPreset: (woningTypeSlug, withKamers = false) => {
    const wt = getWoningType(woningTypeSlug);
    if (!wt) return;

    const isMultiModule = wt.supportsModules && wt.presetModules && wt.presetModules.length > 0;

    // Reset disabled opties to defaults
    const d = wt.disabledOpties || {};
    const disabledResets = {
      dakType: d.dak ? null : get().dakType,
      gevelType: d.gevel ? null : get().gevelType,
      kozijnType: d.kozijnen ? null : get().kozijnType,
      glasType: d.glas ? ("dubbel" as GlasType) : get().glasType,
      funderingType: d.fundering ? null : get().funderingType,
      verwarmingType: d.verwarming ? null : get().verwarmingType,
      isolatieNiveau: d.isolatie ? ("standaard" as IsolatieNiveau) : get().isolatieNiveau,
      zonnepanelen: d.zonnepanelen ? 0 : get().zonnepanelen,
      vloerverwarming: d.vloerverwarming ? false : get().vloerverwarming,
      keukenNiveau: d.keuken ? ("basis" as AfwerkingNiveau) : get().keukenNiveau,
      badkamerNiveau: d.badkamer ? ("basis" as AfwerkingNiveau) : get().badkamerNiveau,
    };

    if (isMultiModule) {
      const modules: Module[] = wt.presetModules!.map((pm, idx) => {
        const presetKamers = withKamers
          ? pm.kamers.map((pk) => createKamer(pk.type, pk.defaultM2, pk.naam))
          : [];
        const initialAfm = pm.defaultBreedte && pm.defaultDiepte
          ? { breedte: pm.defaultBreedte, diepte: pm.defaultDiepte }
          : berekenbuitenAfmetingen(
              withKamers
                ? presetKamers.reduce((sum, k) => sum + k.m2, 0)
                : (wt.defaultM2 / (wt.presetModules?.length || 1))
            );
        if (withKamers && presetKamers.length > 0) {
          layoutKamers(presetKamers, initialAfm.breedte);
          const bbox = getLayoutBoundingBox(presetKamers);
          return {
            id: generateId(),
            naam: pm.naam || `${wt.moduleLabel || "Module"} ${idx + 1}`,
            kamers: presetKamers,
            buitenBreedte: Math.max(initialAfm.breedte, bbox.breedte),
            buitenDiepte: Math.max(initialAfm.diepte, bbox.diepte),
          };
        }
        return {
          id: generateId(),
          naam: pm.naam || `${wt.moduleLabel || "Module"} ${idx + 1}`,
          kamers: [],
          buitenBreedte: initialAfm.breedte,
          buitenDiepte: initialAfm.diepte,
        };
      });

      const firstModule = modules[0];
      const totaalM2 = Math.round(
        modules.reduce((sum, m) => sum + m.buitenBreedte * m.buitenDiepte, 0) * 10
      ) / 10;
      set({
        totaalM2,
        aantalVerdiepingen: wt.defaultVerdiepingen,
        modules,
        activeModuleId: firstModule.id,
        kamers: syncKamersFromModules(modules),
        buitenBreedte: firstModule.buitenBreedte,
        buitenDiepte: firstModule.buitenDiepte,
        ...disabledResets,
      });
    } else {
      const afmetingen = berekenbuitenAfmetingen(wt.defaultM2);
      let finalBreedte = afmetingen.breedte;
      let finalDiepte = afmetingen.diepte;
      let kamers: Kamer[] = [];

      if (withKamers) {
        kamers = wt.presetKamers.map((pk) => createKamer(pk.type, pk.defaultM2, pk.naam));
        layoutKamers(kamers, afmetingen.breedte);
        const bbox = getLayoutBoundingBox(kamers);
        finalBreedte = Math.max(afmetingen.breedte, bbox.breedte);
        finalDiepte = Math.max(afmetingen.diepte, bbox.diepte);
      }

      const totaalM2 = Math.round(finalBreedte * finalDiepte * 10) / 10;
      const moduleId = generateId();
      const singleModule: Module = {
        id: moduleId,
        naam: "Hoofdwoning",
        kamers,
        buitenBreedte: finalBreedte,
        buitenDiepte: finalDiepte,
      };

      set({
        totaalM2,
        aantalVerdiepingen: wt.defaultVerdiepingen,
        modules: [singleModule],
        activeModuleId: moduleId,
        kamers,
        buitenBreedte: finalBreedte,
        buitenDiepte: finalDiepte,
        ...disabledResets,
      });
    }
  },
    }),
    {
      name: "zwv-configurator",
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Record<string, unknown>;
        if (version < 2) {
          // Migrate: wrap existing kamers in a single module
          const kamers = (state.kamers as Kamer[]) || [];
          const moduleId = generateId();
          state.modules = [{
            id: moduleId,
            naam: "Hoofdwoning",
            kamers,
            buitenBreedte: (state.buitenBreedte as number) || 8,
            buitenDiepte: (state.buitenDiepte as number) || 6.5,
          }];
          state.activeModuleId = moduleId;
        }
        return state as unknown as ConfiguratorStore;
      },
      partialize: (state) => ({
        currentStep: state.currentStep,
        maxVisitedStep: state.maxVisitedStep,
        woningType: state.woningType,
        totaalM2: state.totaalM2,
        aantalVerdiepingen: state.aantalVerdiepingen,
        kamers: state.kamers,
        buitenBreedte: state.buitenBreedte,
        buitenDiepte: state.buitenDiepte,
        modules: state.modules,
        activeModuleId: state.activeModuleId,
        dakType: state.dakType,
        gevelType: state.gevelType,
        kozijnType: state.kozijnType,
        glasType: state.glasType,
        funderingType: state.funderingType,
        verwarmingType: state.verwarmingType,
        isolatieNiveau: state.isolatieNiveau,
        zonnepanelen: state.zonnepanelen,
        vloerverwarming: state.vloerverwarming,
        keukenNiveau: state.keukenNiveau,
        badkamerNiveau: state.badkamerNiveau,
        voorgeselecteerdeAanbieder: state.voorgeselecteerdeAanbieder,
      }),
    }
  )
);
