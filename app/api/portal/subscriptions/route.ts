import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { woningtypeSelecties } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(woningtypeSelecties)
      .where(eq(woningtypeSelecties.aanbiederId, user.aanbieder.id));

    return NextResponse.json({ selecties: result });
  } catch (error) {
    console.error("Get selecties error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    if (user.aanbieder.status !== "approved") {
      return NextResponse.json(
        { error: "Je profiel moet eerst goedgekeurd zijn." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { woningtypeSlug } = body;

    if (!woningtypeSlug) {
      return NextResponse.json({ error: "Woningtype is verplicht." }, { status: 400 });
    }

    await db.insert(woningtypeSelecties).values({
      id: uuidv4(),
      aanbiederId: user.aanbieder.id,
      woningtypeSlug,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create selectie error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const woningtypeSlug = searchParams.get("woningtypeSlug");

    if (!woningtypeSlug) {
      return NextResponse.json({ error: "Woningtype is verplicht." }, { status: 400 });
    }

    await db
      .delete(woningtypeSelecties)
      .where(
        and(
          eq(woningtypeSelecties.aanbiederId, user.aanbieder.id),
          eq(woningtypeSelecties.woningtypeSlug, woningtypeSlug)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete selectie error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
