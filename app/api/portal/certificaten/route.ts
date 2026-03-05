import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificaten } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
      .from(certificaten)
      .where(eq(certificaten.aanbiederId, user.aanbieder.id));

    return NextResponse.json({ certificaten: result });
  } catch (error) {
    console.error("Get certificaten error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const body = await request.json();
    const { naam, bewijsUrl } = body;

    if (!naam || !bewijsUrl) {
      return NextResponse.json(
        { error: "Naam en bewijs zijn verplicht." },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    await db.insert(certificaten).values({
      id,
      aanbiederId: user.aanbieder.id,
      naam,
      bewijsUrl,
      createdAt: now,
    });

    return NextResponse.json({ id, naam, bewijsUrl, createdAt: now });
  } catch (error) {
    console.error("Create certificaat error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
