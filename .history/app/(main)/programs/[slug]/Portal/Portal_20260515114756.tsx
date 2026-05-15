'use client'

import { createPortal } from "react-dom";


export default function PortalPrograms(){

    return createPortal(
        <div>

        </div>,
        document.body
    )
}