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
    <div className="max-w-4xl mx-auto my-10">

      <select
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
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
              <th className="border px-4 py-2">Этап</th>
              <th className="border px-4 py-2">Дата</th>
              <th className="border px-4 py-2">Время</th>
            </tr>
          </thead>

          <tbody>
            {filteredSchedule.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  {item.stage}
                </td>

                <td className="border px-4 py-2">
                  {item.day}
                </td>

                <td className="border px-4 py-2">
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