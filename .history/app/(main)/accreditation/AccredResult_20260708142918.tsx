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



  return (

<div className="mt-10 flex flex-col gap-6">
  <div className="flex flex-row gap-4">

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
                    px-6
                    py-3
                    rounded-xl
                    text-lg
                    transition
                    cursor-pointer
                    
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


        {filteredAccred.map(item => (

            <div
                key={item.id}
                className="
                    grid
                    grid-cols-12
                    items-center
                    px-5
                    py-4
                    hover:bg-gray-50
                    transition
                "
            >


                <div className="
                    col-span-2
                    font-semibold
                    border-r
                    border-zinc-200
                ">
                    {item.stage}
                </div>



                <div className="
                    col-span-7
                    text-center
                    border-r
                    border-zinc-200
                    px-4
                ">

                    <a
                        href={item.link}
                        target="_blank"
                        className="
                            text-teal-600
                            hover:underline
                        "
                    >
                        {item.name}
                    </a>

                </div>



                <div className="
                    col-span-3
                    text-center
                ">

                    <a
                        href={item.link}
                        target="_blank"
                        className="
                            text-teal-700
                            hover:underline
                        "
                    >
                        Скачать
                    </a>


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