import { getTeachers } from "@/lib/users"
import Link from "next/link"

export default async function ThirdBlock() {
    const teachers = await getTeachers()

    return (
        <section className="border-2 border-dotted border-zinc-300 rounded shadow-2xl mt-10">
       
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
                                <div className="flex items-start px-2 py-2">
                                   <img src={teach.photo_url} width={100} height={100} className="w-44 h-44 object-cover" loading="lazy" alt="Преподаватель месяца"/>
                                   <div className="flex flex-col items-start px-6">
                                        <p className="!font-semibold text-lg">{teach.last_name} {teach.name} {teach.patronymic} </p>
                                        <p className="py-2">{teach.education_level} - {teach.specialization}</p>
                                        <p className="">{teach.Teacher_text}</p>
                                        <button className="bg-[#6EDED8] text-white px-4 py-2 mt-4.5 rounded"><Link href={"/"}>Перейти к программам</Link></button>
                                   </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
   
          
        </section>
    )
}
