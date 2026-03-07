"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Mail, Phone, Clock, AlertCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Dropdown from "@/components/ui/Dropdown";
import Card from "@/components/ui/Card";

const onderwerpOpties = [
  { value: "algemeen", label: "Algemene vraag" },
  { value: "configurator", label: "Vraag over de configurator" },
  { value: "aanbieder", label: "Vraag over een aanbieder" },
  { value: "samenwerking", label: "Samenwerking" },
  { value: "klacht", label: "Klacht of feedback" },
  { value: "anders", label: "Anders" },
];

interface FormData {
  naam: string;
  email: string;
  telefoon: string;
  onderwerp: string;
  bericht: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    naam: "",
    email: "",
    telefoon: "",
    onderwerp: "",
    bericht: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push("/bedankt?type=contact");
        return;
      } else {
        setError(result.error || "Er is iets misgegaan. Probeer het later opnieuw.");
      }
    } catch {
      setError(
        "Er is een verbindingsfout opgetreden. Controleer je internetverbinding en probeer het opnieuw."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="section-gray border-b border-gray-200">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
        </Container>
      </section>

      <section className="section-white section-padding">
        <Container>
          <div className="text-center mb-14">
            <h1 className="font-semibold text-display tracking-tight text-dark mb-4">
              Contact
            </h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Heb je een vraag, opmerking of wil je samenwerken? Neem contact met ons op via
              onderstaand formulier of gebruik onze contactgegevens.
            </p>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-14 max-w-5xl mx-auto">
            {/* Contact Info - Left Column */}
            <div className="space-y-6">
              <Card variant="default" padding="lg" className="rounded-2xl">
                <h2 className="font-semibold text-heading-3 tracking-tight text-dark mb-6">
                  Contactgegevens
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-gray-600">E-mail</p>
                      <a
                        href="mailto:info@zorgwoningvergelijker.nl"
                        className="text-body-sm text-primary hover:underline"
                      >
                        info@zorgwoningvergelijker.nl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-gray-600">Telefoon</p>
                      <a
                        href="tel:+31850041159"
                        className="text-body-sm text-dark hover:text-primary transition-colors duration-200 ease-premium"
                      >
                        085 - 004 11 59
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-gray-600">Adres</p>
                      <p className="text-body-sm text-gray-600">
                        Vanadiumweg 11A<br />
                        3812 PX Amersfoort<br />
                        Nederland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-gray-600">Openingstijden</p>
                      <div className="text-body-sm text-gray-600 space-y-0.5">
                        <p>Maandag - Vrijdag: 09:00 - 17:30</p>
                        <p>Zaterdag: 10:00 - 14:00</p>
                        <p>Zondag: Gesloten</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form - Right Column */}
            <div>
                <Card variant="outlined" padding="lg" className="rounded-2xl">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-body-sm text-red-700">{error}</p>
                      </div>
                    )}

                    <FormInput
                      label="Naam"
                      name="naam"
                      placeholder="Je volledige naam"
                      required
                      value={formData.naam}
                      onChange={handleChange}
                    />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormInput
                        label="E-mailadres"
                        name="email"
                        type="email"
                        placeholder="uw@email.nl"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Telefoonnummer"
                        name="telefoon"
                        type="tel"
                        placeholder="06-12345678"
                        required
                        value={formData.telefoon}
                        onChange={handleChange}
                      />
                    </div>

                    <Dropdown
                      label="Onderwerp"
                      name="onderwerp"
                      options={onderwerpOpties}
                      placeholder="Selecteer een onderwerp"
                      required
                      value={formData.onderwerp}
                      onChange={handleChange}
                    />

                    <FormTextarea
                      label="Bericht"
                      name="bericht"
                      placeholder="Typ hier je bericht..."
                      required
                      rows={6}
                      value={formData.bericht}
                      onChange={handleChange}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      loading={loading}
                    >
                      Bericht verzenden
                    </Button>

                    <p className="text-caption text-gray-600 text-center">
                      Wij verwerken je gegevens conform onze privacyverklaring.
                    </p>
                  </form>
                </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
