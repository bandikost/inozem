'use client'

import { useState } from "react";
import PayButton from "@/components/ui/Buttons/PayButton";

interface Program {
  id: number;
  name: string;
  time: string;
  price: string;
  description?: string;
  dates?: string;
}

interface ProgramSelectProps {
  program: Program;
  userId: number;
}

export default function ProgramSelect({ program, userId }: ProgramSelectProps) {
  const times = program.time.split(",")       
  const prices = program.price.split(",")  

  const timePriceMap: Record<string, string> = {};
  times.forEach((t, i) => timePriceMap[t] = prices[i]);

  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedPrice, setSelectedPrice] = useState(timePriceMap[times[0]]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTime(value);
    setSelectedPrice(timePriceMap[value]);
  };

  return (
    <div className="mt-6 flex flex-col items-start gap-4 w-1/2">
      <label>
        Выберите часы:
        <select value={selectedTime} onChange={handleTimeChange} className="ml-2 border border-gray-400 rounded p-1">
          {times.map(t => (
            <option key={t} value={t}>{t} часов</option>
          ))}
        </select>
      </label>

    <div className="flex items-center gap-4">
      <p>Цена: {selectedPrice}₽</p>

      <PayButton price={selectedPrice} programId={program.id} userId={userId} name={program.name} />
    </div>
    </div>
  );
}