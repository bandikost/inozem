import Link from 'next/link'

type News = { // явно типизируем приходящие данные с бд
  id: number
  title: string
  text: string
  created_at: string
}

async function getNews(): Promise<News[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    next: { revalidate: 60 }, // delay 1 min
  })

  if (!res.ok) throw new Error('Failed to fetch news') // обработчик ошибки

  return res.json() // ВОЗВРАЩАЕМ JSON В СТРОКУ
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-normal'>News</h1>

      <ul className='grid gap-8 grid-cols-4 mt-10'>
        {news.map((n) => (
          <li className='border p-2 rounded' key={n.id} >
            <p>{n.title}</p>
            <Link className='underline text-blue-600' href={`/blog/${n.id}`}>Читать полностью</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
