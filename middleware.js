import { NextResponse } from 'next/server'

export async function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Nur für /platform/... Auth prüfen
  if (url.pathname.startsWith('/platform')) {
    const auth = await fetch(`${url.origin}/api/auth`)
    if (!auth.ok) url.pathname = '/login'
  }
  
  // Alle anderen Requests zu Webflow
  return NextResponse.rewrite(`https://snt-starter.webflow.io${url.pathname}`)
}