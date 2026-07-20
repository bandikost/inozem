

import { getProgramBlocks, getProgramBySlug } from "@/lib/programm";
import ProgramEditor from "../../components/ProgramEditor";
import { ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoadingLink from "@/components/Load/LoadingLink";


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export const metadata = {
  title: 'Редактор программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
      
    if (!manager) redirect("/dashboard")

    const {slug} = await params
    const program = await getProgramBySlug(slug)
    if (!program) return null

    const blocks = await getProgramBlocks(program.id)
    

  return (
    <section className="mx-auto mt-27 max-w-7xl px-6 pb-16">
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
            
                  <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                  </LoadingLink>
            
                  <ChevronRight size={14} className="shrink-0" />
    
            
              <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                Мероприятия
              </span>
            
            </nav>
  
      
      {program && (
        <ProgramEditor initialProgram={{...program, blocks}}
        />
      )}
    </section>
  );
}