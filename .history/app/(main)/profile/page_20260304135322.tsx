import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Book, GraduationCap, HatGlasses } from "lucide-react"
import LogoutButton from "@/components/ui/LogoutButton"
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton"

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

async function getProfile(token: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: {
      Cookie: `token=${token}`, 
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Ошибка получения данных профиля")
  }

  return res.json()
}

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user: User

  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }

  return (
    <section className="flex flex-col justify-center items-center px-4">
      <h1 className="text-prpl font-semibold text-3xl text-center mt-28">
        Личный кабинет
      </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      
        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white">
          {user.isTeacher ? (
            <div className="grid w-full items-center grid-cols-1 md:grid-cols-2 gap-4">
              {/* Фото преподавателя */}
              {user.photo_url && (
                <div className="flex justify-center md:justify-start">
                  <ImageWithSkeleton
                    src={user.photo_url}
                    alt="Фото преподавателя"
                    wrapperClassName="max-w-[220px] max-h-[220px] !rounded !border-2 border-prpl"
                    aspect="1/1"
                  />
                </div>
              )}

              {/* Информация */}
              <div className="flex flex-col p-3 min-w-0">
                <div className="flex items-center mt-4 pr-4 justify-start w-full">
                  <HatGlasses className="inline-block text-default w-5 -mt-0.5 mr-1 text-prpl" />
                  <h2 className="text-prpl font-semibold text-2xl">Преподаватель</h2>
                </div>
                <ul className="text-default text-lg py-4 break-words">
                  <li>
                    <strong>Фамилия:</strong> <span className="ml-1">{user.last_name}</span>
                  </li>
                  <li>
                    <strong>Имя:</strong> <span className="ml-1">{user.name}</span>
                  </li>
                  <li>
                    <strong>Отчество:</strong> <span className="ml-1">{user.patronymic ?? ""}</span>
                  </li>
                </ul>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1">
              <div className="flex flex-col p-3 min-w-0">
                <div className="flex items-center mt-4 pr-4 justify-end w-full">
                  <Book className="inline-block text-default w-5 -mt-0.5 mr-1 text-prpl" />
                  <h2 className="text-prpl font-semibold text-2xl">Слушатель</h2>
                </div>
                <ul className="text-default text-lg py-4 break-words">
                  <li>
                    <strong>Фамилия:</strong> <span className="ml-1">{user.last_name}</span>
                  </li>
                  <li>
                    <strong>Имя:</strong> <span className="ml-1">{user.name}</span>
                  </li>
                  <li>
                    <strong>Отчество:</strong> <span className="ml-1">{user.patronymic ?? ""}</span>
                  </li>
                </ul>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3"> 
          {user.isTeacher ? ( 
            <h2 className="text-prpl font-semibold text-2xl p-3">Расписание</h2> 
            ) : ( 
            <h2 className="text-prpl font-semibold text-2xl p-3">Программы обучения</h2> 
            )} 
          </div>
      </div>

    </section>
  )
}
