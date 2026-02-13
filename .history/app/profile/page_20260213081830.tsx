import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { GraduationCap, HatGlasses } from "lucide-react"
import LogoutButton from "@/components/ui/LogoutButton"

interface User {
  id: number
  name: string
  last_name: string
  patronymic: string | null
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
    throw new Error("Failed to fetch profile")
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
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-prpl font-semibold text-3xl text-center mt-10">
        Личный кабинет
      </h1>
        <div className="grid grid-cols-2 gap-8 mt-8">
      <div className="border-2 border-dotted border-zinc-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-start">
                {user.photo_url && <img src={user.photo_url}   width={120} height={120} className="rounded-full ml-4" alt="Profile"/>}
                 {user.isTeacher ? (
            <div className="flex items-center mt-2">
                <div className="flex underline">
                    <HatGlasses className="inline-block text-default w-5 -mt-0.5 mr-1" /> 
                    <p className="!font-semibold ">Преподаватель</p>
                </div>
                
            </div>
        ) : (
            <div className="flex items-center">
                <div className="flex underline">
                    <GraduationCap className="inline-block text-default w-5 -mt-0.5 mr-1" /> 
                    <p className="!font-semibold">Слушатель: </p>
                </div>
                <p className="text-default text-lg px-4"> {user.last_name} {user.name} {user.patronymic ?? ""}</p>
            </div>
        )}
            </div>
             
            <div className="flex flex-col">
            <h2 className="text-prpl text-2xl mr-4">Пользователь</h2>
            <p className="text-default text-lg py-4"> {user.last_name} {user.name} {user.patronymic ?? ""}</p>
            <LogoutButton />
        </div>
        </div>
         
        </div> 
      </div>

    </section>
  )
}
