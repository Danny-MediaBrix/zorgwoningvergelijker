import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aanbieders, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { validateSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const user = await validateSession();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = db
      .select({
        id: aanbieders.id,
        slug: aanbieders.slug,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        vestigingsplaats: aanbieders.vestigingsplaats,
        status: aanbieders.status,
        logoUrl: aanbieders.logoUrl,
        email: users.email,
        createdAt: aanbieders.createdAt,
        approvedAt: aanbieders.approvedAt,
      })
      .from(aanbieders)
      .innerJoin(users, eq(aanbieders.userId, users.id))
      .orderBy(desc(aanbieders.createdAt))
      .$dynamic();

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query = query.where(eq(aanbieders.status, status as "pending" | "approved" | "rejected"));
    }

    const result = await query;

    return NextResponse.json({ aanbieders: result });
  } catch (error) {
    console.error("Admin get aanbieders error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
