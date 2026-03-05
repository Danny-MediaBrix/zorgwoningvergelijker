import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { woningtypeNaamMap } from "@/lib/woningtypen-slim";

interface OccasionHeroProps {
  woningtypeSlug?: string;
  totalCount: number;
}

export default function OccasionHero({ woningtypeSlug, totalCount }: OccasionHeroProps) {
  const woningtypeNaam = woningtypeSlug
    ? woningtypeNaamMap.get(woningtypeSlug) ?? null
    : null;

  const title = woningtypeNaam
    ? `${woningtypeNaam} occasions`
    : "Tweedehands modulaire woningen";

  const subtitle = woningtypeNaam
    ? `Bekijk ${totalCount} beschikbare tweedehands ${woningtypeNaam.toLowerCase()} woningen van particulieren en bedrijven.`
    : `Ontdek ${totalCount} tweedehands modulaire woningen van particulieren en bedrijven in heel Nederland.`;

  return (
    <section className="relative bg-[#2D1B4E] overflow-hidden">
      {/* Subtiele decoratieve golf in de achtergrond */}
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
        {/* Tekst — padding bepaalt de hoogte van de hero */}
        <div className="pt-12 pb-14 sm:pt-14 sm:pb-16 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-body-sm text-white/60 mb-6"
          >
            <Link href="/" className="hover:text-white/80 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            {woningtypeNaam ? (
              <>
                <Link href="/occasions" className="hover:text-white/80 transition-colors">
                  Occasions
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/90">{woningtypeNaam}</span>
              </>
            ) : (
              <span className="text-white/90">Occasions</span>
            )}
          </nav>

          <h1 className="text-3xl sm:text-display font-heading font-bold text-white mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-body-lg text-white/70 max-w-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Wim — absoluut gepositioneerd, voeten worden afgesneden door overflow-hidden */}
        <div className="hidden md:block absolute right-[12%] lg:right-[15%] xl:right-[18%] -bottom-6 w-[170px] lg:w-[200px] xl:w-[240px]">
          <Image
            src="/images/wim-vergelijkt-tweedehands-woningen.png"
            alt="Wim vergelijkt tweedehands modulaire woningen en occasions"
            width={480}
            height={578}
            className="w-full object-contain"
            sizes="240px"
            quality={90}
          />
        </div>
      </div>

      {/* Lichte golf-overgang onderaan */}
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
  );
}
