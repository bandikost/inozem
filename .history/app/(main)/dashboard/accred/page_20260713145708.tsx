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
                Аккредитация
                </span>
            
            </nav>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-prpl">
                Панель аккредитации
                </h1>
                

                <p className="text-gray-500 mt-3 text-lg">
                    Управление расписанием и протоколов
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/accred/schedule" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-4">📅</div>

                    <h2 className="text-2xl font-semibold text-prpl">
                        Предстоящие
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Расписание экзаменов.
                    </p>
                </Link>

                <Link href="/dashboard/accred/result" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-4">📄</div>

                    <h2 className="text-2xl font-semibold text-prpl">
                        Прощедшие
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Выгрузка протоколов.
                    </p>
                </Link>
            </div>  
        </section>
    )
}