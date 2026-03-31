'use client'

import { useState } from "react"

export default function CheckBox(){
    const [checked, setChecked] = useState(false)

    return (
        <input type="checkbox" className="cursor-pointer scale-130" checked={checked} onChange={(e) => setChecked(e.target.checked) } />
    )
}