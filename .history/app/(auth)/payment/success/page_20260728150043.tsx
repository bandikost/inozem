"use client";

import { UserRow } from "@/app/interface/user";
import { ProgramRow } from "@/lib/programm";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UsersClientProps {
  users: UserRow[]
  programs: ProgramRow[]
}

export default function Page({
  users,
  programs,
}: UsersClientProps) {
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


    useEffect(() => {
    const getProgram = async (userId: number, programId: number) => {
      
      const res = await fetch("/api/user-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          programId,
        }),
      })
      
      const data = await res.json()

      if (data.success) {
       alert("Вы получили доступ к личному кабинету")
      } 
    }

    getProgram()
  }, [router])



  return <h1>{status}</h1>
}