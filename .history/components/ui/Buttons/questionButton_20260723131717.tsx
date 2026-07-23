'use client'

import LoadingLink from "@/components/Load/LoadingLink"
import { Circle, CircleX, MessageCircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function QuestionButton() {
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => setOpenMenu(prev => !prev)

    return (
        <section className="fixed bottom-2 right-2 z-50">

    <div
        className={`
            absolute bottom-4 right-0
            w-[calc(100vw-2rem)] sm:w-[360px]
            max-w-[360px]
            rounded-2xl
            bg-white
            border 
            border-gray-200
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

       

     
    </div>

    {!openMenu && (
        <button
            onClick={handleOpenMenu}
            className="
                button-more
                flex
                items-center
                gap-2
                !rounded-full
                shadow-xl
                hover:scale-105
                transition
                p-5
                !text-white
                w-20 sm:w-auto
            "
        >
            <MessageCircleQuestionMark size={26} />

            <LoadingLink href="/question" className="hidden sm:inline">
                Задать вопрос
            </LoadingLink>
        </button>
    )}

</section>
    )
}