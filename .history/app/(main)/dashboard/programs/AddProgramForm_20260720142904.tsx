"use client";

import { useState } from "react";

import {
  HIGHER_SPECIALTIES,
  SECONDARY_SPECIALTIES,
} from "@/data/specialties";


const ALL_HIGHER = "*ALL_HIGHER*";
const ALL_SECONDARY = "*ALL_SECONDARY*";


export default function AddProgramForm() {

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [dates, setDates] = useState("");

  const [education, setEducation] = useState("");

  // Теперь здесь массив, а не одна строка
  const [selectedSpecialties, setSelectedSpecialties] =
    useState<string[]>([]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | Выбор образования
  |--------------------------------------------------------------------------
  */

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const value = e.target.value;

    setEducation(value);

    // При смене образования сбрасываем специальности
    setSelectedSpecialties([]);

  };


  /*
  |--------------------------------------------------------------------------
  | Добавление / удаление специальности
  |--------------------------------------------------------------------------
  */

  const handleSpecialtyChange = (
    specialty: string
  ) => {

    setSelectedSpecialties((prev) => {

      /*
      |--------------------------------------------------------------------------
      | Если выбрали "Все специальности"
      |--------------------------------------------------------------------------
      */

      if (
        specialty === ALL_HIGHER ||
        specialty === ALL_SECONDARY
      ) {

        return [specialty];

      }


      /*
      |--------------------------------------------------------------------------
      | Если раньше было выбрано "Все специальности",
      | при выборе конкретной убираем этот вариант
      |--------------------------------------------------------------------------
      */

      const currentSpecialties = prev.filter(
        (item) =>
          item !== ALL_HIGHER &&
          item !== ALL_SECONDARY
      );


      /*
      |--------------------------------------------------------------------------
      | Если специальность уже выбрана —
      | удаляем её
      |--------------------------------------------------------------------------
      */

      if (
        currentSpecialties.includes(specialty)
      ) {

        return currentSpecialties.filter(
          (item) => item !== specialty
        );

      }


      /*
      |--------------------------------------------------------------------------
      | Если специальности ещё нет —
      | добавляем её
      |--------------------------------------------------------------------------
      */

      return [
        ...currentSpecialties,
        specialty,
      ];

    });

  };


  /*
  |--------------------------------------------------------------------------
  | Удаление выбранной специальности
  |--------------------------------------------------------------------------
  */

  const removeSpecialty = (
    specialty: string
  ) => {

    setSelectedSpecialties((prev) =>
      prev.filter(
        (item) => item !== specialty
      )
    );

  };


  /*
  |--------------------------------------------------------------------------
  | Создание программы
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);


    try {

      const res = await fetch(
        "/api/postPrograms",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name,

            time: Number(time),

            dates,

            education,

            /*
            Превращаем массив:

            [
              "Терапия",
              "Онкология",
              "Хирургия"
            ]

            в строку:

            "Терапия, Онкология, Хирургия"
            */

            specialization:
              selectedSpecialties.join(", "),

            isFavorite:
              isFavorite ? 1 : 0,

            description,

            price: Number(price),

            slug,

          }),

        }
      );


      if (!res.ok) {

        throw new Error(
          "Ошибка создания программы"
        );

      }


      await res.json();


      window.location.reload();


    } catch (error) {

      console.error(error);

      alert(
        "Ошибка при создании программы"
      );

      setLoading(false);

    }

  };


  /*
  |--------------------------------------------------------------------------
  | Список специальностей в зависимости от образования
  |--------------------------------------------------------------------------
  */

  const specialties =
    education === "Высшее"
      ? HIGHER_SPECIALTIES
      : education === "Среднее"
        ? SECONDARY_SPECIALTIES
        : [];


  return (

    <section
      className="
        relative
        mx-auto
        mt-16
        w-full
        max-w-5xl
        px-6
        pb-20
      "
    >


      {/* LOADING */}

      {loading && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              rounded-2xl
              bg-white
              px-10
              py-8
              shadow-2xl
            "
          >

            <div
              className="
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-gray-200
                border-t-blue-600
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-gray-600
              "
            >
              Создание программы...
            </span>

          </div>

        </div>

      )}


      {/* FORM */}

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


        {/* =======================================================
            ОСНОВНАЯ ИНФОРМАЦИЯ
        ======================================================= */}

        <div
          className="
            border-b
            border-gray-100
            p-8
          "
        >

          <div
            className="
              mb-7
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-gray-900
              "
            >
              Основная информация
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Название и ключевые характеристики программы
            </p>

          </div>


          <div
            className="
              space-y-6
            "
          >


            {/* НАЗВАНИЕ */}

            <Field
              label="Название программы"
              required
              hint="Отображается на странице программы"
            >

              <input
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="
                  Например:
                  Актуальные вопросы анестезиологии и реаниматологии
                "
                className="input-main"
              />

            </Field>


            {/* ОБРАЗОВАНИЕ */}

            <Field
              label="Уровень образования"
              required
            >

              <select
                required
                value={education}
                onChange={handleEducationChange}
                className="
                  input-main
                  cursor-pointer
                "
              >

                <option value="">
                  Выберите уровень образования
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


            {/* СПЕЦИАЛЬНОСТИ */}

            {education !== "Без мед.образования" && (

              <Field
                label="Специальности"
                hint="Можно выбрать несколько"
              >

                {education === "" ? (

                  <div
                    className="
                      flex
                      min-h-[52px]
                      items-center
                      rounded-xl
                      border
                      border-dashed
                      border-gray-300
                      px-4
                      text-sm
                      text-gray-400
                    "
                  >
                    Сначала выберите уровень образования
                  </div>

                ) : (

                  <select
                    value=""
                    onChange={(e) => {

                      if (
                        e.target.value
                      ) {

                        handleSpecialtyChange(
                          e.target.value
                        );

                      }

                    }}
                    className="
                      input-main
                      cursor-pointer
                    "
                  >

                    <option value="">
                      Добавить специальность
                    </option>


                    {/* ВСЕ СПЕЦИАЛЬНОСТИ */}

                    <option
                      value={
                        education === "Высшее"
                          ? ALL_HIGHER
                          : ALL_SECONDARY
                      }
                    >
                      Все специальности данного уровня
                    </option>


                    {/* КОНКРЕТНЫЕ СПЕЦИАЛЬНОСТИ */}

                    {specialties.map(
                      (specialty) => (

                        <option
                          key={specialty}
                          value={specialty}
                          disabled={selectedSpecialties.includes(
                            specialty
                          )}
                        >
                          {specialty}
                        </option>

                      )
                    )}

                  </select>

                )}

              </Field>

            )}


            {/* ВЫБРАННЫЕ СПЕЦИАЛЬНОСТИ */}

            {selectedSpecialties.length > 0 && (

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-5
                "
              >

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                  >
                    Выбранные специальности
                  </p>


                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSpecialties([])
                    }
                    className="
                      text-xs
                      text-red-500
                      transition
                      hover:opacity-60
                    "
                  >
                    Очистить
                  </button>

                </div>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {selectedSpecialties.map(
                    (specialty) => (

                      <div
                        key={specialty}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-full
                          bg-white
                          px-3
                          py-2
                          text-sm
                          shadow-sm
                          ring-1
                          ring-gray-200
                        "
                      >

                        <span>

                          {specialty === ALL_HIGHER
                            ? "Все высшие специальности"
                            : specialty === ALL_SECONDARY
                              ? "Все средние специальности"
                              : specialty
                          }

                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            removeSpecialty(
                              specialty
                            )
                          }
                          className="
                            text-gray-400
                            transition
                            hover:text-red-500
                          "
                        >
                          ×
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* ХАРАКТЕРИСТИКИ */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-3
              "
            >


              {/* ЧАСЫ */}

              <Field
                label="Продолжительность"
              >

                <div
                  className="
                    relative
                  "
                >

                  <input
                    type="number"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
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


              {/* ЦЕНА */}

              <Field
                label="Стоимость"
              >

                <div
                  className="
                    relative
                  "
                >

                  <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    placeholder="25000"
                    className="
                      input-main
                      pr-12
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


              {/* ДАТЫ */}

              <Field
                label="Даты проведения"
              >

                <input
                  value={dates}
                  onChange={(e) =>
                    setDates(e.target.value)
                  }
                  placeholder="15–30 сентября"
                  className="input-main"
                />

              </Field>

            </div>


          </div>

        </div>


        {/* =======================================================
            ОПИСАНИЕ
        ======================================================= */}

        <div
          className="
            border-b
            border-gray-100
            bg-gray-50/50
            p-8
          "
        >

          <div
            className="
              mb-7
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-gray-900
              "
            >
              Описание программы
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Краткое описание, которое увидят пользователи
            </p>

          </div>


          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="
              Опишите содержание и основные особенности
              образовательной программы...
            "
            rows={7}
            className="
              input-main
              min-h-[180px]
              resize-y
            "
          />


          <div
            className="
              mt-3
              text-right
              text-xs
              text-gray-400
            "
          >
            {description.length} символов
          </div>

        </div>


        {/* =======================================================
            НАСТРОЙКИ
        ======================================================= */}

        <div
          className="
            border-b
            border-gray-100
            p-8
          "
        >

          <div
            className="
              mb-7
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-gray-900
              "
            >
              Настройки публикации
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Дополнительные параметры программы
            </p>

          </div>


          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
            "
          >


            {/* SLUG */}

            <Field
              label="URL программы"
              required
              hint="Используется в адресе страницы"
            >

              <div
                className="
                  flex
                  items-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                "
              >

                <span
                  className="
                    whitespace-nowrap
                    border-r
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    text-gray-400
                  "
                >
                  /program/
                </span>


                <input
                  required
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value)
                  }
                  placeholder="anesteziologiya"
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


            {/* ИЗБРАННОЕ */}

            <div
              className="
                flex
                items-end
              "
            >

              <label
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-4
                  transition
                  hover:border-blue
                "
              >

                <div>

                  <p
                    className="
                      font-medium
                      text-gray-900
                    "
                  >
                    Рекомендуемая программа
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-500
                    "
                  >
                    Показывать в избранных программах
                  </p>

                </div>


                <div
                  className={`
                    relative
                    h-7
                    w-12
                    rounded-full
                    transition
                    ${
                      isFavorite
                        ? "bg-blue"
                        : "bg-gray-200"
                    }
                  `}
                >

                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={(e) =>
                      setIsFavorite(
                        e.target.checked
                      )
                    }
                    className="peer sr-only"
                  />


                  <span
                    className={`
                      absolute
                      left-1
                      top-1
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      shadow-sm
                      transition
                      ${
                        isFavorite
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                  />

                </div>

              </label>

            </div>

          </div>

        </div>


        {/* =======================================================
            КНОПКА
        ======================================================= */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-6
            bg-white
            px-8
            py-6
          "
        >

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
              ? "Создание..."
              : "Создать программу"
            }

          </button>

        </div>

      </form>


      {/* СТИЛИ */}

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

          box-shadow:
            0 0 0 3px
            rgb(37 99 235 / 0.1);

        }

      `}</style>


    </section>

  );

}


/*
|--------------------------------------------------------------------------
| Универсальное поле
|--------------------------------------------------------------------------
*/

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
            text-sm
            font-semibold
            text-gray-700
          "
        >

          {label}

          {required && (

            <span
              className="
                ml-1
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