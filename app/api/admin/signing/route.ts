import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments, aanbieders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { generateDocumentPdf, type TemplateId, type TemplateVariables } from "@/lib/signing/generate-pdf";
import { hashBuffer } from "@/lib/signing/hash";
import { uploadBuffer } from "@/lib/upload";
import { createSigningEvent } from "@/lib/signing/events";

export async function GET(request: Request) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");
    const aanbiederIdFilter = searchParams.get("aanbiederId");

    let query = db
      .select({
        id: signedDocuments.id,
        documentUid: signedDocuments.documentUid,
        title: signedDocuments.title,
        documentType: signedDocuments.documentType,
        version: signedDocuments.version,
        status: signedDocuments.status,
        signedAt: signedDocuments.signedAt,
        signerFullName: signedDocuments.signerFullName,
        createdAt: signedDocuments.createdAt,
        aanbiederId: signedDocuments.aanbiederId,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
      })
      .from(signedDocuments)
      .leftJoin(aanbieders, eq(signedDocuments.aanbiederId, aanbieders.id))
      .orderBy(desc(signedDocuments.createdAt))
      .$dynamic();

    if (statusFilter) {
      query = query.where(eq(signedDocuments.status, statusFilter as "draft" | "pending_signature" | "signed" | "expired" | "revoked"));
    }
    if (aanbiederIdFilter) {
      query = query.where(eq(signedDocuments.aanbiederId, aanbiederIdFilter));
    }

    const documents = await query;
    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Admin signing GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, documentType, aanbiederId, templateId, templateVariables } = body;

    if (!title || !documentType || !aanbiederId || !templateId) {
      return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
    }

    // Verify aanbieder exists
    const [aanbieder] = await db
      .select({ id: aanbieders.id, bedrijfsnaam: aanbieders.bedrijfsnaam })
      .from(aanbieders)
      .where(eq(aanbieders.id, aanbiederId))
      .limit(1);

    if (!aanbieder) {
      return NextResponse.json({ error: "Aanbieder niet gevonden." }, { status: 404 });
    }

    // Generate PDF
    const pdfBytes = await generateDocumentPdf(
      templateId as TemplateId,
      templateVariables as TemplateVariables
    );

    // Hash the PDF
    const presignHash = hashBuffer(pdfBytes);

    // Upload draft PDF
    const draftFileUrl = await uploadBuffer(
      pdfBytes,
      `${templateId}-${aanbieder.bedrijfsnaam.replace(/\s+/g, "-").toLowerCase()}.pdf`,
      "signing-drafts"
    );

    // Create document record
    const now = new Date().toISOString();
    const documentId = uuidv4();
    const documentUid = uuidv4();

    await db.insert(signedDocuments).values({
      id: documentId,
      documentUid,
      title,
      documentType,
      version: 1,
      status: "draft",
      aanbiederId,
      createdByUserId: user.id,
      templateId,
      templateVariables: JSON.stringify(templateVariables),
      documentHashPresign: presignHash,
      draftFileUrl,
      createdAt: now,
      updatedAt: now,
    });

    // Log event
    await createSigningEvent({
      documentId,
      action: "created",
      actorType: "admin",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: "Admin",
      documentHashAtEvent: presignHash,
    });

    return NextResponse.json({
      document: { id: documentId, documentUid, title, status: "draft", draftFileUrl },
    });
  } catch (error) {
    console.error("Admin signing POST error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
