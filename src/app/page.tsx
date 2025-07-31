"use client";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

import { getStaticProps } from "next/dist/build/templates/pages";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import LoginPage from "./login/page";

export default function Home() {
  // const [currencies, setCurrencies] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching currencies:", error);
  //     });
  // }, []);

  return (
    // components/MyButton.tsx
    // <>
    //   <ul>
    //     {currencies.map((currency: any) => (
    //       <li key={currency.id}>
    //         {currency.code} - {currency.symbol}
    //       </li>
    //     ))}
    //   </ul>
    //   <ThemeSwitcher />
    // </>
    <LoginPage />
  );
}
