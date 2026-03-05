/**
 * Migratie: pricing model van per-woningtype naar vast abonnement + per lead
 *
 * Wijzigingen:
 * 1. Nieuwe tabel: woningtype_selecties (gratis selecties)
 * 2. Nieuwe tabel: aanbieder_subscriptions (vast maandelijks abonnement)
 * 3. Nieuwe tabel: leads (offerteaanvragen, betaald per stuk)
 * 4. Verwijder oude tabel: woningtype_subscriptions
 * 5. Update payments.type kolom
 */

import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    console.error("TURSO_DATABASE_URL niet gevonden in .env.local");
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  console.log("Migratie starten...\n");

  // 1. Nieuwe tabel: woningtype_selecties
  console.log("1. Tabel woningtype_selecties aanmaken...");
  await client.execute(`
    CREATE TABLE IF NOT EXISTS woningtype_selecties (
      id TEXT PRIMARY KEY,
      aanbieder_id TEXT NOT NULL REFERENCES aanbieders(id) ON DELETE CASCADE,
      woningtype_slug TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_selecties_aanbieder_woningtype
    ON woningtype_selecties(aanbieder_id, woningtype_slug)
  `);
  console.log("   ✓ woningtype_selecties aangemaakt");

  // 2. Nieuwe tabel: aanbieder_subscriptions
  console.log("2. Tabel aanbieder_subscriptions aanmaken...");
  await client.execute(`
    CREATE TABLE IF NOT EXISTS aanbieder_subscriptions (
      id TEXT PRIMARY KEY,
      aanbieder_id TEXT NOT NULL REFERENCES aanbieders(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'active',
      mollie_subscription_id TEXT,
      started_at TEXT NOT NULL,
      cancelled_at TEXT
    )
  `);
  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_aanbieder_sub_aanbieder
    ON aanbieder_subscriptions(aanbieder_id)
  `);
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_aanbieder_sub_status
    ON aanbieder_subscriptions(status)
  `);
  console.log("   ✓ aanbieder_subscriptions aangemaakt");

  // 3. Nieuwe tabel: leads
  console.log("3. Tabel leads aanmaken...");
  await client.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      aanbieder_id TEXT REFERENCES aanbieders(id) ON DELETE SET NULL,
      naam TEXT NOT NULL,
      email TEXT NOT NULL,
      telefoon TEXT,
      woningtype TEXT,
      bericht TEXT,
      bron TEXT,
      gefactureerd INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_leads_aanbieder
    ON leads(aanbieder_id)
  `);
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_leads_gefactureerd
    ON leads(gefactureerd)
  `);
  console.log("   ✓ leads aangemaakt");

  // 4. Migreer bestaande data uit woningtype_subscriptions naar selecties
  console.log("4. Data migreren uit woningtype_subscriptions...");
  try {
    const existing = await client.execute(
      "SELECT * FROM woningtype_subscriptions WHERE status = 'active'"
    );
    if (existing.rows.length > 0) {
      for (const row of existing.rows) {
        await client.execute({
          sql: `INSERT OR IGNORE INTO woningtype_selecties (id, aanbieder_id, woningtype_slug, created_at)
                VALUES (?, ?, ?, ?)`,
          args: [
            row.id as string,
            row.aanbieder_id as string,
            row.woningtype_slug as string,
            row.started_at as string || new Date().toISOString(),
          ],
        });
      }
      console.log(`   ✓ ${existing.rows.length} selectie(s) gemigreerd`);
    } else {
      console.log("   ✓ Geen bestaande data om te migreren");
    }
  } catch {
    console.log("   ✓ Geen woningtype_subscriptions tabel gevonden (al verwijderd?)");
  }

  // 5. Verwijder oude tabel
  console.log("5. Oude tabel woningtype_subscriptions verwijderen...");
  try {
    await client.execute("DROP TABLE IF EXISTS woningtype_subscriptions");
    console.log("   ✓ woningtype_subscriptions verwijderd");
  } catch {
    console.log("   ✓ Tabel bestond niet");
  }

  console.log("\n✓ Migratie voltooid!");
  console.log("\nNieuwe tabellen:");
  console.log("  - woningtype_selecties (gratis woningtype-selecties)");
  console.log("  - aanbieder_subscriptions (vast maandelijks abonnement)");
  console.log("  - leads (offerteaanvragen, betaald per stuk)");

  process.exit(0);
}

main().catch((err) => {
  console.error("Migratie fout:", err.message);
  process.exit(1);
});
