import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";

interface ProgramsPageProps { 
   params: { slug: string } 
}


export default async function Page({ params }: ProgramsPageProps) {
 const { slug } = params;

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const program = await getProgramBySlug(slug)

  if (!program) {
    return <div className="mt-20 text-center">Программа не найдена</div>;
  }

  if (!token) redirect("/login")

  let user
  try { 
    user = await getProfile(token) 
  } catch {
    redirect("/login") 
  }

  const dates = program.dates.split('\n').filter(Boolean);
  const hasAccess = await hasUserProgram(user.id, program.id);

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
        
       <ProgramSelect program={program} userId={user.id} /> 

        </>
       
      ) : (
        
        <div className="mt-2">
          <h2>У вас есть доступ!</h2>
        </div>
      
      )}

      

      
    </section>
  );
}