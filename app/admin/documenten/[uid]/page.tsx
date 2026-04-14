"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Send, XCircle, Download, ExternalLink } from "lucide-react";
import SigningStatus from "@/components/signing/SigningStatus";
import AuditTrail from "@/components/signing/AuditTrail";

type DocumentDetail = {
  id: string;
  documentUid: string;
  title: string;
  documentType: string;
  version: number;
  status: string;
  aanbiederId: string;
  documentHashPresign: string | null;
  documentHashPostsign: string | null;
  signedAt: string | null;
  signerFullName: string | null;
  signerRole: string | null;
  draftFileUrl: string | null;
  signedFileUrl: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  bedrijfsnaam: string | null;
  createdByEmail: string | null;
};

type SigningEvent = {
  id: string;
  action: string;
  actorType: string;
  actorEmail: string | null;
  actorDisplayName: string | null;
  ipAddress: string | null;
  occurredAt: string;
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

export default function AdminDocumentDetailPage() {
  const { uid } = useParams<{ uid: string }>();
  const router = useRouter();
  const [document, setDocument] = useState<DocumentDetail | null>(null);
  const [events, setEvents] = useState<SigningEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchDocument();
  }, [uid]);

  async function fetchDocument() {
    try {
      const res = await fetch(`/api/admin/signing/${uid}`);
      const data = await res.json();
      if (res.ok) {
        setDocument(data.document);
        setEvents(data.events || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    setActionLoading("send");
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/signing/${uid}/send`, { method: "PUT" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ type: "success", text: "Document verstuurd ter ondertekening." });
      fetchDocument();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Er ging iets mis." });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRevoke() {
    if (!confirm("Weet je zeker dat je dit document wilt intrekken?")) return;
    setActionLoading("revoke");
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/signing/${uid}/revoke`, { method: "PUT" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ type: "success", text: "Document ingetrokken." });
      fetchDocument();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Er ging iets mis." });
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Document niet gevonden.</p>
        <Link href="/admin/documenten" className="text-primary hover:underline text-sm mt-2 inline-block">
          Terug naar overzicht
        </Link>
      </div>
    );
  }

  const pdfUrl = document.status === "signed" && document.signedFileUrl
    ? document.signedFileUrl
    : document.draftFileUrl;

  return (
    <div>
      <Link
        href="/admin/documenten"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-dark mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar overzicht
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark mb-1">{document.title}</h1>
          <p className="text-sm text-muted">
            {document.bedrijfsnaam} &middot; {document.documentType}
          </p>
        </div>
        <SigningStatus status={document.status} />
      </div>

      {/* Message */}
      {message && (
        <div className={`rounded-lg p-3 mb-6 ${
          message.type === "success"
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* PDF Preview */}
          {pdfUrl && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                <p className="text-sm font-medium text-dark">
                  {document.status === "signed" ? "Ondertekend document" : "Concept document"}
                </p>
                <div className="flex gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Openen
                  </a>
                  <a
                    href={pdfUrl}
                    download
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>
              <iframe
                src={pdfUrl}
                className="w-full h-[600px]"
                title="PDF preview"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {document.status === "draft" && (
              <button
                onClick={handleSend}
                disabled={actionLoading === "send"}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {actionLoading === "send" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Verstuur ter ondertekening
              </button>
            )}
            {document.status === "pending_signature" && (
              <button
                onClick={handleRevoke}
                disabled={actionLoading === "revoke"}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-700 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {actionLoading === "revoke" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Intrekken
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-dark">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Document-ID</span>
                <span className="text-dark font-mono text-xs">{document.documentUid.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Versie</span>
                <span className="text-dark">{document.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Aangemaakt</span>
                <span className="text-dark">{formatDate(document.createdAt)}</span>
              </div>
              {document.signedAt && (
                <div className="flex justify-between">
                  <span className="text-muted">Ondertekend</span>
                  <span className="text-dark">{formatDate(document.signedAt)}</span>
                </div>
              )}
              {document.signerFullName && (
                <div className="flex justify-between">
                  <span className="text-muted">Ondertekenaar</span>
                  <span className="text-dark">{document.signerFullName}</span>
                </div>
              )}
              {document.signerRole && (
                <div className="flex justify-between">
                  <span className="text-muted">Functie</span>
                  <span className="text-dark">{document.signerRole}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hash info */}
          {(document.documentHashPresign || document.documentHashPostsign) && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-dark">Integriteit</h3>
              {document.documentHashPresign && (
                <div>
                  <p className="text-xs text-muted mb-0.5">Hash (voor ondertekening)</p>
                  <p className="text-xs font-mono text-dark break-all">{document.documentHashPresign}</p>
                </div>
              )}
              {document.documentHashPostsign && (
                <div>
                  <p className="text-xs text-muted mb-0.5">Hash (na ondertekening)</p>
                  <p className="text-xs font-mono text-dark break-all">{document.documentHashPostsign}</p>
                </div>
              )}
              {document.status === "signed" && (
                <Link
                  href={`/verify/${document.documentUid}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Verificatiepagina
                </Link>
              )}
            </div>
          )}

          {/* Audit trail */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-dark mb-3">Audit trail</h3>
            <AuditTrail events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
