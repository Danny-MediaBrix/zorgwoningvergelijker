"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OccasionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function OccasionPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OccasionPaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers to show
  const pages: (number | "...")[] = [];
  const delta = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Paginatie" className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-11 h-11 rounded-xl border transition-colors",
          currentPage <= 1
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary hover:border-primary/20"
        )}
        aria-label="Vorige pagina"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex items-center justify-center w-11 h-11 text-body-sm text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex items-center justify-center min-w-[44px] h-11 rounded-xl text-body-sm font-medium transition-colors",
              page === currentPage
                ? "bg-primary text-white shadow-sm"
                : "border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary hover:border-primary/20"
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-11 h-11 rounded-xl border transition-colors",
          currentPage >= totalPages
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary hover:border-primary/20"
        )}
        aria-label="Volgende pagina"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
