import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurator | Stel Je Modulaire Woning Samen",
  description:
    "Configureer je ideale modulaire woning in 7 stappen ✓ Kies woningtype, afmetingen & afwerking ➜ Ontvang een offerte op maat!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/configurator",
  },
};

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
