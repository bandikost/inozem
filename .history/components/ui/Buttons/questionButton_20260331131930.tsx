'use client'

import { Circle, CircleX } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


export default function QuestionButton() {
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => setOpenMenu(prev => !prev)

    return (
        <section className="fixed right-3 bottom-5 z-100">
            
            {openMenu && (
                <div className=" bg-white border border-gray-300 rounded-md w-[280px] h-[360px] shadow-2xl relative">
                    {openMenu && <button className="absolute -right-2 -top-2 hover:opacity-80" onClick={() => handleOpenMenu()}><CircleX className="cursor-pointer" size={30} fill="red" /></button> }
                    
                    <h3 className="px-2 py-3 border-b border-gray-300 bg-prpl rounded-b rounded-md text-white !text-base flex items-center gap-1">
                        <Circle size={10} fill="green" stroke="green" />
                        Робот-Помощник
                    </h3>
                    <div className="flex flex-col items-center">
                        <p className="mt-1 py-3 px-4">Добрый день! Часто задаваемые вопросы находятся <Link className="hover:underline" href={"/contacts"} onClick={() => handleOpenMenu()}>в разделе</Link></p>
                        <hr className="border border-gray-300 w-full" />
                        <p className="mt-1 py-3 px-4">Вы можете заполнить заявку на интересующую вас программу и наши сотрудники ответят вам в ближайшее время!</p>
                        <hr className="border border-gray-300 w-full" />
                        <Link className="button-more mt-3" href={"/bid"} onClick={() => handleOpenMenu()}>Подать заявку на обучение</Link>
                    </div>
                </div>
            )}
            {!openMenu && <button className="button-more" onClick={() => handleOpenMenu()}>Часто задаваемы вопросы</button> }

        </section>
    )
}