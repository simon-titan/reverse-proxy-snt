// pages/index.js
export default function Home({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  
  export async function getServerSideProps() {
    // Hole die Startseite von Webflow
    const WEBFLOW_URL = "https://snt-starter.webflow.io/";
    const WEBFLOW_PASSWORD = process.env.WEBFLOW_PASSWORD;
  
    const response = await fetch(WEBFLOW_URL, {
      headers: {
        Authorization: `Basic ${Buffer.from(`:${WEBFLOW_PASSWORD}`).toString("base64")}`,
        Host: "snt-starter.webflow.io",
      },
    });
  
    if (!response.ok) return { notFound: true }; // Falls Webflow 404 gibt
  
    const htmlContent = await response.text();
    return { props: { htmlContent } };
  }