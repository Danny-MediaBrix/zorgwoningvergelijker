import Image from "next/image";
import Container from "@/components/ui/Container";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    image: "/images/wim-configureert.jpg",
    alt: "Stap 1: configureer je modulaire woning online met de interactieve woningconfigurator",
    title: "Configureer",
    description: "Stel je woning samen met onze interactieve tool. Kies type, grootte, indeling en afwerking.",
  },
  {
    image: "/images/wim-vergelijkt.jpg",
    alt: "Stap 2: wij zoeken passende aanbieders voor je modulaire woning",
    title: "Wij zoeken aanbieders",
    description: "Op basis van je wensen zoeken wij betrouwbare aanbieders die bij je situatie passen.",
  },
  {
    image: "/images/wim-ontvangt-offerte.jpg",
    alt: "Stap 3: ontvang gratis en vrijblijvend offertes voor je modulaire woning",
    title: "Ontvang offerte",
    description: "Binnen 48 uur een vrijblijvende offerte in je inbox. Bekijk en kies de beste optie.",
  },
];

export default function StepsSection() {
  return (
    <section className="section-padding section-warm wave-from-white wave-to-gray">
      <Container>
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <h2 className="section-title">In 3 stappen naar je ideale woning</h2>
            <p className="section-subtitle">Eenvoudig, snel en vrijblijvend</p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto relative">
          {/* Connecting line — dashed, elegant */}
          <div className="hidden md:block absolute top-[108px] left-[calc(16.667%+24px)] right-[calc(16.667%+24px)] z-0">
            <svg className="w-full h-[2px]" preserveAspectRatio="none">
              <line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="currentColor"
                className="text-primary/20"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <ScrollReveal key={i} preset="fade-scale" delay={i * 0.12}>
                <div className="text-center relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mx-auto mb-4 font-heading font-bold text-lg shadow-lg shadow-primary/25 ring-[3px] ring-white">
                    {i + 1}
                  </div>
                  <div className="mb-6 flex justify-center">
                    <div className="w-52 h-44 rounded-2xl overflow-hidden shadow-card ring-1 ring-black/[0.04]">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        width={832}
                        height={704}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-heading-3 font-bold text-dark mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-body-sm text-gray-600 leading-relaxed max-w-[280px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="text-center mt-14">
            <Button as="link" href="/configurator" variant="primary" size="lg" iconRight={<CTAArrow />}>
              Start je configuratie
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
