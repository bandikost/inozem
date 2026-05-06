"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/Buttons/PayButton";
import { getHourWord } from "@/components/ui/GetHourWord";
import { ProgramRow } from "@/lib/programm";

interface ProgramSelectProps {
  program: ProgramRow;
  userId: number;
  initialTime?: string;
}


export default function ProgramSelect({ program, userId, initialTime }: ProgramSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const times = Array.isArray(program.time) ? program.time : []
  const prices = program.price?.split(",").map(p => p.trim()) ?? []
  const timePriceMap: Record<number, string> = {}

  times.forEach((t, i) => {
    timePriceMap[t] = prices[i] ?? "0"
  })

  const defaultTime =
    initialTime && timePriceMap[Number(initialTime)]
      ? Number(initialTime)
      : times[0] ?? 0

  const [selectedTime, setSelectedTime] = useState<number>(defaultTime)
  const [selectedPrice, setSelectedPrice] = useState<string>(timePriceMap[defaultTime] ?? "0")
  

const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = Number(e.target.value)

  setSelectedTime(value)
  setSelectedPrice(timePriceMap[value])

  const params = new URLSearchParams(searchParams.toString())
  params.set("time", String(value))

  router.replace(`?${params.toString()}`)
}

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
    {times.length > 1 ? (
  <label className="flex items-center">
    <p>Выберите часы:</p>

    <select
      value={selectedTime}
      onChange={handleTimeChange}
      className="border border-gray-400 p-1 rounded ml-2"
    >
      {times.map((t) => (
        <option key={t} value={t}>
          {t} часов
        </option>
      ))}
    </select>
  </label>
) : times.length === 1 ? (
  <p className="!text-default !font-normal opacity-90">
    {times[0]} академических {getHourWord(times[0])}
  </p>
) : (
  <p>Часы не указаны</p>
)}

      <div className="flex items-center gap-4">
        <p>Цена: {selectedPrice}₽</p>

      <PayButton price={selectedPrice} programId={program.id} userId={userId} name={program.name} time={selectedTime} />

        

      </div>
    </div>
  );
}