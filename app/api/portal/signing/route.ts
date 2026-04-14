import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { signedDocuments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const user = await validateSession();
  if (!user || user.role !== "aanbieder" || !user.aanbieder) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const documents = await db
      .select({
        id: signedDocuments.id,
        documentUid: signedDocuments.documentUid,
        title: signedDocuments.title,
        documentType: signedDocuments.documentType,
        version: signedDocuments.version,
        status: signedDocuments.status,
        signedAt: signedDocuments.signedAt,
        signerFullName: signedDocuments.signerFullName,
        expiresAt: signedDocuments.expiresAt,
        createdAt: signedDocuments.createdAt,
      })
      .from(signedDocuments)
      .where(eq(signedDocuments.aanbiederId, user.aanbieder.id))
      .orderBy(desc(signedDocuments.createdAt));

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Portal signing GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
