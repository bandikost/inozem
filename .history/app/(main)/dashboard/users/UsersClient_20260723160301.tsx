"use client"

import { UserRow } from "@/app/interface/user"
import LoadingLink from "@/components/Load/LoadingLink"
import { getHourWord } from "@/components/ui/GetHourWord"
import { ProgramRow } from "@/lib/programm"
import {
  ChevronRight,
  Mail,
  Phone,
  GraduationCap,
  Stethoscope,
  Search,
  UserRound,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

interface UsersClientProps {
  users: UserRow[]
  programs: ProgramRow[]
}

export default function UsersClient({
  users,
  programs,
}: UsersClientProps) {
  const [value, setValue] = useState("")
  const [visibleItems, setVisibleItems] = useState(8)
  const [selectedPrograms, setSelectedPrograms] = useState<
    Record<number, number>
  >({})

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 8)
  }

  const handleSelectProgram = (userId: number, programId: number) => {
    setSelectedPrograms((prev) => ({
      ...prev,
      [userId]: programId,
    }))
  }

  const handleAssign = async (userId: number) => {
    const programId = selectedPrograms[userId]

    if (!programId) {
      alert("Выберите программу")
      return
    }

    try {
      const res = await fetch("/api/user-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          programId,
        }),
      })

      if (!res.ok) {
        throw new Error("Ошибка назначения")
      }

      alert("Программа назначена ✅")
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert("Ошибка сервера")
    }
  }

  const processedUsers = useMemo(() => {
    return users
      .filter((user) =>
        `${user.last_name} ${user.name} ${user.patronymic}`
          .toLowerCase()
          .startsWith(value.toLowerCase())
      )
      .sort((a, b) =>
        a.last_name.localeCompare(b.last_name, "ru")
      )
  }, [users, value])

  return (
    <section className="min-h-screen bg-zinc-50/40 px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-6xl">

    
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <LoadingLink
            href="/dashboard/manager"
            className="transition hover:text-prpl"
          >
            Главная страница админки
          </LoadingLink>

          <ChevronRight size={15} />

          <span className="text-zinc-800">
            Пользователи
          </span>
        </nav>

   
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-prpl/10 text-prpl">
              <UserRound size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-medium tracking-tight text-prpl">
                Пользователи
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Управление доступом к образовательным программам
              </p>
            </div>
          </div>
        </div>

  
        <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск по фамилии..."
              className="
                h-12 w-full rounded-xl
                border border-zinc-200
                bg-zinc-50/60
                pl-11 pr-4
                text-sm
                outline-none
                transition
                placeholder:text-zinc-400
                focus:border-prpl/50
                focus:bg-white
                focus:ring-4
                focus:ring-prpl/10
              "
            />
          </div>

          <p className="mt-3 text-xs text-zinc-400">
            Поиск выполняется по фамилии пользователя
          </p>
        </div>


        <div className="space-y-4">
          {processedUsers
            .slice(0, visibleItems)
            .map((user) => {
              const userPrograms = user.program_name
                ? user.program_name
                    .split(",")
                    .map((program) => program.trim())
                : []

              const availablePrograms = programs.filter(
                (program) =>
                  !userPrograms.some(
                    (userProgram) =>
                      userProgram.toLowerCase() ===
                      program.name.trim().toLowerCase()
                  )
              )

              const fullName = [
                user.last_name,
                user.name,
                user.patronymic,
              ]
                .filter(Boolean)
                .join(" ")

              const initials = `${user.last_name?.[0] ?? ""}${
                user.name?.[0] ?? ""
              }`

              return (
                <article
                  key={user.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-zinc-200
                    bg-white
                    transition
                    hover:border-zinc-300
                    hover:shadow-md
                  "
                >
                
                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                    
                      <div className="min-w-0 flex-1">

                        <div className="mb-6 flex items-center gap-4">
                          <div className="
                            flex h-14 w-14 shrink-0
                            items-center justify-center
                            rounded-2xl
                            bg-prpl/10
                            text-lg
                            font-medium
                            text-prpl
                          ">
                            {initials}
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-lg font-medium text-zinc-900">
                              {fullName}
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                              Пользователь академии
                            </p>
                          </div>
                        </div>

                      
                        <div className="grid gap-3 sm:grid-cols-2 ">

                        <div className="border border-gray-200 rounded-2xl p-3">
                          <InfoItem
                            icon={<Mail size={16} />}
                            label="Электронная почта"
                            value={user.email}
                          />
                          </div>

                          <div className="border border-gray-200 rounded-2xl p-3">

                          <InfoItem
                            icon={<Phone size={16} />}
                            label="Телефон"
                            value={
                              user.phone
                                ? `+${user.phone}`
                                : "Не указан"
                            }
                          />
                            </div>
                            <div className="border border-gray-200 rounded-2xl p-3">
                          <InfoItem
                            icon={<GraduationCap size={16} />}
                            label="Образование"
                            value={user.education_level}
                          />
                            </div>
                      <div className="border border-gray-200 rounded-2xl p-3">
                          <InfoItem
                            icon={<Stethoscope size={16} />}
                            label="Специальность"
                            value={user.specialization}
                          />
                          </div>

                        </div>

                    
                        {userPrograms.length > 0 && (
                          <div className="mt-6 border-t border-zinc-100 pt-5">
                            <p className="mb-3 text-sm font-medium text-zinc-800">
                              Доступные программы
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {userPrograms.map((name) => {
                                const program = programs.find(
                                  (item) =>
                                    item.name.trim().toLowerCase() ===
                                    name.trim().toLowerCase()
                                )

                                if (!program) return null

                                return (
                                  <Link
                                    key={program.id}
                                    href={`/programs/${program.slug}`}
                                    className="
                                      rounded-lg
                                      bg-prpl/8
                                      px-3
                                      py-2
                                      text-sm
                                      text-prpl
                                      transition
                                      hover:bg-prpl/15
                                    "
                                  >
                                    {program.name}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>

                
                  <div className="border-t border-zinc-100 bg-zinc-50/60 p-5 sm:p-6">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

                      <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium text-zinc-800">
                          Добавить программу
                        </label>

                        <select
                          value={selectedPrograms[user.id] ?? ""}
                          onChange={(e) =>
                            handleSelectProgram(
                              user.id,
                              Number(e.target.value)
                            )
                          }
                          className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white
                            px-3
                            text-sm
                            text-zinc-700
                            outline-none
                            transition
                            focus:border-prpl/50
                            focus:ring-4
                            focus:ring-prpl/10
                          "
                        >
                          <option value="">
                            Выберите образовательную программу
                          </option>

                          {availablePrograms.map((program) => (
                            <option
                              key={program.id}
                              value={program.id}
                            >
                              {program.name} — {program.time}{" "}
                              {getHourWord(program.time)} —{" "}
                              {program.education}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAssign(user.id)}
                        className="
                          flex
                          h-11
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-prpl
                          px-5
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:opacity-90
                          active:scale-[0.98]
                          sm:shrink-0
                        "
                      >
                        <Plus size={17} />
                        Добавить программу
                      </button>

                    </div>
                  </div>
                </article>
              )
            })}
        </div>

  
        {visibleItems < processedUsers.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleShowMore}
              className="
                rounded-xl
                border
                border-zinc-200
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-zinc-700
                shadow-sm
                transition
                hover:border-prpl/40
                hover:text-prpl
              "
            >
              Показать ещё
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string | null
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 shrink-0 text-zinc-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-zinc-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm text-zinc-700">
          {value || "Не указан"}
        </p>
      </div>
    </div>
  )
}