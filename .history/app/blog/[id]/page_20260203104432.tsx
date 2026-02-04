import { notFound } from 'next/navigation'

type News = {
  id: number
  title: string
  text: string
  created_at: string
}

export default async function NewsPage({params}: {params: { id: string } | Promise<{ id: string }>}){
  const { id } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${id}`, {
  next: { revalidate: 300 }
})

if (!res.ok) notFound()
const news: News = await res.json()

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.text}</p>
      <small>{news.created_at.toLocaleString()}</small> {/* дата как строка */}
    </div>
  )
}
