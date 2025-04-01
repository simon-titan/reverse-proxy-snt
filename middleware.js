import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  // Debug: Console-Log für aktuelle URL (geht nur lokal)
  console.log(`Middleware läuft für: ${origin}${pathname}`);

  // Login darf immer erreichbar sein
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // API-Aufruf für Authentifizierung
  const authResponse = await fetch(`${origin}/api/auth`);
  const authData = await authResponse.json();

  if (!authResponse.ok || !authData.items) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Middleware soll für Dashboard & Root-URL greifen
export const config = {
  matcher: ["/dashboard", "/"],
};
