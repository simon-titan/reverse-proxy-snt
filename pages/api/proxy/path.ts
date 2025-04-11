// pages/api/proxy/[...path].js
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Webflow-Ziel-URL & Passwort (aus Umgebungsvariablen)
  const WEBFLOW_URL = 'https://snt-starter.webflow.io';
  const WEBFLOW_PASSWORD = process.env.WEBFLOW_PASSWORD; // Aus Vercel-Env

  // 2. Pfad aus der Anfrage extrahieren (z. B. `/api/proxy/products` → `products`)
  const pathSegments = Array.isArray(req.query.path) 
  ? req.query.path 
  : [req.query.path || '']; // Fallback für string/undefined
const path = pathSegments.join('/');

  try {
    // 3. Anfrage an Webflow mit Passwort-Header
    const response = await fetch(`${WEBFLOW_URL}/${path}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`:${WEBFLOW_PASSWORD}`).toString('base64')}`,
        Host: "snt-starter.design.webflow.io", // Wichtig für CORS
      },
    });

    // 4. Webflow.io-Links in der Antwort ersetzen (Sicherheit/SEO)
    let html = await response.text();
    html = html.replace(/snt-starter\.design\.webflow\.io/g, "snttrades.de");

    // 5. Antwort an Client senden
    res.status(response.status).send(html);

  } catch (error: unknown) {
    // Typisierung + Logging
    console.error("Proxy-Fehler:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Proxy-Fehler: " + message });
  }
}