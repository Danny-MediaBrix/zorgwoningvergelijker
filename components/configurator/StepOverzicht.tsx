"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Send,
  Shield,
  Clock,
  Gift,
  SquareStack,
  Hammer,
  Paintbrush,
  Flame,
  Pencil,
  CheckCircle,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { isOptieDisabled } from "@/lib/woningtypen";
import { formatM2 } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import FormTextarea from "@/components/ui/FormTextarea";
import FloorplanCanvas, { type FloorplanCanvasHandle } from "@/components/configurator/FloorplanCanvas";

// ==================== Label mappings ====================

const dakTypeLabels: Record<string, string> = {
  plat: "Plat dak",
  zadeldak: "Zadeldak",
  lessenaardak: "Lessenaardak",
  sedum: "Sedum / groen dak",
};

const gevelTypeLabels: Record<string, string> = {
  hout: "Hout",
  steen: "Steen",
  stucwerk: "Stucwerk",
  composiet: "Composiet",
  combinatie: "Combinatie",
};

const kozijnTypeLabels: Record<string, string> = {
  "kunststof-wit": "Kunststof wit",
  "kunststof-antraciet": "Kunststof antraciet",
  aluminium: "Aluminium",
  hout: "Hout",
};

const glasTypeLabels: Record<string, string> = {
  dubbel: "Dubbel glas",
  triple: "Triple glas",
};

const funderingTypeLabels: Record<string, string> = {
  betonplaat: "Betonplaat",
  paalfundering: "Paalfundering",
  "wielen-trailer": "Wielen / trailer",
  schroeffundering: "Schroeffundering",
};

const verwarmingTypeLabels: Record<string, string> = {
  "cv-gas": "CV-ketel (gas)",
  "warmtepomp-lucht": "Warmtepomp (lucht-water)",
  "warmtepomp-bodem": "Warmtepomp (bodem)",
  infrarood: "Infrarood",
};

const isolatieNiveauLabels: Record<string, string> = {
  standaard: "Standaard",
  hr: "HR (hoogwaardig)",
  passiefhuis: "Passiefhuis",
};

const afwerkingNiveauLabels: Record<string, string> = {
  basis: "Basis",
  midden: "Midden",
  luxe: "Luxe",
};

const oplevertermijnOpties = [
  { value: "minder-dan-3", label: "Minder dan 3 maanden" },
  { value: "3-6", label: "3 - 6 maanden" },
  { value: "6-12", label: "6 - 12 maanden" },
  { value: "meer-dan-12", label: "Meer dan 12 maanden" },
  { value: "onbekend", label: "Nog onbekend" },
];

const budgetOpties = [
  { value: "25000-50000", label: "25.000 - 50.000 euro" },
  { value: "50000-75000", label: "50.000 - 75.000 euro" },
  { value: "75000-100000", label: "75.000 - 100.000 euro" },
  { value: "100000-150000", label: "100.000 - 150.000 euro" },
  { value: "150000-plus", label: "150.000+ euro" },
];

// ==================== Helpers ====================

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  const isDefault = !value;
  return (
    <div className="flex justify-between items-baseline py-1.5 gap-4">
      <span className="text-body-sm text-gray-600 flex-shrink-0">{label}</span>
      <span
        className={`text-body-sm text-right ${
          isDefault
            ? "text-gray-600 italic"
            : "font-medium text-dark"
        }`}
      >
        {value || "Standaard"}
      </span>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  step,
  onEdit,
}: {
  icon: React.ReactNode;
  title: string;
  step: number;
  onEdit: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-body font-semibold text-dark">{title}</h3>
      </div>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="flex items-center gap-1 text-caption text-primary hover:text-primary-600 transition-colors px-2 py-1 rounded-lg hover:bg-primary-50/60"
      >
        <Pencil className="w-3 h-3" />
        Wijzig
      </button>
    </div>
  );
}

// ==================== Form types ====================

interface RefinementFormData {
  oplevertermijn: string;
  budget: string;
  heeftKavel: "ja" | "nee" | "onbekend";
  opmerkingen: string;
}

// ==================== Component ====================

export default function StepOverzicht() {
  const store = useConfiguratorStore();
  const router = useRouter();
  const prijsRange = store.getPrijsRange();
  const leadId = store.leadId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const canvasRef = useRef<FloorplanCanvasHandle>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RefinementFormData>({
    defaultValues: {
      oplevertermijn: "",
      budget: "",
      heeftKavel: "onbekend",
      opmerkingen: "",
    },
  });

  const heeftKavelValue = watch("heeftKavel");

  const handleEditStep = (step: number) => {
    store.setStep(step);
  };

  const onSubmit = async (data: RefinementFormData) => {
    if (!leadId) {
      setSubmitError("Geen lead gevonden. Probeer de configurator opnieuw te starten.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Capture plattegrond screenshot
      const plattegrondBase64 = canvasRef.current?.exportAsDataUrl() || null;

      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configuratie: {
            woningType: store.woningType,
            totaalM2: store.totaalM2,
            aantalVerdiepingen: store.aantalVerdiepingen,
            kamers: store.kamers,
            modules: store.modules,
            buitenBreedte: store.buitenBreedte,
            buitenDiepte: store.buitenDiepte,
            dakType: store.dakType,
            gevelType: store.gevelType,
            kozijnType: store.kozijnType,
            glasType: store.glasType,
            funderingType: store.funderingType,
            verwarmingType: store.verwarmingType,
            isolatieNiveau: store.isolatieNiveau,
            zonnepanelen: store.zonnepanelen,
            vloerverwarming: store.vloerverwarming,
            keukenNiveau: store.keukenNiveau,
            badkamerNiveau: store.badkamerNiveau,
          },
          contact: {
            oplevertermijn: data.oplevertermijn,
            budget: data.budget || "",
            heeftKavel: data.heeftKavel,
            opmerkingen: data.opmerkingen || "",
          },
          prijsIndicatie: prijsRange,
          plattegrondBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Er is iets misgegaan bij het versturen van je verfijning."
        );
      }

      router.push("/bedankt?type=offerte");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Er is iets misgegaan bij het versturen."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== Main render ====================

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-heading-1 text-dark mb-2 tracking-tight">
          Overzicht &amp; verstuur
        </h1>
        <p className="text-body-lg text-gray-600">
          Controleer je configuratie en verstuur je verfijning
        </p>
      </div>

      {/* Lead captured confirmation */}
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl mb-8">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-body-sm text-green-800">
          Je basisaanvraag is al verzonden. Hieronder kun je extra details toevoegen
          voor een nog nauwkeurigere offerte.
        </p>
      </div>

      {/* ===== ADDITIONAL DETAILS FORM ===== */}
      <Card padding="lg" className="mb-8 border-t-2 border-t-primary">
        <h2 className="font-heading text-heading-3 text-dark mb-1">
          Aanvullende gegevens
        </h2>
        <p className="text-body-sm text-gray-600 mb-5">
          Deze informatie helpt aanbieders een nauwkeurigere offerte te maken
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Dropdown
                label="Gewenste oplevertermijn"
                options={oplevertermijnOpties}
                placeholder="Selecteer een termijn"
                {...register("oplevertermijn")}
              />
              <Dropdown
                label="Budget (optioneel)"
                options={budgetOpties}
                placeholder="Selecteer je budget"
                {...register("budget")}
              />
            </div>

            {/* Kavel radio */}
            <div className="space-y-1.5">
              <label className="block text-body-sm font-medium text-gray-700">
                Heb je al een kavel?
              </label>
              <div className="flex gap-2">
                {[
                  { value: "ja" as const, label: "Ja" },
                  { value: "nee" as const, label: "Nee" },
                  { value: "onbekend" as const, label: "Weet ik niet" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border cursor-pointer transition-all duration-200 text-body-sm ${
                      heeftKavelValue === option.value
                        ? "border-primary bg-primary-50/80 text-primary font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register("heeftKavel")}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <FormTextarea
              label="Opmerkingen (optioneel)"
              placeholder="Bijzondere wensen of vragen?"
              rows={3}
              {...register("opmerkingen")}
            />

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-body-sm text-red-600">{submitError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconRight={
                !isSubmitting ? <Send className="w-5 h-5" /> : undefined
              }
            >
              {isSubmitting
                ? "Bezig met verzenden..."
                : "Verstuur verfijning"}
            </Button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5 text-caption text-gray-600">
            <Gift className="w-3.5 h-3.5 text-primary/60" />
            <span>100% gratis</span>
          </div>
          <div className="flex items-center gap-1.5 text-caption text-gray-600">
            <Shield className="w-3.5 h-3.5 text-primary/60" />
            <span>Gegevens veilig</span>
          </div>
          <div className="flex items-center gap-1.5 text-caption text-gray-600">
            <Clock className="w-3.5 h-3.5 text-primary/60" />
            <span>Reactie binnen 48 uur</span>
          </div>
        </div>
      </Card>

      {/* Hidden FloorplanCanvas for screenshot export */}
      {store.kamers.length > 0 && (
        <div className="fixed -left-[9999px] top-0" aria-hidden="true">
          <FloorplanCanvas ref={canvasRef} readOnly />
        </div>
      )}

      {/* ===== CONFIGURATION SUMMARY ===== */}
      <Card padding="md" className="mb-8">
        <h2 className="text-body font-semibold text-dark mb-5">
          Je configuratie
        </h2>

        <div className="space-y-5">
          {/* --- Kamers --- */}
          {store.kamers.length > 0 && (
            <div>
              <SectionHeader
                icon={<SquareStack className="w-3.5 h-3.5 text-primary" />}
                title={`Kamers (${store.kamers.length})`}
                step={3}
                onEdit={() => handleEditStep(3)}
              />
              <div className="mt-2 ml-9">
                {store.modules.length > 1 ? (
                  <div className="space-y-3">
                    {store.modules.map((mod) => {
                      const modM2 = mod.kamers.reduce((sum, k) => sum + k.m2, 0);
                      return (
                        <div key={mod.id}>
                          <p className="text-caption font-medium text-gray-600 mb-1.5">
                            {mod.naam}
                            <span className="text-gray-400 ml-1.5">{formatM2(Math.round(modM2 * 10) / 10)}</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {mod.kamers.map((kamer) => (
                              <span
                                key={kamer.id}
                                className="inline-flex items-center gap-1.5 text-caption px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
                              >
                                {kamer.naam}
                                <span className="text-gray-600">{formatM2(kamer.m2)}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {store.kamers.map((kamer) => (
                      <span
                        key={kamer.id}
                        className="inline-flex items-center gap-1.5 text-caption px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
                      >
                        {kamer.naam}
                        <span className="text-gray-600">{formatM2(kamer.m2)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- Exterieur --- */}
          {(() => {
            const slug = store.woningType || "";
            const extItems = [
              !isOptieDisabled(slug, "dak") && (
                <SummaryItem key="dak" label="Daktype" value={store.dakType ? dakTypeLabels[store.dakType] : null} />
              ),
              !isOptieDisabled(slug, "gevel") && (
                <SummaryItem key="gevel" label="Gevel" value={store.gevelType ? gevelTypeLabels[store.gevelType] : null} />
              ),
              !isOptieDisabled(slug, "kozijnen") && (
                <SummaryItem key="kozijnen" label="Kozijnen" value={store.kozijnType ? kozijnTypeLabels[store.kozijnType] : null} />
              ),
              !isOptieDisabled(slug, "glas") && (
                <SummaryItem key="glas" label="Beglazing" value={glasTypeLabels[store.glasType]} />
              ),
              !isOptieDisabled(slug, "fundering") && (
                <SummaryItem key="fundering" label="Fundering" value={store.funderingType ? funderingTypeLabels[store.funderingType] : null} />
              ),
            ].filter(Boolean);

            return extItems.length > 0 && (
              <div>
                <SectionHeader
                  icon={<Hammer className="w-3.5 h-3.5 text-primary" />}
                  title="Exterieur"
                  step={3}
                  onEdit={handleEditStep}
                />
                <div className="mt-2 ml-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {extItems}
                </div>
              </div>
            );
          })()}

          {(() => {
            const slug = store.woningType || "";
            const hasExt = !isOptieDisabled(slug, "dak") || !isOptieDisabled(slug, "gevel") || !isOptieDisabled(slug, "kozijnen") || !isOptieDisabled(slug, "glas") || !isOptieDisabled(slug, "fundering");
            const hasInst = !isOptieDisabled(slug, "verwarming") || !isOptieDisabled(slug, "isolatie") || !isOptieDisabled(slug, "zonnepanelen") || !isOptieDisabled(slug, "vloerverwarming");
            return hasExt && hasInst && <div className="border-t border-gray-100" />;
          })()}

          {/* --- Installaties --- */}
          {(() => {
            const slug = store.woningType || "";
            const instItems = [
              !isOptieDisabled(slug, "verwarming") && (
                <SummaryItem key="verwarming" label="Verwarming" value={store.verwarmingType ? verwarmingTypeLabels[store.verwarmingType] : null} />
              ),
              !isOptieDisabled(slug, "isolatie") && (
                <SummaryItem key="isolatie" label="Isolatie" value={isolatieNiveauLabels[store.isolatieNiveau]} />
              ),
              !isOptieDisabled(slug, "zonnepanelen") && (
                <SummaryItem key="zonnepanelen" label="Zonnepanelen" value={store.zonnepanelen > 0 ? `${store.zonnepanelen} panelen` : null} />
              ),
              !isOptieDisabled(slug, "vloerverwarming") && (
                <SummaryItem key="vloerverwarming" label="Vloerverwarming" value={store.vloerverwarming ? "Ja" : null} />
              ),
            ].filter(Boolean);

            return instItems.length > 0 && (
              <div>
                <SectionHeader
                  icon={<Flame className="w-3.5 h-3.5 text-primary" />}
                  title="Installaties"
                  step={3}
                  onEdit={handleEditStep}
                />
                <div className="mt-2 ml-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {instItems}
                </div>
              </div>
            );
          })()}

          {(() => {
            const slug = store.woningType || "";
            const hasInst = !isOptieDisabled(slug, "verwarming") || !isOptieDisabled(slug, "isolatie") || !isOptieDisabled(slug, "zonnepanelen") || !isOptieDisabled(slug, "vloerverwarming");
            const hasInt = !isOptieDisabled(slug, "keuken") || !isOptieDisabled(slug, "badkamer");
            return hasInst && hasInt && <div className="border-t border-gray-100" />;
          })()}

          {/* --- Interieur --- */}
          {(() => {
            const slug = store.woningType || "";
            const intItems = [
              !isOptieDisabled(slug, "keuken") && (
                <SummaryItem key="keuken" label="Keuken" value={afwerkingNiveauLabels[store.keukenNiveau]} />
              ),
              !isOptieDisabled(slug, "badkamer") && (
                <SummaryItem key="badkamer" label="Badkamer" value={afwerkingNiveauLabels[store.badkamerNiveau]} />
              ),
            ].filter(Boolean);

            return intItems.length > 0 && (
              <div>
                <SectionHeader
                  icon={<Paintbrush className="w-3.5 h-3.5 text-primary" />}
                  title="Interieur"
                  step={3}
                  onEdit={handleEditStep}
                />
                <div className="mt-2 ml-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {intItems}
                </div>
              </div>
            );
          })()}
        </div>
      </Card>
    </div>
  );
}
