"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";

type OccasionRow = {
  id: string;
  titel: string;
  woningtype: string | null;
  prijs: number | null;
  locatie: string | null;
  status: string;
  bedrijfsnaam: string;
  createdAt: string;
};

export default function AdminOccasionsPage() {
  const [occasions, setOccasions] = useState<OccasionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOccasions();
  }, []);

  async function fetchOccasions() {
    try {
      const res = await fetch("/api/admin/occasions");
      const data = await res.json();
      setOccasions(data.occasions || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je deze occasion wilt verwijderen?")) return;
    try {
      await fetch(`/api/admin/occasions/${id}`, { method: "DELETE" });
      setOccasions((prev) => prev.filter((o) => o.id !== id));
    } catch {
      // silently fail
    }
  }

  function formatPrice(cents: number | null) {
    if (cents === null || cents === undefined) return "Op aanvraag";
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
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Occasions (aanbieder)</h1>

      {occasions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted">Geen aanbieder-occasions gevonden.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Titel</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Aanbieder</th>
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
                  <td className="px-4 py-3 text-sm text-muted">{occ.bedrijfsnaam}</td>
                  <td className="px-4 py-3 text-sm text-muted">{occ.woningtype || "-"}</td>
                  <td className="px-4 py-3 text-sm font-heading tabular-nums text-dark">{formatPrice(occ.prijs)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      occ.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {occ.status === "active" ? "Actief" : occ.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(occ.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
