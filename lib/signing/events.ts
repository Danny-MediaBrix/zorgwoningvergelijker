import { db } from "@/lib/db";
import { signingEvents } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

type SigningAction =
  | "created"
  | "sent_for_signature"
  | "viewed"
  | "downloaded"
  | "signature_started"
  | "signed"
  | "signature_failed"
  | "expired"
  | "revoked"
  | "verified"
  | "verification_failed";

type CreateEventParams = {
  documentId: string;
  action: SigningAction;
  actorType: "aanbieder" | "admin" | "system";
  actorId?: string;
  actorEmail?: string;
  actorDisplayName?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  documentHashAtEvent?: string;
  metadata?: Record<string, unknown>;
};

export async function createSigningEvent(params: CreateEventParams): Promise<void> {
  try {
    const now = new Date().toISOString();
    await db.insert(signingEvents).values({
      id: uuidv4(),
      eventUid: uuidv4(),
      documentId: params.documentId,
      action: params.action,
      actorType: params.actorType,
      actorId: params.actorId ?? null,
      actorEmail: params.actorEmail ?? null,
      actorDisplayName: params.actorDisplayName ?? null,
      ipAddress: params.ipAddress ?? null,
      userAgent: params.userAgent ?? null,
      sessionId: params.sessionId ?? null,
      documentHashAtEvent: params.documentHashAtEvent ?? null,
      metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      occurredAt: now,
      createdAt: now,
    });
  } catch (error) {
    console.error("Failed to create signing event:", error);
  }
}

export function extractRequestMeta(request: Request) {
  return {
    ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
  };
}
