/**
 * Maak een admin gebruiker aan.
 *
 * Gebruik: npx tsx scripts/create-admin.ts <email> <wachtwoord>
 *
 * Voorbeeld: npx tsx scripts/create-admin.ts admin@zorgwoningvergelijker.nl MijnWachtwoord123
 */

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { hash } from "@node-rs/bcrypt";
import { v4 as uuidv4 } from "uuid";
import * as schema from "../lib/db/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Gebruik: npx tsx scripts/create-admin.ts <email> <wachtwoord>");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Wachtwoord moet minimaal 8 tekens bevatten.");
    process.exit(1);
  }

  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    console.error("TURSO_DATABASE_URL niet gevonden in .env.local");
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client, { schema });

  const now = new Date().toISOString();
  const passwordHash = await hash(password, 12);

  await db.insert(schema.users).values({
    id: uuidv4(),
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "admin",
    createdAt: now,
    updatedAt: now,
  });

  console.log(`✓ Admin gebruiker aangemaakt: ${email}`);
  console.log(`  Inloggen via: /inloggen`);
  console.log(`  Dashboard: /admin`);

  process.exit(0);
}

main().catch((err) => {
  console.error("Fout:", err.message);
  process.exit(1);
});
