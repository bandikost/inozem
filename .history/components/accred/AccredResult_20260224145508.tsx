"use client"
import { useEffect, useState } from "react"


export default function AccredResult({ specialties }: { specialties: string[] }) {
    const [dates, setDates] = useState<any[]>([])
    const [selected, setSelected] = useState("")
    const [loading, setLoading] = useState(false)
    
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

    return (
         <div className="grid grid-cols-2 gap-6 mt-10">
            <select name="education_level" required className="border border-zinc-400 p-2 rounded text-zinc-700 ">
              <option value="">-- выберите образование --</option>
              <option value="Среднее">Среднее</option>
              <option value="Высшее">Высшее</option>
              <option value="без образования">Без мед.образования</option>
          </select>

            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border p-2 rounded mb-6 w-full"
            >
                <option value="">Выберите специальность</option>
                {specialties.map((s) => (
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