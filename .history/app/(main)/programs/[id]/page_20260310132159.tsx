import { getProgram } from "@/lib/programm" 

interface ProgramsPageProps { 
    params: { id: string } 
} 

export default async function Page({ params }: ProgramsPageProps) { 
    const { id } = await params
    const program = await getProgram(Number(id)) 
    
    if (!program) { 
        return <div className="mt-20 text-center">Программа не найдена</div> 
    } 
    
return ( 
<section className="prose mx-auto p-4 mt-27"> 
    <h1 className="text-zinc-800 text-3xl font-semibold"> {program.name} </h1> 
    <div className="mt-6 poose" dangerouslySetInnerHTML={{ __html: program.description }} /> 
    <time className=" text-sm mt-8 block"><strong className="text-zinc-800">Даты проведения: </strong> {program.dates} </time> 
</section> 
)}