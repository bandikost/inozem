import { getPrograms } from '@/lib/programm'
import Link from 'next/link'


export default async function NewsListPage() {

  const programs = await getPrograms()

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-normal mt-27 text-prpl'>Программы</h1>

        <ul className='grid gap-8 grid-cols-1 mt-10 px-6 w-full'>
          {programs.map(n => (
            <li key={n.id} className='border rounded flex flex-col'>
               <Link
                className='p-2 font-normal cursor-pointer'
                href={`/blog/${n.id}`}
              >
              <p className='font-normal text-lg p-2'>{n.title}</p>
              <hr />
              <p className='text-zinc-600 p-2'>{n.text.slice(0, 50) + '...'}</p>
              </Link>
            </li>
          ))}
        </ul>
    </section>
  )
}
