"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  shortLabel?: string;
}

const OPTIONAL_STEPS = [3]; // Step 3 (Details) is optional in 4-step flow

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  maxVisitedStep: number;
  onStepClick?: (step: number) => void;
  disabledSteps?: number[];
}

export default function ProgressBar({
  steps,
  currentStep,
  maxVisitedStep,
  onStepClick,
  disabledSteps = [],
}: ProgressBarProps) {
  return (
    <nav className="w-full" aria-label="Configurator voortgang">
      <ol className="flex items-center justify-between" role="list">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isClickable = stepNum <= maxVisitedStep && onStepClick;
          const isOptional = OPTIONAL_STEPS.includes(stepNum);

          return (
            <li
              key={index}
              className="flex items-center flex-1 last:flex-none"
              aria-current={isCurrent ? "step" : undefined}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(stepNum)}
                disabled={!isClickable}
                aria-label={`Stap ${stepNum}: ${step.label}${isCompleted ? " (voltooid)" : isCurrent ? " (huidige stap)" : ""}`}
                className={cn(
                  "flex flex-col items-center gap-1.5 group",
                  isClickable ? "cursor-pointer" : "cursor-default"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-body-sm font-semibold transition-all duration-300 ease-premium",
                    isCompleted
                      ? "bg-primary text-white shadow-sm"
                      : isCurrent
                      ? "bg-primary text-white ring-[3px] ring-primary/15 shadow-sm"
                      : "bg-gray-100 text-gray-600 border border-gray-200/80",
                    isClickable && !isCurrent && "group-hover:ring-2 group-hover:ring-primary/10 group-hover:scale-105 group-hover:shadow-sm"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNum
                  )}
                </div>
                <div className="hidden md:flex flex-col items-center">
                  <span
                    className={cn(
                      "text-caption font-medium transition-colors",
                      isCurrent
                        ? "text-primary font-semibold"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-600"
                    )}
                  >
                    {step.label}
                  </span>
                  {isOptional && !isCompleted && (
                    <span className="text-[10px] text-gray-600 mt-0.5">(optioneel)</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-caption font-medium md:hidden transition-colors",
                    isCurrent
                      ? "text-primary font-semibold"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-600"
                  )}
                >
                  {step.shortLabel || ""}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-premium"
                    style={{
                      width: stepNum < currentStep ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
