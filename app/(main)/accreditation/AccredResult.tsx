"use client";

import { useMemo, useState } from "react";
import { Accred } from "@/app/interface/accred";
import { ArrowUpRight } from "lucide-react";

interface Props {
  accred: Accred[];
}

export default function AccredResult({ accred }: Props) {

  const resultAccred = useMemo(() => {
    return accred.filter((a) => a.stage)
  }, [accred]);


  const years = useMemo(() => {
    return [...new Set(resultAccred.map((a) => a.year))]
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));
  }, [resultAccred]);


  const latestYear = years.length
    ? String(years[0])
    : "";


  const [year, setYear] = useState(latestYear);


  const specializations = useMemo(() => {

    return [
      ...new Set(
        resultAccred
          .filter((a) => String(a.year) === year)
          .map((a) => a.specialization)
          .filter(Boolean)
      ),
    ];

  }, [year, resultAccred]);


  const [specialization, setSpecialization] = useState(
    specializations[0] ?? ""
  );


  const changeYear = (newYear: string) => {

    setYear(newYear);

    const firstSpec = resultAccred.find(
      (a) => String(a.year) === newYear
    )?.specialization;

    setSpecialization(firstSpec ?? "");

  };


  const filteredAccred = useMemo(() => {

    return resultAccred.filter(
      (a) =>
        String(a.year) === year &&
        a.specialization === specialization
    );

  }, [year, specialization, resultAccred]);


  const groupedAccred = useMemo(() => {

    return filteredAccred.reduce(
      (acc, item) => {

        if (!acc[item.stage]) {
          acc[item.stage] = [];
        }

        acc[item.stage].push(item);

        return acc;

      },
      {} as Record<string, Accred[]>
    );

  }, [filteredAccred]);


  if (!resultAccred.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-500">
        Результаты аккредитации пока не опубликованы.
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-8">
      <div>

        <h3 className="mb-3 text-sm font-semibold text-zinc-700">
          Год проведения
        </h3>

        <div className="flex flex-wrap gap-2">

          {years.map((y) => (

            <button
              key={y}
              type="button"
              onClick={() => changeYear(String(y))}
              className={`
                min-w-[90px]
                rounded-xl
                border
                px-5
                py-3
                text-sm
                font-medium
                transition
                cursor-pointer

                ${
                  String(y) === year
                    ? "border-blue bg-blue text-white shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-blue hover:text-blue"
                }
              `}
            >
              {y}
            </button>

          ))}

        </div>

      </div>
      {specializations.length > 0 && (

        <div>

          <h3 className="mb-3 text-sm font-semibold text-zinc-700">
            Специальность
          </h3>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-3
          ">

            {specializations.map((spec) => (

              <button
                key={spec}
                type="button"
                onClick={() => setSpecialization(spec)}
                className={`
                  min-h-[76px]
                  w-full
                  rounded-2xl
                  border
                  px-4
                  py-4
                  text-left
                  text-sm
                  font-medium
                  leading-5
                  transition
                  cursor-pointer

                  ${
                    specialization === spec
                      ? "border-green bg-green text-white shadow-sm"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-green hover:bg-green/5 hover:text-green"
                  }
                `}
              >
                {spec}
              </button>

            ))}

          </div>

        </div>

      )}

      <div>

        <div className="
          mb-4
          flex
          flex-col
          gap-1
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <h3 className="text-lg font-semibold text-zinc-800">
              Результаты аккредитации
            </h3>

            {specialization && (
              <p className="mt-1 text-sm text-zinc-500">
                {specialization}
              </p>
            )}

          </div>

        </div>


        {Object.entries(groupedAccred).map(
          ([stage, items]) => (

            <div
              key={stage}
              className="mb-6 last:mb-0"
            >

              <div className="mb-3 flex items-center gap-3">

                <h4 className="
                  text-base
                  md:text-lg
                  font-semibold
                  text-zinc-800
                ">
                  {stage}
                </h4>

                <span className="
                  rounded-full
                  bg-zinc-100
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-zinc-500
                ">
                  {items.length}
                </span>

              </div>
              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              ">

                {items.map((item) => (

                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex
                      min-h-[72px]
                      items-center
                      justify-between
                      gap-4
                      rounded-2xl
                      border
                      border-zinc-200
                      bg-white
                      px-5
                      py-4
                      text-zinc-800
                      transition
                      hover:border-blue
                      hover:shadow-md
                    "
                  >

                    <span className="
                      leading-5
                      transition
                      group-hover:text-blue
                    ">
                      {item.name}
                    </span>


                    <span className="
                      flex
                      shrink-0
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-blue
                    ">

                      PDF

                      <ArrowUpRight
                        size={16}
                        className="
                          transition-transform
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />

                    </span>

                  </a>

                ))}

              </div>

            </div>

          )
        )}

        {filteredAccred.length === 0 && (

          <div className="
            rounded-2xl
            border
            border-dashed
            border-zinc-300
            bg-zinc-50
            p-8
            text-center
            text-sm
            text-zinc-500
          ">
            Документы для выбранной специальности не найдены.
          </div>

        )}

      </div>

    </div>
  );
}