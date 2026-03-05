import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "accent" | "accent-solid" | "gray" | "success" | "white";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-50 text-primary-700 ring-1 ring-primary/10",
  secondary: "bg-primary-50/60 text-primary",
  accent: "bg-accent-50 text-accent-600 font-semibold ring-1 ring-accent/10",
  "accent-solid": "bg-accent text-white font-semibold",
  gray: "bg-gray-100 text-gray-600",
  success: "bg-green-50 text-green-700 ring-1 ring-green-600/10",
  white: "bg-white/15 text-white ring-1 ring-white/20",
};

export default function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-lg text-caption font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
