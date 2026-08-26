"use client";

import { Accred } from "@/app/interface/accred";
import { useMemo, useState } from "react";

interface Props {
  schedule: Accred[];
}

export default function AccredTable({ schedule }: Props) {
  const [specialization, setSpecialization] = useState("");

  const specializations = useMemo(() => {
    return [
      ...new Set(
        schedule
          .map((item) => item.specialization)
          .filter(Boolean)
      ),
    ];
  }, [schedule]);

  const filteredSchedule = useMemo(() => {
    if (!specialization) return [];

    return schedule.filter(
      (item) => item.specialization === specialization
    );
  }, [schedule, specialization]);


  return (
    <div className="my-6">
      <div className="mb-8">

        <div className="mb-5 text-center">

          <h3 className="text-xl font-semibold text-zinc-800">
            Выберите специальность
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Чтобы посмотреть даты и время проведения аккредитации
          </p>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {specializations.map((spec) => {

            const active = specialization === spec;

            return (
              <button
                key={spec}
                type="button"
                onClick={() => setSpecialization(spec)}
                className={`
                  rounded-2xl
                  border
                  px-5
                  py-4
                  text-left
                  transition-all
                  cursor-pointer

                  ${
                    active
                      ? "bg-green text-white border-green shadow-lg"
                      : "bg-white border-zinc-200 text-zinc-700 hover:border-green hover:shadow-md"
                  }
                `}
              >

                <div className="font-medium">
                  {spec}
                </div>

                <div
                  className={`
                    text-sm mt-1
                    ${
                      active
                        ? "text-white/80"
                        : "text-zinc-400"
                    }
                  `}
                >
                  Посмотреть расписание →
                </div>

              </button>
            );
          })}

        </div>

      </div>
      {!specialization && (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">

          <p className="text-zinc-500">
            Выберите специальность выше, чтобы увидеть расписание
          </p>

        </div>
      )}
      {specialization && (
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-5 border-b border-zinc-200 bg-zinc-50">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h3 className="text-lg md:text-xl font-semibold text-zinc-800">
                  {specialization}
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  Даты проведения аккредитационных мероприятий
                </p>

              </div>


              <button
                type="button"
                onClick={() => setSpecialization("")}
                className="
                  self-start
                  sm:self-auto
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  text-zinc-500
                  hover:text-blue
                  hover:border-blue
                  transition
                  cursor-pointer
                "
              >
                Изменить
              </button>

            </div>

          </div>
          <div className="divide-y divide-zinc-100">

            {filteredSchedule.map((item) => (

              <div
                key={item.id}
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-[1fr_180px_120px]
                  gap-3
                  px-5
                  py-5
                  hover:bg-zinc-50
                  transition
                "
              >

                {/* Этап */}
                <div>

                  <div className="font-medium text-zinc-800">
                    {item.stage}
                  </div>

                  {item.education && (
                    <div className="mt-1 text-sm text-zinc-400">
                      {item.education}
                    </div>
                  )}

                </div>
                <div className="text-zinc-700 md:text-center">

                  <div className="font-medium text-green">
                    {item.day} {item.month} {item.year}
                  </div>

                  <div className="text-xs text-zinc-400 mt-1">
                    Дата проведения
                  </div>

                </div>
                <div className="md:text-right">

                  <div className="font-medium text-blue">
                    {item.time}
                  </div>

                  <div className="text-xs text-zinc-400 mt-1">
                    Время
                  </div>

                </div>

              </div>

            ))}

          </div>


          {filteredSchedule.length === 0 && (

            <div className="p-8 text-center text-zinc-500">
              Для выбранной специальности расписание не найдено.
            </div>

          )}

        </div>
      )}

    </div>
  );
}