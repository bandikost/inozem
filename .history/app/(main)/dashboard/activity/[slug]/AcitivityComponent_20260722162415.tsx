"use client";

import { useState } from "react";
import Link from "next/link";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

interface ActivityEditorProps {
  initialSlug: string;
  activity: {
    id: number;
    name: string;
    slug: string;
    title: string | null;
    description: string | null;
    teacher: string | null;
    purpose: string | null;
    conditions: string | null;
    audience: string | null;
    dates: string | null;
    year: number | null;
    paylink: string | null;
    teacher_img: string | null;
    title_bg: string | null;
    content: string | null;
  };
}

export default function ActivityEditor({
  initialSlug,
  activity,
}: ActivityEditorProps) {
  const [form, setForm] = useState({
    name: activity.name ?? "",
    slug: activity.slug ?? initialSlug,
    title: activity.title ?? "",
    description: activity.description ?? "",
    teacher: activity.teacher ?? "",
    purpose: activity.purpose ?? "",
    conditions: activity.conditions ?? "",
    audience: activity.audience ?? "",
    dates: activity.dates ?? "",
    year: activity.year?.toString() ?? "",
    paylink: activity.paylink ?? "",
    teacher_img: activity.teacher_img ?? "",
    title_bg: activity.title_bg ?? "",
    content: activity.content ?? "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `/api/activity/${initialSlug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            year: form.year
              ? Number(form.year)
              : null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Ошибка обновления мероприятия"
        );
      }

      alert("Мероприятие успешно обновлено!");

    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Ошибка сервера"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto mt-27 w-full px-6 pb-20">

      {/* Навигация */}

      <nav className="
        mb-8
        flex
        flex-wrap
        items-center
        gap-x-2
        gap-y-2
        text-md
        text-zinc-500
      ">

        <LoadingLink
          href="/dashboard/manager"
          className="
            shrink-0
            transition
            hover:text-blue
            hover:underline
          "
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <LoadingLink
          href="/dashboard/activity"
          className="
            shrink-0
            transition
            hover:text-blue
            hover:underline
          "
        >
          Мероприятия
        </LoadingLink>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <span className="
          min-w-0
          flex-1
          truncate
          text-zinc-800
          opacity-70
        ">
          Редактирование мероприятия
        </span>

      </nav>


      {/* Форма */}

      <form
        onSubmit={handleSubmit}
        className="
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        "
      >

        {/* Заголовок */}

        <section className="
          border-b
          border-gray-100
          p-8
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">
              Редактирование мероприятия
            </h1>

            <p className="
              mt-2
              text-gray-500
            ">
              Измените информацию о мероприятии и сохраните обновления.
            </p>

          </div>

        </section>


        {/* Основная информация */}

        <section className="
          border-b
          border-gray-100
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-xl
              font-semibold
              text-gray-900
            ">
              Основная информация
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Название и основные сведения об образовательном мероприятии
            </p>

          </div>


          <div className="space-y-6">

            <Field
              label="Название мероприятия"
              required
              hint="Отображается в каталоге мероприятий"
            >

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="
                  Например:
                  Актуальные вопросы терапии
                "
                className="input-main"
              />

            </Field>


            <Field
              label="URL мероприятия"
              required
              hint="Используется в адресе страницы"
            >

              <div className="
                flex
                items-center
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
              ">

                <span className="
                  whitespace-nowrap
                  border-r
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  text-sm
                  text-gray-400
                ">
                  /activity/
                </span>

                <input
                  required
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="terapiya-2026"
                  className="
                    w-full
                    border-0
                    bg-transparent
                    px-4
                    py-3.5
                    text-base
                    outline-none
                  "
                />

              </div>

            </Field>


            <Field
              label="Заголовок"
              hint="Дополнительный заголовок мероприятия"
            >

              <textarea
                name="title"
                value={form.title}
                onChange={handleChange}
                rows={3}
                className="
                  input-main
                  min-h-[100px]
                  resize-y
                "
              />

            </Field>


            <Field
              label="Описание мероприятия"
              hint="Краткое описание для пользователей"
            >

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="
                  Опишите содержание и основные особенности мероприятия...
                "
                className="
                  input-main
                  min-h-[180px]
                  resize-y
                "
              />

              <div className="
                mt-3
                text-right
                text-xs
                text-gray-400
              ">
                {form.description.length} символов
              </div>

            </Field>

          </div>

        </section>


        {/* Информация о мероприятии */}

        <section className="
          border-b
          border-gray-100
          bg-gray-50/50
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-xl
              font-semibold
              text-gray-900
            ">
              Информация о мероприятии
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Основные сведения о содержании и участии в мероприятии
            </p>

          </div>


          <div className="space-y-6">

            <Field label="Спикер">

              <textarea
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                rows={5}
                placeholder="
                  Укажите информацию о спикере...
                "
                className="
                  input-main
                  min-h-[140px]
                  resize-y
                "
              />

            </Field>


            <Field label="Цель мероприятия">

              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                rows={5}
                placeholder="
                  Опишите цель мероприятия...
                "
                className="
                  input-main
                  min-h-[140px]
                  resize-y
                "
              />

            </Field>


            <Field label="Условия участия">

              <textarea
                name="conditions"
                value={form.conditions}
                onChange={handleChange}
                rows={5}
                placeholder="
                  Укажите требования и условия участия...
                "
                className="
                  input-main
                  min-h-[140px]
                  resize-y
                "
              />

            </Field>


            <Field label="Для кого предназначено мероприятие">

              <textarea
                name="audience"
                value={form.audience}
                onChange={handleChange}
                rows={5}
                placeholder="
                  Опишите целевую аудиторию мероприятия...
                "
                className="
                  input-main
                  min-h-[140px]
                  resize-y
                "
              />

            </Field>

          </div>

        </section>


        {/* Даты и параметры */}

        <section className="
          border-b
          border-gray-100
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-xl
              font-semibold
              text-gray-900
            ">
              Даты и параметры мероприятия
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Сроки проведения и дополнительные параметры
            </p>

          </div>


          <div className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          ">

            <Field label="Даты проведения">

              <input
                name="dates"
                value={form.dates}
                onChange={handleChange}
                placeholder="15–30 сентября"
                className="input-main"
              />

            </Field>


            <Field label="Год">

              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2026"
                className="input-main"
              />

            </Field>


            <Field
              label="Ссылка на оплату"
              hint="Если используется онлайн-оплата"
            >

              <input
                type="url"
                name="paylink"
                value={form.paylink}
                onChange={handleChange}
                placeholder="https://..."
                className="input-main"
              />

            </Field>

          </div>

        </section>


        {/* Изображения */}

        <section className="
          border-b
          border-gray-100
          bg-gray-50/50
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-xl
              font-semibold
              text-gray-900
            ">
              Изображения
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Изображения, используемые на странице мероприятия
            </p>

          </div>


          <div className="space-y-6">

            <Field
              label="Изображение преподавателя"
              hint="Путь к изображению"
            >

              <input
                name="teacher_img"
                value={form.teacher_img}
                onChange={handleChange}
                placeholder="/uploads/teacher.jpg"
                className="input-main"
              />

            </Field>


            <div className="
              flex
              rounded-2xl
              border
              border-gray-300
              bg-yellow-100
              p-6
              text-lg
              shadow-md
            ">

              <p>
                Изображения находятся
              </p>

              <Link
                target="_blank"
                href="
                  https://console.yandex.cloud/folders/b1gjd5dnmt6jjindolec/storage/buckets/inozemstorage?key=teachers%2F&versionsDisplay=false
                "
                className="
                  ml-2
                  cursor-pointer
                  hover:opacity-70
                "
              >
                — На облаке академии
              </Link>

            </div>


            <Field
              label="Фоновое изображение заголовка"
              hint="Путь к фоновому изображению"
            >

              <input
                name="title_bg"
                value={form.title_bg}
                onChange={handleChange}
                placeholder="/uploads/title-bg.jpg"
                className="input-main"
              />

            </Field>

          </div>

        </section>


        {/* Содержание */}

        <section className="
          border-b
          border-gray-100
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-xl
              font-semibold
              text-gray-900
            ">
              Содержание мероприятия
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              Полное содержание образовательного мероприятия
            </p>

          </div>


          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={15}
            placeholder="
              Введите содержание мероприятия...
            "
            className="
              input-main
              min-h-[350px]
              resize-y
            "
          />

        </section>


        {/* Кнопка */}

        <div className="
          flex
          items-center
          justify-end
          gap-6
          bg-white
          px-8
          py-6
        ">

          <button
            disabled={loading}
            type="submit"
            className="
              button-more
              min-w-[230px]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {loading
              ? "Сохранение..."
              : "Сохранить изменения"}

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

      <div className="
        mb-2
        flex
        items-center
        justify-between
        gap-4
      ">

        <label className="
          text-sm
          font-semibold
          text-gray-700
        ">

          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}

        </label>


        {hint && (
          <span className="
            hidden
            text-xs
            text-gray-400
            sm:block
          ">
            {hint}
          </span>
        )}

      </div>


      {children}

    </div>
  );
}