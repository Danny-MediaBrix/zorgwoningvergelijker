import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
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

    const result = await db
      .select()
      .from(portfolio)
      .where(
        and(
          eq(portfolio.id, id),
          eq(portfolio.aanbiederId, user.aanbieder.id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Portfolio item niet gevonden." }, { status: 404 });
    }

    if (result[0].afbeeldingUrl) {
      await deleteFile(result[0].afbeeldingUrl);
    }

    await db.delete(portfolio).where(eq(portfolio.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
