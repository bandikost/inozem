type Teachers = {
    id: number,
    name: string,
    last_name: string,
    photo_url: string,
    isTeacher?: boolean
}

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Failed to fetch ${url}`)
    return await res.json()
  } catch (err) {
    console.error('safeFetch: плохой ответ с', url, 'возвращаем fallback', err)
    return fallback
  }
}

export default async function ThirdBlock() {
    const teachers = await safeFetch<Teachers[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, [])

    return (
        <section className="grid grid-cols-2 justify-center gap-8 mt-10">
            <div className="border-2 border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-prpl text-3xl font-light px-8 py-4 rounded-t flex items-center justify-center gap-2">
                     Наши преподаватели:
                </h1>
                <hr className="border-zinc-300" />
                {teachers.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500">Преподаватели временно недоступны</p>
                ) : (
                    <ul>
                        {teachers.slice(0, 3).map((teach, i) => (
                            <li key={teach.id}>
                                <div className="flex items-center px-6 py-2 gap-4">
                                    {teach.photo_url && (
                                        <img 
                                            src={teach.photo_url} 
                                            width={100}
                                            height={100}
                                            alt={`${teach.name} ${teach.last_name}`} 
                                            className="w-18 h-18 rounded-full object-cover border" 
                                        />
                                    )}
                                    <p className="ml-2">{teach.name} {teach.last_name}</p>
                                </div>
                                {i < 2 && <hr className="border-zinc-300 w-full h-2" />}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
          
        </section>
    )
}
