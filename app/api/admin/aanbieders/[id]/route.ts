import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbieders, users, certificaten, portfolio, woningtypeSelecties, aanbiederSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;

    const result = await db
      .select({
        aanbieder: aanbieders,
        email: users.email,
      })
      .from(aanbieders)
      .innerJoin(users, eq(aanbieders.userId, users.id))
      .where(eq(aanbieders.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Niet gevonden." }, { status: 404 });
    }

    const [certs, portfolioItems, selecties, subscription] = await Promise.all([
      db.select().from(certificaten).where(eq(certificaten.aanbiederId, id)),
      db.select().from(portfolio).where(eq(portfolio.aanbiederId, id)),
      db.select().from(woningtypeSelecties).where(eq(woningtypeSelecties.aanbiederId, id)),
      db.select().from(aanbiederSubscriptions).where(eq(aanbiederSubscriptions.aanbiederId, id)).limit(1),
    ]);

    return NextResponse.json({
      ...result[0].aanbieder,
      email: result[0].email,
      certificaten: certs,
      portfolio: portfolioItems,
      woningtypeSelecties: selecties,
      subscription: subscription[0] || null,
    });
  } catch (error) {
    console.error("Admin get aanbieder error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const now = new Date().toISOString();

    const updates: Record<string, unknown> = { updatedAt: now };
    const editableFields = [
      "bedrijfsnaam", "beschrijving", "logoUrl", "vestigingsplaats",
      "provincie", "website", "telefoon", "contactEmail",
      "reviewLink", "reviewScore", "reviewCount",
    ];

    for (const field of editableFields) {
      if (field in body) {
        updates[field] = body[field];
      }
    }
    if ("werkgebied" in body) {
      updates.werkgebied = Array.isArray(body.werkgebied)
        ? JSON.stringify(body.werkgebied)
        : body.werkgebied;
    }

    await db.update(aanbieders).set(updates).where(eq(aanbieders.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin update aanbieder error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;

    // Verwijder aanbieder (cascades naar certificaten, portfolio, etc.)
    const result = await db
      .select({ userId: aanbieders.userId })
      .from(aanbieders)
      .where(eq(aanbieders.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Niet gevonden." }, { status: 404 });
    }

    // Verwijder user (cascade verwijdert aanbieder en gerelateerde data)
    await db.delete(users).where(eq(users.id, result[0].userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete aanbieder error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
