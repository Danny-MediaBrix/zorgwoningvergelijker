"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";

export default function EditOccasionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchOccasion();
  }, [id]);

  async function fetchOccasion() {
    try {
      const res = await fetch(`/api/portal/occasions/${id}`);
      if (res.ok) {
        const data = await res.json();
        const occ = data.occasion;
        setForm({
          titel: occ.titel || "",
          beschrijving: occ.beschrijving || "",
          prijs: occ.prijs ? String(occ.prijs / 100) : "",
          woningtype: occ.woningtype || "",
          locatie: occ.locatie || "",
          provincie: occ.provincie || "",
          conditie: occ.conditie || "",
          energielabel: occ.energielabel || "",
          leveringstermijn: occ.leveringstermijn || "",
          status: occ.status || "active",
        });
      }
    } catch {
      setError("Kon occasion niet laden.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/portal/occasions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          prijs: form.prijs ? Math.round(parseFloat(form.prijs) * 100) : null,
        }),
      });

      if (!res.ok) {
        setError("Opslaan mislukt.");
        return;
      }

      router.push("/portal/occasions");
    } catch {
      setError("Er ging iets mis.");
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
      <button
        onClick={() => router.push("/portal/occasions")}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dark mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug
      </button>

      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Occasion bewerken</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark mb-1.5">Titel</label>
              <input
                type="text"
                value={form.titel || ""}
                onChange={(e) => setForm((p) => ({ ...p, titel: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Prijs (€)</label>
              <input
                type="number"
                step="0.01"
                value={form.prijs || ""}
                onChange={(e) => setForm((p) => ({ ...p, prijs: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Status</label>
              <select
                value={form.status || "active"}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="active">Actief</option>
                <option value="inactive">Inactief</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-dark mb-1.5">Beschrijving</label>
            <textarea
              rows={4}
              value={form.beschrijving || ""}
              onChange={(e) => setForm((p) => ({ ...p, beschrijving: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Opslaan
          </button>
        </div>
      </form>
    </div>
  );
}
