"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, FileText, ChevronRight } from "lucide-react";
import SigningStatus from "@/components/signing/SigningStatus";

type DocumentRow = {
  id: string;
  documentUid: string;
  title: string;
  documentType: string;
  status: string;
  signedAt: string | null;
  createdAt: string;
};

const typeLabels: Record<string, string> = {
  contract: "Samenwerkingsovereenkomst",
  verwerkersovereenkomst: "Verwerkersovereenkomst",
  addendum: "Addendum",
  overig: "Overig",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PortalDocumentenPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const res = await fetch("/api/portal/signing");
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-2">Documenten</h1>
      <p className="text-sm text-muted mb-6">
        Hier vind je documenten die ter ondertekening klaarstaan of al ondertekend zijn.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-muted">Geen documenten beschikbaar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/portal/documenten/${doc.documentUid}`}
              className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-dark group-hover:text-primary transition-colors truncate">
                      {doc.title}
                    </h3>
                    <SigningStatus status={doc.status} />
                  </div>
                  <p className="text-sm text-muted">
                    {typeLabels[doc.documentType] || doc.documentType}
                    {" — "}
                    {doc.signedAt
                      ? `Ondertekend op ${formatDate(doc.signedAt)}`
                      : `Aangemaakt op ${formatDate(doc.createdAt)}`}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
