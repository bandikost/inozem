import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import { getProfile } from "@/lib/getProfile";
import ProgramSlider from "./Components/ProgramSlider";

// Блоки обучения

import { getProgramBlocks } from "@/lib/programs/structure";
import Main from "./Blocks/Main";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import PayButton from "@/components/ui/Buttons/PayButton";

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
  const { slug } = await params 

  const programPromise =  await getProgramBySlug(slug)
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value 
  const program = await programPromise

  if (!program) return <div>Программа не найдена</div>

  let user = null
  let hasAccess = false

  if (token) {
    const profilePromise = getProfile(token)
    user = await profilePromise

    hasAccess = await hasUserProgram(user.id, program.id)
  }
  
  console.log("USER:", user);
console.log("hasAccess:", hasAccess);
console.log("superAdmin:", user?.superAdmin);
  
  const dates = program.dates?.split("\n").filter(Boolean) ?? []
  
  const currentBlocks = await getProgramBlocks(program.id); // находит первое соответствие по специальности из title и program, чтобы отобразить нужные блоки обучения

const blocks: ProgramSliderBlock[] = currentBlocks.map((block: any) => ({
  title: block.title,
  component: (
    <Main
      sources={block.data.sources}
      links={block.data.links}
      programmId={program.id}
    />
  ),
}))


  return (
   <section className="min-h-screen">
    <div className=" px-2 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
              Образование
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          {program.name}
        </span>
      
      </nav>
      
      

      {hasAccess ? ( 
        <ProgramSlider blocks={blocks} name={program.name} suptitle={program.suptitle} /> 

      ) : user?.superAdmin ? (

  <ProgramSlider blocks={blocks} name={program.name} suptitle={program.suptitle}/>

      ) : (   
           <>
<h1 className="!text-3xl font-semibold text-prpl text-center">{program.name}</h1>
  <div className="grid grid-cols-1 tablet:grid-cols-[1.4fr_0.6fr] gap-8 mt-12 mb-16">

    <section className="program-description">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-px bg-prpl" />
        <h2 className="text-xl font-semibold">
          О программе
        </h2>
      </div>

      <div
        className="text-lg leading-[1.6] text-default/80"
        dangerouslySetInnerHTML={{
          __html: program.description,
        }}
      />

      
    </section>

    <section className="relative overflow-hidden rounded-2xl bg-blue p-7 text-white">

      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full border border-white/10" />
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-white/10" />

      <span className="relative block text-sm uppercase tracking-[0.12em] text-white/60 mb-3">
        Ближайшие даты
      </span>

      <h2 className="relative text-2xl font-semibold mb-7">Даты проведения</h2>

      <ul className="relative space-y-4">
        {dates.map((date, i) => <li key={i} className="flex items-center gap-3 text-lg text-white/90">{date}</li>)}
      </ul>
    </section>
  </div>

  <div className="mt-6 flex items-center gap-2">
        <span className="text-sm uppercase tracking-[0.12em] text-blue font-semibold">
          Направления подготовки: 
        </span>

        <p className="text-lg text-default/60">
          {program.specialization}
        </p>
      </div>

  <section className="mt-16">

  <div className="mb-8">
    <span className="text-sm uppercase tracking-[0.12em] text-blue font-semibold">
      Как поступить
    </span>

    <h2 className="mt-2 text-2xl tablet:text-3xl font-semibold">
      Выберите удобный способ
    </h2>
  </div>

  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">

    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 min-h-[320px] flex flex-col justify-between transition hover:border-zinc-300">

      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-zinc-100 transition-transform duration-500 group-hover:scale-110" />

      <div className="relative">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
          <span className="text-lg">
            ?
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-semibold">
          Остались вопросы?
        </h3>

        <p className="mt-3 max-w-md leading-relaxed text-default/60">
          Не уверены, подходит ли вам программа?
          Оставьте заявку — специалист свяжется с вами,
          ответит на вопросы и поможет с выбором.
        </p>

      </div>

      <div className="relative mt-8">

        <LoadingLink
          href="/bid"
          className="
            flex w-full items-center justify-center
            rounded-xl
            border border-zinc-200
            bg-zinc-50
            px-6 py-4
            font-semibold
            text-default
            transition
            hover:bg-zinc-100
          "
        >
          Получить консультацию
        </LoadingLink>

      </div>

    </div>

    <div className="relative overflow-hidden rounded-3xl bg-blue text-white p-8 min-h-[320px] flex flex-col justify-between">

      <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full border border-white/10" />
      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-white/10" />

      <div className="relative">

        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
          Онлайн-оплата
        </span>

        <h3 className="mt-5 text-2xl font-semibold">
          Готовы начать обучение?
        </h3>

        <p className="mt-3 text-white/65 leading-relaxed">
          Оплатите программу онлайн и получите доступ
          к обучению после подтверждения оплаты.
        </p>

        <div className="mt-7">
          <span className="block text-sm text-white/55">
            Стоимость программы
          </span>

          <span className="mt-1 block text-4xl font-semibold tracking-tight">
            {program.price} ₽
          </span>
        </div>

      </div>

      <div className="relative mt-8">
        <PayButton programId={program.id} />
      </div>

    </div>

  </div>
</section>
</>  
      )}  
      </div>
    </section>
  );
}

