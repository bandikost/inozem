'use client'

import { useState } from "react";
import ProgramsButtons from "../Buttons/ProgramsButtons";


export default function Content() {
    const [activeId, setActiveId] = useState(1)

    return (
        <>
        <ProgramsButtons setActiveId={setActiveId} activeId={activeId} />
    <section className="flex flex-col justify-center px-4 px-6 mt-27 relative">
       
      <h1 className="text-3xl font-semibold text-prpl text-center">
        Программы обучения
      </h1>
       
        {activeId === 1 && <SidesButtons />}
        {activeId === 2 && <List />}
        {activeId === 3 && <InputPrograms programs={programs} />}
      

    </section>
        </>
    )
}