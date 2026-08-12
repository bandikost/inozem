"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TestCreator = dynamic(
  () => import("../TestCreator"),
  {
    ssr: false,
    loading: () => (
      <div className="p-10">
        Загрузка конструктора...
      </div>
    ),
  }
);

export default function CreateTestPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveTest = async (schema: string) => {
    if (!title.trim()) {
      alert("Введите название теста");
      return;
    }

    const response = await fetch("/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        schema,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка сохранения");
    }

    router.push("/admin/tests");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Создание теста
      </h1>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block mb-2">
            Название теста
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border px-4 py-2"
            placeholder="Например: Тест жизнестойкости"
          />
        </div>

        <div>
          <label className="block mb-2">
            Описание
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border px-4 py-2"
            rows={4}
            placeholder="Описание теста"
          />
        </div>
      </div>

      <TestCreator
        onSave={saveTest}
      />
    </div>
  );
}