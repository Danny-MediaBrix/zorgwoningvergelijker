"use client";

import { Suspense } from "react";
import ConfiguratorShell from "@/components/configurator/ConfiguratorShell";

export default function ConfiguratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-body text-gray-600">Configurator laden...</p>
          </div>
        </div>
      }
    >
      <ConfiguratorShell />
    </Suspense>
  );
}
