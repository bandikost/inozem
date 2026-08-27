

import { getProgramBlocks, getProgramBySlug } from "@/lib/programm";
import ProgramEditor from "../../components/ProgramEditor";
import { ChevronRight } from "lucide-react";
import LoadingLink from "@/components/Load/LoadingLink";


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export const metadata = {
  title: 'Редактор программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const {slug} = await params
    const program = await getProgramBySlug(slug)
    if (!program) return null

    const blocks = await getProgramBlocks(program.id)
    

  return (
    <section className="mx-auto mt-27 max-w-7xl px-2 pb-16">
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 px-4 text-md text-zinc-500">
            
                  <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                  </LoadingLink>
            
                  <ChevronRight size={14} className="shrink-0" />
    
                  <LoadingLink href="/dashboard/admin/" className="shrink-0 hover:text-blue transition hover:underline">
                    Редактор программ
                  </LoadingLink>
            
                  <ChevronRight size={14} className="shrink-0" />

              <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                {program.name}
              </span>
            
            </nav>
  
      
      {program && (
        <ProgramEditor initialProgram={{...program, blocks}} />
      )}
    </section>
  );
}