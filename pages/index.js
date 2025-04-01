import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // API-Abfrage, ob Nutzer eingeloggt ist
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          router.push("/login"); // Falls nicht eingeloggt → Weiterleitung zu /login
        } else {
          router.push("/dashboard"); // Falls eingeloggt → Weiterleitung zum Dashboard
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  return <p>Loading...</p>;
}
