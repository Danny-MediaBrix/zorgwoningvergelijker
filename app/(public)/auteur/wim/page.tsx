import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import CTABanner from "@/components/sections/CTABanner";
import { auteurWim } from "@/lib/auteur";
import { artikelenMeta } from "@/lib/artikelen";
import { formatDatum } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${auteurWim.volleNaam} | ${auteurWim.rol}`,
  description: auteurWim.bio,
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/auteur/wim",
  },
  openGraph: {
    title: `${auteurWim.volleNaam} | ${auteurWim.rol}`,
    description: auteurWim.bio,
    type: "profile",
    images: [
      {
        url: auteurWim.afbeelding,
        alt: auteurWim.volleNaam,
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: auteurWim.volleNaam,
  jobTitle: auteurWim.rol,
  description: auteurWim.bio,
  url: auteurWim.url,
  image: `https://zorgwoningvergelijker.nl${auteurWim.afbeelding}`,
  knowsAbout: auteurWim.expertise,
  sameAs: [auteurWim.linkedin],
  worksFor: {
    "@type": "Organization",
    name: "Zorgwoningvergelijker.nl",
    url: "https://zorgwoningvergelijker.nl",
  },
};

export default function AuteurWimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Auteur" },
              { label: auteurWim.volleNaam },
            ]}
          />
        </Container>
      </section>

      {/* Author profile */}
      <section className="section-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="flex-shrink-0">
                <Image
                  src={auteurWim.afbeelding}
                  alt={auteurWim.volleNaam}
                  width={160}
                  height={160}
                  priority
                  className="w-40 h-40 rounded-2xl object-cover shadow-card"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-semibold text-display tracking-tight text-dark mb-1">
                  {auteurWim.volleNaam}
                </h1>
                <p className="text-body-lg text-primary font-semibold mb-4">
                  {auteurWim.rol}
                </p>
                <p className="text-body text-gray-600 leading-relaxed mb-6">
                  {auteurWim.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-5">
                  {auteurWim.expertise.map((item) => (
                    <Badge key={item} variant="gray">
                      {item}
                    </Badge>
                  ))}
                </div>
                <a
                  href={auteurWim.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white border border-gray-200/80 hover:border-[#0A66C2]/30 text-gray-600 hover:text-[#0A66C2] px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Volg Wim op LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About Wim  - extended bio for EEAT */}
      <section className="section-gray section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
              Over Wim
            </h2>
            <div className="space-y-4 text-body text-gray-600 leading-relaxed">
              <p>
                Wim is het gezicht en de expert van Zorgwoningvergelijker.nl. Als Woning Inspecteur
                Meester is hij gespecialiseerd in alles rondom modulaire woningbouw in Nederland.
                Van tiny houses en micro-woningen tot mantelzorgwoningen en flexwoningen  - Wim kent
                de markt als geen ander.
              </p>
              <p>
                Met zijn kenmerkende vergrootglas en miniatuurwoning in de hand, helpt Wim duizenden
                Nederlanders bij het vergelijken van woningtypen, het begrijpen van vergunningseisen
                en het vinden van de beste prijs-kwaliteitverhouding. Zijn artikelen in de kennisbank
                zijn gebaseerd op uitgebreid onderzoek naar actuele marktprijzen, wet- en regelgeving
                en ervaringen van woningeigenaren.
              </p>
              <p>
                Wim gelooft dat iedereen recht heeft op eerlijke, begrijpelijke informatie over
                modulaire woningen. Geen ingewikkeld jargon, maar heldere taal die ook voor
                niet-techneuten direct te begrijpen is. Of je nu voor het eerst een tiny house
                overweegt of al gevorderd bent in je zoektocht, Wim staat voor je klaar.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles by Wim */}
      <section className="section-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-8">
              Artikelen door {auteurWim.naam}
            </h2>
            <div className="space-y-6">
              {artikelenMeta.map((artikel) => (
                <Link
                  key={artikel.slug}
                  href={`/kennisbank/${artikel.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl border border-gray-200/80 ring-1 ring-gray-100 p-6 hover:shadow-card-hover transition-all duration-300 ease-premium">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={artikel.categorieVariant}>
                        {artikel.categorie}
                      </Badge>
                      <span className="flex items-center gap-1 text-caption text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        {artikel.leestijd} min
                      </span>
                      <span className="text-caption text-gray-400">
                        {formatDatum(artikel.gepubliceerd)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-2 group-hover:text-primary transition-colors duration-200 ease-premium">
                      {artikel.titel}
                    </h3>
                    <p className="text-body-sm text-gray-600 leading-relaxed mb-3">
                      {artikel.beschrijving}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-body-sm group-hover:underline">
                      Lees verder
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
