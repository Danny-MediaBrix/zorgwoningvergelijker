import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";

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

const enrichSchema = z.object({
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
    oplevertermijn: z.string().optional(),
    budget: z.string().optional(),
    heeftKavel: z.enum(["ja", "nee", "onbekend"]).optional(),
    opmerkingen: z.string().optional(),
  }).optional(),
  prijsIndicatie: z.object({
    laag: z.number(),
    hoog: z.number(),
  }),
  plattegrondBase64: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find existing lead
    const existing = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Lead niet gevonden" },
        { status: 404 }
      );
    }

    const lead = existing[0];
    const body = await request.json();
    const parsed = enrichSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Ongeldige gegevens", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { configuratie, prijsIndicatie, contact } = parsed.data;

    // Upload plattegrond screenshot if provided
    let plattegrondUrl: string | null = lead.plattegrondUrl || null;
    if (parsed.data.plattegrondBase64) {
      try {
        const base64Data = parsed.data.plattegrondBase64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const blob = await put(`plattegronden/${id}-verfijnd.png`, buffer, {
          access: "public",
          contentType: "image/png",
        });
        plattegrondUrl = blob.url;
      } catch (err) {
        console.error("Fout bij uploaden plattegrond:", err);
      }
    }

    // Parse existing bericht and merge
    let existingBericht: Record<string, unknown> = {};
    try {
      existingBericht = lead.bericht ? JSON.parse(lead.bericht) : {};
    } catch {
      existingBericht = {};
    }

    const existingContact = (existingBericht.contact as Record<string, unknown>) || {};

    const updatedBericht = JSON.stringify({
      configuratie: parsed.data.configuratie,
      prijsIndicatie: parsed.data.prijsIndicatie,
      contact: {
        ...existingContact,
        ...(contact || {}),
      },
      isVerfijnd: true,
    });

    // Update lead in database
    try {
      await db.update(leads).set({
        bericht: updatedBericht,
        plattegrondUrl,
      }).where(eq(leads.id, id));
    } catch {
      // Fallback without plattegrondUrl column
      await db.update(leads).set({
        bericht: updatedBericht,
      }).where(eq(leads.id, id));
    }

    // Send updated notification to admin
    await Promise.allSettled([
      sendEmail("info@zorgwoningvergelijker.nl", {
        type: "offerte_notificatie",
        naam: lead.naam,
        email: lead.email,
        telefoon: lead.telefoon || "",
        postcode: (existingContact.postcode as string) || "",
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
        budget: contact?.budget || (existingContact.budget as string) || "",
        oplevertermijn: contact?.oplevertermijn || (existingContact.oplevertermijn as string) || "",
        heeftKavel: contact?.heeftKavel || (existingContact.heeftKavel as string) || "onbekend",
        prijsLaag: prijsIndicatie.laag,
        prijsHoog: prijsIndicatie.hoog,
        opmerkingen: contact?.opmerkingen || (existingContact.opmerkingen as string) || undefined,
        plattegrondUrl: plattegrondUrl || undefined,
      }),
    ]);

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    console.error("Fout bij bijwerken lead:", error);
    return NextResponse.json(
      { success: false, error: "Er is een serverfout opgetreden" },
      { status: 500 }
    );
  }
}
