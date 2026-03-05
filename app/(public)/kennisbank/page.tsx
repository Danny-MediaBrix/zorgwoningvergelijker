import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import { auteurWim } from "@/lib/auteur";
import { artikelenMeta } from "@/lib/artikelen";
import { formatDatum } from "@/lib/utils";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Kennisbank Modulaire Woningen | Gidsen & Tips",
  description:
    "Praktische artikelen over kosten, vergunningen, subsidies & woningtypen ✓ Door experts geschreven ➜ Maak een slimme keuze!",
  alternates: {
    canonical: "https://zorgwoningvergelijker.nl/kennisbank",
  },
};

export default function KennisbankPage() {
  return (
    <>
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Kennisbank" },
            ]}
          />
        </Container>
      </section>

      <section className="section-white section-padding">
        <Container>
          <div className="text-center mb-14">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
              Kennisbank
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Praktische artikelen en gidsen over modulaire woningen, vergunningen, kosten en meer.
              Alles wat je moet weten om een weloverwogen keuze te maken.
            </p>

            {/* Author intro */}
            <Link href={auteurWim.slug} className="inline-flex items-center justify-center gap-3 mt-6 hover:opacity-80 transition-opacity duration-200">
              <Image
                src={auteurWim.afbeelding}
                alt={auteurWim.volleNaam}
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <p className="text-body-sm text-gray-600">
                Alle artikelen door <strong className="text-dark">{auteurWim.naam}</strong>, onze {auteurWim.rol}
              </p>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artikelenMeta.map((artikel) => (
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
                    <div className="w-full aspect-[16/9] bg-primary-50 flex items-center justify-center">
                      <span className="text-primary/20 font-heading font-bold text-2xl">{artikel.categorie}</span>
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
                    <h2 className="font-semibold text-heading-3 tracking-tight text-dark mb-2 group-hover:text-primary transition-colors duration-200 ease-premium">
                      {artikel.titel}
                    </h2>
                    <p className="text-body-sm text-gray-600 leading-relaxed mb-4">
                      {artikel.beschrijving}
                    </p>

                    {/* Author + date */}
                    <div className="flex items-center gap-2 text-caption text-gray-600 mb-4">
                      <Image
                        src={auteurWim.afbeelding}
                        alt={auteurWim.naam}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{auteurWim.naam}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{formatDatum(artikel.gepubliceerd)}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-body-sm group-hover:underline">
                      Lees verder
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
