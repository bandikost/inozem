import LoadingLink from "@/components/Load/LoadingLink";
import InputPrograms from "@/components/ui/Programs/inputPrograms";
import { getPrograms } from "@/lib/programm";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: 'Образование | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
  const programs = await getPrograms()
  return  (
    <section className="min-h-screen">
    <div className="container mx-auto px-2 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Образование
        </span>
      
      </nav>
        <InputPrograms programs={programs} />
        </div>
    </section>
  )
 
}