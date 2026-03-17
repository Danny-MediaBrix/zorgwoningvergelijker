import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";

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

const kamerSchema = z.object({
  id: z.string(),
  type: z.string(),
  naam: z.string(),
  m2: z.number(),
  breedte: z.number(),
  diepte: z.number(),
  x: z.number(),
  y: z.number(),
  kleur: z.string(),
});

const leadSchema = z.object({
  configuratie: z.object({
    woningType: z.string().nullable(),
    totaalM2: z.number(),
    aantalVerdiepingen: z.number(),
    kamers: z.array(kamerSchema),
    modules: z.array(z.object({
      id: z.string(),
      naam: z.string(),
      buitenBreedte: z.number(),
      buitenDiepte: z.number(),
      kamers: z.array(kamerSchema),
    })).optional(),
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
  plattegrondBase64: z.string().nullable().optional(),
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
    const { contact, configuratie, prijsIndicatie } = parsed.data;

    // Upload plattegrond screenshot to Vercel Blob (if provided)
    let plattegrondUrl: string | null = null;
    if (parsed.data.plattegrondBase64) {
      try {
        const base64Data = parsed.data.plattegrondBase64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const blob = await put(`plattegronden/${id}.png`, buffer, {
          access: "public",
          contentType: "image/png",
        });
        plattegrondUrl = blob.url;
      } catch (err) {
        console.error("Fout bij uploaden plattegrond:", err);
      }
    }

    // Store full configuratie + prijsIndicatie as JSON in bericht for reference
    const bericht = JSON.stringify({
      configuratie: parsed.data.configuratie,
      prijsIndicatie: parsed.data.prijsIndicatie,
      contact: {
        postcode: contact.postcode,
        oplevertermijn: contact.oplevertermijn,
        budget: contact.budget,
        woonsituatie: contact.woonsituatie,
        doel: contact.doel,
        heeftKavel: contact.heeftKavel,
        kavelGrootte: contact.kavelGrootte,
        opmerkingen: contact.opmerkingen,
      },
    });

    try {
      await db.insert(leads).values({
        id,
        aanbiederId: null,
        naam: contact.naam,
        email: contact.email,
        telefoon: contact.telefoon,
        woningtype: configuratie.woningType,
        bericht,
        bron: "configurator",
        plattegrondUrl,
        createdAt: now,
      });
    } catch {
      // Fallback: plattegrond_url column may not exist yet
      await db.insert(leads).values({
        id,
        aanbiederId: null,
        naam: contact.naam,
        email: contact.email,
        telefoon: contact.telefoon,
        woningtype: configuratie.woningType,
        bericht,
        bron: "configurator",
        createdAt: now,
      });
    }

    await Promise.allSettled([
      sendEmail(contact.email, {
        type: "offerte_bevestiging",
        naam: contact.naam,
        woningtype: configuratie.woningType || "Onbekend",
        m2: configuratie.totaalM2,
        prijsLaag: prijsIndicatie.laag,
        prijsHoog: prijsIndicatie.hoog,
      }),
      sendEmail("info@zorgwoningvergelijker.nl", {
        type: "offerte_notificatie",
        naam: contact.naam,
        email: contact.email,
        telefoon: contact.telefoon,
        postcode: contact.postcode,
        woningtype: configuratie.woningType || "Onbekend",
        m2: configuratie.totaalM2,
        aantalVerdiepingen: configuratie.aantalVerdiepingen,
        buitenBreedte: configuratie.buitenBreedte,
        buitenDiepte: configuratie.buitenDiepte,
        dakType: configuratie.dakType,
        gevelType: configuratie.gevelType,
        kozijnType: configuratie.kozijnType,
        glasType: configuratie.glasType,
        funderingType: configuratie.funderingType,
        verwarmingType: configuratie.verwarmingType,
        isolatieNiveau: configuratie.isolatieNiveau,
        zonnepanelen: configuratie.zonnepanelen,
        vloerverwarming: configuratie.vloerverwarming,
        keukenNiveau: configuratie.keukenNiveau,
        badkamerNiveau: configuratie.badkamerNiveau,
        kamers: configuratie.kamers.map((k) => ({
          naam: k.naam,
          type: k.type,
          m2: k.m2,
          breedte: k.breedte,
          diepte: k.diepte,
        })),
        budget: contact.budget,
        oplevertermijn: contact.oplevertermijn,
        heeftKavel: contact.heeftKavel,
        prijsLaag: prijsIndicatie.laag,
        prijsHoog: prijsIndicatie.hoog,
        opmerkingen: contact.opmerkingen,
        plattegrondUrl: plattegrondUrl || undefined,
      }),
    ]);

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Fout bij opslaan lead:", error);
    return NextResponse.json(
      { success: false, error: "Er is een serverfout opgetreden" },
      { status: 500 }
    );
  }
}
