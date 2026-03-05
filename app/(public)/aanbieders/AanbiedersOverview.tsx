"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Star,
  X,
  Search,
  ChevronDown,
  Shield,
  ChevronRight,
  Home,
  Award,
} from "lucide-react";
import Container from "@/components/ui/Container";
import type { UnifiedAanbieder } from "@/lib/aanbieders-unified";

const specialisatieLabels: Record<string, string> = {
  "tiny-house": "Tiny House",
  "micro-woning": "Micro-woning",
  mantelzorgwoning: "Mantelzorgwoning",
  kangoeroewoning: "Kangoeroewoning",
  chalet: "Chalet",
  lodge: "Lodge",
  vakantiebungalow: "Vakantiebungalow",
  "prefab-woning": "Prefab woning",
  systeemwoning: "Systeemwoning",
  flexwoning: "Flexwoning",
  containerwoning: "Containerwoning",
  woonunit: "Woonunit",
  tuinkamer: "Tuinkamer",
  "modulaire-aanbouw": "Modulaire aanbouw",
};

interface AanbiedersOverviewProps {
  aanbieders: UnifiedAanbieder[];
}

export default function AanbiedersOverview({ aanbieders }: AanbiedersOverviewProps) {
  const [filter, setFilter] = useState("");
  const [zoekterm, setZoekterm] = useState("");

  const alleSpecialisaties = useMemo(
    () =>
      Array.from(
        new Set(aanbieders.flatMap((a) => a.specialisaties))
      ).sort(),
    [aanbieders]
  );

  const featuredSlugs = useMemo(
    () =>
      new Set(
        [...aanbieders]
          .sort((a, b) => b.beoordeling - a.beoordeling)
          .slice(0, 3)
          .map((a) => a.slug)
      ),
    [aanbieders]
  );

  const gefilterdeAanbieders = useMemo(() => {
    return aanbieders.filter((a) => {
      const matchFilter = !filter || a.specialisaties.includes(filter);
      const matchZoek =
        !zoekterm ||
        a.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
        a.vestigingsplaats.toLowerCase().includes(zoekterm.toLowerCase());
      return matchFilter && matchZoek;
    });
  }, [aanbieders, filter, zoekterm]);

  const hasFilters = filter || zoekterm;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#2D1B4E] overflow-hidden">
        {/* Decoratieve golf */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute bottom-[10%] left-0 w-full h-[200px] opacity-[0.08]"
            viewBox="0 0 1440 200"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 100C240 150 480 170 720 130C960 90 1200 50 1440 100V200H0Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-12 pb-14 sm:pt-14 sm:pb-16">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-body-sm text-white/60 mb-6"
            >
              <Link href="/" className="hover:text-white/80 transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">Aanbieders</span>
            </nav>

            <h1 className="text-3xl sm:text-display font-heading font-bold text-white mb-3 tracking-tight">
              Aanbieders vergelijken
            </h1>
            <p className="text-body-lg text-white/70 max-w-xl leading-relaxed">
              Vergelijk gecertificeerde aanbieders van modulaire woningen.
              Bekijk beoordelingen, specialisaties en vraag vrijblijvend een offerte aan.
            </p>
          </div>
        </div>

        {/* Lichte golf-overgang */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="block w-full h-[20px] md:h-[28px]"
            preserveAspectRatio="none"
          >
            <path d="M0 60V40C360 28 720 24 1080 32C1260 36 1380 42 1440 40V60H0Z" fill="#FAF9F6" />
          </svg>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-page min-h-screen">
        <Container>
          {/* Zoekbalk */}
          <div className="max-w-3xl mx-auto -mt-6 relative z-10 mb-10">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Zoek op naam of plaats..."
                  value={zoekterm}
                  onChange={(e) => setZoekterm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50/80 border-0 text-body transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/15 placeholder:text-gray-400"
                />
              </div>
              <div className="relative sm:w-56">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border-0 text-body appearance-none transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/15 cursor-pointer"
                >
                  <option value="">Alle specialisaties</option>
                  {alleSpecialisaties.map((spec) => (
                    <option key={spec} value={spec}>
                      {specialisatieLabels[spec] || spec}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Resultaat telling */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-body-sm text-gray-600">
              <strong className="font-heading font-semibold text-dark">
                {gefilterdeAanbieders.length}
              </strong>{" "}
              aanbieder{gefilterdeAanbieders.length !== 1 ? "s" : ""} gevonden
            </p>
            {hasFilters && (
              <button
                onClick={() => {
                  setFilter("");
                  setZoekterm("");
                }}
                className="flex items-center gap-1.5 text-body-sm text-primary font-medium hover:text-primary-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Wis filters
              </button>
            )}
          </div>

          {/* Grid */}
          {gefilterdeAanbieders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <Search className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-body-lg text-gray-600 mb-2">
                Geen aanbieders gevonden
              </p>
              <p className="text-body-sm text-gray-400 mb-6">
                Pas je zoekcriteria aan of wis de filters
              </p>
              <button
                onClick={() => {
                  setFilter("");
                  setZoekterm("");
                }}
                className="text-primary font-semibold text-body-sm hover:underline"
              >
                Filters wissen
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {gefilterdeAanbieders.map((aanbieder) => {
                const initials = aanbieder.naam
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();
                const isFeatured = featuredSlugs.has(aanbieder.slug);

                return (
                  <div key={aanbieder.slug}>
                    <Link
                      href={`/aanbieders/${aanbieder.slug}`}
                      className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium overflow-hidden h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                    >
                      {/* Top accent bar */}
                      <div
                        className={`h-1 ${
                          isFeatured
                            ? "bg-gradient-to-r from-accent to-accent/60"
                            : "bg-gradient-to-r from-primary/80 to-primary/30"
                        }`}
                      />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Header: avatar + naam + featured badge */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center font-heading font-bold text-primary text-body-lg flex-shrink-0 ring-1 ring-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            {initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h2 className="font-heading font-bold text-heading-3 text-dark group-hover:text-primary transition-colors duration-200 truncate">
                                {aanbieder.naam}
                              </h2>
                              {isFeatured && (
                                <Award className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-body-sm text-gray-600 mt-1">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                              <span>
                                {aanbieder.vestigingsplaats}, {aanbieder.provincie}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="flex items-center gap-1.5 bg-yellow-50/80 px-2.5 py-1.5 rounded-lg border border-yellow-100/60">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-body-sm font-heading font-bold text-dark tabular-nums">
                              {aanbieder.beoordeling.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-body-sm text-gray-500">
                            {aanbieder.aantalReviews} reviews
                          </span>
                        </div>

                        {/* Specialisaties */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {aanbieder.specialisaties.slice(0, 3).map((spec) => (
                            <span
                              key={spec}
                              className="inline-flex items-center px-2.5 py-1 rounded-lg text-caption font-medium bg-gray-50 text-gray-600 ring-1 ring-gray-200/80"
                            >
                              {specialisatieLabels[spec] || spec}
                            </span>
                          ))}
                          {aanbieder.specialisaties.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-caption font-medium bg-primary-50/60 text-primary">
                              +{aanbieder.specialisaties.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-caption text-gray-400">
                            <Shield className="w-3.5 h-3.5 text-primary/40" />
                            Gecertificeerd
                          </div>
                          <span className="flex items-center gap-1 text-body-sm font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                            Bekijk profiel
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
