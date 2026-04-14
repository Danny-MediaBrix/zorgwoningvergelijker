import { NextResponse } from "next/server";
import { verifyDocument } from "@/lib/signing/verify";
import { createSigningEvent } from "@/lib/signing/events";
import { db } from "@/lib/db";
import { signedDocuments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;

    const result = await verifyDocument(uid);

    // Find document ID for event logging
    const [doc] = await db
      .select({ id: signedDocuments.id })
      .from(signedDocuments)
      .where(eq(signedDocuments.documentUid, uid))
      .limit(1);

    if (doc) {
      await createSigningEvent({
        documentId: doc.id,
        action: result.valid ? "verified" : "verification_failed",
        actorType: "system",
        metadata: { valid: result.valid, error: result.error },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ valid: false, error: "Verificatie mislukt." }, { status: 500 });
  }
}
