import createMollieClient from "@mollie/api-client";
import { db } from "@/lib/db";
import { platformSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

let client: ReturnType<typeof createMollieClient> | null = null;
let cachedApiKey: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minuten

async function getApiKeyFromDb(): Promise<string | null> {
  try {
    const row = await db
      .select()
      .from(platformSettings)
      .where(eq(platformSettings.key, "mollie_api_key"))
      .limit(1);

    return row.length > 0 && row[0].value ? row[0].value : null;
  } catch {
    return null;
  }
}

export async function getMollieClient() {
  const now = Date.now();
  const cacheExpired = now - cacheTimestamp > CACHE_TTL;

  if (client && !cacheExpired) {
    return client;
  }

  // Haal key op uit DB, fallback naar env var
  const dbKey = await getApiKeyFromDb();
  const apiKey = dbKey || process.env.MOLLIE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Mollie API key is niet geconfigureerd. Stel deze in via Admin → Instellingen of via de MOLLIE_API_KEY environment variable."
    );
  }

  // Herinitialiseer client als key veranderd is
  if (apiKey !== cachedApiKey || !client) {
    client = createMollieClient({ apiKey });
    cachedApiKey = apiKey;
  }

  cacheTimestamp = now;
  return client;
}

/**
 * Forceer cache invalidatie (bijv. na opslaan nieuwe key in admin)
 */
export function invalidateMollieClientCache() {
  client = null;
  cachedApiKey = null;
  cacheTimestamp = 0;
}
