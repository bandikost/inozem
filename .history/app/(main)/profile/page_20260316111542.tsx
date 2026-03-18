import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Book, HatGlasses } from "lucide-react"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import { getIndividProgram } from "@/lib/programm"
import Link from "next/link"

interface User {
  id: number
  name: string
  last_name: string
  patronymic: string | null
  education_level: string
  specialization?: string
  email: string
  phone: string
  isTeacher: boolean
  photo_url: string | null
  created_at: string
}

interface Program {
  id: number
  name: string
  dates: string
  price: string
}

async function getProfile(token: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Ошибка получения профиля")
  }

  return res.json()
}

export default async function ProfilePage() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user: User
  let programs: Program[] = []

  try {
    user = await getProfile(token)
    programs = await getIndividProgram(user.id)
  } catch {
    redirect("/login")
  }

  return (
    <section className="flex flex-col justify-center items-center px-4">
      <h1 className="text-prpl font-semibold text-center mt-28">
        Личный кабинет
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white">
          {!user.isTeacher && (
            <div className="flex flex-col p-3">
              <div className="flex items-center mt-4">
                <Book className="w-5 mr-1 text-prpl" />
                <h2 className="text-prpl font-semibold text-2xl">
                  Слушатель
                </h2>
              </div>

              <ul className="text-lg py-4">
                <li><strong>Фамилия:</strong> {user.last_name}</li>
                <li><strong>Имя:</strong> {user.name}</li>
                <li><strong>Отчество:</strong> {user.patronymic}</li>
              </ul>

              <LogoutButton />
            </div>
          )}
        </div>

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">

          <h2 className="text-prpl font-semibold text-2xl p-3">
            Программы обучения
          </h2>

          {programs.length === 0 && (
            <p className="text-gray-500 px-3 pb-4">
              Вы пока не записаны ни на одну программу
            </p>
          )}

          <ul className="flex flex-col gap-2 px-3 pb-4">
            {programs.map(p => (
              <li key={p.id} className="rounded-lg shadow-md border border-gray-300 bg-card">
                <Link
                  href={`/programs/${p.id}`}
                  className="text-prpl underline hover:text-purple-800"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}