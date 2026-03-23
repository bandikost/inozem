import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Book, HatGlasses } from "lucide-react"
import LogoutButton from "@/components/ui/Buttons/LogoutButton"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import { getIndividProgram, ProgramRow } from "@/lib/programm"
import Link from "next/link"
import { getProfile, User } from "@/lib/getProfile"


export default async function ProfilePage() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user: User
  let programs: ProgramRow[] = []

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

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 mt-8">

        <div className="border border-gray-300 mt-8 rounded shadow-2xl bg-white pt-3">
          <h2 className="text-prpl font-semibold text-2xl p-4">Программы обучения</h2>
          {programs.length === 0 && (
            <p className="text-gray-500 px-5 pb-4">
              Вы пока не записаны ни на одну программу
            </p>
          )}

          <ul className="flex flex-col gap-4">
  {programs.map(p => {
    const endDate = new Date(p.created_at)
    const time = parseInt(p.time, 10)

    if (time < 71) endDate.setMonth(endDate.getMonth() + 1)
    else if (time < 143) endDate.setMonth(endDate.getMonth() + 2)
    else if (time < 287) endDate.setMonth(endDate.getMonth() + 3)
    else if (time < 500) endDate.setFullYear(endDate.getFullYear() + 1)
    else endDate.setFullYear(endDate.getFullYear() + 1)

    return (
      <Link key={p.id} href={`/programs/${p.slug}`} className="hover:underline hover:bg-gray-100">
        <li className="p-4 shadow-md border-y border-gray-300 py-8">
          <p className="font-semibold !text-xl ">{p.name}</p>
          <p className="!text-sm text-gray-500 mt-1">
            До: {endDate.toLocaleDateString()}
          </p>
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
            <div className="flex flex-col">
              <div className="flex items-center mt-4 p-4">
                <Book className="w-5 mr-1 text-prpl " />
                <h2 className="text-prpl font-semibold text-2xl ">
                  {user.isAdmin ? `Администратор` : `Слушатель`}
                </h2>
                
              </div>
              {user.isAdmin && (
                <div className="-ml-2">
                  <Link href={'/dashboard/manager'} className="text-lg hover:underline !text-white bg-prpl px-4 py-1 shadow-xl rounded-xs">Перейти в админку</Link>
                </div>
              )}
              <ul className="text-lg p-4">
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