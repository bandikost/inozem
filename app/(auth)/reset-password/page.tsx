"use client"

import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
    const params = useSearchParams();
    const token = params.get("token");
    const [showPassword, setShowPassword] = useState(false)
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
        <div className="relative">
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Введите ваш новый пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 p-2 rounded-md w-72 text-lg" />
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2  hover:opacity-80 cursor-pointer">
            {showPassword ? <EyeOff size={18} className="!text-zinc-700" /> : <Eye size={18} className="!text-zinc-700" />}
          </button>
        </div>
        <button type="submit" className="button-more">Отправить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}