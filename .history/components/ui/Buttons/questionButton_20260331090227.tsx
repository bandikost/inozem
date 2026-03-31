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
                <div className="bg-white border border-gray-300 rounded-md w-[320px] h-[400px] shadow-2xl relative">
                    {openMenu && <button className="absolute -right-2 -top-2 hover:opacity-80" onClick={() => handleOpenMenu()}><CircleX className="cursor-pointer" size={30} fill="red" /></button> }
                    <div></div>
                    <h3 className="px-2 py-3 border-b border-gray-300 bg-prpl rounded-b rounded-md text-white !text-base flex items-center gap-1">
                        <Circle size={10} fill="green" stroke="green" />
                        Робот-Помощник | Инозем
                    </h3>
                    <p className="mt-1 py-3 px-4">Добрый день! Часто задаваемые вопросы находятся <Link className="hover:underline" href={"/contacts"} onClick={() => handleOpenMenu()}>в разделе</Link></p>
                    <hr className="border border-gray-300" />
                    <p className="mt-1 py-3 px-4">Вы можете заполнить заявку на интересующую вас программу и наши сотрудники ответят вам в ближайшее время!</p>
                </div>
            )}
            {!openMenu && <button className="button-more" onClick={() => handleOpenMenu()}>Часто задаваемы вопросы</button> }

        </section>
    )
}