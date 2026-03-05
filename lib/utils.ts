import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-xl",
        "text-display",
        "text-heading-1",
        "text-heading-2",
        "text-heading-3",
        "text-body-lg",
        "text-body",
        "text-body-sm",
        "text-caption",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceRange(laag: number, hoog: number): string {
  return `${formatPrice(laag)} - ${formatPrice(hoog)}`;
}

export function formatM2(m2: number): string {
  return `${m2} m²`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatDatum(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
