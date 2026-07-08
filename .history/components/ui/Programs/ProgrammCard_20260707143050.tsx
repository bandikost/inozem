"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Clock3,
  Calendar,
  GraduationCap,
  Stethoscope,
  BadgeRussianRuble,
  ArrowRight,
} from "lucide-react";

import { ProgramRow } from "@/lib/programm";
import { getHourWord } from "../GetHourWord";

type ProgrammCardProps = {
  filteredPrograms: ProgramRow[];
  visibleItems: number;
  handleShowMore: () => void;
}

function ProgrammCard({ filteredPrograms, visibleItems, handleShowMore }: ProgrammCardProps) {

    const [openedDates, setOpenedDates] = useState<number | null>(null)
    const toggleDates = (id: number) => {
    setOpenedDates(prev => prev === id ? null : id);
    }        
    
    
                  
    
  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex justify-between items-center px-2">
        <p className="text-zinc-500 text-lg">
          Найдено{" "}
          
            {filteredPrograms.length}
          {" "}
          программ
        </p>
      </div>

      {filteredPrograms.slice(0, visibleItems).map((program) => {

        const dates = program.dates
                    ?.split(/\r?\n/ )
                    .map(date => date.trim())
                    .filter(Boolean) ?? []

        const filtredName = dates.length - 2 === 1 ? "дата" : "даты"             

        return (
              <article
          key={program.id}
          className="
          bg-white
          rounded-3xl
          border
          border-zinc-200
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
          overflow-hidden
          "
        >
            
          <div className="p-4 xs:p-6">

            <div className="flex justify-between gap-5">

              <div className="flex-1">

                <h2 className="text-2xl font-semibold leading-snug text-zinc-900">
                  {program.name}
                </h2>

                {program.time >= 432 && (
                  <span className="inline-flex mt-4 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm !font-normal">
                    Профессиональная переподготовка
                  </span>
                )}

                {program.bannerName && (
                  <span className="inline-flex ml-3 mt-4 rounded-full bg-red-500 text-white px-3 py-1 text-sm font-medium">
                    {program.bannerName}
                  </span>
                )}
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-2 mt-8">

              <div className="rounded-xl bg-gray-50 border border-zinc-300  p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <Calendar size={18} />
                  
                  <span className="!font-normal">Даты</span>
                </div>

                <div className="flex flex-col gap-1">

                    {dates.slice(0, 2).map(date => (
                        <p className="!font-normal text-sm w-full max-w-[300px]" key={date}>{date}</p>
                    ))}

                    {openedDates === program.id &&
                        dates.slice(2).map(date => (
                        <p className="!font-normal text-sm" key={date}>{date}</p>
                        ))
                    }

                </div>
                {dates.length - 2 > 0 && (
                    <button
                        className="
                            mt-4
                            text-md
                            text-center
                            !font-normal
                            cursor-pointer
                            border
                            border-gray-200
                            px-2
                            py-1
                            rounded-xl
                            hover:bg-prpl
                            hover:text-white
                            transition
                        "
                        onClick={() => toggleDates(program.id)}
                    >
                        {`и еще ${dates.length - 2} ${filtredName} ${
                            openedDates === program.id ? "Скрыть" : "Показать"
                        }`}
                    </button>
                )}
                
              </div>

              <div className="rounded-xl bg-gray-50 border border-zinc-300 p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <GraduationCap size={18} />
                  <span className="!font-normal">
                    Образование
                  </span>
                </div>

                <p className="text-zinc-700 !font-normal">
                  {program.education}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-zinc-300 p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <Stethoscope size={18} />
                  <span className="!font-normal">
                    Направление
                  </span>
                </div>

                <p className="text-zinc-700 !font-normal">
                  {program.specialization}
                </p>
              </div>

            </div>

            <div className="mt-8 border-t pt-6 border-gray-400 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

              <div className="flex flex-wrap gap-6">

                <div className="flex items-center gap-2">
                  <Clock3 className="text-blue" size={20} />
                  <span className="!font-normal text-zinc-800">
                    {program.time}
                    {program.time_secondary
                      ? ` / ${program.time_secondary}`
                      : ""}
                    {" "}
                    акад. {getHourWord(Number(program.time))}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <BadgeRussianRuble
                    className="text-green-600"
                    size={20}
                  />

                  <span className="text-2xl font-bold text-green-700">
                    {program.price} ₽
                  </span>
                </div>

              </div>

              <Link
                href={`/programs/${program.slug}`}
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue
                px-6
                py-3
                !text-white
                font-medium
                hover:opacity-90
                transition
                "
              >
                Подробнее
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>
        </article>
        )
        
      
      })}

      {visibleItems < filteredPrograms.length && (
        <button
          onClick={handleShowMore}
          className="
          self-center
          mt-4
          rounded-xl
          bg-zinc-900
          text-white
          px-8
          py-4
          hover:bg-zinc-800
          transition
          "
        >
          Показать ещё
        </button>
      )}
    </div>
  );
}

export default React.memo(ProgrammCard);