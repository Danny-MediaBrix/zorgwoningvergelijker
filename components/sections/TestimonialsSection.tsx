import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import StarRating from "@/components/ui/StarRating";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { testimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/types";

const woningTypeLabels: Record<string, string> = {
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

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.naam
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const label =
    woningTypeLabels[testimonial.woningType] || testimonial.woningType;

  return (
    <article className="bg-white rounded-2xl shadow-card p-6 md:p-8 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-premium">
      {/* Quote icon */}
      <QuoteMark className="w-9 h-9 text-primary/20 mb-5 flex-shrink-0" />

      {/* Quote */}
      <blockquote className="text-body text-gray-700 leading-[1.75] flex-1 mb-6">
        {testimonial.tekst}
      </blockquote>

      {/* Stars */}
      <StarRating rating={testimonial.beoordeling} size="sm" className="mb-6" />

      {/* Author */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-primary/[0.08] text-primary flex items-center justify-center font-heading font-bold text-body-sm flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-heading font-semibold text-body-sm text-dark">
              {testimonial.naam}
            </div>
            <div className="text-caption text-gray-500 mt-0.5">
              {testimonial.locatie}
              <span className="text-gray-300 mx-1">&middot;</span>
              <span className="text-primary/60 font-medium">{label}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-600/70 flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline leading-none">
              Geverifieerd
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding section-white">
      <Container>
        {/* Warm container panel */}
        <div className="bg-[#FAF7F3] rounded-3xl border border-gray-200/30 px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-16">
          {/* Header */}
          <ScrollReveal preset="fade-blur">
            <div className="text-center mb-12 md:mb-14">
              <p className="text-caption font-bold uppercase tracking-[0.15em] text-primary/60 mb-3">
                Beoordelingen
              </p>
              <h2 className="text-3xl md:text-display font-heading font-bold text-dark mb-4 tracking-tight">
                Wat klanten over ons zeggen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Echte ervaringen van gebruikers die via ons platform hun ideale
                woning vonden
              </p>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <ScrollReveal key={i} preset="fade-up" delay={i * 0.1}>
                <TestimonialCard testimonial={t} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
