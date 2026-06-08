import { getPrograms } from "@/lib/programm"
import ProgramList from "./components/Programlist"
import Link from "next/link"
import { MoveLeft } from "lucide-react"


export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Выбор программ | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4 mb-10">

            <div className="flex items-center justify-between mt-27">
                <Link href="/dashboard/manager" className="flex items-center gap-2 ml-4 text-gray-500 hover:text-gray-700 hover:opacity-60">
                    <MoveLeft size={20} /> Вернуться в меню менеджера
                </Link>
                <h1 className="text-prpl font-semibold  text-center ">Редактирование / Добавление программы</h1>
            </div>

            <ProgramList program={program} />
        </section>
    )
}