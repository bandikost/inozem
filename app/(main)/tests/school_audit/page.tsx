import { redirect } from "next/navigation"
import { getProfile } from "@/lib/getProfile"
import TokenCheck from "@/components/token/token"
import { UserRow } from "@/app/interface/user"
import TestPageClient from "./TestPageClient"

export const metadata = {
  title: "Тестирование | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}



export default async function Page() {
  const token = await TokenCheck()

  let user: UserRow

  try {
    user = await getProfile(token)

  } catch  {
    redirect("/login")
  }


  return <TestPageClient user={user} />
}