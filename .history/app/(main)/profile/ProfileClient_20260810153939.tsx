'use client'

import { UserRow } from "@/app/interface/user"
import LoadingLink from "@/components/Load/LoadingLink"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import { ProgramRow } from "@/lib/programm"
import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  GraduationCap,
  LogOutIcon,
  Pencil,
  KeyRound,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getHourWord } from "@/components/ui/GetHourWord"

interface Props {
  programs: ProgramRow[]
  user: UserRow
  tests: any
}

export default function ProfileClient({
  programs,
  user,
  tests,
}: Props) {
  const [showAll, setShowAll] = useState(false)

  const [webinars, setWebinars] = useState<any[]>([])
  const [webinarsLoading, setWebinarsLoading] = useState(true)

  useEffect(() => {
    async function loadWebinars() {
      try {
        const res = await fetch("/api/pruffme/webinars")

        if (!res.ok) {
          throw new Error("Ошибка загрузки вебинаров")
        }

        const data = await res.json()

        setWebinars(data)
      } catch (error) {
        console.error("WEBINARS ERROR:", error)
      } finally {
        setWebinarsLoading(false)
      }
    }

    loadWebinars()
  }, [])

  const visiblePrograms = showAll
    ? programs
    : programs.slice(0, 2)

  return (
    <section className="min-h-screen pb-10">
    <div className="container max-w-6xl px-2 my-27">
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

      
      
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8 mt-2">
  <div className="mt-8 flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
    <div className="h-1 h-1 bg-gradient-to-r from-[#7A4385] via-[#8D4C98] to-[#A75BB3]" />

    <div className="p-6 md:p-8 flex flex-col h-full justify-center">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
          <GraduationCap size={22} strokeWidth={1.8} />
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-prpl md:text-2xl">
            Программы обучения
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Ваши активные программы
          </p>
        </div>
      </div>

      {programs.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-6 py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
            <GraduationCap size={34} strokeWidth={1.4} className="text-slate-300" />
          </div>

          <p className="text-lg font-medium text-slate-800">
            У вас пока нет программ обучения
          </p>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Посмотрите программы обучения в нашем{" "}
            <LoadingLink
              href="/programs"
              className="font-medium text-violet-600 hover:text-violet-700 hover:underline"
            >
              каталоге
            </LoadingLink>{" "}
            и запишитесь на интересующие вас курсы.
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-6 flex flex-col gap-4">
            {visiblePrograms.map((p) => {
              const endDate = new Date(p.created_at)
              const time = Number(p.time)

              if (time < 71) endDate.setMonth(endDate.getMonth() + 1)
              else if (time < 143) endDate.setMonth(endDate.getMonth() + 2)
              else if (time < 287) endDate.setMonth(endDate.getMonth() + 3)
              else endDate.setFullYear(endDate.getFullYear() + 1)

              return (
                <li key={p.id}>
                  <LoadingLink
                    href={`/programs/${p.slug}`}
                    className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-slate-900 transition-colors group-hover:text-violet-700 md:text-xl">
                          {p.name}
                        </p>

                        {p.time >= 432 ? (
                          <p className="mt-1 !text-sm text-slate-500">
                            Профессиональная переподготовка - <span className="underline !font-semibold">{p.time} {getHourWord(p.time)}</span>
                          </p>
                        ) : <p className="mt-1 !text-sm text-slate-500">
                            Повышение квалификации - <span className="underline !font-semibold">{p.time} {getHourWord(p.time)}</span>
                          </p>}
                      </div>

                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-violet-50 group-hover:text-violet-600">
                        <ChevronRight size={22} strokeWidth={1.8} />
                      </div>
                    </div>

                    <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                      Доступ открыт до: {endDate.toLocaleDateString("ru-RU")}
                    </p>
                  </LoadingLink>
                </li>
              )
            })}
          </ul>

          {programs.length > 2 && (
            <div className="mt-6 pt-2">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full button-more"
              >
                {showAll ? "Скрыть" : "Показать ещё"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>


   <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] overflow-hidden">

  <div className="h-1 bg-gradient-to-r from-[#7A4385] via-[#8D4C98] to-[#A75BB3]" />

  <div className="p-6 md:p-8">

    <div>
      <h3 className="text-xl font-semibold tracking-tight text-prpl md:text-2xl">
        Вебинары
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Ближайшие вебинары
      </p>
    </div>

    {webinarsLoading ? (
      <div className="mt-6 space-y-3">
        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    ) : webinars.length === 0 ? (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-slate-500">
          Ближайших вебинаров нет
        </p>
      </div>
    ) : (
      <div className="mt-6 space-y-4">

        {webinars.map((webinar) => {
          const date = new Date(
            webinar.date.replace(" ", "T")
          )

          return (
            <a
              key={webinar.id}
              href={webinar.landing}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <p className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-violet-700">
                    {webinar.name}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.6}
                    />

                    {date.toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}

                    {" в "}

                    {date.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                </div>

                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-violet-50 group-hover:text-violet-600">
                  <ChevronRight
                    size={22}
                    strokeWidth={1.8}
                  />
                </div>

              </div>
            </a>
          )
        })}

      </div>
    )}

  </div>
</div>

 


      </div> 
      {tests.length > 0 &&  (
      <div className=" mt-8 rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] overflow-hidden max-h-[200px]">
 
  
      <div className="h-1 bg-gradient-to-r from-[#7A4385] via-[#8D4C98] to-[#A75BB3]" />

          <div className="p-6 md:p-8 flex flex-col justify-center ">
          <h3 className="text-2xl font-semibold text-prpl">Мои тестирования</h3>
            <div className="mt-6 space-y-4">

            {
            tests.map((test)=>(
            <div
            key={test.id}
          
            >

            <p className="font-semibold border border-gray-200 p-2 bg-violet-100 rounded-2xl">
            {test.name_test}
            </p>


            <p className="mt-2 text-gray-600">
            Результат: <span className="underline !font-semibold">{test.result}</span>
            </p>


            <p className="text-sm text-gray-400">
            {new Date(test.created_at).toLocaleDateString("ru-RU")}
            </p>


            </div>
            ))
            }

            </div>
          </div>

      
      </div>
)}


      
        <div className="mt-8 flex max-h-[200px] justify-center  flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="h-1 h-1 bg-gradient-to-r from-[#7A4385] via-[#8D4C98] to-[#A75BB3]" />
          <div className="p-6 md:p-8 flex flex-col h-full justify-center">
        <div className="flex flex-col text-center sm:text-left sm:flex-row items-center gap-3">
           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <KeyRound size={22} strokeWidth={1.8}  />
          </div>
            <div>
              <h3 className="text-2xl font-semibold text-prpl">Безопасность</h3>
              <p className="text-gray-500">Измените пароль для входа</p>
            </div>
        </div>

        <LoadingLink href="/profile/change-password" className="w-full mt-6 button-more">Сменить пароль</LoadingLink>
        </div>
      </div>

      {user.isTeacher && (
        <div className="mt-8 flex max-h-[200px]  flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="h-1 h-1 bg-gradient-to-r from-[#7A4385] via-[#8D4C98] to-[#A75BB3]" />
            <div className="p-6 md:p-8 flex flex-col h-full justify-center">
        <div className="flex flex-col text-center sm:text-left sm:flex-row items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <Pencil size={22} strokeWidth={1.8}  />
          </div>
          
            <div>
              <h3 className="text-2xl font-semibold text-prpl">Информация о вас</h3>
              <p className="text-gray-500">Измените или дополните ее </p>
            </div>
        </div>

        <LoadingLink href="/profile/change-info" className="w-full mt-6 button-more">Изменить информацию</LoadingLink>
        </div>
      </div>
      )}
      
     
      </div>
    </div>
</section>

    )
}