import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";
import TokenCheck from "@/components/token/token";
import Link from "next/link";

interface ProgramsPageProps { 
   params: { slug: string } 
}


export default async function Page({ params }: ProgramsPageProps) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return <div className="mt-20 text-center">Программа не найдена</div>
  
  const token = await TokenCheck()
  
  let user = null;
  let hasAccess = false;

if (token) {
  try {
    user = await getProfile(token);
    hasAccess = await hasUserProgram(user.id, program.id);
  } catch (err) {
    console.error("Не удалось загрузить профиль:", err);
  }
}
  const dates = program.dates.split('\n').filter(Boolean)

  return (
    <section className="prose mx-auto px-6 mt-27">
      <h1 className="text-3xl font-semibold text-prpl">{program.name}</h1>

      {!hasAccess ? ( 
        <>
        <p className="mt-2"><strong className="text-blue">Направления:</strong> {program.specialization}</p>
        <div className="mt-6 program-description" dangerouslySetInnerHTML={{ __html: program.description }}/>
        <time className="mt-4 flex flex-col mb-10 items-start">
        <strong className="mb-2 text-blue">Даты проведения:</strong>
        <ul className="space-y-1 text-base grid">
          {dates.map((date, i) => (
            <li key={i} className="!text-default !font-normal">
              {date}
            </li>
          ))}
        </ul>
      </time>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-start border border-gray-300">
              <p className="!text-lg">Подайте заявку на обучение, если у вас появились/остались вопросы, и наши сотрудники ответят вам в ближайшее время!</p> 
              <Link className="button-more mt-2" href={"/bid"}>Подать заявку</Link>
            </div>

            <div className="flex flex-col items-start">
              <h3 >Если вы решили, что программа вам подходит - вы можете самостоятельно оплатить ее и получить доступ в ближайший старт начала программы</h3>
              <ProgramSelect program={program} userId={user ? user.id : 0} />
            </div>
          </div>
      
        
         
          

        </>
      ) : (    
        <div className="mt-2">
          <h2>У вас есть доступ!</h2>
        </div>
      
      )}  
    </section>
  );
}