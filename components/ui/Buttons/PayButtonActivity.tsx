"use client";

import { useRouter } from "next/navigation";

type Props = {
  activityId: number;
};

export default function PayButtonActivity({ activityId }: Props) {
  const router = useRouter();

  const pay = async () => {
    const userRes = await fetch("/api/profile");

    if (!userRes.ok) {
      router.push("/login");
      return;
    }

    const user = await userRes.json();

    const res = await fetch("/api/payment/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId,
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
    <button onClick={pay} className="button-more">
      Оплатить онлайн
    </button>
  );
}