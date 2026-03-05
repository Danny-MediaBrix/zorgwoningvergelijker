import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAdmin();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark mb-2">
        Admin Dashboard
      </h1>
      <p className="text-muted mb-8">
        Beheer aanbieders, occasions, betalingen en platform-instellingen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard
          title="Aanbieders"
          description="Bekijk, goedkeur en beheer aanbieders"
          href="/admin/aanbieders"
        />
        <AdminCard
          title="Occasions"
          description="Alle occasions (scraped + aanbieder)"
          href="/admin/occasions"
        />
        <AdminCard
          title="Betalingen"
          description="Betalingsoverzicht en -historie"
          href="/admin/betalingen"
        />
        <AdminCard
          title="Instellingen"
          description="Prijzen en platform-configuratie"
          href="/admin/instellingen"
        />
      </div>
    </div>
  );
}

function AdminCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-card transition-shadow"
    >
      <h3 className="font-heading text-lg font-semibold text-dark mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted">{description}</p>
    </a>
  );
}
