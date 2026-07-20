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
      <>
  <div className="mt-6 flex flex-col gap-2">
    <span className="text-sm uppercase tracking-[0.12em] text-blue font-semibold">
      Направления подготовки
    </span>

    <p className="text-lg text-default/60">
      {program.specialization}
    </p>
  </div>

  {/* Основная информация */}
  <div className="grid grid-cols-1 tablet:grid-cols-[1.4fr_0.6fr] gap-8 mt-12 mb-16">

    {/* Описание */}
    <section className="program-description">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-blue" />
        <h2 className="text-xl font-semibold">
          О программе
        </h2>
      </div>

      <div
        className="text-lg leading-[1.7] text-default/75"
        dangerouslySetInnerHTML={{
          __html: program.description,
        }}
      />
    </section>

    {/* Даты */}
    <section className="relative overflow-hidden rounded-2xl bg-blue p-7 text-white">

      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full border border-white/10" />
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-white/10" />

      <span className="relative block text-sm uppercase tracking-[0.12em] text-white/60 mb-3">
        Ближайшие даты
      </span>

      <h2 className="relative text-2xl font-semibold mb-7">
        Даты проведения
      </h2>

      <ul className="relative space-y-4">
        {dates.map((date, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-lg text-white/90"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            {date}
          </li>
        ))}
      </ul>
    </section>
  </div>

  {/* Действия */}
  <section className="mt-12">

    <div className="mb-7">
      <span className="text-sm uppercase tracking-[0.12em] text-blue font-semibold">
        Как поступить
      </span>

      <h2 className="mt-2 text-2xl tablet:text-3xl font-semibold">
        Выберите удобный способ
      </h2>
    </div>

    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">

      {/* Заявка */}
      <div className="group relative overflow-hidden rounded-2xl bg-[#f5f7fa] p-7 min-h-[260px] flex flex-col justify-between">

        <div>
          <span className="text-5xl font-semibold text-blue/15">
            01
          </span>

          <h3 className="mt-3 text-xl font-semibold">
            Остались вопросы?
          </h3>

          <p className="mt-3 text-default/60 leading-relaxed">
            Оставьте заявку, и наши специалисты свяжутся с вами,
            чтобы ответить на вопросы и помочь с выбором программы.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <LoadingLink
            className="button-more"
            href="/bid"
          >
            Подать заявку
          </LoadingLink>

          <LoadingLink
            className="button-more"
            href="/contacts"
          >
            Контакты
          </LoadingLink>
        </div>
      </div>

    
      <div className="group relative overflow-hidden rounded-2xl border border-blue/20 p-7 min-h-[260px] flex flex-col justify-between">

        <div>
          <span className="text-5xl font-semibold text-blue/15">
            02
          </span>

          <h3 className="mt-3 text-xl font-semibold">
            Готовы начать обучение?
          </h3>

          <p className="mt-3 text-default/60 leading-relaxed">
            Выберите программу и оплатите обучение онлайн,
            чтобы получить доступ к ближайшему старту.
          </p>
        </div>

        <div className="mt-8">
          <ProgramSelect
            program={program}
            userId={user ? user.id : 0}
          />
        </div>
      </div>

    </div>
  </section>
</>
      ) : (   
        <ProgramSlider blocks={blocks} />       
      )}  
      </div>
    </section>
  );
}

