import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { GraduationCap, HatGlasses } from "lucide-react"
import LogoutButton from "@/components/ui/LogoutButton"

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
      <h1 className="text-prpl font-semibold text-3xl text-center mt-27">
        Личный кабинет
      </h1>
        <div className="grid grid-cols-2 gap-8 mt-8">
      <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">
        <div className="grid grid-cols-2 w-full">

            <div className="flex flex-col items-start ml-4" >
                {user.photo_url && <img src={user.photo_url}   width={150} height={150} className="rounded-xs " alt="Profile"/>}
                 {user.isTeacher ? (
            <div className="flex items-center mt-2">
                <div className="flex underline">
                    <HatGlasses className="inline-block text-default w-5 -mt-0.5 mr-1" /> 
                    <p className="!font-semibold ">Преподаватель</p>
                </div>
                
            </div>
        ) : (
            <div className="flex items-center">
                <div className="flex flex-col ">
                  <div className="flex underline">
                    <GraduationCap className="inline-block text-default w-5 -mt-0.5 mr-1" /> 
                    <p className="!font-semibold">Слушатель: </p>
                  </div>
                    <p className="mt-2 text-zinc-900">{user?.specialization}</p>
                    <p className="text-zinc-900">{user.education_level}</p>
                </div>
            </div>
        )}
            </div>
             
            <div className="flex flex-col">
            <h3 className="text-prpl text-2xl mr-4">Пользователь</h3>
            <ul className="text-default text-lg py-4">   
              <li><strong>Фамилия:</strong> <span >{user.last_name}</span></li>
              <li><strong>Имя:</strong><span className="ml-1">{user.name}</span></li>
              <li><strong>Отчество:</strong><span className="ml-1">{user.patronymic ?? ""}</span></li>
            </ul>
            <LogoutButton />
        </div>
        </div>
         
        </div> 

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">    
            <h3 className="text-prpl font-semibold text-2xl">Программы обучения</h3>
        </div>

      </div>

    </section>
  )
}
