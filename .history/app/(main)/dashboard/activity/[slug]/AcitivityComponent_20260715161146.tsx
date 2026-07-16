"use client";

import { useState } from "react"; import Tiptap from "@/components/editor/Tiptap"; import LoadingLink from "@/components/Load/LoadingLink"; 
import { Calendar, 
  Link as LinkIcon, 
  BookOpen, 
  User, 
  Target, 
  Users, 
  ClipboardList, 
  Sparkles, 
  ChevronRight, } from "lucide-react";

interface ActivityEditorProps {
  initialSlug: string;
  activity: any;
}

export default function ActivityEditor({
  initialSlug, activity
}: ActivityEditorProps) {

  const [name, setName] = useState(activity.name);
  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState(activity.title);
  const [dates, setDates] = useState(activity.dates);
  const [year, setYear] = useState(activity.year);
  const [paylink, setPaylink] = useState(activity.paylink);

  const [description, setDescription] = useState(activity.description);
  const [teacher, setTeacher] = useState(activity.teacher);
  const [purpose, setPurpose] = useState(activity.purpose);
  const [audience, setAudience] = useState(activity.audience);
  const [conditions, setConditions] = useState(activity.conditions);

  async function handleSubmit() {
   const res = await fetch(`/api/activity/${initialSlug}`, {
      method: "PATCH",
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
    
    })


     if (!res.ok) { 
      alert("Ошибка обновления мероприятия")
      return 
    }

    alert() // всплывающее окно как с модалкой было

  }

 


  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] outline-none transition focus:border-black focus:ring-4 focus:ring-black/5";

  return (
    <div className="min-h-screen py-12 px-4 mt-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
              Главная страница Админки
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/dashboard/activity" className="shrink-0 hover:text-blue transition hover:underline">
              Мероприятия
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          {slug}
        </span>
      
      </nav>
        <div>
          <h1 className="text-4xl font-bold">
            Создание мероприятия
          </h1>

          <p className="mt-2 text-gray-500">
            Заполните информацию о мероприятии. После создания все данные
            можно будет изменить.
          </p>
        </div>


        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex gap-3">
            <Sparkles className="mt-1 h-6 w-6 text-blue-600" />

            <div>
              <h2 className="font-semibold text-blue-900">
                Перед публикацией
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-700">
                Заполните основные данные, описание и информацию о
                мероприятии. Поля можно редактировать позже.
              </p>
            </div>
          </div>
        </div>

     

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Основная информация
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Название мероприятия
              </label>

              <input
                className={inputClass}
                placeholder="Например: Терапия 2026"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <p className="mt-2 text-xs text-gray-500">
                Отображается в списке мероприятий.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                URL (Slug)
              </label>

              <input
                className={inputClass}
                placeholder="terapiya-2026"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              <p className="mt-2 text-xs text-gray-500">
                Используются английские буквы, цифры и "-".
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Подзаголовок
              </label>

              <input
                className={inputClass}
                placeholder="Краткое описание мероприятия"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <Calendar size={20} />
            Проведение
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Даты проведения
              </label>

              <input
                className={inputClass}
                placeholder="15–17 сентября 2026"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Год
              </label>

              <input
                type="number"
                min={2024}
                max={2100}
                className={inputClass}
                placeholder="2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <LinkIcon size={16} />
                Ссылка на оплату
              </label>

              <input
                className={inputClass}
                placeholder="https://..."
                value={paylink}
                onChange={(e) => setPaylink(e.target.value)}
              />
            </div>

          </div>

        </div>

        <EditorCard
          title="Описание мероприятия"
          icon={<BookOpen size={20} />}
          hint="Расскажите, чему посвящено мероприятие."
          value={description}
          onChange={setDescription}
        />

        <EditorCard
          title="Спикер"
          icon={<User size={20} />}
          hint="ФИО, должность, ученая степень."
          value={teacher}
          onChange={setTeacher}
        />

        <EditorCard
          title="Цель мероприятия"
          icon={<Target size={20} />}
          hint="Что получит слушатель после прохождения."
          value={purpose}
          onChange={setPurpose}
        />

        <EditorCard
          title="Для кого мероприятие"
          icon={<Users size={20} />}
          hint="Опишите целевую аудиторию."
          value={audience}
          onChange={setAudience}
        />

        <EditorCard
          title="Условия участия"
          icon={<ClipboardList size={20} />}
          hint="Стоимость, требования и другая информация."
          value={conditions}
          onChange={setConditions}
        />

        <div className="flex justify-end">

          <button
            onClick={handleSubmit}
            className="
            rounded-2xl
            bg-black
            px-10
            py-4
            text-base
            font-semibold
            text-white
            transition
            hover:bg-gray-900
            active:scale-[0.98]
            "
          >
            Сохранить изменения
          </button>

        </div>

      </div>
    </div>
  );
}

type EditorCardProps = {
  title: string;
  hint: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
};

function EditorCard({
  title,
  hint,
  icon,
  value,
  onChange,
}: EditorCardProps) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-gray-100 p-2">
          {icon}
        </div>

        <div>

          <h2 className="font-bold text-lg">
            {title}
          </h2>

          <p className="text-sm text-gray-500">
            {hint}
          </p>

        </div>

      </div>

      <Tiptap
        value={value}
        onChange={onChange}
      />

    </div>
  );
}