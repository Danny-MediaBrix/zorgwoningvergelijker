import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments, aanbieders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const result = await db
      .select({
        id: payments.id,
        type: payments.type,
        amount: payments.amount,
        mollieStatus: payments.mollieStatus,
        createdAt: payments.createdAt,
        paidAt: payments.paidAt,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
      })
      .from(payments)
      .innerJoin(aanbieders, eq(payments.aanbiederId, aanbieders.id))
      .orderBy(desc(payments.createdAt));

    return NextResponse.json({ payments: result });
  } catch (error) {
    console.error("Admin get payments error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
