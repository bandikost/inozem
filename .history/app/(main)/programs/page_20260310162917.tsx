import { getPrograms } from "@/lib/programm" 



export default async function Page() { 
    const programs = await getPrograms()
    
return ( 
<section className="prose mx-auto p-4 mt-27"> 
    <h1 className="text-zinc-800 text-3xl font-semibold">Программы обучения</h1> 
    {programs.map(program => (
        <div key={program.id}>
            <p>{program.name}</p>
        </div>
    ))}
</section> 
)}