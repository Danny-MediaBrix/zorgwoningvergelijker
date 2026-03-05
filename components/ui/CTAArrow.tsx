import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAArrowProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Animated CTA arrow icon with translucent circle background.
 * Place inside a parent with `group` class for hover animation.
 *
 * - "md": large CTA buttons (hero, banners, section CTAs)
 * - "sm": compact buttons (header, footer, mobile CTA)
 */
export default function CTAArrow({ size = "md", className }: CTAArrowProps) {
  if (size === "sm") {
    return (
      <ArrowRight
        className={cn(
          "w-4 h-4 transition-transform duration-500 ease-spring group-hover:translate-x-1",
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "relative w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0",
        "transition-all duration-500 ease-spring",
        "group-hover:translate-x-1 group-hover:bg-white/25",
        className
      )}
    >
      <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-spring group-hover:translate-x-0.5" />
    </span>
  );
}
