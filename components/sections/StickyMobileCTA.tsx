"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/configurator")) return null;
  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3.5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-body-sm text-dark truncate">
            Ontvang gratis offertes
          </div>
          <div className="text-caption text-gray-600">Gratis & vrijblijvend</div>
        </div>
        <Button as="link" href="/configurator" variant="accent" size="sm" iconRight={<CTAArrow size="sm" />} className="flex-shrink-0">
          Start
        </Button>
      </div>
    </div>
  );
}
