'use client'

import { UserRow } from "@/app/interface/user"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import { ProgramRow } from "@/lib/programm"
import { Book, CircleUserRound, HatGlasses } from "lucide-react"
import Link from "next/link"


interface Props {
  programs: ProgramRow[]
  user: UserRow
}


export default function ProfileClient({programs, user} : Props) {


    return (
         <section className="flex flex-col px-4 mb-20">
          <div className="flex items-center mt-28 gap-6">
            <CircleUserRound size={70} className="!font-base"/>
            <div className="flex flex-col">
              <h1 className="text-prpl font-semibold">Личный кабинет</h1>
              <p className="opacity-70 !font-normal text-md">Добро пожаловать, {user.last_name} {user.name} {user.patronymic}!</p>
            </div>
          </div>
      
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 mt-8">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 h-full flex flex-col">
          <h3 className="text-prpl font-semibold !text-2xl p-4">Программы обучения</h3>
          {programs.length === 0 && <p className="text-gray-500 px-5 pb-4"> Вы пока не записаны ни на одну программу</p>}

          <ul className="flex flex-col">
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
                    <li className="px-4 border-y border-gray-300 py-8">
                      <p className="font-semibold !text-xl !text-prpl">{p.name}</p>
                      <p className="!text-sm">
                        Доступ открыт до: {endDate.toLocaleDateString()}
                      </p>
                    </li>
                  </Link>
                )
              })}
          </ul>

        </div>

      <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3 h-full flex flex-col">
        <h3 className="text-prpl font-semibold !text-2xl p-4">Избранное</h3>
          <ul>
            <li className="px-4 text-gray-500">Данная возможность находится в разработке </li>
          </ul>
      </div>

      {user.isTeacher ? ( 
        <div className="flex flex-col h-full border border-gray-300 mt-8 mb-14 rounded shadow-2xl bg-white">
  
          <div className="flex items-center mt-4 px-4">
            <HatGlasses className="w-5 mr-1 text-prpl" />
            <h2 className="text-prpl font-semibold text-2xl">Преподаватель</h2>
          </div>

          <div className="flex-1 px-4 py-2">
              <ul className="text-lg space-y-1">
                <li className="flex gap-2"><strong>Фамилия:</strong> {user.last_name}</li>
                <li className="flex gap-2"><strong>Имя:</strong> {user.name}</li>
                <li className="flex gap-2"><strong>Отчество:</strong> {user.patronymic}</li>
              </ul>

              <div className="-ml-2">
                <Link href={'/dashboard/manager'} className="text-xl hover:underline !text-white bg-prpl px-4 py-1 shadow-xl rounded-xs">Перейти в админку</Link>
              </div>
          </div>

          <div className="p-4"><LogoutButton /></div>

        </div> 

      ) : (
        <div className="border border-gray-300 mt-8  rounded shadow-2xl bg-white h-full flex flex-col ">
          {!user.isTeacher && (
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center p-4">
                <Book className="text-prpl " />
                <h3 className="text-prpl font-semibold !text-2xl p-4 -ml-2">{user.isAdmin ? `Администратор` : `Слушатель`}</h3>   
              </div>

              <hr className="border border-gray-200 w-full -mt-10" />

              {user.isAdmin ? (
                <div className="-ml-2">
                  <Link href={'/dashboard/manager'} className="text-xl hover:underline !text-white bg-prpl px-4 py-1 shadow-xl rounded-xs">Перейти в админку</Link>
                </div>
              ) : (
                <></>
              )}

              <ul className="text-xl p-4 border-y border-gray-300 rounded-md">
                <li><strong>Фамилия:</strong> {user.last_name}</li>
                <li><strong>Имя:</strong> {user.name}</li>
                <li><strong>Отчество:</strong> {user.patronymic}</li>
              </ul>

              <LogoutButton />
              
            </div>
          )}
        </div>
      )}
      </div>

    </section>
    )
}