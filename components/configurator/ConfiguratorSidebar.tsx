"use client";

import { useState } from "react";
import {
  Phone,
  ChevronUp,
  Home,
  Layers,
  SquareStack,
  Info,
  ShieldCheck,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { formatPrice, formatM2 } from "@/lib/utils";
import PriceRange from "@/components/ui/PriceRange";
import Card from "@/components/ui/Card";

interface ConfiguratorSidebarProps {
  mobile?: boolean;
}

export default function ConfiguratorSidebar({
  mobile = false,
}: ConfiguratorSidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);

  const { woningType, totaalM2, aantalVerdiepingen, kamers, modules, getPrijsRange } =
    useConfiguratorStore();

  const prijsRange = getPrijsRange();
  const wt = woningType ? getWoningType(woningType) : null;

  // Mobile: render as sticky bottom bar
  if (mobile) {
    return (
      <div className="bg-white border-t border-gray-200 shadow-lg">
        {mobileExpanded && (
          <div className="px-4 pt-4 pb-2 border-b border-gray-100/80">
            {wt && (
              <div className="space-y-2.5 text-body-sm">
                <div className="flex items-center gap-2.5 text-gray-600">
                  <div className="w-6 h-6 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Home className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="font-medium">{wt.naam}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <div className="w-6 h-6 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <SquareStack className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>{formatM2(totaalM2)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <div className="w-6 h-6 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>
                    {aantalVerdiepingen}{" "}
                    {aantalVerdiepingen === 1 ? "verdieping" : "verdiepingen"}
                  </span>
                </div>
                {kamers.length > 0 && (
                  <p className="text-gray-600 pl-[34px]">
                    {kamers.length} {kamers.length === 1 ? "kamer" : "kamers"}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between px-4 py-3.5"
        >
          <div className="text-left">
            <p className="text-caption text-gray-600">Geschatte kosten</p>
            {prijsRange.laag > 0 ? (
              <p className="text-body font-bold text-dark price-amount">
                {formatPrice(prijsRange.laag)} -{" "}
                {formatPrice(prijsRange.hoog)}
              </p>
            ) : (
              <p className="text-body text-gray-600">
                Selecteer een woningtype
              </p>
            )}
          </div>
          <ChevronUp
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ease-premium ${
              mobileExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    );
  }

  // Desktop: simplified sidebar — price, selection, trust
  return (
    <div className="space-y-4">
      {/* 1. Price range */}
      <Card variant="highlighted" padding="lg">
        {prijsRange.laag > 0 ? (
          <>
            <PriceRange
              laag={prijsRange.laag}
              hoog={prijsRange.hoog}
              size="sm"
              disclaimer="Indicatieve prijsrange incl. BTW. Werkelijke kosten zijn afhankelijk van aanbieder, locatie en opties."
            />

            <button
              onClick={() => setShowPriceInfo(!showPriceInfo)}
              className="flex items-center gap-1.5 text-caption text-gray-600 hover:text-primary mt-3 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              Hoe wordt deze prijs berekend?
            </button>
            {showPriceInfo && (
              <div className="mt-2 p-3 bg-gray-50 rounded-xl text-caption text-gray-600 leading-relaxed">
                De prijs is berekend op basis van het gekozen woningtype, de
                oppervlakte en geselecteerde opties. De basisprijs per m²
                varieert per type, met toeslagen voor extra opties.
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-body text-gray-600">
              Selecteer een woningtype om een prijsindicatie te zien
            </p>
          </div>
        )}
      </Card>

      {/* 2. Selection summary */}
      {wt && (
        <Card padding="md">
          <h3 className="text-body-sm font-semibold text-dark mb-3">Je selectie</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-primary" />
              </div>
              <p className="text-body-sm font-medium text-gray-700">{wt.naam}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <SquareStack className="w-4 h-4 text-primary" />
              </div>
              <p className="text-body-sm text-gray-600">{formatM2(totaalM2)}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <p className="text-body-sm text-gray-600">
                {aantalVerdiepingen}{" "}
                {aantalVerdiepingen === 1 ? "verdieping" : "verdiepingen"}
              </p>
            </div>

            {kamers.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                {modules.length > 1 ? (
                  <>
                    <p className="text-caption text-gray-600 mb-2">
                      {modules.length} {wt && wt.moduleLabel ? wt.moduleLabel.toLowerCase() + "s" : "modules"} &middot; {kamers.length} {kamers.length === 1 ? "kamer" : "kamers"}
                    </p>
                    <div className="space-y-2">
                      {modules.map((mod) => (
                        <div key={mod.id}>
                          <p className="text-caption font-medium text-gray-600 mb-1">
                            {mod.naam}
                            <span className="text-gray-400 ml-1">{formatM2(Math.round(mod.kamers.reduce((s, k) => s + k.m2, 0) * 10) / 10)}</span>
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {mod.kamers.map((kamer) => (
                              <span
                                key={kamer.id}
                                className="inline-block text-caption px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100"
                              >
                                {kamer.naam}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-caption text-gray-600 mb-2">
                      {kamers.length} {kamers.length === 1 ? "kamer" : "kamers"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {kamers.map((kamer) => (
                        <span
                          key={kamer.id}
                          className="inline-block text-caption px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100"
                        >
                          {kamer.naam}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Trust + help */}
      <Card variant="outlined" padding="sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-body-sm text-gray-600">100% gratis & vrijblijvend</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <Phone className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-body-sm text-gray-600">
              Hulp nodig?{" "}
              <a
                href="tel:+31850041159"
                className="text-primary hover:underline font-medium"
              >
                085 - 004 11 59
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
