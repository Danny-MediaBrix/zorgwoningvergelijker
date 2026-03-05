"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText && !error ? `${textareaId}-helper` : undefined;
    const describedBy = errorId || helperId || undefined;

    return (
      <div className="space-y-1.5">
        <label htmlFor={textareaId} className="block text-body-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? "true" : undefined}
          aria-required={props.required || undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300 text-body transition-all duration-200 resize-y min-h-[100px]",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
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

FormTextarea.displayName = "FormTextarea";
export default FormTextarea;
