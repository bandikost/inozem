import { getPrograms } from "@/lib/programm"
import ProgramList from "./components/Programlist"
import { ChevronRight } from "lucide-react"
import LoadingLink from "@/components/Load/LoadingLink";


export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Выбор программ | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4 mb-10">

            <div className="flex items-center justify-between mt-27">
                <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Редактор программ
                </span>
            
            </nav>
                
            </div>
            <ProgramList program={program} />
        </section>
    )
}