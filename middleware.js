import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Diese Route soll den Benutzer direkt zu Webflow weiterleiten (Anzeige der Webflow-Seite)
  if (pathname === '/') {
    // Hier wird die Webflow-Seite durch den Proxy geladen
    return NextResponse.rewrite("https://snt-starter.webflow.io");
  }

  // Geschützte Seiten prüfen (nur für eingeloggte Nutzer)
  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.includes(pathname)) {
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
    const authData = await authResponse.json();

    // Wenn der Nutzer nicht eingeloggt ist, zur Login-Seite weiterleiten
    if (!authResponse.ok || !authData.items) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Wenn keine der Bedingungen zutrifft, wird die Anfrage weiterbearbeitet
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/profile'], // Hier geben wir an, für welche Seiten die Middleware greifen soll
};
