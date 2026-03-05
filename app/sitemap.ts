import type { MetadataRoute } from "next";
import { woningtypen } from "@/lib/woningtypen";
import { aanbieders } from "@/lib/aanbieders";
import { artikelenMeta } from "@/lib/artikelen";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zorgwoningvergelijker.nl";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/configurator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aanbieders`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kennisbank`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/veelgestelde-vragen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacybeleid`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/algemene-voorwaarden`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/hoe-werkt-het`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/aanbieder-worden`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auteur/wim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookiebeleid`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const woningtypePages: MetadataRoute.Sitemap = woningtypen.map((wt) => ({
    url: `${baseUrl}/${wt.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const aanbiederPages: MetadataRoute.Sitemap = aanbieders.map((a) => ({
    url: `${baseUrl}/aanbieders/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const kennisbankPages: MetadataRoute.Sitemap = artikelenMeta.map((artikel) => ({
    url: `${baseUrl}/kennisbank/${artikel.slug}`,
    lastModified: artikel.bijgewerkt
      ? new Date(artikel.bijgewerkt)
      : new Date(artikel.gepubliceerd),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const occasionsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/occasions`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    ...woningtypen.map((wt) => ({
      url: `${baseUrl}/occasions/${wt.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...woningtypePages, ...aanbiederPages, ...kennisbankPages, ...occasionsPages];
}
