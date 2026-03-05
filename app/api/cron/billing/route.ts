import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  aanbiederSubscriptions,
  aanbiedersOccasions,
  leads,
  mollieCustomers,
  aanbieders,
  users,
  platformSettings,
} from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { createRecurringPayment } from "@/lib/mollie/payments";
import { sendEmail } from "@/lib/email/send";

export async function GET(request: Request) {
  // Vercel Cron authorization
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Prijzen uit platform settings ophalen
    const priceRows = await db.select().from(platformSettings);
    const priceMap = Object.fromEntries(priceRows.map((r) => [r.key, parseInt(r.value)]));

    const PRIJS_AANBIEDER = priceMap.prijs_per_aanbieder || 4900; // centen
    const PRIJS_OCCASION = priceMap.prijs_per_occasion || 2900; // centen
    const PRIJS_LEAD = priceMap.prijs_per_lead || 500; // centen

    // Alle actieve aanbieder-subscriptions ophalen
    const activeSubs = await db
      .select()
      .from(aanbiederSubscriptions)
      .where(eq(aanbiederSubscriptions.status, "active"));

    let processed = 0;
    let errors = 0;

    for (const sub of activeSubs) {
      const aanbiederId = sub.aanbiederId;

      // Aantal actieve occasions voor deze aanbieder
      const occasionRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(aanbiedersOccasions)
        .where(
          and(
            eq(aanbiedersOccasions.aanbiederId, aanbiederId),
            eq(aanbiedersOccasions.status, "active")
          )
        );
      const occasionCount = occasionRows[0]?.count || 0;

      // Aantal ongefactureerde leads voor deze aanbieder
      const leadRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(leads)
        .where(
          and(
            eq(leads.aanbiederId, aanbiederId),
            eq(leads.gefactureerd, 0)
          )
        );
      const leadCount = leadRows[0]?.count || 0;

      // Totaal berekenen: vast abonnement + occasions + leads
      const amount =
        PRIJS_AANBIEDER +
        occasionCount * PRIJS_OCCASION +
        leadCount * PRIJS_LEAD;

      if (amount <= 0) continue;

      // Mollie customer ophalen met actieve mandate
      const customerRow = await db
        .select()
        .from(mollieCustomers)
        .where(
          and(
            eq(mollieCustomers.aanbiederId, aanbiederId),
            eq(mollieCustomers.hasMandateActive, 1)
          )
        )
        .limit(1);

      if (customerRow.length === 0) {
        console.log(`[Billing] No active mandate for aanbieder ${aanbiederId}, skipping`);
        continue;
      }

      try {
        const parts: string[] = [`Abonnement €${(PRIJS_AANBIEDER / 100).toFixed(2)}`];
        if (occasionCount > 0) {
          parts.push(`${occasionCount} occasion(s) €${((occasionCount * PRIJS_OCCASION) / 100).toFixed(2)}`);
        }
        if (leadCount > 0) {
          parts.push(`${leadCount} lead(s) €${((leadCount * PRIJS_LEAD) / 100).toFixed(2)}`);
        }
        const description = `Maandelijkse incasso: ${parts.join(", ")}`;

        // Lead IDs ophalen zodat webhook ze kan markeren als gefactureerd
        let leadIds: string[] = [];
        if (leadCount > 0) {
          const leadRows = await db
            .select({ id: leads.id })
            .from(leads)
            .where(
              and(
                eq(leads.aanbiederId, aanbiederId),
                eq(leads.gefactureerd, 0)
              )
            );
          leadIds = leadRows.map((r) => r.id);
        }

        const metadata: Record<string, string> = {
          aanbiederId,
          type: "aanbieder_subscription",
          referenceId: sub.id,
          description,
        };
        if (leadIds.length > 0) {
          metadata.leadIds = JSON.stringify(leadIds);
        }

        await createRecurringPayment({
          mollieCustomerId: customerRow[0].mollieCustomerId,
          amount,
          description,
          metadata,
        });

        // Payment record en lead marking worden afgehandeld door de webhook
        // na succesvolle betaling — niet hier doen

        processed++;
      } catch (error) {
        console.error(`[Billing] Failed for aanbieder ${aanbiederId}:`, error);
        errors++;

        // E-mail: betaling mislukt
        const aanbiederRow = await db
          .select({ bedrijfsnaam: aanbieders.bedrijfsnaam, userId: aanbieders.userId })
          .from(aanbieders)
          .where(eq(aanbieders.id, aanbiederId))
          .limit(1);

        if (aanbiederRow.length > 0) {
          const userRow = await db
            .select({ email: users.email })
            .from(users)
            .where(eq(users.id, aanbiederRow[0].userId))
            .limit(1);

          if (userRow.length > 0) {
            await sendEmail(userRow[0].email, {
              type: "betaling_mislukt",
              bedrijfsnaam: aanbiederRow[0].bedrijfsnaam,
              bedrag: `€ ${(amount / 100).toFixed(2)}`,
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      errors,
      total: activeSubs.length,
    });
  } catch (error) {
    console.error("Billing cron error:", error);
    return NextResponse.json({ error: "Billing failed" }, { status: 500 });
  }
}
