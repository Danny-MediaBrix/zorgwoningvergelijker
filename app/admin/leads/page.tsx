"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLeadsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-6">Leads</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-muted mb-2">Leads worden bijgehouden zodra de configurator geïntegreerd is.</p>
        <p className="text-xs text-subtle">Offerteaanvragen via de configurator verschijnen hier automatisch.</p>
      </div>
    </div>
  );
}
