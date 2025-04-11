import { NextResponse } from 'next/server'

export function middleware(req) {
  const res = NextResponse.next()
  
  // Setze ESSENTIELLE Headers für Webflow
  res.headers.set('Host', 'snt-starter.webflow.io')
  res.headers.set('Authorization', 'Basic bnVoYWR0MTIzOg==')
  res.headers.set('Cache-Control', 'no-store')
  
  return res
}