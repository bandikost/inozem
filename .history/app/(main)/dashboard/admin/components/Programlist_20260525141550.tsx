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

        <div className="border border-gray-300 p-4">
               <input value={value} />
            </div>
        
        {filtred && (
                <ul className="grid gap-4 mt-20">
                {program.map(p => (
                    <div key={p.id} className="flex items-center justify-between border border-gray-300 shadow-md rounded-md p-4 !text-lg">
                        <p className="!text-xl">{p.name}</p>
                        <Link  href={`/dashboard/admin/programs/${p.slug}`} className="cursor-ponter hover:opacity-80">Редактировать</Link>
                    </div>
                ))}
                </ul>
            )}
        </>
    )
}