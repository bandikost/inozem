import { getPrograms } from "@/lib/programm"
import ProgramList from "./components/Programlist"


export const metadata = {
  title: 'Редактор программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4 mb-10">
            <h1 className="text-prpl font-semibold mt-27 text-center">Редактирование / Добавление программы</h1>
            <ProgramList program={program} />
        </section>
    )
}