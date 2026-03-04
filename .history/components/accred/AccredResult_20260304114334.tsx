"use client"

import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"
import { Hourglass } from "lucide-react"
import { useState, useEffect } from "react"
import AccredButton from "../ui/accredButton"

export default function AccredResult() {
  const [selected, setSelected] = useState("")
  const [dates, setDates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [education, setEducation] = useState("")
  const [activeYear, setActiveYear] = useState(
  new Date().getFullYear()
)

  useEffect(() => {
    if (!selected) return

    async function fetchData() {
      setLoading(true)

      const res = await fetch(
      `/api/accred?specialty=${encodeURIComponent(selected)}&year=${activeYear}`
    )
      const data = await res.json()

      setDates(data)
      setLoading(false)
    }

    fetchData()
  }, [selected, activeYear])

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
        <AccredButton activeYear={activeYear} onChange={setActiveYear}/>
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
        <p className="text-zinc-700 flex !font-semibold text-base">
         <Hourglass className="animate-wait mr-2 text-green" /> Возможно, аккредитация по
         <span className="underline px-2 text-green text-base">{selected}</span>  еще не получила итоги.
        </p>
      )}

      {!loading && dates.length > 0 && (
        <div className="w-full overflow-x-auto">
        
        <h2 className="text-2xl mb-8 text-center mt-4">{education}</h2>
        <p className=" mb-4 text-center">{selected}</p>
        <table className="min-w-[600px] w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
                <th className="p-2 border">Этап</th>
                <th className="p-2 border">Дата</th>
                <th className="p-2 border">Итог</th>
            </tr>
          </thead>
         <tbody>
  {dates.map((row) => (
    <tr key={row.id}>
      {row.file_urls && row.file_urls.length > 0 ? (
        <>
        <td className="p-2 border font-semibold">
        {row.stage}
      </td>

      <td className="p-2 border">
        {new Date(row.date).toLocaleDateString("ru-RU")}
      </td>

      <td className="p-2 border">

          {row.file_urls.map((url: string, i: number) => {
            const protocolNumber = Number(row.protocol) + i
            return (
              <div key={i} className="mb-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Протокол № {protocolNumber}
                </a>
              </div>
            )
          })}
      </td>
        </>
      ) :  null}
      

    </tr>
  ))}
</tbody>
        </table>
        </div>
      )}

    </div>
  )
}
