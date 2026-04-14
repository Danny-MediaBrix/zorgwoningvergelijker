import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSigningEvent } from "@/lib/signing/events";

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { uid } = await params;

    const [doc] = await db
      .select({ id: signedDocuments.id, status: signedDocuments.status })
      .from(signedDocuments)
      .where(eq(signedDocuments.documentUid, uid))
      .limit(1);

    if (!doc) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    if (doc.status !== "pending_signature") {
      return NextResponse.json({ error: "Alleen documenten met status 'ter ondertekening' kunnen ingetrokken worden." }, { status: 400 });
    }

    const now = new Date().toISOString();
    await db
      .update(signedDocuments)
      .set({ status: "revoked", updatedAt: now })
      .where(eq(signedDocuments.id, doc.id));

    await createSigningEvent({
      documentId: doc.id,
      action: "revoked",
      actorType: "admin",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: "Admin",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin signing revoke error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
