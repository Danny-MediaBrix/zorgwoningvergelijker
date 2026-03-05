import { ChevronDown } from "lucide-react";
import type { OccasionFaqItem } from "@/app/(public)/occasions/OccasionsOverview";

interface OccasionFaqAccordionProps {
  items: OccasionFaqItem[];
}

export default function OccasionFaqAccordion({ items }: OccasionFaqAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="font-heading font-semibold text-heading-2 tracking-tight text-dark mb-5">
        Veelgestelde vragen
      </h2>
      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
              <h3 className="font-heading font-semibold text-body text-dark group-hover:text-primary transition-colors duration-200 pr-2">
                {item.question}
              </h3>
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-5 pr-10">
              <p className="text-body-sm text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
