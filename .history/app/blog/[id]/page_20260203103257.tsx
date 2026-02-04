import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'
import { notFound } from 'next/navigation'

type News = RowDataPacket & {
  id: number
  title: string
  text: string
  created_at: Date
}

export default async function NewsPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  const { id } = await params

  // деструктурируем кортеж [rows, fields]
  const [rows] = await db.query<News[]>(
    'SELECT id, title, text, created_at FROM news WHERE id = ? LIMIT 1',
    [id]
  )

  // если новость не найдена
  if (!rows || rows.length === 0) notFound()

  const news = rows[0]

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.text}</p>
      <small>{news.created_at.toLocaleString()}</small>
    </div>
  )
}