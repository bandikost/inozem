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
        className=" border border-gray-300 rounded-lg px-4 py-2 select "
      >
        <option value="">Выберите специальность</option>

        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {specialization && (
        <table className="w-full mt-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#0a9688] text-white">
              <th className="border border-gray-300 px-4 py-3 text-left text-2xl">Этап</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-2xl">Дата</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-2xl">Время</th>
            </tr>
          </thead>

          <tbody>
            {filteredSchedule.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-3 text-left text-xl">
                  {item.stage}
                </td>

                <td className="border border-gray-300 px-4 py-3 text-left text-xl">
                  {item.day}
                </td>

                <td className="border border-gray-300 px-4 py-3 text-left text-xl">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}