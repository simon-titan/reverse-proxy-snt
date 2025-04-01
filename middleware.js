import { NextResponse } from "next/server";

export async function middleware(req) {
  const protectedRoutes = ["/dashboard", "/profile"];
  const { pathname } = req.nextUrl;

  // Hauptseite & andere öffentliche Seiten direkt durchlassen
  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // API-Check für Authentifizierung
  const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
  const authData = await authResponse.json();

  if (!authResponse.ok || !authData.items) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Middleware greift nur für spezifische Routen
export const config = {
  matcher: ["/dashboard", "/profile"], 
};
