import Link from "next/link";
import { ArrowRight, Star, MapPin, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aanbieders } from "@/lib/aanbieders";

export default function AanbiedersLogos() {
  return (
    <section className="section-padding section-white">
      <Container>
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <p className="text-caption font-bold uppercase tracking-[0.15em] text-primary/60 mb-3">
              Vertrouwde partners
            </p>
            <h2 className="section-title">Aanbieders op ons platform</h2>
            <p className="section-subtitle">
              Vergelijk gecertificeerde bouwers en ontvang vrijblijvend offertes
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aanbieders.slice(0, 8).map((a, i) => {
            const initials = a.naam
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2);

            return (
              <ScrollReveal key={a.slug} preset="fade-scale" delay={i * 0.07}>
                <Link
                  href={`/aanbieders/${a.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-premium overflow-hidden h-full"
                >
                  <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/30" />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center font-heading font-bold text-primary text-body flex-shrink-0 ring-1 ring-primary/10">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-heading font-semibold text-body text-dark group-hover:text-primary transition-colors duration-200 truncate">
                          {a.naam}
                        </div>
                        <div className="flex items-center gap-1 text-caption text-gray-600 mt-0.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {a.vestigingsplaats}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100/60">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-caption font-heading font-bold text-dark tabular-nums">
                          {a.beoordeling.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-caption text-gray-500">
                        {a.aantalReviews} reviews
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-auto text-caption text-gray-600">
                      <Shield className="w-3 h-3 text-primary/50 flex-shrink-0" />
                      <span className="truncate">
                        {a.specialisaties.length} specialisatie{a.specialisaties.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal preset="fade-up" delay={0.7}>
          <div className="text-center mt-12">
            <Link
              href="/aanbieders"
              className="group inline-flex items-center gap-2.5 bg-primary-50/60 text-primary font-semibold text-body-sm px-6 py-3 rounded-xl border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300 ease-premium"
            >
              Bekijk alle {aanbieders.length} aanbieders
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
