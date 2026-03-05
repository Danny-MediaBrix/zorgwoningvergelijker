import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CTAArrow from "@/components/ui/CTAArrow";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pagina Niet Gevonden",
  description:
    "De pagina die je zoekt bestaat niet of is verplaatst. Bekijk onze woningtypen of gebruik de configurator ➜ Ga verder!",
};

const suggesties = [
  {
    label: "Homepage",
    href: "/",
    icon: <Home className="w-5 h-5" />,
    beschrijving: "Terug naar de startpagina",
  },
  {
    label: "Woningtypen",
    href: "/#woningtypen",
    icon: <Search className="w-5 h-5" />,
    beschrijving: "Bekijk alle 14 woningtypen",
  },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="section-white py-20 md:py-32">
          <Container>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
              {/* Wim illustration */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/wim-zwv.png"
                  alt="Wim, de Woning Inspecteur Meester, kan de pagina helaas niet vinden"
                  width={280}
                  height={350}
                  className="w-48 md:w-64 h-auto drop-shadow-lg"
                  priority
                />
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <p className="text-[0.7rem] text-primary font-bold uppercase tracking-[0.15em] mb-3">
                  Pagina niet gevonden
                </p>
                <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
                  Oeps, hier staat geen woning!
                </h1>
                <p className="text-body-lg text-gray-600 leading-relaxed mb-8 max-w-md">
                  De pagina die je zoekt bestaat niet of is verplaatst.
                  Geen zorgen, Wim helpt je graag verder.
                </p>

                {/* Suggesties */}
                <div className="space-y-3 mb-8">
                  {suggesties.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200/80 bg-white hover:border-primary/25 hover:shadow-card transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-body font-semibold text-dark">
                          {item.label}
                        </p>
                        <p className="text-body-sm text-gray-600">
                          {item.beschrijving}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>

                <Button
                  as="link"
                  href="/configurator"
                  variant="primary"
                  size="lg"
                  iconRight={<CTAArrow />}
                >
                  Start de configurator
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
