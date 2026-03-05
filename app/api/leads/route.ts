import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 uur

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

const leadSchema = z.object({
  configuratie: z.object({
    woningType: z.string().nullable(),
    totaalM2: z.number(),
    aantalVerdiepingen: z.number(),
    kamers: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        naam: z.string(),
        m2: z.number(),
        breedte: z.number(),
        diepte: z.number(),
        x: z.number(),
        y: z.number(),
        kleur: z.string(),
      })
    ),
    buitenBreedte: z.number(),
    buitenDiepte: z.number(),
    dakType: z.string().nullable(),
    gevelType: z.string().nullable(),
    kozijnType: z.string().nullable(),
    glasType: z.string(),
    funderingType: z.string().nullable(),
    verwarmingType: z.string().nullable(),
    isolatieNiveau: z.string(),
    zonnepanelen: z.number(),
    vloerverwarming: z.boolean(),
    keukenNiveau: z.string(),
    badkamerNiveau: z.string(),
  }),
  contact: z.object({
    naam: z.string().min(2, "Naam is verplicht"),
    email: z.string().email("Ongeldig e-mailadres"),
    telefoon: z.string().min(10, "Ongeldig telefoonnummer"),
    postcode: z.string().min(4, "Ongeldige postcode"),
    oplevertermijn: z.string(),
    budget: z.string(),
    woonsituatie: z.string().optional(),
    doel: z.string().optional(),
    heeftKavel: z.enum(["ja", "nee", "onbekend"]),
    kavelGrootte: z.number().optional(),
    opmerkingen: z.string().optional(),
  }),
  prijsIndicatie: z.object({
    laag: z.number(),
    hoog: z.number(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Te veel aanvragen. Probeer het later opnieuw." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Ongeldige gegevens", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    // Store full configuratie + prijsIndicatie as JSON in bericht for reference
    const bericht = JSON.stringify({
      configuratie: parsed.data.configuratie,
      prijsIndicatie: parsed.data.prijsIndicatie,
      contact: {
        postcode: parsed.data.contact.postcode,
        oplevertermijn: parsed.data.contact.oplevertermijn,
        budget: parsed.data.contact.budget,
        woonsituatie: parsed.data.contact.woonsituatie,
        doel: parsed.data.contact.doel,
        heeftKavel: parsed.data.contact.heeftKavel,
        kavelGrootte: parsed.data.contact.kavelGrootte,
        opmerkingen: parsed.data.contact.opmerkingen,
      },
    });

    await db.insert(leads).values({
      id,
      aanbiederId: null,
      naam: parsed.data.contact.naam,
      email: parsed.data.contact.email,
      telefoon: parsed.data.contact.telefoon,
      woningtype: parsed.data.configuratie.woningType,
      bericht,
      bron: "configurator",
      createdAt: now,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Fout bij opslaan lead:", error);
    return NextResponse.json(
      { success: false, error: "Er is een serverfout opgetreden" },
      { status: 500 }
    );
  }
}
