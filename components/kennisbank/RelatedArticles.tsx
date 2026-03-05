import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { artikelenMeta, ArtikelMeta } from "@/lib/artikelen";

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategorie: string;
}

function getRelatedArticles(currentSlug: string, currentCategorie: string): ArtikelMeta[] {
  const others = artikelenMeta.filter((a) => a.slug !== currentSlug);

  // Prefer same category
  const sameCategory = others.filter((a) => a.categorie === currentCategorie);
  const differentCategory = others.filter((a) => a.categorie !== currentCategorie);

  const result = [...sameCategory, ...differentCategory];
  return result.slice(0, 2);
}

export default function RelatedArticles({ currentSlug, currentCategorie }: RelatedArticlesProps) {
  const related = getRelatedArticles(currentSlug, currentCategorie);

  if (related.length === 0) return null;

  return (
    <section className="pb-16 md:pb-20">
      <Container>
        <div className="max-w-[42rem] mx-auto">
          <h2 className="font-semibold text-heading-2 tracking-tight text-dark mb-6">
            Lees ook
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((artikel) => (
              <Link key={artikel.slug} href={`/kennisbank/${artikel.slug}`} className="group">
                <div className="card-interactive h-full overflow-hidden">
                  {artikel.featuredImage ? (
                    <Image
                      src={artikel.featuredImage}
                      alt={artikel.featuredImageAlt || artikel.titel}
                      width={600}
                      height={338}
                      className="w-full aspect-[16/9] object-cover"
                    />
                  ) : (
                    <div className="h-28 bg-primary-50 flex items-center justify-center">
                      <span className="text-primary/20 font-heading font-bold text-xl">{artikel.categorie}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={artikel.categorieVariant}>
                        {artikel.categorie}
                      </Badge>
                      <span className="flex items-center gap-1 text-caption text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        {artikel.leestijd} min
                      </span>
                    </div>
                    <h3 className="font-semibold text-heading-3 tracking-tight text-dark mb-2 group-hover:text-primary transition-colors duration-200 ease-premium">
                      {artikel.titel}
                    </h3>
                    <p className="text-body-sm text-gray-600 leading-relaxed mb-4">
                      {artikel.beschrijving}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-body-sm group-hover:underline">
                      Lees verder
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
