
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ManagerPage() {
  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  return (
      <section className="flex flex-col items-center mt-30">
        <div className="flex flex-col items-center justify-center">
            <h1>Admin</h1>
            <Link href={"/dashboard/users"} className="text-blue">Выдача кабинета пользователю</Link>
        </div>
      </section>
  )
}