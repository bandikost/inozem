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

            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
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
        <p className="mt-4"><strong className="text-blue">Направления:</strong> <span className="opacity-60 !font-normal">{program.specialization}</span></p>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-15 mt-10">

          <div className="h-full program-description border border-gray-300 rounded-md shadow-xl p-4 text-lg" dangerouslySetInnerHTML={{ __html: program.description }}/>

          <time className="h-full flex flex-col items-start border border-gray-300 rounded-md shadow-2xl p-4">
            <strong className="mb-2 text-blue text-lg">Даты проведения:</strong>
            <ul className="space-y-1 text-base grid">
              {dates.map((date, i) => (
                <li key={i} className="!text-default !font-normal opacity-80">
                  {date}
                </li>
              ))}
            </ul>
          </time>
        </div>
        

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between items-start border border-gray-300 rounded-md shadow-xl p-4">
              <h3>Подайте заявку на обучение, если у вас появились/остались вопросы, и наши сотрудники ответят вам в ближайшее время!</h3> 
              <div className="flex flex-col gap-4 lg:flex-row justify-between w-full mt-4">
                <LoadingLink className="button-more" href={"/bid"}>Подать заявку на обучение</LoadingLink>
                <LoadingLink className="button-more" href={"/contacts"}>Перейти в контакты</LoadingLink>
              </div>
              
              
            </div>

            <div className="flex flex-col items-start border border-gray-300 rounded-md shadow-2xl p-4">
              <h3>Если вы решили, что программа вам подходит, вы можете самостоятельно оплатить её и получить доступ к ближайшему старту.</h3>
              <ProgramSelect program={program} userId={user ? user.id : 0} />
            </div>
          </div>
        </>
      ) : (   
        <ProgramSlider blocks={blocks} />       
      )}  
      </div>
    </section>
  );
}

