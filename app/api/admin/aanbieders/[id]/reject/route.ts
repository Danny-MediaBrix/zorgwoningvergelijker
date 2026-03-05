import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbieders, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";
import { sendEmail } from "@/lib/email/send";

export async function POST(
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
    const { reden } = body;
    const now = new Date().toISOString();

    await db
      .update(aanbieders)
      .set({
        status: "rejected",
        rejectionReason: reden || null,
        updatedAt: now,
      })
      .where(eq(aanbieders.id, id));

    // E-mail versturen
    const aanbiederRow = await db
      .select({ bedrijfsnaam: aanbieders.bedrijfsnaam, userId: aanbieders.userId })
      .from(aanbieders)
      .where(eq(aanbieders.id, id))
      .limit(1);

    if (aanbiederRow.length > 0) {
      const userRow = await db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.id, aanbiederRow[0].userId))
        .limit(1);

      if (userRow.length > 0) {
        await sendEmail(userRow[0].email, {
          type: "afgewezen",
          bedrijfsnaam: aanbiederRow[0].bedrijfsnaam,
          reden: reden || undefined,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reject aanbieder error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
