"use client";

import { cn } from "@/lib/utils";
import type { GridColumns } from "./OccasionGrid";

interface OccasionColumnSelectProps {
  value: GridColumns;
  onChange: (columns: GridColumns) => void;
}

const options: { cols: GridColumns; label: string }[] = [
  { cols: 1, label: "1 kolom" },
  { cols: 2, label: "2 kolommen" },
  { cols: 3, label: "3 kolommen" },
  { cols: 4, label: "4 kolommen" },
];

function ColumnIcon({ cols, active }: { cols: GridColumns; active: boolean }) {
  const barClass = cn(
    "rounded-[1px] transition-colors duration-150",
    active ? "bg-primary" : "bg-gray-300"
  );

  return (
    <div className="flex gap-[3px] w-[18px] h-[14px] items-stretch">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className={cn(barClass, "flex-1")} />
      ))}
    </div>
  );
}

export default function OccasionColumnSelect({ value, onChange }: OccasionColumnSelectProps) {
  return (
    <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
      {options.map(({ cols, label }) => (
        <button
          key={cols}
          onClick={() => onChange(cols)}
          title={label}
          className={cn(
            "flex items-center justify-center w-10 h-[44px] transition-colors duration-150",
            value === cols
              ? "bg-primary-50"
              : "hover:bg-gray-50"
          )}
        >
          <ColumnIcon cols={cols} active={value === cols} />
        </button>
      ))}
    </div>
  );
}
