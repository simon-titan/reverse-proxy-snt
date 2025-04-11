// pages/index.js
export default function Home({ htmlContent }) {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  }
  
  export async function getServerSideProps() {
    // 1. Webflow-URL & Passwort aus Umgebungsvariablen
    const WEBFLOW_URL = "https://snt-starter.webflow.io";
    const WEBFLOW_PASSWORD = process.env.WEBFLOW_PASSWORD;
  
    // 2. Webflow-Inhalte abrufen (mit Passwort)
    const response = await fetch(WEBFLOW_URL, {
      headers: {
        Authorization: `Basic ${Buffer.from(`:${WEBFLOW_PASSWORD}`).toString("base64")}`,
        Host: "snt-starter.webflow.io",
        Origin: "https://snttrades.de", // Wichtig für CORS
      },
    });
  
    // 3. Bei Fehler: 404 anzeigen
    if (!response.ok) return { notFound: true };
  
    // 4. HTML bereinigen (Webflow-Links ersetzen)
    let htmlContent = await response.text();
    htmlContent = htmlContent.replace(/snt-starter\.webflow\.io/g, "snttrades.de");
  
    // 5. HTML an den Browser senden
    return { props: { htmlContent } };
  }