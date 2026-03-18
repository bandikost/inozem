"use client";

interface PayButtonProps {
  item: string;
}

export default function PayButton({ item }: PayButtonProps) {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/yookassa/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Не удалось создать платеж");
      }
    } catch (error) {
      console.error("Ошибка при создании платежа:", error);
      alert("Не удалось создать платеж");
    }
  };

  return <button className="button-more" onClick={handleClick}>Оплатить</button>;
}