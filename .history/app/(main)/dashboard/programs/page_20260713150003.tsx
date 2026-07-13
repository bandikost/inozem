import { cookies } from "next/headers";
import AddProgramForm from "./AddProgramForm";
import { redirect } from "next/navigation";

export default async function Page() { 
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
    if (!manager) redirect("/dashboard")

    
return ( 
    <section className="flex flex-col items-center mt-30"> 
    <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Мероприятия
                </span>
            
            </nav>
    <h1 className="text-prpl">Программы обучения | Админ</h1> 
    <p className="my-2">Добавление новой программы</p>
    <AddProgramForm />
    </section> 
) 
}