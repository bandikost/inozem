"use client";

import { useState } from "react";
import Tiptap from "@/components/editor/Tiptap";

export default function CreateActivityPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState("");
  const [year, setYear] = useState("");
  const [paylink, setPaylink] = useState("");

  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [conditions, setConditions] = useState("");

  async function handleSubmit() {
    const res = await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug,
        title,
        dates,
        year: year ? Number(year) : null,
        paylink,

        description,
        teacher,
        purpose,
        audience,
        conditions,
      }),
    });

    if (!res.ok) {
      alert("Ошибка");
      return;
    }

    alert("Мероприятие создано");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none focus:border-black";

  return (
    <div className="min-h-screen mt-20 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">

        <div>
          <h1 className="text-3xl font-semibold">
            Создание мероприятия
          </h1>
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">

          <input
            className={inputClass}
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Подзаголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Даты"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Год"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Ссылка на оплату"
            value={paylink}
            onChange={(e) => setPaylink(e.target.value)}
          />

        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Описание мероприятия
          </h2>

          <Tiptap
            value={description}
            onChange={setDescription}
          />
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Спикер
          </h2>

          <Tiptap
            value={teacher}
            onChange={setTeacher}
          />
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Цель мероприятия
          </h2>

          <Tiptap
            value={purpose}
            onChange={setPurpose}
          />
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Аудитория
          </h2>

          <Tiptap
            value={audience}
            onChange={setAudience}
          />
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Условия участия
          </h2>

          <Tiptap
            value={conditions}
            onChange={setConditions}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Создать мероприятие
          </button>
        </div>

      </div>
    </div>
  );
}