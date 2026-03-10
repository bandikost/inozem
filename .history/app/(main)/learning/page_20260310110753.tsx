import { getPrograms } from "@/lib/programm"

export default async function Page() {
    const programs = await getPrograms()

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
        <h1 className='mt-27 text-prpl text-center'>asjdlaskd</h1>
        {programs.map(program => (
            <div className="" dangerouslySetInnerHTML={{ __html: program.description }}/>
        ))}
        
        </section>
    )
}