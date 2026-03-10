import { getPrograms } from "@/lib/programm"

export default async function Page({ params }: { params: { id: string } }) {

  const program = await getPrograms(Number(params.id))

  if (!program) return <div>Программа не найдена</div>

  return (
    <section className='flex flex-col justify-center pb-20 px-4'>
        {program.map(prog => (
            <>
            <h1 className='mt-27 text-prpl text-center'>
        {prog.name}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: prog.description }}
      />
            </>
            
        ))}
      
    </section>
  )
}