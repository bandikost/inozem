"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("Проверяем оплату...")
    const router = useRouter()

  useEffect(() => {
    const checkPayment = async () => {
      const params = new URLSearchParams(window.location.search);

      const order = params.get("order");

      if (!order) {
        router.push("/404")
        return
      }

      const res = await fetch(
        `/api/payment/check?order=${order}`
      );

      const data = await res.json();

      if (data.success) {
        setStatus("Оплата прошла успешно!");
      } else {
        setStatus("Оплата еще не подтверждена");
      }
    };

    checkPayment();
  }, []);


  return <h1>{status}</h1>;
}