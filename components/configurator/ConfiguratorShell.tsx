"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { getAanbieder } from "@/lib/aanbieders";
import Container from "@/components/ui/Container";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import ConfiguratorSidebar from "./ConfiguratorSidebar";
import StepConfiguratie from "./StepConfiguratie";
import StepVerfijnen from "./StepVerfijnen";
import StepDetails from "./StepDetails";
import StepOverzicht from "./StepOverzicht";

// Steps shown in progress bar (only visible from step 2+)
const PROGRESS_STEPS = [
  { label: "Offerte", shortLabel: "Offerte" },
  { label: "Verfijnen", shortLabel: "Extra" },
  { label: "Details", shortLabel: "Details" },
  { label: "Overzicht", shortLabel: "Klaar" },
];

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
  const isLeadCaptured = useConfiguratorStore((s) => s.isLeadCaptured);
  const setStep = useConfiguratorStore((s) => s.setStep);
  const nextStep = useConfiguratorStore((s) => s.nextStep);
  const prevStep = useConfiguratorStore((s) => s.prevStep);
  const canProceed = useConfiguratorStore((s) => s.canProceed);
  const setWoningType = useConfiguratorStore((s) => s.setWoningType);
  const setVoorgeselecteerdeAanbieder = useConfiguratorStore((s) => s.setVoorgeselecteerdeAanbieder);
  const reset = useConfiguratorStore((s) => s.reset);

  const [showResumeBanner, setShowResumeBanner] = useState(false);

  const wt = woningType ? getWoningType(woningType) : null;

  // Show progress bar from step 2 onwards
  const showProgressBar = currentStep >= 2;
  // Show floating nav on step 3 (details)
  const showFloatingBar = currentStep === 3;
  // Show sidebar on steps 3 and 4 (details + overzicht)
  const showSidebar = currentStep >= 3;

  // Show resume banner if there's a saved configuration with lead captured
  useEffect(() => {
    const s = useConfiguratorStore.getState();
    if (s.isLeadCaptured && s.currentStep > 2) {
      setShowResumeBanner(true);
    }
  }, []);

  // Auto-select woningtype from URL parameter
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

  // Pre-select aanbieder from URL parameter
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepConfiguratie />;
      case 2:
        return <StepVerfijnen />;
      case 3:
        return <StepDetails />;
      case 4:
        return <StepOverzicht />;
      default:
        return <StepConfiguratie />;
    }
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Header with logo + optional progress bar */}
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
                alt="Zorgwoningvergelijker.nl logo"
                width={120}
                height={75}
                className="h-11 w-auto transition-opacity duration-200 group-hover:opacity-80"
                priority
              />
            </Link>
            {showProgressBar && (
              <div className="flex-1 min-w-0">
                <ProgressBar
                  steps={PROGRESS_STEPS}
                  currentStep={currentStep}
                  maxVisitedStep={maxVisitedStep}
                  onStepClick={(step) => {
                    if (step === 1 && isLeadCaptured) return;
                    if (step <= maxVisitedStep) {
                      setStep(step);
                    }
                  }}
                />
              </div>
            )}
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
      <Container className={currentStep === 1 ? "py-6 sm:py-10" : "py-10"}>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Step content */}
          <div className={showSidebar ? "w-full lg:w-[70%]" : "w-full"}>
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

          {/* Sidebar (desktop only, steps 3-4) */}
          {showSidebar && (
            <div className="hidden lg:block w-[30%]">
              <div className="sticky top-24">
                <ConfiguratorSidebar />
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Floating nav bar — step 3 only */}
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
                <div className="flex items-center gap-3 min-w-0">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    icon={<ChevronLeft className="w-5 h-5" />}
                  >
                    <span className="hidden sm:inline">Vorige</span>
                  </Button>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={nextStep}
                  iconRight={<ChevronRight className="w-5 h-5" />}
                >
                  Naar overzicht
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer for fixed bar */}
      {showFloatingBar && <div className="h-20" />}
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
