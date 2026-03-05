import { validateSession, type SessionUser } from "./session";
import { redirect } from "next/navigation";

export type { SessionUser } from "./session";

export async function getCurrentUser(): Promise<SessionUser | null> {
  return validateSession();
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await validateSession();
  if (!user) {
    redirect("/inloggen");
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role !== "admin") {
    redirect("/");
  }
  return user;
}

export async function requireAanbieder(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role !== "aanbieder") {
    redirect("/");
  }
  return user;
}

export async function requireApprovedAanbieder(): Promise<SessionUser> {
  const user = await requireAanbieder();
  if (!user.aanbieder || user.aanbieder.status !== "approved") {
    redirect("/portal/dashboard");
  }
  return user;
}
