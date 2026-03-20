
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ManagerPage() {
  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  return (
      <section className="flex flex-col items-center mt-30">
        <h1>Админ</h1>
        <div className="grid grid-cols-2 gap-8 items-center justify-center mt-10">
            <Link href={"/dashboard/users"} className="text-lg text-blue border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3 hover:opacity-70 hover:underline">
                Выдача кабинета пользователю
            </Link>

            <Link href={"/dashboard/accred"} className="text-lg text-blue border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3 hover:opacity-70 hover:underline">
                Выгрузка протоколов аккредетации
            </Link>

            <Link href={"/dashboard/users"} className="text-lg text-blue border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3 hover:opacity-70 hover:underline">
                Выдача кабинета пользователю
            </Link>
        </div>
      </section>
  )
}