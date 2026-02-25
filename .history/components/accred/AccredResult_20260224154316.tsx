"use client"

import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"
import { Hourglass } from "lucide-react"
import { useState, useEffect } from "react"

export default function AccredResult() {
  const [selected, setSelected] = useState("")
  const [dates, setDates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [education, setEducation] = useState("")

  useEffect(() => {
    if (!selected) return

    async function fetchData() {
      setLoading(true)

      const res = await fetch(`/api/accred?specialty=${encodeURIComponent(selected)}`)
      const data = await res.json()

      setDates(data)
      setLoading(false)
    }

    fetchData()
  }, [selected])

  const handleHigherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelected(e.target.value)
  setEducation("Высшее")
}

const handleSecondaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelected(e.target.value)
  setEducation("Среднее")
}


  return (
    <div className="max-w-4xl mx-auto my-10">

        <div className="grid grid-cols-2 gap-6">

        <select
            value={education === "Высшее" ? selected : ""}
            onChange={handleHigherChange}
            className="border p-2 rounded mb-6 w-full"
        >
            <option value="">Выберите специальность (Высшее)</option>

            {HIGHER_SPECIALTIES.map((s) => (
            <option key={`higher-${s}`} value={s}>
                {s}
            </option>
            ))}
        </select>

        <select
            value={education === "Среднее" ? selected : ""}
            onChange={handleSecondaryChange}
            className="border p-2 rounded mb-6 w-full"
        >
            <option value="">Выберите специальность (Среднее)</option>

            {SECONDARY_SPECIALTIES.map((s) => (
            <option key={`secondary-${s}`} value={s}>
                {s}
            </option>
            ))}
        </select>

        </div>
      {loading && <Hourglass className="animate-wait mr-2 text-green" />}

      {!loading && selected && dates.length === 0 && (
        <p className="text-zinc-700 flex !font-semibold text-lg">
         <Hourglass className="animate-wait mr-2 text-green" /> Возможно, аккредитация по
         <span className="underline px-2">{selected}</span>  еще не прошла
        </p>
      )}

      {!loading && dates.length > 0 && (
        <div>
        <h2 className="text-2xl mb-8">{education}</h2>
        <table className="w-full border border-gray-300 text-left">
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
                <td className="p-2 border font-semibold">{row.stage}</td>
                <td className="p-2 border">{selected}</td>
                <td className="p-2 border">
                  {new Date(row.date).toLocaleDateString("ru-RU")}
                </td>
                <td className="p-2 border">{row.timestart}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

    </div>
  )
}
