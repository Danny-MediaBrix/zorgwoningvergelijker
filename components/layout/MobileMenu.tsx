"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const woningCategories = [
  {
    label: "Kleinschalig Wonen",
    types: [
      { name: "Tiny House", slug: "tiny-house" },
      { name: "Micro-woning", slug: "micro-woning" },
    ],
  },
  {
    label: "Zorg & Mantelzorg",
    types: [
      { name: "Mantelzorgwoning", slug: "mantelzorgwoning" },
      { name: "Kangoeroewoning", slug: "kangoeroewoning" },
    ],
  },
  {
    label: "Recreatie & Vakantie",
    types: [
      { name: "Chalet", slug: "chalet" },
      { name: "Lodge", slug: "lodge" },
      { name: "Vakantiebungalow", slug: "vakantiebungalow" },
    ],
  },
  {
    label: "Reguliere Woningbouw",
    types: [
      { name: "Prefab-woning", slug: "prefab-woning" },
      { name: "Systeemwoning", slug: "systeemwoning" },
      { name: "Flexwoning", slug: "flexwoning" },
      { name: "Containerwoning", slug: "containerwoning" },
    ],
  },
  {
    label: "Overig",
    types: [
      { name: "Woonunit", slug: "woonunit" },
      { name: "Tuinkamer", slug: "tuinkamer" },
      { name: "Modulaire Aanbouw", slug: "modulaire-aanbouw" },
    ],
  },
];

const navLinks = [
  { label: "Hoe werkt het?", href: "/hoe-werkt-het" },
  { label: "Gratis offerte", href: "/configurator" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/veelgestelde-vragen" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
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
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      // Focus the close button when menu opens
      setTimeout(() => {
        const closeBtn = menuRef.current?.querySelector<HTMLElement>('[aria-label="Menu sluiten"]');
        closeBtn?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus when menu closes
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleLinkClick = () => {
    setExpandedCategory(null);
    onClose();
  };

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
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[320px] max-w-[85vw] bg-white shadow-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigatiemenu"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="text-body-sm font-semibold text-gray-600 tracking-wide uppercase">Menu</span>
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors"
                aria-label="Menu sluiten"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              <Link
                href="/configurator"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-5 py-3 text-body font-semibold text-dark hover:bg-primary-50 transition-colors"
              >
                Configurator
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>

              <div>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === "woningtypen" ? null : "woningtypen")}
                  aria-expanded={expandedCategory === "woningtypen"}
                  className={cn(
                    "flex items-center justify-between w-full px-5 py-3 text-body font-semibold text-dark hover:bg-primary-50 transition-colors",
                    expandedCategory === "woningtypen" && "bg-primary-50"
                  )}
                >
                  <span>Woningtypen</span>
                  {expandedCategory === "woningtypen" ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedCategory === "woningtypen" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      {woningCategories.map((category) => (
                        <div key={category.label} className="py-2">
                          <span className="block px-7 py-1 text-[0.65rem] font-bold text-gray-600 uppercase tracking-[0.08em]">
                            {category.label}
                          </span>
                          {category.types.map((type) => (
                            <Link
                              key={type.slug}
                              href={`/${type.slug}`}
                              onClick={handleLinkClick}
                              className="block px-9 py-2 text-body-sm text-gray-600 hover:text-primary transition-colors"
                            >
                              {type.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Occasions accordion */}
              <div>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === "occasions" ? null : "occasions")}
                  aria-expanded={expandedCategory === "occasions"}
                  className={cn(
                    "flex items-center justify-between w-full px-5 py-3 text-body font-semibold text-dark hover:bg-primary-50 transition-colors",
                    expandedCategory === "occasions" && "bg-primary-50"
                  )}
                >
                  <span>Occasions</span>
                  {expandedCategory === "occasions" ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedCategory === "occasions" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      {woningCategories.map((category) => (
                        <div key={category.label} className="py-2">
                          <span className="block px-7 py-1 text-[0.65rem] font-bold text-gray-600 uppercase tracking-[0.08em]">
                            {category.label}
                          </span>
                          {category.types.map((type) => (
                            <Link
                              key={type.slug}
                              href={`/occasions/${type.slug}`}
                              onClick={handleLinkClick}
                              className="block px-9 py-2 text-body-sm text-gray-600 hover:text-primary transition-colors"
                            >
                              {type.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <div className="px-7 py-2 border-t border-gray-200/60">
                        <Link
                          href="/occasions"
                          onClick={handleLinkClick}
                          className="inline-flex items-center gap-1.5 text-body-sm text-primary font-medium"
                        >
                          Alle occasions bekijken
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-gray-100 mx-5 my-1" />

              {navLinks
                .filter((link) => link.label !== "Gratis offerte")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-5 py-3 text-body font-semibold text-dark hover:bg-primary-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>

            <div className="p-5 border-t border-gray-100">
              <Link
                href="/configurator"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
              >
                Ontvang gratis offertes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
