import { redirect } from "next/navigation"
import { getIndividProgram, ProgramRow } from "@/lib/programm"
import { getProfile } from "@/lib/getProfile"
import TokenCheck from "@/components/token/token"
import ProfileClient from "./ProfileClient"
import { UserRow } from "@/app/interface/user"

export const metadata = {
  title: "Личный кабинет | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}



export default async function Page() {
  console.time("TOTAL_PAGE")

  const token = await TokenCheck()

  let user: UserRow
  let programs: ProgramRow[] = []

  try {
  
    console.time("DB_profile")
    user = await getProfile(token)
    console.timeEnd("DB_profile")

    console.time("DB_programs")
    programs = await getIndividProgram(user.id)
    console.timeEnd("DB_programs")

  } catch  {
    console.timeEnd("TOTAL_PAGE")
    redirect("/login")
  }

  console.timeEnd("TOTAL_PAGE")

  return <ProfileClient programs={programs} user={user} />
}