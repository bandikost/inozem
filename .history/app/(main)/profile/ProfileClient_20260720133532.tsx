'use client'

import { UserRow } from "@/app/interface/user"
import LoadingLink from "@/components/Load/LoadingLink"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import { ProgramRow } from "@/lib/programm"
import { CalendarDays, ChevronRight, CircleUserRound, GraduationCap, Heart, LogOutIcon, Star } from "lucide-react"
import { useState } from "react"
import { KeyRound } from "lucide-react"

interface Props {
  programs: ProgramRow[]
  user: UserRow
}


export default function ProfileClient({programs, user} : Props) {
    const [showAll, setShowAll] = useState(false)

    const visiblePrograms = showAll
    ? programs
    : programs.slice(0, 2)

    return (
         <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
           <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Личный кабинет
        </span>
      
      </nav>

            <div className="flex flex-col">
              
              <div className="flex flex-col sm:flex-row text-center sm:text-left items-center gap-2 ml-2">
                  <CircleUserRound size={65} className="text-prpl" strokeWidth={1} />
                  <div className="flex flex-col">
                    <h1 className="text-prpl font-semibold">Личный кабинет </h1>
                    <p className="opacity-70 !font-normal text-md">Добро пожаловать, {user.last_name} {user.name} {user.patronymic}!</p>
                  </div>
              </div>
              
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-8">
                  <LogoutButton />

                  

                  {!!user.isAdmin && (
                    <LoadingLink
                      href="/dashboard/"
                      className="flex items-center text-center justify-center gap-1 !text-white cursor-pointer bg-prpl p-3 text-lg rounded-md hover:opacity-70 shadow-2xl"
                    >
                      <LogOutIcon size={20} />
                      Перейти в админку
                    </LoadingLink>
                  )}
              
              </div> 

           
          </div>
      
      <div className="grid grid-cols-1 items-stretch gap-8 mt-2">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 flex flex-col h-full">
          <h3 className="text-prpl font-semibold !text-2xl p-4 flex gap-2 ml-2 flex-col sm:flex-row items-center text-center"><GraduationCap size={30} strokeWidth={1.5} /> Программы обучения</h3>
          {programs.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
              <GraduationCap
                size={64}
                strokeWidth={1.2}
                className="text-gray-300 mb-4"
              />

              <p className="text-xl text-gray-600 !font-normal">
                У вас пока нет программ обучения
              </p>

              <p className="text-gray-400 mt-2 !font-normal">
                Посмотрите программы обучения в нашем <LoadingLink href="/programs" className="text-prpl hover:underline !font-normal">каталоге</LoadingLink> и запишитесь на интересующие вас курсы!
              </p>
            </div>
          )}

          <ul className="flex flex-col p-6 gap-4">
              {visiblePrograms.map(p => {
                const endDate = new Date(p.created_at)
                const time = Number(p.time)

                if (time < 71) endDate.setMonth(endDate.getMonth() + 1)
                else if (time < 143) endDate.setMonth(endDate.getMonth() + 2)
                else if (time < 287) endDate.setMonth(endDate.getMonth() + 3)
                else if (time < 500) endDate.setFullYear(endDate.getFullYear() + 1)
                else endDate.setFullYear(endDate.getFullYear() + 1)

                return (
                  <LoadingLink key={p.id} href={`/programs/${p.slug}`} className="hover:bg-[#be71cc] hover:!text-white group transition-colors">
                    <div className="px-4 border border-gray-300 py-8 rounded-md  ">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="font-semibold !text-2xl text-black/80 group-hover:text-white transition-colors">{p.name}</p>
                          <p className="text-black/60 !text-lg group-hover:text-white transition-colors">{p.time >= 432 && "(профессиональная переподготовка)"}</p>
                        </div>
                        <ChevronRight size={50} strokeWidth={1} />
                      </div>
                      <p className="!text-lg flex items-center gap-2 mt-4 text-black/70 opacity-70 group-hover:text-white transition-colors">
                        <CalendarDays className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} /> Доступ открыт до: {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </LoadingLink>
                )
              })}
          </ul>
          {programs.length > 2 && (
            <div className="px-6 pb-6">
              <button onClick={() => setShowAll(prev => !prev)}
                className="w-full border border-gray-300 rounded-md py-4 text-lg button-more">
                {showAll ? "Скрыть" : "Показать ещё"}
              </button>
            </div>
          )}

        </div>

    {/*  <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 flex flex-col h-full">
        <h3 className="text-prpl font-semibold !text-2xl p-4 flex gap-2 ml-2 text-center justify-center"><Star size={30} strokeWidth={1.5} /> Персональные рекомендации</h3>
          <ul className="flex flex-col justify-center items-center gap-2 mt-10">
            <Heart size={70} strokeWidth={1.5} className="bg-white border border-gray-300 shadow-xl p-2 rounded-full" fill="red" stroke="vinous" />
            <li className="px-4 text-gray-500 text-xl mt-3">Пока что тут пусто</li>
          </ul>
      </div> */}
      
     <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white p-6">
                <div className="flex flex-col text-center sm:text-left sm:flex-row items-center gap-3">
                  <KeyRound className="text-prpl" size={30} />
                  <div>
                    <h3 className="text-2xl font-semibold text-prpl">
                      Безопасность
                    </h3>
                    <p className="text-gray-500">
                      Измените пароль для входа в личный кабинет.
                    </p>
                  </div>
                </div>

                <LoadingLink
                  href="/profile/change-password"
                  className="mt-6 flex items-center justify-center rounded-md bg-prpl !text-white py-3 hover:opacity-80 transition"
                >
                  Сменить пароль
                </LoadingLink>
              </div>

      
    </div>
          </div>
    </section>
    )
}