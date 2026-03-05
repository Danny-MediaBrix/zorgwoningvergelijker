"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroRevealProps {
  children: React.ReactNode;
  /** Delay in seconds */
  delay?: number;
  className?: string;
  /** Variant: "text" for blur+translate, "image" for scale+translate */
  variant?: "text" | "image";
}

// useLayoutEffect on client, no-op on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HeroReveal({
  children,
  delay = 0,
  className,
  variant = "text",
}: HeroRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set hidden state before paint
    if (variant === "image") {
      el.style.opacity = "0.001";
      el.style.transform = "translateY(20px) scale(0.98)";
    } else {
      el.style.opacity = "0.001";
      el.style.transform = "translateY(10px)";
      el.style.filter = "blur(4px)";
    }

    // Double-rAF: ensures hidden state is painted before transition starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el) return;

        if (variant === "image") {
          el.style.transition = `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        } else {
          el.style.transition = `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        }

        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
    });
  }, [delay, variant]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
