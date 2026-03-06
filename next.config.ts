import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.marktplaats.nl",
      },
      {
        protocol: "https",
        hostname: "**.marktplaats.com",
      },
      {
        protocol: "https",
        hostname: "**.marktplaatscdn.nl",
      },
      {
        protocol: "https",
        hostname: "www.tinyhousenederland.nl",
      },
      {
        protocol: "https",
        hostname: "www.modulairwonen.nl",
      },
      {
        protocol: "https",
        hostname: "www.tinyfindy.com",
      },
      {
        protocol: "https",
        hostname: "**.tinyfindy.com",
      },
      {
        protocol: "https",
        hostname: "www.stekelbos.nl",
      },
      {
        protocol: "https",
        hostname: "kuipercaravans.nl",
      },
      {
        protocol: "https",
        hostname: "www.unitdirekt.nl",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      // === Oude WordPress pagina's → nieuwe equivalenten ===

      // Hoofdpagina's
      { source: "/particulier", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen", destination: "/mantelzorgwoning", permanent: true },
      { source: "/zorgchalet-kopen", destination: "/chalet", permanent: true },
      { source: "/zorgwoning-aan-huis", destination: "/mantelzorgwoning", permanent: true },
      { source: "/zorgwoning-huren", destination: "/", permanent: true },
      { source: "/voorbeelden", destination: "/aanbieders", permanent: true },
      { source: "/brochure-aanvragen", destination: "/configurator", permanent: true },
      { source: "/zorgwoning-op-maat", destination: "/configurator", permanent: true },
      { source: "/advies-over-uw-zorgwoning", destination: "/hoe-werkt-het", permanent: true },
      { source: "/privacy", destination: "/privacybeleid", permanent: true },
      { source: "/blog", destination: "/kennisbank", permanent: true },

      // Productpagina's
      { source: "/prefab-mantelzorgwoning", destination: "/prefab-woning", permanent: true },
      { source: "/kangoeroewoning-aan-huis", destination: "/kangoeroewoning", permanent: true },
      { source: "/zorgunit-op-maat", destination: "/configurator", permanent: true },
      { source: "/20-ft-care-mobiele-zorgunits", destination: "/containerwoning", permanent: true },
      { source: "/uitrusting-zorgwoning", destination: "/configurator", permanent: true },
      { source: "/pre-mantelzorgwoning", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorg-aanbouw", destination: "/modulaire-aanbouw", permanent: true },

      // Kennisbank / inhoudelijke pagina's
      { source: "/subsidie-voor-uw-mantelzorgwoning", destination: "/kennisbank/subsidie-mantelzorgwoning", permanent: true },
      { source: "/zorgwoning-regels-wetgeving", destination: "/kennisbank/mantelzorgwoning-regels", permanent: true },
      { source: "/kosten-voor-een-zorgwoning", destination: "/kennisbank/mantelzorgwoning-prijzen", permanent: true },
      { source: "/woning-in-tuin", destination: "/kennisbank/mantelzorgwoning-in-tuin", permanent: true },
      { source: "/zorgwoning-in-de-tuin", destination: "/kennisbank/mantelzorgwoning-in-tuin", permanent: true },
      { source: "/zorgwoning-in-buitengebied-laten-bouwen", destination: "/kennisbank/regels-mantelzorgwoning-buitengebied", permanent: true },
      { source: "/zorgwoning-financiering", destination: "/kennisbank/mantelzorgwoning-financieren", permanent: true },
      { source: "/vergunningsvrij-mantelzorgwoning-plaatsen", destination: "/kennisbank/mantelzorgwoning-vergunningsvrij", permanent: true },
      { source: "/criteria-voor-bouwen-van-een-zorgwoning", destination: "/kennisbank/mantelzorgwoning-regels", permanent: true },
      { source: "/zorgwoning-bouwen", destination: "/", permanent: true },

      // Blog posts
      { source: "/pre-mantelzorgwoning-voor-u", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-plattegrond-laten-maken", destination: "/configurator", permanent: true },
      { source: "/van-de-overheid", destination: "/kennisbank/subsidie-mantelzorgwoning", permanent: true },
      { source: "/zorgwoning-familie-de-jong", destination: "/", permanent: true },

      // Occasions
      { source: "/occasion-zorgwoning-kopen", destination: "/occasions", permanent: true },
      { source: "/occasion-5", destination: "/occasions", permanent: true },

      // B2B/B2G pagina's
      { source: "/gemeenten", destination: "/", permanent: true },
      { source: "/instellingen", destination: "/", permanent: true },

      // Portfolio items
      { source: "/portfolio-item/mantelzorgwoning-type-alabama-10x43m", destination: "/occasions", permanent: true },
      { source: "/portfolio-item/woning-luxe", destination: "/aanbieders", permanent: true },
      { source: "/portfolio-item/woning-l-vorm", destination: "/aanbieders", permanent: true },
      { source: "/portfolio-item/mantelzorgchalet", destination: "/chalet", permanent: true },

      // Testimonials
      { source: "/testimonial/103", destination: "/", permanent: true },
      { source: "/testimonial/102", destination: "/", permanent: true },

      // Stad/regio-pagina's
      { source: "/zorgwoning-amsterdam", destination: "/", permanent: true },
      { source: "/zorgwoning-kopen-in-flevoland", destination: "/", permanent: true },
      { source: "/zorgwoning-kopen-in-zeeland", destination: "/", permanent: true },
      { source: "/zorgwoning-kopen-in-overijssel", destination: "/", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-zwolle", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-zaandam", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-oss", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-noord-brabant", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-heemskerk", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-gelderland", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-den-haag", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-apeldoorn", destination: "/mantelzorgwoning", permanent: true },
      { source: "/mantelzorgwoning-kopen-in-almere", destination: "/mantelzorgwoning", permanent: true },

      // Test/interne pagina's
      { source: "/test-formulier", destination: "/", permanent: true },
      { source: "/vervolgpagina", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
