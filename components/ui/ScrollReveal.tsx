"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealPreset = "fade-up" | "fade-scale" | "fade-blur" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation preset */
  preset?: RevealPreset;
  /** Delay in seconds (e.g. 0.1 for stagger) */
  delay?: number;
  /** Render as different element */
  as?: React.ElementType;
}

const presets: Record<RevealPreset, { opacity: number; transform: string; filter?: string; duration: number; easing: string }> = {
  "fade-up":     { opacity: 0, transform: "translateY(24px)",                  duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  "fade-scale":  { opacity: 0, transform: "scale(0.96) translateY(10px)",      duration: 600, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  "fade-blur":   { opacity: 0, transform: "translateY(12px)", filter: "blur(6px)", duration: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  "slide-left":  { opacity: 0, transform: "translateX(-30px)",                 duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  "slide-right": { opacity: 0, transform: "translateX(30px)",                  duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
};

// useLayoutEffect on client, no-op on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScrollReveal({
  children,
  className,
  preset = "fade-up",
  delay = 0,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const p = presets[preset];

  // Runs before browser paint — prevents flash
  useIsomorphicLayoutEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "-30px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transitionProps = [
    `opacity ${p.duration}ms ease ${delay}s`,
    `transform ${p.duration}ms ${p.easing} ${delay}s`,
  ];
  if (p.filter) {
    transitionProps.push(`filter ${p.duration}ms ${p.easing} ${delay}s`);
  }

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={
        !isReady
          ? // SSR & before hydration: fully visible, no inline style needed
            undefined
          : isVisible
          ? {
              opacity: 1,
              transform: "none",
              filter: "none",
              transition: transitionProps.join(", "),
            }
          : {
              opacity: 0,
              transform: p.transform,
              ...(p.filter ? { filter: p.filter } : {}),
              transition: "none",
            }
      }
    >
      {children}
    </Component>
  );
}
