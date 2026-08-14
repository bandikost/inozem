"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  slug: string;
}

export default function DeleteTestButton({ slug }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить этот тест?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/tests_creator/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Не удалось удалить тест");
        return;
      }

      router.push("/dashboard/test_creator");
      router.refresh();
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Произошла ошибка при удалении теста");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="mt-4 cursor-pointer text-red-500 transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Удаление..." : "Удалить тест"}
    </button>
  );
}