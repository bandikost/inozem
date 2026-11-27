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
    <section className="mt-10 w-full min-w-0 max-w-full pb-16">
      <div className="mx-auto mt-27 w-full max-w-7xl min-w-0">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-zinc-500">
          <LoadingLink
            href="/dashboard/manager"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Главная страница Админки
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="truncate text-zinc-800 opacity-70">
            Редактор программ
          </span>
        </nav>

        <ProgramList program={program} />

      </div>
    </section>
  )
}