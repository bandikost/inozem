"use client"

import { Hourglass } from "lucide-react"
import { useState, useEffect } from "react"

export default function AccredTable() {
  const [selected, setSelected] = useState("")
  const [dates, setDates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      setLoading(false)
  }, [selected])

  return (
    <div className="max-w-4xl mx-auto my-10">

      {loading && <p>Загрузка...</p>}

      {!loading && dates.length === 0 && (
        <p className="text-zinc-700 flex !font-semibold text-lg">
         <Hourglass className="animate-wait mr-2 text-green" /> Ближайшие даты ожидаются
        </p>
      )}

      {!loading && dates.length > 0 && (
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
      )}

    </div>
  )
}
