export default async function handler(req, res) {
  try {
    const check = await fetch('https://snt-starter.webflow.io', {
      headers: {
        Authorization: `Basic ${Buffer.from(':Nuhadt123').toString('base64')}`,
        Host: 'snt-starter.webflow.io'
      }
    })
    res.status(check.ok ? 200 : 401).json({ authorized: check.ok })
  } catch (error) {
    res.status(500).json({ error: 'Auth check failed' })
  }
}