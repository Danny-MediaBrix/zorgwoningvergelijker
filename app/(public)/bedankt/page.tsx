import { Metadata } from "next";
import { CheckCircle, ArrowRight, Mail, Phone, Home } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedankt - Zorgwoningvergelijker.nl",
  robots: { index: false, follow: false },
};

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const isOfferte = type === "offerte";

  return (
    <section className="section-white section-padding">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Check icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          {isOfferte ? (
            <>
              <h1 className="font-heading text-display tracking-tight text-dark mb-4">
                Bedankt voor je aanvraag!
              </h1>
              <p className="text-body-lg text-gray-600 mb-10">
                Je offerte-aanvraag is succesvol ontvangen. We gaan er direct mee aan de slag.
              </p>

              {/* Steps */}
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-section-gray rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-body-sm font-semibold text-dark mb-1">Stap 1</p>
                  <p className="text-body-sm text-gray-600">
                    Bevestigingsmail is onderweg naar je inbox
                  </p>
                </div>
                <div className="bg-section-gray rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-body-sm font-semibold text-dark mb-1">Stap 2</p>
                  <p className="text-body-sm text-gray-600">
                    Een specialist neemt binnen 48 uur contact op
                  </p>
                </div>
                <div className="bg-section-gray rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-body-sm font-semibold text-dark mb-1">Stap 3</p>
                  <p className="text-body-sm text-gray-600">
                    Je ontvangt offertes op maat van aanbieders
                  </p>
                </div>
              </div>

              {/* CTA's */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/woningtypen">
                  <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                    Bekijk woningtypen
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="secondary" size="lg">
                    Terug naar home
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-heading text-display tracking-tight text-dark mb-4">
                Bedankt voor je bericht!
              </h1>
              <p className="text-body-lg text-gray-600 mb-6">
                Je bericht is in goede orde ontvangen. We streven ernaar om binnen
                <strong> 1 werkdag</strong> te reageren.
              </p>
              <p className="text-body text-gray-600 mb-10">
                Een bevestiging is verstuurd naar je e-mailadres.
              </p>

              {/* CTA */}
              <Link href="/">
                <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                  Terug naar home
                </Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
