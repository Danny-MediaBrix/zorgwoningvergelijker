"use client";

import { FileText, Send, Eye, Download, PenLine, CheckCircle2, XCircle, AlertTriangle, Shield, ShieldOff } from "lucide-react";

type SigningEvent = {
  id: string;
  action: string;
  actorType: string;
  actorEmail: string | null;
  actorDisplayName: string | null;
  ipAddress: string | null;
  occurredAt: string;
};

const actionConfig: Record<string, { label: string; icon: typeof FileText; cls: string }> = {
  created: { label: "Document aangemaakt", icon: FileText, cls: "text-gray-600 bg-gray-100" },
  sent_for_signature: { label: "Verstuurd ter ondertekening", icon: Send, cls: "text-blue-600 bg-blue-100" },
  viewed: { label: "Document bekeken", icon: Eye, cls: "text-gray-600 bg-gray-100" },
  downloaded: { label: "Document gedownload", icon: Download, cls: "text-gray-600 bg-gray-100" },
  signature_started: { label: "Ondertekening gestart", icon: PenLine, cls: "text-amber-600 bg-amber-100" },
  signed: { label: "Document ondertekend", icon: CheckCircle2, cls: "text-green-600 bg-green-100" },
  signature_failed: { label: "Ondertekening mislukt", icon: XCircle, cls: "text-red-600 bg-red-100" },
  expired: { label: "Document verlopen", icon: AlertTriangle, cls: "text-red-600 bg-red-100" },
  revoked: { label: "Document ingetrokken", icon: XCircle, cls: "text-red-600 bg-red-100" },
  verified: { label: "Verificatie geslaagd", icon: Shield, cls: "text-green-600 bg-green-100" },
  verification_failed: { label: "Verificatie mislukt", icon: ShieldOff, cls: "text-red-600 bg-red-100" },
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditTrail({ events }: { events: SigningEvent[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted">Geen gebeurtenissen.</p>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const config = actionConfig[event.action] || actionConfig.created;
        const Icon = config.icon;
        return (
          <div key={event.id} className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.cls}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark">{config.label}</p>
              <div className="flex flex-wrap gap-x-3 text-xs text-muted">
                <span>{formatDateTime(event.occurredAt)}</span>
                {event.actorDisplayName && <span>{event.actorDisplayName}</span>}
                {event.actorEmail && <span>{event.actorEmail}</span>}
                {event.ipAddress && event.ipAddress !== "unknown" && <span>IP: {event.ipAddress}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
