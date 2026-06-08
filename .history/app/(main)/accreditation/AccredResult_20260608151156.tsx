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
  }, [year, month, education, accred]);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Год */}
      <select
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

      {/* Месяц */}
      {year && (
        <select
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

      {/* Образование */}
      {month && (
        <select
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

      {/* Специализация */}
      {education && (
        <select
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
    </div>
  );
}