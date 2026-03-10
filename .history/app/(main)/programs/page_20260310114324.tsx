import { getPrograms } from '@/lib/programm'

export default async function NewsListPage() {

  const programs = await getPrograms()

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-normal mt-27 text-prpl'>Программы</h1>

        <ul className='grid gap-8 grid-cols-1 mt-10 px-6 w-full'>
          {programs.map(program => (
            <li key={program.id} className='border rounded flex flex-col'>
               {program.name}
            </li>
          ))}
        </ul>
    </section>
  )
}
