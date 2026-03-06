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
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-primary focus:px-4 focus:py-2.5 focus:rounded-xl focus:shadow-lg focus:font-semibold focus:text-body-sm focus:ring-2 focus:ring-primary/20"
        >
          Ga naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}
