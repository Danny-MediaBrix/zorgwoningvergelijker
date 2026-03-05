import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";

// globalThis cache zodat Turbopack hercompilaties de client niet resetten
const g = globalThis as typeof globalThis & {
  __tursoClient?: Client;
  __drizzleDb?: ReturnType<typeof drizzle<typeof schema>>;
};

function getDb(): ReturnType<typeof drizzle<typeof schema>> {
  if (!g.__drizzleDb) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    if (!g.__tursoClient) {
      g.__tursoClient = createClient({
        url,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
    }
    g.__drizzleDb = drizzle(g.__tursoClient, { schema });
  }
  return g.__drizzleDb;
}

// Lazy Proxy zodat DB niet bij build-time wordt geïnitialiseerd
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
