"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, ArrowLeft, Trash2 } from "lucide-react";

type AanbiederDetail = {
  id: string;
  slug: string;
  bedrijfsnaam: string;
  beschrijving: string | null;
  logoUrl: string | null;
  vestigingsplaats: string | null;
  provincie: string | null;
  werkgebied: string | null;
  website: string | null;
  telefoon: string | null;
  contactEmail: string | null;
  reviewLink: string | null;
  reviewScore: number | null;
  reviewCount: number | null;
  status: string;
  rejectionReason: string | null;
  email: string;
  createdAt: string;
  approvedAt: string | null;
  certificaten: { id: string; naam: string; bewijsUrl: string }[];
  portfolio: { id: string; titel: string; afbeeldingUrl: string }[];
  woningtypeSelecties: { woningtypeSlug: string }[];
  subscription: { id: string; status: string; startedAt: string } | null;
};

export default function AdminAanbiederDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [aanbieder, setAanbieder] = useState<AanbiederDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    fetchAanbieder();
  }, [id]);

  async function fetchAanbieder() {
    try {
      const res = await fetch(`/api/admin/aanbieders/${id}`);
      if (res.ok) {
        const data = await res.json();
        setAanbieder(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove() {
    setActing(true);
    try {
      await fetch(`/api/admin/aanbieders/${id}/approve`, { method: "POST" });
      setAanbieder((prev) => prev ? { ...prev, status: "approved" } : prev);
    } catch {
      // silently fail
    } finally {
      setActing(false);
    }
  }

  async function handleReject() {
    setActing(true);
    try {
      await fetch(`/api/admin/aanbieders/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reden: rejectReason }),
      });
      setAanbieder((prev) => prev ? { ...prev, status: "rejected" } : prev);
      setShowRejectForm(false);
    } catch {
      // silently fail
    } finally {
      setActing(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Weet je zeker dat je deze aanbieder en het bijbehorende account wilt verwijderen? Dit kan niet ongedaan worden gemaakt.")) {
      return;
    }
    try {
      await fetch(`/api/admin/aanbieders/${id}`, { method: "DELETE" });
      router.push("/admin/aanbieders");
    } catch {
      // silently fail
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!aanbieder) {
    return <p className="text-muted py-20 text-center">Aanbieder niet gevonden.</p>;
  }

  return (
    <div>
      <button
        onClick={() => router.push("/admin/aanbieders")}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dark mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar overzicht
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">{aanbieder.bedrijfsnaam}</h1>
          <p className="text-sm text-muted">{aanbieder.email}</p>
        </div>

        {aanbieder.status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              disabled={acting}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              Goedkeuren
            </button>
            <button
              onClick={() => setShowRejectForm(true)}
              disabled={acting}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" />
              Afwijzen
            </button>
          </div>
        )}
      </div>

      {showRejectForm && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <h3 className="font-heading text-lg font-semibold text-red-800 mb-3">Reden van afwijzing</h3>
          <textarea
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-red-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-red-200 mb-3 resize-none"
            placeholder="Optioneel: geef een reden op..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleReject}
              disabled={acting}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              Bevestig afwijzing
            </button>
            <button
              onClick={() => setShowRejectForm(false)}
              className="px-4 py-2 rounded-lg text-sm text-muted hover:text-dark border border-gray-200"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Profiel</h2>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-muted">Status</dt><dd className="font-medium text-dark capitalize">{aanbieder.status}</dd></div>
            <div><dt className="text-muted">Vestiging</dt><dd className="text-dark">{aanbieder.vestigingsplaats || "-"}</dd></div>
            <div><dt className="text-muted">Provincie</dt><dd className="text-dark">{aanbieder.provincie || "-"}</dd></div>
            <div><dt className="text-muted">Website</dt><dd className="text-dark">{aanbieder.website || "-"}</dd></div>
            <div><dt className="text-muted">Telefoon</dt><dd className="text-dark">{aanbieder.telefoon || "-"}</dd></div>
            <div><dt className="text-muted">Werkgebied</dt><dd className="text-dark">{aanbieder.werkgebied ? (() => { try { return JSON.parse(aanbieder.werkgebied!).join(", "); } catch { return "-"; } })() : "-"}</dd></div>
          </dl>
          {aanbieder.beschrijving && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-muted">{aanbieder.beschrijving}</p>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Overzicht</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted">Reviews</dt>
              <dd className="text-dark">
                {aanbieder.reviewScore ? `${aanbieder.reviewScore / 10}/5 (${aanbieder.reviewCount} reviews)` : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Certificaten</dt>
              <dd className="text-dark">{aanbieder.certificaten.length}</dd>
            </div>
            <div>
              <dt className="text-muted">Portfolio items</dt>
              <dd className="text-dark">{aanbieder.portfolio.length}</dd>
            </div>
            <div>
              <dt className="text-muted">Woningtypen</dt>
              <dd className="text-dark">{aanbieder.woningtypeSelecties.length} geselecteerd</dd>
            </div>
            <div>
              <dt className="text-muted">Abonnement</dt>
              <dd className="text-dark">{aanbieder.subscription?.status === "active" ? "Actief" : "Niet actief"}</dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Danger zone */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-heading text-lg font-semibold text-red-800 mb-2">Gevaarzone</h3>
        <p className="text-sm text-red-700 mb-4">Verwijder deze aanbieder en het bijbehorende account permanent.</p>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Aanbieder verwijderen
        </button>
      </div>
    </div>
  );
}
