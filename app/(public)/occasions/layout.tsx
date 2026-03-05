import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tweedehands modulaire woningen | Occasions | Zorgwoningvergelijker",
  description:
    "Bekijk tweedehands modulaire woningen, tiny houses, mantelzorgwoningen en meer. Vergelijk occasions van particulieren en bedrijven in heel Nederland.",
  openGraph: {
    title: "Tweedehands modulaire woningen | Occasions",
    description:
      "Ontdek tweedehands modulaire woningen van particulieren en bedrijven. Vergelijk prijzen, specificaties en locaties.",
    type: "website",
  },
};

export default function OccasionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
