import { getPrograms } from "@/lib/programm"
import Link from "next/link"
import InputSearchProgram from "./components/Buttons/InputSearchProgram"



export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4 mb-10">
            <h1 className="text-prpl font-semibold mt-27 text-center">Редактирование / Добавление программы</h1>
            <div className="border border-gray-300 p-4">
                <InputSearchProgram program={program} />
            </div>
            <ul className="grid gap-4 mt-20">
                {program.map(p => (
                    <div key={p.id} className="flex items-center justify-between border border-gray-300 shadow-md rounded-md p-4 !text-lg">
                        <p className="!text-xl">{p.name}</p>
                        <Link  href={`/dashboard/admin/programs/${p.slug}`} className="curosr-ponter hover:opacity-80">Редактировать</Link>
                    </div>
                ))}
                </ul>
        </section>
    )
}