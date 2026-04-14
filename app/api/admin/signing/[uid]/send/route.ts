import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments, aanbieders, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { createSigningEvent } from "@/lib/signing/events";
import { sendEmail } from "@/lib/email/send";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl";

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

    // Find the document
    const rows = await db
      .select({
        id: signedDocuments.id,
        title: signedDocuments.title,
        status: signedDocuments.status,
        aanbiederId: signedDocuments.aanbiederId,
      })
      .from(signedDocuments)
      .where(eq(signedDocuments.documentUid, uid))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    const doc = rows[0];

    if (doc.status !== "draft") {
      return NextResponse.json({ error: "Document kan alleen vanuit 'concept' status verstuurd worden." }, { status: 400 });
    }

    // Update status
    const now = new Date().toISOString();
    await db
      .update(signedDocuments)
      .set({ status: "pending_signature", updatedAt: now })
      .where(eq(signedDocuments.id, doc.id));

    // Get aanbieder email
    const [aanbieder] = await db
      .select({
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        userId: aanbieders.userId,
      })
      .from(aanbieders)
      .where(eq(aanbieders.id, doc.aanbiederId))
      .limit(1);

    if (aanbieder) {
      const [aanbiederUser] = await db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.id, aanbieder.userId))
        .limit(1);

      if (aanbiederUser) {
        const signingUrl = `${BASE_URL}/portal/documenten/${uid}`;
        await sendEmail(aanbiederUser.email, {
          type: "document_ter_ondertekening",
          bedrijfsnaam: aanbieder.bedrijfsnaam,
          documentTitle: doc.title,
          signingUrl,
        }, { cc: "info@zorgwoningvergelijker.nl" });
      }
    }

    // Log event
    await createSigningEvent({
      documentId: doc.id,
      action: "sent_for_signature",
      actorType: "admin",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: "Admin",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin signing send error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
