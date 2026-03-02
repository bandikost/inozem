import { getTeachers } from "@/lib/users"

export default async function ThirdBlock() {
    const teachers = await getTeachers()

    return (
        <section className="grid grid-cols-2 justify-center gap-8 mt-10">
            <div className="border-2 border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-prpl text-3xl font-light px-8 py-4 rounded-t flex items-center justify-center gap-2">
                    Преподаватель месяца:
                </h1>
                <hr className="border-zinc-300" />
                {teachers.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500">Преподаватели временно недоступны</p>
                ) : (
                    <ul>
                        {teachers.map(teach => (
                            <li key={teach.id}>
                                <div className="flex items-center px-6 py-2 gap-4">
                                   <img src={teach.photo_url} width={100} height={100} className="w-72" loading="lazy" alt="Преподаватель месяца"/>
                                    <p className="ml-2">{teach.name} {teach.last_name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
          
        </section>
    )
}
