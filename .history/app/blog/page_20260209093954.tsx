import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic' 

type News = {
  id: number
  title: string
  text: string
  created_at: string
}

async function getNews(): Promise<News[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    next: { revalidate: 60 }, 
  })
  if (!res.ok) throw new Error('Failed to fetch news')
  return res.json()
}

export async function generateMetadata() {
  return {
    title: 'Новости',
    description: 'Последние новости на нашем сайте',
  }
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-normal">News</h1>

      <ul className="grid gap-8 grid-cols-4 mt-10">
        {news.map((n) => (
          <li className="border rounded" key={n.id}>
            <p className="font-normal text-lg p-2">{n.title}</p>
            <hr />
            <p className="text-zinc-600 p-2">{n.text.slice(0, 50) + '...'}</p>
            <Link
              className="p-2 underline text-blue-600 flex font-normal cursor-pointer"
              href={`/blog/${n.id}`}
            >
              Читать полностью
              <MoveRight className="ml-2" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
