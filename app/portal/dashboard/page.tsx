import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  woningtypeSelecties,
  aanbiederSubscriptions,
  aanbiedersOccasions,
  leads,
  aanbieders,
  certificaten,
} from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import Link from "next/link";

export default async function PortalDashboard() {
  const user = await requireAuth();

  let woningtypeCount = 0;
  let occasionCount = 0;
  let leadCount = 0;
  let hasSubscription = false;

  // Profiel-volledigheid checken bij pending status
  let profielData: typeof aanbieders.$inferSelect | null = null;
  let certCount = 0;

  if (user.aanbieder) {
    const id = user.aanbieder.id;

    try {
      if (user.aanbieder.status === "pending" || user.aanbieder.status === "rejected") {
        const [profielRows, certRows] = await Promise.all([
          db.select().from(aanbieders).where(eq(aanbieders.id, id)).limit(1),
          db.select({ count: sql<number>`count(*)` })
            .from(certificaten)
            .where(eq(certificaten.aanbiederId, id)),
        ]);
        profielData = profielRows[0] || null;
        certCount = certRows[0]?.count || 0;
      }

      if (user.aanbieder.status === "approved") {
        const [selecties, occasions, leadsResult, sub] = await Promise.all([
          db.select({ count: sql<number>`count(*)` })
            .from(woningtypeSelecties)
            .where(eq(woningtypeSelecties.aanbiederId, id)),
          db.select({ count: sql<number>`count(*)` })
            .from(aanbiedersOccasions)
            .where(and(eq(aanbiedersOccasions.aanbiederId, id), eq(aanbiedersOccasions.status, "active"))),
          db.select({ count: sql<number>`count(*)` })
            .from(leads)
            .where(eq(leads.aanbiederId, id)),
          db.select()
            .from(aanbiederSubscriptions)
            .where(and(eq(aanbiederSubscriptions.aanbiederId, id), eq(aanbiederSubscriptions.status, "active")))
            .limit(1),
        ]);

        woningtypeCount = selecties[0]?.count || 0;
        occasionCount = occasions[0]?.count || 0;
        leadCount = leadsResult[0]?.count || 0;
        hasSubscription = sub.length > 0;
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    }
  }

  // Checklist items bepalen
  const checklistItems = profielData
    ? [
        {
          label: "Bedrijfsnaam",
          done: !!profielData.bedrijfsnaam,
          href: "/portal/profiel",
        },
        {
          label: "Vestigingsplaats & provincie",
          done: !!profielData.vestigingsplaats && !!profielData.provincie,
          href: "/portal/profiel",
        },
        {
          label: "Beschrijving van je bedrijf",
          done: !!profielData.beschrijving && profielData.beschrijving.length >= 20,
          href: "/portal/profiel",
        },
        {
          label: "Telefoonnummer",
          done: !!profielData.telefoon,
          href: "/portal/profiel",
        },
        {
          label: "Zakelijk e-mailadres",
          done: !!profielData.contactEmail,
          href: "/portal/profiel",
        },
        {
          label: "Logo uploaden",
          done: !!profielData.logoUrl,
          href: "/portal/profiel",
        },
        {
          label: "Werkgebied selecteren",
          done: !!profielData.werkgebied && JSON.parse(profielData.werkgebied || "[]").length > 0,
          href: "/portal/profiel",
        },
        {
          label: "Minimaal 1 certificaat toevoegen",
          done: certCount > 0,
          href: "/portal/certificaten",
        },
      ]
    : [];

  const completedCount = checklistItems.filter((item) => item.done).length;
  const totalCount = checklistItems.length;
  const allComplete = completedCount === totalCount;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-2">
        Dashboard
      </h1>
      <p className="text-muted mb-8">
        Welkom terug, {user.aanbieder?.bedrijfsnaam ?? user.email}
      </p>

      {user.aanbieder?.status === "pending" && (
        <div className="space-y-6 mb-6">
          {/* Status banner */}
          <div className={`rounded-xl p-6 border ${
            allComplete
              ? "bg-green-50 border-green-200"
              : "bg-amber-50 border-amber-200"
          }`}>
            <h2 className={`font-heading text-lg font-semibold mb-1 ${
              allComplete ? "text-green-800" : "text-amber-800"
            }`}>
              {allComplete
                ? "Profiel compleet, in afwachting van goedkeuring"
                : "Vul je profiel aan voor goedkeuring"}
            </h2>
            <p className={`text-sm ${allComplete ? "text-green-700" : "text-amber-700"}`}>
              {allComplete
                ? "Je profiel is volledig ingevuld en wordt beoordeeld door ons team. Je ontvangt een e-mail zodra je profiel is goedgekeurd."
                : "Voordat wij je profiel kunnen beoordelen, vragen wij je de onderstaande gegevens aan te vullen. Een volledig profiel wordt sneller goedgekeurd."}
            </p>
          </div>

          {/* Checklist */}
          {!allComplete && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-semibold text-dark">
                  Profiel voltooien
                </h3>
                <span className="text-xs font-medium text-muted bg-gray-100 px-2.5 py-1 rounded-full">
                  {completedCount} / {totalCount}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full mb-5">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>

              <ul className="space-y-2.5">
                {checklistItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        item.done
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-dark hover:bg-primary-50"
                      }`}
                    >
                      <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                        item.done
                          ? "bg-green-500 text-white"
                          : "border-2 border-gray-300"
                      }`}>
                        {item.done && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm font-medium ${item.done ? "line-through text-green-600" : ""}`}>
                        {item.label}
                      </span>
                      {!item.done && (
                        <span className="ml-auto text-xs text-primary font-medium">
                          Invullen
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {user.aanbieder?.status === "rejected" && (
        <div className="space-y-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="font-heading text-lg font-semibold text-red-800 mb-1">
              Profiel afgewezen
            </h2>
            <p className="text-sm text-red-700">
              Je aanmelding is helaas afgewezen. Controleer en vul je profiel aan en neem contact op voor meer informatie.
            </p>
          </div>

          {/* Toon ook de checklist bij afwijzing */}
          {!allComplete && checklistItems.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-semibold text-dark">
                  Profiel aanvullen
                </h3>
                <span className="text-xs font-medium text-muted bg-gray-100 px-2.5 py-1 rounded-full">
                  {completedCount} / {totalCount}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full mb-5">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>

              <ul className="space-y-2.5">
                {checklistItems.filter((item) => !item.done).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 text-dark hover:bg-primary-50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="ml-auto text-xs text-primary font-medium">Invullen</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!user.aanbieder && (
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mb-6">
          <h2 className="font-heading text-lg font-semibold text-primary mb-1">
            Profiel aanmaken
          </h2>
          <p className="text-sm text-muted mb-4">
            Maak eerst je bedrijfsprofiel aan om aan de slag te gaan.
          </p>
          <a
            href="/portal/profiel"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Profiel aanmaken
          </a>
        </div>
      )}

      {user.aanbieder?.status === "approved" && !hasSubscription && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h2 className="font-heading text-lg font-semibold text-amber-800 mb-1">
            Abonnement activeren
          </h2>
          <p className="text-sm text-amber-700 mb-4">
            Activeer je abonnement om zichtbaar te worden op het platform en leads te ontvangen.
          </p>
          <a
            href="/portal/abonnement"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Abonnement activeren
          </a>
        </div>
      )}

      {user.aanbieder?.status === "approved" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Woningtypen"
            value={String(woningtypeCount)}
            label="geselecteerde woningtypen"
            href="/portal/subscriptions"
          />
          <DashboardCard
            title="Occasions"
            value={String(occasionCount)}
            label="actieve advertenties"
            href="/portal/occasions"
          />
          <DashboardCard
            title="Leads"
            value={String(leadCount)}
            label="ontvangen offerteaanvragen"
            href="/portal/dashboard"
          />
        </div>
      )}
    </div>
  );
}

function DashboardCard({
  title,
  value,
  label,
  href,
}: {
  title: string;
  value: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-card transition-shadow"
    >
      <h3 className="text-sm font-medium text-muted mb-1">{title}</h3>
      <p className="font-heading text-3xl font-bold text-dark">{value}</p>
      <p className="text-xs text-subtle mt-1">{label}</p>
    </a>
  );
}
