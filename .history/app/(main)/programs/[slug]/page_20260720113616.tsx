import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";
import Link from "next/link";
import TokenCheck from "@/components/token/token";
import ProgramSlider from "./Components/ProgramSlider";

// Блоки обучения

import { getProgramBlocks } from "@/lib/programs/structure";
import Main from "./Blocks/Main";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

type ProgramSliderBlock = {
  title: string | undefined
  component: React.ReactNode
}


export async function generateMetadata({ params }: ProgramsPageProps) {
  const { slug } = await params 
  const program = await getProgramBySlug(slug)
  

  return {
    title: program
      ? `${program.name} | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»`
      : "Программа не найдена",
  }
}

export default async function Page({ params }: ProgramsPageProps) {
  const { slug } = await params // получаем slug из url, например, "urologiya" для /programs/urologiya
   console.time("TOTAL_PAGE")

  const programPromise = getProgramBySlug(slug)

  const token = await TokenCheck()

  const program = await programPromise

  if (!program) return <div>Программа не найдена</div>

  let user = null
  let hasAccess = false

  if (token) {
    const profilePromise = getProfile(token)
    user = await profilePromise

    hasAccess = await hasUserProgram(user.id, program.id)
  }
  
  const dates = program.dates?.split("\n").filter(Boolean) ?? []
  
  const currentBlocks = await getProgramBlocks(program.id); // находит первое соответствие по специальности из title и program, чтобы отобразить нужные блоки обучения

const blocks: ProgramSliderBlock[] = currentBlocks.map((block: any) => ({
  title: block.title,
  component: (
    <Main
      sources={block.data.sources}
      links={block.data.links}
    />
  ),
}))


console.timeEnd("TOTAL_PAGE")

  return (
   <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
              Программы обучения
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          {program.name}
        </span>
      
      </nav>
      <h1 className="!text-3xl font-semibold text-prpl text-center">{program.name}</h1>

      {!hasAccess ? ( 
      <div className="mt-20 mb-20">

  {/* Заголовок секции */}
  <div className="mb-8">

    <div className="flex items-center gap-3">
      <Building2 className="text-blue" />

      <h2 className="text-2xl font-bold text-blue">
        Наши преимущества
      </h2>
    </div>

    <div className="h-[2px] w-20 bg-blue mt-3" />

  </div>


  {/* Основная сетка */}
  <div className="grid grid-cols-1 tablet:grid-cols-12 gap-6">

    {/* Левая часть */}
    <div className="tablet:col-span-7 grid gap-4">

      {features.map((item, index) => (

        <div
          key={index}
          className="
            group
            flex
            items-center
            gap-5
            border
            border-gray-300
            shadow-xl
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              flex-shrink-0
              w-12
              h-12
              bg-blue
              text-white
              text-lg
              font-bold
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <p className="!text-lg !font-normal opacity-80">
            {item}
          </p>

        </div>

      ))}

    </div>


    {/* Правая часть */}
    <div
      className="
        tablet:col-span-5
        border
        border-gray-300
        shadow-2xl
        p-4
        flex
        flex-col
      "
    >

      <div className="flex items-center gap-3 mb-4">

        <MapPinned className="text-blue" />

        <h2 className="text-xl font-bold text-blue">
          Наши слушатели
        </h2>

      </div>


      <div className="flex-1 min-h-[450px]">

        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A4IbnQNqOhTRc_MYs6AhwA-u0opOGhWWI&lang=ru_RU"
          width="100%"
          height="100%"
          loading="lazy"
          className="block min-h-[450px]"
        />

      </div>

    </div>

  </div>

</div>
      ) : (   
        <ProgramSlider blocks={blocks} />       
      )}  
      </div>
    </section>
  );
}

