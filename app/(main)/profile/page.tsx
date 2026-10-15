import { redirect } from "next/navigation"
import { getIndividProgram, ProgramRow } from "@/lib/programm"
import { getProfile } from "@/lib/getProfile"
import TokenCheck from "@/components/token/token"
import ProfileClient from "./ProfileClient"
import { UserRow } from "@/app/interface/user"
import { getActivityPayed } from "@/lib/activity"
import { getLeaderboardTests } from "@/lib/leaderboard"

export const metadata = {
  title: "Личный кабинет | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}

export default async function Page() {
  const token = await TokenCheck()
 
  let user: UserRow
  let programs: ProgramRow[] = []
 {/*  let tests = []
  try {
    tests = await getUserTests(user.id)
  } catch (error) {
    tests = []
  }
  */}

  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }

   const tests = await getLeaderboardTests(user.id)
  programs = await getIndividProgram(user.id)

  

  const activitylist = await getActivityPayed(user.id)


  return (
    <ProfileClient 
      programs={programs}
      user={user}
      tests={tests}
      activitylist={activitylist}
    />
  )
}