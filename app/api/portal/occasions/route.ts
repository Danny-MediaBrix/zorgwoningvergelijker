import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbiedersOccasions } from "@/lib/db/schema";
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
      .from(aanbiedersOccasions)
      .where(eq(aanbiedersOccasions.aanbiederId, user.aanbieder.id));

    return NextResponse.json({ occasions: result });
  } catch (error) {
    console.error("Get occasions error:", error);
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
    const { titel, beschrijving, prijs, prijsLabel, woningtype, locatie, provincie,
            oppervlakteM2, bouwjaar, conditie, isolatie, dakType, fundering,
            energielabel, leveringstermijn, financieringsopties, images } = body;

    if (!titel) {
      return NextResponse.json({ error: "Titel is verplicht." }, { status: 400 });
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    await db.insert(aanbiedersOccasions).values({
      id,
      aanbiederId: user.aanbieder.id,
      titel,
      beschrijving: beschrijving || null,
      prijs: prijs ?? null,
      prijsLabel: prijsLabel || null,
      woningtype: woningtype || null,
      locatie: locatie || null,
      provincie: provincie || null,
      oppervlakteM2: oppervlakteM2 ?? null,
      bouwjaar: bouwjaar ?? null,
      conditie: conditie || null,
      isolatie: isolatie || null,
      dakType: dakType || null,
      fundering: fundering || null,
      energielabel: energielabel || null,
      leveringstermijn: leveringstermijn || null,
      financieringsopties: financieringsopties ? JSON.stringify(financieringsopties) : null,
      images: images ? JSON.stringify(images) : null,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id, titel, status: "active" });
  } catch (error) {
    console.error("Create occasion error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
