import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  Star,
  Shield,
  ChevronRight,
  Home,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { getAanbiederBySlug, getAllAanbieders } from "@/lib/aanbieders-unified";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";

interface AanbiederPageProps {
  params: Promise<{ slug: string }>;
}

// Re-validate elke uur zodat nieuwe aanbieders zichtbaar worden
export const revalidate = 3600;

export async function generateStaticParams() {
  const all = await getAllAanbieders();
  return all.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: AanbiederPageProps): Promise<Metadata> {
  const { slug } = await params;
  const aanbieder = await getAanbiederBySlug(slug);
  if (!aanbieder) return { title: "Niet gevonden" };

  return {
    title: `${aanbieder.naam} | Profiel & Beoordelingen`,
    description: `Bekijk het profiel van ${aanbieder.naam} uit ${aanbieder.vestigingsplaats}. ${aanbieder.beoordeling}/5 beoordeling op basis van ${aanbieder.aantalReviews} reviews. Specialisaties: ${aanbieder.specialisaties.join(", ")}.`,
    alternates: {
      canonical: `https://zorgwoningvergelijker.nl/aanbieders/${slug}`,
    },
    keywords: [aanbieder.naam, `${aanbieder.naam} reviews`, "modulaire woning aanbieder", ...aanbieder.specialisaties.slice(0, 3)],
  };
}

const specialisatieLabels: Record<string, string> = {
  "tiny-house": "Tiny House",
  "micro-woning": "Micro-woning",
  mantelzorgwoning: "Mantelzorgwoning",
  kangoeroewoning: "Kangoeroewoning",
  chalet: "Chalet",
  lodge: "Lodge",
  vakantiebungalow: "Vakantiebungalow",
  "prefab-woning": "Prefab woning",
  systeemwoning: "Systeemwoning",
  flexwoning: "Flexwoning",
  containerwoning: "Containerwoning",
  woonunit: "Woonunit",
  tuinkamer: "Tuinkamer",
  "modulaire-aanbouw": "Modulaire aanbouw",
};

export default async function AanbiederPage({
  params,
}: AanbiederPageProps) {
  const { slug } = await params;
  const [aanbieder, allAanbieders] = await Promise.all([
    getAanbiederBySlug(slug),
    getAllAanbieders(),
  ]);

  if (!aanbieder) {
    notFound();
  }
  const featuredSlugs = new Set(
    [...allAanbieders]
      .sort((a, b) => b.beoordeling - a.beoordeling)
      .slice(0, 3)
      .map((a) => a.slug)
  );

  const initials = aanbieder.naam
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isFeatured = featuredSlugs.has(aanbieder.slug);

  const aanbiederSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: aanbieder.naam,
    description: aanbieder.beschrijving,
    address: {
      "@type": "PostalAddress",
      addressLocality: aanbieder.vestigingsplaats,
      addressCountry: "NL",
    },
    ...(aanbieder.website && { url: aanbieder.website }),
    ...(aanbieder.telefoon && { telephone: aanbieder.telefoon }),
    ...(aanbieder.contactEmail && { email: aanbieder.contactEmail }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aanbieder.beoordeling,
      reviewCount: aanbieder.aantalReviews,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aanbiederSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-[#2D1B4E] overflow-hidden">
        {/* Decoratieve golf */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute bottom-[10%] left-0 w-full h-[200px] opacity-[0.08]"
            viewBox="0 0 1440 200"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 100C240 150 480 170 720 130C960 90 1200 50 1440 100V200H0Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-12 pb-16 sm:pt-14 sm:pb-20">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-body-sm text-white/60 mb-8"
            >
              <Link
                href="/"
                className="hover:text-white/80 transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href="/aanbieders"
                className="hover:text-white/80 transition-colors"
              >
                Aanbieders
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{aanbieder.naam}</span>
            </nav>

            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 flex items-center justify-center font-heading font-bold text-white text-2xl md:text-3xl flex-shrink-0 ring-1 ring-white/20">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-display font-heading font-bold text-white tracking-tight">
                    {aanbieder.naam}
                  </h1>
                  {isFeatured && (
                    <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent-200 px-3 py-1 rounded-full text-caption font-semibold ring-1 ring-accent/30">
                      <Award className="w-3.5 h-3.5" />
                      Aanbevolen
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span className="text-body">
                      {aanbieder.vestigingsplaats}, {aanbieder.provincie}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-body font-heading font-bold text-white tabular-nums">
                      {aanbieder.beoordeling.toFixed(1)}
                    </span>
                    <span className="text-body-sm text-white/50">
                      ({aanbieder.aantalReviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-body-lg text-white/70 leading-relaxed max-w-2xl">
                  {aanbieder.beschrijving}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lichte golf-overgang */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="block w-full h-[20px] md:h-[28px]"
            preserveAspectRatio="none"
          >
            <path d="M0 60V40C360 28 720 24 1080 32C1260 36 1380 42 1440 40V60H0Z" fill="#FAF9F6" />
          </svg>
        </div>
      </section>

      {/* Quick stats */}
      <section className="bg-page">
        <Container>
          <div className="max-w-4xl mx-auto -mt-6 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-heading-2 font-heading font-bold text-dark tabular-nums">
                  {aanbieder.beoordeling.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-1.5 mb-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(aanbieder.beoordeling)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-caption text-gray-600">Beoordeling</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-heading font-bold text-dark tabular-nums">
                  {aanbieder.aantalReviews}
                </div>
                <div className="text-caption text-gray-600 mt-1">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-heading font-bold text-dark tabular-nums">
                  {aanbieder.specialisaties.length}
                </div>
                <div className="text-caption text-gray-600 mt-1">Specialisaties</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-heading font-bold text-dark tabular-nums">
                  {aanbieder.werkgebied.length}
                </div>
                <div className="text-caption text-gray-600 mt-1">Provincies</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specialisaties & Werkgebied */}
      <section className="bg-page py-16 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Specialisaties */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Shield className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-heading-2 tracking-tight text-dark">
                  Specialisaties
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {aanbieder.specialisaties.map((spec) => (
                  <Link
                    key={spec}
                    href={`/occasions/${spec}`}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-body-sm font-medium bg-white text-dark ring-1 ring-gray-200/80 shadow-sm hover:shadow-card hover:ring-primary/20 hover:text-primary transition-all duration-200"
                  >
                    {specialisatieLabels[spec] || spec}
                  </Link>
                ))}
              </div>
            </div>

            {/* Werkgebied */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-heading-2 tracking-tight text-dark">
                  Werkgebied
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {aanbieder.werkgebied.map((provincie) => (
                  <div
                    key={provincie}
                    className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl ring-1 ring-gray-200/80 text-body-sm text-gray-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary/60 flex-shrink-0" />
                    {provincie}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section className="section-padding section-gray">
        <Container>
          <div className="section-header text-left sm:text-center">
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle">
              Bekijk gerealiseerde projecten van {aanbieder.naam}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {aanbieder.portfolio.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gray-50 overflow-hidden">
                  <PlaceholderImage
                    type="portfolio"
                    woningSlug={item.woningType}
                    text={specialisatieLabels[item.woningType] || item.woningType}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-body text-dark mb-1 line-clamp-1">
                    {item.titel}
                  </h3>
                  <div className="flex items-center gap-1.5 text-caption text-gray-600">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{item.locatie}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="section-padding section-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="section-header">
              <h2 className="section-title">Neem contact op</h2>
              <p className="section-subtitle">
                Neem direct contact op met {aanbieder.naam}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* E-mail */}
              <a
                href={`mailto:${aanbieder.contactEmail}`}
                className="group flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-caption text-gray-400 mb-1">E-mail</p>
                <p className="text-body-sm font-medium text-primary break-all">
                  {aanbieder.contactEmail}
                </p>
              </a>

              {/* Telefoon */}
              <a
                href={`tel:${aanbieder.telefoon}`}
                className="group flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-caption text-gray-400 mb-1">Telefoon</p>
                <p className="text-body-sm font-medium text-dark">
                  {aanbieder.telefoon}
                </p>
              </a>

              {/* Website */}
              <a
                href={aanbieder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Globe className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-caption text-gray-400 mb-1">Website</p>
                <p className="text-body-sm font-medium text-primary flex items-center gap-1">
                  Bezoek website
                  <ExternalLink className="w-3 h-3" />
                </p>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding section-gray">
        <Container>
          <div className="relative max-w-3xl mx-auto bg-[#2D1B4E] rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            {/* Decoratieve golf */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="absolute bottom-0 left-0 w-full h-[120px] opacity-[0.06]"
                viewBox="0 0 1440 120"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 60C240 90 480 100 720 80C960 60 1200 40 1440 60V120H0Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10">
              <h2 className="font-heading font-bold text-heading-2 sm:text-heading-1 text-white mb-4 tracking-tight">
                Interesse in {aanbieder.naam}?
              </h2>
              <p className="text-body-lg text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Configureer je woning en ontvang een vrijblijvende offerte van{" "}
                {aanbieder.naam} en andere geselecteerde aanbieders.
              </p>
              <Link
                href="/configurator"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-accent/20 transition-all duration-300 ease-premium hover:-translate-y-[1px]"
              >
                Offerte aanvragen
                <span className="relative w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-spring group-hover:translate-x-1 group-hover:bg-white/25">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
