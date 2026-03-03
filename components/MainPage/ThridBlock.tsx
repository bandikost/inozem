import { getTeachers } from "@/lib/users"
import Image from "next/image"
import Link from "next/link"

export default async function ThirdBlock() {
    const teachers = await getTeachers()

    return (
        <section className="w-full flex flex-col gap-4 mt-20 px-4 ">
                <div className="flex flex-col items-center tablet:items-start">
                <h1 className="text-center">Преподаватель месяца</h1>
                <p className="mt-2 text-center">Какая то информация защпшсгшподпкылжад asdasdasd</p>
            </div>
                {teachers.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500 bg-white p-4 rounded-lg shadow-md border border-gray-300">Преподаватели временно недоступны</p>
                ) : (
                    <ul>
                        {teachers.map(teach => (
                            <li key={teach.id}>
                                <div className="flex flex-col tablet:flex-row gap-6 items-center py-2 ">
                                    
                                    <img src={teach.photo_url} width={100} height={100} className="w-50 h-50 object-cover tablet:object-unset shadow-2xl rounded-lg !border-2 border-prpl" loading="lazy" alt="Преподаватель месяца"/>
                                 
                                   <div className="flex flex-col items-center tablet:items-start px-8 bg-white p-4 rounded-lg shadow-md border border-gray-300 ">
                                        <p className="!font-semibold text-lg text-center tablet:text-left">{teach.last_name} {teach.name} {teach.patronymic} </p>
                                        <p className="py-2 !font-medium text-center tablet:text-left">{teach.education_level} - {teach.specialization}</p>
                                        <p className="!text-md !font-medium my-4 text-center tablet:text-left">{teach.Teacher_text}</p>
                                        <Link href={"/"} className="button-more">Перейти к программам</Link>
                                   </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
   
          
        </section>
    )
}
