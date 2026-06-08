'use client'

import { useMemo, useState } from "react";
import { Accred } from "@/app/interface/accred";

interface Props {
  accred: Accred[];
}

export default function AccredResult({ accred }: Props) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [education, setEducation] = useState("");
  const [specialization, setSpecialization] = useState("");

  const years = [...new Set(accred.map(a => a.year))];

  const months = useMemo(() => {
    return [
      ...new Set(
        accred
          .filter(a => String(a.year) === year)
          .map(a => a.month)
      )
    ];
  }, [year, accred]);

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
    ];
  }, [year, month, accred]);

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
    ];
  }, [year, month, education, accred])

  const filteredAccred = accred.filter(a =>
    String(a.year) === year &&
    String(a.month) === month &&
    a.education === education &&
    a.specialization === specialization
)

  return (
    <div className="flex flex-wrap gap-4 mt-4 items-center justify-center">
   
      <select className="select"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          setMonth("");
          setEducation("");
          setSpecialization("");
        }}
      >
        <option value="">Выберите год</option>

        {years.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      
      {year && (
        <select className="select"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setEducation("");
            setSpecialization("");
          }}
        >
          <option value="">Выберите месяц</option>

          {months.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      )}

      
      {month && (
        <select className="select"
          value={education}
          onChange={(e) => {
            setEducation(e.target.value);
            setSpecialization("");
          }}
        >
          <option value="">Выберите образование</option>

          {educations.map(ed => (
            <option key={ed} value={ed}>
              {ed}
            </option>
          ))}
        </select>
      )}

     
      {education && (
        <select className="select"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Выберите специализацию</option>

          {specializations.map(sp => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </select>
      )}

      {specialization && (
  <div className="mt-8 overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-[#0a9688] text-white">
          <th className="border border-gray-300 px-4 py-3 text-left text-2xl">
            Этап
          </th>

          <th className="border border-gray-300 px-4 py-3 text-left text-2xl">
            Документ
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredAccred.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-3 text-xl text-center">
              {item.stage}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a9688] hover:underline font-medium text-xl p-1"
              >
                {item.name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {filteredAccred.length === 0 && (
      <p className="mt-4 text-center text-gray-500">
        Документы не найдены
      </p>
    )}
  </div>
)}
    </div>
  )
}