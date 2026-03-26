import Link from "next/link";
import AnimatedNumber from "./components/AnimatedNumber";
import { getAllTeachers, getAllUsers } from "@/lib/users";


export default async function SecondBlock() {

    const users = await getAllUsers()
    const teacher = await getAllTeachers()
    const teachers = teacher.map(t => t.isTeacher === 0)

    return (
        <section className="w-full flex flex-col  gap-4 mt-20">

            <div className="flex flex-col items-center tablet:items-start px-4">
                <h2 className="text-prpl">О нас</h2>
                <p className="mt-2 text-center">Более подробная информация об академии в разделе "<Link href={"/about"} className="hover:underline">О нас</Link>"</p>
            </div>
                 <div className="flex flex-col items-center">
            <ul className="w-full max-w-full mt-4 text-center grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center p-4">

                <li className="w-full max-w-[300px] md:max-w-full mx-auto text-blue text-3xl border border-gray-300 py-10 tablet:py-8 rounded-xl shadow-xl">
                    Более {users.length} <p className="text-default text-sm">Обучающихся</p>
                </li>

                <li className="w-full max-w-[300px] md:max-w-full mx-auto text-prpl text-3xl border border-gray-300 py-10 tablet:py-8 rounded-xl shadow-xl ">
                    <div className="flex items-center justify-center">
                        ~ <AnimatedNumber value={10}/> минут
                    </div>
                    <p className="text-default text-sm">Пешком от Дворцовой</p>
                </li>
                    
                <li className="w-full max-w-[300px] md:max-w-full mx-auto text-3xl border border-gray-300 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={120}/>+
                    </div>
                    <p className="text-default text-sm px-3">Образовательных программ</p>
                </li>
                <li className="w-full max-w-[300px] md:max-w-full mx-auto text-3xl border border-gray-300 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-prpl">
                        <AnimatedNumber value={96}/>%
                    </div>
                    <p className="text-default text-sm px-3">Успешной аттестации</p>
                </li>
                 <li className="w-full max-w-[300px] md:max-w-full mx-auto text-3xl border border-gray-300 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={84}/>%
                    </div>
                    <p className="text-default text-sm px-3">Трудоустройства после обучения</p>
                </li>
                 <li className="w-full max-w-[300px] md:max-w-full mx-auto text-3xl border border-gray-300 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-prpl">
                       <p className="text-default text-sm">Свыше </p> {teachers.length}
                    </div>
                    <p className="text-default text-sm px-3">Преподаваталей</p>
                </li>
                        
            </ul>
            </div>
        </section>
    )
}