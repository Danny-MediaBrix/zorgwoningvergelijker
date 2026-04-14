"use client";

import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

type SigningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSign: (data: { signerFullName: string; signerRole: string; confirmed: boolean }) => Promise<void>;
  documentTitle: string;
  documentType: string;
  bedrijfsnaam: string;
};

export default function SigningModal({
  isOpen,
  onClose,
  onSign,
  documentTitle,
  documentType,
  bedrijfsnaam,
}: SigningModalProps) {
  const [signerFullName, setSignerFullName] = useState("");
  const [signerRole, setSignerRole] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const canSign = signerFullName.trim().length >= 2 && signerRole.trim().length >= 2 && confirmed;

  async function handleSign() {
    if (!canSign) return;
    setLoading(true);
    setError(null);
    try {
      await onSign({ signerFullName: signerFullName.trim(), signerRole: signerRole.trim(), confirmed: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis bij het ondertekenen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="font-heading text-xl font-bold text-dark mb-1">Document ondertekenen</h2>
        <p className="text-sm text-muted mb-6">Lees het document zorgvuldig door voordat je ondertekent.</p>

        {/* Document summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted mb-1">Document</p>
          <p className="font-medium text-dark">{documentTitle}</p>
          <p className="text-sm text-muted mt-1 capitalize">{documentType}</p>
        </div>

        {/* Agreement text */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Door te ondertekenen ga ik, namens <strong>{bedrijfsnaam}</strong>, akkoord met de
              inhoud van dit document. Deze handeling is definitief en kan niet ongedaan worden gemaakt.
            </p>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="signerName" className="block text-sm font-medium text-dark mb-1.5">
            Volledige naam <span className="text-red-500">*</span>
          </label>
          <input
            id="signerName"
            type="text"
            value={signerFullName}
            onChange={(e) => setSignerFullName(e.target.value)}
            placeholder="Voornaam en achternaam"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            disabled={loading}
          />
        </div>

        {/* Role input */}
        <div className="mb-4">
          <label htmlFor="signerRole" className="block text-sm font-medium text-dark mb-1.5">
            Functie / rol <span className="text-red-500">*</span>
          </label>
          <input
            id="signerRole"
            type="text"
            value={signerRole}
            onChange={(e) => setSignerRole(e.target.value)}
            placeholder="Bijv. Directeur, Eigenaar"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            disabled={loading}
          />
        </div>

        {/* Confirmation checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={loading}
          />
          <span className="text-sm text-dark">
            Ik heb het volledige document gelezen en begrepen, en ga akkoord met de inhoud.
          </span>
        </label>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-muted hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Annuleren
          </button>
          <button
            onClick={handleSign}
            disabled={!canSign || loading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Ondertekenen...
              </>
            ) : (
              "Definitief ondertekenen"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
