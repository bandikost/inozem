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
        <div className="fixed lef-10 h-10 border border-gray-300 rounded-md">
            
        </div>,
        document.body
    )
}