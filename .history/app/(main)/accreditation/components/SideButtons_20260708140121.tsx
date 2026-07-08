"use client"

import { ArrowUpRight } from "lucide-react"
import { items } from "@/data/accredNotice"
import { useState } from "react"

export default function SideButtons() {

    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(item => item.id === activeId)

    if (!activeItem) return null


    return (
        <div className="flex flex-col gap-6 mt-8">


            <div className="flex flex-col sm:flex-row gap-2 rounded-2xl bg-zinc-100 p-1 max-w-auto h-fit">

                {items.map(item => (

                    <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`px-5 py-3 text-lg rounded-xl transition-all cursor-pointer text-center ${activeId === item.id ? "bg-white shadow-md text-black" : "text-zinc-600 hover:text-black"}`}
                    >
                        {item.title}
                    </button>

                ))}

            </div>



           <div className="flex-1 p-6">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">

        {activeItem.links?.map((link, index) => (

            <div key={index} className="flex">

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
                        transition-all
                        hover:border-blue
                        hover:shadow-md
                        "
                    >

                        <span className="pr-4 leading-snug group-hover:text-blue transition">
                            {link.name}
                        </span>

                        <ArrowUpRight
                            size={22}
                            className="shrink-0 text-zinc-400 group-hover:text-blue transition"
                        />

                    </a>

                ) : (

                    <div
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
                        transition-all
                        hover:border-blue
                        hover:shadow-md
                        "
                    >
                        {link.name}
                    </div>

                )}

            </div>

        ))}

    </div>

</div>


        </div>
    )
}