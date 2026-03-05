import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";
import { invalidateMollieClientCache } from "@/lib/mollie/client";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const result = await db.select().from(platformSettings);

    const settings: Record<string, string> = {};
    for (const row of result) {
      // Mollie API key maskeren — nooit volledig terugsturen
      if (row.key === "mollie_api_key" && row.value) {
        const prefix = row.value.startsWith("test_") ? "test_" : "live_";
        const lastFour = row.value.slice(-4);
        settings[row.key] = `${prefix}****${lastFour}`;
      } else {
        settings[row.key] = row.value;
      }
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    let mollieKeyChanged = false;

    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== "string") continue;

      // Skip gemaskeerde API key (niet overschrijven met masked waarde)
      if (key === "mollie_api_key" && value.includes("****")) continue;

      // Upsert
      const existing = await db
        .select()
        .from(platformSettings)
        .where(eq(platformSettings.key, key))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(platformSettings)
          .set({ value, updatedAt: now })
          .where(eq(platformSettings.key, key));
      } else {
        await db
          .insert(platformSettings)
          .values({ key, value, updatedAt: now });
      }

      if (key === "mollie_api_key") {
        mollieKeyChanged = true;
      }
    }

    // Invalideer Mollie client cache als de key is gewijzigd
    if (mollieKeyChanged) {
      invalidateMollieClientCache();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
