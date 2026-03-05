import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getListings } from "@/lib/occasions/queries";

export const dynamic = "force-dynamic";

const filtersSchema = z.object({
  woningtype: z.string().optional(),
  priceMin: z.coerce.number().positive().optional(),
  priceMax: z.coerce.number().positive().optional(),
  province: z.string().optional(),
  surfaceMin: z.coerce.number().positive().optional(),
  surfaceMax: z.coerce.number().positive().optional(),
  buildYearMin: z.coerce.number().int().min(1950).optional(),
  condition: z.string().optional(),
  transport: z.string().optional(),
  sellerType: z.string().optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "surface-desc", "surface-asc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(48).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      rawParams[key] = value;
    });

    const parsed = filtersSchema.safeParse(rawParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige filters", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await getListings(parsed.data);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[api/occasions] Error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van occasions" },
      { status: 500 }
    );
  }
}
