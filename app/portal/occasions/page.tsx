"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

type Occasion = {
  id: string;
  titel: string;
  woningtype: string | null;
  prijs: number | null;
  status: string;
  createdAt: string;
};

export default function OccasionsPortalPage() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOccasions();
  }, []);

  async function fetchOccasions() {
    try {
      const res = await fetch("/api/portal/occasions");
      if (res.ok) {
        const data = await res.json();
        setOccasions(data.occasions || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je deze occasion wilt verwijderen?")) return;

    try {
      const res = await fetch(`/api/portal/occasions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOccasions((prev) => prev.filter((o) => o.id !== id));
      }
    } catch {
      // silently fail
    }
  }

  function formatPrice(cents: number | null) {
    if (cents === null || cents === undefined) return "Prijs op aanvraag";
    return `€ ${(cents / 100).toLocaleString("nl-NL")}`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">Occasions</h1>
          <p className="text-muted text-sm mt-1">
            Plaats je beschikbare woningen als occasion op het platform.
          </p>
        </div>
        <Link
          href="/portal/occasions/nieuw"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nieuwe occasion
        </Link>
      </div>

      {occasions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted mb-4">Je hebt nog geen occasions geplaatst.</p>
          <Link
            href="/portal/occasions/nieuw"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Eerste occasion plaatsen
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Titel</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Prijs</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium text-muted px-4 py-3">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {occasions.map((occ) => (
                <tr key={occ.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-dark">{occ.titel}</td>
                  <td className="px-4 py-3 text-sm text-muted">{occ.woningtype || "-"}</td>
                  <td className="px-4 py-3 text-sm text-dark font-heading tabular-nums">
                    {formatPrice(occ.prijs)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        occ.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {occ.status === "active" ? "Actief" : "Inactief"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/portal/occasions/${occ.id}`}
                        className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(occ.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
