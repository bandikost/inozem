"use client";

import { useRouter } from "next/navigation";

type Props = {
  programId: number
}

export default function PayButton({ programId }: Props) {
  const router = useRouter()

 const pay = async () => {
  const userRes = await fetch("/api/profile");

  if (!userRes.ok) {
    router.push("/login");
    return;
  }

  const user = await userRes.json();


  const res = await fetch("/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      programId,
      userId: user.id,
    }),
  });


  const data = await res.json();


  if (data.Success) {
    window.location.href = data.PaymentURL;
  } else {
    console.log(data);
  }
};


  return (
    <button onClick={pay}>
      Оплатить онлайн
    </button>
  );
}