'use client'

import { useMemo, useState } from "react";
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties";
import { ProgramRow } from "@/lib/programm";
import ProgrammCard from "./ProgrammCard";
import PriceList from "./PriceList";
import FormsAndActs from "./FormsAndActs";


export default function InputPrograms({ programs }: { programs: ProgramRow[] }) {
    const [inputValue, setInputValue] = useState("")
    const [visibleItems, setVisibleItems] = useState(10)
    const [education, setEducation] = useState("")
    const [time, setTime] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [activeTab, setActiveTab] = useState<"programs" | "price" | "forms">("programs")

    const handleShowMore = () => setVisibleItems(prev => prev + 12)

    const filteredPrograms = useMemo(() => {
    let filtered = programs

    if (inputValue) filtered = filtered.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))

    if (education) filtered = filtered.filter(p => p.education?.toLowerCase() === education.toLowerCase())

    if (time) filtered = filtered.filter(p => p.time?.toLowerCase() === time.toLowerCase())    
    
    if (specialization)  filtered = filtered.filter(p =>  p.specialization?.toLowerCase().startsWith(specialization.toLowerCase()))

    

    return filtered
}, [inputValue, education, specialization, programs, time])

    
    return (
    <section className="flex flex-col items-center">

        <div className="flex flex-col items-center border border-gray-300 w-full rounded-md bg-green pt-5 pb-8">
         <div className="flex flex-col items-start px-4">
                <h1 className="text-white !font-normal mt-10">Каталог программ</h1>
                <h3 className="text-white !font-normal mt-2">Более 100 действующих программ обучения</h3>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="mt-10 border border-zinc-400 rounded p-4 w-full max-w-[600px] !text-default !text-xl border border-gray-300  rounded-md bg-white" placeholder="Введите название..." />
            </div>
        </div>

       

        
        <div className="flex flex-col items-center tablet:flex-row tablet:items-start mb-20 mt-10 gap-6">

            
            
           
            {activeTab === "programs" && (<ProgrammCard filteredPrograms={filteredPrograms} visibleItems={visibleItems} handleShowMore={handleShowMore}/>)}
            {activeTab === "price" && <PriceList />}
            {activeTab === "forms" && <FormsAndActs />}
            {filteredPrograms.length === 0 && <p className="w-full mt-10 text-zinc-700 !text-lg flex items-center justify-center"> Программ не найдено.</p>}
      
            
            
           
        </div>

    </section>
    )

}