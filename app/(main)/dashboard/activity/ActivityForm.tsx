"use client";

import { useState } from "react";
import Tiptap from "@/components/editor/Tiptap";
import LoadingLink from "@/components/Load/LoadingLink";
import {
  Calendar,
  Link as LinkIcon,
  BookOpen,
  User,
  Target,
  Users,
  ClipboardList,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export type ActivityFormData = {
  name: string;
  slug: string;
  title: string;
  dates: string;
  year: string;
  paylink: string;
  description: string;
  teacher: string;
  purpose: string;
  audience: string;
  conditions: string;
};

interface ActivityFormProps {
  mode: "create" | "edit";

  initialData: ActivityFormData;

  onSubmit(data: ActivityFormData): Promise<void>;
}

export default function ActivityForm({
  mode,
  initialData,
  onSubmit,
}: ActivityFormProps) {
  const [name, setName] = useState(initialData.name);
  const [slug, setSlug] = useState(initialData.slug);
  const [title, setTitle] = useState(initialData.title);
  const [dates, setDates] = useState(initialData.dates);
  const [year, setYear] = useState(initialData.year);
  const [paylink, setPaylink] = useState(initialData.paylink);

  const [description, setDescription] = useState(initialData.description);
  const [teacher, setTeacher] = useState(initialData.teacher);
  const [purpose, setPurpose] = useState(initialData.purpose);
  const [audience, setAudience] = useState(initialData.audience);
  const [conditions, setConditions] = useState(initialData.conditions);

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    await onSubmit({
      name,
      slug,
      title,
      dates,
      year,
      paylink,
      description,
      teacher,
      purpose,
      audience,
      conditions,
    });

    setLoading(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] outline-none transition focus:border-black focus:ring-4 focus:ring-black/5";

  return (
    <div className="min-h-screen py-12 px-4 mt-16">
      <div className="mx-auto max-w-5xl space-y-8">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

          <LoadingLink
            href="/dashboard/manager"
            className="hover:text-blue transition hover:underline"
          >
            Главная страница Админки
          </LoadingLink>

          <ChevronRight size={14} />

          <LoadingLink
            href="/dashboard/activity"
            className="hover:text-blue transition hover:underline"
          >
            Список мероприятий
          </LoadingLink>

          <ChevronRight size={14} />

          <span className="truncate text-zinc-700">
            {mode === "create"
              ? "Создание"
              : name || slug}
          </span>

        </nav>

     

        <div>

          <h1 className="text-4xl font-bold">

            {mode === "create"
              ? "Создание мероприятия"
              : "Редактирование мероприятия"}

          </h1>

          <p className="mt-2 text-gray-500">

            {mode === "create"
              ? "Заполните информацию о новом мероприятии."
              : "Измените информацию о мероприятии и сохраните изменения."}

          </p>

        </div>

   

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex gap-3">

            <Sparkles className="mt-1 h-6 w-6 text-blue-600" />

            <div>

              <h2 className="font-semibold text-blue-900">
                Информация
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-700">
                Заполните основные данные. Все поля можно изменить позже.
              </p>

            </div>

          </div>

        </div>

        {/* здесь просто вставляешь ВСЮ свою форму без изменений */}

        {/* Основная информация */}

        {/* Проведение */}

        {/* Description */}

        {/* Teacher */}

        {/* Purpose */}

        {/* Audience */}

        {/* Conditions */}

        {/* НИЧЕГО НЕ ПЕРЕПИСЫВАЕШЬ */}

        <div className="flex justify-end">

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-2xl bg-black px-10 py-4 font-semibold text-white"
          >

            {loading
              ? "Сохранение..."
              : mode === "create"
              ? "Создать мероприятие"
              : "Сохранить изменения"}

          </button>

        </div>

      </div>
    </div>
  );
}