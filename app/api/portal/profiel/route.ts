import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbieders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    if (!user.aanbieder) {
      return NextResponse.json({ profiel: null });
    }

    const result = await db
      .select()
      .from(aanbieders)
      .where(eq(aanbieders.id, user.aanbieder.id))
      .limit(1);

    return NextResponse.json({ profiel: result[0] || null });
  } catch (error) {
    console.error("Get profiel error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    const allowedFields = [
      "bedrijfsnaam",
      "beschrijving",
      "logoUrl",
      "vestigingsplaats",
      "provincie",
      "werkgebied",
      "website",
      "telefoon",
      "contactEmail",
      "reviewLink",
    ] as const;

    const updates: Record<string, unknown> = { updatedAt: now };

    for (const field of allowedFields) {
      if (field in body) {
        if (field === "werkgebied" && Array.isArray(body[field])) {
          updates[field] = JSON.stringify(body[field]);
        } else {
          updates[field] = body[field];
        }
      }
    }

    await db
      .update(aanbieders)
      .set(updates)
      .where(eq(aanbieders.id, user.aanbieder.id));

    const updated = await db
      .select()
      .from(aanbieders)
      .where(eq(aanbieders.id, user.aanbieder.id))
      .limit(1);

    return NextResponse.json({ profiel: updated[0] });
  } catch (error) {
    console.error("Update profiel error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
