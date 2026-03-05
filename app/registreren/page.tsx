"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function RegistrerenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bedrijfsnaam: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens bevatten.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bedrijfsnaam: formData.bedrijfsnaam,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/portal/dashboard");
        router.refresh();
      }, 1500);
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
            Account aangemaakt!
          </h1>
          <p className="text-muted">
            Je wordt doorgestuurd naar je dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4 py-12">
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
            Registreren als aanbieder
          </h1>
          <p className="text-muted text-sm mt-1">
            Maak een account aan om je bedrijf te presenteren
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
              <label htmlFor="bedrijfsnaam" className="block text-sm font-medium text-dark mb-1.5">
                Bedrijfsnaam
              </label>
              <input
                id="bedrijfsnaam"
                type="text"
                required
                value={formData.bedrijfsnaam}
                onChange={(e) => updateField("bedrijfsnaam", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Je bedrijfsnaam"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                Zakelijk e-mailadres
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="info@jebedrijf.nl"
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
                  aria-required="true"
                  aria-describedby="password-helper"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                  placeholder="Minimaal 8 tekens"
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
              <p id="password-helper" className="text-xs text-subtle mt-1">Minimaal 8 tekens</p>
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
                value={formData.passwordConfirm}
                onChange={(e) => updateField("passwordConfirm", e.target.value)}
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
              Account aanmaken
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-muted">
              Heb je al een account?{" "}
              <Link
                href="/inloggen"
                className="text-primary font-medium hover:text-primary-hover transition-colors"
              >
                Inloggen
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
