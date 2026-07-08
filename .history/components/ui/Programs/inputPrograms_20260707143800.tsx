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
    const [category, setCategory] = useState("")
    const [time, setTime] = useState("")
    const [timeSecondary, setTimeSecondary] = useState("")
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

    if (category) filtered = filtered.filter(p => p.category?.trim().toLowerCase() === category.trim().toLowerCase())

    if (time || timeSecondary) filtered = filtered.filter(p => (time && p.time === Number(time)) || (timeSecondary && p.time_secondary === Number(timeSecondary)))
    
    if (specialization)  filtered = filtered.filter(p =>  p.specialization?.split(",")?.map((s) => s.trim().toLowerCase()).includes(specialization.toLowerCase()))

    

    return filtered
}, [inputValue, education, specialization, timeSecondary, time, category])

    
    return (
<section className="pb-20">


    <div className="rounded-3xl bg-green px-8 py-12 shadow-xl">

        <div className="max-w-3xl">

            <h1 className="!text-2xl sm:text-4xl font-semibold text-white">
                Каталог образовательных программ
            </h1>

            <p className="mt-3 text-xl text-white/80">
                Более {programs.length} действующих программ повышения квалификации и профессиональной переподготовки.
            </p>

            <div className="mt-8">

                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="🔍 Поиск по названию программы..."
                    className="
                    w-full
                    rounded-2xl
                    border-0
                    bg-white
                    px-6
                    py-4
                    text-lg
                    shadow-lg
                    outline-none
                    focus:ring-4
                    focus:ring-white/40
                    "
                />

            </div>

        </div>

    </div>

  

    <div className="mt-8 flex justify-center md:justify-end">

        <div className="grid grid-cols-1 w-full sm:grid-cols-3 rounded-2xl bg-zinc-100 p-1">

            <button
                onClick={() => setActiveTab("programs")}
                className={`px-6 py-3 transition !font-normal cursor-pointer text-xl border-b border-zinc-300 sm:border-b-0  ${
                    activeTab === "programs"
                        ? "bg-white shadow text-black rounded-none sm:rounded-xl"
                        : "text-zinc-600 hover:text-black "
                }`}
            >
                Каталог
            </button>

            <button
                onClick={() => setActiveTab("price")}
                className={`px-6 py-3 transition !font-normal cursor-pointer text-xl border-b border-zinc-300 sm:border-b-0  ${
                    activeTab === "price"
                        ? "bg-white shadow text-black rounded-none sm:rounded-xl"
                        : "text-zinc-600 hover:text-black border-x border-zinc-300"
                }`}
            >
                Прейскурант
            </button>

             

            <button
                onClick={() => setActiveTab("forms")}
                className={`px-6 py-3 transition !font-normal cursor-pointer text-xl border-zinc-300 border-b-0 ${
                    activeTab === "forms"
                        ? "bg-white shadow text-black rounded-none sm:rounded-xl"
                        : "text-zinc-600 hover:text-black"
                }`}
            >
                Формы и анкеты
            </button>

        </div>

    </div>



    <div className="mt-10 flex flex-col xl:flex-row gap-8 items-start">
       
       

        <button
            className="xl:hidden w-full rounded-xl bg-zinc-900 text-white py-4"
            onClick={handleShowFilter}
        >
            {showFilter ? "Скрыть фильтры" : "Показать фильтры"}
        </button>

    

        <aside
            className={`
            ${showFilter ? "flex" : "hidden"}
            xl:flex
            flex-col
            gap-6
            w-full
            xl:w-[340px]
            shrink-0
            rounded-3xl
            bg-[#8D4C98]/80
            border
            border-zinc-200
            shadow-lg
            p-6
            `}
        >

    <div className="rounded-2xl bg-white border border-zinc-300 p-5 shadow-sm">

    <h3 className="!font-normal text-zinc-900 mb-4">
        🎓 Образование
    </h3>

    <div className="space-y-3 ">

        {["Среднее", "Высшее", "Без мед.образования"].map((item) => (

            <label
                key={item}
                className="
                flex
                items-center
                gap-3
                cursor-pointer
                rounded-xl
                px-3
                py-2
                hover:bg-zinc-100
                transition
                "
            >

                <input
                    type="radio"
                    name="education_level"
                    value={item}
                    checked={education === item}
                    onChange={(e) => {

                        setEducation(e.target.value)
                        setSpecialization("")
                        setTime("")
                        setTimeSecondary("")
                        setActiveTab("programs")

                    }}
                />

                <span className="!font-normal">{item}</span>

            </label>

        ))}

    </div>

</div>


<div className="rounded-2xl bg-white border border-zinc-200 p-5 shadow-sm">

    <h3 className="text-lg font-semibold mb-4">
        📚 Категория
    </h3>

    <select
        value={category}
        onChange={(e) => {

            setCategory(e.target.value)
            setActiveTab("programs")

        }}
        className="
        w-full
        rounded-xl
        border
        border-zinc-300
        p-3
        focus:ring-2
        focus:ring-blue-300
        outline-none
        "
    >

        <option value="">
            Все категории
        </option>

        <option>
            Профессиональная переподготовка
        </option>

        <option>
            Повышение квалификации
        </option>

    </select>

</div>


<div className="rounded-2xl bg-white border border-zinc-200 p-5 shadow-sm">

    <h3 className="text-lg font-semibold mb-4">
        🩺 Направление
    </h3>

    {education !== "без образования" && (

        <select
            value={specialization}
            onChange={(e) => {

                setSpecialization(e.target.value)
                setActiveTab("programs")

            }}
            className="
            w-full
            rounded-xl
            border
            border-zinc-300
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-300
            "
        >

            <option value="">
                Все направления
            </option>

            {(education === "Высшее"
                ? HIGHER_SPECIALTIES
                : SECONDARY_SPECIALTIES
            ).map((spec) => (

                <option
                    key={spec}
                    value={spec}
                >
                    {spec}
                </option>

            ))}

        </select>

    )}

</div>


<div className="rounded-2xl bg-white border border-zinc-200 p-5 shadow-sm">

    <h3 className="text-lg font-semibold mb-4">
        ⏰ Количество часов
    </h3>

    <div className="grid grid-cols-3 gap-2">

        {["576","504","288","144","72","36","18"].map((item)=>(

            <button

                key={item}

                onClick={()=>{
                    setTime(item)
                    setTimeSecondary(item)
                    setActiveTab("programs")
                }}

                className={`
                rounded-xl
                py-2
                transition
                border
                cursor-pointer
                ${
                    time===item
                    ? "bg-blue text-white border-blue"
                    : "bg-white hover:bg-zinc-100 border-zinc-300"
                }
                `}
            >

                {item}

            </button>

        ))}

    </div>

</div>

<button

    onClick={()=>{
        setEducation("")
        setCategory("")
        setSpecialization("")
        setTime("")
        setTimeSecondary("")
        setInputValue("")
    }}

    className="
    rounded-xl
    border
    border-red-200
    text-red-600
    py-3
    bg-red-50
    transition
    cursor-pointer
    hover:opacity-60
    "
>

    Сбросить фильтры

</button>

</aside>


<div className="flex-1">

    {activeTab === "programs" && (

        <ProgrammCard
            filteredPrograms={filteredPrograms}
            visibleItems={visibleItems}
            handleShowMore={handleShowMore}
        />

    )}

    {activeTab === "price" && <PriceList />}

    {activeTab === "forms" && <FormsAndActs />}

    {filteredPrograms.length === 0 &&
        activeTab === "programs" && (

            <div className="rounded-2xl bg-white border p-16 text-center shadow">

                <h2 className="text-2xl font-semibold">
                    Ничего не найдено
                </h2>

                <p className="text-zinc-500 mt-2">
                    Попробуйте изменить параметры поиска.
                </p>

            </div>

    )}

</div>

    </div>

</section>
    )
}