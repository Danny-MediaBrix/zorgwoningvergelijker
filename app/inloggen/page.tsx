"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function InloggenPage() {
  return (
    <Suspense>
      <InloggenForm />
    </Suspense>
  );
}

function InloggenForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/portal/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      router.push(data.role === "admin" ? "/admin" : redirect);
      router.refresh();
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
            Inloggen
          </h1>
          <p className="text-muted text-sm mt-1">
            Aanbieder Portal
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div role="alert" aria-live="polite">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-1.5">
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/wachtwoord-vergeten"
                className="text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Wachtwoord vergeten?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Inloggen
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-muted">
              Nog geen account?{" "}
              <Link
                href="/registreren"
                className="text-primary font-medium hover:text-primary-hover transition-colors"
              >
                Registreren als aanbieder
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-subtle mt-6">
          <Link href="/" className="hover:text-muted transition-colors">
            ← Terug naar Zorgwoningvergelijker.nl
          </Link>
        </p>
      </div>
    </div>
  );
}
