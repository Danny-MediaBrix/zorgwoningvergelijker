import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments, signingEvents } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { uid } = await params;

    // Find document by uid
    const [doc] = await db
      .select({ id: signedDocuments.id })
      .from(signedDocuments)
      .where(eq(signedDocuments.documentUid, uid))
      .limit(1);

    if (!doc) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    const events = await db
      .select()
      .from(signingEvents)
      .where(eq(signingEvents.documentId, doc.id))
      .orderBy(desc(signingEvents.occurredAt));

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Admin signing events GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
