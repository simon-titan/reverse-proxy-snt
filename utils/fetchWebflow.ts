// utils/fetchWebflow.ts

export const WEBFLOW_SITE = 'https://snt-starter-webflow.io'
export const PASSWORD = 'Nuhadt123'

export async function loginToWebflow(): Promise<string | null> {
  const response = await fetch(`${WEBFLOW_SITE}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ password: PASSWORD }),
    redirect: 'manual',
  })

  const cookie = response.headers.get('set-cookie')
  return cookie
}
