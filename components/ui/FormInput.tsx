"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;
    const describedBy = errorId || helperId || undefined;

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-body-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-required={props.required || undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300 text-body transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:border-primary",
            "placeholder:text-gray-400",
            error && "border-red-500 focus:ring-red-200 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-caption text-red-500" role="alert">{error}</p>}
        {helperText && !error && <p id={helperId} className="text-caption text-gray-600">{helperText}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
