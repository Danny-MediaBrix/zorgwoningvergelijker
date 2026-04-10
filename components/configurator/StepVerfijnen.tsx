"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Hammer,
  Flame,
  Paintbrush,
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { getWoningType } from "@/lib/woningtypen";
import { formatPrice } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const verfijnStappen = [
  {
    icon: LayoutGrid,
    label: "Plattegrond",
    description: "Kamers indelen en positioneren",
  },
  {
    icon: Hammer,
    label: "Exterieur",
    description: "Dak, gevel en fundering kiezen",
  },
  {
    icon: Flame,
    label: "Installaties",
    description: "Verwarming, isolatie en meer",
  },
  {
    icon: Paintbrush,
    label: "Interieur",
    description: "Keuken- en badkamerniveau",
  },
];

export default function StepVerfijnen() {
  const router = useRouter();
  const store = useConfiguratorStore();
  const woningType = store.woningType;
  const totaalM2 = store.totaalM2;
  const prijsRange = store.getPrijsRange();

  const wt = woningType ? getWoningType(woningType) : null;

  const handleVerfijnen = () => {
    store.nextStep(); // Go to step 3 (Plattegrond)
  };

  const handleKlaar = () => {
    router.push("/bedankt?type=offerte");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-heading text-heading-1 text-dark mb-2 tracking-tight"
        >
          Je aanvraag is verzonden!
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-body-lg text-gray-600"
        >
          Een specialist neemt binnen 48 uur contact met je op
        </motion.p>
      </div>

      {/* Summary card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card padding="md" className="mb-8">
          <div className="flex items-center gap-4">
            {wt && (
              <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Image
                  src={`/images/${woningType === "kangoeroewoning" ? "kangaroe-woning" : woningType}.jpg`}
                  alt={wt.naam}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-body font-semibold text-dark">
                {wt?.naam || "Woning"}
              </p>
              <p className="text-body-sm text-gray-600">
                {totaalM2} m² · {store.aantalVerdiepingen}{" "}
                {store.aantalVerdiepingen === 1 ? "verdieping" : "verdiepingen"}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-caption text-gray-600">Prijsindicatie</p>
              <p className="font-heading text-body font-bold text-primary">
                {formatPrice(prijsRange.laag)} – {formatPrice(prijsRange.hoog)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Upsell card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card padding="lg" className="mb-6 border-2 border-primary/15 bg-primary-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-heading-3 text-dark">
                Wil je een nauwkeurigere offerte?
              </h2>
              <p className="text-body-sm text-gray-600">
                Hoe meer details, hoe beter de offerte aansluit bij je wensen
              </p>
            </div>
          </div>

          {/* Refinement steps grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {verfijnStappen.map((stap) => (
              <div
                key={stap.label}
                className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-gray-100"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <stap.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-body-sm font-semibold text-dark">
                    {stap.label}
                  </p>
                  <p className="text-caption text-gray-600">
                    {stap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleVerfijnen}
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            Ja, ik wil mijn offerte verfijnen
          </Button>

          <p className="text-caption text-gray-600 text-center mt-3">
            Duurt nog 3-5 minuten · Alle stappen zijn optioneel
          </p>
        </Card>
      </motion.div>

      {/* Skip option */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-center"
      >
        <button
          type="button"
          onClick={handleKlaar}
          className="text-body-sm text-gray-600 hover:text-primary transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-primary"
        >
          Nee bedankt, mijn aanvraag is compleet
        </button>
      </motion.div>
    </div>
  );
}
