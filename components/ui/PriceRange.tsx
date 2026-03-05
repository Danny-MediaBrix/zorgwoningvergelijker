"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PriceRangeProps {
  laag: number;
  hoog: number;
  label?: string;
  disclaimer?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PriceRange({
  laag,
  hoog,
  label = "Geschatte kosten incl. BTW",
  disclaimer,
  size = "md",
  className,
}: PriceRangeProps) {
  const sizeStyles = {
    sm: "text-heading-3",
    md: "text-heading-2",
    lg: "text-heading-1",
  };

  return (
    <div className={cn("text-center", className)}>
      {label && <p className="text-body-sm text-gray-600 mb-3">{label}</p>}
      <div className="relative">
        <div className="h-1 rounded-full bg-primary mb-4 max-w-xs mx-auto" />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${laag}-${hoog}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn("font-bold text-dark price-amount", sizeStyles[size])}
          >
            {formatPrice(laag)} - {formatPrice(hoog)}
          </motion.div>
        </AnimatePresence>
      </div>
      {disclaimer && (
        <p className="text-caption text-gray-600 mt-3 max-w-sm mx-auto leading-relaxed">{disclaimer}</p>
      )}
    </div>
  );
}
