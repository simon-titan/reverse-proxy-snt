// pages/index.js
export default function Home({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  
  export async function getServerSideProps() {
    const WEBFLOW_URL = 'https://snt-starter.webflow.io';
    const WEBFLOW_PASSWORD = process.env.WEBFLOW_PASSWORD;
  
    try {
      // 1. Webflow-Inhalt mit Passwort abrufen
      const response = await fetch(WEBFLOW_URL, {
        headers: {
          Authorization: `Basic ${Buffer.from(`:${WEBFLOW_PASSWORD}`).toString('base64')}`,
          Host: 'snt-starter.webflow.io', // Kritisch für CORS
        },
      });
  
      // 2. Bei Fehler: 404
      if (!response.ok) return { notFound: true };
  
      // 3. HTML bereinigen (Webflow-Links ersetzen)
      let htmlContent = await response.text();
      htmlContent = htmlContent.replace(/snt-starter\.webflow\.io/g, 'snttrades.de');
  
      // 4. Inhalt zurückgeben
      return { props: { htmlContent } };
  
    } catch (error) {
      console.error('Proxy-Fehler:', error);
      return { notFound: true };
    }
  }