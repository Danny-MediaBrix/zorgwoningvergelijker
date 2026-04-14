import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { leadDispatches, aanbieders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await validateSession();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const dispatches = await db
      .select({
        id: leadDispatches.id,
        aanbiederId: leadDispatches.aanbiederId,
        bedrijfsnaam: aanbieders.bedrijfsnaam,
        sentAt: leadDispatches.sentAt,
      })
      .from(leadDispatches)
      .leftJoin(aanbieders, eq(leadDispatches.aanbiederId, aanbieders.id))
      .where(eq(leadDispatches.leadId, id))
      .orderBy(desc(leadDispatches.sentAt));

    return NextResponse.json({ dispatches });
  } catch (error) {
    console.error("Lead dispatches GET error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
