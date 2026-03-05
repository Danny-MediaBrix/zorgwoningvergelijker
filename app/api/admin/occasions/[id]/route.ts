import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbiedersOccasions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

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
    if ("status" in body) updates.status = body.status;

    await db
      .update(aanbiedersOccasions)
      .set(updates)
      .where(eq(aanbiedersOccasions.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin update occasion error:", error);
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
    await db.delete(aanbiedersOccasions).where(eq(aanbiedersOccasions.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete occasion error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
