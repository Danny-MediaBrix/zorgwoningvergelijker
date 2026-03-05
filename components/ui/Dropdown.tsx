"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-body-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-gray-300 text-body bg-white appearance-none transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:border-primary",
              error && "border-red-500 focus:ring-red-200 focus:border-red-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="">{placeholder}</option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" aria-hidden="true" />
        </div>
        {error && <p id={errorId} className="text-caption text-red-500" role="alert">{error}</p>}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
export default Dropdown;
