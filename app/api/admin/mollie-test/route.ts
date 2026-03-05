import { NextResponse } from "next/server";
import createMollieClient from "@mollie/api-client";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { platformSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));

    // Gebruik meegestuurde key of haal op uit DB, fallback naar env var
    let apiKey = body.apiKey as string | undefined;

    if (!apiKey) {
      const row = await db
        .select()
        .from(platformSettings)
        .where(eq(platformSettings.key, "mollie_api_key"))
        .limit(1);

      apiKey = row.length > 0 && row[0].value ? row[0].value : process.env.MOLLIE_API_KEY;
    }

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "Geen Mollie API key geconfigureerd.",
      });
    }

    // Test de verbinding
    const testClient = createMollieClient({ apiKey });
    await testClient.payments.page({ limit: 1 });

    const mode = apiKey.startsWith("live_") ? "live" : "test";

    return NextResponse.json({
      success: true,
      message: `Verbinding succesvol (${mode} modus).`,
      mode,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({
      success: false,
      error: `Verbinding mislukt: ${message}`,
    });
  }
}
