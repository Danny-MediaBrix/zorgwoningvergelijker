import { getMollieClient } from "./client";
import { SequenceType, PaymentMethod } from "@mollie/api-client";
import { db } from "@/lib/db";
import { mollieCustomers, platformSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

/**
 * Haal de webhook base URL op uit platformSettings, fallback naar env var
 */
export async function getWebhookBaseUrl(): Promise<string> {
  try {
    const row = await db
      .select()
      .from(platformSettings)
      .where(eq(platformSettings.key, "mollie_webhook_base_url"))
      .limit(1);

    if (row.length > 0 && row[0].value) {
      return row[0].value.replace(/\/$/, ""); // strip trailing slash
    }
  } catch {
    // fallback
  }

  return (process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl").replace(/\/$/, "");
}

/**
 * Zorg dat er een Mollie customer bestaat voor deze aanbieder
 */
export async function ensureMollieCustomer(
  aanbiederId: string,
  bedrijfsnaam: string,
  email: string
): Promise<string> {
  // Check of er al een koppeling is
  const existing = await db
    .select()
    .from(mollieCustomers)
    .where(eq(mollieCustomers.aanbiederId, aanbiederId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0].mollieCustomerId;
  }

  // Nieuwe Mollie customer aanmaken
  const mollie = await getMollieClient();
  const customer = await mollie.customers.create({
    name: bedrijfsnaam,
    email,
  });

  await db.insert(mollieCustomers).values({
    id: uuidv4(),
    aanbiederId,
    mollieCustomerId: customer.id,
    createdAt: new Date().toISOString(),
  });

  return customer.id;
}

/**
 * Eerste betaling aanmaken (iDEAL, sequenceType: first)
 * Creëert een mandate voor recurring payments
 */
export async function createFirstPayment(params: {
  mollieCustomerId: string;
  amount: number; // centen
  description: string;
  redirectUrl: string;
  metadata: Record<string, string>;
}): Promise<{ checkoutUrl: string; paymentId: string }> {
  const mollie = await getMollieClient();
  const baseUrl = await getWebhookBaseUrl();

  const payment = await mollie.payments.create({
    amount: {
      currency: "EUR",
      value: (params.amount / 100).toFixed(2),
    },
    description: params.description,
    sequenceType: SequenceType.first,
    customerId: params.mollieCustomerId,
    method: PaymentMethod.ideal,
    redirectUrl: params.redirectUrl,
    webhookUrl: `${baseUrl}/api/mollie/webhook`,
    metadata: params.metadata,
  });

  return {
    checkoutUrl: payment.getCheckoutUrl()!,
    paymentId: payment.id,
  };
}

/**
 * Recurring betaling aanmaken (SEPA Direct Debit)
 */
export async function createRecurringPayment(params: {
  mollieCustomerId: string;
  amount: number; // centen
  description: string;
  metadata: Record<string, string>;
}): Promise<string> {
  const mollie = await getMollieClient();
  const baseUrl = await getWebhookBaseUrl();

  const payment = await mollie.payments.create({
    amount: {
      currency: "EUR",
      value: (params.amount / 100).toFixed(2),
    },
    description: params.description,
    sequenceType: SequenceType.recurring,
    customerId: params.mollieCustomerId,
    webhookUrl: `${baseUrl}/api/mollie/webhook`,
    metadata: params.metadata,
  });

  return payment.id;
}
