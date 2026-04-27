"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="p-10">
      <h1>Создание нового пароля</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 mt-10">
        <input
          type="password"
          placeholder="Введите ваш новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-72 text-lg"
        />
        <button type="submit" className="button-more">Отправить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}