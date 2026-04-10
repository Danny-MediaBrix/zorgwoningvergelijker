/**
 * Migratie: voeg ontbrekende kolommen toe aan de leads tabel.
 *
 * Draai met: npx tsx scripts/migrate-add-lead-columns.ts
 */
import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function migrate() {
  console.log("Checking leads table columns...");

  // Get current columns
  const result = await client.execute("PRAGMA table_info(leads)");
  const columns = result.rows.map((r) => r.name as string);
  console.log("Current columns:", columns.join(", "));

  if (!columns.includes("plattegrond_url")) {
    console.log("Adding plattegrond_url column...");
    await client.execute("ALTER TABLE leads ADD COLUMN plattegrond_url TEXT");
    console.log("✓ plattegrond_url added");
  } else {
    console.log("✓ plattegrond_url already exists");
  }

  if (!columns.includes("gefactureerd")) {
    console.log("Adding gefactureerd column...");
    await client.execute("ALTER TABLE leads ADD COLUMN gefactureerd INTEGER DEFAULT 0");
    console.log("✓ gefactureerd added");
  } else {
    console.log("✓ gefactureerd already exists");
  }

  console.log("\nDone! Verifying...");
  const verify = await client.execute("PRAGMA table_info(leads)");
  console.log("Final columns:", verify.rows.map((r) => r.name).join(", "));

  client.close();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
