/**
 * CSRF bescherming via Origin header validatie.
 *
 * JSON API's zijn al deels beschermd doordat browsers geen cross-origin
 * JSON POST's versturen zonder CORS preflight. Deze check voegt
 * defense-in-depth toe door de Origin te verifiëren.
 */
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Geen origin header = same-origin request (geen CSRF risico)
  if (!origin) return true;

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl",
    "https://www.zorgwoningvergelijker.nl",
  ];

  // In development ook localhost toestaan
  if (process.env.NODE_ENV === "development") {
    allowedOrigins.push("http://localhost:3000");
    allowedOrigins.push("http://localhost:3001");
  }

  return allowedOrigins.includes(origin);
}
