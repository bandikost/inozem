"use client"

import { Hourglass } from "lucide-react"
import { useState, useEffect } from "react"

type Accred = {
  stage: string
  specialty: string
  date: string
  timestart: string
}

export default function AccredTable() {
  const [selectedDate, setSelectedDate] = useState("")
  const [rows, setRows] = useState<Accred[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
     async function fetchData() {
      setLoading(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/accred`
      )

      const data = await res.json()
      setRows(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto my-10">

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded mb-6 w-full"
      >
        <option value="">Выберите дату</option>
        {dates.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {loading && <p>Загрузка...</p>}

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
