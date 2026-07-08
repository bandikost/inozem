import LoadingLink from "@/components/Load/LoadingLink";
import InputPrograms from "@/components/ui/Programs/inputPrograms";
import { getPrograms } from "@/lib/programm";
import { MoveLeft } from "lucide-react";

export const revalidate = 3600

export const metadata = {
  title: 'Программы обучения | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
  const programs = await getPrograms()
  return  (
    <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Программы обучения
        </span>
      
      </nav>
      <LoadingLink href="/" className="flex gap-1 items-center mb-2 hover:underline hover:opacity-90"><MoveLeft size={20} />Вернуться на главную страницу</LoadingLink>
        <InputPrograms programs={programs} />
        </div>
    </section>
  )
 
}