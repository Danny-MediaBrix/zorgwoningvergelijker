"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Trash2,
  ExternalLink,
  Download,
  Star,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
} from "lucide-react";

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
  updatedAt: string;
  certificaten: { id: string; naam: string; bewijsUrl: string }[];
  portfolio: { id: string; titel: string; afbeeldingUrl: string; woningType: string | null; locatie: string | null }[];
  woningtypeSelecties: { woningtypeSlug: string }[];
  subscription: { id: string; status: string; startedAt: string } | null;
};

const statusConfig: Record<string, { label: string; cls: string }> = {
  pending: { label: "In behandeling", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  approved: { label: "Goedgekeurd", cls: "bg-green-50 text-green-700 border-green-200" },
  rejected: { label: "Afgewezen", cls: "bg-red-50 text-red-700 border-red-200" },
};

const woningtypeLabels: Record<string, string> = {
  "tiny-house": "Tiny House",
  "mantelzorgwoning": "Mantelzorgwoning",
  "modulaire-woning": "Modulaire Woning",
  "kangoeroewoning": "Kangoeroewoning",
  "systeemwoning": "Systeemwoning",
  "flexwoning": "Flexwoning",
  "containerwoning": "Containerwoning",
  "modulaire-aanbouw": "Modulaire Aanbouw",
  "chalets": "Chalet",
  "micro-woning": "Micro Woning",
  "noodwoning": "Noodwoning",
  "recreatiewoning": "Recreatiewoning",
  "zorgunit": "Zorgunit",
  "prefab-woning": "Prefab Woning",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseWerkgebied(json: string | null): string[] {
  if (!json) return [];
  try { return JSON.parse(json); } catch { return []; }
}

export default function AdminAanbiederDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [aanbieder, setAanbieder] = useState<AanbiederDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
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
      setMessage({ type: "error", text: "Kon aanbieder niet laden." });
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove() {
    setActing(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/aanbieders/${id}/approve`, { method: "POST" });
      if (!res.ok) throw new Error("Goedkeuren mislukt.");
      setMessage({ type: "success", text: "Aanbieder goedgekeurd." });
      fetchAanbieder();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Er ging iets mis." });
    } finally {
      setActing(false);
    }
  }

  async function handleReject() {
    setActing(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/aanbieders/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reden: rejectReason }),
      });
      if (!res.ok) throw new Error("Afwijzen mislukt.");
      setMessage({ type: "success", text: "Aanbieder afgewezen." });
      setShowRejectForm(false);
      fetchAanbieder();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Er ging iets mis." });
    } finally {
      setActing(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Weet je zeker dat je deze aanbieder en het bijbehorende account wilt verwijderen? Dit kan niet ongedaan worden gemaakt.")) {
      return;
    }
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/aanbieders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Verwijderen mislukt.");
      router.push("/admin/aanbieders");
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Er ging iets mis." });
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

  const status = statusConfig[aanbieder.status] || statusConfig.pending;
  const werkgebied = parseWerkgebied(aanbieder.werkgebied);

  return (
    <div>
      <button
        onClick={() => router.push("/admin/aanbieders")}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dark mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar overzicht
      </button>

      {/* Message */}
      {message && (
        <div className={`rounded-lg p-3 mb-6 text-sm ${
          message.type === "success"
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Header with logo */}
      <div className="flex items-start gap-4 mb-6">
        {aanbieder.logoUrl ? (
          <Image
            src={aanbieder.logoUrl}
            alt={aanbieder.bedrijfsnaam}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl border border-gray-200 object-contain bg-white"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-gray-300" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-dark">{aanbieder.bedrijfsnaam}</h1>
              <p className="text-sm text-muted mt-0.5">/{aanbieder.slug}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${status.cls}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {aanbieder.status === "pending" && (
        <div className="flex gap-2 mb-6">
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

      {/* Rejection reason (for already rejected) */}
      {aanbieder.status === "rejected" && aanbieder.rejectionReason && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-red-800 mb-1">Reden van afwijzing</p>
          <p className="text-sm text-red-700">{aanbieder.rejectionReason}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2 cols wide */}
        <div className="lg:col-span-2 space-y-6">

          {/* Contactgegevens */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-dark mb-4">Contactgegevens</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Account e-mail</p>
                  <a href={`mailto:${aanbieder.email}`} className="text-primary hover:underline">{aanbieder.email}</a>
                </div>
              </div>
              {aanbieder.contactEmail && aanbieder.contactEmail !== aanbieder.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted">Contact e-mail</p>
                    <a href={`mailto:${aanbieder.contactEmail}`} className="text-primary hover:underline">{aanbieder.contactEmail}</a>
                  </div>
                </div>
              )}
              {aanbieder.telefoon && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted">Telefoon</p>
                    <a href={`tel:${aanbieder.telefoon}`} className="text-dark hover:text-primary">{aanbieder.telefoon}</a>
                  </div>
                </div>
              )}
              {aanbieder.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted">Website</p>
                    <a
                      href={aanbieder.website.startsWith("http") ? aanbieder.website : `https://${aanbieder.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {aanbieder.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Vestigingsplaats</p>
                  <p className="text-dark">
                    {[aanbieder.vestigingsplaats, aanbieder.provincie].filter(Boolean).join(", ") || "-"}
                  </p>
                </div>
              </div>
              {werkgebied.length > 0 && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted">Werkgebied</p>
                    <p className="text-dark">{werkgebied.join(", ")}</p>
                  </div>
                </div>
              )}
            </div>
            {aanbieder.beschrijving && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-muted mb-1">Beschrijving</p>
                <p className="text-sm text-dark whitespace-pre-line">{aanbieder.beschrijving}</p>
              </div>
            )}
          </section>

          {/* Reviews */}
          {(aanbieder.reviewScore || aanbieder.reviewLink) && (
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-dark mb-4">Reviews</h2>
              <div className="flex items-center gap-4">
                {aanbieder.reviewScore != null && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-heading text-xl font-bold text-dark">
                      {(aanbieder.reviewScore / 10).toFixed(1)}
                    </span>
                    <span className="text-sm text-muted">/ 5</span>
                    {aanbieder.reviewCount != null && (
                      <span className="text-sm text-muted">({aanbieder.reviewCount} reviews)</span>
                    )}
                  </div>
                )}
                {aanbieder.reviewLink && (
                  <a
                    href={aanbieder.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Bron bekijken
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Certificaten */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-dark mb-4">
              Certificaten
              <span className="text-sm font-normal text-muted ml-2">({aanbieder.certificaten.length})</span>
            </h2>
            {aanbieder.certificaten.length === 0 ? (
              <p className="text-sm text-muted">Geen certificaten toegevoegd.</p>
            ) : (
              <div className="space-y-2">
                {aanbieder.certificaten.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-dark">{cert.naam}</span>
                    <a
                      href={cert.bewijsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Download className="w-3 h-3" />
                      Bekijken
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Portfolio */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-dark mb-4">
              Portfolio
              <span className="text-sm font-normal text-muted ml-2">({aanbieder.portfolio.length})</span>
            </h2>
            {aanbieder.portfolio.length === 0 ? (
              <p className="text-sm text-muted">Geen portfolio items toegevoegd.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {aanbieder.portfolio.map((item) => (
                  <a
                    key={item.id}
                    href={item.afbeeldingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <Image
                        src={item.afbeeldingUrl}
                        alt={item.titel}
                        width={300}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-xs font-medium text-dark mt-1.5 truncate">{item.titel}</p>
                    {(item.woningType || item.locatie) && (
                      <p className="text-xs text-muted truncate">
                        {[item.woningType, item.locatie].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column - sidebar */}
        <div className="space-y-6">

          {/* Status & Dates */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-dark">Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                <span className="text-muted">Aangemeld:</span>
                <span className="text-dark">{formatDate(aanbieder.createdAt)}</span>
              </div>
              {aanbieder.approvedAt && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-muted">Goedgekeurd:</span>
                  <span className="text-dark">{formatDate(aanbieder.approvedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                <span className="text-muted">Laatst bijgewerkt:</span>
                <span className="text-dark">{formatDateTime(aanbieder.updatedAt)}</span>
              </div>
            </div>
          </section>

          {/* Abonnement */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-dark">Abonnement</h3>
            {aanbieder.subscription ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Status</span>
                  <span className={`font-medium ${
                    aanbieder.subscription.status === "active" ? "text-green-700" : "text-red-700"
                  }`}>
                    {aanbieder.subscription.status === "active" ? "Actief" : aanbieder.subscription.status === "cancelled" ? "Opgezegd" : "Betaling mislukt"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Gestart</span>
                  <span className="text-dark">{formatDate(aanbieder.subscription.startedAt)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted">Geen abonnement.</p>
            )}
          </section>

          {/* Woningtypen */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-dark">
              Woningtypen
              <span className="text-xs font-normal text-muted ml-1">({aanbieder.woningtypeSelecties.length})</span>
            </h3>
            {aanbieder.woningtypeSelecties.length === 0 ? (
              <p className="text-sm text-muted">Geen woningtypen geselecteerd.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {aanbieder.woningtypeSelecties.map((s) => (
                  <span
                    key={s.woningtypeSlug}
                    className="inline-block px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs font-medium"
                  >
                    {woningtypeLabels[s.woningtypeSlug] || s.woningtypeSlug}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Danger zone */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Gevaarzone</h3>
            <p className="text-xs text-red-700 mb-3">Verwijder aanbieder en account permanent.</p>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Verwijderen
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
