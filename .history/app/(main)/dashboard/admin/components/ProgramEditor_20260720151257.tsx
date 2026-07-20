"use client";

import { useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings2,
  BookOpen,
  Clock3,
  Wallet,
  GraduationCap,
  CalendarDays,
  Tag,
} from "lucide-react";

import BlockEditor from "./BlockEditor";
import { Block } from "@/lib/Block/Block";


type Program = {
  id?: number;

  name: string;
  slug: string;

  specialization: string;
  education: string;
  category: string;
  dates: string;

  price: number;
  diplom: string;
  time: string;

  blocks: Block[];
};


export default function ProgramEditor({
  initialProgram,
}: {
  initialProgram: any;
}) {


  /*
  |--------------------------------------------------------------------------
  | PROGRAM STATE
  |--------------------------------------------------------------------------
  */

  const [program, setProgram] = useState<Program>({

    id: initialProgram?.id,

    name: initialProgram?.name || "",

    slug: initialProgram?.slug || "",

    specialization:
      initialProgram?.specialization || "",

    education:
      initialProgram?.education || "",

    category:
      initialProgram?.category || "",

    dates:
      initialProgram?.dates || "",

    price:
      initialProgram?.price || 0,

    diplom:
      initialProgram?.diplom || "",

    time:
      initialProgram?.time || "",

    blocks:
      initialProgram?.blocks || [],

  });


  /*
  |--------------------------------------------------------------------------
  | UI STATE
  |--------------------------------------------------------------------------
  */

  const [collapsed, setCollapsed] =
    useState<Record<number, boolean>>({});

  const [saving, setSaving] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | UPDATE PROGRAM FIELD
  |--------------------------------------------------------------------------
  */

  const updateProgram = <K extends keyof Program>(
    field: K,
    value: Program[K]
  ) => {

    setProgram((prev) => ({

      ...prev,

      [field]: value,

    }));

  };


  /*
  |--------------------------------------------------------------------------
  | BLOCKS
  |--------------------------------------------------------------------------
  */

  const addBlock = () => {

    setProgram((prev) => ({

      ...prev,

      blocks: [

        ...prev.blocks,

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


  const updateBlock = (
    index: number,
    value: Block
  ) => {

    setProgram((prev) => {

      const blocks = [...prev.blocks];

      blocks[index] = value;

      return {

        ...prev,

        blocks,

      };

    });

  };


  const removeBlock = (
    index: number
  ) => {

    const confirmed =
      window.confirm(
        "Удалить этот блок?"
      );

    if (!confirmed) return;


    setProgram((prev) => ({

      ...prev,

      blocks: prev.blocks.filter(
        (_, i) => i !== index
      ),

    }));

  };


  const toggleBlock = (
    index: number
  ) => {

    setCollapsed((prev) => ({

      ...prev,

      [index]: !prev[index],

    }));

  };


  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  const save = async () => {

    setSaving(true);


    try {

      const isEdit =
        Boolean(program.id);


      const url = isEdit

        ? `/api/admin/${program.id}`

        : "/api/admin";


      const method = isEdit
        ? "PUT"
        : "POST";


      const res = await fetch(

        url,

        {

          method,

          headers: {

            "Content-Type":
              "application/json",

          },

          body:
            JSON.stringify(program),

        }

      );


      const text =
        await res.text();


      if (!res.ok) {

        console.error(
          "Save failed:",
          text
        );

        alert(
          "Не удалось сохранить изменения"
        );

        return;

      }


      alert(

        isEdit

          ? "Программа обновлена"

          : "Программа создана"

      );


    } catch (error) {

      console.error(error);

      alert(
        "Ошибка при сохранении"
      );


    } finally {

      setSaving(false);

    }

  };


  return (

    <div
      className="
        mx-auto
        mt-12
        w-full
        max-w-6xl
        pb-32
      "
    >


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-7
          shadow-[0_12px_40px_rgba(0,0,0,0.05)]
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <div
            className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-400
            "
          >

            <BookOpen size={16} />

            Редактор образовательной программы

          </div>


          <h1
            className="
              text-2xl
              font-semibold
              tracking-tight
              text-gray-900
              md:text-3xl
            "
          >

            {program.name ||
              "Новая программа"}

          </h1>


          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >

            Редактирование основной информации
            и структуры программы

          </p>

        </div>


        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              rounded-full
              bg-green-50
              px-3
              py-1.5
              text-xs
              font-medium
              text-green-700
            "
          >

            {program.id
              ? "Программа создана"
              : "Новая программа"}

          </span>

        </div>

      </div>


      {/* =====================================================
          MAIN INFORMATION
      ====================================================== */}

      <section
        className="
          mb-6
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-[0_12px_40px_rgba(0,0,0,0.04)]
        "
      >

        <SectionHeader
          icon={<Settings2 size={19} />}
          title="Основная информация"
          description="
            Данные, которые используются
            в карточке и фильтрации программы
          "
        />


        <div
          className="
            grid
            grid-cols-1
            gap-6
            p-7
            md:grid-cols-2
          "
        >


          {/* NAME */}

          <Field
            label="Название программы"
            required
            full
          >

            <input
              value={program.name}

              onChange={(e) =>
                updateProgram(
                  "name",
                  e.target.value
                )
              }

              placeholder="
                Например:
                Актуальные вопросы анестезиологии
              "

              className="input-main"
            />

          </Field>


          {/* SPECIALIZATION */}

          <Field
            label="Специальности"
            hint="
              Можно указать несколько через запятую
            "
            full
          >

            <input
              value={
                program.specialization
              }

              onChange={(e) =>
                updateProgram(
                  "specialization",
                  e.target.value
                )
              }

              placeholder="
                Терапия, Онкология, Хирургия
              "

              className="input-main"
            />


            <p
              className="
                mt-2
                text-xs
                text-gray-400
              "
            >

              Например:
              <span
                className="
                  ml-1
                  text-gray-500
                "
              >
                Терапия, Онкология, Хирургия

              </span>

            </p>

          </Field>


          {/* EDUCATION */}

          <Field
            label="Уровень образования"
            icon={<GraduationCap size={15} />}
          >

            <select
              value={program.education}

              onChange={(e) =>
                updateProgram(
                  "education",
                  e.target.value
                )
              }

              className="input-main cursor-pointer"
            >

              <option value="">
                Выберите образование
              </option>

              <option value="Высшее">
                Высшее
              </option>

              <option value="Среднее">
                Среднее
              </option>

              <option value="Без мед.образования">
                Без медицинского образования
              </option>

            </select>

          </Field>


          {/* CATEGORY */}

          <Field
            label="Категория"
            icon={<Tag size={15} />}
          >

            <input
              value={program.category}

              onChange={(e) =>
                updateProgram(
                  "category",
                  e.target.value
                )
              }

              placeholder="
                Повышение квалификации
              "

              className="input-main"
            />

          </Field>


          {/* DATES */}

          <Field
            label="Даты проведения"
            icon={<CalendarDays size={15} />}
          >

            <input
              value={program.dates}

              onChange={(e) =>
                updateProgram(
                  "dates",
                  e.target.value
                )
              }

              placeholder="
                15–30 сентября
              "

              className="input-main"
            />

          </Field>


          {/* SLUG */}

          <Field
            label="Slug программы"
            hint="Используется в URL"
          >

            <div
              className="
                flex
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-gray-50
              "
            >

              <span
                className="
                  flex
                  items-center
                  border-r
                  border-gray-200
                  px-3
                  text-sm
                  text-gray-400
                "
              >

                /program/

              </span>


              <input
                value={program.slug}

                onChange={(e) =>
                  updateProgram(
                    "slug",
                    e.target.value
                  )
                }

                className="
                  w-full
                  bg-transparent
                  px-4
                  py-3.5
                  text-sm
                  outline-none
                "
              />

            </div>

          </Field>


          {/* PRICE */}

          <Field
            label="Стоимость программы"
            icon={<Wallet size={15} />}
          >

            <div
              className="relative"
            >

              <input
                type="number"

                value={program.price}

                onChange={(e) =>
                  updateProgram(
                    "price",
                    Number(
                      e.target.value
                    )
                  )
                }

                placeholder="25000"

                className="
                  input-main
                  pr-10
                "
              />


              <span
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-gray-400
                "
              >

                ₽

              </span>

            </div>

          </Field>


          {/* HOURS */}

          <Field
            label="Продолжительность"
            icon={<Clock3 size={15} />}
          >

            <div
              className="relative"
            >

              <input
                value={program.time}

                onChange={(e) =>
                  updateProgram(
                    "time",
                    e.target.value
                  )
                }

                placeholder="144"

                className="
                  input-main
                  pr-20
                "
              />


              <span
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-gray-400
                "
              >

                акад. ч.

              </span>

            </div>

          </Field>


          {/* DIPLOM */}

          <Field
            label="Диплом"
            hint="Стоимость / описание"
          >

            <input
              value={program.diplom}

              onChange={(e) =>
                updateProgram(
                  "diplom",
                  e.target.value
                )
              }

              placeholder="
                Входит в стоимость
              "

              className="input-main"
            />

          </Field>


        </div>

      </section>


      {/* =====================================================
          BLOCKS HEADER
      ====================================================== */}

      <div
        className="
          mb-4
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-semibold
              text-gray-900
            "
          >

            Структура программы

          </h2>


          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >

            {program.blocks.length}

            {" "}

            {program.blocks.length === 1
              ? "блок"
              : "блоков"}

            {" "}
            содержимого

          </p>

        </div>


        <button
          type="button"
          onClick={addBlock}

          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            transition
            hover:border-blue
            hover:text-blue
          "
        >

          <Plus size={17} />

          Добавить блок

        </button>

      </div>


      {/* =====================================================
          BLOCKS
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-5
        "
      >

        {program.blocks.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-gray-300
              bg-gray-50
              p-12
              text-center
            "
          >

            <BookOpen
              className="
                mx-auto
                mb-4
                text-gray-300
              "
              size={38}
            />


            <p
              className="
                font-medium
                text-gray-600
              "
            >

              В программе пока нет блоков

            </p>


            <p
              className="
                mt-1
                text-sm
                text-gray-400
              "
            >

              Добавьте первый блок структуры программы

            </p>

          </div>

        )}


        {program.blocks.map(
          (block, index) => (

            <section
              key={index}

              className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              "
            >


              {/* BLOCK HEADER */}

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  border-b
                  border-gray-100
                  bg-gray-50/70
                  p-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-sm
                      font-semibold
                      text-gray-500
                      shadow-sm
                      ring-1
                      ring-gray-200
                    "
                  >

                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}

                  </div>


                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-900
                      "
                    >

                      {block.title ||
                        "Новый блок"}

                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-400
                      "
                    >

                      Тип блока:
                      {" "}
                      {block.type}

                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      toggleBlock(
                        index
                      )
                    }

                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-2
                      text-sm
                      text-gray-600
                      transition
                      hover:border-blue
                      hover:text-blue
                    "
                  >

                    {collapsed[index] ? (

                      <>

                        <ChevronDown
                          size={16}
                        />

                        Развернуть

                      </>

                    ) : (

                      <>

                        <ChevronUp
                          size={16}
                        />

                        Свернуть

                      </>

                    )}

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      removeBlock(
                        index
                      )
                    }

                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-red-100
                      bg-red-50
                      px-3
                      py-2
                      text-sm
                      text-red-600
                      transition
                      hover:bg-red-100
                    "
                  >

                    <Trash2
                      size={16}
                    />

                    Удалить

                  </button>

                </div>

              </div>


              {/* BLOCK CONTENT */}

              {!collapsed[index] && (

                <div
                  className="
                    p-5
                    md:p-7
                  "
                >

                  <BlockEditor
                    block={block}
                    onChange={(value) =>
                      updateBlock(
                        index,
                        value
                      )
                    }
                  />

                </div>

              )}

            </section>

          )
        )}

      </div>


      {/* =====================================================
          FIXED SAVE BAR
      ====================================================== */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          border-t
          border-gray-200
          bg-white/90
          px-4
          py-4
          shadow-[0_-10px_30px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
          md:left-[250px]
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-6xl
            items-center
            justify-between
            gap-4
          "
        >

          <div
            className="
              hidden
              text-sm
              text-gray-500
              sm:block
            "
          >

            Все изменения сохраняются
            после нажатия кнопки

          </div>


          <button
            type="button"
            onClick={save}
            disabled={saving}

            className="
              ml-auto
              inline-flex
              min-w-[230px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue/20
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Save
              size={17}
            />

            {saving
              ? "Сохранение..."
              : "Сохранить изменения"}

          </button>

        </div>

      </div>


      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx>{`

        .input-main {

          width: 100%;

          border: 1px solid
            rgb(229 231 235);

          border-radius:
            0.75rem;

          background:
            white;

          padding:
            0.875rem 1rem;

          font-size:
            0.95rem;

          color:
            rgb(17 24 39);

          outline:
            none;

          transition:
            all 0.2s ease;

        }


        .input-main::placeholder {

          color:
            rgb(156 163 175);

        }


        .input-main:focus {

          border-color:
            rgb(37 99 235);

          box-shadow:
            0 0 0 3px
            rgb(37 99 235 / 0.1);

        }

      `}</style>


    </div>

  );

}


/*
|--------------------------------------------------------------------------
| SECTION HEADER
|--------------------------------------------------------------------------
*/

function SectionHeader({

  icon,

  title,

  description,

}: {

  icon: React.ReactNode;

  title: string;

  description: string;

}) {

  return (

    <div
      className="
        flex
        items-start
        gap-4
        border-b
        border-gray-100
        p-7
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue
        "
      >

        {icon}

      </div>


      <div>

        <h2
          className="
            text-lg
            font-semibold
            text-gray-900
          "
        >

          {title}

        </h2>


        <p
          className="
            mt-1
            text-sm
            text-gray-500
          "
        >

          {description}

        </p>

      </div>

    </div>

  );

}


/*
|--------------------------------------------------------------------------
| FIELD
|--------------------------------------------------------------------------
*/

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

    <div
      className={
        full
          ? "md:col-span-2"
          : ""
      }
    >

      <div
        className="
          mb-2
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <label
          className="
            flex
            items-center
            gap-1.5
            text-sm
            font-semibold
            text-gray-700
          "
        >

          {icon}

          {label}

          {required && (

            <span
              className="
                text-red-500
              "
            >
              *
            </span>

          )}

        </label>


        {hint && (

          <span
            className="
              hidden
              text-xs
              text-gray-400
              sm:block
            "
          >

            {hint}

          </span>

        )}

      </div>


      {children}

    </div>

  );

}