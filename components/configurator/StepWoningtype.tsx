"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Info, MessageCircle } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import {
  woningtypen,
  categorieLabels,
  getWoningType,
  getWoningtypenByCategorie,
} from "@/lib/woningtypen";
import { formatPrice } from "@/lib/utils";
import { WoningCategorie } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const woningImages: Record<string, string> = {
  "tiny-house": "/images/tiny-house.jpg",
  "micro-woning": "/images/micro-woning.jpg",
  "mantelzorgwoning": "/images/mantelzorgwoning.jpg",
  "kangoeroewoning": "/images/kangaroe-woning.jpg",
  "chalet": "/images/chalet.jpg",
  "lodge": "/images/lodge.jpg",
  "vakantiebungalow": "/images/vakantiebungalow.jpg",
  "prefab-woning": "/images/prefab-woning.jpg",
  "systeemwoning": "/images/systeemwoning.jpg",
  "flexwoning": "/images/flexwoning-v2.jpg",
  "containerwoning": "/images/containerwoning-v2.jpg",
  "woonunit": "/images/woonunit.jpg",
  "tuinkamer": "/images/tuinkamer-bijgebouw-v2.jpg",
  "modulaire-aanbouw": "/images/modulaire aanbouw.jpg",
};

const ALLE_CATEGORIEEN = "alle";

type FilterOption = typeof ALLE_CATEGORIEEN | WoningCategorie;

// Category filters with counts
const categoryFilters = Object.entries(categorieLabels)
  .map(([key, label]) => ({
    key: key as WoningCategorie,
    label,
    count: woningtypen.filter((w) => w.categorie === key).length,
  }))
  .filter((f) => f.count > 0);

export default function StepWoningtype() {
  const { woningType, setWoningType } = useConfiguratorStore();

  // Determine initial category from pre-selected woningtype
  const initialFilter = useMemo<FilterOption>(() => {
    if (woningType) {
      const wt = getWoningType(woningType);
      if (wt) return wt.categorie;
    }
    return ALLE_CATEGORIEEN;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [activeFilter, setActiveFilter] = useState<FilterOption>(initialFilter);

  const filteredTypes =
    activeFilter === ALLE_CATEGORIEEN
      ? woningtypen
      : getWoningtypenByCategorie(activeFilter as WoningCategorie);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-heading-1 text-dark mb-2 tracking-tight">
          Welk type woning zoek je?
        </h1>
        <p className="text-body-lg text-gray-600">
          Kies het type dat het beste bij je situatie past
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveFilter(ALLE_CATEGORIEEN)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.8rem] font-semibold transition-all duration-200",
            activeFilter === ALLE_CATEGORIEEN
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-white text-gray-600 border border-gray-200/80 hover:border-primary/25 hover:text-primary shadow-sm"
          )}
        >
          Alle
          <span className={cn(
            "text-[0.7rem] font-bold tabular-nums",
            activeFilter === ALLE_CATEGORIEEN ? "text-white/70" : "text-gray-400"
          )}>
            {woningtypen.length}
          </span>
        </button>

        <div className="w-px h-5 bg-gray-200/80 mx-0.5" />

        {categoryFilters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.8rem] font-semibold transition-all duration-200",
              activeFilter === filter.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-gray-600 border border-gray-200/80 hover:border-primary/25 hover:text-primary shadow-sm"
            )}
          >
            {filter.label}
            <span className={cn(
              "text-[0.7rem] font-bold tabular-nums",
              activeFilter === filter.key ? "text-white/70" : "text-gray-400"
            )}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Woningtype grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTypes.map((wt) => {
          const isSelected = woningType === wt.slug;
          const image = woningImages[wt.slug];
          return (
            <motion.button
              key={wt.slug}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setWoningType(wt.slug)}
              className={cn(
                "relative text-left rounded-2xl border-2 transition-all duration-300 ease-premium overflow-hidden flex flex-col items-stretch",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1",
                isSelected
                  ? "border-primary bg-primary-50/80 shadow-card-hover ring-1 ring-primary/10"
                  : "border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-card"
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Photo */}
              {image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${wt.naam} - selecteer dit woningtype in de configurator`}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-5">
              {/* Category badge */}
              <Badge variant="gray" className="mb-3">
                {wt.categorieLabel}
              </Badge>

              {/* Name */}
              <h3 className="font-heading text-heading-3 text-dark mb-1">
                {wt.naam}
              </h3>

              {/* Tagline */}
              <p className="text-body-sm text-gray-600 mb-3 line-clamp-2">
                {wt.tagline}
              </p>

              {/* Size range */}
              <p className="text-caption text-gray-600 mb-2">
                {wt.minM2} - {wt.maxM2} m²
              </p>

              {/* Price */}
              <Badge variant="accent">
                Vanaf {formatPrice(wt.prijsVanaf)}
              </Badge>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Help tip */}
      <div className="mt-10 p-5 bg-primary-50/60 border border-primary-100/50 rounded-2xl flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary-100 flex-shrink-0 flex items-center justify-center mt-0.5">
          <Info className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-body-sm text-gray-600">
            <span className="font-semibold text-dark">Weet je niet welk type bij je past?</span>{" "}
            Neem{" "}
            <a
              href="/contact"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              contact
            </a>{" "}
            met ons op en wij helpen je graag verder.
          </p>
        </div>
      </div>
    </div>
  );
}
