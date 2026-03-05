"use client";

import Image from "next/image";
import { ExternalLink, MapPin, Maximize2, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { OccasionListing } from "@/lib/occasions/types";
import { woningtypeNaamMap } from "@/lib/woningtypen-slim";
import { CONDITION_LABELS } from "@/lib/occasions/constants";

function formatPrice(priceCents: number): string {
  const euros = priceCents / 100;
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros);
}

function getSourceLabel(source: string, aanbiederNaam?: string): string {
  if (source === "aanbieder" && aanbiederNaam) return aanbiederNaam;
  const map: Record<string, string> = {
    marktplaats: "Marktplaats",
    tinyfindy: "TinyFindy",
    stekelbos: "Stekelbos",
    kuipercaravans: "Kuiper Caravans",
    unitdirekt: "UnitDirekt",
    aanbieder: "Aanbieder",
  };
  return map[source] || source;
}

interface OccasionCardProps {
  listing: OccasionListing;
  priority?: boolean;
  className?: string;
}

export default function OccasionCard({ listing, priority = false, className }: OccasionCardProps) {
  const woningtypeNaam = listing.woningtype
    ? woningtypeNaamMap.get(listing.woningtype) ?? null
    : null;

  const isAanbieder = listing.isAanbieder === true;
  const cardHref = isAanbieder && listing.aanbiederSlug
    ? `/aanbieders/${listing.aanbiederSlug}`
    : listing.sourceUrl;
  const isExternal = !isAanbieder;
  const hasImage = listing.images.length > 0;
  const hasPriceValue = listing.price != null;
  const priceLabel = listing.priceLabel && listing.priceLabel !== "Prijs op aanvraag"
    ? listing.priceLabel
    : null;

  return (
    <a
      href={cardHref}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex flex-col bg-white rounded-2xl shadow-card border border-gray-200/80",
        "hover:shadow-card-hover hover:-translate-y-1",
        "transition-all duration-300 ease-premium",
        "overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        listing.isAanbieder && "ring-2 ring-primary/20",
        className
      )}
    >
      {/* Afbeelding */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {hasImage ? (
          <Image
            src={listing.images[0]}
            alt={`${listing.title} - tweedehands modulaire woning te koop`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        ) : (
          <PlaceholderImage
            woningSlug={listing.woningtype || undefined}
            text={woningtypeNaam ?? undefined}
            className="w-full h-full"
            aspectRatio="video"
          />
        )}

        {/* Subtiele gradient onderaan */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Woningtype badge */}
        {woningtypeNaam && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-caption font-semibold bg-white text-dark shadow-sm">
              {woningtypeNaam}
            </span>
          </div>
        )}

        {/* Aanbieder badge */}
        {listing.isAanbieder && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-caption font-semibold bg-primary text-white shadow-sm">
              Aanbieder
            </span>
          </div>
        )}

        {/* Hover arrow (hidden when aanbieder badge is shown) */}
        <div className={cn(
          "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          listing.isAanbieder && "hidden"
        )}>
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white shadow-md">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">

        {/* Prijs sectie */}
        <div className="mb-3">
          {hasPriceValue ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-[0.8125rem] font-medium text-primary/70 tracking-wide">
                EUR
              </span>
              <span className="text-heading-2 font-heading font-bold text-dark tabular-nums tracking-tight">
                {formatPrice(listing.price!)}
              </span>
            </div>
          ) : (
            <span className="text-body font-heading font-semibold text-gray-600">
              Prijs op aanvraag
            </span>
          )}
          {priceLabel && hasPriceValue && (
            <span className="text-caption text-gray-400 font-medium mt-0.5 block">
              {priceLabel}
            </span>
          )}
        </div>

        {/* Titel */}
        <h3 className="text-body font-heading font-semibold text-dark line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {listing.title}
        </h3>

        {/* Locatie */}
        {(listing.location || listing.province) && (
          <p className="flex items-center gap-1.5 text-body-sm text-gray-600 mt-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <span>
              {[listing.location, listing.province].filter(Boolean).join(", ")}
            </span>
          </p>
        )}

        {/* Specs */}
        <div className="flex items-center gap-4 mt-auto pt-4">
          {listing.surfaceM2 && (
            <span className="flex items-center gap-1.5 text-body-sm text-gray-600">
              <Maximize2 className="w-3.5 h-3.5 text-primary/60" />
              <span className="font-medium">{listing.surfaceM2} m²</span>
            </span>
          )}
          {listing.buildYear && (
            <span className="flex items-center gap-1.5 text-body-sm text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              <span className="font-medium">Bj. {listing.buildYear}</span>
            </span>
          )}
          {listing.condition && (
            <span className="text-body-sm text-gray-600 ml-auto">
              {CONDITION_LABELS[listing.condition] || listing.condition}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <span className="text-caption text-gray-400">
            via {getSourceLabel(listing.source, listing.aanbiederNaam)}
          </span>
          <span className="flex items-center gap-1 text-caption font-medium text-primary group-hover:gap-1.5 transition-all duration-200">
            {isAanbieder ? "Bekijk aanbieder" : "Bekijk"}
            {isExternal && <ExternalLink className="w-3 h-3" />}
            {!isExternal && <ArrowUpRight className="w-3 h-3" />}
          </span>
        </div>
      </div>
    </a>
  );
}
