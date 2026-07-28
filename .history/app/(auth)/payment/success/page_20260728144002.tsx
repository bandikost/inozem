"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function Page() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkPayment = async () => {
      const params = new URLSearchParams(window.location.search);

      const order = params.get("order");

      if (!order) {
        notFound();
      }

      const res = await fetch(
        `/api/payment/check?order=${order}`
      );

      const data = await res.json();

      if (!data.success) {
        notFound();
      }

      setSuccess(true);
    };

    checkPayment();
  }, []);

  if (!success) {
    return <h1>Проверяем оплату...</h1>;
  }

  return <h1>Оплата прошла успешно!</h1>;
}