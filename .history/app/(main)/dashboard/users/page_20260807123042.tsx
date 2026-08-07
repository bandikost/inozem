import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UsersClient from "./UsersClient"
import { getAllUsers } from "@/lib/users"
import { getPrograms } from "@/lib/programm"


export const metadata = {
  title: 'Выдача программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {

  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  const users = await getAllUsers()
  const programs = await getPrograms()

  return <UsersClient users={users} programs={programs} />
}