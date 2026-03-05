"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a" | "link";
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-white",
    "shadow-md shadow-primary/15",
    "hover:shadow-lg hover:shadow-accent/20",
    "active:shadow-sm",
  ].join(" "),
  secondary: [
    "border border-primary/15 text-primary bg-primary-50/60",
    "hover:bg-primary hover:text-white hover:border-primary",
    "hover:shadow-md hover:shadow-primary/15",
    "active:shadow-sm",
  ].join(" "),
  ghost: [
    "text-gray-600",
    "hover:text-dark hover:bg-gray-100",
    "active:bg-gray-200",
  ].join(" "),
  accent: [
    "bg-accent text-white",
    "shadow-md shadow-accent/15",
    "hover:shadow-lg hover:shadow-primary/20",
    "active:shadow-sm",
  ].join(" "),
};

// Flow circle: primary→accent, accent→primary
const flowCircleColor: Partial<Record<ButtonVariant, string>> = {
  primary: "bg-accent",
  accent: "bg-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-body-sm gap-2 rounded-xl",
  md: "px-6 py-3 text-body gap-2.5 rounded-xl",
  lg: "px-8 py-3.5 text-body gap-2.5 rounded-2xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      disabled,
      className,
      children,
      as = "button",
      href,
      ...props
    },
    ref
  ) => {
    const hasFlow = variant === "primary" || variant === "accent";
    const circleColor = flowCircleColor[variant];

    const classes = cn(
      "group inline-flex items-center justify-center",
      "font-semibold tracking-[-0.01em]",
      hasFlow ? "overflow-hidden relative" : "",
      "transition-all duration-200 ease-premium",
      "hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.97]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none",
      "cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    const flowCircle = hasFlow && circleColor && (
      <span className={cn("flow-circle", circleColor)} />
    );

    const z = hasFlow ? "relative z-10" : "";

    const hasFlowArrows = hasFlow && iconRight && !loading;

    const content = (
      <>
        {flowCircle}
        {/* Arrow sliding in from left (flow buttons with iconRight only) */}
        {hasFlowArrows && (
          <span className={cn("flow-arrow-in", size === "sm" && "flow-arrow-in-sm")}>
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
        {loading ? (
          <Loader2 className={cn("w-5 h-5 animate-spin", z)} />
        ) : (
          icon && <span className={cn("flex-shrink-0", z)}>{icon}</span>
        )}
        <span className={cn(hasFlowArrows ? `flow-text ${size === "sm" ? "flow-text-sm" : ""} relative z-10` : z || undefined)}>
          {children}
        </span>
        {iconRight && !loading && (
          <span className={cn("flex-shrink-0", z, hasFlow ? "flow-arrow-out" : "transition-transform duration-200 group-hover:translate-x-0.5")}>
            {iconRight}
          </span>
        )}
      </>
    );

    if (as === "link" && href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    if (as === "a" && href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
