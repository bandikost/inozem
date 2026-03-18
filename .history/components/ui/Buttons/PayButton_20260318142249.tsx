"use client";

interface Props {
  price: string
  programId: number
  userId: number
  name: string
}

export default function PayButton({ price, programId, userId, name }: Props) {
  const handleClick = async () => {
    const res = await fetch("/api/yookassa/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: price,
        programId,
        userId,
        name
      }),
    });

    const data = await res.json();
    window.location.assign(data.url);
  };

  return <button className="button-more" onClick={handleClick}>Оплатить</button>;
}