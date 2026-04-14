"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import SigningStatus from "@/components/signing/SigningStatus";

type DocumentRow = {
  id: string;
  documentUid: string;
  title: string;
  documentType: string;
  status: string;
  signedAt: string | null;
  signerFullName: string | null;
  bedrijfsnaam: string | null;
  createdAt: string;
};

const filters = [
  { value: "all", label: "Alle" },
  { value: "draft", label: "Concept" },
  { value: "pending_signature", label: "Ter ondertekening" },
  { value: "signed", label: "Ondertekend" },
  { value: "expired", label: "Verlopen" },
  { value: "revoked", label: "Ingetrokken" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDocumentenPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDocuments();
  }, [filter]);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const url = filter === "all"
        ? "/api/admin/signing"
        : `/api/admin/signing?status=${filter}`;
      const res = await fetch(url);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-dark">Documenten</h1>
        <Link
          href="/admin/documenten/nieuw"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nieuw document
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-muted hover:text-dark hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted">Geen documenten gevonden.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Titel</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Aanbieder</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/documenten/${doc.documentUid}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {doc.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{doc.bedrijfsnaam || "-"}</td>
                  <td className="px-4 py-3 text-sm text-muted capitalize">{doc.documentType}</td>
                  <td className="px-4 py-3">
                    <SigningStatus status={doc.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-subtle">
                    {doc.signedAt ? formatDate(doc.signedAt) : formatDate(doc.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
