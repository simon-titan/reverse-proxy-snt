// pages/index.js
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // Einfache Weiterleitung zur Startseite (ohne Login-Check)
  useEffect(() => {
    router.push("/"); // Oder direkt zu einer öffentlichen Seite
  }, []);

  return <p>Loading...</p>;
}