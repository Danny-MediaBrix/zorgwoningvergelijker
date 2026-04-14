"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Download, CheckCircle2, PenLine } from "lucide-react";
import SigningStatus from "@/components/signing/SigningStatus";
import SigningModal from "@/components/signing/SigningModal";

type DocumentDetail = {
  id: string;
  documentUid: string;
  title: string;
  documentType: string;
  version: number;
  status: string;
  signedAt: string | null;
  signerFullName: string | null;
  signerRole: string | null;
  draftFileUrl: string | null;
  signedFileUrl: string | null;
  expiresAt: string | null;
  createdAt: string;
};

const typeLabels: Record<string, string> = {
  contract: "Samenwerkingsovereenkomst",
  verwerkersovereenkomst: "Verwerkersovereenkomst",
  addendum: "Addendum",
  overig: "Overig",
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

export default function PortalDocumentDetailPage() {
  const { uid } = useParams<{ uid: string }>();
  const [document, setDocument] = useState<DocumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSigningModal, setShowSigningModal] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, [uid]);

  async function fetchDocument() {
    try {
      const res = await fetch(`/api/portal/signing/${uid}`);
      const data = await res.json();
      if (res.ok) {
        setDocument(data.document);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleSign(data: { signerFullName: string; signerRole: string; confirmed: boolean }) {
    const res = await fetch(`/api/portal/signing/${uid}/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Er ging iets mis bij het ondertekenen.");
    }

    setSigned(true);
    setShowSigningModal(false);
    fetchDocument(); // Refresh to show signed state
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
        <Link href="/portal/documenten" className="text-primary hover:underline text-sm mt-2 inline-block">
          Terug naar overzicht
        </Link>
      </div>
    );
  }

  const pdfUrl = `/api/portal/signing/${uid}/pdf`;

  return (
    <div>
      <Link
        href="/portal/documenten"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-dark mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar documenten
      </Link>

      {/* Success banner */}
      {signed && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Document succesvol ondertekend!</p>
            <p className="text-sm text-green-700">Je ontvangt een bevestiging per e-mail.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark mb-1">{document.title}</h1>
          <p className="text-sm text-muted">
            {typeLabels[document.documentType] || document.documentType} &middot; Versie {document.version}
          </p>
        </div>
        <SigningStatus status={document.status} />
      </div>

      {/* Signed info */}
      {document.status === "signed" && document.signedAt && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-800">
            <strong>Ondertekend</strong> door {document.signerFullName} ({document.signerRole}) op {formatDate(document.signedAt)}
          </p>
        </div>
      )}

      {/* Expired/Revoked info */}
      {(document.status === "expired" || document.status === "revoked") && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-800">
            {document.status === "expired"
              ? "Dit document is verlopen en kan niet meer ondertekend worden."
              : "Dit document is ingetrokken door de beheerder."}
          </p>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-medium text-dark">Document</p>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Download className="w-3 h-3" />
            Download PDF
          </a>
        </div>
        <iframe
          src={pdfUrl}
          className="w-full h-[600px]"
          title="Document PDF"
        />
      </div>

      {/* Sign button */}
      {document.status === "pending_signature" && !signed && (
        <button
          onClick={() => setShowSigningModal(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <PenLine className="w-5 h-5" />
          Document ondertekenen
        </button>
      )}

      {/* Download signed PDF */}
      {document.status === "signed" && (
        <a
          href={pdfUrl}
          download
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          <Download className="w-5 h-5" />
          Ondertekend document downloaden
        </a>
      )}

      {/* Signing Modal */}
      <SigningModal
        isOpen={showSigningModal}
        onClose={() => setShowSigningModal(false)}
        onSign={handleSign}
        documentTitle={document.title}
        documentType={typeLabels[document.documentType] || document.documentType}
        bedrijfsnaam="" // Will be fetched from session on the server
      />
    </div>
  );
}
