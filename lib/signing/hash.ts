import crypto from "crypto";

export function hashBuffer(buffer: Buffer | Uint8Array): string {
  const buf = buffer instanceof Uint8Array && !(buffer instanceof Buffer)
    ? Buffer.from(buffer)
    : buffer;
  return crypto.createHash("sha256").update(buf).digest("hex");
}

export async function hashFromUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return hashBuffer(Buffer.from(arrayBuffer));
}

export function verifyHash(buffer: Buffer | Uint8Array, expectedHash: string): boolean {
  return hashBuffer(buffer) === expectedHash;
}
