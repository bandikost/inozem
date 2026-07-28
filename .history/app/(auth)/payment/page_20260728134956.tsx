"use client";

export default function Page() {
  const pay = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
    });

    const data = await res.json();

    if (data.Success) {
      window.location.href = data.PaymentURL;
    } else {
      console.log(data);
    }
  };

  return (
    <section>
      <button onClick={pay}>
        Оплатить
      </button>
    </section>
  );
}