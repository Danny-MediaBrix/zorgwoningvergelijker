import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { leads, aanbieders, users, leadDispatches } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/lib/email/send";

const INFO_EMAIL = "info@zorgwoningvergelijker.nl";

type ParsedBericht = {
  configuratie?: {
    woningType?: string;
    totaalM2?: number;
    aantalVerdiepingen?: number;
    buitenBreedte?: number;
    buitenDiepte?: number;
    dakType?: string | null;
    gevelType?: string | null;
    verwarmingType?: string | null;
    zonnepanelen?: number;
    vloerverwarming?: boolean;
    keukenNiveau?: string;
    badkamerNiveau?: string;
    kamers?: { naam: string; m2: number }[];
  };
  prijsIndicatie?: { laag: number; hoog: number };
  contact?: {
    postcode?: string;
    oplevertermijn?: string;
    budget?: string;
    heeftKavel?: string;
    opmerkingen?: string;
  };
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { aanbiederIds } = body;

    if (!Array.isArray(aanbiederIds) || aanbiederIds.length === 0) {
      return NextResponse.json({ error: "Selecteer minimaal één aanbieder." }, { status: 400 });
    }

    // Fetch the lead
    const [lead] = await db
      .select()
      .from(leads)
      .where(eq(leads.id, id))
      .limit(1);

    if (!lead) {
      return NextResponse.json({ error: "Lead niet gevonden." }, { status: 404 });
    }

    // Fetch selected aanbieders with their user emails
    const selectedAanbieders = await db
      .select({
        id: aanbieders.id,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        contactEmail: aanbieders.contactEmail,
        userId: aanbieders.userId,
      })
      .from(aanbieders)
      .where(inArray(aanbieders.id, aanbiederIds));

    // Get user emails for aanbieders
    const userIds = selectedAanbieders.map((a) => a.userId);
    const aanbiederUsers = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(inArray(users.id, userIds));

    const userEmailMap = new Map(aanbiederUsers.map((u) => [u.id, u.email]));

    // Parse lead data
    let parsed: ParsedBericht | null = null;
    try {
      if (lead.bericht) parsed = JSON.parse(lead.bericht);
    } catch {
      // not JSON, that's fine
    }

    const now = new Date().toISOString();
    const results: { aanbiederId: string; bedrijfsnaam: string; success: boolean; error?: string | null }[] = [];

    // Send email to each aanbieder individually
    for (const aanbieder of selectedAanbieders) {
      const email = aanbieder.contactEmail || userEmailMap.get(aanbieder.userId);
      if (!email) continue;

      let success = false;
      let emailError: string | null = null;
      try {
        success = await sendEmail(email, {
          type: "lead_doorgestuurd",
          bedrijfsnaam: aanbieder.bedrijfsnaam,
          leadNaam: lead.naam,
          leadEmail: lead.email,
          leadTelefoon: lead.telefoon,
          leadWoningtype: lead.woningtype,
          leadPostcode: parsed?.contact?.postcode || null,
          leadBudget: parsed?.contact?.budget || null,
          leadOplevertermijn: parsed?.contact?.oplevertermijn || null,
          leadHeeftKavel: parsed?.contact?.heeftKavel || null,
          leadOpmerkingen: parsed?.contact?.opmerkingen || null,
          configuratie: parsed?.configuratie || null,
          prijsIndicatie: parsed?.prijsIndicatie || null,
          plattegrondUrl: lead.plattegrondUrl,
        }, { cc: INFO_EMAIL });
      } catch (err) {
        emailError = err instanceof Error ? err.message : "Onbekende fout";
        console.error(`Lead dispatch email failed for ${aanbieder.bedrijfsnaam}:`, err);
      }

      // Only track dispatch if email was sent successfully
      if (success) {
        await db.insert(leadDispatches).values({
          id: uuidv4(),
          leadId: lead.id,
          aanbiederId: aanbieder.id,
          sentByUserId: user.id,
          sentAt: now,
        });
      }

      results.push({
        aanbiederId: aanbieder.id,
        bedrijfsnaam: aanbieder.bedrijfsnaam,
        success,
        error: emailError,
      });
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      sent: successCount,
      total: results.length,
      results,
    });
  } catch (error) {
    console.error("Lead dispatch error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
