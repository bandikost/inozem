import { redirect } from "next/navigation"
import { getIndividProgram, ProgramRow } from "@/lib/programm"
import { getProfile } from "@/lib/getProfile"
import TokenCheck from "@/components/token/token"
import ProfileClient from "./ProfileClient"
import { UserRow } from "@/app/interface/user"
import { getUserTests } from "@/lib/test"

export const metadata = {
  title: "Личный кабинет | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}



export default async function Page() {
  const token = await TokenCheck()

  let user: UserRow
  let programs: ProgramRow[] = []
  let tests = []

  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }


  programs = await getIndividProgram(user.id)

  try {
    tests = await getUserTests(user.id)
  } catch (error) {
    console.error("TESTS ERROR:", error)
    tests = []
  }


  return (
    <ProfileClient 
      programs={programs}
      user={user}
      tests={tests}
    />
  )
}