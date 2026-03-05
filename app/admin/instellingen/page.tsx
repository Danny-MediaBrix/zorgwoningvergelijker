"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, X, CheckCircle, AlertCircle, Wifi } from "lucide-react";

export default function InstellingenPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [testingMollie, setTestingMollie] = useState(false);
  const [mollieTestResult, setMollieTestResult] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data.settings || {});
    } catch {
      setMessage({ type: "error", text: "Kon instellingen niet laden." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Instellingen opgeslagen." });
        // Herlaad settings om gemaskeerde key te zien
        await fetchSettings();
      } else {
        setMessage({ type: "error", text: "Opslaan mislukt." });
      }
    } catch {
      setMessage({ type: "error", text: "Er ging iets mis." });
    } finally {
      setSaving(false);
    }
  }

  async function testMollieConnection() {
    setTestingMollie(true);
    setMollieTestResult(null);

    try {
      // Stuur de key mee als deze niet gemaskeerd is (nieuwe key ingevoerd)
      const apiKey = settings.mollie_api_key;
      const body: Record<string, string> = {};
      if (apiKey && !apiKey.includes("****")) {
        body.apiKey = apiKey;
      }

      const res = await fetch("/api/admin/mollie-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setMollieTestResult({ type: "success", text: data.message });
      } else {
        setMollieTestResult({ type: "error", text: data.error });
      }
    } catch {
      setMollieTestResult({ type: "error", text: "Kon verbinding niet testen." });
    } finally {
      setTestingMollie(false);
    }
  }

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function formatPrice(centen: string | undefined, fallback: number) {
    const val = centen ? parseInt(centen) : fallback;
    return `€ ${(val / 100).toFixed(2)}`;
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
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Platform Instellingen</h1>

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

      <form onSubmit={handleSave}>
        {/* Mollie Koppeling */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-dark">Mollie Koppeling</h2>
              <p className="text-sm text-muted">Configureer de Mollie betalingsintegratie</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Mollie API Key
              </label>
              <input
                type="password"
                value={settings.mollie_api_key || ""}
                onChange={(e) => updateSetting("mollie_api_key", e.target.value)}
                placeholder="test_... of live_..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
              <p className="text-xs text-subtle mt-1">
                Te vinden in je Mollie Dashboard → Ontwikkelaars → API-sleutels
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Webhook Base URL
              </label>
              <input
                type="url"
                value={settings.mollie_webhook_base_url || ""}
                onChange={(e) => updateSetting("mollie_webhook_base_url", e.target.value)}
                placeholder="https://zorgwoningvergelijker.nl"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-subtle mt-1">
                De basis-URL voor webhooks en redirects (zonder trailing slash)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={testMollieConnection}
              disabled={testingMollie}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-dark px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {testingMollie ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              Verbinding testen
            </button>

            {mollieTestResult && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  mollieTestResult.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {mollieTestResult.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {mollieTestResult.text}
              </div>
            )}
          </div>
        </section>

        {/* Prijzen */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-heading text-lg font-semibold text-dark mb-4">Prijzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Aanbieder-abonnement (centen/maand)
              </label>
              <input
                type="number"
                value={settings.prijs_per_aanbieder || "4900"}
                onChange={(e) => updateSetting("prijs_per_aanbieder", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-subtle mt-1">
                {formatPrice(settings.prijs_per_aanbieder, 4900)} per maand
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Prijs per lead (centen/stuk)
              </label>
              <input
                type="number"
                value={settings.prijs_per_lead || "500"}
                onChange={(e) => updateSetting("prijs_per_lead", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-subtle mt-1">
                {formatPrice(settings.prijs_per_lead, 500)} per lead
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Prijs per occasion (centen/maand)
              </label>
              <input
                type="number"
                value={settings.prijs_per_occasion || "2900"}
                onChange={(e) => updateSetting("prijs_per_occasion", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-subtle mt-1">
                {formatPrice(settings.prijs_per_occasion, 2900)} per maand
              </p>
            </div>
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
