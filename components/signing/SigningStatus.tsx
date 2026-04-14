"use client";

import { FileText, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const statusConfig: Record<string, { label: string; icon: typeof Clock; cls: string }> = {
  draft: { label: "Concept", icon: FileText, cls: "bg-gray-50 text-gray-600" },
  pending_signature: { label: "Ter ondertekening", icon: Clock, cls: "bg-amber-50 text-amber-700" },
  signed: { label: "Ondertekend", icon: CheckCircle2, cls: "bg-green-50 text-green-700" },
  expired: { label: "Verlopen", icon: AlertTriangle, cls: "bg-red-50 text-red-700" },
  revoked: { label: "Ingetrokken", icon: XCircle, cls: "bg-red-50 text-red-700" },
};

export default function SigningStatus({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.cls}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
