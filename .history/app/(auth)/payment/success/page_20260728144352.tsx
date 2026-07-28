"use client";

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const router = useRouter()

  const [status, setStatus] = useState("Проверяем оплату...")

  useEffect(() => {
    const checkPayment = async () => {
      const params = new URLSearchParams(window.location.search)

      const order = params.get("order")

      if (!order) {
        router.push("/404")
        return
      }
      const res = await fetch(
        `/api/payment/check?order=${order}`
      );

      const data = await res.json()

      if (data.success) {
        setStatus("Оплата прошла успешно!")
      } else {
        router.push("/404")
      }
    };

    checkPayment()
  }, [router])


  return <h1>{status}</h1>
}