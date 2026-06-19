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
const token = await TokenCheck()

  try {
    const user = await getProfile(token)
    const programs = await getIndividProgram(user.id)

    return <ProfileClient programs={programs} user={user} />
  } catch {
    redirect("/login")
  }
}