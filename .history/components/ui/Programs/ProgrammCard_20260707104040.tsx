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

    const [visibleDates, setVisibleDates] = useState(false)
    const handleShowDate = () => setVisibleDates(prev => !prev)               
                  
    
  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex justify-between items-center">
        <p className="text-zinc-500 text-lg">
          Найдено{" "}
          <span className="font-semibold text-zinc-900">
            {filteredPrograms.length}
          </span>{" "}
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
            
          <div className="p-8">

            <div className="flex justify-between gap-5">

              <div className="flex-1">

                <h2 className="text-2xl font-semibold leading-snug text-zinc-900">
                  {program.name}
                </h2>

                {program.time >= 432 && (
                  <span className="inline-flex mt-4 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium">
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

              <div className="rounded-xl bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <Calendar size={18} />
                  
                  <span className="font-medium">Даты</span>
                </div>

                <div className="flex flex-col gap-2">
                    {dates.slice(0, 2).map((date) => (
                        <p key={date}>{date}</p>
                    ))}
                    {visibleDates}
                </div>
                <button onClick={handleShowDate()}> {dates.length - 2 < 0 ? "" : `и еще ${dates.length - 2} ${filtredName}` }</button>
                
              </div>

              <div className="rounded-xl bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <GraduationCap size={18} />
                  <span className="font-medium">
                    Образование
                  </span>
                </div>

                <p className="text-zinc-700">
                  {program.education}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-blue mb-2">
                  <Stethoscope size={18} />
                  <span className="font-medium">
                    Направление
                  </span>
                </div>

                <p className="text-zinc-700">
                  {program.specialization}
                </p>
              </div>

            </div>

            <div className="mt-8 border-t pt-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

              <div className="flex flex-wrap gap-6">

                <div className="flex items-center gap-2">
                  <Clock3 className="text-blue" size={20} />
                  <span className="font-medium text-zinc-800">
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
                text-white
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