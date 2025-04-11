export default function Page() {
  return null
}

export async function getServerSideProps({ req, res }) {
  // 1. Passwort direkt hier (kein .env nötig)
  const auth = 'Basic ' + Buffer.from(':Nuhadt123').toString('base64')
  
  // 2. Original-URL wiederherstellen
  const path = req.url || '/'
  
  // 3. Webflow abfragen
  const response = await fetch(`https://snt-starter.webflow.io${path}`, {
    headers: {
      'Authorization': auth,
      'Host': 'snt-starter.webflow.io',
      'User-Agent': 'snttrades-proxy'
    }
  })

  // 4. Antwort direkt durchreichen
  if (!response.ok) {
    res.statusCode = 404
    return { props: {} }
  }

  const html = await response.text()
  res.write(html)
  res.end()

  return { props: {} }
}