import { getProgram, hasUserProgram } from "@/lib/programm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProgramSelect from "./SelectProgramm";

interface ProgramsPageProps { 
  params: { id: string } 
}

async function getProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("auth")
  }

  return res.json()
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

  const hasAccess = await hasUserProgram(user.id, Number(id));

  return (
    <section className="prose mx-auto p-4 mt-27">
      <h1 className="text-3xl font-semibold">{program.name}</h1>

      

      {!hasAccess ? ( 
        <>
        
        <div
        className="mt-6 program-description"
        dangerouslySetInnerHTML={{ __html: program.description }}
      />

       <ProgramSelect program={program} userId={user.id} />
        </>
       
      ) : (
        
        <div>
          <h2>У вас есть доступ!</h2>
        </div>
      
      )}

      <time className="text-sm mt-4 block mb-10">
        <strong>Даты проведения:</strong> {program.dates}
      </time>

      
    </section>
  );
}