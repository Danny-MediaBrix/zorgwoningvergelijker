"use client";

import { useState } from "react";
import { Euro, Ruler, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { woningtypen } from "@/lib/woningtypen";
import { berekenSimplePrijsRange } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

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

export default function PrijsIndicatieSection() {
  const [selectedType, setSelectedType] = useState("tiny-house");
  const [m2, setM2] = useState(30);

  const wt = woningtypen.find((w) => w.slug === selectedType);
  const prijs = berekenSimplePrijsRange(selectedType, m2);
  const prijsPerM2Laag = Math.round(prijs.laag / m2);
  const prijsPerM2Hoog = Math.round(prijs.hoog / m2);

  const handleTypeChange = (slug: string) => {
    setSelectedType(slug);
    const newWt = woningtypen.find((w) => w.slug === slug);
    if (newWt) setM2(newWt.defaultM2);
  };

  return (
    <section className="section-padding section-warm wave-from-white wave-to-white">
      <Container>
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <h2 className="section-title">Wat kost een modulaire woning?</h2>
            <p className="section-subtitle">
              Selecteer een woningtype en schuif met de oppervlakte voor een directe prijsindicatie
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal preset="fade-scale" delay={0.15}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
            <div className="grid lg:grid-cols-2">

              {/* Left — Visual side */}
              <div className="relative bg-[#2D1B4E] p-5 sm:p-8 lg:p-10 flex flex-col min-w-0">
                {/* Selected woning image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 sm:mb-6">
                  <Image
                    src={woningImages[selectedType] || "/images/tiny-house.jpg"}
                    alt={wt?.naam ? `${wt.naam} - bekijk de prijsindicatie per m²` : "Selecteer een woningtype voor een prijsindicatie"}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100%, (max-width: 1024px) 40vw, 360px"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 rounded-xl px-3 py-1.5 shadow-sm">
                    <span className="text-caption font-bold text-dark">{wt?.naam}</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="bg-white/10 rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                    <Euro className="w-4 h-4 text-[#FAD4AE] mx-auto mb-1.5" />
                    <div className="text-[0.6rem] sm:text-[0.65rem] text-white/50 uppercase tracking-wider font-semibold mb-0.5">Per m²</div>
                    <div className="text-caption sm:text-body-sm font-bold text-white font-heading tabular-nums">
                      {formatPrice(prijsPerM2Laag)}
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                    <Ruler className="w-4 h-4 text-[#FAD4AE] mx-auto mb-1.5" />
                    <div className="text-[0.6rem] sm:text-[0.65rem] text-white/50 uppercase tracking-wider font-semibold mb-0.5">Gekozen</div>
                    <div className="text-caption sm:text-body-sm font-bold text-white font-heading tabular-nums">
                      {m2} m²
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                    <TrendingUp className="w-4 h-4 text-[#FAD4AE] mx-auto mb-1.5" />
                    <div className="text-[0.6rem] sm:text-[0.65rem] text-white/50 uppercase tracking-wider font-semibold mb-0.5">Range</div>
                    <div className="text-caption sm:text-body-sm font-bold text-white font-heading tabular-nums">
                      {wt?.minM2}–{wt?.maxM2} m²
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[0.7rem] text-white/40 leading-relaxed mt-auto hidden sm:block">
                  Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden. Werkelijke kosten zijn afhankelijk van aanbieder, locatie en afwerking.
                </p>
              </div>

              {/* Right — Calculator */}
              <div className="p-5 sm:p-8 lg:p-10 flex flex-col min-w-0">
                {/* Type selector — scrollable chips */}
                <div className="mb-2">
                  <label className="text-body-sm font-medium text-gray-700 mb-3 block">
                    Woningtype
                  </label>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible md:pb-0">
                    {woningtypen.map((w) => {
                      const isActive = selectedType === w.slug;
                      return (
                        <button
                          key={w.slug}
                          onClick={() => handleTypeChange(w.slug)}
                          className={`px-3 py-1.5 rounded-lg text-caption font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 md:flex-shrink md:whitespace-normal ${
                            isActive
                              ? "bg-primary text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                          }`}
                        >
                          {w.naam}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-4 sm:my-6" />

                {/* Slider */}
                <Slider
                  label="Oppervlakte"
                  value={m2}
                  onChange={setM2}
                  min={wt?.minM2 || 15}
                  max={wt?.maxM2 || 300}
                  step={5}
                  unit="m²"
                />

                {/* Divider */}
                <div className="h-px bg-gray-100 my-4 sm:my-6" />

                {/* Price result */}
                <div className="text-center mb-6 sm:mb-8">
                  <p className="text-caption text-gray-400 uppercase tracking-wider font-semibold mb-2 sm:mb-3">
                    Geschatte kosten incl. BTW
                  </p>
                  <div className="h-1 rounded-full bg-primary/20 max-w-[120px] mx-auto mb-3 sm:mb-4">
                    <div className="h-full rounded-full bg-primary w-full" />
                  </div>
                  <div className="text-heading-2 sm:text-heading-1 font-extrabold text-dark font-heading tabular-nums tracking-tight">
                    {formatPrice(prijs.laag)} - {formatPrice(prijs.hoog)}
                  </div>
                </div>

                {/* CTA */}
                <Button as="link" href={`/configurator?type=${selectedType}`} variant="primary" size="lg" iconRight={<CTAArrow />} fullWidth className="mt-auto">
                  Configureer je {wt?.naam.toLowerCase() || "woning"}
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-caption text-gray-400 mt-5">
            De prijs is afhankelijk van woningtype, oppervlakte, afwerking en locatie. Vraag een offerte aan voor een exacte prijs.
          </p>
        </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
