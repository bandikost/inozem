'use client'

import { useMemo, useState } from "react"
import { Accred } from "@/app/interface/accred"

interface Props {
  accred: Accred[]
}

export default function AccredResult({ accred }: Props) {
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [education, setEducation] = useState("")
  const [specialization, setSpecialization] = useState("")

  const years = [...new Set(accred.map(a => a.year))]

  const months = useMemo(() => {
    return [
      ...new Set(
        accred
          .filter(a => String(a.year) === year)
          .map(a => a.month)
      )
    ]
  }, [year, accred])

  const educations = useMemo(() => {
    return [
      ...new Set(
        accred
          .filter(
            a =>
              String(a.year) === year &&
              String(a.month) === month
          )
          .map(a => a.education)
      )
    ]
  }, [year, month, accred])

  const specializations = useMemo(() => {
    return [
      ...new Set(
        accred
          .filter(
            a =>
              String(a.year) === year &&
              String(a.month) === month &&
              a.education === education
          )
          .map(a => a.specialization)
      )
    ]
  }, [year, month, education, accred])

  const filteredAccred = accred.filter(a =>
    String(a.year) === year &&
    String(a.month) === month &&
    a.education === education &&
    a.specialization === specialization
  )

  return (
    <div className="flex flex-col items-center justify-center mt-10">

      <div className="w-full max-w-4xl flex flex-wrap gap-3 justify-center mb-6">

        <select className="select" value={year} onChange={(e) => {
          setYear(e.target.value)
          setMonth("")
          setEducation("")
          setSpecialization("")
        }}>
          <option value="">Год</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        {year && (
          <select className="select" value={month} onChange={(e) => {
            setMonth(e.target.value)
            setEducation("")
            setSpecialization("")
          }}>
            <option value="">Месяц</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        )}

        {month && (
          <select className="select" value={education} onChange={(e) => {
            setEducation(e.target.value)
            setSpecialization("")
          }}>
            <option value="">Образование</option>
            {educations.map(ed => <option key={ed} value={ed}>{ed}</option>)}
          </select>
        )}

        {education && (
          <select className="select" value={specialization} onChange={(e) => {
            setSpecialization(e.target.value)
          }}>
            <option value="">Специализация</option>
            {specializations.map(sp => <option key={sp} value={sp}>{sp}</option>)}
          </select>
        )}

      </div>

      {specialization && (
        <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">

          <div className="grid grid-cols-12 bg-gray-50 text-sm font-semibold text-gray-600 px-4 py-3">
            <div className="col-span-2 text-lg">Этап</div>
            <div className="col-span-7 text-center text-lg">Документ</div>
            <div className="col-span-3 text-right text-lg">Итоги</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredAccred.map((item) => (
              <div key={item.id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50 transition">

                <div className="col-span-2 font-bold text-gray-700">
                  {item.stage}
                </div>

                <div className="col-span-7 text-center ">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
                  >
                    {item.name}
                  </a>
                </div>

                <div className="col-span-3 text-right">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
                  >
                    {item.name}
                  </a>
                </div>

              </div>
            ))}
          </div>

          {filteredAccred.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Документы не найдены
            </div>
          )}

        </div>
      )}

    </div>
  )
}