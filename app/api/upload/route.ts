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

    console.log("Upload: token present?", !!process.env.BLOB_READ_WRITE_TOKEN);
    console.log("Upload: file size", file.size, "type", file.type, "folder", folder);

    const url = await uploadFile(
      file,
      folder as "logos" | "certificaten" | "portfolio" | "occasions"
    );

    console.log("Upload success:", url);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error details:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const message = errorMessage.includes("token") || errorMessage.includes("denied") || errorMessage.includes("authorized")
      ? "Upload service niet beschikbaar. Controleer de BLOB_READ_WRITE_TOKEN."
      : `Upload mislukt: ${errorMessage}`;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
