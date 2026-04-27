"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <h1>Восстановление пароля</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 mt-10">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-72 text-lg"
        />
        <button type="submit" className="button-more">Отправить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}