import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth/session";
import { validateFile, uploadFile } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json(
        { error: "Geen bestand meegegeven." },
        { status: 400 }
      );
    }

    const allowedFolders = ["logos", "certificaten", "portfolio", "occasions"];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { error: "Ongeldige upload folder." },
        { status: 400 }
      );
    }

    const allowPdf = folder === "certificaten";
    const validationError = validateFile(file, { allowPdf });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const url = await uploadFile(
      file,
      folder as "logos" | "certificaten" | "portfolio" | "occasions"
    );

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);

    const message =
      error instanceof Error && error.message.includes("token")
        ? "Upload service niet beschikbaar. Neem contact op met support."
        : "Er ging iets mis bij het uploaden. Probeer het opnieuw.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
