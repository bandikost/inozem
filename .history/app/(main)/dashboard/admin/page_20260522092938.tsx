import { getPrograms } from "@/lib/programm"



export default async function Page() {
    const program = await getPrograms()

    return (
        <section className="flex flex-col px-4">
            <h1 className="text-prpl font-semibold mt-27 text-center">Редактирование / Добавление программы</h1>
            <ul className="grid gap-2 mt-20">
                {program.map(p => (
                    <li key={p.id}>{p.name}</li>
                ))}
                </ul>
        </section>
    )
}