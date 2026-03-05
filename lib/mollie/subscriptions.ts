import { db } from "@/lib/db";
import { aanbiederSubscriptions, mollieCustomers, payments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

/**
 * Activeer een aanbieder-abonnement na succesvolle eerste betaling
 */
export async function activateSubscription(params: {
  aanbiederId: string;
  molliePaymentId: string;
  amount: number;
}): Promise<void> {
  const now = new Date().toISOString();
  const subscriptionId = uuidv4();

  await db.insert(aanbiederSubscriptions).values({
    id: subscriptionId,
    aanbiederId: params.aanbiederId,
    status: "active",
    startedAt: now,
  });

  await db.insert(payments).values({
    id: uuidv4(),
    aanbiederId: params.aanbiederId,
    type: "aanbieder_subscription",
    referenceId: subscriptionId,
    amount: params.amount,
    currency: "EUR",
    molliePaymentId: params.molliePaymentId,
    mollieStatus: "paid",
    createdAt: now,
    paidAt: now,
  });
}

/**
 * Markeer mandate als actief na succesvolle eerste betaling
 */
export async function markMandateActive(aanbiederId: string): Promise<void> {
  await db
    .update(mollieCustomers)
    .set({ hasMandateActive: 1 })
    .where(eq(mollieCustomers.aanbiederId, aanbiederId));
}

/**
 * Cancel een aanbieder-abonnement
 */
export async function cancelSubscription(
  aanbiederId: string
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .update(aanbiederSubscriptions)
    .set({ status: "cancelled", cancelledAt: now })
    .where(eq(aanbiederSubscriptions.aanbiederId, aanbiederId));
}
