"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function StickyArticleCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrolledPast = false;
    let ctaBannerVisible = false;

    const update = () => {
      setIsVisible(scrolledPast && !ctaBannerVisible);
    };

    const handleScroll = () => {
      scrolledPast = window.scrollY > 400;
      update();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        ctaBannerVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.4 }
    );

    const ctaBanner = document.getElementById("cta-banner");
    if (ctaBanner) observer.observe(ctaBanner);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`
        hidden xl:block fixed z-40 w-[220px] top-[120px]
        transition-all duration-500 ease-premium
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
        }
      `}
      style={{ left: "calc(50% + 21rem + 1.25rem)" }}
    >
      {/* Wim leunt over de kaart — handen overlappen de kaartrand */}
      <div className="relative z-10 flex justify-center -mb-[14px] pointer-events-none select-none">
        <Image
          src="/images/wim-benieuwd-kosten.png"
          alt="Wim de Woning Inspecteur Meester kijkt met zijn vergrootglas naar de kosten van je modulaire woning"
          width={480}
          height={560}
          className="w-[108px] h-auto drop-shadow-md"
        />
      </div>

      {/* Kaart */}
      <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-card px-5 pb-5 pt-4">
        <p className="font-heading font-semibold text-heading-3 tracking-tight text-dark mb-2 leading-snug">
          Benieuwd wat je woning kost?
        </p>
        <p className="text-body-sm text-gray-600 leading-relaxed mb-4">
          Stel je droomwoning samen en ontvang een offerte op maat.
        </p>

        <Link
          href="/configurator"
          className="group flex items-center justify-center gap-2 w-full bg-accent text-white font-semibold text-body-sm px-4 py-2.5 rounded-xl shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-premium"
        >
          <span>Vraag offerte aan</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-gray-100">
          {["100% gratis", "Vrijblijvend", "Binnen 48 uur"].map((t) => (
            <span key={t} className="flex items-center gap-2 text-caption text-gray-600">
              <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
