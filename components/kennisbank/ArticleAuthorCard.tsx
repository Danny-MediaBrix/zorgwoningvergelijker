import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { auteurWim } from "@/lib/auteur";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ArticleAuthorCard() {
  return (
    <div className="bg-page border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href={auteurWim.slug}>
          <Image
            src={auteurWim.afbeelding}
            alt={auteurWim.volleNaam}
            width={64}
            height={64}
            className="w-16 h-16 rounded-xl object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-body-sm text-gray-600">Geschreven door</p>
          <Link href={auteurWim.slug} className="hover:text-primary transition-colors duration-200">
            <p className="font-heading font-semibold text-heading-3 text-dark">
              {auteurWim.volleNaam}
            </p>
          </Link>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-body-sm text-gray-600">{auteurWim.rol}</p>
            <a
              href={auteurWim.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#0A66C2]/[0.08] hover:bg-[#0A66C2]/[0.14] text-[#0A66C2] px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors duration-200"
              aria-label="LinkedIn profiel van Wim"
            >
              <LinkedInIcon className="w-3 h-3" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <p className="text-body-sm text-gray-600 leading-relaxed mb-4">
        {auteurWim.bio}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {auteurWim.expertise.map((item) => (
          <Badge key={item} variant="gray">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
