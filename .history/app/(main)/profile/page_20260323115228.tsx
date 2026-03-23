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
  isAdmin: boolean
}

interface Program {
  id: number
  name: string
  dates: string
  price: string
  up.created_at
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

 const getDaysLeft = (createdAt: string) => {
  const start = new Date(createdAt)
  const end = new Date(start)

  end.setFullYear(end.getFullYear() + 1)

  const now = new Date()
  const diff = end.getTime() - now.getTime()

  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

  return (
    <section className="flex flex-col justify-center items-center px-4">
      <h1 className="text-prpl font-semibold text-center mt-28">
        Личный кабинет
      </h1>

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 mt-8">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white py-3">
          <h2 className="text-prpl font-semibold text-2xl p-4">Программы обучения</h2>
          {programs.length === 0 && (
            <p className="text-gray-500 px-5 pb-4">
              Вы пока не записаны ни на одну программу
            </p>
          )}

          <ul className="flex flex-col gap-4 px-3 pb-4">
           {programs.map(p => {
  const daysLeft = getDaysLeft(p.created_at)

  const endDate = new Date(p.created_at)
  endDate.setFullYear(endDate.getFullYear() + 1)

  return (
    <Link key={p.id} href={`/programs/${p.id}`}>
      <li className="p-4 rounded-lg shadow-md border border-gray-300 py-8">
        <div className="font-semibold">{p.name}</div>

        <div className="text-sm mt-2">
          {daysLeft > 0
            ? `Осталось ${daysLeft} дней`
            : "Срок истёк"}
        </div>

        <div className="text-xs text-gray-400 mt-1">
          До: {endDate.toLocaleDateString()}
        </div>
      </li>
    </Link>
  )
})}
          </ul>

        </div>
      {user.isTeacher ? ( 
        <div className="grid w-full items-center grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 mt-8 rounded shadow-2xl bg-white"> 
        {user.photo_url && ( 
          <div className="flex justify-center md:justify-start"> 
          <ImageWithSkeleton src={user.photo_url} alt="Фото преподавателя" wrapperClassName="max-w-[220px] max-h-[220px] !rounded !border-2 border-prpl" aspect="1/1" /> 
          </div> 
        )} 
        <div className="flex flex-col p-3 min-w-0 "> 
          <div className="flex items-center mt-4 pr-4 justify-start w-full"> 
            <HatGlasses className="inline-block text-default w-5 -mt-0.5 mr-1 text-prpl" /> 
            <h2 className="text-prpl font-semibold text-2xl">Преподаватель</h2> 
          </div> 
          <ul className="text-default text-lg py-4 break-words"> 
            <li> <strong>Фамилия:</strong> <span className="ml-1">{user.last_name}</span> </li> 
            <li> <strong>Имя:</strong> <span className="ml-1">{user.name}</span> </li> 
            <li> <strong>Отчество:</strong> <span className="ml-1">{user.patronymic ?? ""}</span> </li> 
          </ul> <LogoutButton /> 
        </div> 
      </div> ) : (

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white">
          {!user.isTeacher && (
            <div className="flex flex-col p-4">
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
              {user.isAdmin && (
                <div className="mt-10 px-2">
                  <Link href={'/dashboard/manager'} className="text-lg hover:underline">Перейти в админку</Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>
      
      

    </section>
  )
}