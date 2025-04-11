export default function Page() {
  return null
}

export async function getServerSideProps({ req, res }) {
  // 1. Authentifizierung
  const auth = 'Basic ' + Buffer.from(':Nuhadt123').toString('base64')
  
  // 2. Pfad extrahieren
  const path = req.url || '/'
  
  // 3. Webflow abfragen MIT ERROR-HANDLING
  try {
    const response = await fetch(`https://snt-starter.webflow.io${path}`, {
      headers: {
        'Authorization': auth,
        'Host': 'snt-starter.webflow.io'
      }
    })

    // 4. Statuscode prüfen
    if (!response.ok) {
      res.statusCode = response.status
      return { props: {} }
    }

    // 5. HTML direkt zurückschicken
    const html = await response.text()
    res.setHeader('Content-Type', 'text/html')
    res.write(html)
    res.end()

  } catch (error) {
    console.error('Proxy error:', error)
    res.statusCode = 500
    res.end('Proxy error')
  }

  return { props: {} }
}