import { db } from "@/lib/db";
import { signedDocuments, aanbieders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashFromUrl } from "./hash";

export type VerificationResult = {
  valid: boolean;
  document?: {
    title: string;
    documentUid: string;
    documentType: string;
    version: number;
    signedAt: string;
    signerInitials: string; // privacy: "Jan V." i.p.v. volledige naam
    signerRole: string;
    aanbiederBedrijfsnaam: string;
    hashMatch: boolean;
  };
  error?: string;
};

export async function verifyDocument(documentUid: string): Promise<VerificationResult> {
  try {
    const rows = await db
      .select({
        id: signedDocuments.id,
        title: signedDocuments.title,
        documentUid: signedDocuments.documentUid,
        documentType: signedDocuments.documentType,
        version: signedDocuments.version,
        status: signedDocuments.status,
        signedAt: signedDocuments.signedAt,
        signerFullName: signedDocuments.signerFullName,
        signerRole: signedDocuments.signerRole,
        signedFileUrl: signedDocuments.signedFileUrl,
        documentHashPostsign: signedDocuments.documentHashPostsign,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
      })
      .from(signedDocuments)
      .leftJoin(aanbieders, eq(signedDocuments.aanbiederId, aanbieders.id))
      .where(eq(signedDocuments.documentUid, documentUid))
      .limit(1);

    if (rows.length === 0) {
      return { valid: false, error: "Document niet gevonden." };
    }

    const doc = rows[0];

    if (doc.status !== "signed") {
      return { valid: false, error: "Dit document is niet ondertekend." };
    }

    if (!doc.signedFileUrl || !doc.documentHashPostsign) {
      return { valid: false, error: "Ondertekeningsgegevens onvolledig." };
    }

    // Recalculate hash from stored file
    const currentHash = await hashFromUrl(doc.signedFileUrl);
    const hashMatch = currentHash === doc.documentHashPostsign;

    // Privacy: show only first name + initial of last name
    const signerInitials = formatSignerInitials(doc.signerFullName || "");

    return {
      valid: hashMatch,
      document: {
        title: doc.title,
        documentUid: doc.documentUid,
        documentType: doc.documentType,
        version: doc.version,
        signedAt: doc.signedAt!,
        signerInitials,
        signerRole: doc.signerRole || "",
        aanbiederBedrijfsnaam: doc.bedrijfsnaam || "",
        hashMatch,
      },
    };
  } catch (error) {
    console.error("Verification error:", error);
    return { valid: false, error: "Verificatie mislukt door een technische fout." };
  }
}

function formatSignerInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
