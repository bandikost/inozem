"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    year: "",
    month: "",
    education: "",
    specialization: "",
    stage: "",
    name: "",
    file: null as File | null,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });

    await fetch("/api/admin/accred/upload", {
      method: "POST",
      body: data,
    });

    alert("Протокол загружен");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 mt-27">

      <h2 className="text-xl font-semibold text-gray-900">
        Загрузка протоколов
      </h2>

      <div className="grid grid-cols-2 gap-3">

        <input
          className="input border border-gray-200 p-1 rounded-md"
          placeholder="Год"
          value={form.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />

        <input
          className="input border border-gray-200 p-1 rounded-md"
          placeholder="Месяц"
          value={form.month}
          onChange={(e) => handleChange("month", e.target.value)}
        />

        <input
          className="input border border-gray-200 p-1 rounded-md"
          placeholder="Уровень образования"
          value={form.education}
          onChange={(e) => handleChange("education", e.target.value)}
        />

        <input
          className="input border border-gray-200 p-1 rounded-md"
          placeholder="Специализация"
          value={form.specialization}
          onChange={(e) => handleChange("specialization", e.target.value)}
        />

        <select
          className="input col-span-2 border border-gray-200 p-1 rounded-md"
          value={form.stage}
          onChange={(e) => handleChange("stage", e.target.value)}
        >
          <option value="">Этап</option>
          <option>Основной этап</option>
          <option>Второй этап</option>
          <option>Итог</option>
        </select>

        <input
          className="input col-span-2 "
          placeholder="Название документа"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          type="file"
          className="col-span-2"
          onChange={(e) =>
            handleChange("file", e.target.files?.[0] || null)
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl transition"
      >
        Загрузить протокол
      </button>
    </div>
  );
}