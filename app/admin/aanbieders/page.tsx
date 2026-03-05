"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";

type AanbiederRow = {
  id: string;
  slug: string;
  bedrijfsnaam: string;
  vestigingsplaats: string | null;
  status: string;
  email: string;
  createdAt: string;
};

const statusConfig: Record<string, { label: string; icon: typeof Clock; cls: string }> = {
  pending: { label: "In behandeling", icon: Clock, cls: "bg-amber-50 text-amber-700" },
  approved: { label: "Goedgekeurd", icon: CheckCircle2, cls: "bg-green-50 text-green-700" },
  rejected: { label: "Afgewezen", icon: XCircle, cls: "bg-red-50 text-red-700" },
};

export default function AdminAanbiedersPage() {
  const [aanbieders, setAanbieders] = useState<AanbiederRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAanbieders();
  }, [filter]);

  async function fetchAanbieders() {
    setLoading(true);
    try {
      const url = filter === "all"
        ? "/api/admin/aanbieders"
        : `/api/admin/aanbieders?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setAanbieders(data.aanbieders || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Aanbieders</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { value: "all", label: "Alle" },
          { value: "pending", label: "In behandeling" },
          { value: "approved", label: "Goedgekeurd" },
          { value: "rejected", label: "Afgewezen" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-muted hover:text-dark hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : aanbieders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted">Geen aanbieders gevonden.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Bedrijf</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">E-mail</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Vestiging</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Aangemeld</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {aanbieders.map((a) => {
                const status = statusConfig[a.status] || statusConfig.pending;
                const Icon = status.icon;
                return (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/aanbieders/${a.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {a.bedrijfsnaam}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">{a.email}</td>
                    <td className="px-4 py-3 text-sm text-muted">{a.vestigingsplaats || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${status.cls}`}>
                        <Icon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-subtle">{formatDate(a.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
