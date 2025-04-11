import { NextResponse } from 'next/server'

export async function middleware(request) {
  const response = NextResponse.next()
  
  // Für alle Requests den Auth-Header setzen
  response.headers.set(
    'Authorization', 
    `Basic ${Buffer.from(':Nuhadt123').toString('base64')}`
  )
  
  response.headers.set('Host', 'snt-starter.webflow.io')
  response.headers.set('Cache-Control', 'no-store')

  return response
}