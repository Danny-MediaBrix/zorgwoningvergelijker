import { db } from "@/lib/db";
import { sessions, users, aanbieders } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const SESSION_COOKIE = "session_token";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 dagen
const SLIDING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // Vernieuw als < 7 dagen over

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string): Promise<string> {
  const token = uuidv4();
  const tokenHash = hashToken(token);
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  await db.insert(sessions).values({
    id: tokenHash,
    userId,
    expiresAt,
    createdAt: now,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });

  return token;
}

export type SessionUser = {
  id: string;
  email: string;
  role: "aanbieder" | "admin";
  aanbieder?: {
    id: string;
    slug: string;
    bedrijfsnaam: string;
    status: "pending" | "approved" | "rejected";
  } | null;
};

export async function validateSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const now = new Date().toISOString();

  const result = await db
    .select({
      sessionId: sessions.id,
      sessionExpiresAt: sessions.expiresAt,
      userId: users.id,
      email: users.email,
      role: users.role,
      aanbiederId: aanbieders.id,
      aanbiederSlug: aanbieders.slug,
      aanbiederBedrijfsnaam: aanbieders.bedrijfsnaam,
      aanbiederStatus: aanbieders.status,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .leftJoin(aanbieders, eq(aanbieders.userId, users.id))
    .where(and(eq(sessions.id, tokenHash), gt(sessions.expiresAt, now)))
    .limit(1);

  if (result.length === 0) return null;

  const row = result[0];

  // Sliding window: vernieuw sessie als minder dan 7 dagen over
  const expiresAt = new Date(row.sessionExpiresAt);
  if (expiresAt.getTime() - Date.now() < SLIDING_WINDOW_MS) {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();
    await db
      .update(sessions)
      .set({ expiresAt: newExpiresAt })
      .where(eq(sessions.id, tokenHash));
  }

  return {
    id: row.userId,
    email: row.email,
    role: row.role as "aanbieder" | "admin",
    aanbieder: row.aanbiederId
      ? {
          id: row.aanbiederId,
          slug: row.aanbiederSlug!,
          bedrijfsnaam: row.aanbiederBedrijfsnaam!,
          status: row.aanbiederStatus as "pending" | "approved" | "rejected",
        }
      : null,
  };
}

export async function invalidateSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return;

  const tokenHash = hashToken(token);
  await db.delete(sessions).where(eq(sessions.id, tokenHash));

  cookieStore.delete(SESSION_COOKIE);
}

export async function invalidateAllUserSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
