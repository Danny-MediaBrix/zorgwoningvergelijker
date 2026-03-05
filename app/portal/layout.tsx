import { requireAuth } from "@/lib/auth";
import PortalSidebar from "@/components/portal/PortalSidebar";

export const metadata = {
  title: "Aanbieder Portal",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-page flex">
      <PortalSidebar user={user} />
      <main id="main" className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
