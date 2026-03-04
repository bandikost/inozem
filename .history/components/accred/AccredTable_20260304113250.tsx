"use client"

import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"
import { Hourglass } from "lucide-react"
import { useState, useEffect } from "react"

export default function AccredTable() {
  const [selected, setSelected] = useState("")
  const [dates, setDates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    if (!selected) return

    async function fetchData() {
      setLoading(true)

      const res = await fetch(`/api/accred?specialty=${encodeURIComponent(selected)}&year=${year}`)
      const data = await res.json()

      setDates(data)
      setLoading(false)
    }

    fetchData()
  }, [selected, year])


  return (
    <div className="max-w-4xl mx-auto my-10">

      <select
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  className="border p-2 rounded mb-6 w-full"
>
  <option value="">Выберите специальность</option>

  <optgroup label="Высшее образование">
    {HIGHER_SPECIALTIES.map((s) => (
      <option key={`higher-${s}`} value={s}>
        {s}
      </option>
    ))}
  </optgroup>

  <optgroup label="Среднее профессиональное образование">
    {SECONDARY_SPECIALTIES.map((s) => (
      <option key={`secondary-${s}`} value={s}>
        {s}
      </option>
    ))}
  </optgroup>

</select>

      {loading && <Hourglass className="animate-wait mr-2 text-green" />}

      {!loading && selected && dates.length === 0 && (
        <p className="text-zinc-700 flex !font-semibold text-lg">
         <Hourglass className="animate-wait mr-2 text-green" /> Ближайшие даты ожидаются
        </p>
      )}

      {!loading && dates.length > 0 && (
        <table className="min-w-[600px] w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Этап</th>
              <th className="p-2 border">Специальность</th>
              <th className="p-2 border">Дата</th>
              <th className="p-2 border">Время</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((row, index) => (
              <tr key={index}>
                <td className={`p-2 border ${(row.stage.includes("Основной этап") || row.stage.includes("Второй этап") || row.stage.includes("Итоги"))  ? "!font-bold" : ""}`}>
                  {row.stage === "Основной этап" ? "Основной этап (1 попытка)" : row.stage === "Второй этап" ? "Второй этап (1 попытка)" : row.stage}
                </td>
                <td className="p-2 border">
                  {row.stage === "Итоги" ? "" : selected}</td>
                <td className="p-2 border">
                  {row.stage === "Итоги"
                  ? ""
                  : new Date(row.date).toLocaleDateString("ru-RU")}
                </td>
                <td className="p-2 border">{row.timestart === "00:00:00" ? "" : row.timestart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}
