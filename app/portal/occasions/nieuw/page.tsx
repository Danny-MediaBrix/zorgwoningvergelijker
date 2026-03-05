"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, Plus, X, ArrowLeft } from "lucide-react";

const WONINGTYPEN = [
  "tiny-house", "micro-woning", "mantelzorgwoning", "kangoeroewoning",
  "chalet", "lodge", "vakantiebungalow", "prefab-woning", "systeemwoning",
  "flexwoning", "containerwoning", "woonunit", "tuinkamer", "modulaire-aanbouw",
];

const PROVINCIES = [
  "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen",
  "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel",
  "Utrecht", "Zeeland", "Zuid-Holland",
];

const CONDITIES = ["Nieuw", "Als nieuw", "Goed", "Redelijk", "Matig"];
const ENERGIELABELS = ["A++++", "A+++", "A++", "A+", "A", "B", "C", "D", "E", "F", "G"];

export default function NieuweOccasionPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    titel: "",
    beschrijving: "",
    prijs: "",
    prijsLabel: "",
    woningtype: "",
    locatie: "",
    provincie: "",
    oppervlakteM2: "",
    bouwjaar: "",
    conditie: "",
    isolatie: "",
    dakType: "",
    fundering: "",
    energielabel: "",
    leveringstermijn: "",
    images: [] as string[],
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "occasions");

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (res.ok) {
          setForm((prev) => ({ ...prev, images: [...prev.images, data.url] }));
        }
      }
    } catch {
      setError("Afbeelding uploaden mislukt.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.titel) {
      setError("Titel is verplicht.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/portal/occasions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          prijs: form.prijs ? Math.round(parseFloat(form.prijs) * 100) : null,
          oppervlakteM2: form.oppervlakteM2 ? parseInt(form.oppervlakteM2) : null,
          bouwjaar: form.bouwjaar ? parseInt(form.bouwjaar) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Opslaan mislukt.");
        return;
      }

      router.push("/portal/occasions");
    } catch {
      setError("Er ging iets mis.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => router.push("/portal/occasions")}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dark mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar occasions
      </button>

      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Nieuwe occasion</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basis */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Basisgegevens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark mb-1.5">Titel *</label>
              <input
                type="text"
                required
                value={form.titel}
                onChange={(e) => update("titel", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Tiny House 28m² met veranda - direct beschikbaar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Woningtype</label>
              <select
                value={form.woningtype}
                onChange={(e) => update("woningtype", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Selecteer...</option>
                {WONINGTYPEN.map((wt) => (
                  <option key={wt} value={wt}>{wt.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Prijs (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.prijs}
                onChange={(e) => update("prijs", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="49500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Prijslabel</label>
              <input
                type="text"
                value={form.prijsLabel}
                onChange={(e) => update("prijsLabel", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. v.a., vraagprijs, bieden"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Locatie</label>
              <input
                type="text"
                value={form.locatie}
                onChange={(e) => update("locatie", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Utrecht"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Provincie</label>
              <select
                value={form.provincie}
                onChange={(e) => update("provincie", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Selecteer...</option>
                {PROVINCIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-dark mb-1.5">Beschrijving</label>
            <textarea
              rows={4}
              value={form.beschrijving}
              onChange={(e) => update("beschrijving", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Beschrijf de woning, staat, bijzonderheden..."
            />
          </div>
        </section>

        {/* Specificaties */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Specificaties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Oppervlakte (m²)</label>
              <input
                type="number"
                min="0"
                value={form.oppervlakteM2}
                onChange={(e) => update("oppervlakteM2", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Bouwjaar</label>
              <input
                type="number"
                min="1900"
                max="2030"
                value={form.bouwjaar}
                onChange={(e) => update("bouwjaar", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Conditie</label>
              <select
                value={form.conditie}
                onChange={(e) => update("conditie", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Selecteer...</option>
                {CONDITIES.map((c) => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Energielabel</label>
              <select
                value={form.energielabel}
                onChange={(e) => update("energielabel", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Selecteer...</option>
                {ENERGIELABELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Isolatie</label>
              <input
                type="text"
                value={form.isolatie}
                onChange={(e) => update("isolatie", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. HR++ glas, vloer- en dakisolatie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Daktype</label>
              <input
                type="text"
                value={form.dakType}
                onChange={(e) => update("dakType", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Plat dak, Schuin dak"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Fundering</label>
              <input
                type="text"
                value={form.fundering}
                onChange={(e) => update("fundering", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Schroeffundering, Betonplaat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Leveringstermijn</label>
              <input
                type="text"
                value={form.leveringstermijn}
                onChange={(e) => update("leveringstermijn", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Direct beschikbaar, 4-6 weken"
              />
            </div>
          </div>
        </section>

        {/* Afbeeldingen */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Afbeeldingen</h2>

          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {form.images.map((url, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                  <Image src={url} alt={`Afbeelding ${i + 1}`} fill className="object-cover" sizes="150px" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 rounded bg-white/90 text-gray-600 hover:text-accent"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-dark hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploaden..." : "Afbeeldingen toevoegen"}
          </button>
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/portal/occasions")}
            className="px-6 py-3 rounded-lg text-sm font-medium text-muted border border-gray-200 hover:text-dark hover:bg-gray-50 transition-colors"
          >
            Annuleren
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Occasion plaatsen
          </button>
        </div>
      </form>
    </div>
  );
}
