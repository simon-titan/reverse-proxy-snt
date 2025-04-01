import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  return <h1>Willkommen im Dashboard!</h1>;
}
