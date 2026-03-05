"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const woningtypen = [
  {
    category: "Kleinschalig Wonen",
    items: [
      { name: "Tiny House", slug: "tiny-house" },
      { name: "Micro-woning", slug: "micro-woning" },
    ],
  },
  {
    category: "Zorg & Mantelzorg",
    items: [
      { name: "Mantelzorgwoning", slug: "mantelzorgwoning" },
      { name: "Kangoeroewoning", slug: "kangoeroewoning" },
    ],
  },
  {
    category: "Recreatie & Vakantie",
    items: [
      { name: "Chalet", slug: "chalet" },
      { name: "Lodge", slug: "lodge" },
      { name: "Vakantiebungalow", slug: "vakantiebungalow" },
    ],
  },
  {
    category: "Reguliere Woningbouw",
    items: [
      { name: "Prefab Woning", slug: "prefab-woning" },
      { name: "Systeemwoning", slug: "systeemwoning" },
      { name: "Flexwoning", slug: "flexwoning" },
      { name: "Containerwoning", slug: "containerwoning" },
    ],
  },
  {
    category: "Overig",
    items: [
      { name: "Woonunit", slug: "woonunit" },
      { name: "Tuinkamer", slug: "tuinkamer" },
      { name: "Modulaire Aanbouw", slug: "modulaire-aanbouw" },
    ],
  },
];

const navLinks = [
  { name: "Hoe werkt het?", href: "/hoe-werkt-het" },
  { name: "Configurator", href: "/configurator" },
  { name: "Kennisbank", href: "/kennisbank" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [occasionsMenuOpen, setOccasionsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const occasionsMenuRef = useRef<HTMLDivElement>(null);
  const occasionsMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isConfigurator = pathname === "/configurator";

  useEffect(() => {
    if (isConfigurator) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isConfigurator]);

  // Close mega menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (megaMenuOpen) {
          setMegaMenuOpen(false);
          megaMenuRef.current?.querySelector<HTMLElement>("button")?.focus();
        }
        if (occasionsMenuOpen) {
          setOccasionsMenuOpen(false);
          occasionsMenuRef.current?.querySelector<HTMLElement>("button")?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [megaMenuOpen, occasionsMenuOpen]);

  // Hide header on configurator page — it has its own header with logo + progress bar
  if (isConfigurator) {
    return null;
  }

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setOccasionsMenuOpen(false);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleOccasionsMenuEnter = () => {
    if (occasionsMenuTimeoutRef.current) {
      clearTimeout(occasionsMenuTimeoutRef.current);
      occasionsMenuTimeoutRef.current = null;
    }
    setMegaMenuOpen(false);
    setOccasionsMenuOpen(true);
  };

  const handleOccasionsMenuLeave = () => {
    occasionsMenuTimeoutRef.current = setTimeout(() => {
      setOccasionsMenuOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white shadow-sm border-b border-gray-200"
            : "bg-white/0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/zorgwoningvergelijker-logo.svg"
              alt="Zorgwoningvergelijker.nl logo - vergelijk modulaire woningen"
              width={140}
              height={88}
              className="h-[4.25rem] w-auto transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Woningtypen with mega dropdown */}
            <div
              ref={megaMenuRef}
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setMegaMenuOpen(!megaMenuOpen);
                  }
                }}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[0.9rem] font-medium transition-colors flex items-center gap-1",
                  megaMenuOpen
                    ? "text-primary bg-primary-50"
                    : "text-gray-600 hover:text-dark hover:bg-gray-50"
                )}
              >
                Woningtypen
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    megaMenuOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] bg-white shadow-xl rounded-2xl border border-gray-200/80 p-6"
                  >
                    <div className="grid grid-cols-5 gap-6">
                      {woningtypen.map((group) => (
                        <div key={group.category}>
                          <h3 className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.08em] mb-2.5">
                            {group.category}
                          </h3>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/${item.slug}`}
                                  className="block px-2 py-1.5 -mx-2 rounded-lg text-body-sm text-gray-600 hover:text-primary hover:bg-primary-50 transition-colors"
                                  onClick={() => setMegaMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link
                        href="/#woningtypen"
                        className="inline-flex items-center gap-1.5 text-body-sm text-primary font-medium hover:gap-2 transition-all"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        Alle 14 woningtypen bekijken
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Occasions with mega dropdown */}
            <div
              ref={occasionsMenuRef}
              className="relative"
              onMouseEnter={handleOccasionsMenuEnter}
              onMouseLeave={handleOccasionsMenuLeave}
            >
              <button
                aria-expanded={occasionsMenuOpen}
                aria-haspopup="true"
                onClick={() => setOccasionsMenuOpen(!occasionsMenuOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOccasionsMenuOpen(!occasionsMenuOpen);
                  }
                }}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[0.9rem] font-medium transition-colors flex items-center gap-1",
                  occasionsMenuOpen
                    ? "text-primary bg-primary-50"
                    : "text-gray-600 hover:text-dark hover:bg-gray-50"
                )}
              >
                Occasions
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    occasionsMenuOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {occasionsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] bg-white shadow-xl rounded-2xl border border-gray-200/80 p-6"
                  >
                    <div className="grid grid-cols-5 gap-6">
                      {woningtypen.map((group) => (
                        <div key={group.category}>
                          <h3 className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.08em] mb-2.5">
                            {group.category}
                          </h3>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/occasions/${item.slug}`}
                                  className="block px-2 py-1.5 -mx-2 rounded-lg text-body-sm text-gray-600 hover:text-primary hover:bg-primary-50 transition-colors"
                                  onClick={() => setOccasionsMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link
                        href="/occasions"
                        className="inline-flex items-center gap-1.5 text-body-sm text-primary font-medium hover:gap-2 transition-all"
                        onClick={() => setOccasionsMenuOpen(false)}
                      >
                        Alle occasions bekijken
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-[0.9rem] font-medium text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/inloggen"
              className="hidden lg:inline-flex text-[0.8rem] text-subtle hover:text-primary transition-colors"
            >
              Aanbieder? Inloggen
            </Link>
            <Button as="link" href="/configurator" variant="primary" size="sm" iconRight={<CTAArrow size="sm" />} className="hidden sm:inline-flex">
              Gratis offerte
            </Button>
            <Button as="link" href="/configurator" variant="primary" size="sm" className="sm:hidden">
              Offerte
            </Button>

            <button
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[80px]" />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
