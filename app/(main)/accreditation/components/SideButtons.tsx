"use client"

import { items } from "@/data/accredNotice"
import { useState } from "react"
import { ArrowUpRight, FileText } from "lucide-react"

export default function SideButtons() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(item => item.id === activeId)

    if (!activeItem) return null

    return (
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm md:rounded-3xl">

            {/* HEADER */}
            <div className="bg-blue px-4 py-5 sm:px-5 sm:py-6 md:px-6">
                <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
                    Информация для аккредитуемых
                </h2>

                <p className="mt-1.5 text-xs leading-5 text-white/80 sm:text-sm">
                    Правила, документы, нормативная база и дополнительная информация
                </p>
            </div>

            {/* CONTENT */}
            <div className="p-3 sm:p-5 md:p-8">

                {/* TABS */}
                <div className="border-b border-zinc-200">

                    <div className="flex overflow-x-auto scrollbar-none">
                        {items.map(item => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveId(item.id)}
                                className={`
                                    relative
                                    shrink-0
                                    px-3
                                    py-3
                                    text-sm
                                    font-normal
                                    transition
                                    cursor-pointer
                                    sm:px-4
                                    sm:py-4
                                    sm:text-base
                                    md:px-5
                                    md:text-lg

                                    ${
                                        activeId === item.id
                                            ? "text-blue"
                                            : "text-zinc-500 hover:text-zinc-900"
                                    }
                                `}
                            >
                                {item.title}

                                {activeId === item.id && (
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-2
                                            right-2
                                            h-0.5
                                            rounded-full
                                            bg-blue
                                        "
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                </div>

                {/* LINKS */}
                <div className="mt-5 sm:mt-6 md:mt-8">

                    <div className="space-y-2.5 sm:space-y-3">

                        {activeItem.links?.map((link, index) => {

                            if (link.url) {
                                return (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            border
                                            border-zinc-200
                                            bg-white
                                            px-3
                                            py-3
                                            transition

                                            hover:border-blue
                                            hover:shadow-sm

                                            sm:gap-4
                                            sm:rounded-2xl
                                            sm:px-4
                                            sm:py-4

                                            md:px-5
                                        "
                                    >

                                        {/* ICON */}
                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-blue/10
                                                text-blue

                                                sm:h-10
                                                sm:w-10
                                                sm:rounded-xl
                                            "
                                        >
                                            <FileText
                                                size={17}
                                                className="sm:h-[19px] sm:w-[19px]"
                                            />
                                        </div>

                                        {/* NAME */}
                                        <span
                                            className="
                                                min-w-0
                                                flex-1
                                                text-sm
                                                leading-5
                                                text-zinc-800
                                                transition
                                                group-hover:text-blue

                                                sm:text-base
                                                sm:leading-6
                                            "
                                        >
                                            {link.name}
                                        </span>

                                        {/* ARROW */}
                                        <ArrowUpRight
                                            size={18}
                                            className="
                                                shrink-0
                                                text-zinc-400
                                                transition
                                                group-hover:text-blue

                                                sm:h-5
                                                sm:w-5
                                            "
                                        />

                                    </a>
                                )
                            }

                            return (
                                <div
                                    key={index}
                                    className="
                                        rounded-xl
                                        border
                                        border-zinc-100
                                        bg-zinc-50
                                        px-3
                                        py-3
                                        text-sm
                                        leading-6
                                        text-zinc-600

                                        sm:px-4
                                        sm:py-4
                                        sm:text-base
                                    "
                                >
                                    {link.name}
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>

        </section>
    )
}