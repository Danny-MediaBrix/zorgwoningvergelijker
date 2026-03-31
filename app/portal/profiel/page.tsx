"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, Save, X } from "lucide-react";
import Image from "next/image";

const PROVINCIES = [
  "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen",
  "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel",
  "Utrecht", "Zeeland", "Zuid-Holland",
];

type Profiel = {
  id: string;
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
};

export default function ProfielPage() {
  const [profiel, setProfiel] = useState<Profiel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    bedrijfsnaam: "",
    beschrijving: "",
    vestigingsplaats: "",
    provincie: "",
    werkgebied: [] as string[],
    website: "",
    telefoon: "",
    contactEmail: "",
    reviewLink: "",
    reviewScore: "",
    reviewCount: "",
  });

  useEffect(() => {
    fetchProfiel();
  }, []);

  async function fetchProfiel() {
    try {
      const res = await fetch("/api/portal/profiel");
      const data = await res.json();
      if (data.profiel) {
        const p = data.profiel;
        setProfiel(p);
        setForm({
          bedrijfsnaam: p.bedrijfsnaam || "",
          beschrijving: p.beschrijving || "",
          vestigingsplaats: p.vestigingsplaats || "",
          provincie: p.provincie || "",
          werkgebied: p.werkgebied ? (() => { try { return JSON.parse(p.werkgebied!); } catch { return []; } })() : [],
          website: p.website || "",
          telefoon: p.telefoon || "",
          contactEmail: p.contactEmail || "",
          reviewLink: p.reviewLink || "",
          reviewScore: p.reviewScore ? String(p.reviewScore / 10) : "",
          reviewCount: p.reviewCount ? String(p.reviewCount) : "",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Kon profiel niet laden." });
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleWerkgebied(provincie: string) {
    setForm((prev) => ({
      ...prev,
      werkgebied: prev.werkgebied.includes(provincie)
        ? prev.werkgebied.filter((p) => p !== provincie)
        : [...prev.werkgebied, provincie],
    }));
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "logos");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }

      // Logo URL opslaan in profiel
      const saveRes = await fetch("/api/portal/profiel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl: data.url }),
      });

      if (!saveRes.ok) {
        setMessage({ type: "error", text: "Logo geüpload maar opslaan mislukt. Probeer opnieuw." });
        return;
      }

      setProfiel((prev) => prev ? { ...prev, logoUrl: data.url } : prev);
      setMessage({ type: "success", text: "Logo geüpload." });
    } catch {
      setMessage({ type: "error", text: "Upload mislukt." });
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/portal/profiel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bedrijfsnaam: form.bedrijfsnaam,
          beschrijving: form.beschrijving || null,
          vestigingsplaats: form.vestigingsplaats || null,
          provincie: form.provincie || null,
          werkgebied: form.werkgebied,
          website: form.website || null,
          telefoon: form.telefoon || null,
          contactEmail: form.contactEmail || null,
          reviewLink: form.reviewLink || null,
          reviewScore: form.reviewScore ? Math.round(parseFloat(form.reviewScore) * 10) : null,
          reviewCount: form.reviewCount ? parseInt(form.reviewCount) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Opslaan mislukt." });
        return;
      }

      setMessage({ type: "success", text: "Profiel opgeslagen." });
    } catch {
      setMessage({ type: "error", text: "Er ging iets mis." });
    } finally {
      setSaving(false);
    }
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
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">
        Bedrijfsprofiel
      </h1>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 flex items-center justify-between ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <button onClick={() => setMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Logo */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Logo</h2>
          <div className="flex items-center gap-6">
            {profiel?.logoUrl ? (
              <Image
                src={profiel.logoUrl}
                alt="Bedrijfslogo"
                width={120}
                height={80}
                className="h-20 w-auto rounded-lg border border-gray-200 object-contain"
              />
            ) : (
              <div className="w-[120px] h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-subtle text-xs">
                Geen logo
              </div>
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-dark hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploaden..." : "Logo uploaden"}
              </button>
              <p className="text-xs text-subtle mt-1">JPG, PNG, WebP of AVIF. Max 5MB.</p>
            </div>
          </div>
        </section>

        {/* Bedrijfsgegevens */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Bedrijfsgegevens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Bedrijfsnaam *</label>
              <input
                type="text"
                required
                value={form.bedrijfsnaam}
                onChange={(e) => updateField("bedrijfsnaam", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Vestigingsplaats</label>
              <input
                type="text"
                value={form.vestigingsplaats}
                onChange={(e) => updateField("vestigingsplaats", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Provincie</label>
              <select
                value={form.provincie}
                onChange={(e) => updateField("provincie", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Selecteer...</option>
                {PROVINCIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Website</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Telefoon</label>
              <input
                type="tel"
                value={form.telefoon}
                onChange={(e) => updateField("telefoon", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Zakelijk e-mailadres</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => updateField("contactEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-dark mb-1.5">Beschrijving</label>
            <textarea
              rows={4}
              value={form.beschrijving}
              onChange={(e) => updateField("beschrijving", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Vertel over je bedrijf, specialiteiten en ervaring..."
            />
          </div>
        </section>

        {/* Werkgebied */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-2">Werkgebied</h2>
          <p className="text-sm text-muted mb-4">Selecteer de provincies waar je actief bent.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {PROVINCIES.map((provincie) => (
              <label
                key={provincie}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-primary-50 has-[:checked]:border-primary/30"
              >
                <input
                  type="checkbox"
                  checked={form.werkgebied.includes(provincie)}
                  onChange={() => toggleWerkgebied(provincie)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-dark">{provincie}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-2">Reviews</h2>
          <p className="text-sm text-muted mb-4">Link naar je Google of Trustpilot reviews.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Review link</label>
              <input
                type="url"
                value={form.reviewLink}
                onChange={(e) => updateField("reviewLink", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="https://g.page/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Score (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={form.reviewScore}
                onChange={(e) => updateField("reviewScore", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="4.8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Aantal reviews</label>
              <input
                type="number"
                min="0"
                value={form.reviewCount}
                onChange={(e) => updateField("reviewCount", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="42"
              />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Profiel opslaan
          </button>
        </div>
      </form>
    </div>
  );
}
