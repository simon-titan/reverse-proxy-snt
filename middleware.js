import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1. Öffentliche Routen (Landing Page, Produktübersicht)
  const publicRoutes = ["/", "/products"];
  if (publicRoutes.includes(pathname)) {
    // Rewrite durch PROXY (nicht direkt zu Webflow!)
    const proxyPath = pathname === '/' ? '' : pathname;
    return NextResponse.rewrite(new URL(`/api/proxy${pathname}`, req.url));
  }

  console.log("Middleware rewrite:", `/api/proxy${pathname}`);
  
  // 2. Geschützte Routen (später mit Outseta)
  const protectedRoutes = ["/platform", "/profile"];
  if (protectedRoutes.includes(pathname)) {
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth`);
    if (!authResponse.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/products', '/dashboard', '/profile'],
};