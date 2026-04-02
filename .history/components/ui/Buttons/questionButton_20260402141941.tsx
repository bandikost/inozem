'use client'

import { Circle, CircleX } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function QuestionButton() {
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => setOpenMenu(prev => !prev)

    return (
        <section className="fixed -right-1 -bottom-1 z-10">
            
            <div
                className={`bg-white border border-gray-300 rounded-md shadow-2xl relative transform transition-all duration-300 ease-in-out
                    ${openMenu ? "opacity-100 scale-100 mr-5 mb-5" : "opacity-0 scale-75 pointer-events-none"}
                `}>
                {openMenu && (
                    <>
                        <button 
                            className="absolute -right-2 -top-2 hover:opacity-80" 
                            onClick={handleOpenMenu}
                        >
                            <CircleX className="cursor-pointer" size={30} fill="red" />
                        </button>

                        <h3 className="px-2 py-3 border-b border-gray-300 bg-prpl rounded-b rounded-md text-white !text-base flex items-center gap-1">
                            <Circle size={10} fill="green" stroke="green" />
                            Помощь с вопросом
                        </h3>
                        <div className="flex flex-col items-center  h-[340px] w-[280px]">
                            <p className="mt-1 py-3 px-4 !text-base">
                                Добрый день! Часто задаваемые вопросы находятся 
                                <Link 
                                    className="hover:underline" 
                                    href={"/contacts"} 
                                    onClick={handleOpenMenu}
                                >
                                    в разделе
                                </Link>
                            </p>
                            <hr className="border border-gray-300 w-full" />
                            <p className="mt-1 py-3 px-4 !text-base">
                                Вы можете заполнить заявку на интересующую вас программу, и наши сотрудники ответят вам в ближайшее время!
                            </p>
                            <hr className="border border-gray-300 w-full" />
                            <Link 
                                className="button-more mt-6" 
                                href={"/bid"} 
                                onClick={handleOpenMenu}
                            >
                                Подать заявку на обучение
                            </Link>
                        </div>
                    </>
                )}
            </div>
            {!openMenu && (
                <button 
                    className="button-more shadow transform transition-all duration-300 hover:scale-105" 
                    onClick={handleOpenMenu}
                >
                    Часто задаваемые вопросы
                </button>
            )}
        </section>
    )
}