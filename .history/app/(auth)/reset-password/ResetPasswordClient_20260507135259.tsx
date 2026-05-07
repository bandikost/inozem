"use client"

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ResetPasswordClient({
  token,
}: {
  token: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш новый пароль"
            className="border border-gray-300 p-2 rounded-md w-72 text-lg"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" className="button-more">
          Отправить
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}