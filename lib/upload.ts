import { put, del } from "@vercel/blob";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const ALLOWED_DOCUMENT_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
];

type UploadFolder = "logos" | "certificaten" | "portfolio" | "occasions";

export function validateFile(
  file: File,
  options: { allowPdf?: boolean } = {}
): string | null {
  const allowedTypes = options.allowPdf
    ? ALLOWED_DOCUMENT_TYPES
    : ALLOWED_IMAGE_TYPES;

  if (!allowedTypes.includes(file.type)) {
    const extensions = options.allowPdf
      ? "JPG, PNG, WebP, AVIF of PDF"
      : "JPG, PNG, WebP of AVIF";
    return `Ongeldig bestandstype. Toegestaan: ${extensions}.`;
  }

  const maxSize = file.type === "application/pdf" ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024);
    return `Bestand is te groot. Maximum: ${maxMB}MB.`;
  }

  return null;
}

export async function uploadFile(
  file: File,
  folder: UploadFolder
): Promise<string> {
  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete file:", url, error);
  }
}
