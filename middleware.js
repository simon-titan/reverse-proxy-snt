// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Nur für /platform/* prüfen
  if (pathname.startsWith("/platform")) {
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
    if (!authResponse.ok) return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}