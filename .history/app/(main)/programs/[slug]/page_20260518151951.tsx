import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";
import Link from "next/link";
import BaseVideo from "./VideoComponents/Basevideo";
import TokenCheck from "@/components/token/token";
import ProgramSlider from "./Components/ProgramSlider";

// Блоки обучения
import { title } from "@/lib/programs/titles"
import Main from "./Blocks/Main"
import Second from "./Blocks/Second"
import Three from "./Blocks/Three"


interface ProgramsPageProps { 
   params: { slug: string } 
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
  const program = await getProgramBySlug(slug)
  if (!program) return <div className="mt-20 text-center">Программа не найдена</div>

  const token = await TokenCheck()
  let user = null
  let hasAccess = false

  if (token) {
    user = await getProfile(token)
    hasAccess = await hasUserProgram(user.id, program.id)
  }
  
  const dates = program.dates.split('\n').filter(Boolean)

  
  const specialization = program.specialization
  const category = program.category
  const education = program.education
  
  const currentTitle = title.find((item) => program.specialization.startsWith(item.specialization))

const blocks: ProgramSliderBlock[] =
  (currentTitle?.blocks
    .map((block): ProgramSliderBlock | null => {
      switch (block.type) {
        case 'video':
          return {
            title: block.title,
            component: <BaseVideo education={education} category={category} />,
          }

        case 'main':
          return {
            title: block.title,
            component: (
              <Main
                education={education}
                category={category}
                headline={block.headlines ?? []}
              />
            ),
          }

        case 'second':
          return {
            title: block.title,
            component: (
              <Second specialization={specialization} category={category} />
            ),
          }

        case 'third':
          return {
            title: block.title,
            component: (
              <Three specialization={specialization} category={category} />
            ),
          }

        default:
          return null
      }
    })
    .filter((b): b is ProgramSliderBlock => b !== null)) ?? []


  return (
    <section className="prose mx-auto px-6 mt-27 mb-10">
      <h1 className="!text-2xl md:!text-3xl font-semibold text-prpl text-center">{program.name}</h1>

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
                <Link className="button-more" href={"/bid"}>Подать заявку на обучение</Link>
                <Link className="button-more" href={"/contacts"}>Перейти в контакты</Link>
              </div>
              
              
            </div>

            <div className="flex flex-col items-start border border-gray-300 rounded-md shadow-2xl p-4">
              <h3>Если вы решили, что программа вам подходит, вы можете самостоятельно оплатить её и получить доступ к ближайшему старту.</h3>
              <ProgramSelect program={program} userId={user ? user.id : 0} />
            </div>
          </div>
        </>
      ) : (   
        
        <>
        
         <ProgramSlider blocks={blocks} />

        
        </> 
            
      )}  
    </section>
  );
}

