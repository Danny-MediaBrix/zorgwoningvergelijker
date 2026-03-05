import { Shield, CheckCircle, Lock, Eye } from "lucide-react";
import Container from "@/components/ui/Container";

const trustItems = [
  { icon: Shield, label: "Onafhankelijk", description: "Wij zijn geen aanbieder" },
  { icon: CheckCircle, label: "Gecertificeerd", description: "Streng geselecteerd" },
  { icon: Lock, label: "Geen verborgen kosten", description: "Altijd transparant" },
  { icon: Eye, label: "Privacygarantie", description: "Je gegevens zijn veilig" },
];

export default function TrustBar() {
  return (
    <section className="py-6 bg-primary-50 border-b border-primary-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-body-sm text-primary-700">{item.label}</div>
                  <div className="text-caption text-primary-500 hidden sm:block">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
