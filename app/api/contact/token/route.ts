import { NextResponse } from "next/server";
import { createFormToken } from "@/lib/spam-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { token: createFormToken() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
