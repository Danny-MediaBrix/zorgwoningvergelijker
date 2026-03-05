"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/occasions/constants";

interface OccasionSortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OccasionSortSelect({ value, onChange }: OccasionSortSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 pr-9 text-body-sm text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[44px]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
