"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, Plus, Trash2, FileText, X } from "lucide-react";

type Certificaat = {
  id: string;
  naam: string;
  bewijsUrl: string;
  createdAt: string;
};

export default function CertificatenPage() {
  const [certificaten, setCertificaten] = useState<Certificaat[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [naam, setNaam] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCertificaten();
  }, []);

  async function fetchCertificaten() {
    try {
      const res = await fetch("/api/portal/certificaten");
      const data = await res.json();
      setCertificaten(data.certificaten || []);
    } catch {
      setMessage({ type: "error", text: "Kon certificaten niet laden." });
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "certificaten");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }

      setUploadedUrl(data.url);
    } catch {
      setMessage({ type: "error", text: "Upload mislukt." });
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!naam || !uploadedUrl) return;

    setAdding(true);
    try {
      const res = await fetch("/api/portal/certificaten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam, bewijsUrl: uploadedUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error });
        return;
      }

      const cert = await res.json();
      setCertificaten((prev) => [...prev, cert]);
      setNaam("");
      setUploadedUrl("");
      setMessage({ type: "success", text: "Certificaat toegevoegd." });
    } catch {
      setMessage({ type: "error", text: "Toevoegen mislukt." });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit certificaat wilt verwijderen?")) return;

    try {
      await fetch(`/api/portal/certificaten/${id}`, { method: "DELETE" });
      setCertificaten((prev) => prev.filter((c) => c.id !== id));
      setMessage({ type: "success", text: "Certificaat verwijderd." });
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
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Certificaten</h1>

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

      {/* Bestaande certificaten */}
      {certificaten.length > 0 && (
        <div className="space-y-3 mb-8">
          {certificaten.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-dark">{cert.naam}</p>
                  <a
                    href={cert.bewijsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Bewijs bekijken
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent-50 transition-colors"
                aria-label="Verwijderen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Nieuw certificaat */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-heading text-lg font-semibold text-dark mb-4">
          Certificaat toevoegen
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Naam certificaat</label>
            <input
              type="text"
              required
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Bijv. SKG-IKOB, KOMO, ISO 9001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Bewijs (PDF of afbeelding)</label>
            {uploadedUrl ? (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <FileText className="w-4 h-4" />
                Bestand geüpload
                <button
                  type="button"
                  onClick={() => setUploadedUrl("")}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-dark hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Uploaden..." : "Bestand uploaden"}
                </button>
                <p className="text-xs text-subtle mt-1">JPG, PNG, WebP of PDF. Max 10MB.</p>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={adding || !naam || !uploadedUrl}
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
