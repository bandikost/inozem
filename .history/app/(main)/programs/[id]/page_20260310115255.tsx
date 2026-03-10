import { getProgram } from "@/lib/programm"


interface ProgramsPageProps {
  params: { id: string }
}


export default async function Page({ params }: ProgramsPageProps) {
    const id  = Number(params.id)
    const programs = await getProgram()

  return (
   
    <section className="prose mx-auto p-4 mt-27">
      
      
       {programs.map(program => (
        <div key={program.id}>
        <h1 className="text-zinc-800 text-3xl font-semibold">{program.name}</h1>
        <p className="mt-6">{program.description}</p>
        <time className="text-zinc-600 text-sm mt-8">{program.dates}</time>
        </div>
       ))}
      
    </section>
  )
}
