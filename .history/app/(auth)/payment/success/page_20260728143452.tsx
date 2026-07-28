"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const checkPayment = async () => {
      const params = new URLSearchParams(window.location.search);

      const order = params.get("order");

      const res = await fetch(
        `/api/payment/check?order=${order}`
      );

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      }
    };


    checkPayment();
  }, []);


  if (!success) {
    return <h1>Проверяем оплату...</h1>;
  }


  return (
    <h1>
      Оплата прошла успешно!
    </h1>
  );
}