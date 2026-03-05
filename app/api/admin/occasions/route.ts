import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbiedersOccasions, aanbieders } from "@/lib/db/schema";
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
        id: aanbiedersOccasions.id,
        titel: aanbiedersOccasions.titel,
        woningtype: aanbiedersOccasions.woningtype,
        prijs: aanbiedersOccasions.prijs,
        locatie: aanbiedersOccasions.locatie,
        status: aanbiedersOccasions.status,
        createdAt: aanbiedersOccasions.createdAt,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
      })
      .from(aanbiedersOccasions)
      .innerJoin(aanbieders, eq(aanbiedersOccasions.aanbiederId, aanbieders.id))
      .orderBy(desc(aanbiedersOccasions.createdAt));

    return NextResponse.json({ occasions: result });
  } catch (error) {
    console.error("Admin get occasions error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
