import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments, signingEvents, aanbieders, users } from "@/lib/db/schema";
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

    const rows = await db
      .select({
        id: signedDocuments.id,
        documentUid: signedDocuments.documentUid,
        title: signedDocuments.title,
        documentType: signedDocuments.documentType,
        version: signedDocuments.version,
        status: signedDocuments.status,
        aanbiederId: signedDocuments.aanbiederId,
        createdByUserId: signedDocuments.createdByUserId,
        templateId: signedDocuments.templateId,
        documentHashPresign: signedDocuments.documentHashPresign,
        documentHashPostsign: signedDocuments.documentHashPostsign,
        signedAt: signedDocuments.signedAt,
        signerFullName: signedDocuments.signerFullName,
        signerRole: signedDocuments.signerRole,
        draftFileUrl: signedDocuments.draftFileUrl,
        signedFileUrl: signedDocuments.signedFileUrl,
        expiresAt: signedDocuments.expiresAt,
        createdAt: signedDocuments.createdAt,
        updatedAt: signedDocuments.updatedAt,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        aanbiederSlug: aanbieders.slug,
        createdByEmail: users.email,
      })
      .from(signedDocuments)
      .leftJoin(aanbieders, eq(signedDocuments.aanbiederId, aanbieders.id))
      .leftJoin(users, eq(signedDocuments.createdByUserId, users.id))
      .where(eq(signedDocuments.documentUid, uid))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    // Fetch events
    const events = await db
      .select()
      .from(signingEvents)
      .where(eq(signingEvents.documentId, rows[0].id))
      .orderBy(desc(signingEvents.occurredAt));

    return NextResponse.json({ document: rows[0], events });
  } catch (error) {
    console.error("Admin signing detail GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
