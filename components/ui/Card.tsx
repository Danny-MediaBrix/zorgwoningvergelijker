"use client";

import { cn } from "@/lib/utils";

type CardVariant = "default" | "outlined" | "highlighted" | "interactive";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
  accentTop?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white shadow-card border border-gray-200/80",
  outlined: "bg-white border border-gray-200/80",
  highlighted: "bg-white border-2 border-primary/30 shadow-card ring-1 ring-primary/5",
  interactive: "bg-white shadow-card border border-gray-200/80 hover:shadow-card-hover hover:-translate-y-1",
};

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  variant = "default",
  className,
  onClick,
  padding = "md",
  accentTop = false,
}: CardProps) {
  const isInteractive = !!onClick;

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300 ease-premium",
        variantStyles[variant],
        paddingStyles[padding],
        accentTop && "border-t-2 border-t-primary",
        isInteractive && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
        className
      )}
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
