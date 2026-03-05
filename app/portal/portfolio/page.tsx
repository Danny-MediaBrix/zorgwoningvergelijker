"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";

type PortfolioItem = {
  id: string;
  titel: string;
  afbeeldingUrl: string;
  woningType: string | null;
  locatie: string | null;
  createdAt: string;
};

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    titel: "",
    afbeeldingUrl: "",
    woningType: "",
    locatie: "",
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const res = await fetch("/api/portal/portfolio");
      const data = await res.json();
      setItems(data.portfolio || []);
    } catch {
      setMessage({ type: "error", text: "Kon portfolio niet laden." });
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "portfolio");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }

      setForm((prev) => ({ ...prev, afbeeldingUrl: data.url }));
    } catch {
      setMessage({ type: "error", text: "Upload mislukt." });
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titel || !form.afbeeldingUrl) return;

    setAdding(true);
    try {
      const res = await fetch("/api/portal/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error });
        return;
      }

      const item = await res.json();
      setItems((prev) => [...prev, item]);
      setForm({ titel: "", afbeeldingUrl: "", woningType: "", locatie: "" });
      setMessage({ type: "success", text: "Project toegevoegd." });
    } catch {
      setMessage({ type: "error", text: "Toevoegen mislukt." });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit project wilt verwijderen?")) return;

    try {
      await fetch(`/api/portal/portfolio/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMessage({ type: "success", text: "Project verwijderd." });
    } catch {
      setMessage({ type: "error", text: "Verwijderen mislukt." });
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
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Portfolio</h1>

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

      {/* Bestaande items */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.afbeeldingUrl}
                  alt={item.titel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-white/90 text-gray-400 hover:text-accent hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Verwijderen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-dark">{item.titel}</h3>
                {(item.woningType || item.locatie) && (
                  <p className="text-xs text-muted mt-1">
                    {[item.woningType, item.locatie].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nieuw item */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-heading text-lg font-semibold text-dark mb-4">
          Project toevoegen
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Titel *</label>
              <input
                type="text"
                required
                value={form.titel}
                onChange={(e) => setForm((p) => ({ ...p, titel: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Mantelzorgwoning Den Bosch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Woningtype</label>
              <input
                type="text"
                value={form.woningType}
                onChange={(e) => setForm((p) => ({ ...p, woningType: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Mantelzorgwoning"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Locatie</label>
              <input
                type="text"
                value={form.locatie}
                onChange={(e) => setForm((p) => ({ ...p, locatie: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Bijv. Den Bosch"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Foto *</label>
            {form.afbeeldingUrl ? (
              <div className="relative w-48 aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                <Image src={form.afbeeldingUrl} alt="Preview" fill className="object-cover" sizes="192px" />
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, afbeeldingUrl: "" }))}
                  className="absolute top-1 right-1 p-1 rounded bg-white/90 text-gray-600 hover:text-gray-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
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
                  {uploading ? "Uploaden..." : "Foto uploaden"}
                </button>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={adding || !form.titel || !form.afbeeldingUrl}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Toevoegen
          </button>
        </form>
      </div>
    </div>
  );
}
