import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import CTAArrow from "@/components/ui/CTAArrow";
import Button from "@/components/ui/Button";

const woningtypenLinks = [
  { name: "Tiny House", slug: "tiny-house" },
  { name: "Mantelzorgwoning", slug: "mantelzorgwoning" },
  { name: "Prefab-woning", slug: "prefab-woning" },
  { name: "Chalet", slug: "chalet" },
  { name: "Flexwoning", slug: "flexwoning" },
  { name: "Micro-woning", slug: "micro-woning" },
  { name: "Systeemwoning", slug: "systeemwoning" },
  { name: "Containerwoning", slug: "containerwoning" },
];

const informatieLinks = [
  { label: "Hoe werkt het?", href: "/hoe-werkt-het" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Occasions", href: "/occasions" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
  { label: "Aanbieder worden", href: "/aanbieder-worden" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Main footer — warm light background */}
      <div className="bg-[#F8F6F3] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Logo + description + CTA */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center mb-5 group">
                <Image
                  src="/images/zorgwoningvergelijker-logo.svg"
                  alt="Zorgwoningvergelijker.nl logo - onafhankelijk vergelijkingsplatform voor modulaire woningen"
                  width={160}
                  height={100}
                  className="h-[4.5rem] w-auto group-hover:opacity-80 transition-opacity"
                />
              </Link>
              <p className="text-body-sm text-gray-600 leading-relaxed mb-7 max-w-sm">
                Het onafhankelijke vergelijkingsplatform voor modulaire en
                zorgwoningen in Nederland. Vergelijk, configureer en ontvang
                gratis offertes.
              </p>

              {/* Mini CTA */}
              <Button as="link" href="/configurator" variant="primary" size="sm" iconRight={<CTAArrow size="sm" />} className="mb-8">
                Start configurator
              </Button>

              {/* Social */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/wim-de-inspecteur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-white border border-gray-200/80 flex items-center justify-center hover:border-primary/25 hover:text-primary text-gray-500 transition-all duration-200 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:info@zorgwoningvergelijker.nl"
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-white border border-gray-200/80 flex items-center justify-center hover:border-primary/25 hover:text-primary text-gray-500 transition-all duration-200 shadow-sm"
                  aria-label="E-mail"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Woningtypen */}
            <div className="lg:col-span-3">
              <h3 className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-[0.1em] mb-5">
                Woningtypen
              </h3>
              <ul className="space-y-2.5">
                {woningtypenLinks.map((type) => (
                  <li key={type.slug}>
                    <Link
                      href={`/${type.slug}`}
                      className="text-body-sm text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {type.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Informatie */}
            <div className="lg:col-span-2">
              <h3 className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-[0.1em] mb-5">
                Informatie
              </h3>
              <ul className="space-y-2.5">
                {informatieLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="lg:col-span-3">
              <h3 className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-[0.1em] mb-5">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-body-sm text-gray-600 leading-relaxed">
                    Vanadiumweg 11A<br />3812 PX Amersfoort
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:info@zorgwoningvergelijker.nl"
                    className="flex items-center gap-3 text-body-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                    </div>
                    info@zorgwoningvergelijker.nl
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+31850041159"
                    className="flex items-center gap-3 text-body-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                    </div>
                    085 - 004 11 59
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — slightly darker */}
      <div className="bg-[#F0EDE8] border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-caption text-gray-500">
              &copy; 2026 Zorgwoningvergelijker.nl | KvK 81313179 | BTW NL003555851B42
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacybeleid"
                className="text-caption text-gray-500 hover:text-primary transition-colors duration-200"
              >
                Privacybeleid
              </Link>
              <Link
                href="/cookiebeleid"
                className="text-caption text-gray-500 hover:text-primary transition-colors duration-200"
              >
                Cookiebeleid
              </Link>
              <Link
                href="/algemene-voorwaarden"
                className="text-caption text-gray-500 hover:text-primary transition-colors duration-200"
              >
                Algemene voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
