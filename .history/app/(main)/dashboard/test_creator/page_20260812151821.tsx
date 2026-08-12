import LoadingLink from "@/components/Load/LoadingLink"
import { ChevronRight } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"




export default async function Page() {

    const cookieStore = await cookies()
        const manager = cookieStore.get("manager")
        if (!manager) redirect("/dashboard")

    return (
        <section className="flex flex-col mt-27 px-6"> 
    <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 text-left">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Создание/Редактирование тест(-а/-ов)
                </span>
            
            </nav>
    <h1 className="text-prpl text-center">Тесты | Админ</h1>

    </section> 
    )
}