"use client";

import { useState, useEffect } from "react";
import { Loader2, Crown, CheckCircle2, XCircle } from "lucide-react";

type Subscription = {
  id: string;
  status: string;
  startedAt: string;
  cancelledAt: string | null;
};

type Profile = {
  status: string;
};

export default function AbonnementPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [subRes, profileRes] = await Promise.all([
        fetch("/api/portal/abonnement"),
        fetch("/api/auth/me"),
      ]);

      if (subRes.ok) {
        const data = await subRes.json();
        setSubscription(data.subscription || null);
      }

      if (profileRes.ok) {
        const data = await profileRes.json();
        setProfile({ status: data.user?.aanbieder?.status || "pending" });
      }
    } catch {
      setError("Kon abonnement niet laden.");
    } finally {
      setLoading(false);
    }
  }

  async function handleActivate() {
    setActionLoading(true);
    setError("");

    try {
      const res = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "aanbieder_subscription" }),
      });

      const data = await res.json();

      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      setError(data.error || "Er ging iets mis.");
    } catch {
      setError("Er ging iets mis bij het starten van de betaling.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancel() {
    if (!confirm("Weet je zeker dat je je abonnement wilt opzeggen?")) return;

    setActionLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portal/abonnement", {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchData();
      } else {
        setError("Opzeggen mislukt.");
      }
    } catch {
      setError("Er ging iets mis.");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const isApproved = profile?.status === "approved";
  const isActive = subscription?.status === "active";

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-2">Abonnement</h1>
      <p className="text-muted text-sm mb-6">
        Met een actief abonnement ben je als aanbieder zichtbaar op het platform en ontvang je leads.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isActive ? "bg-green-50" : "bg-gray-50"}`}>
            <Crown className={`w-6 h-6 ${isActive ? "text-green-600" : "text-gray-400"}`} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-dark">
              Aanbieder-abonnement
            </h2>

            {isActive ? (
              <div className="mt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Actief
                </div>
                <p className="text-sm text-muted mt-2">
                  Actief sinds {new Date(subscription!.startedAt).toLocaleDateString("nl-NL")}
                </p>
                <p className="text-xs text-subtle mt-1">
                  Maandelijks gefactureerd: vast abonnementsbedrag + leads + actieve occasions.
                </p>

                <button
                  onClick={handleCancel}
                  disabled={actionLoading}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-50"
                >
                  {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <XCircle className="w-3.5 h-3.5" />
                  Opzeggen
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                  Niet actief
                </div>
                <p className="text-sm text-muted mt-2">
                  Activeer je abonnement om zichtbaar te worden op het platform en leads te ontvangen.
                </p>

                {!isApproved ? (
                  <p className="text-sm text-amber-600 mt-3">
                    Je profiel moet eerst goedgekeurd zijn voordat je een abonnement kunt activeren.
                  </p>
                ) : (
                  <button
                    onClick={handleActivate}
                    disabled={actionLoading}
                    className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
                  >
                    {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Abonnement activeren
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-primary-50 border border-primary/10 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-dark mb-2">Wat is inbegrepen?</h3>
        <ul className="space-y-1.5 text-sm text-muted">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            Vermelding als aanbieder op het platform
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            Gratis woningtype-selecties (onbeperkt)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            Leads ontvangen via de configurator (per lead gefactureerd)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            Occasions plaatsen (per occasion gefactureerd)
          </li>
        </ul>
      </div>
    </div>
  );
}
