import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbiederSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";
import { cancelSubscription } from "@/lib/mollie/subscriptions";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(aanbiederSubscriptions)
      .where(eq(aanbiederSubscriptions.aanbiederId, user.aanbieder.id))
      .limit(1);

    return NextResponse.json({ subscription: result[0] || null });
  } catch (error) {
    console.error("Get subscription error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    await cancelSubscription(user.aanbieder.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
