"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronDown, Check, Loader2 } from "lucide-react";
import { woningtypen } from "@/lib/woningtypen";

const STORAGE_KEY = "zwv_exit_popup_dismissed";
const SESSION_KEY = "zwv_exit_popup_shown";

const woningtypeOptions = woningtypen.map((w) => ({
  slug: w.slug,
  naam: w.naam,
  defaultM2: w.defaultM2,
  minM2: w.minM2,
  maxM2: w.maxM2,
}));

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedM2, setSelectedM2] = useState("50");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (
      pathname.startsWith("/configurator") ||
      pathname.startsWith("/portal") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/studio") ||
      pathname.startsWith("/inloggen") ||
      pathname.startsWith("/registreren")
    ) {
      return;
    }

    // Max 1x per sessie
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {}

    // Niet tonen als al eerder ingestuurd
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let triggered = false;

    function handleMouseLeave(e: MouseEvent) {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setShow(true);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname]);

  useEffect(() => {
    if (selectedType) {
      const wt = woningtypeOptions.find((w) => w.slug === selectedType);
      if (wt) setSelectedM2(String(wt.defaultM2));
    }
  }, [selectedType]);

  async function handleSubmit() {
    setError("");

    if (!selectedType) { setError("Kies een woningtype."); return; }
    if (!naam.trim()) { setError("Vul je naam in."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Vul een geldig e-mailadres in."); return; }
    if (!telefoon.trim() || telefoon.replace(/\D/g, "").length < 10) { setError("Vul een geldig telefoonnummer in."); return; }

    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configuratie: {
            woningType: selectedType,
            totaalM2: Number(selectedM2),
            aantalVerdiepingen: 1,
            kamers: [],
            buitenBreedte: 0,
            buitenDiepte: 0,
            dakType: null,
            gevelType: null,
            kozijnType: null,
            glasType: "standaard",
            funderingType: null,
            verwarmingType: null,
            isolatieNiveau: "standaard",
            zonnepanelen: 0,
            vloerverwarming: false,
            keukenNiveau: "standaard",
            badkamerNiveau: "standaard",
          },
          contact: {
            naam: naam.trim(),
            email: email.trim(),
            telefoon: telefoon.trim(),
            postcode: "0000",
            oplevertermijn: "onbekend",
            budget: "onbekend",
            heeftKavel: "onbekend",
          },
          prijsIndicatie: { laag: 0, hoog: 0 },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      setSubmitted(true);
      try {
        localStorage.setItem(STORAGE_KEY, "submitted");
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSending(false);
    }
  }

  const selectedWt = woningtypeOptions.find((w) => w.slug === selectedType);

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-body text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40"
            onClick={dismiss}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            className="relative bg-white rounded-2xl shadow-card-lg w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 z-10 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Bedankt scherm */
              <div className="px-6 py-10 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="font-heading text-heading-2 font-bold text-dark mb-2">
                  Bedankt, {naam.split(" ")[0]}!
                </h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Je aanvraag is ontvangen. Aanbieders nemen zo snel mogelijk contact met je op met een prijsindicatie.
                </p>
                <button
                  onClick={dismiss}
                  className="text-primary font-semibold text-body hover:underline cursor-pointer"
                >
                  Sluiten
                </button>
              </div>
            ) : (
              <>
                {/* Header met Wim */}
                <div className="bg-white px-6 pt-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/wim-profielfoto.jpg"
                        alt="Wim — Woning Inspecteur"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover"
                      />
                    </div>
                    <div className="pt-1">
                      <p className="text-body-sm text-primary font-semibold">Wim helpt je verder</p>
                      <h2
                        id="exit-popup-title"
                        className="font-heading text-heading-3 font-bold text-dark leading-snug mt-0.5"
                      >
                        Ontvang snel een prijsindicatie
                      </h2>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-body-sm text-muted leading-relaxed">
                      Vul onderstaand formulier in en ontvang <strong className="text-dark">een
                      prijsindicatie</strong> van aanbieders. 100% gratis en vrijblijvend!
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="border-t border-gray-100 px-6 pt-5 pb-6 space-y-4">
                  {/* Woningtype */}
                  <div>
                    <label htmlFor="exit-woningtype" className="block text-body-sm font-semibold text-dark mb-1.5">
                      Welk type woning zoek je?
                    </label>
                    <div className="relative">
                      <select
                        id="exit-woningtype"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="" disabled>Kies een woningtype...</option>
                        {woningtypeOptions.map((wt) => (
                          <option key={wt.slug} value={wt.slug}>{wt.naam}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Oppervlakte */}
                  <div>
                    <label htmlFor="exit-m2" className="block text-body-sm font-semibold text-dark mb-1.5">
                      Hoeveel m² heb je nodig?
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        id="exit-m2"
                        type="range"
                        min={selectedWt?.minM2 ?? 15}
                        max={selectedWt?.maxM2 ?? 150}
                        step={5}
                        value={selectedM2}
                        onChange={(e) => setSelectedM2(e.target.value)}
                        className="flex-1 accent-primary h-2 rounded-full cursor-pointer"
                      />
                      <span className="flex-shrink-0 min-w-[4rem] text-center bg-primary-50 text-primary font-heading font-bold text-body px-3 py-1.5 rounded-lg">
                        {selectedM2} m²
                      </span>
                    </div>
                    <div className="flex justify-between text-caption text-subtle mt-1 px-0.5">
                      <span>{selectedWt?.minM2 ?? 15} m²</span>
                      <span>{selectedWt?.maxM2 ?? 150} m²</span>
                    </div>
                  </div>

                  {/* Naam */}
                  <div>
                    <label htmlFor="exit-naam" className="block text-body-sm font-semibold text-dark mb-1.5">
                      Naam
                    </label>
                    <input
                      id="exit-naam"
                      type="text"
                      value={naam}
                      onChange={(e) => setNaam(e.target.value)}
                      placeholder="Bijv. Jan de Vries"
                      className={inputClass}
                    />
                  </div>

                  {/* Email & Telefoon naast elkaar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="exit-email" className="block text-body-sm font-semibold text-dark mb-1.5">
                        E-mail
                      </label>
                      <input
                        id="exit-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jan@voorbeeld.nl"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="exit-tel" className="block text-body-sm font-semibold text-dark mb-1.5">
                        Telefoon
                      </label>
                      <input
                        id="exit-tel"
                        type="tel"
                        value={telefoon}
                        onChange={(e) => setTelefoon(e.target.value)}
                        placeholder="06 12345678"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-body-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    className="group w-full flex items-center justify-center gap-2.5 bg-accent text-white font-semibold text-body px-6 py-3.5 rounded-2xl shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
                  >
                    {sending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Ontvang prijsindicatie
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-caption text-subtle">
                    Geen spam · Geen verplichtingen · Binnen 48 uur reactie
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
