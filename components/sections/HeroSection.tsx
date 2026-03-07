"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, Home } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import HeroReveal from "@/components/ui/HeroReveal";
import { woningtypen, categorieLabels } from "@/lib/woningtypen";

export default function HeroSection() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleTypeSelect = (slug: string) => {
    setIsDropdownOpen(false);
    router.push(`/configurator?type=${slug}`);
  };

  return (
    <section className="relative bg-[#2D1B4E]" style={{ zIndex: 20 }}>
      {/* Subtle decorative wave */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute bottom-[20%] left-0 w-full h-[200px] opacity-[0.08]" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 100C240 150 480 170 720 130C960 90 1200 50 1440 100V200H0Z" fill="white" />
        </svg>
      </div>

      <Container className="relative pt-20 md:pt-28 lg:pt-36 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          {/* Text side */}
          <div className="self-center pb-8 md:pb-28 lg:pb-36">
            <HeroReveal delay={0}>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-body-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAD4AE] animate-pulse" />
                Nr. 1 vergelijkingsplatform van Nederland
              </span>
            </HeroReveal>

            <HeroReveal delay={0.08}>
              <h1 className="text-display-xl md:text-[4.25rem] text-white font-heading font-bold mb-6 leading-[1.03] tracking-tight">
                Vind je ideale
                <br />
                <span className="text-[#FAD4AE]">modulaire woning</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.16}>
              <p className="text-body-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                Ontdek 14 woningtypen, configureer je woning en ontvang
                binnen 48 uur een vrijblijvende offerte op maat.
              </p>
            </HeroReveal>

            {/* Quick-start selector */}
            <HeroReveal delay={0.24}>
              <div className="mb-8 max-w-md">
                <p className="text-body-sm text-primary-200 font-medium mb-2.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FAD4AE] text-[#2D1B4E] flex items-center justify-center text-[0.65rem] font-bold leading-none">1</span>
                  Selecteer je woningtype
                </p>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white rounded-2xl px-5 py-4 flex items-center gap-4 text-left shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-[#FAD4AE]/25 hover:ring-[#FAD4AE]/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-800 font-semibold block">Welk type woning zoek je?</span>
                      <span className="text-caption text-gray-400">Tiny house, mantelzorgwoning, prefab...</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden z-50 max-h-80 overflow-y-auto"
                    >
                      {Object.entries(categorieLabels).map(([key, label]) => {
                        const typen = woningtypen.filter((w) => w.categorie === key);
                        return (
                          <div key={key}>
                            <div className="px-5 py-2.5 bg-gray-50 text-[0.65rem] font-bold text-gray-600 uppercase tracking-[0.08em]">
                              {label}
                            </div>
                            {typen.map((type) => (
                              <button
                                key={type.slug}
                                onClick={() => handleTypeSelect(type.slug)}
                                className="w-full px-5 py-3.5 text-left hover:bg-primary-50 transition-colors flex items-center justify-between group"
                              >
                                <span className="text-body-sm font-medium text-gray-700 group-hover:text-primary">{type.naam}</span>
                                <span className="text-caption text-gray-400 group-hover:text-primary/60 price-amount">
                                  Vanaf &euro;{type.prijsVanaf.toLocaleString("nl-NL")}
                                </span>
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>
            </HeroReveal>

            {/* CTA buttons */}
            <HeroReveal delay={0.32}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button as="link" href="/configurator" variant="accent" size="lg" iconRight={<CTAArrow />}>
                  Ontvang gratis offertes
                </Button>
                <a
                  href="#woningtypen"
                  className="group inline-flex items-center justify-center gap-2 text-white/60 hover:text-white font-medium px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
                >
                  Bekijk woningtypen
                </a>
              </div>
            </HeroReveal>

            {/* Trust items */}
            <HeroReveal delay={0.4}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-white/70">
                {["100% gratis", "Vrijblijvend", "Binnen 48u reactie"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-200" />
                    {t}
                  </span>
                ))}
              </div>
            </HeroReveal>
          </div>

          {/* Photo side — positioned at bottom, feet cut off by wave */}
          <div className="self-end">
            <HeroReveal delay={0.15} variant="image">
              <Image
                src="/images/wim-zwv.png"
                alt="Wim, de Woning Inspecteur Meester van Zorgwoningvergelijker.nl, inspecteert een modulaire woning met vergrootglas"
                width={1888}
                height={2272}
                className="w-[55%] mx-auto md:w-[85%] md:ml-auto md:mr-0 object-contain md:-translate-x-[1%]"
                priority
                quality={90}
                sizes="(max-width: 768px) 55vw, 85vw"
              />
            </HeroReveal>
          </div>
        </div>
      </Container>

      {/* Bottom wave — z-10 ensures it overlaps the hero image for the cutoff effect */}
      <div className="absolute -bottom-px left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-[56px] md:h-[72px]" preserveAspectRatio="none">
          <path d="M0 80V32C240 4 480 0 720 16C960 32 1200 44 1440 32V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
