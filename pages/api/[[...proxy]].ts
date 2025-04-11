// pages/api/proxy.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import fetch from 'node-fetch'

const proxy = httpProxy.createProxyServer()
let cachedCookie = '' // in-memory cache

const WEBFLOW_URL = 'https://snt-starter.webflow.io'
const WEBFLOW_PASSWORD = 'Nuhadt123'

// Login-Funktion: holt den Session-Cookie von Webflow
async function fetchWebflowCookie(): Promise<string> {
  const res = await fetch(`${WEBFLOW_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ password: WEBFLOW_PASSWORD }),
    redirect: 'manual',
  })

  const setCookie = res.headers.get('set-cookie')
  if (!setCookie) throw new Error('Webflow login failed (no cookie)')

  const sessionCookie = setCookie.split(';')[0]
  return sessionCookie
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!cachedCookie) {
      console.log('🔑 Logging in to Webflow...')
      cachedCookie = await fetchWebflowCookie()
    }

    req.headers.cookie = cachedCookie

    proxy.web(req, res, {
      target: WEBFLOW_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.on('error', (err) => {
      console.error('Proxy error:', err)
      res.statusCode = 500
      res.end('Proxy error.')
    })
  } catch (err: any) {
    console.error('Login or proxy failed:', err)
    res.status(500).send('Internal Server Error')
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
