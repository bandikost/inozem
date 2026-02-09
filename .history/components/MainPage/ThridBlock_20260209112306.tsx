

import AnimatedNumber from "./components/AnimatedNumber"

type Teachers = {
    id: number,
    name: string,
    last_name: string,
    photo_url: string,
    isTeacher?: boolean
}



export default async function ThirdBlock() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
    if (!res.ok) throw new Error('Failed to fetch teachers')

    const teachers: Teachers[] = await res.json()

    return (
        <section className="grid grid-cols-2 justify-center gap-8 mt-10">
            <div className="border-2 border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-prpl text-3xl font-light px-8 py-4 rounded-t flex items-center justify-center gap-2">
                     Наши преподаватели:
                </h1>
                 <hr className="border-zinc-300" />
                <ul>
                {teachers.map(teach => (
                    <li key={teach.id} className="flex flex-col items-center px-6 py-2 gap-4">
                       
                    {teach.photo_url && (
                        <>
                        <img 
                        src={teach.photo_url} 
                        alt={`${teach.name} ${teach.last_name}`} 
                        className="w-18 h-18 rounded-full object-cover border" 
                        />
                          <hr className="border-zinc-300 w-full h-2" />
                        </>
                        
                    )}

                    <p className="ml-2">{teach.name} {teach.last_name}</p>
                   
                    </li>
                    
                ))}
                </ul>

                
            </div>
            <div className="border border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-white bg-blue text-3xl font-light px-8 py-4 rounded-t text-center gap-2">
                       Наши особенности
                </h1>
                 <hr className="border-zinc-300" />
                <div className="flex flex-col items-center justify-center">   
                    <ul className="w-full mt-4 text-center grid gap-4">
                        <li className="text-blue text-3xl">{`>`}17 лет <p className="text-default text-sm">Предоставляем качество</p></li>
                         <hr className="border-zinc-300" />
                        <li className="text-prpl text-3xl"><div className="flex items-center justify-center">
                                ~ <AnimatedNumber value={10}/> минут
                            </div>
                            <p className="text-default text-sm">Пешком от Дворцовой</p></li>
                         <hr className="border-zinc-300" />
                        <li className="text-blue text-3xl">
                            <div className="flex items-center justify-center">
                                <AnimatedNumber value={15000}/>+
                            </div>
                        <p className="text-default text-sm">Слушателей, прошедших обучение</p></li>
                         <hr className="border-zinc-100" />
                    </ul>
                </div>
            </div>
            
        </section>
    )
}