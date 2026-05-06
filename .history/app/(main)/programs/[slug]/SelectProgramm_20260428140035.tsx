"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/Buttons/PayButton";
import { getHourWord } from "@/components/ui/GetHourWord";

interface ProgramSelectProps {
  program: ProgramRow;
  userId: number;
  initialTime?: string;
}

interface ProgramRow {
  time: number[]
  price: string 
}

export default function ProgramSelect({ program, userId, initialTime }: ProgramSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const times = program.time
const prices = program.price.split(",").map(p => p.trim())

const timePriceMap: Record<number, string> = {}

times.forEach((t, i) => {
  timePriceMap[t] = prices[i]
})
const defaultTime =
  initialTime && timePriceMap[Number(initialTime)]
    ? Number(initialTime)
    : times[0]

  const [selectedTime, setSelectedTime] = useState(defaultTime)
  const [selectedPrice, setSelectedPrice] = useState(timePriceMap[defaultTime])
  

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
      {program.time?.length > 1 ? (
  <label className="flex items-center">
    <p>Выберите часы:</p>

    <select
      value={selectedTime}
      onChange={handleTimeChange}
      className="border border-gray-400 p-1 rounded ml-2"
    >
      {program.time.map((t) => (
        <option key={t} value={t}>
          {t} часов
        </option>
      ))}
    </select>
  </label>
) : (
  <p className="!text-default !font-normal opacity-90">
    {program.time?.[0]} академических {getHourWord(program.time?.[0])}
  </p>
)}

      <div className="flex items-center gap-4">
        <p>Цена: {selectedPrice}₽</p>

      <PayButton price={selectedPrice} programId={program.id} userId={userId} name={program.name} time={selectedTime} />

        

      </div>
    </div>
  );
}