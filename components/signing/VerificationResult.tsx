"use client";

import { CheckCircle2, XCircle, Shield } from "lucide-react";

type VerificationData = {
  valid: boolean;
  document?: {
    title: string;
    documentUid: string;
    documentType: string;
    version: number;
    signedAt: string;
    signerInitials: string;
    signerRole: string;
    aanbiederBedrijfsnaam: string;
    hashMatch: boolean;
  };
  error?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function VerificationResult({ data }: { data: VerificationData }) {
  if (data.valid && data.document) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h2 className="font-heading text-xl font-bold text-green-800 mb-1">Document geverifieerd</h2>
          <p className="text-sm text-green-700">Dit document is authentiek en ongewijzigd.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Document</p>
            <p className="text-sm font-medium text-dark">{data.document.title}</p>
            <p className="text-xs text-muted capitalize">{data.document.documentType} &middot; Versie {data.document.version}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Ondertekend door</p>
            <p className="text-sm font-medium text-dark">{data.document.signerInitials}</p>
            <p className="text-xs text-muted">{data.document.signerRole} bij {data.document.aanbiederBedrijfsnaam}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Datum ondertekening</p>
            <p className="text-sm text-dark">{formatDate(data.document.signedAt)}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700 font-medium">Integriteit geverifieerd (SHA-256)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <h2 className="font-heading text-xl font-bold text-red-800 mb-1">Verificatie mislukt</h2>
        <p className="text-sm text-red-700">{data.error || "Dit document kon niet geverifieerd worden."}</p>
      </div>
    </div>
  );
}
