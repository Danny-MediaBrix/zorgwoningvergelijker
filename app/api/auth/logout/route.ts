import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { invalidateSession } from "@/lib/auth/session";

export async function POST() {
  try {
    await invalidateSession();
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Cookie expliciet verwijderen
  const cookieStore = await cookies();
  cookieStore.delete("session_token");

  return NextResponse.redirect(
    new URL("/inloggen", process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl"),
    { status: 303 }
  );
}
