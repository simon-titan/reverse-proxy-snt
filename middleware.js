import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Alle Nutzer werden zur Webflow-Seite weitergeleitet, außer sie sind bereits auf der Webflow-Seite
  if (pathname === '/') {
    return NextResponse.redirect("https://snt-starter.webflow.io");
  }

  // Geschützte Seiten prüfen
  const protectedRoutes = ["/dashboard", "/profile"];
  if (protectedRoutes.includes(pathname)) {
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
    const authData = await authResponse.json();

    // Wenn der Nutzer nicht eingeloggt ist, zur Login-Seite weiterleiten
    if (!authResponse.ok || !authData.items) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Middleware greift nur für spezifische Routen
export const config = {
  matcher: ["/", "/dashboard", "/profile"], // Startseite und geschützte Seiten
};
