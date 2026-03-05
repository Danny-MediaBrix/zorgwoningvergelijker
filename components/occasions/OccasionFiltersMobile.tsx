"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import OccasionFilters from "./OccasionFilters";
import type { OccasionFilters as FiltersType } from "@/lib/occasions/types";

interface OccasionFiltersMobileProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  resultCount: number;
}

export default function OccasionFiltersMobile({
  isOpen,
  onClose,
  filters,
  onChange,
  resultCount,
}: OccasionFiltersMobileProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        const closeBtn = panelRef.current?.querySelector<HTMLElement>('[aria-label="Filters sluiten"]');
        closeBtn?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[340px] max-w-[90vw] bg-page flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="flex items-center justify-between p-5 bg-white border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <span className="text-body font-semibold text-dark">Filters</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Filters sluiten"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <OccasionFilters
                filters={filters}
                onChange={onChange}
                resultCount={resultCount}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full px-5 py-3.5 bg-primary hover:bg-primary-800 text-white font-semibold rounded-xl transition-colors min-h-[44px]"
              >
                {resultCount} {resultCount === 1 ? "resultaat" : "resultaten"} tonen
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
