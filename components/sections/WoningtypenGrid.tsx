"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { woningtypen, categorieLabels } from "@/lib/woningtypen";
import { formatPrice } from "@/lib/utils";

const highlightSlugs = ["mantelzorgwoning", "tiny-house", "flexwoning"];
const highlighted = highlightSlugs.map((slug) => woningtypen.find((w) => w.slug === slug)!);

// Slug → image path mapping
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

// Category filters with counts (all woningtypen per category)
const categoryFilters = Object.entries(categorieLabels)
  .map(([key, label]) => ({
    key,
    label,
    count: woningtypen.filter((w) => w.categorie === key).length,
  }))
  .filter((f) => f.count > 0);

export default function WoningtypenGrid() {
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Filtered & grouped types (all woningtypen, including highlighted)
  const filteredByCategory = useMemo(() => {
    const source = activeFilter
      ? woningtypen.filter((w) => w.categorie === activeFilter)
      : woningtypen;

    return Object.entries(categorieLabels)
      .map(([key, label]) => ({
        key,
        label,
        types: source.filter((w) => w.categorie === key),
      }))
      .filter((group) => group.types.length > 0);
  }, [activeFilter]);

  const handleFilterClick = (key: string) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  return (
    <section className="section-padding section-gray wave-to-white relative overflow-hidden">
      {/* Background image — bottom right */}
      <div className="absolute bottom-0 right-0 pointer-events-none hidden lg:block">
        <Image
          src="/images/wim-vergelijkt-woningen.png"
          alt="Wim vergelijkt verschillende typen modulaire woningen"
          width={400}
          height={500}
          className="w-[280px] xl:w-[340px] object-contain translate-x-[15%] translate-y-[5%]"
          sizes="(max-width: 1024px) 0px, (max-width: 1280px) 280px, 340px"
        />
      </div>

      <Container className="relative">
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <h2 className="section-title">Welk type woning past bij jou?</h2>
            <p className="section-subtitle">
              Onze meest gekozen woningtypen, of bekijk alle 14 opties
            </p>
          </div>
        </ScrollReveal>

        {/* Highlighted cards — 3 featured */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto mb-4">
          {highlighted.map((type, i) => (
            <ScrollReveal key={type.slug} preset="fade-scale" delay={i * 0.1}>
            <Link
              href={`/${type.slug}`}
              className="group block bg-white rounded-2xl border border-gray-200/80 hover:border-primary/25 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium overflow-hidden h-full"
            >
              {/* Photo */}
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={woningImages[type.slug]}
                  alt={`${type.naam} - modulaire woning vergelijken en configureren`}
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5 pb-6">
                <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors mb-1 tracking-tight">
                  {type.naam}
                </h3>
                <p className="text-body-sm text-gray-600 mb-4 leading-relaxed">
                  {type.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-body-sm font-bold text-primary font-heading tabular-nums">
                      Vanaf {formatPrice(type.prijsVanaf)}
                    </div>
                    <div className="text-caption text-gray-400">{type.minM2}–{type.maxM2} m²</div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Expand toggle */}
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-2 py-4 text-body-sm font-semibold text-primary hover:text-primary-800 transition-colors"
          >
            {expanded ? "Minder woningtypen tonen" : `Bekijk alle ${woningtypen.length} woningtypen`}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>

          {/*
            All 14 woningtypen are ALWAYS in the DOM for Google crawlability.
            CSS grid-rows transition handles the visual expand/collapse.
          */}
          <div
            className={`grid transition-[grid-template-rows] duration-400 ease-premium ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              {/* Filter pills */}
              <div className="flex items-center gap-2 pb-5 pt-1 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
                {/* "Alle" pill */}
                <button
                  onClick={() => setActiveFilter(null)}
                  className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.8rem] font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 md:flex-shrink md:whitespace-normal ${
                    activeFilter === null
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-white text-gray-600 border border-gray-200/80 hover:border-primary/25 hover:text-primary shadow-sm"
                  }`}
                >
                  Alle
                  <span className={`text-[0.7rem] font-bold tabular-nums ${
                    activeFilter === null ? "text-white/70" : "text-gray-400"
                  }`}>
                    {woningtypen.length}
                  </span>
                </button>

                {/* Subtle separator */}
                <div className="w-px h-5 bg-gray-200/80 mx-0.5 flex-shrink-0" />

                {/* Category pills */}
                {categoryFilters.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => handleFilterClick(filter.key)}
                      className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.8rem] font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 md:flex-shrink md:whitespace-normal ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-white text-gray-600 border border-gray-200/80 hover:border-primary/25 hover:text-primary shadow-sm"
                      }`}
                    >
                      {filter.label}
                      <span className={`text-[0.7rem] font-bold tabular-nums ${
                        isActive ? "text-white/70" : "text-gray-400"
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* All woningtypen grouped by category */}
              <div className="space-y-6 pb-6">
                {filteredByCategory.map((group) => (
                  <div key={group.key}>
                    {/* Category header — only when showing all */}
                    {!activeFilter && (
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-5 rounded-full bg-primary/30" />
                        <h4 className="text-[0.8rem] font-bold text-gray-600 uppercase tracking-[0.06em]">
                          {group.label}
                        </h4>
                        <div className="flex-1 h-px bg-gray-200/80" />
                      </div>
                    )}

                    {/* Category items */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {group.types.map((type) => (
                        <Link
                          key={type.slug}
                          href={`/${type.slug}`}
                          className="group block bg-white rounded-2xl border border-gray-200/70 hover:border-primary/25 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 ease-premium overflow-hidden h-full"
                        >
                          {/* Photo */}
                          <div className="aspect-[16/10] overflow-hidden">
                            <Image
                              src={woningImages[type.slug]}
                              alt={`${type.naam} - bekijk prijzen, specificaties en aanbieders`}
                              width={400}
                              height={250}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4 pb-4">
                            <h3 className="font-bold text-body text-dark group-hover:text-primary transition-colors mb-1 tracking-tight">
                              {type.naam}
                            </h3>
                            <p className="text-caption text-gray-600 leading-relaxed mb-3 line-clamp-2">
                              {type.tagline}
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-caption font-bold text-primary font-heading tabular-nums">
                                  Vanaf {formatPrice(type.prijsVanaf)}
                                </div>
                                <div className="text-[0.7rem] text-gray-400">{type.minM2}–{type.maxM2} m²</div>
                              </div>
                              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-all duration-200">
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Button as="link" href="/configurator" variant="primary" size="lg" iconRight={<CTAArrow />}>
            Ontvang gratis offertes
          </Button>
        </div>
      </Container>
    </section>
  );
}
