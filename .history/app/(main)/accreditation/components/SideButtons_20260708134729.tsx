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

                <div className="grid gap-3 grid-cols-2items-center">

                    {activeItem.links?.map((link,index) => (

                        <div key={index}>


                            {link.title && (
                                <h3 className="text-green text-xl mb-3">
                                    {link.title}
                                </h3>
                            )}



                            {link.url ? (

                                <a href={link.url} className="group flex items-center justify-between rounded-2xl border border-zinc-200 px-5 py-4 text-lg text-zinc-800 transition-all hover:border-blue hover:shadow-md">

                                    <span className="group-hover:text-blue transition">
                                        {link.name}
                                    </span>


                                    <ArrowUpRight
                                        size={20}
                                        className="text-zinc-400 group-hover:text-blue transition"
                                    />

                                </a>


                            ) : (

                                <p className="text-lg text-zinc-700 px-3">
                                    {index + 1}. {link.name}
                                </p>

                            )}


                        </div>

                    ))}

                </div>


            </div>


        </div>
    )
}