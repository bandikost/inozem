"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/Buttons/PayButton";
import { ProgramRow } from "@/lib/programm";
import { getHourWord } from "@/components/ui/GetHourWord";

interface ProgramSelectProps {
  program: ProgramRow;
  userId: number;
  initialTime?: string;
}

export default function ProgramSelect({ program, userId, initialTime }: ProgramSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const times = program.time.split(",").map(t => t.trim());
  const prices = program.price.split(",").map(p => p.trim());

  const timePriceMap: Record<string, string> = {};
  times.forEach((t, i) => timePriceMap[t] = prices[i]);

  const defaultTime = initialTime && timePriceMap[initialTime]
    ? initialTime
    : times[0];

  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [selectedPrice, setSelectedPrice] = useState(timePriceMap[defaultTime]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedTime(value);
    setSelectedPrice(timePriceMap[value]);

    const params = new URLSearchParams(searchParams.toString());
    params.set("time", value);

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex items-end gap-6">
     {program.time.length > 3 ? <label>
        Выберите часы:
        <select value={selectedTime} onChange={handleTimeChange} className="border border-gray-400 p-1 rounded ml-2">
          {times.map(t => (
            <option key={t} value={t}>{t} часов</option>
          ))}
        </select>
      </label> : 
      `Программа на ${program.time} академических ${getHourWord(Number(program.time))} ` 
      } 

      <div className="flex items-center gap-4 mt-2">
        <p>Цена: {selectedPrice}₽</p>

      <PayButton price={selectedPrice} programId={program.id} userId={userId} name={program.name} time={selectedTime} />

        

      </div>
    </div>
  );
}