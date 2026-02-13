import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from "next"

type News = { // явно типизируем приходящие данные с бд
  id: number
  title: string
  text: string
  created_at: string
}

async function getNews(): Promise<News[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`)

  if (!res.ok) throw new Error('Failed to fetch news') // обработчик ошибки

  return res.json() // ВОЗВРАЩАЕМ JSON В СТРОКУ
}

export async function generateMetadata(): Promise<Metadata> {
  const news = await getNews()

  return {
    title: 'Новости',
    description: `Последние ${news.length} новостей на нашем сайте.`,
    openGraph: {
      title: 'Новости',
      description: `Последние ${news.length} новостей на нашем сайте.`,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    twitter: {
      title: 'Новости',
      description: `Последние ${news.length} новостей на нашем сайте.`,
      card: 'summary_large_image',
    },
  }
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <section className='flex flex-col justify-center items-center '>
      <h1 className='text-3xl font-normal mt-12 text-prpl'>Новости</h1>
        <div className='border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white'>
          <ul className='grid gap-8 grid-cols-4 mt-10 px-6'>
            {news.map((n) => (
              <li className='border rounded' key={n.id} >
                <p className='font-normal text-lg p-2'>{n.title}</p>
                <hr />
                <p className='text-zinc-600 p-2'>{n.text.slice(0, 50 ) + "..."}</p> 
                <Link className='p-2 underline text-blue-600 flex font-normal cursor-pointer' href={`/blog/${n.id}`}>Читать полностью
                
                <MoveRight className='ml-2' /> </Link>
              </li>
            ))}
          </ul>
        </div> 
    </section>
  )
}