"use client"

import Link from "next/link"
import { useState } from "react"

interface Program {
    id: number
    name: string
    slug: string
}

interface Props {
    program: Program[]
}


export default function ProgramList({program} : Props) {
    const [value, setValue] = useState("")


    const filtred = program.filter(p => p.name.toLowerCase().startsWith(value.toLowerCase()))

    return (
        <>

        <div className="border border-gray-300 p-4 mt-8">
               <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите название программы" className="border border-gray-300" />
            </div>
        <ul className="grid gap-4 mt-20">
        {filtred.map(p =>

                    <div key={p.id} className="flex items-center justify-between border border-gray-300 shadow-md rounded-md p-4 !text-lg">
                        <p className="!text-xl">{p.name}</p>
                        <Link  href={`/dashboard/admin/programs/${p.slug}`} className="cursor-ponter hover:opacity-80">Редактировать</Link>
                    </div>
                
            )}
            </ul>
        </>
    )
}