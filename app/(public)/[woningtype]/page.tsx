import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Ruler,
  Euro,
  Zap,
  CheckCircle2,
  XCircle,
  Check,
  ExternalLink,
} from "lucide-react";
import { woningtypen, getWoningType } from "@/lib/woningtypen";
import { getSeoContent } from "@/lib/seo-content";
import { artikelenMeta } from "@/lib/artikelen";
import { auteurWim } from "@/lib/auteur";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import CTAArrow from "@/components/ui/CTAArrow";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import ComparisonScroller from "@/components/ui/ComparisonScroller";
import CTABanner from "@/components/sections/CTABanner";

const woningImages: Record<string, string> = {
  "tiny-house": "/images/tiny-house.jpg",
  "micro-woning": "/images/micro-woning.jpg",
  "mantelzorgwoning": "/images/mantelzorgwoning.jpg",
  "kangoeroewoning": "/images/kangaroe-woning.jpg",
  "chalet": "/images/chalet.jpg",
  "lodge": "/images/lodge.jpg",
  "vakantiebungalow": "/images/vakantiebungalow.jpg",
  "prefab-woning": "/images/prefab-woning.jpg",
  "systeemwoning": "/images/systeemwoning.jpg",
  "flexwoning": "/images/flexwoning-v2.jpg",
  "containerwoning": "/images/containerwoning-v2.jpg",
  "woonunit": "/images/woonunit.jpg",
  "tuinkamer": "/images/tuinkamer-bijgebouw-v2.jpg",
  "modulaire-aanbouw": "/images/modulaire aanbouw.jpg",
};

interface WoningtypePageProps {
  params: Promise<{ woningtype: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return woningtypen.map((wt) => ({
    woningtype: wt.slug,
  }));
}

export async function generateMetadata({
  params,
}: WoningtypePageProps): Promise<Metadata> {
  const { woningtype } = await params;
  const wt = getWoningType(woningtype);
  if (!wt) return { title: "Niet gevonden" };

  const image = woningImages[woningtype];

  return {
    title: wt.seo.title,
    description: wt.seo.description,
    keywords: [wt.seo.primaryKeyword, ...wt.seo.secondaryKeywords],
    alternates: {
      canonical: `https://zorgwoningvergelijker.nl/${woningtype}`,
    },
    openGraph: {
      title: wt.seo.title,
      description: wt.seo.description,
      type: "website",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: `${wt.naam} - prijzen en specificaties vergelijken` }],
      }),
    },
  };
}

export default async function WoningtypePage({
  params,
}: WoningtypePageProps) {
  const { woningtype } = await params;
  const wt = getWoningType(woningtype);

  if (!wt) {
    notFound();
  }

  const faqAccordionItems = wt.faq.map((item, index) => ({
    id: `faq-${index}`,
    title: item.vraag,
    content: <span dangerouslySetInnerHTML={{ __html: item.antwoord }} />,
  }));

  // Gerelateerde kennisbankartikelen
  const woningtypeSlug = wt.slug.toLowerCase();
  const woningtypeNaam = wt.naam.toLowerCase();
  const gerelateerdeArtikelen = artikelenMeta
    .filter(
      (a) =>
        a.slug.includes(woningtypeSlug) ||
        a.slug.includes(woningtypeNaam.replace(/\s+/g, "-")) ||
        (woningtypeSlug === "tiny-house" && a.slug.includes("tiny-house")) ||
        (woningtypeSlug === "mantelzorgwoning" &&
          a.slug.includes("mantelzorg"))
    )
    .slice(0, 3);

  const heroImage = woningImages[wt.slug];

  // JSON-LD structured data — FAQPage + BreadcrumbList
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wt.faq.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.antwoord,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zorgwoningvergelijker.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: wt.naam,
        item: `https://zorgwoningvergelijker.nl/${wt.slug}`,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zorgwoningvergelijker.nl/${woningtype}`,
    },
    name: wt.naam,
    description: wt.beschrijving,
    brand: {
      "@type": "Organization",
      name: "Zorgwoningvergelijker.nl",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: wt.prijsVanaf,
      highPrice: wt.maxM2 * wt.basisPrijsPerM2Hoog,
      offerCount: 14,
    },
    ...(woningImages[woningtype] && {
      image: `https://zorgwoningvergelijker.nl${woningImages[woningtype]}`,
    }),
  };

  // SEO content — unieke teksten per woningtype
  const seo = getSeoContent(wt.slug);

  // PSP hero copy per woningtype
  const heroCopy: Record<string, { probleem: string; oplossing: string }> = {
    "tiny-house": {
      probleem: "Betaalbaar wonen lijkt onbereikbaar?",
      oplossing: "Eigen woning vanaf \u20AC39.000, binnen 16 weken geplaatst, zonder jarenlang te sparen.",
    },
    "micro-woning": {
      probleem: "Wachtlijsten en woningtekort?",
      oplossing: "Compact wonen met alle voorzieningen, snel geplaatst, zonder concessies aan comfort.",
    },
    "mantelzorgwoning": {
      probleem: "Je ouders dichtbij, maar wel zelfstandig?",
      oplossing: "Zorgwoning in je tuin, binnen 12 weken klaar, zonder verbouwing van je huis.",
    },
    "kangoeroewoning": {
      probleem: "Samen wonen maar ook apart leven?",
      oplossing: "Twee zelfstandige woningen onder \u00e9\u00e9n dak, zonder privacy in te leveren.",
    },
    "chalet": {
      probleem: "Droom je van een eigen plek in de natuur?",
      oplossing: "Instapklaar chalet, binnen weken geplaatst, zonder bouwstress.",
    },
    "lodge": {
      probleem: "Luxe in de natuur zonder gedoe?",
      oplossing: "Hoogwaardige lodge met alle comfort, snel gerealiseerd, zonder concessies aan kwaliteit.",
    },
    "vakantiebungalow": {
      probleem: "Elk jaar opnieuw dure vakanties boeken?",
      oplossing: "Eigen bungalow die ook rendement oplevert, zonder groot vastgoedrisico.",
    },
    "prefab-woning": {
      probleem: "Maanden wachten op een traditionele bouw?",
      oplossing: "Volwaardige woning in een fractie van de bouwtijd, zonder kwaliteitsverlies.",
    },
    "systeemwoning": {
      probleem: "Zekerheid zoeken bij een grote investering?",
      oplossing: "Bewezen bouwsysteem met vaste prijs en planning, zonder verrassingen.",
    },
    "flexwoning": {
      probleem: "Snel een woning nodig, geen tijd voor wachtlijsten?",
      oplossing: "Instapklare woning binnen weken beschikbaar, zonder eindeloos papierwerk.",
    },
    "containerwoning": {
      probleem: "Een eigen woning op een klein budget?",
      oplossing: "Wonen vanaf \u20AC25.000, snel geplaatst, zonder hypotheekstress.",
    },
    "woonunit": {
      probleem: "Tijdelijke huisvesting nodig, maar wel comfortabel?",
      oplossing: "Volledig uitgeruste woonruimte, direct beschikbaar, zonder langlopende verplichtingen.",
    },
    "tuinkamer": {
      probleem: "Te weinig ruimte in huis?",
      oplossing: "Extra leefruimte in je eigen tuin, binnen enkele weken, zonder te verhuizen.",
    },
    "modulaire-aanbouw": {
      probleem: "Je huis voelt te klein?",
      oplossing: "Meer woonruimte binnen weken, zonder de rommel van een traditionele verbouwing.",
    },
  };

  const hero = heroCopy[wt.slug];

  // Senioren checklist — type-specifiek met fallback naar generiek
  const seniorenChecklist = seo?.seniorenChecklist ?? [
    "Gelijkvloers wonen, geen trappen, ideaal bij verminderde mobiliteit",
    "Drempelvrij, brede deuren (min. 85 cm) en drempelvrije overgangen",
    "Toekomstbestendig, inloopdouche, steunbeugels en ruime badkamer",
    "Energiezuinig, lagere woonlasten door goede isolatie en moderne installaties",
    "Nabij voorzieningen, overweeg de afstand tot winkels, huisarts en openbaar vervoer",
    "Zelfstandig en veilig, dichtbij familie of met zorg op maat",
  ];

  // Gerelateerde woningtypen voor interne links
  const gerelateerdeTypen = woningtypen
    .filter((t) => t.categorie === wt.categorie && t.slug !== wt.slug)
    .slice(0, 3);

  // Vergelijkingstypen: huidig type eerst, dan zelfde categorie, dan overig — max 7
  const vergelijkTypen = (() => {
    const zelfdeCategorie = woningtypen.filter(
      (t) => t.categorie === wt.categorie && t.slug !== wt.slug
    );
    const andereCategorie = woningtypen.filter(
      (t) => t.categorie !== wt.categorie
    );
    // Sorteer andere op afstand in prijs
    andereCategorie.sort(
      (a, b) =>
        Math.abs(a.prijsVanaf - wt.prijsVanaf) -
        Math.abs(b.prijsVanaf - wt.prijsVanaf)
    );
    return [wt, ...zelfdeCategorie, ...andereCategorie].slice(0, 7);
  })();

  // Spec row voor CSS Grid vergelijkingstabel
  const renderSpecRow = (
    label: string,
    types: typeof vergelijkTypen,
    getValue: (t: (typeof types)[0]) => string,
    isPrice = false
  ) => (
    <div className="contents">
      <div className="sticky left-0 z-20 bg-[#F5F3EF] px-3 py-2 text-xs text-gray-600 font-medium sticky-shadow-r border-b border-gray-100/80 flex items-center">
        {label}
      </div>
      {types.map((type) => {
        const isHuidig = type.slug === wt.slug;
        return (
          <div
            key={type.slug}
            className={cn(
              "px-3 py-2 text-xs text-center border-b border-gray-100/80 flex items-center justify-center",
              isHuidig
                ? "bg-primary-50/30 font-semibold text-dark"
                : "bg-white text-gray-700",
              isPrice && "price-amount font-semibold"
            )}
          >
            {getValue(type)}
          </div>
        );
      })}
    </div>
  );

  // Group header voor CSS Grid vergelijkingstabel
  const renderGroupHeader = (label: string) => (
    <div className="contents">
      <div className="sticky left-0 z-20 bg-[#F5F3EF] pt-3 pb-1 px-3 sticky-shadow-r flex items-end">
        <span className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.08em]">
          {label}
        </span>
      </div>
      {vergelijkTypen.map((type) => (
        <div
          key={type.slug}
          className={cn(
            "pt-3 pb-1 flex items-end",
            type.slug === wt.slug ? "bg-primary-50/30" : "bg-white"
          )}
        >
          <div className="border-t-2 border-primary/10 mx-3 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Woningtypen", href: "/#woningtypen" },
              { label: wt.naam },
            ]}
          />
        </Container>
      </section>

      {/* Hero met foto */}
      <section className="relative overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage}
            alt={`${wt.naam} - prijzen, specificaties en aanbieders vergelijken in Nederland`}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
        <Container className="relative pt-20 md:pt-28 lg:pt-32 pb-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            <div className="self-center pb-8 md:pb-24 lg:pb-28">
              <Badge variant="white" className="mb-5">
                {wt.categorieLabel}
              </Badge>
              {hero && (
                <p className="text-body text-[#FAD4AE] font-medium mb-3">
                  {hero.probleem}
                </p>
              )}
              <h1 className="font-semibold text-display md:text-display-xl tracking-tight text-white mb-4">
                {wt.naam}
              </h1>
              <p className="text-body-lg text-white/90 mb-10 leading-relaxed max-w-lg">
                {hero?.oplossing ?? wt.tagline}
              </p>
              <Button as="link" href={`/configurator?type=${wt.slug}`} variant="accent" size="lg" iconRight={<CTAArrow />}>
                Ontvang offertes voor je {wt.naam.toLowerCase()}
              </Button>
              <p className="mt-4 text-body-sm text-white/70 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FAD4AE] flex-shrink-0" />
                Wij zijn geen aanbieder. Je ontvangt vrijblijvend offertes van verschillende aanbieders.
              </p>
            </div>

            {/* Wim */}
            <div className="self-end -mb-8 md:-mb-12">
              <Image
                src="/images/wim-vergelijkt-woningtype.png"
                alt={`Wim vergelijkt ${wt.naam.toLowerCase()} aanbieders en prijzen`}
                width={1024}
                height={1280}
                className="w-[40%] mx-auto md:w-[55%] md:mx-auto object-contain"
                priority
                quality={90}
                sizes="(max-width: 768px) 40vw, 55vw"
              />
            </div>
          </div>
        </Container>

      </section>

      {/* Quick stats bar */}
      <section className="bg-white border-b border-gray-200 py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Euro className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-caption text-gray-600">Prijs vanaf</p>
                <p className="font-semibold text-dark price-amount">
                  {formatPrice(wt.prijsVanaf)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-caption text-gray-600">Oppervlakte</p>
                <p className="font-semibold text-dark">
                  {wt.minM2} - {wt.maxM2} m²
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-caption text-gray-600">Bouwtijd</p>
                <p className="font-semibold text-dark">
                  {wt.specificaties.gemiddeldeBouwtijd}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-caption text-gray-600">Energielabel</p>
                <p className="font-semibold text-dark">
                  {wt.specificaties.energielabel}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial content + sticky sidebar */}
      <section className="section-padding">
        <Container>
          <div className="flex gap-10">
            {/* Main content column */}
            <div className="flex-1 min-w-0">
              {/* Wat is een [type]? */}
              <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                Wat is een {wt.naam.toLowerCase()}?
              </h2>
              <p className="text-body-lg text-gray-600 leading-relaxed mb-4">
                {wt.beschrijving}
              </p>

              {seo?.uitgebreideBeschrijving && (
                <div className="mb-8 space-y-4">
                  {seo.uitgebreideBeschrijving.split("\n\n").map((alinea, i) => (
                    <p key={i} className="text-body text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: alinea }} />
                  ))}
                </div>
              )}

              {!seo?.uitgebreideBeschrijving && <div className="mb-8" />}

              {/* Wat kost een [type]? */}
              <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-4">
                Wat kost een {wt.naam.toLowerCase()} in 2026?
              </h2>
              <p className="text-body text-gray-600 leading-relaxed mb-4">
                De prijzen voor een {wt.naam.toLowerCase()} beginnen vanaf{" "}
                <strong className="price-amount text-dark">{formatPrice(wt.prijsVanaf)}</strong> en lopen
                op tot{" "}
                <strong className="price-amount text-dark">
                  {formatPrice(wt.maxM2 * wt.basisPrijsPerM2Hoog)}
                </strong>{" "}
                voor een volledig uitgerust model van {wt.maxM2} m². De prijs per
                vierkante meter varieert van{" "}
                <strong className="price-amount text-dark">{formatPrice(wt.basisPrijsPerM2Laag)}</strong> tot{" "}
                <strong className="price-amount text-dark">{formatPrice(wt.basisPrijsPerM2Hoog)}</strong>,
                afhankelijk van de gekozen materialen, afwerking en opties.
              </p>
              <p className="text-body-sm text-gray-600 italic mb-8">
                Indicatieve prijsrange incl. BTW, gebaseerd op marktgemiddelden
                2025/2026. Werkelijke kosten zijn afhankelijk van aanbieder,
                locatie, grondwerk, fundering, transport en aansluitingen.
              </p>

              {gerelateerdeTypen.length > 0 && (
                <div className="bg-primary-50/40 rounded-2xl p-6 mb-10">
                  <p className="text-body font-medium text-dark mb-2">
                    Vergelijkbare woningtypen
                  </p>
                  <p className="text-body text-gray-600">
                    Twijfel je tussen verschillende typen? Bekijk ook de{" "}
                    {gerelateerdeTypen.map((t, i) => (
                      <span key={t.slug}>
                        {i > 0 && i < gerelateerdeTypen.length - 1 && ", "}
                        {i > 0 && i === gerelateerdeTypen.length - 1 && " en "}
                        <Link
                          href={`/${t.slug}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {t.naam.toLowerCase()}
                        </Link>
                      </span>
                    ))}
                    {" "}en{" "}
                    <Link
                      href={`/configurator?type=${wt.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      vergelijk prijzen in onze configurator
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="divider-gradient my-10" />

              {/* Voordelen & Nadelen */}
              <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                Voordelen en nadelen
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-primary-50/30 rounded-2xl p-6 border border-primary/10">
                  <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Voordelen
                  </h3>
                  <ul className="space-y-3">
                    {wt.voordelen.map((voordeel, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-body-sm text-gray-700">{voordeel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/60">
                  <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-gray-500" />
                    Nadelen
                  </h3>
                  <ul className="space-y-3">
                    {wt.nadelen.map((nadeel, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-body-sm text-gray-700">{nadeel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vergunningen en regelgeving */}
              {seo?.vergunningenTekst && (
                <>
                  <div className="divider-gradient my-10" />

                  <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                    Vergunningen en regelgeving
                  </h2>
                  <div className="space-y-4 mb-10">
                    {seo.vergunningenTekst.split("\n\n").map((alinea, i) => (
                      <p key={i} className="text-body text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: alinea }} />
                    ))}
                    {seo.externeLink && (
                      <p className="text-body text-gray-600 leading-relaxed">
                        <a
                          href={seo.externeLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
                        >
                          {seo.externeLink.tekst}
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        </a>
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Divider */}
              <div className="divider-gradient my-10" />

              {/* Senioren & 50-plussers */}
              <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                {wt.naam} voor senioren en 50-plussers
              </h2>
              {seo?.seniorenTekst ? (
                <p className="text-body-lg text-gray-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: seo.seniorenTekst }} />
              ) : (
                <p className="text-body-lg text-gray-600 leading-relaxed mb-8">
                  Steeds meer 50-plussers kiezen voor een {wt.naam.toLowerCase()} als toekomstbestendige woonoplossing. Of het nu gaat om gelijkvloers wonen, dichter bij familie, of zelfstandig blijven wonen met zorg op maat, een {wt.naam.toLowerCase()} biedt de flexibiliteit die bij je levensfase past.
                </p>
              )}

              <div className="bg-primary-50/30 rounded-2xl p-6 border border-primary/10 mb-8">
                <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-4">
                  Waar moet je op letten?
                </h3>
                <ul className="space-y-3">
                  {seniorenChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-body text-gray-600 leading-relaxed">
                Benieuwd of een {wt.naam.toLowerCase()} bij je situatie past?{" "}
                <Link
                  href={`/configurator?type=${wt.slug}`}
                  className="text-primary font-medium hover:underline"
                >
                  Stel je ideale woning samen
                </Link>{" "}
                in onze gratis configurator en ontvang een vrijblijvende
                prijsindicatie.
              </p>

              {/* Financiering — conditioneel */}
              {seo?.financieringTekst && (
                <>
                  <div className="divider-gradient my-10" />

                  <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
                    {wt.naam} financieren
                  </h2>
                  <div className="space-y-4">
                    {seo.financieringTekst.split("\n\n").map((alinea, i) => (
                      <p key={i} className="text-body text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: alinea }} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sticky sidebar */}
            <div className="hidden lg:block w-[240px] flex-shrink-0">
              <div className="sticky top-[96px] space-y-5">
                {/* Author card */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={auteurWim.slug}>
                      <Image
                        src={auteurWim.afbeelding}
                        alt={auteurWim.volleNaam}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl object-cover"
                        sizes="48px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-caption text-gray-500">Geschreven door</p>
                      <Link
                        href={auteurWim.slug}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        <p className="font-heading font-semibold text-body-sm text-dark leading-tight">
                          {auteurWim.volleNaam}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <p className="text-caption text-gray-600 leading-relaxed mb-3">
                    {auteurWim.rol}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {auteurWim.expertise.slice(0, 2).map((item) => (
                      <Badge key={item} variant="gray" className="text-[10px] px-2 py-0.5">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={auteurWim.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0A66C2]/[0.08] hover:bg-[#0A66C2]/[0.14] text-[#0A66C2] px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors duration-200"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>

                {/* Configurator CTA card */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-card px-5 pb-5 pt-4">
                  <p className="font-heading font-semibold text-body-sm tracking-tight text-dark mb-2 leading-snug">
                    {wt.naam} samenstellen?
                  </p>
                  <p className="text-caption text-gray-600 leading-relaxed mb-3">
                    Configureer je ideale {wt.naam.toLowerCase()} en ontvang een
                    offerte op maat.
                  </p>
                  <Link
                    href={`/configurator?type=${wt.slug}`}
                    className="group flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold text-caption px-4 py-2.5 rounded-xl hover:bg-primary-800 transition-all duration-200"
                  >
                    Start configurator
                  </Link>
                  <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-100">
                    {["100% gratis", "Vrijblijvend", "Binnen 48 uur"].map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 text-[11px] text-gray-500"
                      >
                        <Check className="w-3 h-3 text-primary flex-shrink-0" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vergelijking — premium comparison table */}
      <section className="section-gray py-14 md:py-20 wave-from-white wave-to-dark">
        <Container>
          <div className="text-center mb-10">
            <h2 className="section-title">
              Vergelijk met andere woningtypen
            </h2>
            <p className="section-subtitle">
              Ontdek welk woningtype het beste bij je situatie past
            </p>
          </div>
        </Container>

        <ComparisonScroller className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid"
            role="table"
            style={{
              gridTemplateColumns: `156px repeat(${vergelijkTypen.length}, 180px)`,
            }}
          >
            {/* Header row: product cards */}
            <div className="contents" role="row">
              <div className="sticky left-0 z-20 bg-[#F5F3EF] sticky-shadow-r" role="columnheader" />

              {vergelijkTypen.map((type) => {
                const isHuidig = type.slug === wt.slug;
                const img = woningImages[type.slug];
                return (
                  <div key={type.slug} className="p-1 pb-3" role="columnheader">
                    <div
                      className={cn(
                        "bg-white rounded-2xl overflow-hidden flex flex-col h-full",
                        isHuidig
                          ? "ring-2 ring-primary shadow-md"
                          : "border border-gray-200/80 shadow-card"
                      )}
                    >
                      {img && (
                        <div className="relative h-[105px] sm:h-[115px] overflow-hidden">
                          <Image
                            src={img}
                            alt={type.naam}
                            fill
                            className="object-cover"
                            quality={90}
                            sizes="(max-width: 640px) 170px, 178px"
                          />
                          {isHuidig && (
                            <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                              Huidige
                            </span>
                          )}
                        </div>
                      )}

                      <div className="p-2.5 sm:p-3 flex flex-col flex-1">
                        <span className="text-[0.55rem] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          {type.categorieLabel}
                        </span>

                        {isHuidig ? (
                          <span className="text-[0.8rem] font-bold text-dark leading-snug mb-0.5">
                            {type.naam}
                          </span>
                        ) : (
                          <Link
                            href={`/${type.slug}`}
                            className="text-[0.8rem] font-bold text-dark hover:text-primary transition-colors leading-snug mb-0.5"
                          >
                            {type.naam}
                          </Link>
                        )}

                        <span className="text-sm font-bold text-dark price-amount mb-2">
                          v.a. {formatPrice(type.prijsVanaf)}
                        </span>

                        <div className="mt-auto">
                          {isHuidig ? (
                            <Link
                              href={`/configurator?type=${type.slug}`}
                              className="flex items-center justify-center gap-1 w-full text-[0.7rem] font-semibold text-white bg-primary hover:bg-primary-800 px-2 py-2 rounded-xl transition-colors"
                            >
                              Configureer
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ) : (
                            <Link
                              href={`/${type.slug}`}
                              className="flex items-center justify-center gap-1 w-full text-[0.7rem] font-semibold text-primary hover:text-primary-800 border border-primary/20 hover:border-primary/40 px-2 py-2 rounded-xl transition-colors leading-tight text-center"
                            >
                              {type.naam} vergelijken
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spec rows */}
            {renderGroupHeader("Prijs")}
            {renderSpecRow("Prijs vanaf", vergelijkTypen, (t) => formatPrice(t.prijsVanaf), true)}
            {renderSpecRow("Per m²", vergelijkTypen, (t) => `${formatPrice(t.basisPrijsPerM2Laag)} – ${formatPrice(t.basisPrijsPerM2Hoog)}`, true)}

            {renderGroupHeader("Formaat")}
            {renderSpecRow("Oppervlakte", vergelijkTypen, (t) => `${t.minM2}–${t.maxM2} m²`)}
            {renderSpecRow("Verdiepingen", vergelijkTypen, (t) => t.verdiepingen)}

            {renderGroupHeader("Bouw & Energie")}
            {renderSpecRow("Bouwtijd", vergelijkTypen, (t) => t.specificaties.gemiddeldeBouwtijd)}
            {renderSpecRow("Levensduur", vergelijkTypen, (t) => t.specificaties.levensduur)}
            {renderSpecRow("Energielabel", vergelijkTypen, (t) => t.specificaties.energielabel)}
            {renderSpecRow("Fundering", vergelijkTypen, (t) => t.specificaties.fundering)}

            {renderGroupHeader("Praktisch")}
            {renderSpecRow("Vergunning", vergelijkTypen, (t) => t.specificaties.vergunning)}
            {renderSpecRow("Verplaatsbaar", vergelijkTypen, (t) => t.specificaties.verplaatsbaar)}
            {renderSpecRow("Geschikt voor", vergelijkTypen, (t) => t.specificaties.geschiktVoor)}
          </div>
        </ComparisonScroller>

        <Container>
          <p className="text-caption text-gray-500 mt-6 text-center">
            Prijzen indicatief incl. BTW, excl. grond en fundering. Vergunningsregels verschillen per gemeente.
          </p>
        </Container>
      </section>

      {/* CTA tussenin — premium dark strip */}
      <section className="relative overflow-hidden bg-[#2D1B4E] py-16 md:py-20">
        {/* Subtle organic wave decoration */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 400"
          aria-hidden="true"
        >
          <path
            d="M-100 320Q360 120 720 260Q1080 400 1540 180"
            stroke="white"
            strokeWidth="140"
            fill="none"
          />
        </svg>

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[0.7rem] text-primary-200/70 mb-4 font-bold uppercase tracking-[0.15em]">
              Gratis en vrijblijvend
            </p>
            <h2 className="text-2xl md:text-display text-white font-heading font-bold mb-4 tracking-tight">
              Ontvang offertes voor je{" "}
              <span className="text-[#FAD4AE]">{wt.naam.toLowerCase()}</span>
            </h2>
            <p className="text-body-lg text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
              Vul je wensen in en ontvang vrijblijvend offertes
              van verschillende aanbieders, zodat je kunt vergelijken.
            </p>

            {/* Process micro-steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-2xl mx-auto">
              {[
                { nr: "1", label: "Wensen invullen", desc: "Type, indeling & budget" },
                { nr: "2", label: "Aanbieders ontvangen", desc: "Meerdere partijen reageren" },
                { nr: "3", label: "Offerte kiezen", desc: "Jij beslist, geheel vrijblijvend" },
              ].map((step) => (
                <div key={step.nr} className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-body font-bold flex-shrink-0 shadow-md shadow-accent/25">
                    {step.nr}
                  </span>
                  <p className="text-body-sm font-semibold text-white leading-tight">
                    {step.label}
                  </p>
                  <p className="text-caption text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>

            <Button
              as="link"
              href={`/configurator?type=${wt.slug}`}
              variant="accent"
              size="lg"
              iconRight={<CTAArrow />}
            >
              Ontvang gratis offertes
            </Button>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-body-sm text-white/70">
              {["100% gratis", "Verschillende aanbieders", "Binnen 48 uur reactie"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-200" /> {t}
                  </span>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-gray section-padding wave-from-dark">
        <Container>
          <div className="section-header">
            <h2 className="section-title">
              Veelgestelde vragen over {wt.naam.toLowerCase()}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqAccordionItems} />
          </div>
        </Container>
      </section>

      {/* Gerelateerde artikelen */}
      {gerelateerdeArtikelen.length > 0 && (
        <section className="section-white section-padding">
          <Container>
            <div className="section-header">
              <h2 className="section-title">
                Meer lezen over {wt.naam.toLowerCase()}en
              </h2>
              <p className="section-subtitle">
                Praktische informatie en tips in onze kennisbank
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {gerelateerdeArtikelen.map((artikel) => (
                <Link
                  key={artikel.slug}
                  href={`/kennisbank/${artikel.slug}`}
                  className="card-interactive p-6"
                >
                  <Badge variant={artikel.categorieVariant} className="mb-3">
                    {artikel.categorie}
                  </Badge>
                  <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-2">
                    {artikel.titel}
                  </h3>
                  <p className="text-body-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {artikel.beschrijving}
                  </p>
                  <span className="flex items-center gap-2 text-body-sm">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-600">{artikel.leestijd} min</span>
                    <ArrowRight className="w-4 h-4 text-primary ml-auto" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/kennisbank"
                className="text-primary font-medium text-body-sm hover:underline inline-flex items-center gap-1 transition-colors duration-200 ease-premium"
              >
                Bekijk alle artikelen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
