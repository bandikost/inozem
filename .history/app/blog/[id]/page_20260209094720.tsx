import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' 
export const revalidate = 60 

type News = {
  id: number
  title: string
  text: string
  created_at: string
}

interface NewsPageProps {
  params: { id: string }
}

// Динамическая генерация метаданных
export async function generateMetadata({ params }: NewsPageProps) {
  const { id } = params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return { title: 'Новость не найдена' }

    const news: News = await res.json()

    return {
      title: news.title,
      description: news.text.slice(0, 160),
      openGraph: {
        title: news.title,
        description: news.text.slice(0, 160),
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${id}`,
        type: 'article',
        publishedTime: news.created_at,
      },
      twitter: {
        title: news.title,
        description: news.text.slice(0, 160),
        card: 'summary_large_image',
      },
    }
  } catch {
    return { title: 'Новость не найдена' }
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) notFound()

  const news: News = await res.json()

  return (
    <section className="prose mx-auto p-4">
      <h1 className="text-zinc-800 text-3xl font-semibold">{news.title}</h1>
      <hr className="max-w-48" />
      <p className="mt-6">{news.text}</p>
      <small className="text-zinc-600 text-sm mt-8">
        {new Date(news.created_at).toLocaleDateString('ru-RU')}
      </small>
    </section>
  )
}
