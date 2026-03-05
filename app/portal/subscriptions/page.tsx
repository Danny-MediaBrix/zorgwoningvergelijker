"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, X, Check } from "lucide-react";

type Selectie = {
  id: string;
  woningtypeSlug: string;
  createdAt: string;
};

const WONINGTYPEN = [
  { slug: "tiny-house", naam: "Tiny House" },
  { slug: "micro-woning", naam: "Micro-woning" },
  { slug: "mantelzorgwoning", naam: "Mantelzorgwoning" },
  { slug: "kangoeroewoning", naam: "Kangoeroewoning" },
  { slug: "chalet", naam: "Chalet" },
  { slug: "lodge", naam: "Lodge" },
  { slug: "vakantiebungalow", naam: "Vakantiebungalow" },
  { slug: "prefab-woning", naam: "Prefab Woning" },
  { slug: "systeemwoning", naam: "Systeemwoning" },
  { slug: "flexwoning", naam: "Flexwoning" },
  { slug: "containerwoning", naam: "Containerwoning" },
  { slug: "woonunit", naam: "Woonunit" },
  { slug: "tuinkamer", naam: "Tuinkamer" },
  { slug: "modulaire-aanbouw", naam: "Modulaire Aanbouw" },
];

export default function WoningtypenPage() {
  const [selecties, setSelecties] = useState<Selectie[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetchSelecties();
  }, []);

  async function fetchSelecties() {
    try {
      const res = await fetch("/api/portal/subscriptions");
      if (res.ok) {
        const data = await res.json();
        setSelecties(data.selecties || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function toggleWoningtype(slug: string) {
    setToggling(slug);
    const isActive = activeSlugs.has(slug);

    try {
      if (isActive) {
        const res = await fetch(`/api/portal/subscriptions?woningtypeSlug=${slug}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setSelecties((prev) => prev.filter((s) => s.woningtypeSlug !== slug));
        }
      } else {
        const res = await fetch("/api/portal/subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ woningtypeSlug: slug }),
        });
        if (res.ok) {
          await fetchSelecties();
        }
      }
    } catch {
      // silently fail
    } finally {
      setToggling(null);
    }
  }

  const activeSlugs = new Set(selecties.map((s) => s.woningtypeSlug));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-2">Woningtypen</h1>
      <p className="text-muted text-sm mb-6">
        Selecteer bij welke woningtypen je als aanbieder vermeld wilt worden. Dit is gratis en onderdeel van je profiel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {WONINGTYPEN.map((wt) => {
          const isActive = activeSlugs.has(wt.slug);
          const isToggling = toggling === wt.slug;
          return (
            <div
              key={wt.slug}
              className={`bg-white rounded-xl border p-4 flex items-center justify-between ${
                isActive ? "border-primary/30 bg-primary-50" : "border-gray-200"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-dark">{wt.naam}</p>
                {isActive && (
                  <p className="text-xs text-green-600 mt-0.5">Actief</p>
                )}
              </div>
              <button
                onClick={() => toggleWoningtype(wt.slug)}
                disabled={isToggling}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                  isActive
                    ? "text-gray-600 border border-gray-200 hover:text-accent hover:border-accent/30"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                {isToggling ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : isActive ? (
                  <X className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
                {isActive ? "Verwijderen" : "Toevoegen"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-primary-50 border border-primary/10 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-dark">Gratis onderdeel van je profiel</p>
            <p className="text-xs text-muted mt-1">
              Woningtype-selecties zijn gratis. Je wordt als aanbieder getoond op de pagina&apos;s van de door jou geselecteerde woningtypen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
