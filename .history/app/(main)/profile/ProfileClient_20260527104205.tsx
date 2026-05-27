'use client'

import { UserRow } from "@/app/interface/user"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import { ProgramRow } from "@/lib/programm"
import { CalendarDays, ChevronRight, CircleUserRound, GraduationCap, LogOutIcon } from "lucide-react"
import Link from "next/link"


interface Props {
  programs: ProgramRow[]
  user: UserRow
}


export default function ProfileClient({programs, user} : Props) {


    return (
         <section className="flex flex-col px-4 mb-20">
          <div className="flex items-center mt-28 gap-2">
            <CircleUserRound size={65} className="text-prpl" strokeWidth={1} />
            <div className="flex flex-col">
              <h1 className="text-prpl font-semibold">Личный кабинет </h1>
              <p className="opacity-70 !font-normal text-md">Добро пожаловать, {user.last_name} {user.name} {user.patronymic}!</p>
              
            </div>
          </div>
      
      <div className="grid grid-cols-1 tablet:grid-cols-2 items-start gap-8 mt-8">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 h-full flex flex-col">
          <h3 className="text-prpl font-semibold !text-2xl p-4 flex gap-2 ml-2"><GraduationCap size={30} strokeWidth={1.5} /> Программы обучения</h3>
          {programs.length === 0 && <p className="text-gray-500 px-5 pb-4"> Вы пока не записаны ни на одну программу</p>}

          <ul className="flex flex-col p-6 gap-4">
              {programs.map(p => {
                const endDate = new Date(p.created_at)
                const time = Number(p.time)

                if (time < 71) endDate.setMonth(endDate.getMonth() + 1)
                else if (time < 143) endDate.setMonth(endDate.getMonth() + 2)
                else if (time < 287) endDate.setMonth(endDate.getMonth() + 3)
                else if (time < 500) endDate.setFullYear(endDate.getFullYear() + 1)
                else endDate.setFullYear(endDate.getFullYear() + 1)

                return (
                  <Link key={p.id} href={`/programs/${p.slug}`} className="hover:bg-[#be71cc] hover:!text-white transition-colors">
                    <div className="px-4 border border-gray-300 py-8 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="font-semibold !text-2xl !text-prpl">{p.name}</p>
                          <p>{p.time > 432 && "(профессиональная переподготовка)"}</p>
                        </div>
                        <ChevronRight size={50} strokeWidth={1} />
                      </div>
                      <p className="!text-lg flex items-center gap-2 mt-4 text-black/70 opacity-70 ">
                        <CalendarDays className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} /> Доступ открыт до: {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                )
              })}
          </ul>

        </div>

      <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 flex flex-col">
        <h3 className="text-prpl font-semibold !text-2xl p-4">Избранное</h3>
          <ul>
            <li className="px-4 text-gray-500">Данная возможность находится в разработке </li>
          </ul>
      </div>
      
      </div>

      <div className="mt-8 gap-6 pt-3 flex items-center justify-between mt-20">
        <Link className="flex p-8 justify-center w-1/2 text-2xl rounded-md items-center gap-1 hover:opacity-70 shadow-2xl bg-prpl !text-white" href="/dashboard/">
          <LogOutIcon /> Перейти в админку
        </Link>
        <LogoutButton /> 
      </div>

    </section>
    )
}