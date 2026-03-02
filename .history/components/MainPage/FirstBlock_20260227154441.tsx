import { Image, MoveRight } from "lucide-react";
import Link from "next/link";

export default async function FirstBlock() {

    return (
        <section className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white">
           <div className="grid grid-cols-2 gap-8 px-4">
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white"></div>
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white flex flex-col p-4">
                    <div className="rounded-xl shadow-xl border border-gray-200">
                        <div className="flex p-4">
                            <Image />
                            <div className="flex flex-col px-4">
                                <h1 className="text-xl">Образовательные мероприятия</h1>
                                <p className="text-base">Семинары, мастер-классы и конференции</p>
                                <Link href={"/"} className="flex mt-4 text-blue-600">Посмотреть мероприятия <MoveRight className="pl-2" /> </Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className="rounded-xl shadow-xl border border-gray-200 mt-6">
                        <div className="flex p-4">
                            <Image />
                            <div className="flex flex-col px-4">
                                <h1 className="text-xl">Образовательные мероприятия</h1>
                                <p className="text-base">Семинары, мастер-классы и конференции</p>
                                <Link href={"/"} className="flex mt-4 text-blue-600">Посмотреть мероприятия <MoveRight className="pl-2" /> </Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex justify-between mt-8 gap-2">
                        <div className="rounded-xl shadow-xl border border-gray-200">
                        <div className="flex p-4">
                            <Image />
                            <div className="flex flex-col px-4">
                                <h1 className="text-xl">Аккредитация</h1>
                                <p className="text-base">Семинары, мастер-классы и конференции</p>
                                <Link href={"/"} className="flex mt-4 text-blue-600">Посмотреть мероприятия <MoveRight className="pl-2" /> </Link>
                            </div>
                        </div>
                        
                    </div>
                        <div className="rounded-xl shadow-xl border border-gray-200">
                        <div className="flex p-4">
                            <Image />
                            <div className="flex flex-col px-4">
                                <h1 className="text-xl">Акции и скидки</h1>
                                <p className="text-base">Семинары, мастер-классы и конференции</p>
                                <Link href={"/"} className="flex mt-4 text-blue-600">Посмотреть мероприятия <MoveRight className="pl-2" /> </Link>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
           </div>
        </section>
    )
}