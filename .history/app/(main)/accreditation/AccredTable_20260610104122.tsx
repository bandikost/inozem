'use client'

import { Accred } from "@/app/interface/accred";
import { useMemo, useState } from "react";

interface Props {
  schedule: Accred[]
}

export default function AccredTable({ schedule }: Props) {
  const [specialization, setSpecialization] = useState("");

  const specializations = [
    ...new Set(schedule.map(item => item.specialization))
  ];

  const filteredSchedule = useMemo(() => {
    if (!specialization) return [];

    return schedule.filter(
      item => item.specialization === specialization
    );
  }, [schedule, specialization]);

  return (
    <div className="my-10 flex flex-col justify-center items-center">

      <select
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className=" border border-gray-300 rounded-lg px-4 py-2 select w-full max-w-[280px]"
      >
        <option value="">Выберите специальность</option>

        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {specialization && (
  <div className="w-full max-w-4xl mt-8 rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">

    <div className="grid grid-cols-12 bg-gray-50 text-sm font-semibold text-gray-600 px-4 py-3">
      <div className="col-span-4 text-lg">Этап</div>
      <div className="col-span-4 text-center text-lg">Дата</div>
      <div className="col-span-4 text-right text-lg">Время</div>
    </div>

    <div className="divide-y divide-gray-100">
      {filteredSchedule.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50 transition"
        >
          <div className="col-span-4 font-bold text-gray-700 border-r border-gray-300 pr-4 text-lg">
            {item.stage}
          </div>

          <div className="col-span-4 text-center border-r border-gray-300 px-4 text-default text-lg">
            {item.month} {item.day}
          </div>

          <div className="col-span-4 text-right pl-4 text-default text-lg">
            {item.time}
          </div>
        </div>
      ))}
    </div>

    {filteredSchedule.length === 0 && (
      <div className="p-6 text-center text-gray-500">
        Расписание не найдено
      </div>
    )}

  </div>
)}

    </div>
  );
}