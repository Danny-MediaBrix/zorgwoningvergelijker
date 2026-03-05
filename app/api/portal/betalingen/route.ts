import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.aanbiederId, user.aanbieder.id))
      .orderBy(desc(payments.createdAt));

    return NextResponse.json({ payments: result });
  } catch (error) {
    console.error("Get payments error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
