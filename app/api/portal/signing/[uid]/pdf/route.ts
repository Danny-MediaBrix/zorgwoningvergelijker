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

    const [doc] = await db
      .select({
        id: signedDocuments.id,
        title: signedDocuments.title,
        status: signedDocuments.status,
        draftFileUrl: signedDocuments.draftFileUrl,
        signedFileUrl: signedDocuments.signedFileUrl,
      })
      .from(signedDocuments)
      .where(
        and(
          eq(signedDocuments.documentUid, uid),
          eq(signedDocuments.aanbiederId, user.aanbieder.id)
        )
      )
      .limit(1);

    if (!doc) {
      return NextResponse.json({ error: "Document niet gevonden." }, { status: 404 });
    }

    // Use signed PDF if available, otherwise draft
    const pdfUrl = doc.status === "signed" && doc.signedFileUrl
      ? doc.signedFileUrl
      : doc.draftFileUrl;

    if (!pdfUrl) {
      return NextResponse.json({ error: "PDF niet beschikbaar." }, { status: 404 });
    }

    // Fetch PDF from Vercel Blob
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "PDF kon niet opgehaald worden." }, { status: 502 });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Log download event
    const { ipAddress, userAgent } = extractRequestMeta(request);
    await createSigningEvent({
      documentId: doc.id,
      action: "downloaded",
      actorType: "aanbieder",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: user.aanbieder.bedrijfsnaam,
      ipAddress,
      userAgent,
    });

    const filename = doc.status === "signed"
      ? `${doc.title} - Ondertekend.pdf`
      : `${doc.title} - Concept.pdf`;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Portal signing PDF GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
