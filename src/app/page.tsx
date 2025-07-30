"use client";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/currencies")
      .then((res) => setCurrencies(res.data))
      .catch((err) => console.error("Error fetching currencies:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    // components/MyButton.tsx
    <>
      <Button className="rounded-md bg-blue-500 px-4 py-2 text-white">
        Click me
      </Button>
      <ul>
        {currencies.map((currency: any) => (
          <li key={currency.id}>
            {currency.code} - {currency.symbol}
          </li>
        ))}
      </ul>
    </>
  );
}
