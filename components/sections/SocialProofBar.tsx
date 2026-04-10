"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { image: "/images/aanbieders-icoon.png", alt: "Icoon gecertificeerde aanbieders van modulaire woningen", value: 53, suffix: "", label: "Gecertificeerde aanbieders" },
  { image: "/images/geconfigureerd-icoon.png", alt: "Icoon aantal offertes aangevraagd via Zorgwoningvergelijker.nl", value: 1247, suffix: "", label: "Offertes aangevraagd" },
  { image: "/images/beoordeling-icoon.png", alt: "Icoon gemiddelde klantbeoordeling van Zorgwoningvergelijker.nl", value: 4.8, suffix: "/5", label: "Gemiddelde beoordeling", decimal: true },
  { image: "/images/gebruikers-icoon.png", alt: "Icoon tevreden gebruikers die een modulaire woning hebben gevonden", value: 3500, suffix: "+", label: "Tevreden gebruikers" },
  { image: "/images/bespaard-icoon.png", alt: "Icoon gemiddeld bespaarde kosten door woningen te vergelijken", value: 2400, suffix: "", label: "Gemiddeld bespaard", prefix: "€" },
];

const trustItems = [
  { image: "/images/onafhankelijk-icoon.png", alt: "Keurmerk onafhankelijk vergelijkingsplatform", label: "Onafhankelijk", description: "Wij zijn geen aanbieder" },
  { image: "/images/gecertificeerd-icoon.png", alt: "Keurmerk gecertificeerde en streng geselecteerde aanbieders", label: "Gecertificeerd", description: "Streng geselecteerd" },
  { image: "/images/verborgen-kosten-icoon.png", alt: "Keurmerk geen verborgen kosten, altijd transparante prijzen", label: "Geen verborgen kosten", description: "Altijd transparant" },
  { image: "/images/privacy-icoon.png", alt: "Keurmerk privacygarantie, je gegevens zijn veilig", label: "Privacygarantie", description: "Je gegevens zijn veilig" },
];

function formatStatValue(value: number, decimal?: boolean) {
  return decimal ? value.toFixed(1) : value.toLocaleString("nl-NL");
}

function useCountUp(target: number, isVisible: boolean, decimal = false) {
  const [count, setCount] = useState<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    // Start the count-up from 0
    setCount(0);
    const duration = 2000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (decimal) {
        setCount(Math.round(eased * target * 10) / 10);
      } else {
        setCount(Math.floor(eased * target));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target, decimal]);

  // count is null before hydration/animation → show the real value in HTML
  return count !== null
    ? (decimal ? count.toFixed(1) : count.toLocaleString("nl-NL"))
    : formatStatValue(target, decimal);
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white" ref={ref}>
      <Container>
        {/* Stats — each in a subtle card */}
        <ScrollReveal preset="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className={i === stats.length - 1 ? "col-span-2 md:col-span-1 max-w-[200px] mx-auto md:max-w-none" : undefined}>
                <StatItem stat={stat} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Trust strip */}
        <ScrollReveal preset="fade-up" delay={0.2}>
        <div className="mt-12 rounded-2xl bg-page border border-gray-200/60 px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={96}
                  height={96}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0 drop-shadow-sm"
                  sizes="40px"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-caption sm:text-body-sm text-dark">{item.label}</div>
                  <div className="text-caption text-gray-600 hidden sm:block">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function StatItem({
  stat,
  isVisible,
}: {
  stat: (typeof stats)[number];
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, isVisible, stat.decimal);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm">
      <Image
        src={stat.image}
        alt={stat.alt}
        width={160}
        height={160}
        className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow"
        sizes="80px"
      />
      <div className="text-2xl md:text-[1.75rem] font-extrabold text-primary font-heading tabular-nums tracking-tight leading-none">
        {stat.prefix || ""}{count}{stat.suffix}
      </div>
      <div className="text-body-sm text-gray-600 mt-2 leading-snug">{stat.label}</div>
    </div>
  );
}
