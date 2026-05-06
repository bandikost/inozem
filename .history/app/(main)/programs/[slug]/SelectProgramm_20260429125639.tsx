"use client";

import { useMemo, useState } from "react";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const options = useMemo(() => {
    const arr: { time: number; price: string }[] = [];

    if (program.time) {
      arr.push({
        time: program.time,
        price: program.price, 
      });
    }

    if (program.time_secondary) {
      arr.push({
        time: program.time_secondary,
        price: program.price, 
      });
    }

    return arr;
  }, [program]);

  const defaultTime =
    initialTime && options.find(o => o.time === Number(initialTime))
      ? Number(initialTime)
      : options[0]?.time ?? 0;

  const defaultPrice =
    options.find(o => o.time === defaultTime)?.price ?? "0";

  const [selectedTime, setSelectedTime] = useState<number>(defaultTime);
  const [selectedPrice, setSelectedPrice] = useState<string>(defaultPrice);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    const selected = options.find(o => o.time === value);

    setSelectedTime(value);
    setSelectedPrice(selected?.price ?? "0");

    const params = new URLSearchParams(searchParams.toString());
    params.set("time", String(value));

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">

      {/* ВЫБОР ЧАСОВ */}
      {options.length > 1 ? (
        <label className="flex items-center gap-2">
          <p>Выберите часы:</p>

          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="border border-gray-400 p-1 rounded"
          >
            {options.map((o) => (
              <option key={o.time} value={o.time}>
                {o.time} часов
              </option>
            ))}
          </select>
        </label>
      ) : options.length === 1 ? (
        <p className="!text-default !font-normal opacity-90">
          {options[0].time} академических{" "}
          {getHourWord(options[0].time)}
        </p>
      ) : (
        <p>Часы не указаны</p>
      )}

      <div className="flex items-center gap-4">
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