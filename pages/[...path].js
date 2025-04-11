export default function Page() {
  return null
}

export async function getServerSideProps({ req, res }) {
  // 1. Permanent Redirect zu Webflow MIT Passwort
  const url = new URL(req.url, 'https://snt-starter.webflow.io')
  url.searchParams.append('auth', 'Nuhadt123')
  
  res.writeHead(302, {
    Location: url.toString(),
    'Set-Cookie': `webflow_auth=Nuhadt123; Path=/`
  })
  res.end()

  return { props: {} }
}