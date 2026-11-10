import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Spambescherming voor het contactformulier, zonder captcha.
 *
 * 1. Formuliertoken: de pagina haalt bij het laden een ondertekend tijdstempel
 *    op. Een bot die rechtstreeks naar de API post, heeft dat niet.
 * 2. Tijdval: binnen MIN_FILL_MS na het laden versturen kan een mens niet.
 * 3. Honeypot: een verborgen veld dat alleen bots invullen.
 * 4. Onzintekst: woorden als "cQYDFHUKkQAOIjUqURR" (willekeurige hoofd- en
 *    kleine letters door elkaar).
 */

// Neutrale naam die browsers en wachtwoordbeheerders niet automatisch invullen.
export const HONEYPOT_FIELD = "kenmerk";
export const MIN_FILL_MS = 3_000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function signingKey(): string {
  // Afgeleid van een bestaand geheim, zodat er geen nieuwe omgevingsvariabele nodig is.
  const base = process.env.CRON_SECRET || process.env.TURSO_AUTH_TOKEN || "lokaal-ontwikkelen";
  return createHash("sha256").update(`contactformulier:${base}`).digest("hex");
}

function sign(issuedAt: string): string {
  return createHmac("sha256", signingKey()).update(issuedAt).digest("hex");
}

export function createFormToken(now: number = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt)}`;
}

export type TokenCheck = "ok" | "ontbreekt" | "ongeldig" | "te-snel" | "verlopen";

export function checkFormToken(token: unknown, now: number = Date.now()): TokenCheck {
  if (typeof token !== "string" || token.length === 0) return "ontbreekt";

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature || !/^\d{10,16}$/.test(issuedAt)) return "ongeldig";

  const expected = Buffer.from(sign(issuedAt), "hex");
  const given = Buffer.from(signature, "hex");
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "ongeldig";

  const age = now - Number(issuedAt);
  if (age < MIN_FILL_MS) return "te-snel";
  if (age > MAX_AGE_MS) return "verlopen";
  return "ok";
}

/** Telt de overgangen van een kleine naar een hoofdletter binnen één woord. */
function caseSwitches(word: string): number {
  let switches = 0;
  for (let i = 1; i < word.length; i++) {
    const prev = word[i - 1];
    const cur = word[i];
    if (prev >= "a" && prev <= "z" && cur >= "A" && cur <= "Z") switches++;
  }
  return switches;
}

/**
 * Herkent willekeurige letterreeksen. Gewone woorden met een hoofdletter
 * midden in het woord (iPhone, LinkedIn, McDonald) hebben er hooguit één of twee.
 */
export function looksLikeGibberish(...texts: string[]): boolean {
  return texts.some((text) =>
    text
      .split(/\s+/)
      .some((word) => word.length >= 8 && !word.includes("@") && caseSwitches(word) >= 3)
  );
}

export function honeypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
