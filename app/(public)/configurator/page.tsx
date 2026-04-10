import type { Metadata } from "next";
import ConfiguratorClient from "./ConfiguratorClient";

export const metadata: Metadata = {
  title: "Gratis Offerte Aanvragen | Woningconfigurator",
  description:
    "Ontvang gratis en vrijblijvend offertes voor je modulaire woning. Kies je woningtype, bepaal de grootte en ontvang binnen 48 uur een offerte op maat.",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/configurator",
  },
  keywords: [
    "modulaire woning offerte",
    "gratis offerte aanvragen",
    "woningconfigurator",
    "tiny house offerte",
    "mantelzorgwoning offerte",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Woningconfigurator & Offerte Service",
  description:
    "Gratis en vrijblijvende offerte-service voor modulaire woningen in Nederland. Configureer je woning en ontvang binnen 48 uur offertes van gecertificeerde aanbieders.",
  provider: {
    "@type": "Organization",
    name: "Zorgwoningvergelijker.nl",
    url: "https://zorgwoningvergelijker.nl",
  },
  areaServed: {
    "@type": "Country",
    name: "Nederland",
  },
  serviceType: "Offerte aanvraag modulaire woningen",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Gratis en vrijblijvend",
  },
};

export default function ConfiguratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <ConfiguratorClient />
    </>
  );
}
