"use client";

import { cn } from "@/lib/utils";
import OccasionCard from "./OccasionCard";
import OccasionEmptyState from "./OccasionEmptyState";
import type { OccasionListing } from "@/lib/occasions/types";

export type GridColumns = 1 | 2 | 3 | 4;

const gridClasses: Record<GridColumns, string> = {
  1: "grid grid-cols-1 max-w-2xl gap-5",
  2: "grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6",
  3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6",
  4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5",
};

interface OccasionGridProps {
  listings: OccasionListing[];
  isLoading?: boolean;
  columns?: GridColumns;
  className?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-200/80 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-gray-100 relative">
        <div className="absolute top-3 left-3 h-6 w-24 bg-gray-200/80 rounded-lg" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="h-6 bg-gray-100 rounded w-2/5 mb-1" />
        <div className="h-3 bg-gray-50 rounded w-1/4 mb-3" />
        <div className="h-5 bg-gray-100 rounded w-5/6 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mb-1.5" />
        <div className="h-4 bg-gray-50 rounded w-2/5 mt-1.5" />
        <div className="flex gap-4 mt-4 pt-4">
          <div className="h-4 bg-gray-100 rounded w-14" />
          <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <div className="h-3 bg-gray-50 rounded w-20" />
          <div className="h-3 bg-gray-50 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export default function OccasionGrid({ listings, isLoading, columns = 2, className }: OccasionGridProps) {
  // Only show full skeleton when loading with no existing listings
  if (isLoading && listings.length === 0) {
    return (
      <div className={cn(gridClasses[columns], className)}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && listings.length === 0) {
    return <OccasionEmptyState />;
  }

  return (
    <div className={cn("relative", gridClasses[columns], className)}>
      {/* Subtle fade when refreshing with existing cards visible */}
      {isLoading && (
        <div className="absolute inset-0 bg-page/60 z-10 rounded-2xl transition-opacity duration-200" />
      )}
      {listings.map((listing, index) => (
        <OccasionCard key={listing.id} listing={listing} priority={index < 4} />
      ))}
    </div>
  );
}
