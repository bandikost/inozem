"use client"

import { items } from "@/data/accredNotice"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export default function SideButtons() {

    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(item => item.id === activeId)

    if (!activeItem) return null


    return (
        <div className="flex flex-col gap-8 mt-8">


            <div className="overflow-x-auto border-b border-zinc-200">

                <div className="flex min-w-max">

                    {items.map(item => (

                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`
                                relative
                                whitespace-nowrap
                                px-5
                                py-4
                                text-lg
                                !font-normal
                                transition
                                cursor-pointer

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
                                    left-0
                                    right-0
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


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            ">

                {activeItem.links?.map((link, index) => (

                    <div key={index}>

                        {link.url ? (

                            <a
                                href={link.url}
                                target="_blank"
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    w-full
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    px-5
                                    py-4
                                    text-lg
                                    text-zinc-800
                                    transition
                                    hover:border-blue
                                    hover:shadow-md
                                "
                            >

                                <span className="pr-4 group-hover:text-blue transition">
                                    {link.name}
                                </span>

                                <ArrowUpRight size={22} className="text-zinc-400 group-hover:text-blue w-5 h-5 shrink-0"/>

                            </a>

                        ) : (

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    px-5
                                    py-4
                                    text-lg
                                    text-zinc-800
                                "
                            >
                                {link.name}
                            </div>

                        )}

                    </div>

                ))}

            </div>


        </div>
    )
}