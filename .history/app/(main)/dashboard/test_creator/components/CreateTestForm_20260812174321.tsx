"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTestForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createTest(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tests_creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Ошибка создания теста"
        );
      }

      router.push(
        `/dashboard/test_creator/edit/${data.slug}`
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ошибка создания теста"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={createTest}
      className="mx-auto mt-10 w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
    >

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-medium">
          Название теста
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: Основы программирования"
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-prpl"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label className="font-medium">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="osnovy-programmirovaniya"
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-prpl"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-prpl px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading
          ? "Создание..."
          : "Создать тест"}
      </button>

    </form>
  );
}