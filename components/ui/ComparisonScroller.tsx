"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonScrollerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ComparisonScroller({
  children,
  className,
}: ComparisonScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // touch scroll is native
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    startScroll.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) {
      hasDragged.current = true;
      scrollRef.current.scrollLeft = startScroll.current - dx;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Prevent link clicks when user was dragging
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  }, []);

  const scroll = useCallback((direction: number) => {
    scrollRef.current?.scrollBy({
      left: direction * 220,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={cn("relative group/scroller", className)}>
      {/* Left fade + arrow */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 z-30 w-20 pointer-events-none transition-opacity duration-300",
          "bg-gradient-to-r from-[var(--scroller-bg,#F5F3EF)] via-[var(--scroller-bg,#F5F3EF)]/60 to-transparent",
          canScrollLeft ? "opacity-100" : "opacity-0"
        )}
      />
      <button
        onClick={() => scroll(-1)}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-500 hover:text-primary border border-gray-100 transition-all duration-200",
          canScrollLeft
            ? "opacity-0 group-hover/scroller:opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll naar links"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>

      {/* Right fade + arrow */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 z-30 w-20 pointer-events-none transition-opacity duration-300",
          "bg-gradient-to-l from-[var(--scroller-bg,#F5F3EF)] via-[var(--scroller-bg,#F5F3EF)]/60 to-transparent",
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
      />
      <button
        onClick={() => scroll(1)}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-500 hover:text-primary border border-gray-100 transition-all duration-200",
          canScrollRight
            ? "opacity-0 group-hover/scroller:opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll naar rechts"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
