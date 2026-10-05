import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import ArchiveClient from "./ArchiveClient";
import TokenCheck from "@/components/token/token";
import { UserRow } from "@/app/interface/user";
import { getProfile } from "@/lib/getProfile";
import { redirect } from "next/navigation";
import { getIndividProgram } from "@/lib/programm";


export const metadata = {
  title: "Архив вебинаров pruffme | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}


export default async function Page() {

    const token = await TokenCheck()
    
      let user: UserRow
    
      try {
        user = await getProfile(token)
      } catch {
        redirect("/login")
      }

    const programs = await getIndividProgram(user.id)
    


    return (
         <section className="min-h-screen pb-10">
    <div className="container max-w-6xl mt-27">
           <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/profile" className="shrink-0 hover:text-blue transition hover:underline">
              Профиль
            </LoadingLink>

             <ChevronRight size={14} className="shrink-0" />
      
            <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Архив записей
            </span>
      
      </nav>

      </div>

      <ArchiveClient programs={programs} />
      </section>
    )
}