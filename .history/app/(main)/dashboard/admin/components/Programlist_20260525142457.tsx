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

        <div className="flex flex-col items-center border border-gray-300 w-full rounded-md bg-green pt-5 pb-8 mt-10">
         <div className="flex flex-col items-start px-4">
                <h1 className="text-white !font-normal mt-10">Каталог программ</h1>
                <h3 className="text-white !font-normal mt-2">Более 100 действующих программ обучения</h3>
                <input value={value} onChange={(e) => setValue(e.target.value) } className="mt-10 border border-zinc-400 rounded p-4 w-full max-w-[600px] !text-default !text-xl border border-gray-300  rounded-md bg-white" placeholder="Введите название..." />
            </div>
        </div>
        <ul className="grid gap-4 mt-8">
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