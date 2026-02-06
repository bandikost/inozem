type Teachers = {
    id: number,
    first_name: string,
    last_name: string
}

export default async function ThirdBlock() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
    if (!res.ok) throw new Error('Failed to fetch teachers')

    const teachers: Teachers[] = await res.json()

    return (
        <section className="grid grid-cols-2 justify-center gap-8 mt-10">
            <div className="border border-dotted border-zinc-300 rounded hover:shadow-2xl">
                <h1 className="text-prpl text-3xl font-light px-8 py-4 rounded-t flex items-center justify-center gap-2">
                     Наши преподаватели - мастера своего дела:
                </h1>
                <ul>
                    {teachers.map(teach => (
                        <li key={teach.id} className="flex items-center px-6">
                            <div className="border rounded-full w-10 h-10 bg-black"></div>
                            <p className="ml-4 py-4">{teach.first_name} {teach.last_name}</p>
                        </li>
                    ))}
                </ul>
                
            </div>
            <div className="border border-dotted border-zinc-300 rounded hover:shadow-2xl">
                <h1 className="text-white bg-prpl text-3xl font-light px-8 py-4 rounded-t text-center gap-2">
                       Наши особенности
                </h1>
                 <hr className="border-zinc-300" />
                <div className="flex flex-col items-center justify-center">   
                    <ul className="w-full mt-4 text-center grid gap-4">
                        <li className="text-blue text-3xl">17 лет <p className="text-default text-sm">Предоставляем качество</p></li>
                         <hr className="border-zinc-200" />
                        <li className="text-prpl text-3xl">10 минут<p className="text-default text-sm">Пешком от Дворцовой</p></li>
                         <hr className="border-zinc-200" />
                        <li className="text-blue text-3xl">15 000+<p className="text-default text-sm">Слушателей, прошедших обучение</p></li>
                         <hr className="border-zinc-100" />
                    </ul>
                </div>
            </div>
            
        </section>
    )
}