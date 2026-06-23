"use client";

import { Accred } from "@/app/interface/accred";
import { useMemo, useState } from "react";

interface Props {
  schedule: Accred[];
}

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function ScheduleEditor({ schedule }: Props) {
  const [rows, setRows] = useState<Accred[]>(schedule);

  // Все программы без повторений
  const programs = useMemo(
    () => [...new Set(schedule.map((item) => item.specialization))],
    [schedule]
  );

  // Выбранная программа
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);

  // Показываем только выбранную программу
  const filteredRows = rows.filter(
    (row) => row.specialization === selectedProgram
  );

  const handleChange = (
    id: number,
    field: "day" | "month" | "year" | "time",
    value: number | string
  ) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  async function save(row: Accred) {
    const res = await fetch(`/api/accred/schedule/${row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: row.day,
        month: row.month,
        year: row.year,
        time: row.time,
      }),
    });

    if (res.ok) {
      alert("Сохранено");
    } else {
      alert("Ошибка");
    }
  }

  return (
    <>
      <div className="mb-8">
        <label className="block text-lg font-normal mb-2">
          Выберите программу
        </label>

        <select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="w-full border rounded-xl p-3 text-lg "
        >
          {programs.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredRows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl bg-white border border-gray-200 shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-prpl">
              {row.stage}
            </h2>

            <p className="text-gray-500 mb-6">
              {row.specialization}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-lg !font-normal">
                  День
                </label>

                <input
                  type="number"
                  value={row.day}
                  onChange={(e) =>
                    handleChange(row.id, "day", Number(e.target.value))
                  }
                  className="w-full border rounded-lg p-2 text-lg !font-normal !text-gray-700 border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-lg !font-normal">
                  Месяц
                </label>

                <select
                  value={row.month}
                  onChange={(e) =>
                    handleChange(row.id, "month", e.target.value)
                  }
                  className="w-full border rounded-lg p-2 text-lg !font-normal !text-gray-700 border-gray-300"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-lg !font-normal">
                  Год
                </label>

                <input
                  type="number"
                  value={row.year}
                  onChange={(e) =>
                    handleChange(row.id, "year", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-lg !text-gray-700 !font-normal"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-lg !font-normal">
                  Время
                </label>

                <input
                  type="time"
                  value={row.time}
                  onChange={(e) =>
                    handleChange(row.id, "time", e.target.value)
                  }
                  className="w-full border rounded-lg p-2 text-lg !font-normal !text-gray-700 border-gray-300"
                />
              </div>

              <button
                onClick={() => save(row)}
                className="w-full bg-prpl text-white rounded-lg py-2 hover:opacity-90"
              >
                Сохранить
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}