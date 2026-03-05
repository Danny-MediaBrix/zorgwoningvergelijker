"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Toggle({ label, description, checked, onChange, className }: ToggleProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        <div className="text-body font-medium text-gray-700">{label}</div>
        {description && <p className="text-body-sm text-gray-600">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
          checked ? "bg-primary" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
