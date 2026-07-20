"use client";

import { useState } from "react";

export default function AddProgramForm() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [dates, setDates] = useState("");
  const [education, setEducation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const startTime = Date.now();

    try {
      const res = await fetch("/api/postPrograms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          time: Number(time),
          dates,
          education,
          specialization,
          isFavorite: isFavorite ? 1 : 0,
          description,
          price: Number(price),
          slug,
        }),
      });

      await res.json();

      const elapsed = Date.now() - startTime;

      if (elapsed < 2000) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 - elapsed)
        );
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Ошибка сервера");
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto mt-16 w-full max-w-5xl px-6 pb-20">

      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              Создание программы...
            </span>
          </div>
        </div>
      )}

      

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
      >

       
        <div className="border-b border-gray-100 p-8">
          <div className="mb-7">
            <h2 className="text-xl font-semibold text-gray-900">
              Основная информация
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Название и ключевые характеристики программы
            </p>
          </div>

          <div className="space-y-6">

            <Field
              label="Название программы"
              required
              hint="Отображается на странице программы"
            >
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Актуальные вопросы анестезиологии и реаниматологии"
                className="input-main"
              />
            </Field>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <Field label="Образование">
                <input
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Высшее медицинское образование"
                  className="input-main"
                />
              </Field>

              <Field label="Направление / специализация">
                <input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="Анестезиология и реаниматология"
                  className="input-main"
                />
              </Field>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              <Field label="Продолжительность">
                <div className="relative">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="144"
                    className="input-main pr-20"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    акад. ч.
                  </span>
                </div>
              </Field>

              <Field label="Стоимость">
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25000"
                    className="input-main pr-12"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    ₽
                  </span>
                </div>
              </Field>

              <Field label="Даты проведения">
                <input
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="15–30 сентября"
                  className="input-main"
                />
              </Field>

            </div>

          </div>
        </div>

       
        <div className="border-b border-gray-100 bg-gray-50/50 p-8">

          <div className="mb-7">
            <h2 className="text-xl font-semibold text-gray-900">
              Описание программы
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Краткое описание, которое увидят пользователи
            </p>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишите содержание и основные особенности образовательной программы..."
            rows={7}
            className="input-main min-h-[180px] resize-y"
          />

          <div className="mt-3 text-right text-xs text-gray-400">
            {description.length} символов
          </div>

        </div>

      
        <div className="border-b border-gray-100 p-8">

          <div className="mb-7">
            <h2 className="text-xl font-semibold text-gray-900">
              Настройки публикации
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Дополнительные параметры программы
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <Field
              label="URL программы"
              required
              hint="Используется в адресе страницы"
            >
              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">

                <span className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 text-sm text-gray-400">
                  /program/
                </span>

                <input
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="anesteziologiya"
                  className="w-full border-0 bg-transparent px-4 py-3.5 text-base outline-none"
                />

              </div>
            </Field>

            <div className="flex items-end">

              <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:border-blue">

                <div>
                  <p className="font-medium text-gray-900">
                    Рекомендуемая программа
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Показывать в избранных программах
                  </p>
                </div>

                <div
                  className={`relative h-7 w-12 rounded-full transition ${
                    isFavorite
                      ? "bg-blue"
                      : "bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={(e) => setIsFavorite(e.target.checked)}
                    className="peer sr-only"
                  />

                  <span
                    className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      isFavorite
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </div>

              </label>

            </div>

          </div>

        </div>

       
        <div className="flex items-center justify-between gap-6 bg-white px-8 py-6">

        

          <button
            disabled={loading}
            type="submit"
            className="button-more ml-auto min-w-[230px] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Создание..." : "Создать программу"}
          </button>

        </div>

      </form>

      <style jsx>{`
        .input-main {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          background: white;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          color: rgb(17 24 39);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-main::placeholder {
          color: rgb(156 163 175);
        }

        .input-main:focus {
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
        }
      `}</style>

    </section>
  );
}


function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">

        <label className="text-sm font-semibold text-gray-700">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        {hint && (
          <span className="hidden text-xs text-gray-400 sm:block">
            {hint}
          </span>
        )}

      </div>

      {children}
    </div>
  );
}