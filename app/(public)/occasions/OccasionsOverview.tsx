"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import OccasionHero from "@/components/occasions/OccasionHero";
import OccasionGrid, { type GridColumns } from "@/components/occasions/OccasionGrid";
import OccasionFilters from "@/components/occasions/OccasionFilters";
import OccasionFiltersMobile from "@/components/occasions/OccasionFiltersMobile";
import OccasionSortSelect from "@/components/occasions/OccasionSortSelect";
import OccasionColumnSelect from "@/components/occasions/OccasionColumnSelect";
import OccasionPagination from "@/components/occasions/OccasionPagination";
import OccasionFaqAccordion from "@/components/occasions/OccasionFaqAccordion";
import OccasionSeoCta from "@/components/occasions/OccasionSeoCta";
import type { OccasionListing, OccasionFilters as FiltersType, OccasionListingsResponse } from "@/lib/occasions/types";

export interface OccasionFaqItem {
  question: string;
  answer: string;
}

export interface OccasionsSeoContent {
  title: string;
  content: React.ReactNode;
  faq?: OccasionFaqItem[];
}

interface OccasionsOverviewProps {
  initialWoningtype?: string;
  initialData?: OccasionListingsResponse;
  seoContent?: OccasionsSeoContent;
}

function parseFiltersFromParams(
  searchParams: URLSearchParams,
  initialWoningtype?: string
): FiltersType {
  const filters: FiltersType = {};
  if (initialWoningtype) filters.woningtype = initialWoningtype;
  else if (searchParams.get("woningtype")) filters.woningtype = searchParams.get("woningtype")!;
  if (searchParams.get("priceMin")) filters.priceMin = Number(searchParams.get("priceMin"));
  if (searchParams.get("priceMax")) filters.priceMax = Number(searchParams.get("priceMax"));
  if (searchParams.get("province")) filters.province = searchParams.get("province")!;
  if (searchParams.get("surfaceMin")) filters.surfaceMin = Number(searchParams.get("surfaceMin"));
  if (searchParams.get("surfaceMax")) filters.surfaceMax = Number(searchParams.get("surfaceMax"));
  if (searchParams.get("buildYearMin")) filters.buildYearMin = Number(searchParams.get("buildYearMin"));
  if (searchParams.get("condition")) filters.condition = searchParams.get("condition")!;
  if (searchParams.get("transport")) filters.transport = searchParams.get("transport")!;
  if (searchParams.get("sellerType")) filters.sellerType = searchParams.get("sellerType")!;
  if (searchParams.get("sort")) filters.sort = searchParams.get("sort")!;
  if (searchParams.get("page")) filters.page = Number(searchParams.get("page"));
  return filters;
}

export default function OccasionsOverview({ initialWoningtype, initialData, seoContent }: OccasionsOverviewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [columns, setColumns] = useState<GridColumns>(2);

  // Use initialData when available — no loading state on first render
  const [isLoading, setIsLoading] = useState(!initialData);
  const [listings, setListings] = useState<OccasionListing[]>(initialData?.listings ?? []);
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages ?? 0);
  const initialized = useRef(false);

  // Start with stable default — only initialWoningtype (from route param, safe for SSG)
  const [filters, setFilters] = useState<FiltersType>(
    initialWoningtype ? { woningtype: initialWoningtype } : {}
  );

  // After hydration: read URL search params and merge into filters
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const parsed = parseFiltersFromParams(searchParams, initialWoningtype);
    // Only update if search params actually add extra filters
    const hasExtraParams = Object.keys(parsed).some(
      (key) => key !== "woningtype" && parsed[key as keyof FiltersType] !== undefined
    );
    if (hasExtraParams) {
      setFilters(parsed);
    }
  }, [searchParams, initialWoningtype]);

  // Sync filters to URL — use ref to avoid dependency on router
  const routerRef = useRef(router);
  routerRef.current = router;

  const syncFiltersToUrl = useCallback(
    (newFilters: FiltersType) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && key !== "limit") {
          // Don't put woningtype in URL if it's the initial one from route
          if (key === "woningtype" && initialWoningtype) return;
          params.set(key, String(value));
        }
      });
      const basePath = initialWoningtype
        ? `/occasions/${initialWoningtype}`
        : "/occasions";
      const qs = params.toString();
      routerRef.current.replace(`${basePath}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [initialWoningtype]
  );

  // Fetch listings
  const fetchListings = useCallback(async (currentFilters: FiltersType) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.set(key, String(value));
        }
      });

      const response = await fetch(`/api/occasions?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setListings(data.listings);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch occasions:", err);
      setListings([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Track the last-fetched filters to avoid redundant fetches
  const lastFetchedFilters = useRef<string>(
    initialData ? JSON.stringify(initialWoningtype ? { woningtype: initialWoningtype } : {}) : ""
  );

  // Fetch on filter change — skip if filters haven't actually changed
  useEffect(() => {
    const key = JSON.stringify(filters);
    if (key === lastFetchedFilters.current) return;
    lastFetchedFilters.current = key;
    fetchListings(filters);
    syncFiltersToUrl(filters);
  }, [filters, fetchListings, syncFiltersToUrl]);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <OccasionHero
        woningtypeSlug={initialWoningtype}
        totalCount={total}
      />

      <div id="occasions-top" className="bg-page min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Toolbar: sort + mobile filter button */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-body-sm text-gray-600 hidden sm:block">
              {total} {total === 1 ? "resultaat" : "resultaten"}
            </p>

            <div className="flex items-center gap-3 ml-auto">
              <OccasionColumnSelect
                value={columns}
                onChange={setColumns}
              />
              <OccasionSortSelect
                value={filters.sort || "newest"}
                onChange={handleSortChange}
              />
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-body-sm font-medium text-dark hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Main layout: sidebar + grid */}
          <div className="flex gap-8">
            {/* Desktop filters */}
            <OccasionFilters
              filters={filters}
              onChange={handleFilterChange}
              resultCount={total}
              className="hidden lg:block"
            />

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <OccasionGrid
                listings={listings}
                isLoading={isLoading}
                columns={columns}
              />
              <OccasionPagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO content section */}
      {seoContent && (
        <section className="section-gray border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex gap-10">
              {/* Content + FAQ */}
              <div className="flex-1 min-w-0 max-w-3xl">
                <h2 className="font-heading font-semibold text-heading-2 tracking-tight text-dark mb-6">
                  {seoContent.title}
                </h2>
                <div className="prose-occasions text-body text-gray-600 leading-relaxed space-y-4">
                  {seoContent.content}
                </div>
                {seoContent.faq && seoContent.faq.length > 0 && (
                  <OccasionFaqAccordion items={seoContent.faq} />
                )}
              </div>

              {/* Sticky sidebar */}
              <OccasionSeoCta />
            </div>
          </div>
        </section>
      )}

      {/* Mobile filters drawer */}
      <OccasionFiltersMobile
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        resultCount={total}
      />
    </>
  );
}
