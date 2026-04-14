"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import VerificationResult from "@/components/signing/VerificationResult";

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

export default function VerifyPage() {
  const { uid } = useParams<{ uid: string }>();
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyDocument();
  }, [uid]);

  async function verifyDocument() {
    try {
      const res = await fetch(`/api/signing/verify/${uid}`);
      const result = await res.json();
      setData(result);
    } catch {
      setData({ valid: false, error: "Verificatie kon niet worden uitgevoerd." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/zorgwoningvergelijker-logo.svg"
              alt="Zorgwoningvergelijker.nl"
              width={200}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Shield className="w-4 h-4" />
            Document verificatie
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-dark mb-2">Document verificatie</h1>
          <p className="text-sm text-muted">
            Controleer of een elektronisch ondertekend document authentiek en ongewijzigd is.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted">Document wordt geverifieerd...</p>
          </div>
        ) : data ? (
          <VerificationResult data={data} />
        ) : null}

        <div className="text-center mt-12">
          <p className="text-xs text-subtle">
            Verificatie wordt uitgevoerd door middel van SHA-256 hash-controle.
            <br />
            Bij vragen kunt u contact opnemen via{" "}
            <a href="mailto:info@zorgwoningvergelijker.nl" className="text-primary hover:underline">
              info@zorgwoningvergelijker.nl
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
