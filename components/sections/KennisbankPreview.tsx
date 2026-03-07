import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { artikelenMeta } from "@/lib/artikelen";

const previewSlugs = [
  "hoeveel-kost-een-tiny-house",
  "subsidie-mantelzorgwoning",
  "mantelzorgwoning-vergunningsvrij",
];

const previewArtikelen = previewSlugs
  .map((slug) => artikelenMeta.find((a) => a.slug === slug))
  .filter(Boolean);

export default function KennisbankPreview() {
  return (
    <section className="section-padding section-gray wave-to-dark">
      <Container>
        <ScrollReveal preset="fade-blur">
          <div className="section-header">
            <h2 className="section-title">Alles wat je moet weten over zorgwoningen</h2>
            <p className="section-subtitle">Handige artikelen en gidsen</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {previewArtikelen.map((artikel, i) => (
            <ScrollReveal key={artikel!.slug} preset="fade-scale" delay={i * 0.1}>
              <Link
                href={`/kennisbank/${artikel!.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200/80 hover:shadow-card-hover hover:border-primary/15 hover:-translate-y-0.5 overflow-hidden transition-all duration-300 ease-premium h-full"
              >
                {artikel!.featuredImage ? (
                  <Image
                    src={artikel!.featuredImage}
                    alt={artikel!.featuredImageAlt || artikel!.titel}
                    width={600}
                    height={338}
                    className="w-full aspect-[16/9] object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-36 bg-primary-50 flex items-center justify-center">
                    <span className="text-primary/20 font-heading font-bold text-2xl">{artikel!.categorie}</span>
                  </div>
                )}
                <div className="p-6">
                  <Badge variant={artikel!.categorieVariant} className="mb-3">{artikel!.categorie}</Badge>
                  <h3 className="font-semibold text-body text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {artikel!.titel}
                  </h3>
                  <p className="text-body-sm text-gray-600 line-clamp-2 mb-4">
                    {artikel!.beschrijving}
                  </p>
                  <div className="flex items-center gap-1.5 text-caption text-gray-600">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{artikel!.leestijd} min leestijd</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal preset="fade-up" delay={0.4}>
          <div className="text-center mt-12">
            <Button
              as="a"
              href="/kennisbank"
              variant="secondary"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Naar de kennisbank
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
