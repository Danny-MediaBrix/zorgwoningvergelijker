"use client";

import dynamic from "next/dynamic";

const ConfiguratorShell = dynamic(
  () => import("@/components/configurator/ConfiguratorShell"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-gray-600">Configurator laden...</p>
          <noscript>
            <p className="text-body text-gray-600 mt-4">
              De configurator vereist JavaScript. Schakel JavaScript in om door te gaan.
            </p>
          </noscript>
        </div>
      </div>
    ),
  }
);

export default function ConfiguratorPage() {
  return <ConfiguratorShell />;
}
