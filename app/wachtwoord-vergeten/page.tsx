"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/wachtwoord-vergeten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Er ging iets mis.");
        return;
      }

      setSent(true);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/zorgwoningvergelijker-logo.svg"
              alt="Zorgwoningvergelijker.nl"
              width={160}
              height={100}
              className="h-16 w-auto mx-auto"
            />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-dark mt-6">
            Wachtwoord vergeten
          </h1>
          <p className="text-muted text-sm mt-1">
            Ontvang een link om je wachtwoord te resetten
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="font-heading text-lg font-semibold text-dark mb-2">
                E-mail verzonden
              </h2>
              <p className="text-sm text-muted">
                Als het e-mailadres bij ons bekend is, ontvang je een link om je wachtwoord te resetten.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="je@email.nl"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Verstuur reset link
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/inloggen"
              className="text-sm text-primary font-medium hover:text-primary-hover transition-colors"
            >
              ← Terug naar inloggen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
