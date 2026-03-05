"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function WachtwoordResetPage() {
  return (
    <Suspense>
      <WachtwoordResetForm />
    </Suspense>
  );
}

function WachtwoordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-dark mb-2">
            Ongeldige link
          </h1>
          <p className="text-muted mb-4">
            De reset link is ongeldig of verlopen.
          </p>
          <Link
            href="/wachtwoord-vergeten"
            className="text-primary font-medium hover:text-primary-hover"
          >
            Vraag een nieuwe link aan
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens bevatten.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/wachtwoord-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Er ging iets mis.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/inloggen");
      }, 2000);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-dark mb-2">
            Wachtwoord gewijzigd
          </h1>
          <p className="text-muted">
            U wordt doorgestuurd naar de inlogpagina...
          </p>
        </div>
      </div>
    );
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
            Nieuw wachtwoord instellen
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-1.5">
                Nieuw wachtwoord
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                  placeholder="Minimaal 8 tekens"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-dark mb-1.5">
                Wachtwoord bevestigen
              </label>
              <input
                id="passwordConfirm"
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Herhaal wachtwoord"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Wachtwoord opslaan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
