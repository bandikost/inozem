"use client"

import { Accred } from "@/app/interface/accred";
import { useMemo, useState } from "react";

interface Props {
  schedule: Accred[]
}

export default function AccredTable({ schedule }: Props) {

  const [specialization, setSpecialization] = useState("");

  const specializations = [
    ...new Set(schedule.map(item => item.specialization))
  ];


  const filteredSchedule = useMemo(() => {

    if (!specialization) return [];

    return schedule.filter(
      item => item.specialization === specialization
    );

  }, [schedule, specialization]);


  return (
    <div className="my-10">


      <div className="mb-8">

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Выберите специальность
        </h3>


        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
        ">

          {specializations.map((spec) => (

            <button
              key={spec}
              onClick={() => setSpecialization(spec)}
              className={`
                rounded-2xl
                border
                px-5
                py-4
                text-left
                text-lg
                transition-all
                cursor-pointer

                ${
                  specialization === spec
                  ?
                  "bg-green text-white border-green shadow-lg"
                  :
                  "bg-white border-gray-200 text-gray-700 hover:border-green hover:shadow-md"
                }
              `}
            >

              <div className="font-medium">
                {spec}
              </div>

              <div className={`
                text-sm mt-1
                ${
                  specialization === spec
                  ? "text-white/80"
                  : "text-gray-400"
                }
              `}>
                Посмотреть расписание →
              </div>


            </button>

          ))}


        </div>

      </div>



      {specialization && (

        <div className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-md
          overflow-hidden
        ">


          <div className="
            bg-gray-50
            px-5
            py-4
            border-b
            border-gray-200
            flex
            justify-between
            items-center
          ">

            <h3 className="text-lg font-semibold text-gray-800">
              {specialization}
            </h3>


            <button
              onClick={() => setSpecialization("")}
              className="
              text-sm
              text-gray-500
              hover:text-red-500
              transition
              cursor-pointer
              "
            >
              Изменить
            </button>


          </div>



          <div className="divide-y divide-gray-100">


            {filteredSchedule.map((item) => (

              <div
                key={item.id}
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-3
                px-5
                py-5
                hover:bg-gray-50
                transition
                "
              >

                <div className="font-semibold text-gray-700 text-lg">
                  {item.stage}
                </div>


                <div className="
                  text-teal-700
                  text-lg
                  md:text-center
                ">
                  {item.month} {item.day} {item.year}
                  <span className="text-gray-600 text-sm">
                    {" "}г.
                  </span>
                </div>


                <div className="
                  text-teal-700
                  text-lg
                  md:text-right
                ">
                  {item.time}
                </div>


              </div>

            ))}


          </div>


          {filteredSchedule.length === 0 && (

            <div className="p-6 text-center text-gray-500">
              Расписание не найдено
            </div>

          )}


        </div>

      )}


    </div>
  );
}