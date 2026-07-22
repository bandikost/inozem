'use client'

import { useCallback, useMemo, useState } from "react";
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties";
import { ProgramRow } from "@/lib/programm";
import ProgrammCard from "./ProgrammCard";
import PriceList from "./PriceList";
import FormsAndActs from "./FormsAndActs";
import { useLoadingStore } from "@/components/Load/loadingStore";
import { delay } from "@/lib/delay";
import SearchInput from "./Components/SearchInput";


export default function InputPrograms({ programs }: { programs: ProgramRow[] }) {
    const [inputValue, setInputValue] = useState("")
    const [visibleItems, setVisibleItems] = useState(10)
    const [education, setEducation] = useState("")
    const [category, setCategory] = useState("")
    const [time, setTime] = useState("")
    const [timeSecondary, setTimeSecondary] = useState("")
    const [specialization, setSpecialization] = useState("")

    const [activeTab, setActiveTab] = useState<"programs" | "price" | "forms" | "learn">("programs")
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
  let filtered = programs;

  if (inputValue) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }

  if (education) {
  filtered = filtered.filter((p) => {
    const educations =
      p.education
        ?.split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean) ?? [];

    return educations.includes(education.trim().toLowerCase());
  });
}

  if (category) {
    filtered = filtered.filter(
      (p) =>
        p.category?.trim().toLowerCase() ===
        category.trim().toLowerCase()
    );
  }

  if (time || timeSecondary) {
    filtered = filtered.filter(
      (p) =>
        (time && p.time === Number(time)) ||
        (timeSecondary && p.time_secondary === Number(timeSecondary))
    );
  }

  // Фильтр по специальности
  if (
    specialization &&
    specialization.trim().toLowerCase() !== "все специальности"
  ) {
    const selectedSpecialty = specialization.trim().toLowerCase();

    filtered = filtered.filter((p) => {
      const programSpecialties =
        p.specialization
          ?.split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean) ?? [];

      return (
        programSpecialties.includes("все специальности") ||
        programSpecialties.includes(selectedSpecialty)
      );
    });
  }

  filtered.sort((a, b) => {
  return (b.time ?? Infinity) - (a.time ?? Infinity);
}) 

return filtered
}, [
  programs,
  inputValue,
  education,
  specialization,
  timeSecondary,
  time,
  category,
]);

    
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

                <SearchInput 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />

            </div>

        </div>

    </div>

  
<div className="mt-8 flex justify-center md:justify-end">
  <div className="flex w-full overflow-x-auto border-b border-zinc-200">

    <button
      onClick={() => setActiveTab("programs")}
      className={`relative whitespace-nowrap px-5 py-4 text-lg !font-normal transition cursor-pointer ${
        activeTab === "programs"
          ? "text-blue"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      Каталог

      {activeTab === "programs" && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue" />
      )}
    </button>

    <button
      onClick={() => setActiveTab("price")}
      className={`relative whitespace-nowrap px-5 py-4 text-lg !font-normal transition cursor-pointer ${
        activeTab === "price"
          ? "text-blue"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      Прейскурант

      {activeTab === "price" && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue" />
      )}
    </button>

    <button
      onClick={() => setActiveTab("forms")}
      className={`relative whitespace-nowrap px-5 py-4 text-lg !font-normal transition cursor-pointer ${
        activeTab === "forms"
          ? "text-blue"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      Формы и анкеты

      {activeTab === "forms" && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue" />
      )}
    </button>

    <button
      onClick={() => setActiveTab("learn")}
      className={`relative whitespace-nowrap px-5 py-4 text-lg !font-normal transition cursor-pointer ${
        activeTab === "learn"
          ? "text-blue"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      Образование

      {activeTab === "learn" && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue" />
      )}
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

    <div className="space-y-2">

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
                border-gray-300
                border
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

                <span className="!font-normal flex flex-col">
                    {item}
                   
                </span>
                

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

   

    {education !== "Без мед.образования" && (


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

        {["576","504","144","72","36","18"].map((item)=>(

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