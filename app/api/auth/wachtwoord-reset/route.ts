import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { eq, and, gt, isNull } from "drizzle-orm";
import { hashPassword } from "@/lib/auth/password";
import { invalidateAllUserSessions } from "@/lib/auth/session";
import crypto from "crypto";
import { validateOrigin } from "@/lib/auth/csrf";

export async function POST(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Ongeldige herkomst." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token en wachtwoord zijn verplicht." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Wachtwoord moet minimaal 8 tekens bevatten." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const now = new Date().toISOString();

    // Zoek geldig, ongebruikt token
    const result = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.tokenHash, tokenHash),
          gt(passwordResetTokens.expiresAt, now),
          isNull(passwordResetTokens.usedAt)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "De reset link is ongeldig of verlopen." },
        { status: 400 }
      );
    }

    const resetToken = result[0];
    const passwordHash = await hashPassword(password);

    // Wachtwoord bijwerken
    await db
      .update(users)
      .set({ passwordHash, updatedAt: now })
      .where(eq(users.id, resetToken.userId));

    // Token als gebruikt markeren
    await db
      .update(passwordResetTokens)
      .set({ usedAt: now })
      .where(eq(passwordResetTokens.id, resetToken.id));

    // Alle sessies invalideren
    await invalidateAllUserSessions(resetToken.userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis." },
      { status: 500 }
    );
  }
}
