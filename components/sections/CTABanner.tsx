import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#2D1B4E] py-20 md:py-28">
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal preset="fade-blur" delay={0.1}>
            <div className="text-center lg:text-left">
              <p className="text-[0.7rem] text-primary-200/70 mb-4 font-bold uppercase tracking-[0.15em]">
                Gratis en vrijblijvend
              </p>
              <h2 className="text-display text-white font-heading font-bold mb-6 tracking-tight">
                Klaar om offertes te ontvangen?
              </h2>
              <p className="text-body-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                Het is 100% gratis, volledig vrijblijvend en duurt maar 5 minuten.
                Ontvang binnen 48 uur een offerte op maat.
              </p>
              <Button as="link" href="/configurator" variant="accent" size="lg" iconRight={<CTAArrow />}>
                Ontvang gratis offertes
              </Button>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-8 text-body-sm text-white/70">
                {["100% gratis", "Vrijblijvend", "Binnen 48 uur reactie"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-200" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal preset="slide-right" delay={0.25}>
            <div className="flex justify-center items-end self-end pointer-events-none -mb-20 md:-mb-28">
              <Image
                src="/images/wim-ontvang-offerte.png"
                alt="Wim helpt je bij het ontvangen van gratis offertes voor modulaire woningen"
                width={600}
                height={720}
                className="w-48 md:w-64 lg:w-full lg:max-w-md object-contain lg:-translate-x-8"
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 400px"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
