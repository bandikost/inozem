"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock3,
  GraduationCap,
  Plus,
  Save,
  Settings2,
  Tag,
  Trash2,
  Wallet,
} from "lucide-react";

import BlockEditor from "./BlockEditor";
import { Block } from "@/lib/Block/Block";
import * as Toast from "@radix-ui/react-toast";

type Program = {
  specialization: string;
  id?: number;
  name: string;
  slug: string;
  price: number;
  education: string;
  category: string;
  description: string
  diplom: string;
  time: string;
  dates: string;
  blocks: Block[];
};

export default function ProgramEditor({
  initialProgram,
}: {
  initialProgram: any;
}) {
  const [program, setProgram] = useState<Program>({
    id: initialProgram?.id,
    specialization: initialProgram?.specialization || "",
    name: initialProgram?.name || "",
    slug: initialProgram?.slug || "",
    price: initialProgram?.price || 0,
    education: initialProgram?.education || "",
    category: initialProgram?.category || "",
    description: initialProgram?.description || "",
    diplom: initialProgram?.diplom || "",
    time: initialProgram?.time || "",
    dates: initialProgram?.date || "",
    blocks: initialProgram?.blocks || [],
  });

  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})
    const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("");

  const toggleBlock = (index: number) => {
    setCollapsed((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addBlock = () => {
    setProgram((p) => ({
      ...p,
      blocks: [
        ...p.blocks,
        {
          title: "",
          type: "video",
          data: {
            headlines: [],
            sources: [],
            links: [],
          },
        },
      ],
    }));
  };

  const updateBlock = (index: number, value: Block) => {
    const updated = [...program.blocks];
    updated[index] = value;

    setProgram((p) => ({
      ...p,
      blocks: updated,
    }));
  };

  const save = async () => {
    console.log(program);

    const isEdit = !!program.id;

    const url = isEdit
      ? `/api/admin/${program.id}`
      : "/api/admin";

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Save failed raw response:", text);
      return;
    }

    console.log("SUCCESS:", text);

    alert(
      isEdit
        ? "Программа обновлена"
        : "Программа создана"
    );
  };

  const removeBlock = (index: number) => {
    setProgram((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-6 pb-24">

    
      <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
            <BookOpen size={16} />
            Редактор образовательной программы
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {program.name || "Новая программа"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Основная информация и структура программы
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addBlock}
            className="cursor-pointer hover:opacity-80 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue hover:text-blue"
          >
            <Plus size={17} />
            Добавить блок
          </button>

          <button
            type="button"
            onClick={save}
            className="cursor-pointer hover:opacity-80 inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition hover:opacity-90"
          >
            <Save size={17} />
            Сохранить
          </button>
        </div>
      </div>

 
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.035)]">
        <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue">
            <Settings2 size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Основная информация
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Данные программы, её стоимость, образование и специализация
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

          <Field
            label="Название программы"
            required
            full
          >
            <input
              value={program.name}
              onChange={(e) =>
                setProgram({
                  ...program,
                  name: e.target.value,
                })
              }
              placeholder="Например: Актуальные вопросы анестезиологии и реаниматологии"
              className="input-main"
            />
          </Field>

          <Field
            label="Специальности"
            hint="Можно указать несколько через запятую"
            full
          >
            <input
              value={program.specialization}
              onChange={(e) =>
                setProgram({
                  ...program,
                  specialization: e.target.value,
                })
              }
              placeholder="Терапия, Онкология, Хирургия"
              className="input-main"
            />

            <p className="mt-2 text-xs text-gray-400">
              Например:{" "}
              <span className="text-gray-500">
                Терапия, Онкология, Хирургия
              </span>
            </p>
          </Field>

          <Field
            label="Уровень образования"
            icon={<GraduationCap size={15} />}
          >
            <input
              value={program.education}
              onChange={(e) =>
                setProgram({
                  ...program,
                  education: e.target.value,
                })
              }
              placeholder="Высшее медицинское образование"
              className="input-main"
            />
          </Field>

          <Field
            label="Категория"
            icon={<Tag size={15} />}
          >
            <input
              value={program.category}
              onChange={(e) =>
                setProgram({
                  ...program,
                  category: e.target.value,
                })
              }
              placeholder="Повышение квалификации"
              className="input-main"
            />
          </Field>

          <Field
            label="Стоимость программы"
            icon={<Wallet size={15} />}
          >
            <div className="relative">
              <input
                type="number"
                value={program.price}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    price: Number(e.target.value),
                  })
                }
                placeholder="25000"
                className="input-main pr-10"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                ₽
              </span>
            </div>
          </Field>

           <Field
            label="Диплом"
            hint="Стоимость или описание"
          >
            <input
              value={program.diplom}
              onChange={(e) =>
                setProgram({
                  ...program,
                  diplom: e.target.value,
                })
              }
              placeholder="Входит в стоимость"
              className="input-main"
            />
          </Field>

          <Field
            label="Даты"
            icon={<Clock3 size={15} />}
          >
            <input
              value={program.dates}
              onChange={(e) =>
                setProgram({
                  ...program,
                  dates: e.target.value,
                })
              }
              placeholder="06.07.2026 - 18.07.2026"
              className="input-main"
            />
          </Field>

          <Field
            label="Продолжительность"
            icon={<Clock3 size={15} />}
          >
            <div className="relative">
              <input
                value={program.time}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    time: e.target.value,
                  })
                }
                placeholder="144"
                className="input-main pr-20"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                акад. ч.
              </span>
            </div>
          </Field>

         

          <Field
            label="Slug программы"
            hint="Используется в URL"
          >
            <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <span className="flex items-center border-r border-gray-200 px-3 text-sm text-gray-400">
                /program/
              </span>

              <input
                value={program.slug}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    slug: e.target.value,
                  })
                }
                className="w-full bg-transparent px-4 py-3.5 text-sm outline-none"
              />
            </div>
          </Field>

          <br />

          <Field
            label="Описание программы"
            hint="Используется при ознакомлении с программой">
            <div className="relative">
              <textarea
                value={program.description}
                onChange={(e) =>
                  setProgram((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                maxLength={2000}
                rows={6}
                placeholder="Введите описание программы..."
                className="input-main min-h-[160px] resize-y pr-20"
              />

              <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-gray-400">
                {program.description.length} / 2000
              </span>
            </div>
          </Field>

        </div>
      </section>

      
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Структура программы
            </h2>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
              {program.blocks.length}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Управление содержанием и блоками программы
          </p>
        </div>

        <button
          type="button"
          onClick={addBlock}
          className="cursor-pointer hover:opacity-80 hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue hover:text-blue sm:flex"
        >
          <Plus size={16} />
          Добавить блок
        </button>
      </div>

      {/* Блоки программы */}
      <div className="flex flex-col gap-4">
        {program.blocks.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
            <BookOpen
              size={38}
              className="mx-auto mb-4 text-gray-300"
            />

            <p className="font-medium text-gray-600">
              В программе пока нет блоков
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Добавьте первый блок структуры программы
            </p>

            <button
              type="button"
              onClick={addBlock}
              className="cursor-pointer hover:opacity-80  mt-5 inline-flex items-center gap-2 rounded-xl bg-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Plus size={16} />
              Добавить первый блок
            </button>
          </div>
        )}

        {program.blocks.map((block, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.035)]"
          >
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-gray-200">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {block.title || `Блок ${i + 1}`}
                  </p>

            
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBlock(i)}
                  className="cursor-pointer hover:opacity-80 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition hover:border-blue hover:text-blue"
                >
                  {collapsed[i] ? (
                    <>
                      <ChevronDown size={16} />
                      Развернуть
                    </>
                  ) : (
                    <>
                      <ChevronUp size={16} />
                      Свернуть
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="cursor-pointer hover:opacity-80 inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Удалить
                </button>
              </div>
            </div>

            {!collapsed[i] && (
              <div className="p-5 md:p-6">
                <BlockEditor
                  block={block}
                  onChange={(val) =>
                    updateBlock(i, val)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Нижняя кнопка сохранения */}
      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={save}
          className="cursor-pointer hover:opacity-80 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition hover:opacity-90 sm:w-auto"
        >
          <Save size={17} />
          Сохранить изменения
        </button>
      </div>

      <style jsx>{`
        .input-main {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          background: white;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
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

<Toast.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        className="
          fixed
          bottom-6
          right-6
          z-[100]
          w-[360px]
          rounded-2xl
          border
          border-green-500
          bg-green-300
          
          p-5
          shadow-[0_15px_50px_rgba(0,0,0,0.15)]
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-80
          data-[state=open]:fade-in-0
          data-[state=open]:slide-in-from-right-5
          data-[state=closed]:slide-out-to-right-5
        "
      >
        <Toast.Title className="font-semibold !text-green-900">
          {toastMessage}
        </Toast.Title>
      
      </Toast.Root>


    </div>
  );
}

function Field({
  label,
  required = false,
  hint,
  icon,
  full = false,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  icon?: React.ReactNode;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
          {icon}
          {label}

          {required && (
            <span className="text-red-500">
              *
            </span>
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