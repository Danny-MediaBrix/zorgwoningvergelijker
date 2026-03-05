import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { sendEmail } from "@/lib/email/send";
import { validateOrigin } from "@/lib/auth/csrf";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl";

export async function POST(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Ongeldige herkomst." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "E-mailadres is verplicht." },
        { status: 400 }
      );
    }

    // Altijd succesvol retourneren (voorkom e-mail enumeration)
    const result = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (result.length > 0) {
      const user = result[0];
      const token = uuidv4();
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 uur

      await db.insert(passwordResetTokens).values({
        id: uuidv4(),
        userId: user.id,
        tokenHash,
        expiresAt,
      });

      const resetUrl = `${BASE_URL}/wachtwoord-reset?token=${token}`;
      await sendEmail(email, { type: "wachtwoord_reset", resetUrl });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis." },
      { status: 500 }
    );
  }
}
