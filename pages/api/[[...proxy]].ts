import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import { IncomingMessage, ServerResponse } from 'http'
import { loginToWebflow,WEBFLOW_SITE } from '@/utils/fetchWebflow'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const proxy = httpProxy.createProxyServer({ changeOrigin: true })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieName = 'wf_loggedin'
  const cookies = req.headers?.cookie || ''
  const alreadyLoggedIn = cookies.includes(cookieName)

  if (!alreadyLoggedIn) {
    const setCookie = await loginToWebflow()

    if (setCookie) {
      // Webflow gibt manchmal mehrere Cookies → trennen
      const cookieHeaders = setCookie.split(',').map(c => c.trim())
      res.setHeader('Set-Cookie', cookieHeaders)
      res.writeHead(302, { Location: req.url || '/' })
      return res.end()
    } else {
      res.status(500).send('Webflow Login failed.')
      return
    }
  }

  proxy.web(req as unknown as IncomingMessage, res as unknown as ServerResponse, {
    target: WEBFLOW_SITE,
    selfHandleResponse: false,
    headers: { host: new URL(WEBFLOW_SITE).host,
    },
  })
}
