
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ManagerPage() {
  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  return (
      <section className="flex flex-col items-center mt-27">
        <h1>Admin</h1>
        <Link href={"/dasboard/users"} className="text-blue">Выдача кабинета пользователю</Link>
      </section>
  )
}