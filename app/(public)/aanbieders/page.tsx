import { getAllAanbieders } from "@/lib/aanbieders-unified";
import AanbiedersOverview from "./AanbiedersOverview";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Aanbieders Vergelijken | Reviews & Beoordelingen",
  description:
    "Vergelijk gecertificeerde aanbieders van modulaire woningen ✓ Bekijk reviews & specialisaties ➜ Vraag vrijblijvend een offerte aan!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/aanbieders",
  },
  keywords: ["modulaire woning aanbieders", "tiny house bouwer", "mantelzorgwoning leverancier", "prefab woning aanbieder vergelijken"],
};

export default async function AanbiedersPage() {
  const aanbieders = await getAllAanbieders();
  return <AanbiedersOverview aanbieders={aanbieders} />;
}
