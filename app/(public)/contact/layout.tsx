import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Opnemen | Stel Je Vraag",
  description:
    "Heb je een vraag of wil je samenwerken? Ons team staat voor je klaar ✓ Reactie binnen 24 uur ➜ Neem contact op!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact - Zorgwoningvergelijker.nl",
  url: "https://zorgwoningvergelijker.nl/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Zorgwoningvergelijker.nl",
    url: "https://zorgwoningvergelijker.nl",
    telephone: "+31-85-004-1159",
    email: "info@zorgwoningvergelijker.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vanadiumweg 11A",
      postalCode: "3812 PX",
      addressLocality: "Amersfoort",
      addressCountry: "NL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
