import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default:
      "Modulaire Woning Vergelijken? Gratis Offertes (2026)",
    template: "%s | Zorgwoningvergelijker.nl",
  },
  description:
    "Vergelijk 14 modulaire woningtypen ✓ Configureer online ✓ Ontvang gratis offertes van aanbieders ➜ Start vandaag nog!",
  metadataBase: new URL("https://zorgwoningvergelijker.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Zorgwoningvergelijker.nl",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Zorgwoningvergelijker.nl - Vergelijk modulaire woningen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Modulaire Woning Vergelijken? Gratis Offertes (2026)",
    description:
      "Vergelijk 14 woningtypen, configureer je woning & ontvang gratis offertes van aanbieders ✓ Vrijblijvend ✓ Binnen 48 uur ➜ Start nu!",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/images/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zorgwoningvergelijker.nl",
  url: "https://zorgwoningvergelijker.nl",
  description:
    "Het nr. 1 vergelijkingsplatform voor modulaire woningen in Nederland. Vergelijk aanbieders, configureer je woning en ontvang gratis offertes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vanadiumweg 11A",
    postalCode: "3812 PX",
    addressLocality: "Amersfoort",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/company/zorgwoningvergelijker",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+31-85-004-1159",
    contactType: "customer service",
    availableLanguage: "Dutch",
  },
  areaServed: {
    "@type": "Country",
    name: "Nederland",
  },
  logo: {
    "@type": "ImageObject",
    url: "https://zorgwoningvergelijker.nl/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          src="https://analytics.mediabrix.app/api/script.js"
          data-site-id="5293f6b01b82"
          defer
        />
        <noscript>
          <style>{`
            [style*="opacity"] { opacity: 1 !important; transform: none !important; filter: none !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-white focus-visible:text-primary focus-visible:px-4 focus-visible:py-2.5 focus-visible:rounded-xl focus-visible:shadow-lg focus-visible:font-semibold focus-visible:text-body-sm focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          Ga naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}
