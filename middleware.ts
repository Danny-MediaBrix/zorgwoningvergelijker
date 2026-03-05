import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session_token")?.value;

  // Beschermde routes: portal en admin
  const isPortalRoute = pathname.startsWith("/portal");
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedApi =
    pathname.startsWith("/api/portal") || pathname.startsWith("/api/admin");

  if ((isPortalRoute || isAdminRoute) && !sessionToken) {
    const loginUrl = new URL("/inloggen", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedApi && !sessionToken) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  // Voorkom dat ingelogde gebruikers auth pagina's bezoeken
  const isAuthPage =
    pathname === "/inloggen" ||
    pathname === "/registreren" ||
    pathname === "/wachtwoord-vergeten" ||
    pathname === "/wachtwoord-reset";

  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/portal/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/portal/:path*",
    "/admin/:path*",
    "/api/portal/:path*",
    "/api/admin/:path*",
    "/inloggen",
    "/registreren",
    "/wachtwoord-vergeten",
    "/wachtwoord-reset",
  ],
};
