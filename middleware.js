import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Wenn User zur Login-Seite geht, nicht umleiten
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
  const authData = await authResponse.json();

  if (!authResponse.ok || !authData.items) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/"], // Middleware nur auf diesen Seiten aktiv
};
