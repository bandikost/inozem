'use client'

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


export default function PortalPrograms(){
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])


    if (!mounted) return null

    return createPortal(
        <div className="fixed left-10 top-1/2 h-10 border border-gray-300 rounded-md">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>,
        document.body
    )
}