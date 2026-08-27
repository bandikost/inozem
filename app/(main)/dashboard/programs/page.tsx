import AddProgramForm from "./AddProgramForm";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";


export const metadata = {
  title: 'Создание программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}



export default async function Page() { 
    
return ( 
    <section className="flex flex-col mt-27 px-6"> 
    <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 text-left">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Создание программы
                </span>
            
            </nav>
    <h1 className="text-prpl text-center">Создание программы обучения | Админ</h1> 
    <p className="my-2 text-center">Добавление новой программы</p>
    <AddProgramForm />
    </section> 
) 
}