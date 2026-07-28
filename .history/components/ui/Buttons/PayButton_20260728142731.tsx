"use client";

type Props = {
  programId: number;
};

export default function PayButton({ programId }: Props) {
  const pay = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        programId,
      }),
    });

    const data = await res.json();

    if (data.Success) {
      window.location.href = data.PaymentURL;
    }
  };

  return (
    <button onClick={pay} className="w-full button-more">
      Оплатить онлайн
    </button>
  );
}