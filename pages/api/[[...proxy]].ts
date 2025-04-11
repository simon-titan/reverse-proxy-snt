// pages/api/[[...proxy]].ts

import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const proxy = httpProxy.createProxyServer()

const WEBFLOW_URL = 'https://snt-starter.webflow.io'
const PASSWORD = 'Nuhadt123'

let cachedCookie = ''

async function getWebflowSession(): Promise<string> {
  // Schritt 1: Hole die Login-Seite (um das versteckte Feld zu bekommen)
  const res = await fetch(WEBFLOW_URL, {
    method: 'GET',
  })

  const html = await res.text()
  const cookieHeader = res.headers.get('set-cookie') || ''
  const $ = cheerio.load(html)

  // Meistens hat Webflow ein verstecktes Feld namens 'password'
  const formAction = $('form').attr('action') || '/'
  const hiddenInput = $('input[type="hidden"]').attr('name') || ''

  // Schritt 2: POST mit Passwort und ggf. verstecktem Feld
  const loginRes = await fetch(`${WEBFLOW_URL}${formAction}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookieHeader,
    },
    body: new URLSearchParams({
      password: PASSWORD,
      [hiddenInput]: '', // leer, Webflow braucht das evtl.
    }),
    redirect: 'manual',
  })

  const finalCookie = loginRes.headers.get('set-cookie')?.split(';')[0]

  if (!finalCookie) throw new Error('❌ Webflow Login fehlgeschlagen')

  return finalCookie
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!cachedCookie) {
      console.log('🔓 Logging into Webflow...')
      cachedCookie = await getWebflowSession()
    }

    req.headers.cookie = cachedCookie

    proxy.web(req, res, {
      target: WEBFLOW_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.on('error', (err) => {
      console.error('❌ Proxy Error:', err)
      res.status(500).send('Proxy Error')
    })
  } catch (err: any) {
    console.error('❌ Fehler im Proxy-Handler:', err)
    res.status(500).send('Internal Server Error')
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
