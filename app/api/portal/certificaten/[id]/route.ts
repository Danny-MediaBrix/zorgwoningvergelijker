import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificaten } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";
import { deleteFile } from "@/lib/upload";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { id } = await params;

    // Verifieer eigenaarschap
    const result = await db
      .select()
      .from(certificaten)
      .where(
        and(
          eq(certificaten.id, id),
          eq(certificaten.aanbiederId, user.aanbieder.id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Certificaat niet gevonden." }, { status: 404 });
    }

    // Verwijder bestand uit Vercel Blob
    if (result[0].bewijsUrl) {
      await deleteFile(result[0].bewijsUrl);
    }

    await db.delete(certificaten).where(eq(certificaten.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete certificaat error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
