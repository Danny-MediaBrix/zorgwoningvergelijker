import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { createSigningEvent, extractRequestMeta } from "@/lib/signing/events";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "aanbieder" || !user.aanbieder) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { uid } = await params;

    const rows = await db
      .select({
        id: signedDocuments.id,
        documentUid: signedDocuments.documentUid,
        title: signedDocuments.title,
        documentType: signedDocuments.documentType,
        version: signedDocuments.version,
        status: signedDocuments.status,
        signedAt: signedDocuments.signedAt,
        signerFullName: signedDocuments.signerFullName,
        signerRole: signedDocuments.signerRole,
        draftFileUrl: signedDocuments.draftFileUrl,
        signedFileUrl: signedDocuments.signedFileUrl,
        expiresAt: signedDocuments.expiresAt,
        createdAt: signedDocuments.createdAt,
      })
      .from(signedDocuments)
      .where(
        and(
          eq(signedDocuments.documentUid, uid),
          eq(signedDocuments.aanbiederId, user.aanbieder.id)
        )
      )
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    const doc = rows[0];

    // Check expiration
    if (doc.status === "pending_signature" && doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
      await db
        .update(signedDocuments)
        .set({ status: "expired", updatedAt: new Date().toISOString() })
        .where(eq(signedDocuments.id, doc.id));
      doc.status = "expired";

      await createSigningEvent({
        documentId: doc.id,
        action: "expired",
        actorType: "system",
      });
    }

    // Log viewed event
    const { ipAddress, userAgent } = extractRequestMeta(request);
    await createSigningEvent({
      documentId: doc.id,
      action: "viewed",
      actorType: "aanbieder",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: user.aanbieder.bedrijfsnaam,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({ document: doc });
  } catch (error) {
    console.error("Portal signing detail GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
