import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, aanbieders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/lib/email/send";
import { validateOrigin } from "@/lib/auth/csrf";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Ongeldige herkomst." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { bedrijfsnaam, email, password } = body;

    if (!bedrijfsnaam || !email || !password) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Wachtwoord moet minimaal 8 tekens bevatten." },
        { status: 400 }
      );
    }

    // Check of e-mail al bestaat
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Er bestaat al een account met dit e-mailadres." },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();
    const userId = uuidv4();
    const aanbiederId = uuidv4();
    const passwordHash = await hashPassword(password);

    // Genereer unieke slug
    let slug = slugify(bedrijfsnaam);
    const slugExists = await db
      .select({ id: aanbieders.id })
      .from(aanbieders)
      .where(eq(aanbieders.slug, slug))
      .limit(1);
    if (slugExists.length > 0) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // User + aanbieder profiel aanmaken (in batch voor atomiciteit)
    await db.batch([
      db.insert(users).values({
        id: userId,
        email: email.toLowerCase().trim(),
        passwordHash,
        role: "aanbieder",
        createdAt: now,
        updatedAt: now,
      }),
      db.insert(aanbieders).values({
        id: aanbiederId,
        userId,
        slug,
        bedrijfsnaam: bedrijfsnaam.trim(),
        status: "pending",
        createdAt: now,
        updatedAt: now,
      }),
    ]);

    // Sessie aanmaken
    await createSession(userId);

    // Welkom e-mail versturen
    await sendEmail(email.toLowerCase().trim(), {
      type: "welkom",
      bedrijfsnaam: bedrijfsnaam.trim(),
    }).catch((err) => console.error("Welcome email failed:", err));

    return NextResponse.json({
      success: true,
      role: "aanbieder",
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het registreren." },
      { status: 500 }
    );
  }
}
