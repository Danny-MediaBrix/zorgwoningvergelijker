import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
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
      .from(portfolio)
      .where(eq(portfolio.aanbiederId, user.aanbieder.id));

    return NextResponse.json({ portfolio: result });
  } catch (error) {
    console.error("Get portfolio error:", error);
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
    const { titel, afbeeldingUrl, woningType, locatie } = body;

    if (!titel || !afbeeldingUrl) {
      return NextResponse.json(
        { error: "Titel en afbeelding zijn verplicht." },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    await db.insert(portfolio).values({
      id,
      aanbiederId: user.aanbieder.id,
      titel,
      afbeeldingUrl,
      woningType: woningType || null,
      locatie: locatie || null,
      createdAt: now,
    });

    return NextResponse.json({
      id,
      titel,
      afbeeldingUrl,
      woningType,
      locatie,
      createdAt: now,
    });
  } catch (error) {
    console.error("Create portfolio error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
