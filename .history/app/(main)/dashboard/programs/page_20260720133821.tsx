import { cookies } from "next/headers";
import AddProgramForm from "./AddProgramForm";
import { redirect } from "next/navigation";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

export default async function Page() { 
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
    if (!manager) redirect("/dashboard")

    
return ( 
    <section className="flex flex-col items-center mt-27"> 
    <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Программы
                </span>
            
            </nav>
    <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Управление программами
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Новая программа
        </h1>

        <p className="mt-3 max-w-2xl text-base text-gray-500">
          Заполните основные данные образовательной программы. После создания
          её можно будет дополнительно настроить.
        </p>
      </div>
    <AddProgramForm />
    </section> 
) 
}