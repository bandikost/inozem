import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight, MoveLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


export default async function Page() {
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")  
    if (!manager) redirect("/dashboard")

    return (
        <section className="max-w-6xl mx-auto px-6 mt-34">
             <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Мероприятия
                </span>
            
            </nav>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-prpl">
                    Редактор мероприятий
                </h1>
                

               
            </div>  
        </section>
    )
}