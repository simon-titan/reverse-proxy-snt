import { NextResponse } from "next/server";

export async function middleware(req) {
  const protectedRoutes = ["/dashboard", "/profile"];
  const { pathname } = req.nextUrl;

  // Nur auf geschützte Seiten reagieren
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

export const config = {
  matcher: ["/dashboard", "/profile"], // Nur diese Routen erfordern Login
};
