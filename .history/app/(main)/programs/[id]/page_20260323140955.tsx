import { getProgram, hasUserProgram } from "@/lib/programm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";

interface ProgramsPageProps { 
  params: { id: string } 
}


export default async function Page({ params }: ProgramsPageProps) {
  const { id } = await params;
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const program = await getProgram(Number(id))

 
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
  const hasAccess = await hasUserProgram(user.id, Number(id));

  return (
    <section className="prose mx-auto px-6 mt-27">
      <h1 className="text-3xl font-semibold text-prpl">{program.name}</h1>

      {!hasAccess ? ( 
        <>
        <p className="mt-2"><strong>Направления:</strong> {program.specialization}</p>
        <div className="mt-6 program-description" dangerouslySetInnerHTML={{ __html: program.description }}/>
        <ProgramSelect program={program} userId={user.id} />
        </>
       
      ) : (
        
        <div className="mt-2">
          <h2>У вас есть доступ!</h2>
        </div>
      
      )}

      <time className="mt-4 block mb-10">
  <strong className="block mb-2">Даты проведения:</strong>
  <ul className="space-y-1 text-base grid grid-cols-2">
    {dates.map((date, i) => (
      <li key={i} className="text-gray-700">
        {date}
      </li>
    ))}
  </ul>
</time>

      
    </section>
  );
}