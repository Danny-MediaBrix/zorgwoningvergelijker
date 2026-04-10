"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Send,
  Shield,
  Clock,
  Star,
  ChevronDown,
  Users,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import {
  woningtypen,
  getWoningType,
} from "@/lib/woningtypen";
import { formatPrice, cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Slider from "@/components/ui/Slider";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

// Dropdown options grouped by popularity (mantelzorg first based on analytics)
const woningTypeOpties = [
  // Most searched types first
  ...["mantelzorgwoning", "tiny-house", "containerwoning", "prefab-woning", "kangoeroewoning", "flexwoning", "chalet"].map(
    (slug) => {
      const w = woningtypen.find((wt) => wt.slug === slug);
      return w ? { value: w.slug, label: w.naam, sub: `${w.minM2}–${w.maxM2} m² · vanaf ${formatPrice(w.prijsVanaf)}` } : null;
    }
  ).filter(Boolean) as { value: string; label: string; sub: string }[],
  // Then the rest
  ...woningtypen
    .filter((w) => !["mantelzorgwoning", "tiny-house", "containerwoning", "prefab-woning", "kangoeroewoning", "flexwoning", "chalet"].includes(w.slug))
    .map((w) => ({ value: w.slug, label: w.naam, sub: `${w.minM2}–${w.maxM2} m² · vanaf ${formatPrice(w.prijsVanaf)}` })),
];

export default function StepConfiguratie() {
  const store = useConfiguratorStore();
  const woningType = store.woningType;
  const setWoningType = store.setWoningType;
  const totaalM2 = store.totaalM2;
  const setTotaalM2 = store.setTotaalM2;
  const aantalVerdiepingen = store.aantalVerdiepingen;
  const setAantalVerdiepingen = store.setAantalVerdiepingen;
  const nextStep = store.nextStep;
  const setLeadCaptured = store.setLeadCaptured;
  const getPrijsRange = store.getPrijsRange;

  // Form state
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [postcode, setPostcode] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const wt = woningType ? getWoningType(woningType) : null;

  // Throttle slider
  const rafRef = useRef<number | null>(null);
  const handleSliderChange = useCallback(
    (m2: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTotaalM2(m2);
      });
    },
    [setTotaalM2]
  );

  // Verdiepingen options
  const verdiepingOptions = useMemo(() => {
    if (!wt) return [];
    const parts = wt.verdiepingen.split("-").map(Number);
    const min = parts[0] || 1;
    const max = parts[parts.length - 1] || 1;
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push({ value: i, label: `${i}` });
    }
    return options;
  }, [wt]);

  // Price range
  const prijsRange = wt ? getPrijsRange() : null;

  // Validate & submit
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!woningType) newErrors.type = "Kies een woningtype";
    if (naam.trim().length < 2) newErrors.naam = "Vul je naam in";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Vul een geldig e-mailadres in";
    if (telefoon.trim().length < 8)
      newErrors.telefoon = "Vul een geldig telefoonnummer in";
    if (postcode.trim().length < 4)
      newErrors.postcode = "Vul een geldige postcode in";
    if (!privacyAccepted)
      newErrors.privacy = "Je dient akkoord te gaan met het privacybeleid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const prijsRange = getPrijsRange();

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
            naam: naam.trim(),
            email: email.trim(),
            telefoon: telefoon.trim(),
            postcode: postcode.trim(),
            oplevertermijn: "",
            budget: "",
            heeftKavel: "onbekend",
            opmerkingen: "",
          },
          prijsIndicatie: prijsRange,
          bron: "configurator",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || "Er is iets misgegaan bij het versturen."
        );
      }

      const data = await response.json();
      setLeadCaptured(data.id);
      nextStep();
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

  return (
    <div className="max-w-xl mx-auto">
      {/* Wim speech bubble */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0">
          <Image
            src="/images/wim-profielfoto.jpg"
            alt="Wim, je persoonlijke woningadviseur"
            width={52}
            height={52}
            className="w-[52px] h-[52px] rounded-full object-cover border-2 border-white shadow-md"
            priority
          />
        </div>
        <div className="relative bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 flex-1">
          <p className="text-body-sm text-dark">
            <span className="font-semibold">Hoi, ik ben Wim!</span>{" "}
            Vertel me wat voor woning je zoekt en ik regel{" "}
            <span className="text-primary font-semibold">gratis offertes</span>{" "}
            van de beste aanbieders voor je.
          </p>
        </div>
      </div>

      {/* Main form card */}
      <Card padding="lg">
        <div className="space-y-4">
          {/* Woningtype dropdown */}
          <div className="space-y-1.5">
            <label
              htmlFor="woningtype-select"
              className="block text-body-sm font-medium text-gray-700"
            >
              Wat voor woning zoek je?
            </label>
            <div className="relative">
              <select
                id="woningtype-select"
                value={woningType || ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setWoningType(e.target.value);
                    if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
                  }
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border text-body bg-white appearance-none transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:border-primary",
                  errors.type
                    ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300"
                )}
              >
                <option value="">Kies een woningtype...</option>
                {woningTypeOpties.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} — {opt.sub}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.type && (
              <p className="text-caption text-red-500">{errors.type}</p>
            )}
          </div>

          {/* M² slider + verdiepingen (shown when type selected) */}
          {wt && (
            <>
              <Slider
                label="Hoe groot moet je woning zijn?"
                value={totaalM2}
                onChange={handleSliderChange}
                min={wt.minM2}
                max={wt.maxM2}
                step={1}
                unit="m²"
              />

              {/* Verdiepingen pills */}
              {verdiepingOptions.length > 1 && (
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-gray-700">
                    Aantal verdiepingen
                  </label>
                  <div className="flex gap-2">
                    {verdiepingOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAantalVerdiepingen(opt.value)}
                        className={cn(
                          "px-4 py-2 rounded-lg border text-body-sm font-medium transition-all duration-200 min-w-[48px]",
                          aantalVerdiepingen === opt.value
                            ? "border-primary bg-primary-50/80 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price preview */}
              {prijsRange && (
                <div className="flex items-center justify-between px-4 py-2.5 bg-primary-50/60 border border-primary-100/50 rounded-xl">
                  <span className="text-body-sm text-gray-600">
                    Prijsindicatie
                  </span>
                  <span className="font-heading text-body font-bold text-primary">
                    {formatPrice(prijsRange.laag)} – {formatPrice(prijsRange.hoog)}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Section label */}
          <p className="text-body-sm font-medium text-gray-700 -mb-1">
            Waar kunnen we je bereiken?
          </p>

          {/* Contact fields */}
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Naam"
              placeholder="Je naam"
              required
              value={naam}
              onChange={(e) => {
                setNaam(e.target.value);
                if (errors.naam) setErrors((prev) => ({ ...prev, naam: "" }));
              }}
              error={errors.naam}
            />
            <FormInput
              label="E-mail"
              type="email"
              placeholder="je@email.nl"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Telefoon"
              type="tel"
              placeholder="06-12345678"
              required
              value={telefoon}
              onChange={(e) => {
                setTelefoon(e.target.value);
                if (errors.telefoon) setErrors((prev) => ({ ...prev, telefoon: "" }));
              }}
              error={errors.telefoon}
            />
            <FormInput
              label="Postcode"
              placeholder="1234 AB"
              required
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
                if (errors.postcode) setErrors((prev) => ({ ...prev, postcode: "" }));
              }}
              error={errors.postcode}
            />
          </div>

          {/* Privacy */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked);
                if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: "" }));
              }}
              className="mt-0.5 w-4 h-4 rounded border-gray-200 text-primary focus:ring-primary/20"
            />
            <span className="text-caption text-gray-600">
              Ik ga akkoord met het{" "}
              <a
                href="/privacybeleid"
                target="_blank"
                className="text-primary hover:underline"
              >
                privacybeleid
              </a>
            </span>
          </label>
          {errors.privacy && (
            <p className="text-caption text-red-500 -mt-2">{errors.privacy}</p>
          )}

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-body-sm text-red-600">{submitError}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="button"
            variant="accent"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onClick={handleSubmit}
            iconRight={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
          >
            {isSubmitting ? "Bezig met verzenden..." : "Ontvang gratis offertes"}
          </Button>



          {/* Trust indicators */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1 text-caption text-gray-500">
              <Shield className="w-3.5 h-3.5" />
              <span>100% gratis</span>
            </div>
            <div className="flex items-center gap-1 text-caption text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Binnen 48 uur</span>
            </div>
            <div className="flex items-center gap-1 text-caption text-gray-500">
              <Users className="w-3.5 h-3.5" />
              <span>53+ aanbieders</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Social proof bar */}
      <div className="flex items-center justify-center gap-4 mt-4 text-caption text-gray-500">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-medium text-gray-600">4.8/5</span>
          <span>beoordeling</span>
        </div>
        <span className="text-gray-300">|</span>
        <span>1.247 woningen geconfigureerd</span>
      </div>
    </div>
  );
}
