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
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { isOptieDisabled } from "@/lib/woningtypen";
import { getAanbieder, getAanbiedersVoorType } from "@/lib/aanbieders";
import { formatM2 } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Dropdown from "@/components/ui/Dropdown";
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

interface ContactFormData {
  naam: string;
  email: string;
  telefoon: string;
  postcode: string;
  oplevertermijn: string;
  budget: string;
  heeftKavel: "ja" | "nee" | "onbekend";
  opmerkingen: string;
  privacy: boolean;
}

// ==================== Component ====================

export default function StepOverzicht() {
  const store = useConfiguratorStore();
  const router = useRouter();
  const prijsRange = store.getPrijsRange();
  const voorgeselecteerdeAanbieder = store.voorgeselecteerdeAanbieder;
  const voorgeselecteerdeAanbiederNaam = voorgeselecteerdeAanbieder
    ? getAanbieder(voorgeselecteerdeAanbieder)?.naam || null
    : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [voorkeursAanbieders, setVoorkeursAanbieders] = useState<string[]>([]);
  const [geenVoorkeur, setGeenVoorkeur] = useState(true);
  const canvasRef = useRef<FloorplanCanvasHandle>(null);

  const beschikbareAanbieders = store.woningType
    ? getAanbiedersVoorType(store.woningType)
    : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ContactFormData>({
    defaultValues: {
      naam: "",
      email: "",
      telefoon: "",
      postcode: "",
      oplevertermijn: "",
      budget: "",
      heeftKavel: "onbekend",
      opmerkingen: "",
      privacy: false,
    },
  });

  const heeftKavelValue = watch("heeftKavel");

  const handleToggleAanbieder = (slug: string) => {
    setVoorkeursAanbieders((prev) => {
      if (prev.includes(slug)) {
        const next = prev.filter((s) => s !== slug);
        if (next.length === 0) setGeenVoorkeur(true);
        return next;
      }
      setGeenVoorkeur(false);
      return [...prev, slug];
    });
  };

  const handleGeenVoorkeur = () => {
    setGeenVoorkeur(true);
    setVoorkeursAanbieders([]);
  };

  const handleNextFormStep = async () => {
    const isValid = await trigger(["naam", "email", "telefoon", "postcode"]);
    if (isValid) setFormStep(2);
  };

  const handleEditStep = (step: number) => {
    store.setStep(step);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Capture plattegrond screenshot
      const plattegrondBase64 = canvasRef.current?.exportAsDataUrl() || null;

      const response = await fetch("/api/leads", {
        method: "POST",
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
            naam: data.naam,
            email: data.email,
            telefoon: data.telefoon,
            postcode: data.postcode,
            oplevertermijn: data.oplevertermijn,
            budget: data.budget || "",
            heeftKavel: data.heeftKavel,
            voorkeursAanbieders: geenVoorkeur ? [] : voorkeursAanbieders,
            voorgeselecteerdeAanbieder: voorgeselecteerdeAanbieder || null,
            opmerkingen: data.opmerkingen || "",
          },
          prijsIndicatie: prijsRange,
          plattegrondBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Er is iets misgegaan bij het versturen van je aanvraag."
        );
      }

      router.push("/bedankt?type=offerte");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Er is iets misgegaan bij het versturen van je aanvraag."
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
          Overzicht &amp; offerte
        </h1>
        <p className="text-body-lg text-gray-600">
          Controleer je configuratie en vraag een vrijblijvende offerte aan
        </p>
      </div>

      {/* Aanbieder doorverwijzing notificatie */}
      {voorgeselecteerdeAanbiederNaam && (
        <div className="bg-primary-50 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-dark">
            Je bent doorverwezen door <strong>{voorgeselecteerdeAanbiederNaam}</strong>.
            Deze aanbieder ontvangt je offerteaanvraag.
          </p>
        </div>
      )}

      {/* ===== CONTACT FORM ===== */}
      <Card padding="lg" className="mb-8 border-t-2 border-t-primary">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="font-heading text-heading-3 text-dark mb-1">
              Offerte aanvragen
            </h2>
            <p className="text-body-sm text-gray-600">
              Vul je gegevens in en ontvang een vrijblijvende offerte op maat
            </p>
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                formStep >= 1 ? "bg-primary" : "bg-gray-200"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                formStep >= 2 ? "bg-primary" : "bg-gray-200"
              }`}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {formStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Naam"
                  placeholder="Je volledige naam"
                  required
                  {...register("naam", {
                    required: "Vul je naam in",
                    minLength: {
                      value: 2,
                      message: "Naam moet minimaal 2 tekens bevatten",
                    },
                  })}
                  error={errors.naam?.message}
                />
                <FormInput
                  label="E-mailadres"
                  type="email"
                  placeholder="je@email.nl"
                  required
                  {...register("email", {
                    required: "Vul je e-mailadres in",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Vul een geldig e-mailadres in",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Telefoonnummer"
                  type="tel"
                  placeholder="06-12345678"
                  required
                  {...register("telefoon", {
                    required: "Vul je telefoonnummer in",
                    minLength: {
                      value: 8,
                      message: "Vul een geldig telefoonnummer in",
                    },
                  })}
                  error={errors.telefoon?.message}
                />
                <FormInput
                  label="Postcode"
                  placeholder="1234 AB"
                  required
                  {...register("postcode", {
                    required: "Vul je postcode in",
                    minLength: {
                      value: 4,
                      message: "Vul een geldige postcode in",
                    },
                  })}
                  error={errors.postcode?.message}
                />
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleNextFormStep}
              >
                Volgende stap
              </Button>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Dropdown
                  label="Gewenste oplevertermijn"
                  options={oplevertermijnOpties}
                  placeholder="Selecteer een termijn"
                  required
                  {...register("oplevertermijn", {
                    required: "Selecteer een oplevertermijn",
                  })}
                  error={errors.oplevertermijn?.message}
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
                  Heb je al een kavel?{" "}
                  <span className="text-red-500">*</span>
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

              {/* Privacy */}
              <div className="space-y-1.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("privacy", {
                      validate: (v) =>
                        v === true ||
                        "Je dient akkoord te gaan met het privacybeleid",
                    })}
                    className="mt-1 w-4 h-4 rounded border-gray-200 text-primary focus:ring-primary/20"
                  />
                  <span className="text-body-sm text-gray-600">
                    Ik ga akkoord met het{" "}
                    <a
                      href="/privacybeleid"
                      className="text-primary hover:underline"
                    >
                      privacybeleid
                    </a>
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-caption text-red-500">
                    {errors.privacy.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-body-sm text-red-600">{submitError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={() => setFormStep(1)}
                >
                  Terug
                </Button>
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
                    : "Offerte aanvragen"}
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Trust indicators — compact inline */}
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
                onEdit={handleEditStep}
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
                  step={4}
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
                  step={5}
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
                  step={6}
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
