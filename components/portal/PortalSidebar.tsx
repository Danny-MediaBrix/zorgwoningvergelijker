"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Award,
  Images,
  Home,
  CreditCard,
  FileText,
  LogOut,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "Profiel", href: "/portal/profiel", icon: User },
  { label: "Certificaten", href: "/portal/certificaten", icon: Award },
  { label: "Portfolio", href: "/portal/portfolio", icon: Images },
  { label: "Woningtypen", href: "/portal/subscriptions", icon: Home },
  { label: "Abonnement", href: "/portal/abonnement", icon: Crown },
  { label: "Occasions", href: "/portal/occasions", icon: FileText },
  { label: "Betalingen", href: "/portal/betalingen", icon: CreditCard },
];

export default function PortalSidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="block">
          <Image
            src="/images/zorgwoningvergelijker-logo.svg"
            alt="Zorgwoningvergelijker.nl"
            width={140}
            height={88}
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* Bedrijfsnaam */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-sm font-semibold text-dark truncate">
          {user.aanbieder?.bedrijfsnaam ?? user.email}
        </p>
        <p className="text-xs text-muted mt-0.5">Aanbieder Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary"
                  : "text-gray-600 hover:text-dark hover:bg-gray-50"
              )}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Uitloggen */}
      <div className="p-3 border-t border-gray-100">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-accent hover:bg-accent-50 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            Uitloggen
          </button>
        </form>
      </div>
    </aside>
  );
}
