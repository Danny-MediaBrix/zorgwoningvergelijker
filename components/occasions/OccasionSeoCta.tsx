import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Check } from "lucide-react";
import { auteurWim } from "@/lib/auteur";
import Badge from "@/components/ui/Badge";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function OccasionSeoCta() {
  return (
    <div className="hidden lg:block w-[240px] flex-shrink-0">
      <div className="sticky top-[96px] space-y-5">
        {/* Wim author card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <Link href={auteurWim.slug}>
              <Image
                src={auteurWim.afbeelding}
                alt={auteurWim.volleNaam}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-caption text-gray-500">Geschreven door</p>
              <Link href={auteurWim.slug} className="hover:text-primary transition-colors duration-200">
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
            <LinkedInIcon className="w-3 h-3" />
            LinkedIn
          </a>
        </div>

        {/* Terug naar aanbod CTA */}
        <a
          href="#occasions-top"
          className="group flex items-center justify-center gap-2 w-full bg-accent text-white font-semibold text-body-sm px-4 py-3 rounded-xl shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-premium"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>Terug naar aanbod</span>
        </a>

        {/* Configurator CTA */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-card px-5 pb-5 pt-4">
          <p className="font-heading font-semibold text-body-sm tracking-tight text-dark mb-2 leading-snug">
            Woning samenstellen?
          </p>
          <p className="text-caption text-gray-600 leading-relaxed mb-3">
            Configureer jouw ideale woning en ontvang een offerte op maat.
          </p>
          <Link
            href="/configurator"
            className="group flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold text-caption px-4 py-2.5 rounded-xl hover:bg-primary-800 transition-all duration-200"
          >
            Start configurator
          </Link>
          <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-100">
            {["100% gratis", "Vrijblijvend", "Binnen 48 uur"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <Check className="w-3 h-3 text-primary flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
