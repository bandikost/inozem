import Link from "next/link";
import AnimatedNumber from "./components/AnimatedNumber";
import { getAllUsers } from "@/lib/users";


export default async function SecondBlock() {

    const users = await getAllUsers()

    return (
        <section className="w-full flex flex-col  gap-4 mt-20">

            <div className="flex flex-col items-center tablet:items-start px-4">
                <h2 className="text-prpl">О нас</h2>
                <p className="mt-2 text-center !text-medium">Более подробная информация об академии <Link href={"/about"} className="hover:underline">в разделе </Link></p>
            </div>
                 <div className="flex flex-col items-center">
            <ul className=" mt-4 text-center grid grid-cols-1 lg:grid-cols-4 gap-8 items-center justify-center p-4">

                <li className="bg-card w-[270px] h-[270px] text-center flex flex-col justify-center text-prpl text-3xl border border-gray-300 py-10 tablet:py-8 rounded-xl shadow-2xl">
                    Более {users.length} <p className="text-default  text-sm">Обучающихся</p>
                </li>
                    
                <li className="bg-card w-[270px] h-[270px] text-3xl text-center flex flex-col justify-center border border-gray-300 py-8 rounded-xl shadow-2xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={120}/>+
                    </div>
                    <p className="text-default  text-sm px-3">Образовательных программ</p>
                </li>
                <li className="bg-card w-[270px] h-[270px] text-3xl text-center flex flex-col justify-center border border-gray-300 py-8 rounded-xl shadow-2xl">
                    <div className="flex items-center justify-center text-prpl">
                        <AnimatedNumber value={96}/>%
                    </div>
                    <p className="text-default  text-sm px-3">Успешной аттестации</p>
                </li>
                 <li className="bg-card w-[270px] h-[270px] text-center flex flex-col justify-center text-3xl border border-gray-300 py-8 rounded-xl shadow-2xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={84}/>%
                    </div>
                    <p className="text-default  text-sm px-3">Трудоустройства после обучения</p>
                </li>
                        
            </ul>
            </div>
        </section>
    )
}