"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FastForward, SkipForward, RotateCcw, X, Check } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { getAanbieder } from "@/lib/aanbieders";
import Container from "@/components/ui/Container";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import ConfiguratorSidebar from "./ConfiguratorSidebar";
import StepWoningtype from "./StepWoningtype";
import StepBasiskenmerken from "./StepBasiskenmerken";
import StepPlattegrond from "./StepPlattegrond";
import StepExterieur from "./StepExterieur";
import StepInstallaties from "./StepInstallaties";
import StepInterieur from "./StepInterieur";
import StepOverzicht from "./StepOverzicht";

const STEPS = [
  { label: "Woningtype", shortLabel: "Type" },
  { label: "Basis", shortLabel: "Basis" },
  { label: "Plattegrond", shortLabel: "Plan" },
  { label: "Exterieur", shortLabel: "Ext." },
  { label: "Installaties", shortLabel: "Inst." },
  { label: "Interieur", shortLabel: "Int." },
  { label: "Overzicht", shortLabel: "Klaar" },
];

// Steps 3-6 are optional and can be skipped
const OPTIONAL_STEPS = [3, 4, 5, 6];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

function ConfiguratorShellInner() {
  const searchParams = useSearchParams();
  const currentStep = useConfiguratorStore((s) => s.currentStep);
  const maxVisitedStep = useConfiguratorStore((s) => s.maxVisitedStep);
  const woningType = useConfiguratorStore((s) => s.woningType);
  const setStep = useConfiguratorStore((s) => s.setStep);
  const nextStep = useConfiguratorStore((s) => s.nextStep);
  const prevStep = useConfiguratorStore((s) => s.prevStep);
  const canProceed = useConfiguratorStore((s) => s.canProceed);
  const setWoningType = useConfiguratorStore((s) => s.setWoningType);
  const setVoorgeselecteerdeAanbieder = useConfiguratorStore((s) => s.setVoorgeselecteerdeAanbieder);
  const reset = useConfiguratorStore((s) => s.reset);

  const [showResumeBanner, setShowResumeBanner] = useState(false);

  const wt = woningType ? getWoningType(woningType) : null;
  const showFloatingBar = currentStep > 1 || !!wt;

  // Show resume banner if there's a saved configuration
  useEffect(() => {
    const s = useConfiguratorStore.getState();
    if (s.woningType && s.currentStep > 1) {
      setShowResumeBanner(true);
    }
  }, []);

  // Auto-select woningtype from URL parameter — always override store
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      const wtCheck = getWoningType(typeParam);
      if (wtCheck && typeParam !== useConfiguratorStore.getState().woningType) {
        reset();
        setWoningType(typeParam);
      }
    }
  }, [searchParams, reset, setWoningType]);

  // Pre-select aanbieder from URL parameter (e.g. ?aanbieder=modubouw-nederland)
  useEffect(() => {
    const aanbiederParam = searchParams.get("aanbieder");
    if (aanbiederParam) {
      const aanbieder = getAanbieder(aanbiederParam);
      if (aanbieder) {
        setVoorgeselecteerdeAanbieder(aanbiederParam);
      }
    }
  }, [searchParams, setVoorgeselecteerdeAanbieder]);

  const handleResumeDiscard = () => {
    reset();
    setShowResumeBanner(false);
  };

  const handleResumeContinue = () => {
    setShowResumeBanner(false);
  };

  const isOptionalStep = OPTIONAL_STEPS.includes(currentStep);

  const handleSkipToOverzicht = () => {
    setStep(7);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWoningtype />;
      case 2:
        return <StepBasiskenmerken />;
      case 3:
        return <StepPlattegrond />;
      case 4:
        return <StepExterieur />;
      case 5:
        return <StepInstallaties />;
      case 6:
        return <StepInterieur />;
      case 7:
        return <StepOverzicht />;
      default:
        return <StepWoningtype />;
    }
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Progress bar header with logo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <Container className="py-3">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex-shrink-0 group"
              aria-label="Terug naar homepage"
            >
              <Image
                src="/images/zorgwoningvergelijker-logo.svg"
                alt="Zorgwoningvergelijker.nl logo - terug naar homepage"
                width={120}
                height={75}
                className="h-11 w-auto transition-opacity duration-200 group-hover:opacity-80"
                priority
              />
            </Link>
            <div className="flex-1 min-w-0">
              <ProgressBar
                steps={STEPS}
                currentStep={currentStep}
                maxVisitedStep={maxVisitedStep}
                onStepClick={(step) => {
                  if (step <= maxVisitedStep) {
                    setStep(step);
                  }
                }}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Resume banner */}
      {showResumeBanner && (
        <div className="bg-primary-50/80 border-b border-primary-100/50">
          <Container className="py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-body-sm text-gray-700 truncate">
                  Je hebt een eerdere configuratie. Verder waar je gebleven was?
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="primary" size="sm" onClick={handleResumeContinue}>
                  Verder
                </Button>
                <button
                  type="button"
                  onClick={handleResumeDiscard}
                  className="p-1.5 text-gray-600 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Configuratie verwijderen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Main content area */}
      <Container className="py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Step content (70%) */}
          <div className="w-full lg:w-[70%]">
            {/* Quick route banner — shown after step 2, on optional steps */}
            {currentStep === 2 && canProceed() && (
              <div className="mb-8 p-5 bg-accent-50/80 border border-accent-100/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-body-sm font-semibold text-gray-800">
                    Snelle offerte nodig?
                  </p>
                  <p className="text-caption text-gray-600 mt-0.5">
                    Sla de detailstappen over en vraag direct een offerte aan op basis van type en oppervlak.
                  </p>
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleSkipToOverzicht}
                  iconRight={<FastForward className="w-4 h-4" />}
                  className="whitespace-nowrap flex-shrink-0"
                >
                  Direct naar offerte
                </Button>
              </div>
            )}

            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={currentStep}
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right: Sidebar (30%) - desktop */}
          <div className="hidden lg:block w-[30%]">
            <div className="sticky top-24">
              <ConfiguratorSidebar />
            </div>
          </div>
        </div>
      </Container>

      {/* Floating navigation bar — all steps */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[25] bg-white border-t border-gray-200 shadow-lg"
          >
            <Container className="py-3.5">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Vorige + step info */}
                <div className="flex items-center gap-3 min-w-0">
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      onClick={prevStep}
                      icon={<ChevronLeft className="w-5 h-5" />}
                    >
                      <span className="hidden sm:inline">Vorige</span>
                    </Button>
                  )}

                  {/* Step 1: woningtype info */}
                  {currentStep === 1 && wt && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-body-sm font-semibold text-dark truncate">
                          {wt.naam} gekozen
                        </p>
                        <p className="text-caption text-gray-600">
                          Vanaf {formatPrice(wt.prijsVanaf)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Steps 2-7: step badge + label */}
                  {currentStep > 1 && (
                    <div className="hidden sm:flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-body-sm font-bold text-primary">{currentStep}</span>
                      </span>
                      <span className="text-body-sm font-semibold text-dark truncate">
                        {STEPS[currentStep - 1].label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Sla over + Volgende */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isOptionalStep && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextStep}
                      iconRight={<SkipForward className="w-4 h-4" />}
                    >
                      <span className="hidden sm:inline">Sla over</span>
                    </Button>
                  )}
                  {currentStep < 7 && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      iconRight={<ChevronRight className="w-5 h-5" />}
                    >
                      {currentStep === 6 ? "Naar overzicht" : "Volgende"}
                    </Button>
                  )}
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Sticky bottom sidebar — hidden when floating bar is showing */}
      {!showFloatingBar && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20">
          <ConfiguratorSidebar mobile />
        </div>
      )}

      {/* Bottom spacer for fixed bar */}
      <div className="h-20" />
    </div>
  );
}

export default function ConfiguratorShell() {
  return (
    <Suspense fallback={null}>
      <ConfiguratorShellInner />
    </Suspense>
  );
}
