"use client"

import { useMemo, useState } from "react"
import { Accred } from "@/app/interface/accred"

interface Props {
  accred: Accred[]
}

export default function AccredResult({ accred }: Props) {

  // сортируем года от новых к старым
  const years = useMemo(() => {
    return [...new Set(accred.map(a => a.year))]
      .sort((a,b) => Number(b) - Number(a))
  }, [accred])


  // самый свежий год
  const latestYear = String(years[0])


  const [year, setYear] = useState(latestYear)


  const specializations = useMemo(() => {

    return [
      ...new Set(
        accred
          .filter(a => String(a.year) === year)
          .map(a => a.specialization)
      )

    ]

  }, [year, accred])


  // первая специальность автоматически
  const [specialization, setSpecialization] = useState(
    specializations[0] ?? ""
  )


  const filteredAccred = useMemo(() => {

    return accred.filter(a =>
      String(a.year) === year &&
      a.specialization === specialization
    )

  }, [year, specialization, accred])


  const groupedAccred = useMemo(() => {

    return filteredAccred.reduce((acc, item) => {

        if (!acc[item.stage]) {
            acc[item.stage] = []
        }

        acc[item.stage].push(item)

        return acc

    }, {} as Record<string, Accred[]>)


}, [filteredAccred])


  return (

<div className="mt-10 flex flex-col gap-6">
  <div className="flex flex-col sm:flex-row gap-4">

    <div className="
        flex
        flex-wrap
        gap-3
        justify-center
    ">

        {years.map(y => (

            <button
                key={y}
                onClick={() => {

                    setYear(String(y))

                    const firstSpec = accred.find(
                        a => String(a.year) === String(y)
                    )?.specialization

                    setSpecialization(firstSpec ?? "")

                }}

                className={`
                  min-h-[48px]
                  px-5
                  py-3
                  rounded-xl
                  text-lg
                  flex
                  items-center
                  justify-center
                  transition
                  cursor-pointer
                  hover:opacity-70
                    ${
                    String(y) === year
                    ?
                    "bg-white shadow-md text-black"
                    :
                    "bg-zinc-100 text-zinc-600 hover:text-black"
                    }
                `}
            >

                {y}

            </button>

        ))}


    </div>


    <div className="
        flex
        
        flex-wrap
        gap-2
        justify-center
    ">

        {specializations.map(spec => (

            <button

                key={spec}

                onClick={() => setSpecialization(spec)}

                className={`
                    px-4
                    py-2
                    rounded-xl
                    border
                    transition
                    cursor-pointer
                    hover:opacity-70
                    ${
                    specialization === spec
                    ?
                    "bg-green text-white border-green"
                    :
                    "bg-white border-zinc-200 hover:border-green"
                    }
                `}
            >

                {spec}

            </button>


        ))}


    </div>
</div>

    <div className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-md
        overflow-hidden
    ">


        <div className="
            px-6
            py-5
            border-b
            bg-gray-50
        ">

            <h3 className="text-xl font-semibold">
                Результаты аккредитации {year} года
            </h3>

            <p className="text-gray-500 mt-1">
                {specialization}
            </p>

        </div>



        <div className="divide-y divide-gray-100">


{Object.entries(groupedAccred).map(([stage, items]) => (

    <div 
        key={stage}
        className="
            p-5
            border-b
            border-zinc-100
        "
    >

        <h4 className="
            text-xl
            !font-medium
            text-zinc-800
            mb-4
        ">
           {stage}
        </h4>


        <div className="
            grid
            md:grid-cols-2
            gap-3
        ">

            {items.map(item => (

                <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-zinc-200
                        px-5
                        py-4
                        text-zinc-800
                        transition
                        hover:border-teal-500
                        hover:shadow-md
                    "
                >

                    <span>
                        {item.name}
                    </span>


                    <span className="
                        text-teal-600
                        text-sm
                    ">
                        PDF
                    </span>


                </a>

            ))}

        </div>


    </div>

))}


</div>


        {
            filteredAccred.length === 0 &&
            <div className="p-6 text-center text-gray-500">
                Документы не найдены
            </div>
        }


    </div>


</div>


  )
}