import { RowDataPacket } from 'mysql2'
import { notFound } from 'next/navigation'

type News = RowDataPacket & {
  id: number
  title: string
  text: string
  created_at: Date
}

export default async function NewsPage({params}: {params: { id: string } | Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(`http://localhost:3000/api/news/${id}`, {
  next: { revalidate: 300 }
})

if (!res.ok) notFound()

const news = await res.json()

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.text}</p>
      <small>{news.created_at.toLocaleString()}</small>
    </div>
  )
}
