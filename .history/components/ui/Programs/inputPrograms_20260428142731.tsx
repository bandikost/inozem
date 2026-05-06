'use client'

import { useCallback, useMemo, useState } from "react";
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties";
import { ProgramRow } from "@/lib/programm";
import ProgrammCard from "./ProgrammCard";
import PriceList from "./PriceList";
import FormsAndActs from "./FormsAndActs";
import { useLoadingStore } from "@/components/Load/loadingStore";
import { delay } from "@/lib/delay";


export default function InputPrograms({ programs }: { programs: ProgramRow[] }) {
    const [inputValue, setInputValue] = useState("")
    const [visibleItems, setVisibleItems] = useState(10)
    const [education, setEducation] = useState("")
    const [time, setTime] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [activeTab, setActiveTab] = useState<"programs" | "price" | "forms">("programs")
    const [showFilter, setShowFilter] = useState(false)
    const show = useLoadingStore((s) => s.show)
    const hide = useLoadingStore((s) => s.hide)

    const handleShowFilter = async () => {
        show()
        await delay(500)
        setShowFilter(prev => !prev)
        hide()
    }
    const handleShowMore = useCallback(async () => {
        show()
        await delay(500)
        setVisibleItems(prev => prev + 12)
        hide()
    }, [])

    const filteredPrograms = useMemo(() => {
    let filtered = programs

    if (inputValue) filtered = filtered.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))

    if (education) filtered = filtered.filter(p => p.education?.toLowerCase() === education.toLowerCase())

    if (time) {
    const timeNumber = Number(time)
    filtered = filtered.filter(p => p.time?.includes(timeNumber))
    }

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
            <button className="button-more text-xl block tablet:!hidden w-full" onClick={handleShowFilter}>{showFilter ? "Скрыть фильтры" : "Показать фильтры"}</button>

            <div className={`${showFilter ? "flex" : "hidden"} tablet:flex flex-col gap-4 items-center border border-gray-300 rounded-md bg-white`}>

                <div className="flex flex-col items-start p-6 !-ml-8">
                    <h3 className="text-prpl mb-4 !font-normal text-center !text-2xl ">Уровень образования</h3>
                    
                        <div className="flex flex-col gap-1">
                                    {["Среднее", "Высшее", "Без мед.образования"].map((item) => (
                                        <label key={item} className="flex items-center gap-2 cursor-pointer hover:opacity-70 !text-lg ">
                                        
                                        <input type="radio" name="education_level" value={item} checked={education === item} onChange={(e) => {
                                            setEducation(e.target.value)
                                            setSpecialization("")
                                            setTime("")
                                            setActiveTab("programs")}}
                                            className="appearance-none w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center checked:bg-[#8D4C98] checked:border-purple-100 relative"/>
                                        <span>{item}</span>
                                        </label>
                                    ))}
                        </div>
                    
                </div>

                <hr className="border border-gray-200 w-9/10" />

                <div className="flex flex-col items-start px-6">
                    <h3 className="text-prpl mb-4 !font-normal !text-2xl">Направление</h3>
                    
                        {education !== "без образования" && (
                            <select name="specialization" value={specialization} 
                            onChange={(e) => {
                            setSpecialization(e.target.value)
                            setActiveTab("programs") 
                            }} required={education !== "без образования"}
                                className="border border-zinc-400 p-2 w-[300px] rounded text-zinc-700 !text-lg">

                                <option value="">Выберите специальность </option>
                                    {(education === "Высшее" ? HIGHER_SPECIALTIES : SECONDARY_SPECIALTIES).map((spec) => (
                                        <option key={spec} value={spec}>
                                                {spec}
                                        </option>
                                    ))}
                            </select>
                        )}
                    
                </div>
                
                <hr className="border border-gray-200 w-9/10" />

                <div className="flex flex-col items-start px-6 !-ml-8">
                    <h3 className="text-prpl mb-4 !font-normal text-center !text-2xl">Кол-во часов обучения</h3>
                    
                        <div className="flex flex-col gap-1">
                                    {["576", "504", "288", "144", "72", "36", "18"].map((item) => (
                                        <label key={item} className="flex items-center gap-2 cursor-pointer hover:opacity-70 !text-lg ">
                                        
                                        <input type="radio" name="time" value={item} checked={time === item} onChange={(e) => {
                                            setTime(e.target.value)
                                            setActiveTab("programs")}}
                                            className="appearance-none w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center checked:bg-[#8D4C98] checked:border-purple-100 relative"/>
                                        <span>{item}</span>
                                        </label>
                                    ))}
                        </div>
                    
                </div>

                <hr className="border border-gray-200 w-9/10" />

                <div className="grid grid-cols-2 items-center gap-3 mt-2 px-1 pb-3">
                    <button className="button-more" onClick={() => setActiveTab("price")}>Прейскурант</button>
                    <button className="button-more" onClick={() => setActiveTab("forms")}> Формы, анкеты</button>
                </div>   
            
            </div>     
            <button className="button-more">Сбросить фильтры</button>                     
           
           
            {activeTab === "programs" && (<ProgrammCard filteredPrograms={filteredPrograms} visibleItems={visibleItems} handleShowMore={handleShowMore}/>)}
            {activeTab === "price" && <PriceList />}
            {activeTab === "forms" && <FormsAndActs />}
            {filteredPrograms.length === 0 && <p className="w-full mt-10 text-zinc-700 !text-lg flex items-center justify-center"> Программ не найдено.</p>}
            
            
            
           
        </div>

    </section>
    )

}