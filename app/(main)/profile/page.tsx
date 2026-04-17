import { redirect } from "next/navigation"
import { getIndividProgram, ProgramRow } from "@/lib/programm"
import { getProfile } from "@/lib/getProfile"
import { UserRow } from "@/app/interface/user"
import TokenCheck from "@/components/token/token"
import ProfileClient from "./ProfileClient"


export const metadata = {
  title: 'Личный кабинет | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function Page() {

  const token = await TokenCheck()

  let user: UserRow
  let programs: ProgramRow[] = []

  try {
    user = await getProfile(token)
    programs = await getIndividProgram(user.id)
  } catch {
    redirect("/login")
  }


  return (
   <ProfileClient programs={programs} user={user} />
  )
}