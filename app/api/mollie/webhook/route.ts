import { NextResponse } from "next/server";
import { getMollieClient } from "@/lib/mollie/client";
import { activateSubscription, markMandateActive } from "@/lib/mollie/subscriptions";
import { db } from "@/lib/db";
import { payments, aanbieders, users, leads } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/lib/email/send";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const paymentId = body.get("id") as string;

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
    }

    const mollie = await getMollieClient();
    const payment = await mollie.payments.get(paymentId);
    const metadata = payment.metadata as Record<string, string> | null;

    if (!metadata?.aanbiederId || !metadata?.type) {
      console.log(`[Mollie Webhook] Payment ${paymentId} has no relevant metadata, skipping`);
      return NextResponse.json({ received: true });
    }

    const aanbiederId = metadata.aanbiederId;
    const type = metadata.type as "aanbieder_subscription" | "occasion_listing" | "lead";

    if (payment.status === "paid") {
      const amount = Math.round(parseFloat(payment.amount.value) * 100);

      // Bij eerste betaling: mandate activeren
      if (payment.sequenceType === "first") {
        await markMandateActive(aanbiederId);
      }

      // Aanbieder-abonnement activeren (eerste betaling)
      if (type === "aanbieder_subscription" && payment.sequenceType === "first") {
        await activateSubscription({
          aanbiederId,
          molliePaymentId: paymentId,
          amount,
        });
      } else {
        // Betaling opslaan (recurring of andere types)
        await db.insert(payments).values({
          id: uuidv4(),
          aanbiederId,
          type,
          referenceId: metadata.referenceId || null,
          amount,
          currency: "EUR",
          molliePaymentId: paymentId,
          mollieStatus: "paid",
          createdAt: new Date().toISOString(),
          paidAt: new Date().toISOString(),
        });

        // Leads markeren als gefactureerd na succesvolle betaling
        if (metadata.leadIds) {
          try {
            const leadIds = JSON.parse(metadata.leadIds) as string[];
            if (leadIds.length > 0) {
              await db
                .update(leads)
                .set({ gefactureerd: 1 })
                .where(inArray(leads.id, leadIds));
            }
          } catch {
            console.error("[Webhook] Failed to parse leadIds from metadata");
          }
        }
      }

      // E-mail: betaling geslaagd
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
            type: "betaling_geslaagd",
            bedrijfsnaam: aanbiederRow[0].bedrijfsnaam,
            bedrag: `€ ${payment.amount.value}`,
            omschrijving: metadata.description || "abonnement",
          });
        }
      }

      // TODO: Moneybird factuur aanmaken (na Moneybird env setup)

    } else if (payment.status === "failed" || payment.status === "expired") {
      // Betaling mislukt opslaan
      await db.insert(payments).values({
        id: uuidv4(),
        aanbiederId,
        type,
        amount: Math.round(parseFloat(payment.amount.value) * 100),
        currency: "EUR",
        molliePaymentId: paymentId,
        mollieStatus: payment.status,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Mollie webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
