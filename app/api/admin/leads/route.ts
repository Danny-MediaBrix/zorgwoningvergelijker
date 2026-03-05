import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { leads, aanbieders } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const rows = await db
      .select({
        id: leads.id,
        aanbiederId: leads.aanbiederId,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        naam: leads.naam,
        email: leads.email,
        telefoon: leads.telefoon,
        woningtype: leads.woningtype,
        bericht: leads.bericht,
        bron: leads.bron,
        gefactureerd: leads.gefactureerd,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .leftJoin(aanbieders, eq(leads.aanbiederId, aanbieders.id))
      .orderBy(desc(leads.createdAt));

    return NextResponse.json({ leads: rows });
  } catch (error) {
    console.error("Admin get leads error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
