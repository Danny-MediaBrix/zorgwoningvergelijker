import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { faqCategorieen } from "@/lib/faq";

interface FAQSectionProps {
  maxItems?: number;
  showLink?: boolean;
}

export default function FAQSection({ maxItems = 6, showLink = true }: FAQSectionProps) {
  const items = faqCategorieen
    .flatMap((cat) => cat.items)
    .slice(0, maxItems)
    .map((item, i) => ({
      id: `faq-${i}`,
      title: item.vraag,
      content: item.antwoord,
    }));

  return (
    <section className="section-padding section-warm wave-from-white wave-to-gray relative overflow-hidden">
      {/* Wim — decoratief op de achtergrond linksonder */}
      <div className="hidden lg:block absolute left-4 xl:left-12 bottom-0 w-[240px] xl:w-[280px] pointer-events-none select-none">
        <Image
          src="/images/veelgestelde-vragen-wim.png"
          alt="Wim beantwoordt veelgestelde vragen over modulaire woningen"
          width={440}
          height={528}
          className="w-full object-contain"
          sizes="220px"
        />
      </div>
      <Container className="max-w-3xl relative z-10">
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <h2 className="section-title">Veelgestelde vragen</h2>
            <p className="section-subtitle">Antwoorden op de meest voorkomende vragen</p>
          </div>
        </ScrollReveal>

        <ScrollReveal preset="fade-up" delay={0.1}>
          <Accordion items={items} />
        </ScrollReveal>

        {showLink && (
          <ScrollReveal preset="fade-up" delay={0.2}>
          <div className="text-center mt-10 space-y-3">
            <Link
              href="/veelgestelde-vragen"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Meer vragen? Bekijk onze FAQ pagina <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-body-sm text-gray-600 hover:text-primary transition-colors"
              >
                Nog geen antwoord gevonden? Stel je vraag <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
