import { getProgram } from "@/lib/programm"


interface ProgramsPageProps {
  params: { id: string }
}


export default async function Page({ params }: ProgramsPageProps) {
    const id  = Number(params.id)
    const programs = await getProgram(id)
    
    if (!programs) {
        return <div className="mt-20 text-center">Программа не найдена</div>
    }

  return (
   
    <section className="prose mx-auto p-4 mt-27">
      
        <h1 className="text-zinc-800 text-3xl font-semibold">
        {programs.name}
      </h1>

      <div
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: programs.description }}
      />

      <time className="text-zinc-600 text-sm mt-8 block">
        {programs.dates}
      </time>
      
    </section>
  )
}
