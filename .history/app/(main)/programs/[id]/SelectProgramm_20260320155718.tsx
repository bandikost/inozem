"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PayButton from "@/components/ui/Buttons/PayButton";

interface Program {
  id: number;
  name: string;
  time: string;
  price: string;
}

interface ProgramSelectProps {
  program: Program;
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
    <div className="mt-6 flex flex-col items-start gap-4 w-1/2">
      <label>
        Выберите часы:
        <select value={selectedTime} onChange={handleTimeChange}>
          {times.map(t => (
            <option key={t} value={t}>{t} часов</option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-4 mt-4">
        <p>Цена: {selectedPrice}₽</p>

        <PayButton 
          price={selectedPrice} 
          programId={program.id} 
          userId={userId} 
          name={program.name}
          time={selectedTime}
        />
      </div>
    </div>
  );
}