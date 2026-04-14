"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type AanbiederOption = {
  id: string;
  bedrijfsnaam: string;
  vestigingsplaats: string | null;
};

const documentTypes = [
  { value: "contract", label: "Samenwerkingsovereenkomst" },
  { value: "verwerkersovereenkomst", label: "Verwerkersovereenkomst" },
  { value: "addendum", label: "Addendum" },
  { value: "overig", label: "Overig" },
];

export default function AdminDocumentNieuwPage() {
  const router = useRouter();
  const [aanbieders, setAanbieders] = useState<AanbiederOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedAanbieder, setSelectedAanbieder] = useState("");
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("contract");
  const [contactpersoon, setContactpersoon] = useState("");
  const [kvkNummer, setKvkNummer] = useState("");

  useEffect(() => {
    fetchAanbieders();
  }, []);

  async function fetchAanbieders() {
    try {
      const res = await fetch("/api/admin/aanbieders?status=approved");
      const data = await res.json();
      setAanbieders(data.aanbieders || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  const selectedAanbiederData = aanbieders.find((a) => a.id === selectedAanbieder);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAanbieder || !title || !contactpersoon) return;

    setSubmitting(true);
    setError(null);

    try {
      const datum = new Date().toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const res = await fetch("/api/admin/signing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          documentType,
          aanbiederId: selectedAanbieder,
          templateId: "contract-aanbieder",
          templateVariables: {
            bedrijfsnaam: selectedAanbiederData?.bedrijfsnaam || "",
            contactpersoon,
            kvkNummer: kvkNummer || undefined,
            vestigingsplaats: selectedAanbiederData?.vestigingsplaats || undefined,
            datum,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Er ging iets mis.");
      }

      router.push(`/admin/documenten/${data.document.documentUid}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin/documenten"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-dark mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar overzicht
      </Link>

      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Nieuw document</h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
          {/* Aanbieder selectie */}
          <div>
            <label htmlFor="aanbieder" className="block text-sm font-medium text-dark mb-1.5">
              Aanbieder <span className="text-red-500">*</span>
            </label>
            <select
              id="aanbieder"
              value={selectedAanbieder}
              onChange={(e) => setSelectedAanbieder(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
              required
            >
              <option value="">Selecteer een aanbieder</option>
              {aanbieders.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.bedrijfsnaam}{a.vestigingsplaats ? ` — ${a.vestigingsplaats}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Document type */}
          <div>
            <label htmlFor="docType" className="block text-sm font-medium text-dark mb-1.5">
              Type document <span className="text-red-500">*</span>
            </label>
            <select
              id="docType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
            >
              {documentTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Titel */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark mb-1.5">
              Titel <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bijv. Samenwerkingsovereenkomst 2026"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          {/* Contactpersoon */}
          <div>
            <label htmlFor="contactpersoon" className="block text-sm font-medium text-dark mb-1.5">
              Contactpersoon bij aanbieder <span className="text-red-500">*</span>
            </label>
            <input
              id="contactpersoon"
              type="text"
              value={contactpersoon}
              onChange={(e) => setContactpersoon(e.target.value)}
              placeholder="Naam van de ondertekenaar"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          {/* KvK-nummer */}
          <div>
            <label htmlFor="kvk" className="block text-sm font-medium text-dark mb-1.5">
              KvK-nummer <span className="text-xs text-muted font-normal">(optioneel)</span>
            </label>
            <input
              id="kvk"
              type="text"
              value={kvkNummer}
              onChange={(e) => setKvkNummer(e.target.value)}
              placeholder="12345678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !selectedAanbieder || !title || !contactpersoon}
            className="w-full px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Document aanmaken...
              </>
            ) : (
              "Document aanmaken"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
