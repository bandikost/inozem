"use client";

interface Props {
  price: number;
  programId: number;
  userId: number;
}

export default function PayButton({ price, programId, userId }: Props) {
  const handleClick = async () => {
    const res = await fetch("/api/yookassa/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: price,
        programId,
        userId,
      }),
    });

    const data = await res.json();
    window.location.assign(data.url);
  };

  return <button onClick={handleClick}>Оплатить</button>;
}