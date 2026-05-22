import { getPrograms } from "@/lib/programm"
import Link from "next/link"



export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4">
            <h1 className="text-prpl font-semibold mt-27 text-center">Редактирование / Добавление программы</h1>
            <ul className="grid gap-4 mt-20">
                {program.map(p => (
                    <div key={p.id} className="flex justify-between border border-gray-300 shadow-md rounded-md p-4 !text-lg">
                        <p>{p.name}</p>
                        <Link href="" className="curosr-ponter hover:opacity-80">Редактировать</Link>
                    </div>
                ))}
                </ul>
        </section>
    )
}