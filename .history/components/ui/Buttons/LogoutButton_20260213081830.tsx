"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (!res.ok) throw new Error("Failed to logout");

      router.push("/login"); 
    } catch (err) {
      console.error(err);
      alert("Ошибка при выходе");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-1 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
    >
      Выйти
    </button>
  );
}
