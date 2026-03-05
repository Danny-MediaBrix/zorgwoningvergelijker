"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type Payment = {
  id: string;
  type: string;
  amount: number;
  mollieStatus: string | null;
  createdAt: string;
  paidAt: string | null;
};

export default function BetalingenPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const res = await fetch("/api/portal/betalingen");
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  function formatAmount(cents: number) {
    return `€ ${(cents / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function statusLabel(status: string | null) {
    switch (status) {
      case "paid":
        return { text: "Betaald", cls: "bg-green-50 text-green-700" };
      case "pending":
        return { text: "In behandeling", cls: "bg-amber-50 text-amber-700" };
      case "failed":
        return { text: "Mislukt", cls: "bg-red-50 text-red-700" };
      default:
        return { text: "Onbekend", cls: "bg-gray-100 text-gray-600" };
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Betalingen</h1>

      {payments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted">Nog geen betalingen.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Datum</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Bedrag</th>
                <th className="text-left text-xs font-medium text-muted px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => {
                const status = statusLabel(payment.mollieStatus);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-dark">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {payment.type === "aanbieder_subscription"
                        ? "Abonnement"
                        : payment.type === "lead"
                        ? "Lead"
                        : "Occasion"}
                    </td>
                    <td className="px-4 py-3 text-sm font-heading font-semibold text-dark tabular-nums">
                      {formatAmount(payment.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${status.cls}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
