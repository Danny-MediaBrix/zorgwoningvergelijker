"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  image?: React.ReactNode;
  price?: string;
  disabled?: boolean;
}

interface RadioCardGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function RadioCardGroup({
  options,
  value,
  onChange,
  columns = 3,
  className,
}: RadioCardGroupProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div role="radiogroup" className={cn("grid gap-3", gridCols[columns], className)}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            whileHover={!option.disabled ? { scale: 1.015 } : undefined}
            whileTap={!option.disabled ? { scale: 0.985 } : undefined}
            onClick={() => !option.disabled && onChange(option.value)}
            disabled={option.disabled}
            className={cn(
              "relative text-left rounded-2xl p-5 border-2 transition-all duration-300 ease-premium",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1",
              isSelected
                ? "border-primary bg-primary-50/80 ring-1 ring-primary/15 shadow-sm"
                : "border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-card",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
            {option.image && (
              <div className="mb-3">{option.image}</div>
            )}
            {option.icon && (
              <div className="mb-3 text-primary">{option.icon}</div>
            )}
            <div className="font-semibold text-body text-dark mb-1">{option.label}</div>
            {option.description && (
              <p className="text-body-sm text-gray-600 leading-relaxed">{option.description}</p>
            )}
            {option.price && (
              <p className={cn(
                "text-body-sm font-semibold mt-2.5",
                option.price === "Standaard" || option.price === "Inbegrepen"
                  ? "text-gray-600"
                  : "text-accent"
              )}>{option.price}</p>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
