export default async function handler(req, res) {
    try {
      const apiUrl = "https://seitennull---fzco.outseta.com/api/v1/crm/accounts/";
      const apiKey = "DEIN_API_KEY";
      const secretKey = "DEIN_SECRET_KEY";
      const authToken = `Outseta ${apiKey}:${secretKey}`;
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Nutzerdaten");
      }
  
      const data = await response.json();
      res.status(200).json({ items: data.items });
    } catch (error) {
      console.error("Auth-Fehler:", error);
      res.status(401).json({ error: "Nicht eingeloggt" });
    }
  }
  