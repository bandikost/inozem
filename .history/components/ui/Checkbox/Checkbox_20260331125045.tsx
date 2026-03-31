'use client'

import Link from "next/link"
import { useState } from "react"

export default function CheckBox152(){
    const [checked, setChecked] = useState(false)

    return (
        <div>
            <div className="flex">
            <input type="checkbox" className="cursor-pointer scale-130 mt-2" checked={checked} onChange={(e) => setChecked(e.target.checked) } />
            <p className="text-base text-zinc-700 ml-3">Согласие на <Link target="_blank" href={"/files/personalize/personal-data.pdf"} className="text-blue hover:!text-blue-700 hover:underline">обработку персональных данных</Link></p>
        </div>
            <button type="submit" className="button-more mt-4">Отправить заявку</button>
        </div>
        
        
    )
}