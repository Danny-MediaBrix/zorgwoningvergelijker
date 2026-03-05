"use client";

import { cn } from "@/lib/utils";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
  className?: string;
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  showValue = true,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-body-sm font-medium text-gray-700">{label}</label>
        {showValue && (
          <span className="text-body-sm font-semibold text-primary">
            {value} {unit}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          className="w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #583A85 ${percentage}%, #DEE2E6 ${percentage}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-caption text-gray-600">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}
