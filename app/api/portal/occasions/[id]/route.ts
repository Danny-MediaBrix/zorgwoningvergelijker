import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbiedersOccasions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;

    const result = await db
      .select()
      .from(aanbiedersOccasions)
      .where(
        and(
          eq(aanbiedersOccasions.id, id),
          eq(aanbiedersOccasions.aanbiederId, user.aanbieder.id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Niet gevonden." }, { status: 404 });
    }

    return NextResponse.json({ occasion: result[0] });
  } catch (error) {
    console.error("Get occasion error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const now = new Date().toISOString();

    const allowedFields = [
      "titel", "beschrijving", "prijs", "prijsLabel", "woningtype",
      "locatie", "provincie", "oppervlakteM2", "bouwjaar", "conditie",
      "isolatie", "dakType", "fundering", "energielabel", "leveringstermijn",
    ] as const;

    const updates: Record<string, unknown> = { updatedAt: now };

    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field] ?? null;
      }
    }

    // Status validatie
    if ("status" in body) {
      const validStatuses = ["active", "inactive"];
      if (validStatuses.includes(body.status)) {
        updates.status = body.status;
      }
    }

    if ("financieringsopties" in body) {
      updates.financieringsopties = body.financieringsopties
        ? JSON.stringify(body.financieringsopties)
        : null;
    }
    if ("images" in body) {
      updates.images = body.images ? JSON.stringify(body.images) : null;
    }

    await db
      .update(aanbiedersOccasions)
      .set(updates)
      .where(
        and(
          eq(aanbiedersOccasions.id, id),
          eq(aanbiedersOccasions.aanbiederId, user.aanbieder.id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update occasion error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;

    await db
      .delete(aanbiedersOccasions)
      .where(
        and(
          eq(aanbiedersOccasions.id, id),
          eq(aanbiedersOccasions.aanbiederId, user.aanbieder.id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete occasion error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
