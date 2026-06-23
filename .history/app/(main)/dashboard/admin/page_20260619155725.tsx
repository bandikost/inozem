import { getPrograms } from "@/lib/programm"
import ProgramList from "./components/Programlist"
import Link from "next/link"
import { MoveLeft } from "lucide-react"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Выбор программ | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
    const program = await getPrograms()
     const cookieStore = await cookies()
      const manager = cookieStore.get("manager")
    
      if (!manager) redirect("/dashboard")

    return (
        <section className="flex flex-col px-4 mb-10">

            <div className="flex items-center justify-between mt-27">
                <Link href="/dashboard/manager" className="!text-lg !font-normal hover:underline flex items-center gap-1"><MoveLeft size={20} /> Вернуться в меню</Link>
                <h1 className="text-prpl font-semibold  text-center ">Редактирование / Добавление программы</h1>
            </div>

            <ProgramList program={program} />
        </section>
    )
}