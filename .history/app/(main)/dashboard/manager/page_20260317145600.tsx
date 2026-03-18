import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ManagerPage() {
  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/manager-login")

  return <div>Админка</div>
}