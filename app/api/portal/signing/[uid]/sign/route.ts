import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments, aanbieders } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { hashBuffer, hashFromUrl } from "@/lib/signing/hash";
import { appendSignaturePage } from "@/lib/signing/append-signature-page";
import { uploadBuffer } from "@/lib/upload";
import { createSigningEvent, extractRequestMeta } from "@/lib/signing/events";
import { sendEmail } from "@/lib/email/send";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(userId, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "aanbieder" || !user.aanbieder) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  // Rate limit
  if (!checkRateLimit(user.id)) {
    return NextResponse.json({ error: "Te veel pogingen. Probeer het over een minuut opnieuw." }, { status: 429 });
  }

  try {
    const { uid } = await params;
    const body = await request.json();
    const { signerFullName, signerRole, confirmed } = body;

    // Validate input
    if (!signerFullName || !signerRole || confirmed !== true) {
      return NextResponse.json({ error: "Alle velden zijn verplicht en bevestiging is nodig." }, { status: 400 });
    }

    if (typeof signerFullName !== "string" || signerFullName.trim().length < 2) {
      return NextResponse.json({ error: "Voer een geldige naam in." }, { status: 400 });
    }

    if (typeof signerRole !== "string" || signerRole.trim().length < 2) {
      return NextResponse.json({ error: "Voer een geldige functie in." }, { status: 400 });
    }

    // Find document (ownership check)
    const rows = await db
      .select()
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

    // Check status
    if (doc.status !== "pending_signature") {
      return NextResponse.json({ error: "Dit document kan niet ondertekend worden." }, { status: 400 });
    }

    // Check expiration
    if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
      await db
        .update(signedDocuments)
        .set({ status: "expired", updatedAt: new Date().toISOString() })
        .where(eq(signedDocuments.id, doc.id));

      await createSigningEvent({
        documentId: doc.id,
        action: "expired",
        actorType: "system",
      });

      return NextResponse.json({ error: "Dit document is verlopen." }, { status: 400 });
    }

    const { ipAddress, userAgent } = extractRequestMeta(request);

    // Log signature_started
    await createSigningEvent({
      documentId: doc.id,
      action: "signature_started",
      actorType: "aanbieder",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: user.aanbieder.bedrijfsnaam,
      ipAddress,
      userAgent,
    });

    // Verify document integrity
    if (!doc.draftFileUrl || !doc.documentHashPresign) {
      return NextResponse.json({ error: "Documentgegevens onvolledig." }, { status: 500 });
    }

    const currentHash = await hashFromUrl(doc.draftFileUrl);
    if (currentHash !== doc.documentHashPresign) {
      await createSigningEvent({
        documentId: doc.id,
        action: "signature_failed",
        actorType: "system",
        documentHashAtEvent: currentHash,
        metadata: { reason: "Hash mismatch", expected: doc.documentHashPresign, actual: currentHash },
      });

      return NextResponse.json({
        error: "Het document is gewijzigd na aanmaak. Ondertekening geblokkeerd. Neem contact op met de beheerder.",
      }, { status: 409 });
    }

    // Fetch draft PDF
    const draftResponse = await fetch(doc.draftFileUrl);
    const draftBytes = new Uint8Array(await draftResponse.arrayBuffer());

    // Get aanbieder bedrijfsnaam
    const [aanbieder] = await db
      .select({ bedrijfsnaam: aanbieders.bedrijfsnaam })
      .from(aanbieders)
      .where(eq(aanbieders.id, user.aanbieder.id))
      .limit(1);

    const now = new Date().toISOString();

    // Append signature page
    const signedPdfBytes = await appendSignaturePage(draftBytes, {
      documentTitle: doc.title,
      documentVersion: doc.version,
      documentUid: doc.documentUid,
      signerFullName: signerFullName.trim(),
      signerRole: signerRole.trim(),
      organisatie: aanbieder?.bedrijfsnaam || user.aanbieder.bedrijfsnaam,
      signedAt: now,
      documentHashPresign: doc.documentHashPresign,
      ipAddress,
    });

    // Hash signed PDF
    const postsignHash = hashBuffer(signedPdfBytes);

    // Upload signed PDF
    const signedFileUrl = await uploadBuffer(
      signedPdfBytes,
      `signed-${doc.documentUid}.pdf`,
      "signing-signed"
    );

    // Update document - use WHERE status check for concurrency safety
    const result = await db
      .update(signedDocuments)
      .set({
        status: "signed",
        signedAt: now,
        signerFullName: signerFullName.trim(),
        signerRole: signerRole.trim(),
        signedFileUrl,
        documentHashPostsign: postsignHash,
        retentionUntil: new Date(Date.now() + 7 * 365.25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: now,
      })
      .where(
        and(
          eq(signedDocuments.id, doc.id),
          eq(signedDocuments.status, "pending_signature")
        )
      );

    // Log signed event
    await createSigningEvent({
      documentId: doc.id,
      action: "signed",
      actorType: "aanbieder",
      actorId: user.id,
      actorEmail: user.email,
      actorDisplayName: user.aanbieder.bedrijfsnaam,
      ipAddress,
      userAgent,
      documentHashAtEvent: postsignHash,
      metadata: {
        signerFullName: signerFullName.trim(),
        signerRole: signerRole.trim(),
      },
    });

    // Send confirmation email
    const formattedDate = new Date(now).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await sendEmail(user.email, {
      type: "document_ondertekend",
      bedrijfsnaam: aanbieder?.bedrijfsnaam || user.aanbieder.bedrijfsnaam,
      documentTitle: doc.title,
      signerFullName: signerFullName.trim(),
      signedAt: formattedDate,
      verificationUrl: `${BASE_URL}/verify/${doc.documentUid}`,
    });

    return NextResponse.json({
      success: true,
      document: {
        documentUid: doc.documentUid,
        status: "signed",
        signedAt: now,
        signedFileUrl,
      },
    });
  } catch (error) {
    console.error("Portal signing sign error:", error);
    return NextResponse.json({ error: "Er ging iets mis bij het ondertekenen." }, { status: 500 });
  }
}
