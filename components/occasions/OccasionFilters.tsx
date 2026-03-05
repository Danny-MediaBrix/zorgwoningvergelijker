"use client";

import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { woningtypenSlim } from "@/lib/woningtypen-slim";
import {
  DUTCH_PROVINCES,
  CONDITION_LABELS,
} from "@/lib/occasions/constants";
import type { OccasionFilters as FiltersType } from "@/lib/occasions/types";

interface OccasionFiltersProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  resultCount: number;
  className?: string;
}

function FilterSection({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-3 mb-3 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
      <label htmlFor={htmlFor} className="block text-caption font-semibold text-dark mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectFilter({
  id,
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
}: {
  id?: string;
  value: string | undefined;
  onChange: (val: string | undefined) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        aria-label={ariaLabel}
        className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-body-sm text-dark pr-9 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[40px]"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function RangeFilter({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder,
  maxPlaceholder,
  prefix,
  suffix,
  minLabel,
  maxLabel,
}: {
  minValue: number | undefined;
  maxValue: number | undefined;
  onMinChange: (val: number | undefined) => void;
  onMaxChange: (val: number | undefined) => void;
  minPlaceholder: string;
  maxPlaceholder: string;
  prefix?: string;
  suffix?: string;
  minLabel?: string;
  maxLabel?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-sm text-gray-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={minValue ?? ""}
          onChange={(e) =>
            onMinChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder={minPlaceholder}
          aria-label={minLabel}
          className={cn(
            "w-full bg-white border border-gray-200 rounded-lg py-2 text-body-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[40px]",
            prefix ? "pl-7 pr-3" : "px-3.5"
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-body-sm text-gray-400">-</span>
      <div className="relative flex-1">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-sm text-gray-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={maxValue ?? ""}
          onChange={(e) =>
            onMaxChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder={maxPlaceholder}
          aria-label={maxLabel}
          className={cn(
            "w-full bg-white border border-gray-200 rounded-lg py-2 text-body-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[40px]",
            prefix ? "pl-7 pr-3" : "px-3.5"
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-body-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function OccasionFilters({
  filters,
  onChange,
  resultCount,
  className,
}: OccasionFiltersProps) {
  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== "sort" && key !== "page" && key !== "limit" && val !== undefined
  );

  const clearFilters = () => {
    onChange({ sort: filters.sort });
  };

  const updateFilter = (key: keyof FiltersType, value: unknown) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  return (
    <aside className={cn("w-[260px] flex-shrink-0", className)}>
      <div className="sticky top-[96px] bg-white rounded-2xl border border-gray-200/60 shadow-card p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body font-heading font-semibold text-dark">
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-caption text-primary font-medium hover:text-primary-800 transition-colors min-h-[40px]"
            >
              <X className="w-3 h-3" />
              Wis
            </button>
          )}
        </div>

        {/* Resultaat telling */}
        <p className="text-caption text-gray-500 mb-3" aria-live="polite" aria-atomic="true">
          {resultCount} {resultCount === 1 ? "resultaat" : "resultaten"}
        </p>

        {/* Woningtype */}
        <FilterSection label="Woningtype" htmlFor="filter-woningtype">
          <SelectFilter
            id="filter-woningtype"
            value={filters.woningtype}
            onChange={(val) => updateFilter("woningtype", val)}
            options={woningtypenSlim.map((w) => ({ value: w.slug, label: w.naam }))}
            placeholder="Alle woningtypen"
          />
        </FilterSection>

        {/* Prijs */}
        <FilterSection label="Prijs">
          <RangeFilter
            minValue={filters.priceMin}
            maxValue={filters.priceMax}
            onMinChange={(val) => updateFilter("priceMin", val)}
            onMaxChange={(val) => updateFilter("priceMax", val)}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            prefix="€"
            minLabel="Minimum prijs"
            maxLabel="Maximum prijs"
          />
        </FilterSection>

        {/* Provincie */}
        <FilterSection label="Provincie" htmlFor="filter-provincie">
          <SelectFilter
            id="filter-provincie"
            value={filters.province}
            onChange={(val) => updateFilter("province", val)}
            options={DUTCH_PROVINCES.map((p) => ({ value: p, label: p }))}
            placeholder="Alle provincies"
          />
        </FilterSection>

        {/* Oppervlakte */}
        <FilterSection label="Oppervlakte">
          <RangeFilter
            minValue={filters.surfaceMin}
            maxValue={filters.surfaceMax}
            onMinChange={(val) => updateFilter("surfaceMin", val)}
            onMaxChange={(val) => updateFilter("surfaceMax", val)}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            suffix="m²"
            minLabel="Minimum oppervlakte"
            maxLabel="Maximum oppervlakte"
          />
        </FilterSection>

        {/* Bouwjaar */}
        <FilterSection label="Bouwjaar vanaf" htmlFor="filter-bouwjaar">
          <input
            id="filter-bouwjaar"
            type="number"
            value={filters.buildYearMin ?? ""}
            onChange={(e) =>
              updateFilter(
                "buildYearMin",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Bijv. 2020"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-body-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[40px]"
          />
        </FilterSection>

        {/* Staat */}
        <FilterSection label="Staat" htmlFor="filter-staat">
          <SelectFilter
            id="filter-staat"
            value={filters.condition}
            onChange={(val) => updateFilter("condition", val)}
            options={Object.entries(CONDITION_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
            placeholder="Alle staten"
          />
        </FilterSection>
      </div>
    </aside>
  );
}
