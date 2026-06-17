'use client'

import { Circle, CircleX, MessageCircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function QuestionButton() {
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => setOpenMenu(prev => !prev)

    return (
        <section className="fixed bottom-4 right-4 z-50">

    <div
        className={`
            absolute bottom-10 right-0
            w-[calc(100vw-2rem)] sm:w-[360px]
            max-w-[360px]
            rounded-2xl
            bg-white
            border border-gray-200
            shadow-2xl
            overflow-hidden
            transition-all duration-300 ease-out
            ${
                openMenu
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }
        `}
    >
        <button
            onClick={handleOpenMenu}
            className="absolute top-3 right-3 rounded-full p-1 text-gray-500 hover:bg-gray-100 transition"
        >
            <CircleX size={22} className="text-red-500" />
        </button>

        <div className="bg-prpl text-white px-5 py-4">
            <div className="flex items-center gap-2">
                <Circle size={10} fill="limegreen" stroke="limegreen" className="!text-white" />
                <h3 className="font-semibold text-base">
                    Помощь с вопросом
                </h3>
            </div>
        </div>

        <div className="p-5 flex flex-col gap-5">

            <p className="text-sm leading-6 text-gray-700">
                Добрый день! Часто задаваемые вопросы находятся
                <Link
                    href="/contacts"
                    onClick={handleOpenMenu}
                    className="ml-1 font-medium text-prpl hover:underline"
                >
                    в разделе «Контакты».
                </Link>
            </p>

            <hr />

            <p className="text-sm leading-6 text-gray-700">
                Если вы не нашли ответ на свой вопрос, отправьте заявку —
                специалисты академии свяжутся с вами в ближайшее время.
            </p>

            <Link
                href="/question"
                onClick={handleOpenMenu}
                className="button-more w-full text-center"
            >
                Задать вопрос
            </Link>

        </div>
    </div>

    {!openMenu && (
        <button
            onClick={handleOpenMenu}
            className="
                button-more
                flex
                items-center
                gap-2
                rounded-full
                shadow-xl
                hover:scale-105
                transition
                px-5
                py-3
                !text-white
            "
        >
            <MessageCircleQuestionMark size={22} />

            <span className="hidden sm:inline">
                Задать вопрос
            </span>
        </button>
    )}

</section>
    )
}