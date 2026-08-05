import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import ChangeInfoClient from "./ChangeInfoClient";
import { UserRow } from "@/app/interface/user";
import TokenCheck from "@/components/token/token";
import { getProfile } from "@/lib/getProfile";



export default async function Page() {
    const token = await TokenCheck()
    let user: UserRow
    user = await getProfile(token)


    return (
        <section className="min-h-screen pb-10">
    <div className="container max-w-6xl px-2 my-27">
           <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-2">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/profile" className="shrink-0 hover:text-blue transition hover:underline">
              Личный кабинет
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Смена информации о себе
        </span>
      
      </nav>

      <ChangeInfoClient />

      </div>
      </section>
    )
}