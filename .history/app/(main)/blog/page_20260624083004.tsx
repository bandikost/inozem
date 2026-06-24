import Link from 'next/link'
import { Metadata } from "next"

type News = { id: number; title: string; text: string; created_at: string }

async function getNews(): Promise<News[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
  next: { revalidate: 300 },
})

if (!res.ok) {
  console.log("Status:", res.status)
  console.log("Body:", await res.text())
  throw new Error("Failed to fetch news")
}
  } catch (err) {
    console.error('safeFetch: плохой ответ с API новостей, возвращаем fallback', err)
    return [] 
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const news = await getNews()
  const count = news.length

  return {
    title: 'Новости',
    description: count > 0 ? `Последние ${count} новостей на сайте.` : 'Новости временно недоступны.',
  }
}

export default async function NewsListPage() {
  let news: News[] = []

  try {
    news = await getNews()
  } catch (err) {
    console.error('Ошибка при рендеринге NewsListPage, возвращаем fallback', err)
    news = []
  }

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-normal mt-27 text-prpl'>Новости</h1>

      {news.length === 0 ? (
        <p className="p-4 text-center text-zinc-500">Новости временно недоступны</p>
      ) : (
        <ul className='grid gap-8 grid-cols-1 mt-10 px-6 w-full'>
          {news.map(n => (
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
      )}
    </section>
  )
}
