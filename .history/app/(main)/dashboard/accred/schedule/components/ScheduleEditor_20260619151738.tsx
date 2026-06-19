"use client";

import { useState } from "react";

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
]




export default function ScheduleEditor({ schedule }) {
  const [rows, setRows] = useState(schedule);

  const handleChange = (id, field, value) => {setRows((prev) => 
    prev.map((row) => row.id === id ? {...row, [field]: value} : row)
    )
  }

  async function save(row) {
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
    <div className="grid md:grid-cols-2 gap-6">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-2xl bg-white border border-gray-200 shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-prpl">
            {row.specialization}
          </h2>

          <p className="text-gray-500 mb-6">
            {row.stage}
          </p>

          <div className="space-y-4">

            <div>
              <label className="block text-sm mb-1">
                День
              </label>

              <input
                type="number"
                value={row.day}
                onChange={(e) =>
                  handleChange(row.id, "day", Number(e.target.value))
                }
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Месяц
              </label>

              <select
                value={row.month}
                onChange={(e) =>
                  handleChange(row.id, "month", e.target.value)
                }
                className="w-full border rounded-lg p-2"
              >
                {months.map((month) => (
                  <option key={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Год
              </label>

              <input
                type="number"
                value={row.year}
                onChange={(e) =>
                  handleChange(row.id, "year", Number(e.target.value))
                }
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Время
              </label>

              <input
                type="time"
                value={row.time}
                onChange={(e) =>
                  handleChange(row.id, "time", e.target.value)
                }
                className="w-full border rounded-lg p-2"
              />
            </div>

            <button
              onClick={() => save(row)}
              className="mt-4 w-full bg-prpl text-white rounded-lg py-2 hover:opacity-90"
            >
              Сохранить
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}