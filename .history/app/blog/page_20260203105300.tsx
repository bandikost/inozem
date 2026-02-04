import Link from 'next/link'

type News = {
  id: number
  title: string
  text: string
  created_at: string
}

async function getNews(): Promise<News[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: 'no-store', 
  })

  if (!res.ok) throw new Error('Failed to fetch news')

  return res.json()
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <Link href={`/blog/${n.id}`}>{n.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
