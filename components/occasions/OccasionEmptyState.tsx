"use client";

import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function OccasionEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
        <Search className="w-7 h-7 text-primary" />
      </div>

      <h3 className="text-heading-2 font-heading font-semibold text-dark mb-2">
        Geen occasions gevonden
      </h3>
      <p className="text-body text-gray-600 max-w-md mb-6">
        Er zijn momenteel geen tweedehands woningen die aan je filters voldoen.
        Pas je zoekcriteria aan of bekijk onze configurator voor een nieuwe woning op maat.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/occasions"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-dark font-semibold text-body-sm rounded-xl hover:bg-gray-50 transition-colors min-h-[44px]"
        >
          Wis alle filters
        </Link>
        <Link
          href="/configurator"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-800 text-white font-semibold text-body-sm rounded-xl transition-colors min-h-[44px]"
        >
          Start configurator
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
