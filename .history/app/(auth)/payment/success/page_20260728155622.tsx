"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [status, setStatus] = useState("Проверяем оплату...");

  useEffect(() => {
  const checkPayment = async () => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order");

    if (!order) {
      router.push("/404");
      return;
    }

    let count = 0;

    const timer = setInterval(async () => {
      count++;

      const res = await fetch(
        `/api/payment/check?order=${order}`
      );

      const data = await res.json();

      if (data.success) {
        clearInterval(timer);
        router.push("/profile");
      }

      if (count >= 15) {
        clearInterval(timer);
        setStatus(
          "Оплата получена. Доступ будет открыт в ближайшее время."
        );
      }

    }, 2000);
  };


  checkPayment();

}, [router]);


  return <h1>{status}</h1>;
}