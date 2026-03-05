import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { aanbieders, users, platformSettings, aanbiederSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ensureMollieCustomer, createFirstPayment, getWebhookBaseUrl } from "@/lib/mollie/payments";

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "aanbieder" || !user.aanbieder) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    if (user.aanbieder.status !== "approved") {
      return NextResponse.json({ error: "Profiel niet goedgekeurd." }, { status: 403 });
    }

    const body = await request.json();
    const { type, referenceId } = body;

    if (!type || !["aanbieder_subscription", "occasion_listing"].includes(type)) {
      return NextResponse.json({ error: "Ongeldig betalingstype." }, { status: 400 });
    }

    // Check of aanbieder al een actief abonnement heeft
    if (type === "aanbieder_subscription") {
      const existingSub = await db
        .select()
        .from(aanbiederSubscriptions)
        .where(eq(aanbiederSubscriptions.aanbiederId, user.aanbieder.id))
        .limit(1);

      if (existingSub.length > 0 && existingSub[0].status === "active") {
        return NextResponse.json({ error: "U heeft al een actief abonnement." }, { status: 400 });
      }
    }

    // Prijs ophalen uit platform settings
    const priceKey = type === "aanbieder_subscription"
      ? "prijs_per_aanbieder"
      : "prijs_per_occasion";

    const priceRow = await db
      .select()
      .from(platformSettings)
      .where(eq(platformSettings.key, priceKey))
      .limit(1);

    const amount = priceRow.length > 0
      ? parseInt(priceRow[0].value)
      : type === "aanbieder_subscription" ? 4900 : 2900;

    // Aanbieder gegevens ophalen
    const aanbiederRow = await db
      .select({ bedrijfsnaam: aanbieders.bedrijfsnaam })
      .from(aanbieders)
      .where(eq(aanbieders.id, user.aanbieder.id))
      .limit(1);

    const userRow = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (aanbiederRow.length === 0 || userRow.length === 0) {
      return NextResponse.json({ error: "Aanbieder niet gevonden." }, { status: 404 });
    }

    // Mollie customer aanmaken/ophalen
    const mollieCustomerId = await ensureMollieCustomer(
      user.aanbieder.id,
      aanbiederRow[0].bedrijfsnaam,
      userRow[0].email
    );

    const description = type === "aanbieder_subscription"
      ? "Aanbieder-abonnement Zorgwoningvergelijker"
      : "Occasion-advertentie Zorgwoningvergelijker";

    // Eerste betaling starten
    const baseUrl = await getWebhookBaseUrl();
    const { checkoutUrl, paymentId } = await createFirstPayment({
      mollieCustomerId,
      amount,
      description,
      redirectUrl: `${baseUrl}/portal/${type === "aanbieder_subscription" ? "dashboard" : "occasions"}?payment=success`,
      metadata: {
        aanbiederId: user.aanbieder.id,
        type,
        referenceId: referenceId || "",
        description,
      },
    });

    return NextResponse.json({ checkoutUrl, paymentId });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json({ error: "Er ging iets mis bij het aanmaken van de betaling." }, { status: 500 });
  }
}
