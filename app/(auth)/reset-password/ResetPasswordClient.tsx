"use client"

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordClient({
  token,
}: {
  token: string;
}) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

   async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("Произошла ошибка");
    } finally {
      setLoading(false);
    }
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